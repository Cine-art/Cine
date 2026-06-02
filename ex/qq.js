// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================
function getManifest() {
    return JSON.stringify({
        "id": "truyenqq",
        "name": "TruyenQQ",
        "version": "1.0.0",
        "baseUrl": "https://truyenqqko.com",
        "iconUrl": "https://truyenqqko.com/favicon.ico",
        "isEnabled": true,
        "type": "MANGA"
    });
}
function getHomeSections() {
    return JSON.stringify([
        { "slug": "truyen-moi-cap-nhat", "title": "Mới Cập Nhật", "type": "Grid", "path": "" },
        { "slug": "top-ngay", "title": "Top Ngày", "type": "Horizontal", "path": "" },
        { "slug": "top-tuan", "title": "Top Tuần", "type": "Horizontal", "path": "" },
        { "slug": "top-thang", "title": "Top Tháng", "type": "Horizontal", "path": "" },
        { "slug": "truyen-yeu-thich", "title": "Yêu Thích", "type": "Horizontal", "path": "" }
    ]);
}
function getPrimaryCategories() {
    return JSON.stringify([
        { "name": "Mới Cập Nhật", "slug": "truyen-moi-cap-nhat" },
        { "name": "Top Ngày", "slug": "top-ngay" },
        { "name": "Top Tuần", "slug": "top-tuan" },
        { "name": "Top Tháng", "slug": "top-thang" },
        { "name": "Yêu Thích", "slug": "truyen-yeu-thich" }
    ]);
}
function getFilterConfig() {
    return JSON.stringify({
        "sort": [
            { "name": "Mới nhất", "value": "moi-nhat" }
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
        
        // Handle categories / genres (e.g. action-26, romance-36)
        if (slug.indexOf("the-loai/") === 0 || slug.indexOf("action-") === 0 || slug.indexOf("romance-") === 0) {
            var genreSlug = slug;
            if (genreSlug.indexOf("the-loai/") === -1) {
                genreSlug = "the-loai/" + genreSlug;
            }
            if (page > 1) {
                return "https://truyenqqko.com/" + genreSlug + "/trang-" + page;
            }
            return "https://truyenqqko.com/" + genreSlug;
        }
        // Handle predefined home sections
        if (slug === "top-ngay") {
            return "https://truyenqqko.com/top-ngay" + (page > 1 ? "/trang-" + page : "");
        } else if (slug === "top-tuan") {
            return "https://truyenqqko.com/top-tuan" + (page > 1 ? "/trang-" + page : "");
        } else if (slug === "top-thang") {
            return "https://truyenqqko.com/top-thang" + (page > 1 ? "/trang-" + page : "");
        } else if (slug === "truyen-yeu-thich") {
            return "https://truyenqqko.com/truyen-yeu-thich" + (page > 1 ? "/trang-" + page : "");
        }
        // Default or "truyen-moi-cap-nhat"
        return "https://truyenqqko.com/truyen-moi-cap-nhat" + (page > 1 ? "/trang-" + page : "");
    } catch (e) {
        return "https://truyenqqko.com/";
    }
}
function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        if (page > 1) {
            return "https://truyenqqko.com/tim-kiem/trang-" + page + "?q=" + encodeURIComponent(keyword);
        }
        return "https://truyenqqko.com/tim-kiem?q=" + encodeURIComponent(keyword);
    } catch (e) {
        return "https://truyenqqko.com/tim-kiem?q=" + encodeURIComponent(keyword);
    }
}
function getUrlDetail(slug) {
    if (slug.indexOf("http://") === 0 || slug.indexOf("https://") === 0) {
        return slug;
    }
    if (slug.indexOf("/") === 0) {
        return "https://truyenqqko.com" + slug;
    }
    return "https://truyenqqko.com/truyen-tranh/" + slug;
}
// =============================================================================
// PARSERS
// =============================================================================
function parseListResponse(htmlContent) {
    var items = [];
    var liRegex = /<li>([\s\S]*?)<\/li>/g;
    var match;
    var seen = {};
    while ((match = liRegex.exec(htmlContent)) !== null) {
        var liBlock = match[1];
        if (liBlock.indexOf('book_avatar') === -1) {
            continue;
        }
        // Extract relative slug path e.g. "thien-ma-3077-16100"
        var slugMatch = /href=["'](?:https?:\/\/[^\/]+)?\/truyen-tranh\/([^"']+)["']/.exec(liBlock);
        if (!slugMatch) continue;
        var slug = slugMatch[1];
        if (seen[slug]) continue;
        seen[slug] = true;
        // Extract title safely from book_name container
        var title = "";
        var bookNameMatch = /class="book_name"[^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/.exec(liBlock);
        if (bookNameMatch) {
            title = bookNameMatch[1].trim().replace(/<[^>]*>/g, "");
        } else {
            var altMatch = /alt=["']([^"']+)["']/.exec(liBlock);
            if (altMatch) title = altMatch[1];
        }
        if (!title) {
            title = slug.split('-').join(' ');
        }
        // Extract cover URL (prioritizing high-quality data-fb mirror)
        var cover = "";
        var dataFbMatch = /data-fb=["']([^"']+)["']/.exec(liBlock);
        if (dataFbMatch && dataFbMatch[1] && dataFbMatch[1].indexOf('no_image') === -1) {
            cover = dataFbMatch[1];
        } else {
            var srcMatch = /src=["']([^"']+)["']/.exec(liBlock);
            if (srcMatch) {
                cover = srcMatch[1];
            }
        }
        if (cover && cover.indexOf("//") === 0) {
            cover = "https:" + cover;
        }
        // Extract latest chapter name
        var lastChap = "Chương mới";
        var lastChapMatch = /class="last_chapter"[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/.exec(liBlock);
        if (lastChapMatch) {
            lastChap = lastChapMatch[1].replace(/<[^>]*>/g, "").trim();
        }
        items.push({
            "id": slug,
            "title": title,
            "posterUrl": cover,
            "backdropUrl": cover,
            "year": 2026,
            "quality": "Manga",
            "episode_current": lastChap
        });
    }
    // Determine pagination values
    var currentPage = 1;
    var totalPages = 1;
    
    var activeMatch = /class=["']active["']>(\d+)</.exec(htmlContent);
    if (activeMatch) {
        currentPage = parseInt(activeMatch[1]);
    }
    
    // Find all pagination links (e.g. /trang-5) and compute max page count
    var pageRegex = /\/trang-(\d+)/g;
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
    var slug = apiUrl.substring(apiUrl.lastIndexOf("/") + 1);
    var title = "Manga Detail";
    var description = "Read manga online on TruyenQQ.";
    var posterUrl = "";
    var year = 2026;
    var rating = 9.0;
    var casts = "";
    var category = "";
    var country = "";
    var servers = [];
    // Extract title (clean website names and trailing chapter index)
    var ogTitle = /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
    if (ogTitle) {
        title = ogTitle[1].replace(" - TruyenQQ", "")
                         .replace(/\s+chương\s+mới\s+nhất\s+\d+/i, "")
                         .replace(/\s+chapter\s+mới\s+nhất\s+\d+/i, "")
                         .trim();
    }
    var ogDesc = /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
    if (ogDesc) {
        description = ogDesc[1].trim();
    }
    var ogImg = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
    if (ogImg) {
        posterUrl = ogImg[1].trim();
    }
    // Parse Genres
    var genres = [];
    var genreRegex = /href=["'](?:https?:\/\/[^\/]+)?\/the-loai\/[^"'\s>]+["'][^>]*>([\s\S]*?)<\/a>/g;
    var genreMatch;
    while ((genreMatch = genreRegex.exec(htmlContent)) !== null) {
        var gName = genreMatch[1].trim();
        if (gName && genres.indexOf(gName) === -1) {
            genres.push(gName);
        }
    }
    category = genres.join(", ");
    // Parse Manga Release Status
    var status = "ongoing";
    var statusMatch = /Tình trạng:[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i.exec(htmlContent);
    if (statusMatch) {
        var statusStr = statusMatch[1].replace(/<[^>]*>/g, "").trim().toLowerCase();
        if (statusStr.indexOf("hoàn thành") > -1 || statusStr.indexOf("completed") > -1) {
            status = "completed";
        }
    }
    // Parse Chapter List
    var episodes = [];
    var chapterRegex = /href=["'](?:https?:\/\/[^\/]+)?(\/truyen-tranh\/[^"'\s<>]+-chap-[^"'\s<>]+)["'][^>]*>([\s\S]*?)<\/a>/g;
    var chapMatch;
    var seenChaps = {};
    while ((chapMatch = chapterRegex.exec(htmlContent)) !== null) {
        var chapUrl = "https://truyenqqko.com" + chapMatch[1];
        var chapName = chapMatch[2].replace(/<[^>]*>/g, "").trim();
        
        // Skip administrative link headers/footers
        if (chapName.indexOf("Đọc từ đầu") > -1 || chapName.indexOf("Đọc mới nhất") > -1) {
            continue;
        }
        if (seenChaps[chapUrl]) {
            continue;
        }
        seenChaps[chapUrl] = true;
        episodes.push({
            "id": chapUrl,
            "name": chapName,
            "slug": chapUrl.substring(chapUrl.lastIndexOf("/") + 1)
        });
    }
    // Reverse list: html has newest chapter first, we want oldest chapter first
    episodes.reverse();
    servers.push({
        "name": "TruyenQQ",
        "episodes": episodes
    });
    return JSON.stringify({
        "id": slug,
        "title": title,
        "originName": title,
        "posterUrl": posterUrl,
        "backdropUrl": posterUrl,
        "description": description,
        "year": year,
        "rating": rating,
        "quality": "Manga",
        "servers": servers,
        "casts": casts,
        "category": category,
        "country": country,
        "status": status
    });
}
function parseDetailResponse(htmlContent, apiUrl) {
    var images = [];
    var imgTagRegex = /<img\s+([^>]+)>/g;
    var match;
    
    while ((match = imgTagRegex.exec(htmlContent)) !== null) {
        var attrs = match[1];
        if (attrs.indexOf('class=') > -1 && attrs.indexOf('lazy') > -1) {
            var imgUrl = "";
            var cdnMatch = /data-cdn=["']([^"']+)["']/.exec(attrs);
            var origMatch = /data-original=["']([^"']+)["']/.exec(attrs);
            var srcMatch = /src=["']([^"']+)["']/.exec(attrs);
            
            if (cdnMatch && cdnMatch[1]) {
                imgUrl = cdnMatch[1];
            } else if (origMatch && origMatch[1]) {
                imgUrl = origMatch[1];
            } else if (srcMatch && srcMatch[1]) {
                imgUrl = srcMatch[1];
            }
            
            // Filter base64 placeholder values
            if (imgUrl && imgUrl.indexOf("data:") !== 0 && imgUrl.indexOf("base64") === -1) {
                if (imgUrl.indexOf("//") === 0) {
                    imgUrl = "https:" + imgUrl;
                }
                images.push(imgUrl);
            }
        }
    }
    
    return JSON.stringify({
        "images": images,
        "headers": {
            "Referer": "https://truyenqqko.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
    });
}
