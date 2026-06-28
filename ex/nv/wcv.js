// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "wikicv",
        "name": "WikiCV",
        "version": "1.0.0",
        "baseUrl": "https://wikicv.net",
        "iconUrl": "https://wikicv.net/static/img/favicon.ico",
        "isEnabled": true,
        "type": "NOVEL",
        "layoutType": "GRID"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'chuong-moi', title: 'Chương mới', type: 'Grid', path: 'chuong-moi' },
        { slug: 'truyen-nam', title: 'Truyện nam', type: 'Horizontal', path: 'truyen-nam' },
        { slug: 'nu-tan', title: 'Nữ tần', type: 'Horizontal', path: 'nu-tan' },
        { slug: 'dam-my', title: 'Đam mỹ', type: 'Horizontal', path: 'dam-my' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Chương mới', slug: 'chuong-moi' },
        { name: 'Truyện nam', slug: 'truyen-nam' },
        { name: 'Nữ tần', slug: 'nu-tan' },
        { name: 'Đam mỹ', slug: 'dam-my' },
        { name: 'Bảng tích phân', slug: 'bang-tich-phan' },
        { name: 'Bảng biên tập', slug: 'bang-bien-tap' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [],
        category: [],
        country: []
    });
}

// =============================================================================
// URL GENERATION
// =============================================================================

function getUrlList(slug, filtersJson) {
    if (slug && slug.indexOf('http') === 0) return slug;
    var path = slug || "chuong-moi";
    return "https://wikicv.net/" + path.replace(/^\//, "");
}

function getUrlSearch(keyword, filtersJson) {
    return "https://wikicv.net/tim-kiem?q=" + encodeURIComponent(keyword);
}

function getUrlDetail(slug) {
    if (slug && slug.indexOf('http') === 0) return slug;
    var validSlug = slug || "";
    return "https://wikicv.net/" + validSlug.replace(/^\//, "");
}

function getUrlCategories() {
    return "https://wikicv.net/chuong-moi";
}

// =============================================================================
// PARSING LOGIC
// =============================================================================

function parseListResponse(htmlContent) {
    try {
        var items = [];
        var blocks = htmlContent.split('<div class="book-item">');
        
        for (var i = 1; i < blocks.length; i++) {
            var block = blocks[i];
            
            var urlMatch = /<a[^>]*href="([^"]+)"[^>]*>/i.exec(block);
            if (!urlMatch) continue;
            var url = urlMatch[1];
            if (url.indexOf("http") !== 0) {
                url = "https://wikicv.net" + (url.indexOf("/") === 0 ? "" : "/") + url;
            }
            
            var titleMatch = /<h5[^>]*>([\s\S]*?)<\/h5>/i.exec(block);
            var title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : "Unknown";
            
            var coverMatch = /<img[^>]*src="([^"]+)"/i.exec(block);
            var cover = coverMatch ? coverMatch[1] : "";
            if (cover && cover.indexOf("http") !== 0) {
                cover = "https://wikicv.net" + (cover.indexOf("/") === 0 ? "" : "/") + cover;
            }
            
            var authorMatch = /<p class="book-author">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i.exec(block);
            var subTitle = authorMatch ? authorMatch[1].replace(/<[^>]*>/g, '').trim() : "";
            
            var slugMatch = /\/truyen\/(.+)$/.exec(url);
            var itemSlug = slugMatch ? "truyen/" + slugMatch[1] : url;

            items.push({
                "id": itemSlug,
                "title": title,
                "posterUrl": cover,
                "backdropUrl": cover,
                "episode_current": subTitle
            });
        }

        var totalPages = 1;
        var maxPageMatches = htmlContent.match(/page=(\d+)/g);
        if (maxPageMatches) {
            for (var j = 0; j < maxPageMatches.length; j++) {
                var page = parseInt(maxPageMatches[j].split('=')[1]);
                if (page > totalPages) totalPages = page;
            }
        }

        return JSON.stringify({
            items: items,
            totalPages: totalPages
        });
    } catch (e) {
        return JSON.stringify({
            items: [],
            totalPages: 1
        });
    }
}

function parseMovieDetail(htmlContent, apiUrl) {
    var titleMatch = /<h2[^>]*>([\s\S]*?)<\/h2>/i.exec(htmlContent);
    var title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : "Unknown Title";
    
    var descMatch = /<div class="book-desc-detail"[^>]*>([\s\S]*?)<\/div>/i.exec(htmlContent);
    var desc = descMatch ? descMatch[1].trim() : "";
    
    var posterMatch = /<div class="book-cover"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/i.exec(htmlContent) || /<img[^>]*class="[^"]*cover[^"]*"[^>]*src="([^"]+)"/i.exec(htmlContent);
    var poster = posterMatch ? posterMatch[1] : "";
    if (poster && poster.indexOf("http") !== 0) {
        poster = "https://wikicv.net" + (poster.indexOf("/") === 0 ? "" : "/") + poster;
    }
    
    var authorMatch = /Tác giả:[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i.exec(htmlContent);
    var author = authorMatch ? authorMatch[1].replace(/<[^>]*>/g, '').trim() : "Unknown";
    
    var status = "Unknown";
    var stMatch = /Tình trạng:[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i.exec(htmlContent);
    if(stMatch) status = stMatch[1].replace(/<[^>]*>/g, '').trim();
    
    var category = [];
    var catMatch = /Thể loại:[\s\S]*?<\/b>([\s\S]*?)<\/p>/i.exec(htmlContent);
    if(catMatch) {
        var tags = catMatch[1].split(',');
        for(var i=0; i<tags.length; i++) {
            category.push(tags[i].replace(/<[^>]*>/g, '').trim());
        }
    }
    
    var chapters = [];
    var chapterRegex = /href="(\/truyen\/[^"\/]+\/chuong-[^"]+)"[^>]*>([\s\S]*?)<\/a>/ig;
    
    var bookIdMatch = /bookId\s*=\s*['"]([^'"]+)['"]/i.exec(htmlContent);
    var signKeyMatch = /signKey\s*=\s*['"]([^'"]+)['"]/i.exec(htmlContent);
    
    if (bookIdMatch && signKeyMatch) {
        try {
            var bookId = bookIdMatch[1];
            var signKey = signKeyMatch[1];
            var signFunc=function a(W){function V(d,c){return d>>>c|d<<32-c}for(var U,T,S=Math.pow,R=S(2,32),Q="length",P="",O=[],N=8*W[Q],M=a.h=a.h||[],L=a.k=a.k||[],K=L[Q],J={},I=2;64>K;I++){if(!J[I]){for(U=0;313>U;U+=I){J[U]=I}M[K]=S(I,0.5)*R|0,L[K++]=S(I,1/3)*R|0}}for(W+="\x80";W[Q]%64-56;){W+="\x00"}for(U=0;U<W[Q];U++){if(T=W.charCodeAt(U),T>>8){return}O[U>>2]|=T<<(3-U)%4*8}for(O[O[Q]]=N/R|0,O[O[Q]]=N,T=0;T<O[Q];){var H=O.slice(T,T+=16),G=M;for(M=M.slice(0,8),U=0;64>U;U++){var F=H[U-15],E=H[U-2],D=M[0],C=M[4],B=M[7]+(V(C,6)^V(C,11)^V(C,25))+(C&M[5]^~C&M[6])+L[U]+(H[U]=16>U?H[U]:H[U-16]+(V(F,7)^V(F,18)^F>>>3)+H[U-7]+(V(E,17)^V(E,19)^E>>>10)|0),A=(V(D,2)^V(D,13)^V(D,22))+(D&M[1]^D&M[2]^M[1]&M[2]);M=[B+A|0].concat(M),M[4]=M[4]+B|0}for(U=0;8>U;U++){M[U]=M[U]+G[U]|0}}for(U=0;8>U;U++){for(T=3;T+1;T--){var z=M[U]>>8*T&255;P+=(16>z?0:"")+z.toString(16)}}return P};
            function fuzzySign(text) { return text.substring(64) + text.substring(0, 64); }
            var f = 0, e = 5000;
            var b = signFunc(fuzzySign(signKey + f + e));
            var apiChapterUrl = "https://wikicv.net/book/index?bookId=" + bookId + "&start=" + f + "&size=" + e + "&signKey=" + signKey + "&sign=" + b;
            
            var chaptersHtml = "";
            if (typeof Packages !== 'undefined') {
                var url = new Packages.java.net.URL(apiChapterUrl);
                var conn = url.openConnection();
                conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
                conn.setRequestProperty("X-Requested-With", "XMLHttpRequest");
                conn.setRequestProperty("Referer", apiUrl || "https://wikicv.net/");
                conn.setConnectTimeout(5000);
                conn.setReadTimeout(10000);
                var is = conn.getInputStream();
                var reader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(is, "UTF-8"));
                var line = "";
                var builder = new Packages.java.lang.StringBuilder();
                while ((line = reader.readLine()) !== null) { builder.append(line).append("\n"); }
                chaptersHtml = builder.toString();
                is.close();
            } else if (typeof KkHttpClient !== 'undefined') {
                // If Rhino is disabled but KkHttpClient is available
                // It might fail if KkHttpClient doesn't support headers, but we can't do much.
                chaptersHtml = KkHttpClient.get(apiChapterUrl);
            }
            
            var m;
            while((m = chapterRegex.exec(chaptersHtml)) !== null) {
                var cUrl = m[1];
                if (cUrl.indexOf("http") !== 0) { cUrl = "https://wikicv.net" + (cUrl.indexOf("/") === 0 ? "" : "/") + cUrl; }
                var slugMatch = /\/truyen\/(.+)$/.exec(cUrl);
                var cSlug = slugMatch ? "truyen/" + slugMatch[1] : cUrl;
                var cName = m[2].replace(/<[^>]*>/g, "").trim();
                chapters.push({ id: cUrl, name: cName, slug: cSlug });
            }
        } catch (err) {}
    }

    if (chapters.length === 0) {
        chapterRegex.lastIndex = 0;
        var m;
        while((m = chapterRegex.exec(htmlContent)) !== null) {
            var url = m[1];
            if (url.indexOf("http") !== 0) {
                url = "https://wikicv.net" + (url.indexOf("/") === 0 ? "" : "/") + url;
            }
            var slugMatch = /\/truyen\/(.+)$/.exec(url);
            var cSlug = slugMatch ? "truyen/" + slugMatch[1] : url;
            
            var name = m[2].replace(/<[^>]*>/g, "").trim();
            chapters.push({
                id: url,
                name: name,
                slug: cSlug
            });
        }
    }

    return JSON.stringify({
        id: apiUrl || "",
        title: title,
        originName: title,
        posterUrl: poster,
        backdropUrl: poster,
        description: desc,
        year: new Date().getFullYear(),
        quality: "Text",
        servers: [{
            name: "WikiCV",
            episodes: chapters
        }],
        author: author,
        category: category.join(", "),
        status: status
    });
}

function parseDetailResponse(htmlContent, apiUrl) {
    var content = "";
    try {
        var contentMatch = /<div id="bookContentBody"[^>]*>([\s\S]*?)<\/div>\s*<div/i.exec(htmlContent);
        if (!contentMatch) {
            contentMatch = /<div id="bookContentBody"[^>]*>([\s\S]*?)<\/div>/i.exec(htmlContent);
        }
        if (contentMatch) {
            content = contentMatch[1];
        } else {
            var contentMatch2 = /<div class="book-content"[^>]*>([\s\S]*?)<\/div>/i.exec(htmlContent);
            if(contentMatch2) content = contentMatch2[1];
        }
    } catch (err) {
        content = "Error parsing: " + err.toString();
    }
    
    // Remove ads
    content = content.replace(/<div[^>]*class="ads-[^"]*"[^>]*>[\s\S]*?<\/div>/ig, "");
    content = content.replace(/<script[\s\S]*?<\/script>/ig, "");
    
    if (!content || content.trim() === "") {
        content = "Không lấy được nội dung chương. Có thể trang web yêu cầu đăng nhập hoặc có thay đổi.";
    }
    
    return JSON.stringify({
        images: [], // Force NOVEL mode
        text: content,
        html: content,
        content: content,
        headers: {
            "Referer": "https://wikicv.net/"
        }
    });
}
