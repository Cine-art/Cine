// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "truyenfull",
        "name": "TruyenFull",
        "version": "1.0.0",
        "baseUrl": "https://truyenfull.today",
        "iconUrl": "https://truyenfull.today/favicons/favicon-192x192.png",
        "isEnabled": true,
        "type": "NOVEL"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { "slug": "danh-sach/truyen-moi", "title": "Truyện Mới Cập Nhật", "type": "Grid", "path": "danh-sach/truyen-moi" },
        { "slug": "danh-sach/truyen-hot", "title": "Truyện Hot", "type": "Horizontal", "path": "danh-sach/truyen-hot" },
        { "slug": "danh-sach/truyen-full", "title": "Truyện Full", "type": "Horizontal", "path": "danh-sach/truyen-full" }
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
		{ "name": "Chủ Công", "slug": "the-loai/chu-cong" },
        { "name": "Võng Du", "slug": "the-loai/vong-du" },
        { "name": "Khoa Huyễn", "slug": "the-loai/khoa-huyen" },
		{ "name": "Hệ Thống", "slug": "the-loai/he-thong" },
		{ "name": "Huyền Huyễn", "slug": "the-loai/huyen-huyen" },
        { "name": "Dị Giới", "slug": "the-loai/di-gioi" },
		{ "name": "Dị Năng", "slug": "the-loai/di-nang" },
		{ "name": "Sắc", "slug": "the-loai/sac" },
        { "name": "Quân Sự", "slug": "the-loai/quan-su" },
        { "name": "Lịch Sử", "slug": "the-loai/lich-su" },
		{ "name": "Xuyên Sách", "slug": "the-loai/xuyen-sach" },
		{ "name": "Xuyên Nhanh", "slug": "the-loai/xuyen-nhanh" },
		{ "name": "Cận Đại", "slug": "the-loai/can-dai" },
        { "name": "Trọng Sinh", "slug": "the-loai/trong-sinh" },
        { "name": "Trinh Thám", "slug": "the-loai/trinh-tham" },
		{ "name": "Thám Hiểm", "slug": "the-loai/tham-hiem" },
		{ "name": "Linh Dị", "slug": "the-loai/linh-di" },
        { "name": "Ngược", "slug": "the-loai/nguoc" },
		{ "name": "Sủng", "slug": "the-loai/sung" },
		{ "name": "Cung Đấu", "slug": "the-loai/cung-dau" },
        { "name": "Nữ Cường", "slug": "the-loai/nu-cuong" },
        { "name": "Gia Đấu", "slug": "the-loai/gia-dau" },
		{ "name": "Đông Phương", "slug": "the-loai/dong-phuong" },
		{ "name": "Đô Thị", "slug": "the-loai/do-thi" },
        { "name": "Bách Hợp", "slug": "the-loai/bach-hop" },
		{ "name": "Hài Hước", "slug": "the-loai/hai-huoc" },
		{ "name": "Điền Văn", "slug": "the-loai/dien-van" },
		{ "name": "Cổ Đại", "slug": "the-loai/co-dai" },
        { "name": "Mạt Thế", "slug": "the-loai/mat-the" },
        { "name": "Truyện Teen", "slug": "the-loai/truyen-teen" },
		{ "name": "Phương Tây", "slug": "the-loai/phuong-tay" },
		{ "name": "Nữ Phụ", "slug": "the-loai/nu-phu" },
        { "name": "Light Novel", "slug": "the-loai/light-novel" },
		{ "name": "Việt Nam", "slug": "the-loai/viet-nam" },
		{ "name": "Tương Lai", "slug": "the-loai/tuong-lai" },
        { "name": "Đoản Văn", "slug": "the-loai/doan-van" },
		{ "name": "Review Sách", "slug": "the-loai/truyen-ngan" },
		{ "name": "Khác", "slug": "the-loai/khac" }
        ]
	});
}

// =============================================================================
// URL GENERATION
// =============================================================================

function getUrlList(slug, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        
        var categorySlug = slug;
        if (!categorySlug) {
            categorySlug = "danh-sach/truyen-moi";
        }

        if (page > 1) {
            return "https://truyenfull.today/" + categorySlug + "/trang-" + page + "/";
        }
        return "https://truyenfull.today/" + categorySlug + "/";
    } catch (e) {
        return "https://truyenfull.today/danh-sach/truyen-moi/";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        if (page > 1) {
            return "https://truyenfull.today/tim-kiem/?tukhoa=" + encodeURIComponent(keyword) + "&page=" + page;
        }
        return "https://truyenfull.today/tim-kiem/?tukhoa=" + encodeURIComponent(keyword);
    } catch (e) {
        return "https://truyenfull.today/tim-kiem/?tukhoa=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (slug.indexOf("http://") === 0 || slug.indexOf("https://") === 0) {
        return slug;
    }
    if (slug.indexOf("/") === 0) {
        return "https://truyenfull.today" + slug;
    }
    return "https://truyenfull.today/" + slug + "/";
}

// =============================================================================
// UTILS
// =============================================================================
function getAttr(attrs, name) {
    var regex = new RegExp(name + '\\s*=\\s*(?:["\']([^"\']+)["\']|([^\\s>]+))', 'i');
    var match = regex.exec(attrs);
    if (match) {
        return match[1] || match[2] || "";
    }
    return "";
}

function cleanText(text) {
    if (!text) return "";
    return text.replace(/<[^>]*>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/\s+/g, " ")
        .trim();
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(htmlContent) {
    var items = [];
    var blocks = htmlContent.split('itemtype="https://schema.org/Book"');
    
    // In case there is no schema.org/Book, try splitting by row
    if (blocks.length <= 1) {
        blocks = htmlContent.split('class="row"');
    }

    for (var i = 1; i < blocks.length; i++) {
        var rowBlock = blocks[i];
        
        // Find title and link
        var titleMatch = /<h3[^>]*class="truyen-title"[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i.exec(rowBlock);
        if (!titleMatch) continue;
        
        var url = titleMatch[1];
        var title = cleanText(titleMatch[2]);
        var slugMatch = /\/([^\/]+)\/?$/.exec(url);
        var slug = slugMatch ? slugMatch[1] : "";
        
        if (!slug) continue;

        // Find cover
        var cover = "";
        var imgMatch = /data-image="([^"]+)"/i.exec(rowBlock);
        if (imgMatch) {
            cover = imgMatch[1];
        } else {
            var imgTag = /<img[^>]+src="([^"]+)"/i.exec(rowBlock);
            if (imgTag) cover = imgTag[1];
        }
        
        // Find chapter
        var lastChap = "";
        var chapMatch = /<div[^>]*class="col-xs-2 text-info"[^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i.exec(rowBlock);
        if (chapMatch) {
            lastChap = cleanText(chapMatch[1]);
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
    
    var activeMatch = /<li[^>]*class="active"[^>]*>[\s\S]*?<span>(\d+)<\/span>/i.exec(htmlContent);
    if (activeMatch) {
        currentPage = parseInt(activeMatch[1]);
    } else {
        var activeA = /<li[^>]*class="active"[^>]*>[\s\S]*?<a[^>]*>(\d+)<\/a>/i.exec(htmlContent);
        if (activeA) currentPage = parseInt(activeA[1]);
    }
    
    var pageRegex = /trang-(\d+)/g;
    var pageMatch;
    var maxPage = currentPage;
    while ((pageMatch = pageRegex.exec(htmlContent)) !== null) {
        var pVal = parseInt(pageMatch[1]);
        if (pVal > maxPage) {
            maxPage = pVal;
        }
    }
    
    // For search page
    var searchPageRegex = /page=(\d+)/g;
    while ((pageMatch = searchPageRegex.exec(htmlContent)) !== null) {
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
    
    var title = "Novel Detail";
    var description = "";
    var posterUrl = "";
    var status = "Đang tiến hành";
    var author = "";
    var category = "";
    var servers = [];

    // Title
    var titleMatch = /<h3[^>]*class="title"[^>]*>([\s\S]*?)<\/h3>/i.exec(htmlContent);
    if (titleMatch) {
        title = cleanText(titleMatch[1]);
    }

    // Description
    var descMatch = /<div[^>]*class="desc-text[^"]*"[^>]*>([\s\S]*?)<\/div>/i.exec(htmlContent);
    if (descMatch) {
        description = descMatch[1].trim();
    }

    // Poster
    var imgMatch = /<div[^>]*class="book"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/i.exec(htmlContent);
    if (imgMatch) {
        posterUrl = imgMatch[1];
    }

    // Info blocks
    var authorMatch = /Tác giả:<\/h3>([\s\S]*?)<\/div>/i.exec(htmlContent);
    if (authorMatch) {
        author = cleanText(authorMatch[1]);
    }
    
    var catMatch = /Thể loại:<\/h3>([\s\S]*?)<\/div>/i.exec(htmlContent);
    if (catMatch) {
        category = cleanText(catMatch[1]);
    }
    
    var stMatch = /Trạng thái:<\/h3>([\s\S]*?)<\/div>/i.exec(htmlContent);
    if (stMatch) {
        status = cleanText(stMatch[1]);
    }

    // Chapters
    var episodes = [];
    var listChapBlockRegex = /<ul[^>]*class="list-chapter"[^>]*>([\s\S]*?)<\/ul>/ig;
    var liRegex = /<li>\s*<span[^>]*class="glyphicon[^"]*"[^>]*><\/span>\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/li>/ig;

    var chapUl;
    while ((chapUl = listChapBlockRegex.exec(htmlContent)) !== null) {
        var chapMatch;
        while ((chapMatch = liRegex.exec(chapUl[1])) !== null) {
            var chapUrl = chapMatch[1];
            var chapName = cleanText(chapMatch[2]);
            var cSlugMatch = /\/([^\/]+)\/?$/.exec(chapUrl);
            var cSlug = cSlugMatch ? cSlugMatch[1] : chapUrl;
            
            episodes.push({
                "id": chapUrl,
                "name": chapName,
                "slug": cSlug
            });
        }
    }

    // Try to fetch remaining pages if pagination exists
    try {
        var maxPage = 1;
        var pageRegex = /trang-(\d+)/g;
        var pageMatch;
        while ((pageMatch = pageRegex.exec(htmlContent)) !== null) {
            var pVal = parseInt(pageMatch[1], 10);
            if (pVal > maxPage) {
                maxPage = pVal;
            }
        }

        if (maxPage > 1) {
            // Limit to 20 pages max to prevent blocking the UI for too long
            var fetchLimit = maxPage > 20 ? 20 : maxPage;
            
            for (var p = 2; p <= fetchLimit; p++) {
                var cleanApi = apiUrl.replace(/\/$/, "");
                var pageUrl = cleanApi + "/trang-" + p + "/";
                
                // Use Rhino Java interop to fetch HTTP content synchronously
                var pageHtml = "";
                try {
                    var url = new java.net.URL(pageUrl);
                    var conn = url.openConnection();
                    conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
                    conn.setConnectTimeout(5000);
                    conn.setReadTimeout(5000);
                    var is = conn.getInputStream();
                    var reader = new java.io.BufferedReader(new java.io.InputStreamReader(is, "UTF-8"));
                    var line = "";
                    var builder = new java.lang.StringBuilder();
                    while ((line = reader.readLine()) !== null) {
                        builder.append(line).append("\n");
                    }
                    pageHtml = builder.toString();
                    is.close();
                } catch (e) {
                    // Ignore fetch errors for subsequent pages
                }

                if (pageHtml) {
                    var pListChapBlock = /<ul[^>]*class="list-chapter"[^>]*>([\s\S]*?)<\/ul>/ig;
                    var pLiRegex = /<li>\s*<span[^>]*class="glyphicon[^"]*"[^>]*><\/span>\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/li>/ig;
                    var pChapUl;
                    while ((pChapUl = pListChapBlock.exec(pageHtml)) !== null) {
                        var pChapMatch;
                        while ((pChapMatch = pLiRegex.exec(pChapUl[1])) !== null) {
                            var pChapUrl = pChapMatch[1];
                            var pChapName = cleanText(pChapMatch[2]);
                            var pCSlugMatch = /\/([^\/]+)\/?$/.exec(pChapUrl);
                            var pCSlug = pCSlugMatch ? pCSlugMatch[1] : pChapUrl;
                            
                            episodes.push({
                                "id": pChapUrl,
                                "name": pChapName,
                                "slug": pCSlug
                            });
                        }
                    }
                }
            }
        }
    } catch (e) {
        // Fallback silently if Java interop is blocked or fails
    }
    
    servers.push({
        "name": "TruyenFull",
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
    var contentMatch = /<div[^>]*id="chapter-c"[^>]*class="chapter-c"[^>]*>([\s\S]*?)<\/div>\s*<hr[^>]*class="chapter-end"/i.exec(htmlContent);
    
    if (contentMatch) {
        content = contentMatch[1];
    } else {
        var contentMatch2 = /<div[^>]*id="chapter-c"[^>]*class="chapter-c"[^>]*>([\s\S]*?)<\/div>/i.exec(htmlContent);
        if (contentMatch2) {
            content = contentMatch2[1];
        }
    }
    
    // Remove ads
    content = content.replace(/<div[^>]*id="ads-chapter-top"[^>]*>[\s\S]*?<\/div>/ig, "");
    content = content.replace(/<div[^>]*class="ads-[^"]*"[^>]*>[\s\S]*?<\/div>/ig, "");
    
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
            "Referer": "https://truyenfull.today/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
    });
}
