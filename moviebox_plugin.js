// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "moviebox",
        "name": "MovieBox",
        "version": "1.0.2",
        "baseUrl": "https://themoviebox.org",
        "iconUrl": "https://themoviebox.org/favicon.ico",
        "isEnabled": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { "slug": "featured", "title": "Featured Highlights", "type": "Grid", "path": "" },
        { "slug": "movies", "title": "Latest Movies", "type": "Horizontal", "path": "" },
        { "slug": "tvshows", "title": "TV Series", "type": "Horizontal", "path": "" },
        { "slug": "anime", "title": "Anime & Cartoons", "type": "Horizontal", "path": "" }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { "name": "Featured", "slug": "featured" },
        { "name": "Movies", "slug": "movies" },
        { "name": "TV Shows", "slug": "tvshows" },
        { "name": "Anime", "slug": "anime" }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        "sort": [
            { "name": "Default", "value": "default" }
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
        
        if (slug === "movies") {
            return "https://themoviebox.org/newWeb/movie?page=" + page;
        } else if (slug === "tvshows") {
            return "https://themoviebox.org/newWeb/tv-series?page=" + page;
        } else if (slug === "anime") {
            return "https://themoviebox.org/newWeb/animated-series?page=" + page;
        }
        
        return "https://themoviebox.org/";
    } catch (e) {
        return "https://themoviebox.org/";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        return "https://themoviebox.org/search?keyword=" + encodeURIComponent(keyword) + "&page=" + page;
    } catch (e) {
        return "https://themoviebox.org/search?keyword=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    // If slug is already a fully qualified play URL, return it directly!
    if (slug.indexOf("http://") === 0 || slug.indexOf("https://") === 0) {
        return slug;
    }
    return "https://themoviebox.org/moviesDetail/" + slug;
}

// =============================================================================
// RECURSIVE NUXT 3 DEHYDRATED STATE DECODER
// =============================================================================

function decodeNuxt(data) {
    if (!data || !Array.isArray(data)) return null;
    var cache = {};
    
    function resolve(idx) {
        if (idx === null || idx === undefined) return null;
        if (typeof idx !== 'number') return idx;
        if (idx < 0 || idx >= data.length) return null;
        if (cache[idx] !== undefined) return cache[idx];
        
        var item = data[idx];
        if (item === null || typeof item !== 'object') {
            cache[idx] = item;
            return item;
        }
        
        if (Array.isArray(item)) {
            var resolvedArr = [];
            cache[idx] = resolvedArr; // Prevent circular references
            for (var i = 0; i < item.length; i++) {
                resolvedArr.push(resolve(item[i]));
            }
            return resolvedArr;
        } else {
            var resolvedObj = {};
            cache[idx] = resolvedObj; // Prevent circular references
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    resolvedObj[key] = resolve(item[key]);
                }
            }
            return resolvedObj;
        }
    }
    return resolve(1); // Index 1 is the payload root
}

function findObjectWithKey(obj, keyName) {
    if (!obj || typeof obj !== 'object') return null;
    if (obj[keyName] !== undefined) return obj;
    if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
            var res = findObjectWithKey(obj[i], keyName);
            if (res) return res;
        }
    } else {
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                var res = findObjectWithKey(obj[k], keyName);
                if (res) return res;
            }
        }
    }
    return null;
}

function collectMovieItems(obj, collected, visited) {
    if (!obj || typeof obj !== 'object') return;
    if (!visited) visited = [];
    if (visited.indexOf(obj) !== -1) return;
    visited.push(obj);
    
    if (obj.detailPath && obj.title) {
        collected.push(obj);
    }
    
    if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
            collectMovieItems(obj[i], collected, visited);
        }
    } else {
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                collectMovieItems(obj[k], collected, visited);
            }
        }
    }
}

// =============================================================================
// PARSERS (Using highly optimized Regex + Nuxt Decoder for sandboxed engines)
// =============================================================================

function parseListResponse(htmlContent) {
    var items = [];
    
    // 1. Try to parse Nuxt dehydrated script tag
    var nuxtMatch = /<script[^>]*id="__NUXT_DATA__"[^>]*>([\s\S]*?)<\/script>/.exec(htmlContent);
    if (nuxtMatch) {
        try {
            var rawData = JSON.parse(nuxtMatch[1]);
            var decoded = decodeNuxt(rawData);
            var collected = [];
            collectMovieItems(decoded, collected);
            
            var seen = {};
            for (var i = 0; i < collected.length; i++) {
                var card = collected[i];
                var id = card.detailPath;
                if (id && !seen[id]) {
                    seen[id] = true;
                    
                    var poster = "";
                    if (card.cover) {
                        poster = typeof card.cover === "string" ? card.cover : (card.cover.url || "");
                    }
                    if (poster && poster.indexOf("//") === 0) poster = "https:" + poster;
                    
                    items.push({
                        "id": id,
                        "title": card.title,
                        "posterUrl": poster || "https://themoviebox.org/logo.png",
                        "backdropUrl": poster || "https://themoviebox.org/logo.png",
                        "year": card.releaseDate ? parseInt(card.releaseDate.substring(0, 4)) : 2026,
                        "quality": card.corner || "HD",
                        "episode_current": card.corner || "Full"
                    });
                }
            }
        } catch (e) {
            // Nuxt parsing failed, fallback below
        }
    }
    
    // 2. Fallback regex to capture standard movies Detail anchors from HTML
    if (items.length === 0) {
        var detailRegex = /href=["']\/moviesDetail\/([^"']+)["']/g;
        var match;
        var seenFallback = {};
        while ((match = detailRegex.exec(htmlContent)) !== null) {
            var id = match[1];
            if (!seenFallback[id]) {
                seenFallback[id] = true;
                
                var titleClean = id.split("-").slice(0, -1).join(" ");
                if (!titleClean) titleClean = id;
                titleClean = titleClean.replace(/\b\w/g, function(l){ return l.toUpperCase(); });
                
                items.push({
                    "id": id,
                    "title": titleClean,
                    "posterUrl": "https://themoviebox.org/logo.png",
                    "backdropUrl": "https://themoviebox.org/logo.png",
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
    var slug = apiUrl.substring(apiUrl.lastIndexOf("/") + 1);
    
    // Default meta fallback values
    var title = "Movie Detail";
    var description = "Watch for free on MovieBox.";
    var posterUrl = "";
    var year = 2026;
    var rating = 8.0;
    var casts = "";
    var category = "";
    var country = "";
    var servers = [];
    
    // Extract metadata using standard og tags first
    var ogTitle = /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
    if (ogTitle) title = ogTitle[1];
    
    var ogDesc = /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
    if (ogDesc) description = ogDesc[1];
    
    var ogImg = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
    if (ogImg) {
        posterUrl = ogImg[1];
        if (posterUrl.indexOf("//") === 0) posterUrl = "https:" + posterUrl;
    }
    
    // Parse through Nuxt dehydrated state for absolute precision
    var nuxtMatch = /<script[^>]*id="__NUXT_DATA__"[^>]*>([\s\S]*?)<\/script>/.exec(htmlContent);
    if (nuxtMatch) {
        try {
            var rawData = JSON.parse(nuxtMatch[1]);
            var decoded = decodeNuxt(rawData);
            
            // Find subject block
            var detailObj = findObjectWithKey(decoded, "subject");
            if (detailObj) {
                var subject = detailObj.subject;
                if (subject) {
                    if (subject.title) title = subject.title;
                    if (subject.description) description = subject.description;
                    if (subject.releaseDate) year = parseInt(subject.releaseDate.substring(0, 4)) || 2026;
                    if (subject.imdbRatingValue) rating = parseFloat(subject.imdbRatingValue) || 8.0;
                    if (subject.genre) category = subject.genre;
                    if (subject.countryName) country = subject.countryName;
                    
                    if (subject.cover) {
                        posterUrl = typeof subject.cover === "string" ? subject.cover : (subject.cover.url || posterUrl);
                        if (posterUrl.indexOf("//") === 0) posterUrl = "https:" + posterUrl;
                    }
                }
                
                // Collect casts
                if (detailObj.stars && Array.isArray(detailObj.stars)) {
                    var castList = [];
                    for (var c = 0; c < detailObj.stars.length; c++) {
                        if (detailObj.stars[c].name) castList.push(detailObj.stars[c].name);
                    }
                    casts = castList.join(", ");
                }
                
                // Build TV show servers/seasons if seasons resource exists
                if (detailObj.resource && detailObj.resource.seasons && Array.isArray(detailObj.resource.seasons)) {
                    var seasons = detailObj.resource.seasons;
                    for (var s = 0; s < seasons.length; s++) {
                        var season = seasons[s];
                        var seNum = season.se || (s + 1);
                        var maxEp = season.maxEp || 1;
                        
                        var episodes = [];
                        for (var ep = 1; ep <= maxEp; ep++) {
                            episodes.push({
                                "id": "https://themoviebox.org/moviesDetail/" + slug + "?season=" + seNum + "&episode=" + ep,
                                "name": "Episode " + ep,
                                "slug": "ep-" + ep
                            });
                        }
                        
                        if (episodes.length > 0) {
                            servers.push({
                                "name": "Season " + seNum,
                                "episodes": episodes
                            });
                        }
                    }
                }
            }
        } catch (e) {
            // Nuxt parse error, fallback server will be created
        }
    }
    
    // Fallback: If no server/season list was extracted, treat it as a single movie item
    if (servers.length === 0) {
        servers.push({
            "name": "Default Server",
            "episodes": [
                {
                    "id": "https://themoviebox.org/moviesDetail/" + slug,
                    "name": "Play Movie",
                    "slug": "full"
                }
            ]
        });
    }
    
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
        "status": "completed"
    });
}

function parseDetailResponse(htmlContent, apiUrl) {
    // Return the URL directly to load in WebView player
    return JSON.stringify({
        "url": apiUrl,
        "isEmbed": false, // Set to false to immediately open in WebView and stop recursive fetching
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": "https://themoviebox.org/"
        }
    });
}
