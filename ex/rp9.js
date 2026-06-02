// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================
function getManifest() {
    return JSON.stringify({
        "id": "rophim9",
        "name": "RoPhim9",
        "version": "1.0.0",
        "baseUrl": "https://rophim9.org",
        "iconUrl": "https://rophim9.org/favicon.ico",
        "isEnabled": true,
        "type": "MOVIE"
    });
}
function getHomeSections() {
    return JSON.stringify([
        { "slug": "phim-bo", "title": "Phim Bộ", "type": "Horizontal", "path": "" },
        { "slug": "phim-le", "title": "Phim Lẻ", "type": "Horizontal", "path": "" },
        { "slug": "hoat-hinh", "title": "Hoạt Hình", "type": "Horizontal", "path": "" }
    ]);
}
function getPrimaryCategories() {
    return JSON.stringify([
        { "name": "Phim Mới", "slug": "phim-moi" },
        { "name": "Phim Bộ", "slug": "phim-bo" },
        { "name": "Phim Lẻ", "slug": "phim-le" },
        { "name": "Hoạt Hình", "slug": "hoat-hinh" }
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
        
        if (slug === "phim-bo") {
            return "https://rophim9.org/phim-bo?page=" + page;
        } else if (slug === "phim-le") {
            return "https://rophim9.org/phim-le?page=" + page;
        } else if (slug === "hoat-hinh") {
            return "https://rophim9.org/the-loai/hoat-hinh?page=" + page;
        }
        
        // Fallback for "phim-moi"
        return "https://rophim9.org/?page=" + page;
    } catch (e) {
        return "https://rophim9.org/";
    }
}
function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        return "https://rophim9.org/tim-kiem?keyword=" + encodeURIComponent(keyword) + "&page=" + page;
    } catch (e) {
        return "https://rophim9.org/tim-kiem?keyword=" + encodeURIComponent(keyword);
    }
}
function getUrlDetail(slug) {
    if (slug.indexOf("http://") === 0 || slug.indexOf("https://") === 0) {
        return slug;
    }
    
    // Slug is the composite ID: "movieId|movieSlug|title|poster"
    var parts = slug.split("|");
    if (parts.length >= 4) {
        var id = parts[0];
        var movieSlug = parts[1];
        var title = parts[2];
        var poster = parts[3];
        // Construct the baseapi URL to fetch the episode list directly!
        return "https://rophim9.org/baseapi/api/v1/episodes/by-idMovie/" + id + 
               "?m_id=" + id + 
               "&m_slug=" + movieSlug + 
               "&m_title=" + title + 
               "&m_poster=" + poster;
    }
    
    // Fallback if not composite
    return "https://rophim9.org/phim/" + slug;
}
// =============================================================================
// HELPERS
// =============================================================================
function getQueryParam(url, name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
// Helper to extract nested JSON objects matching braces
function extractJsonObject(str, startIndex) {
    var braceCount = 0;
    var inString = false;
    var escape = false;
    
    for (var i = startIndex; i < str.length; i++) {
        var char = str.charAt(i);
        if (escape) {
            escape = false;
            continue;
        }
        if (char === '\\') {
            escape = true;
            continue;
        }
        if (char === '"') {
            inString = !inString;
            continue;
        }
        if (!inString) {
            if (char === '{') {
                braceCount++;
            } else if (char === '}') {
                braceCount--;
                if (braceCount === 0) {
                    return str.substring(startIndex, i + 1);
                }
            }
        }
    }
    return null;
}
// Helper to decode Next.js __next_f push payloads
function decodeNextPayload(htmlContent) {
    var nextPushRegex = /self\.__next_f\.push\(\[1,\s*"(.*?)"\s*\]\)/g;
    var match;
    var decodedPayload = "";
    
    while ((match = nextPushRegex.exec(htmlContent)) !== null) {
        var m = match[1];
        try {
            var unescaped = m
                .replace(/\\"/g, '"')
                .replace(/\\\\/g, '\\')
                .replace(/\\\//g, '/')
                .replace(/\\n/g, '\n')
                .replace(/\\r/g, '\r')
                .replace(/\\t/g, '\t');
            
            // Handle unicode escape sequences
            unescaped = unescaped.replace(/\\u([0-9a-fA-F]{4})/g, function (g, m1) {
                return String.fromCharCode(parseInt(m1, 16));
            });
            
            decodedPayload += unescaped;
        } catch (err) {
            decodedPayload += m;
        }
    }
    return decodedPayload;
}
// =============================================================================
// PARSERS
// =============================================================================
function parseListResponse(htmlContent) {
    var items = [];
    var decodedPayload = decodeNextPayload(htmlContent);
    
    // Search for all occurrences of '{"id":' in the decoded payload
    var pos = 0;
    var seen = {};
    while (true) {
        var idx = decodedPayload.indexOf('{"id":', pos);
        if (idx === -1) {
            break;
        }
        
        var objStr = extractJsonObject(decodedPayload, idx);
        if (objStr) {
            try {
                var item = JSON.parse(objStr);
                if (item && item.id && item.name && item.slug && (item.poster || item.thumbnail)) {
                    var idStr = String(item.id);
                    if (!seen[idStr]) {
                        seen[idStr] = true;
                        
                        var poster = item.poster || item.thumbnail || "";
                        if (poster.indexOf("//") === 0) poster = "https:" + poster;
                        
                        // Construct composite ID: movieId|slug|name|poster
                        var compositeId = item.id + "|" + item.slug + "|" + encodeURIComponent(item.name) + "|" + encodeURIComponent(poster);
                        
                        items.push({
                            "id": compositeId,
                            "title": item.name,
                            "posterUrl": poster,
                            "backdropUrl": item.poster || poster,
                            "year": item.publish_year ? parseInt(item.publish_year) : 2026,
                            "quality": item.quality || "HD",
                            "episode_current": item.episode_current || "Full"
                        });
                    }
                }
            } catch (e) {
                // Ignore parse errors for sub-objects
            }
        }
        pos = idx + 6;
    }
    
    // Fallback regex to capture from HTML anchors
    if (items.length === 0) {
        var detailRegex = /href=["']\/phim\/([^"']+)["']/g;
        var matchFallback;
        var seenFallback = {};
        while ((matchFallback = detailRegex.exec(htmlContent)) !== null) {
            var slugVal = matchFallback[1];
            if (!seenFallback[slugVal]) {
                seenFallback[slugVal] = true;
                
                var titleClean = slugVal.split("-").join(" ");
                titleClean = titleClean.replace(/\b\w/g, function(l){ return l.toUpperCase(); });
                
                items.push({
                    "id": slugVal + "|" + slugVal + "|" + encodeURIComponent(titleClean) + "|",
                    "title": titleClean,
                    "posterUrl": "https://rophim9.org/images/capture.png",
                    "backdropUrl": "https://rophim9.org/images/capture.png",
                    "year": 2026,
                    "quality": "HD",
                    "episode_current": "Full"
                });
            }
        }
    }
    
    return JSON.stringify({
        "items": items,
        "pagination": {
            "currentPage": 1,
            "totalPages": 1
        }
    });
}
function parseSearchResponse(htmlContent) {
    return parseListResponse(htmlContent);
}
function parseMovieDetail(htmlContent, apiUrl) {
    var title = "Movie Detail";
    var description = "Watch for free on RoPhim9.";
    var posterUrl = "";
    var year = 2026;
    var rating = 9.0;
    var casts = "";
    var category = "";
    var country = "";
    var servers = [];
    var slug = "";
    var movieId = "";
    
    // Check if the response is JSON (Case A: direct baseapi response)
    var isJson = false;
    var cleanedHtml = htmlContent.trim();
    if (cleanedHtml.indexOf("[") === 0 || cleanedHtml.indexOf("{") === 0) {
        isJson = true;
    }
    
    if (isJson) {
        try {
            var episodes = JSON.parse(cleanedHtml);
            
            // Extract movie metadata from the apiUrl query params
            movieId = getQueryParam(apiUrl, "m_id") || "";
            slug = getQueryParam(apiUrl, "m_slug") || "";
            title = getQueryParam(apiUrl, "m_title") || "Movie Detail";
            posterUrl = getQueryParam(apiUrl, "m_poster") || "";
            
            // Group episodes by server
            var serverGroups = {};
            for (var i = 0; i < episodes.length; i++) {
                var ep = episodes[i];
                var sName = ep.server || "Default Server";
                if (!serverGroups[sName]) {
                    serverGroups[sName] = [];
                }
                serverGroups[sName].push(ep);
            }
            
            // Construct servers list
            for (var sName in serverGroups) {
                if (serverGroups.hasOwnProperty(sName)) {
                    var eps = serverGroups[sName];
                    eps.sort(function(a, b) {
                        return (a.episode_order || a.id) - (b.episode_order || b.id);
                    });
                    
                    var episodesList = [];
                    for (var j = 0; j < eps.length; j++) {
                        var epItem = eps[j];
                        episodesList.push({
                            // ID format: https://rophim9.org/xem-phim/[movie_slug].[episode_id]
                            "id": "https://rophim9.org/xem-phim/" + slug + "." + epItem.id,
                            "name": "Tập " + epItem.name,
                            "slug": epItem.slug || "tap-" + epItem.name
                        });
                    }
                    
                    servers.push({
                        "name": sName,
                        "episodes": episodesList
                    });
                }
            }
        } catch (e) {
            isJson = false; // Fallback to HTML parsing if JSON parse failed
        }
    }
    
    if (!isJson) {
        // Case B: HTML of the detail page
        var ogTitle = /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
        if (ogTitle) title = ogTitle[1];
        
        var ogDesc = /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
        if (ogDesc) description = ogDesc[1];
        
        var ogImg = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
        if (ogImg) {
            posterUrl = ogImg[1];
            if (posterUrl.indexOf("//") === 0) posterUrl = "https:" + posterUrl;
        }
        
        var decodedPayload = decodeNextPayload(htmlContent);
        
        // Search for '"movie":{' inside the decoded payload
        var movieIdx = decodedPayload.indexOf('"movie":{');
        if (movieIdx !== -1) {
            var startObj = movieIdx + 8;
            var movieObjStr = extractJsonObject(decodedPayload, startObj);
            if (movieObjStr) {
                try {
                    var movie = JSON.parse(movieObjStr);
                    if (movie) {
                        if (movie.name) title = movie.name;
                        if (movie.description) description = movie.description;
                        if (movie.poster || movie.thumbnail) {
                            posterUrl = movie.poster || movie.thumbnail;
                            if (posterUrl.indexOf("//") === 0) posterUrl = "https:" + posterUrl;
                        }
                        if (movie.publish_year) year = parseInt(movie.publish_year);
                        if (movie.imdb_rating) rating = parseFloat(movie.imdb_rating) || 9.0;
                        if (movie.slug) slug = movie.slug;
                        if (movie.id) movieId = String(movie.id);
                        
                        if (movie.actors && Array.isArray(movie.actors)) {
                            var castList = [];
                            for (var a = 0; a < movie.actors.length; a++) {
                                if (movie.actors[a].name) castList.push(movie.actors[a].name);
                            }
                            casts = castList.join(", ");
                        }
                        
                        if (movie.categories && Array.isArray(movie.categories)) {
                            var catList = [];
                            for (var c = 0; c < movie.categories.length; c++) {
                                if (movie.categories[c].name) catList.push(movie.categories[c].name);
                            }
                            category = catList.join(", ");
                        }
                    }
                } catch (err) {
                    // Ignore parse errors
                }
            }
        }
        
        if (!slug) {
            slug = apiUrl.substring(apiUrl.lastIndexOf("/") + 1);
            var parts = slug.split("|");
            if (parts.length >= 2) {
                slug = parts[1];
            }
        }
        
        // Fallback: If no server/season list was extracted, treat it as a single movie item
        // pointing to the play page
        servers.push({
            "name": "Play Movie",
            "episodes": [
                {
                    "id": "https://rophim9.org/xem-phim/" + slug,
                    "name": "Xem Ngay",
                    "slug": "full"
                }
            ]
        });
    }
    
    return JSON.stringify({
        "id": slug || "movie",
        "title": title,
        "originName": title,
        "posterUrl": posterUrl || "https://rophim9.org/images/capture.png",
        "backdropUrl": posterUrl || "https://rophim9.org/images/capture.png",
        "description": description.replace(/<[^>]*>/g, ""), // clean HTML tags
        "year": year,
        "rating": rating,
        "quality": "HD",
        "servers": servers,
        "casts": casts,
        "category": category,
        "country": country,
        "status": "completed"
    });
}
function parseDetailResponse(htmlContent, apiUrl) {
    var decoded = decodeNextPayload(htmlContent);
    var linkMatch = /"link"\s*:\s*"([^"]+)"/.exec(decoded);
    var streamUrl = linkMatch ? linkMatch[1] : apiUrl;
    
    // Unescape slashes in the URL
    streamUrl = streamUrl.replace(/\\/g, "");
    
    return JSON.stringify({
        "url": streamUrl,
        "isEmbed": false,
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": "https://rophim9.org/"
        }
    });
}
