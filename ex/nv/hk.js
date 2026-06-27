// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "hako",
        "name": "Hako",
        "version": "1.0.0",
        "baseUrl": "https://docln.sbs",
        "iconUrl": "https://docln.sbs/img/favicon-2026-2x.png",
        "isEnabled": true,
        "type": "NOVEL",
        "layoutType": "GRID"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'danh-sach?truyendich=1&sapxep=capnhat', title: 'Mới cập nhật', type: 'Grid', path: 'danh-sach' },
        { slug: 'danh-sach?truyendich=1&sapxep=top', title: 'Top toàn thời gian', type: 'Horizontal', path: 'danh-sach' },
        { slug: 'danh-sach?truyendich=1&sapxep=topthang', title: 'Top tháng', type: 'Horizontal', path: 'danh-sach' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Mới cập nhật', slug: 'danh-sach?truyendich=1&sapxep=capnhat' },
        { name: 'Top toàn thời gian', slug: 'danh-sach?truyendich=1&sapxep=top' },
        { name: 'Top tháng', slug: 'danh-sach?truyendich=1&sapxep=topthang' },
        { name: 'Sáng tác', slug: 'sang-tac' }
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
    var path = slug || "danh-sach?truyendich=1&sapxep=capnhat";
    return "https://docln.sbs/" + path.replace(/^\//, "");
}

function getUrlSearch(keyword, filtersJson) {
    return "https://docln.sbs/tim-kiem?keywords=" + encodeURIComponent(keyword);
}

function getUrlDetail(slug) {
    if (slug && slug.indexOf('http') === 0) return slug;
    var validSlug = slug || "";
    return "https://docln.sbs/" + validSlug.replace(/^\//, "");
}

function getUrlCategories() {
    return "https://docln.sbs/danh-sach";
}

// =============================================================================
// PARSING LOGIC
// =============================================================================

function parseListResponse(htmlContent) {
    try {
        var items = [];
        var blocks = htmlContent.split('class="thumb-item-flow');
        for (var i = 1; i < blocks.length; i++) {
            var block = blocks[i];
            
            var urlMatch = /<div class="thumb_attr series-title">[\s\S]*?<a[^>]*href="([^"]+)"/i.exec(block);
            if (!urlMatch) continue;
            var url = urlMatch[1];
            
            var titleMatch = /<div class="thumb_attr series-title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i.exec(block);
            var title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : "Unknown";
            
            var coverMatch = /data-bg="([^"]+)"/i.exec(block) || /src="([^"]+)"/i.exec(block);
            var cover = coverMatch ? coverMatch[1] : "";
            
            var chapMatch = /<div class="thumb_attr chapter-title"[^>]*><a[^>]*>([\s\S]*?)<\/a>/i.exec(block);
            var subTitle = chapMatch ? chapMatch[1].replace(/<[^>]*>/g, '').trim() : "";
            
            if (url.indexOf("http") !== 0) {
                url = "https://docln.sbs" + (url.indexOf("/") === 0 ? "" : "/") + url;
            }
            if (cover.indexOf("http") !== 0 && cover) {
                cover = "https://docln.sbs" + (cover.indexOf("/") === 0 ? "" : "/") + cover;
            }
            
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
    var titleMatch = /<span class="series-name">\s*<a[^>]*>([\s\S]*?)<\/a>/i.exec(htmlContent);
    var title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : "Unknown Title";
    
    var descMatch = /<div class="summary-content[^"]*">\s*([\s\S]*?)<\/div>/i.exec(htmlContent);
    var desc = descMatch ? descMatch[1].replace(/<[^>]*>/g, '').trim() : "";
    
    var posterMatch = /<div class="a6-ratio">\s*<div class="content img-in-ratio"[^>]*data-bg="([^"]+)"/i.exec(htmlContent) 
                   || /<div class="a6-ratio">\s*<div class="content img-in-ratio"[^>]*style="background-image:\s*url\('([^']+)'\)"/i.exec(htmlContent);
    var poster = posterMatch ? posterMatch[1] : "";
    if (poster.indexOf("http") !== 0 && poster) {
        poster = "https://docln.sbs" + (poster.indexOf("/") === 0 ? "" : "/") + poster;
    }
    
    var author = "Unknown";
    var status = "Unknown";
    var infoRegex = /<div class="info-item">([\s\S]*?)<\/div>\s*<\/div>/ig;
    var m;
    while ((m = infoRegex.exec(htmlContent)) !== null) {
        var block = m[1];
        var nameMatch = /<span class="info-name">([\s\S]*?)<\/span>/i.exec(block);
        var valueMatch = /<span class="info-value[^>]*>([\s\S]*?)<\/span>/i.exec(block);
        if (nameMatch && valueMatch) {
            var k = nameMatch[1].replace(/<[^>]*>/g, '').trim();
            var v = valueMatch[1].replace(/<[^>]*>/g, '').trim();
            if (k === "Tình trạng:") status = v;
        } else if (nameMatch && !valueMatch) {
            var k2 = nameMatch[1].replace(/<[^>]*>/g, '').trim();
            var aRegex = /<a[^>]*>([\s\S]*?)<\/a>/ig;
            var vals = [];
            var am;
            while((am = aRegex.exec(block)) !== null) {
                vals.push(am[1].trim());
            }
            if (k2 === "Tác giả:") author = vals.join(", ");
        }
    }
    
    var category = [];
    var catRegex = /<a class="series-gerne-item"[^>]*>([\s\S]*?)<\/a>/ig;
    while((m = catRegex.exec(htmlContent)) !== null) {
        category.push(m[1].replace(/<[^>]*>/g, '').trim());
    }
    
    var chapters = [];
    var chapRegexAlt = /<div class="chapter-name">[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/ig;
    while((m = chapRegexAlt.exec(htmlContent)) !== null) {
        var url = m[1];
        if (url.indexOf("http") !== 0) {
            url = "https://docln.sbs" + (url.indexOf("/") === 0 ? "" : "/") + url;
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
            name: "DocLN",
            episodes: chapters
        }],
        author: author,
        category: category.join(", "),
        status: status
    });
}

function parseDetailResponse(htmlContent, apiUrl) {
    function decodeBase64(s) {
        var e = {}, i, b = 0, c, x, l = 0, a, r = "", w = String.fromCharCode, L = s.length;
        var A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (i = 0; i < 64; i++) { e[A.charAt(i)] = i; }
        for (x = 0; x < L; x++) {
            c = e[s.charAt(x)]; b = (b << 6) + c; l += 6;
            while (l >= 8) { ((a = (b >>> (l -= 8)) & 0xff) || (x < (L - 2))) && (r += w(a)); }
        }
        return r;
    }

    function decryptXorShuffle(t, e) {
        var raw = decodeBase64(t);
        var keyLen = e.length;
        var res = [];
        for (var i = 0; i < raw.length; i++) {
            res.push(raw.charCodeAt(i) ^ e.charCodeAt(i % keyLen));
        }
        var str = "";
        for (var i = 0; i < res.length; i++) {
            var c = res[i];
            if (c < 128) {
                str += String.fromCharCode(c);
            } else if ((c > 191) && (c < 224)) {
                var c2 = res[i+1];
                str += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 1;
            } else {
                var c2 = res[i+1];
                var c3 = res[i+2];
                str += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 2;
            }
        }
        return str;
    }

    var content = "";
    try {
        var protectMatch = /<div[^>]*id="chapter-c-protected"[^>]*>/i.exec(htmlContent);
        if (protectMatch) {
            var tag = protectMatch[0];
            var nMatch = /data-s=(["'])(.*?)\1/i.exec(tag);
            var oMatch = /data-k=(["'])(.*?)\1/i.exec(tag);
            var cMatch = /data-c=(["'])(.*?)\1/i.exec(tag);
            
            var n = nMatch ? nMatch[2] : "";
            var o = oMatch ? oMatch[2] : "";
            var cAttr = cMatch ? cMatch[2] : "[]";
            
            var e = JSON.parse(cAttr.replace(/&quot;/g, '"'));
            if (e && e.length > 0) {
                e.sort(function(a, b) {
                    return parseInt(a.substring(0,4), 10) - parseInt(b.substring(0,4), 10);
                });
                var decryptedChunks = [];
                for (var i = 0; i < e.length; i++) {
                    var s = e[i].substring(4);
                    if (n === "xor_shuffle") {
                        decryptedChunks.push(decryptXorShuffle(s, o));
                    } else if (n === "base64_reverse") {
                        var rev = s.split("").reverse().join("");
                        var decRaw = decodeBase64(rev);
                        var arr = [];
                        for(var k=0; k<decRaw.length; k++) arr.push(decRaw.charCodeAt(k));
                        
                        var str = "";
                        for (var x = 0; x < arr.length; x++) {
                            var c = arr[x];
                            if (c < 128) {
                                str += String.fromCharCode(c);
                            } else if ((c > 191) && (c < 224)) {
                                var c2 = arr[x+1];
                                str += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                                x += 1;
                            } else {
                                var c2 = arr[x+1];
                                var c3 = arr[x+2];
                                str += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                                x += 2;
                            }
                        }
                        decryptedChunks.push(str);
                    } else {
                        var decRaw = decodeBase64(s);
                        var arr = [];
                        for(var k=0; k<decRaw.length; k++) arr.push(decRaw.charCodeAt(k));
                        
                        var str = "";
                        for (var x = 0; x < arr.length; x++) {
                            var c = arr[x];
                            if (c < 128) {
                                str += String.fromCharCode(c);
                            } else if ((c > 191) && (c < 224)) {
                                var c2 = arr[x+1];
                                str += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                                x += 1;
                            } else {
                                var c2 = arr[x+1];
                                var c3 = arr[x+2];
                                str += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                                x += 2;
                            }
                        }
                        decryptedChunks.push(str);
                    }
                }
                content = decryptedChunks.join("");
            }
        } else {
            var contentMatch = /<div[^>]*id="chapter-content"[^>]*>([\s\S]*?)<section class="rd-basic_icon/i.exec(htmlContent);
            if (!contentMatch) {
                contentMatch = /<div[^>]*id="chapter-content"[^>]*>([\s\S]*?)<\/div>/i.exec(htmlContent);
            }
            if (contentMatch) {
                content = contentMatch[1];
            }
        }
    } catch (err) {
        content = "Error parsing: " + err.toString();
    }
    
    // Remove ads and buttons
    content = content.replace(/<div[^>]*id="ads-chapter-top"[^>]*>[\s\S]*?<\/div>/ig, "");
    content = content.replace(/<div[^>]*class="ads-[^"]*"[^>]*>[\s\S]*?<\/div>/ig, "");
    
    // Fix absolute URLs for images
    content = content.replace(/src="(\/[^"]+)"/ig, 'src="https://docln.sbs$1"');
    
    // Do NOT strip HTML tags, otherwise images inline with text are lost and Cineio might use comic mode.
    
    if (!content || content.trim() === "") {
        content = "Không lấy được nội dung chương. Có thể do Cloudflare chặn hoặc cấu trúc trang thay đổi.\n\n" + htmlContent.substring(0, 500);
    }
    
    return JSON.stringify({
        images: [], // Force NOVEL mode, do not trigger COMIC reader
        text: content,
        html: content,
        content: content,
        headers: {
            "Referer": "https://docln.sbs/"
        }
    });
}
