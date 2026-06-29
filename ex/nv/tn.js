// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "truyennet",
        "name": "TruyenNet",
        "version": "1.0.0",
        "baseUrl": "https://truyennet.org",
        "iconUrl": "https://truyennet.org/images/logo.png",
        "isEnabled": true,
        "type": "NOVEL"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { "slug": "danh-sach/truyen-hot", "title": "Truyện Hot", "type": "Grid", "path": "danh-sach/truyen-hot" },
        { "slug": "danh-sach/truyen-full", "title": "Truyện Full", "type": "Horizontal", "path": "danh-sach/truyen-full" },
        { "slug": "the-loai/ngon-tinh", "title": "Ngôn Tình", "type": "Horizontal", "path": "the-loai/ngon-tinh" }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { "name": "Tiên Hiệp", "slug": "the-loai/tien-hiep" },
        { "name": "Kiếm Hiệp", "slug": "the-loai/kiem-hiep" },
        { "name": "Ngôn Tình", "slug": "the-loai/ngon-tinh" },
        { "name": "Đam Mỹ", "slug": "the-loai/dam-my" },
        { "name": "Huyền Huyễn", "slug": "the-loai/huyen-huyen" },
        { "name": "Dị Giới", "slug": "the-loai/di-gioi" },
        { "name": "Xuyên Không", "slug": "the-loai/xuyen-khong" },
        { "name": "Đô Thị", "slug": "the-loai/do-thi" }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
		category: [
		{ "name": "Tiên Hiệp", "slug": "the-loai/tien-hiep" },
        { "name": "Kiếm Hiệp", "slug": "the-loai/kiem-hiep" },
        { "name": "Ngôn Tình", "slug": "the-loai/ngon-tinh" },
        { "name": "Đam Mỹ", "slug": "the-loai/dam-my" },
        { "name": "Huyền Huyễn", "slug": "the-loai/huyen-huyen" },
        { "name": "Dị Giới", "slug": "the-loai/di-gioi" },
        { "name": "Xuyên Không", "slug": "the-loai/xuyen-khong" },
        { "name": "Đô Thị", "slug": "the-loai/do-thi" },
		{ "name": "Quan Trường", "slug": "the-loai/quan-truong" },
        { "name": "Võng Du", "slug": "the-loai/vong-du" },
        { "name": "Khoa Huyễn", "slug": "the-loai/khoa-huyen" },
		{ "name": "Hệ Thống", "slug": "the-loai/he-thong" },
		{ "name": "Dị Năng", "slug": "the-loai/di-nang" },
		{ "name": "Sắc", "slug": "the-loai/sac" },
        { "name": "Quân Sự", "slug": "the-loai/quan-su" },
        { "name": "Lịch Sử", "slug": "the-loai/lich-su" },
		{ "name": "Xuyên Nhanh", "slug": "the-loai/xuyen-nhanh" },
        { "name": "Trọng Sinh", "slug": "the-loai/trong-sinh" },
        { "name": "Trinh Thám", "slug": "the-loai/trinh-tham" },
		{ "name": "Linh Dị", "slug": "the-loai/linh-di" },
        { "name": "Ngược", "slug": "the-loai/nguoc" },
		{ "name": "Sủng", "slug": "the-loai/sung" },
		{ "name": "Cung Đấu", "slug": "the-loai/cung-dau" },
        { "name": "Nữ Cường", "slug": "the-loai/nu-cuong" },
        { "name": "Gia Đấu", "slug": "the-loai/gia-dau" },
		{ "name": "Đông Phương", "slug": "the-loai/dong-phuong" },
        { "name": "Bách Hợp", "slug": "the-loai/bach-hop" },
		{ "name": "Điền Văn", "slug": "the-loai/dien-van" },
        { "name": "Mạt Thế", "slug": "the-loai/mat-the" },
        { "name": "Truyện Teen", "slug": "the-loai/truyen-teen" },
		{ "name": "Nữ Phụ", "slug": "the-loai/nu-phu" },
        { "name": "Light Novel", "slug": "the-loai/light-novel" },
        { "name": "Đoản Văn", "slug": "the-loai/doan-van" },
		{ "name": "Khác", "slug": "the-loai/khac" }
        ]
	});
}

// =============================================================================
// URL GENERATION
// =============================================================================

var globalUaSuffix = "";

function getUrlList(slug, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        
        var categorySlug = slug;
        if (!categorySlug) {
            categorySlug = "danh-sach/truyen-hot"; // default to hot
        }

        if (page > 1) {
            return "https://truyennet.org/" + categorySlug + "?page=" + page + globalUaSuffix;
        }
        return "https://truyennet.org/" + categorySlug + globalUaSuffix;
    } catch (e) {
        return "https://truyennet.org/danh-sach/truyen-hot" + globalUaSuffix;
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        if (page > 1) {
            return "https://truyennet.org/tim-kiem?s=" + encodeURIComponent(keyword) + "&page=" + page + globalUaSuffix;
        }
        return "https://truyennet.org/tim-kiem?s=" + encodeURIComponent(keyword) + globalUaSuffix;
    } catch (e) {
        return "https://truyennet.org/tim-kiem?s=" + encodeURIComponent(keyword) + globalUaSuffix;
    }
}

function getUrlDetail(slug) {
    var url = slug;
    if (slug.indexOf("http://") === 0 || slug.indexOf("https://") === 0) {
        url = slug;
    } else if (slug.indexOf("/") === 0) {
        url = "https://truyennet.org" + slug;
    } else {
        url = "https://truyennet.org/" + slug;
    }
    
    // Ensure we don't append suffix multiple times if slug already has it
    if (url.indexOf("|User-Agent") === -1 && globalUaSuffix) {
        url = url + globalUaSuffix;
    }
    return url;
}

// =============================================================================
// UTILS
// =============================================================================
function cleanText(text) {
    if (!text) return "";
    return text.replace(/<[^>]*>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
        })
        .replace(/\s+/g, " ")
        .trim();
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(htmlContent) {
    var items = [];
    var blocks = htmlContent.split('class="item"');
    
    for (var i = 1; i < blocks.length; i++) {
        var rowBlock = blocks[i];
        
        // Find title and link
        var titleMatch = /<h3[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i.exec(rowBlock);
        if (!titleMatch) continue;
        
        var url = titleMatch[1];
        var title = cleanText(titleMatch[2]);
        var slugMatch = /\/([^\/]+)\/?$/.exec(url);
        var slug = slugMatch ? slugMatch[1] : url.replace(/\//g, "");
        
        if (!slug) continue;

        // Find cover
        var cover = "";
        var imgTag = /<img[^>]+src=["']([^"']+)["']/i.exec(rowBlock);
        if (imgTag) cover = imgTag[1];
        if (cover && cover.indexOf("http") !== 0) {
            cover = "https://truyennet.org" + cover;
        }
        
        // Find chapter
        var lastChap = "";
        var chapMatch = /Số chương\s*:\s*<\/span>\s*(\d+)/i.exec(rowBlock);
        if (chapMatch) {
            lastChap = "Chương " + chapMatch[1];
        } else {
            var chapLinkMatch = /<div class="ichapter">\s*<a[^>]*>([\s\S]*?)<\/a>/i.exec(rowBlock);
            if (chapLinkMatch) lastChap = cleanText(chapLinkMatch[1]);
        }

        items.push({
            "id": slug,
            "title": title,
            "posterUrl": cover,
            "backdropUrl": cover,
            "year": new Date().getFullYear(),
            "quality": "Text",
            "episode_current": lastChap
        });
    }

    var currentPage = 1;
    var totalPages = 1;
    
    var activeMatch = /<a[^>]*class="btn-page active[^>]*>([\s\S]*?)<\/a>/i.exec(htmlContent);
    if (activeMatch) {
        currentPage = parseInt(cleanText(activeMatch[1]));
    }
    
    var pageRegex = /page=(\d+)/g;
    var pageMatch;
    var maxPage = currentPage;
    while ((pageMatch = pageRegex.exec(htmlContent)) !== null) {
        var pVal = parseInt(pageMatch[1]);
        if (pVal > maxPage) {
            maxPage = pVal;
        }
    }
    totalPages = maxPage;

    return JSON.stringify({
        "items": items,
        "pagination": {
            "currentPage": currentPage,
            "totalPages": totalPages
        }
    });
}

function parseSearchResponse(htmlContent) {
    return parseListResponse(htmlContent);
}

function parseMovieDetail(htmlContent, apiUrl) {
    var slugMatch = /\/([^\/]+)\/?$/.exec(apiUrl);
    var slug = slugMatch ? slugMatch[1] : "";
    if (apiUrl.indexOf("?") > 0) {
        slug = /\/([^\/\?]+)/.exec(apiUrl)[1];
    }
    
    var title = "Novel Detail";
    var description = "";
    var posterUrl = "";
    var status = "Đang tiến hành";
    var author = "";
    var category = "";
    var servers = [];

    // Title
    var titleMatch = /<h1[^>]*itemprop="name"[^>]*>([\s\S]*?)<\/h1>/i.exec(htmlContent);
    if (titleMatch) {
        title = cleanText(titleMatch[1]);
    }

    // Description
    var descMatch = /<div class="scrolltext">([\s\S]*?)<\/div>/i.exec(htmlContent);
    if (descMatch) {
        description = descMatch[1].trim();
    }

    // Poster
    var imgMatch = /<div class="book-info-pic">\s*<img[^>]*src="([^"]+)"/i.exec(htmlContent);
    if (imgMatch) {
        posterUrl = imgMatch[1];
        if (posterUrl && posterUrl.indexOf("http") !== 0) {
            posterUrl = "https://truyennet.org" + posterUrl;
        }
    }

    // Info blocks
    var authorMatch = /Tác giả:<\/b>\s*<a[^>]*>([\s\S]*?)<\/a>/i.exec(htmlContent);
    if (authorMatch) {
        author = cleanText(authorMatch[1]);
    }
    
    var catMatch = /Thể loại:<\/b>\s*<a[^>]*>([\s\S]*?)<\/a>/i.exec(htmlContent);
    if (catMatch) {
        category = cleanText(catMatch[1]);
    }
    
    var stMatch = /Trạng thái:<\/b>([\s\S]*?)<\/li>/i.exec(htmlContent);
    if (stMatch) {
        status = cleanText(stMatch[1]);
    }

    // Chapters
    var episodes = [];
    var listChapBlockRegex = /<div id="chapter-list">([\s\S]*?)(?:<div class='paging'>|<\/div>\s*<\/div>)/i;
    var chapListMatch = listChapBlockRegex.exec(htmlContent);
    var uaSuffix = "";
    
    if (chapListMatch) {
        var liRegex = /<li><a[^>]*href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a><\/li>/ig;
        var chapMatch;
        while ((chapMatch = liRegex.exec(chapListMatch[1])) !== null) {
            var chapUrl = chapMatch[1];
            if (chapUrl.indexOf("/") === 0) {
                chapUrl = "https://truyennet.org" + chapUrl;
            } else if (chapUrl.indexOf("http") !== 0) {
                chapUrl = "https://truyennet.org/" + chapUrl;
            }
            var chapName = cleanText(chapMatch[2]);
            var cSlugMatch = /\/([^\/]+)\/?$/.exec(chapUrl);
            var cSlug = cSlugMatch ? cSlugMatch[1] : chapUrl;
            
            episodes.push({
                "id": chapUrl + uaSuffix,
                "name": chapName,
                "slug": cSlug
            });
        }
    }

    // Try to fetch remaining pages if pagination exists
    try {
        var maxPage = 1;
        var pBlockMatch = /<div class='paging'>([\s\S]*?)<\/div>/i.exec(htmlContent);
        if (pBlockMatch) {
            var pageRegex = /page\(\d+,(\d+)\)/g;
            var pageMatch;
            while ((pageMatch = pageRegex.exec(pBlockMatch[1])) !== null) {
                var pVal = parseInt(pageMatch[1], 10);
                if (pVal > maxPage) {
                    maxPage = pVal;
                }
            }
        }

        if (maxPage > 1) {
            var bidMatch = /var bid = '([^']+)';/i.exec(htmlContent);
            if (bidMatch) {
                var bid = bidMatch[1];
                var fetchLimit = maxPage > 20 ? 20 : maxPage;
                
                for (var p = 2; p <= fetchLimit; p++) {
                    var pageUrl = "https://truyennet.org/ajax/chap?bid=" + bid + "&page=" + p;
                    
                    var pageHtml = "";
                    try {
                        if (typeof KkHttpClient !== 'undefined') {
                            pageHtml = KkHttpClient.get(pageUrl);
                        } else {
                            // Fallback to Rhino Packages.java interop
                            var url = new Packages.java.net.URL(pageUrl);
                            var conn = url.openConnection();
                            conn.setRequestProperty("User-Agent", "Mozilla/5.0");
                            conn.setConnectTimeout(5000);
                            conn.setReadTimeout(5000);
                            var is = conn.getInputStream();
                            var reader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(is, "UTF-8"));
                            var line = "";
                            var builder = new Packages.java.lang.StringBuilder();
                            while ((line = reader.readLine()) !== null) {
                                builder.append(line).append("\n");
                            }
                            pageHtml = builder.toString();
                            is.close();
                        }
                    } catch (e) {
                        break;
                    }

                    if (pageHtml) {
                        var pLiRegex = /<li><a[^>]*href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a><\/li>/ig;
                        var pChapMatch;
                        while ((pChapMatch = pLiRegex.exec(pageHtml)) !== null) {
                            var pChapUrl = pChapMatch[1];
                            if (pChapUrl.indexOf("/") === 0) {
                                pChapUrl = "https://truyennet.org" + pChapUrl;
                            } else if (pChapUrl.indexOf("http") !== 0) {
                                pChapUrl = "https://truyennet.org/" + pChapUrl;
                            }
                            var pChapName = cleanText(pChapMatch[2]);
                            var pCSlugMatch = /\/([^\/]+)\/?$/.exec(pChapUrl);
                            var pCSlug = pCSlugMatch ? pCSlugMatch[1] : pChapUrl;
                            
                            episodes.push({
                                "id": pChapUrl + uaSuffix,
                                "name": pChapName,
                                "slug": pCSlug
                            });
                        }
                    }
                }
            }
        }
    } catch (e) {
        // Fallback silently
    }
    
    servers.push({
        "name": "TruyenNet",
        "episodes": episodes
    });

    return JSON.stringify({
        "id": slug,
        "title": title,
        "originName": title,
        "posterUrl": posterUrl,
        "backdropUrl": posterUrl,
        "description": cleanText(description),
        "year": new Date().getFullYear(),
        "quality": "Text",
        "servers": servers,
        "author": author,
        "category": category,
        "status": status
    });
}

function parseDetailResponse(htmlContent, apiUrl) {
    // Extract chapter content
    var content = "";
    var contentMatch = /<div class="truyen" id="story">([\s\S]*?)<\/div>\s*<div class="chapter_wrap control-last">/i.exec(htmlContent);
    
    if (contentMatch) {
        content = contentMatch[1];
    } else {
        var contentMatch2 = /<div class="truyen"[^>]*>([\s\S]*?)<\/div>/i.exec(htmlContent);
        if (contentMatch2) {
            content = contentMatch2[1];
        }
    }
    
    var images = [];
    var imgRegex = /<img[^>]+src="([^"]+)"/ig;
    var imgMatch;
    while((imgMatch = imgRegex.exec(content)) !== null) {
        images.push(imgMatch[1]);
    }
    
    return JSON.stringify({
        "images": images,
        "text": content,
        "html": content,
        "content": content,
        "headers": {
            "Referer": "https://truyennet.org/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
    });
}
