// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================
function getManifest() {
    return JSON.stringify({
        "id": "bogorraincake",
        "name": "Motchill",
        "version": "1.0.0",
        "baseUrl": "https://bogorraincake.com",
        "iconUrl": "https://bogorraincake.com/wp-content/uploads/2024/12/cropped-favicon2-32x32.png",
        "isEnabled": true,
        "type": "MOVIE"
    });
}
function getHomeSections() {
    return JSON.stringify([
        { "slug": "phim-bo", "title": "Phim Bộ", "type": "Horizontal", "path": "" },
        { "slug": "phim-le", "title": "Phim Lẻ", "type": "Horizontal", "path": "" },
        { "slug": "hoat-hinh", "title": "Hoạt Hình", "type": "Horizontal", "path": "" },
        { "slug": "tv-shows", "title": "TV Shows", "type": "Horizontal", "path": "" },
        { "slug": "phim-chieu-rap", "title": "Phim Chiếu Rạp", "type": "Grid", "path": "" }
    ]);
}
function getPrimaryCategories() {
    return JSON.stringify([
        { "name": "Phim Bộ", "slug": "phim-bo" },
        { "name": "Phim Lẻ", "slug": "phim-le" },
        { "name": "Hoạt Hình", "slug": "hoat-hinh" },
        { "name": "TV Shows", "slug": "tv-shows" },
        { "name": "Phim Chiếu Rạp", "slug": "phim-chieu-rap" }
    ]);
}
function getFilterConfig() {
    return JSON.stringify({
        "sort": [
            { "name": "Mới nhất", "value": "default" }
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
        
        var path = slug;
        // Handle categories or countries slugs
        if (slug.indexOf("the-loai/") === 0 || slug.indexOf("quoc-gia/") === 0) {
            path = slug;
        } else if (slug === "phim-bo" || slug === "phim-le" || slug === "hoat-hinh" || slug === "tv-shows" || slug === "phim-chieu-rap") {
            path = "danh-sach/" + slug;
        }
        
        if (page > 1) {
            return "https://bogorraincake.com/" + path + "/page/" + page + "/";
        }
        return "https://bogorraincake.com/" + path + "/";
    } catch (e) {
        return "https://bogorraincake.com/";
    }
}
function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        if (page > 1) {
            return "https://bogorraincake.com/page/" + page + "/?s=" + encodeURIComponent(keyword);
        }
        return "https://bogorraincake.com/?s=" + encodeURIComponent(keyword);
    } catch (e) {
        return "https://bogorraincake.com/?s=" + encodeURIComponent(keyword);
    }
}
function getUrlDetail(slug) {
    if (slug.indexOf("http://") === 0 || slug.indexOf("https://") === 0) {
        return slug;
    }
    if (slug.indexOf("/") === 0) {
        return "https://bogorraincake.com" + slug;
    }
    return "https://bogorraincake.com/phim/" + slug;
}
// =============================================================================
// PARSERS
// =============================================================================
function parseListResponse(htmlContent) {
    var items = [];
    var liRegex = /<li[^>]*>([\s\S]*?)<\/li>/g;
    var match;
    var seen = {};
    while ((match = liRegex.exec(htmlContent)) !== null) {
        var liBlock = match[1];
        if (liBlock.indexOf('img-film') === -1) {
            continue;
        }
        // Extract relative or absolute slug path e.g. "vi-me-anh-phan-chia-tay"
        var slugMatch = /href=["'](?:https?:\/\/[^\/]+)?\/phim\/([^"']+)["']/.exec(liBlock);
        if (!slugMatch) continue;
        var slug = slugMatch[1].trim();
        if (seen[slug]) continue;
        seen[slug] = true;
        // Extract title
        var title = "";
        var titleMatch = /class="name-title"[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/.exec(liBlock);
        if (titleMatch) {
            title = titleMatch[1].trim().replace(/<[^>]*>/g, "");
        } else {
            var titleAttrMatch = /title=["']([^"']+)["']/.exec(liBlock);
            if (titleAttrMatch) title = titleAttrMatch[1].trim();
        }
        if (!title) {
            title = slug.split('-').join(' ');
        }
        // Extract cover URL (prioritizing data-original for lazy loaded images)
        var cover = "";
        var dataOrigMatch = /data-original=["']([^"']+)["']/.exec(liBlock);
        if (dataOrigMatch) {
            cover = dataOrigMatch[1].trim();
        } else {
            var srcMatch = /src=["']([^"']+)["']/.exec(liBlock);
            if (srcMatch) cover = srcMatch[1].trim();
        }
        
        if (cover && cover.indexOf("//") === 0) {
            cover = "https:" + cover;
        } else if (cover && cover.indexOf("http") !== 0) {
            cover = "https://bogorraincake.com" + (cover.indexOf("/") === 0 ? "" : "/") + cover;
        }
        // Extract current episode/label
        var lastChap = "Full";
        var labelMatch = /class="label">([^<]+)</.exec(liBlock);
        if (labelMatch) {
            lastChap = labelMatch[1].trim();
        }
        items.push({
            "id": slug,
            "title": title,
            "posterUrl": cover,
            "backdropUrl": cover,
            "year": 2026,
            "quality": "HD",
            "episode_current": lastChap
        });
    }
    // Determine pagination values
    var currentPage = 1;
    var totalPages = 1;
    
    var activeMatch = /class=["'][^"']*page-numbers current[^"']*["']>(\d+)</.exec(htmlContent);
    if (activeMatch) {
        currentPage = parseInt(activeMatch[1]);
    }
    
    // Find all pagination links (e.g. /page/5/) and compute max page count
    var pageRegex = /\/page\/(\d+)\/?["'\s>]/g;
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
    
    var title = "Movie Detail";
    var description = "Watch for free on Motchill.";
    var posterUrl = "";
    var year = 2026;
    var rating = 9.0;
    var casts = "";
    var category = "";
    var country = "";
    var director = "";
    var status = "ongoing";
    var servers = [];
    // Extract title (clean website name and trailing chapter index)
    var ogTitle = /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
    if (ogTitle) {
        title = ogTitle[1].replace(" - Motchill", "").trim();
        if (title.indexOf("Phim ") === 0) {
            title = title.substring(5).trim();
        }
    }
    var ogDesc = /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
    if (ogDesc) {
        description = ogDesc[1].trim();
    }
    var ogImg = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
    if (ogImg) {
        posterUrl = ogImg[1].trim();
    }
    // Extract dl block values (Trạng thái, Số tập, Thời lượng, Tình trạng, Quốc gia, Đạo diễn, Diễn viên, Thể loại, Năm sản xuất)
    var dlMatches = {};
    var dlRegex = /<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/g;
    var dlMatch;
    while ((dlMatch = dlRegex.exec(htmlContent)) !== null) {
        var dt = dlMatch[1].replace(/<[^>]*>/g, "").replace(/:/g, "").trim().toLowerCase();
        var dd = dlMatch[2].replace(/<[^>]*>/g, "").trim();
        dlMatches[dt] = dd;
    }
    // Extract categories
    if (dlMatches["thể loại"]) {
        category = dlMatches["thể loại"].split(",").map(function(s) { return s.trim(); }).filter(Boolean).join(", ");
    }
    
    // Extract country
    if (dlMatches["quốc gia"]) {
        country = dlMatches["quốc gia"].split(",").map(function(s) { return s.trim(); }).filter(Boolean).join(", ");
    }
    // Extract director
    if (dlMatches["đạo diễn"]) {
        director = dlMatches["đạo diễn"].trim();
    }
    // Extract casts
    if (dlMatches["diễn viên"]) {
        casts = dlMatches["diễn viên"].split(",").map(function(s) { return s.trim(); }).filter(Boolean).join(", ");
    }
    // Extract year
    if (dlMatches["năm sản xuất"]) {
        year = parseInt(dlMatches["năm sản xuất"]) || 2026;
    }
    // Extract status
    var statusVal = dlMatches["tình trạng"] || "";
    if (statusVal.toLowerCase().indexOf("hoàn thành") > -1 || statusVal.toLowerCase().indexOf("completed") > -1 || statusVal.toLowerCase().indexOf("hoàn tất") > -1) {
        status = "completed";
    }
    // Extract total episodes or current episode number
    var totalEps = 1;
    var epLabel = dlMatches["trạng thái"] || "";
    var numMatch = /Tập\s*(\d+)/i.exec(epLabel);
    var curEp = numMatch ? parseInt(numMatch[1]) : 1;
    if (!numMatch) {
        var slashMatch = /(\d+)\s*\/\s*(\d+)/.exec(epLabel);
        if (slashMatch) {
            curEp = parseInt(slashMatch[1]);
        }
    }
    
    var maxEps = parseInt(dlMatches["số tập"]) || 1;
    if (status === "completed" && maxEps > 1) {
        totalEps = maxEps;
    } else if (curEp > 1) {
        totalEps = curEp;
    } else {
        // If not a series, check if the label indicates series
        if (epLabel.indexOf("Tập") > -1 || (dlMatches["số tập"] && parseInt(dlMatches["số tập"]) > 1)) {
            totalEps = maxEps || curEp || 1;
        } else {
            totalEps = 1; // single movie
        }
    }
    // Build episodes list dynamically
    var episodesList = [];
    if (totalEps > 1) {
        for (var i = 1; i <= totalEps; i++) {
            episodesList.push({
                "id": "https://bogorraincake.com/phim/" + slug + "/tap-" + i + "-sv-0",
                "name": "Tập " + i,
                "slug": "tap-" + i
            });
        }
    } else {
        // Single movie
        episodesList.push({
            "id": "https://bogorraincake.com/phim/" + slug + "/tap-1-sv-0",
            "name": "Xem Phim",
            "slug": "full"
        });
    }
    servers.push({
        "name": "Motchill",
        "episodes": episodesList
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
        "quality": "HD",
        "servers": servers,
        "casts": casts,
        "category": category,
        "country": country,
        "director": director,
        "status": status
    });
}
function parseDetailResponse(htmlContent, apiUrl) {
    var streamUrl = "";
    var isEmbed = false;
    
    // Search for data-link, data-type and class="streaming-server" inside tags
    var tagRegex = /<a[^>]+class=["'][^"']*streaming-server[^"']*["'][^>]*>/g;
    var tagMatch;
    while ((tagMatch = tagRegex.exec(htmlContent)) !== null) {
        var tagAttrs = tagMatch[0];
        var linkMatch = /data-link=["']([^"']+)["']/.exec(tagAttrs);
        var typeMatch = /data-type=["']([^"']+)["']/.exec(tagAttrs);
        if (linkMatch) {
            streamUrl = linkMatch[1];
            isEmbed = typeMatch ? (typeMatch[1] === "embed") : false;
            break;
        }
    }
    
    if (!streamUrl) {
        // Alternative regex if attributes are differently ordered
        var altRegex = /<[^>]+data-link=["']([^"']+)["'][^>]+data-type=["']([^"']+)["'][^>]+chooseStreamingServer/g;
        var altMatch = altRegex.exec(htmlContent);
        if (altMatch) {
            streamUrl = altMatch[1];
            isEmbed = (altMatch[2] === "embed");
        }
    }
    if (!streamUrl) {
        streamUrl = apiUrl;
    }
    
    return JSON.stringify({
        "url": streamUrl.replace(/&amp;/g, "&"),
        "isEmbed": isEmbed,
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": "https://bogorraincake.com/"
        }
    });
}
