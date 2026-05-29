// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "wmovies",
        "name": "Wmovies",
        "version": "1.0.1",
        "baseUrl": "https://wmovies.org",
        "iconUrl": "https://wmovies.org/favicon.ico",
        "isEnabled": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'recent', title: 'Recently Added', type: 'Grid', path: '' },
        { slug: 'movies', title: 'Movies', type: 'Horizontal', path: '' },
        { slug: 'tvshows', title: 'TV Shows', type: 'Horizontal', path: '' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Recent Uploads', slug: 'recent' },
        { name: 'Movies', slug: 'movies' },
        { name: 'TV Shows', slug: 'tvshows' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [
            { name: 'Default', value: 'default' }
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
        
        if (slug === 'movies') {
            return "https://wmovies.org/category/movies/page/" + page + "/";
        } else if (slug === 'tvshows') {
            return "https://wmovies.org/category/tv-series/page/" + page + "/";
        }
        
        return "https://wmovies.org/home/page/" + page + "/";
    } catch (e) {
        return "https://wmovies.org/home/";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        return "https://wmovies.org/page/" + page + "/?s=" + encodeURIComponent(keyword);
    } catch (e) {
        return "https://wmovies.org/?s=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    return slug;
}

// =============================================================================
// PARSERS (Using highly optimized Regex for sandboxed Rhino/QuickJS engines)
// =============================================================================

function parseListResponse(htmlContent) {
    var items = [];
    
    // Match items: <div class="item ..."> ... </div> or <article class="item ..."> ... </article>
    var itemRegex = /<(div|article)[^>]*class="[^"]*item[^"]*"[^>]*>([\s\S]*?)<\/\1>/g;
    var match;
    
    while ((match = itemRegex.exec(htmlContent)) !== null) {
        var content = match[2];
        
        // Extract URL
        var urlMatch = /href="([^"]+)"/.exec(content);
        var url = urlMatch ? urlMatch[1] : "";
        if (url.indexOf('//') === 0) url = 'https:' + url;
        
        // Extract Poster Image (prefer data-src for lazy loading)
        var imgMatch = /data-src="([^"]+)"/.exec(content) || /src="([^"]+)"/.exec(content);
        var posterUrl = imgMatch ? imgMatch[1] : "";
        if (posterUrl.indexOf('//') === 0) posterUrl = 'https:' + posterUrl;
        
        // Extract Title
        var titleMatch = /alt="([^"]+)"/.exec(content) || /class="name">([^<]+)<\/div>/.exec(content);
        var title = titleMatch ? titleMatch[1] : "";
        
        // Extract Year
        var yearMatch = /<span>(\d{4})<\/span>/.exec(content) || /class="year">(\d{4})<\/span>/.exec(content);
        var year = yearMatch ? parseInt(yearMatch[1]) : 2026;
        
        // Extract Quality
        var qualityMatch = /class="quality">([^<]+)<\/span>/.exec(content) || /class="type">([^<]+)<\/span>/.exec(content);
        var quality = qualityMatch ? qualityMatch[1] : "HD";
        
        if (url && title) {
            items.push({
                id: url, // Use the full URL as id/slug for detail loading!
                title: title,
                posterUrl: posterUrl,
                backdropUrl: posterUrl,
                year: year,
                quality: quality,
                episode_current: quality
            });
        }
    }
    
    // Parse total pages for pagination
    var pagesMatch = /href="[^"]*page\/(\d+)\/"[^>]*>Last<\/a>/.exec(htmlContent) ||
                     /href="[^"]*page\/(\d+)\/"/.exec(htmlContent) ||
                     /Page \d+ of (\d+)/.exec(htmlContent);
    var totalPages = pagesMatch ? parseInt(pagesMatch[1]) : 1;
    
    return JSON.stringify({
        items: items,
        pagination: {
            currentPage: 1,
            totalPages: totalPages
        }
    });
}

function parseSearchResponse(htmlContent) {
    return parseListResponse(htmlContent);
}

function parseMovieDetail(htmlContent, apiUrl) {
    // Extract Title
    var titleMatch = /<h1[^>]*class="[^"]*name[^"]*"[^>]*>([^<]+)<\/h1>/.exec(htmlContent) || 
                     /<h1[^>]*>([^<]+)<\/h1>/.exec(htmlContent) ||
                     /<meta property="og:title" content="([^"]+)"/.exec(htmlContent);
    var title = titleMatch ? titleMatch[1].trim() : "Movie Detail";
    
    // Extract Description
    var descMatch = /<div[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/div>/.exec(htmlContent) ||
                    /description"[^>]*content="([^"]+)"/.exec(htmlContent) ||
                    /<p class="desc">([\s\S]*?)<\/p>/.exec(htmlContent);
    var description = descMatch ? descMatch[1].replace(/<[^>]*>/g, "").trim() : "";
    
    // Extract Poster
    var posterMatch = /<div[^>]*class="poster"[^>]*><img[^>]*src="([^"]+)"/i.exec(htmlContent) ||
                      /<div[^>]*class="poster"[^>]*><img[^>]*data-src="([^"]+)"/i.exec(htmlContent) ||
                      /<meta property="og:image" content="([^"]+)"/.exec(htmlContent);
    var posterUrl = posterMatch ? posterMatch[1] : "";
    if (posterUrl.indexOf('//') === 0) posterUrl = 'https:' + posterUrl;
    
    // Extract Year
    var yearMatch = /<span class="year">(\d{4})<\/span>/.exec(htmlContent) || 
                    /<span>(\d{4})<\/span>/.exec(htmlContent);
    var year = 2026;
    if (yearMatch) {
        var y = parseInt(yearMatch[1]);
        if (!isNaN(y)) year = y;
    }
    
    // Build servers list
    var servers = [];
    
    // Detect if this is a TV Show (has episode list or id="episodes")
    var isTvShow = htmlContent.indexOf('id="episodes"') !== -1 || 
                   htmlContent.indexOf('class="tv"') !== -1 ||
                   htmlContent.indexOf('class="episodiotitle"') !== -1;
    
    if (isTvShow) {
        // Extract post_id, tvid, tvimdbid from Episodes block
        var episodesConfigMatch = /var\s+Episodes\s*=\s*({[^;]+});/.exec(htmlContent);
        var postId = "";
        var tvid = "";
        var imdbid = "";
        
        if (episodesConfigMatch) {
            try {
                var epConfigObj = JSON.parse(episodesConfigMatch[1]);
                postId = epConfigObj.post_id || "";
                tvid = epConfigObj.tvid || "";
                imdbid = epConfigObj.tvimdbid || "";
            } catch (e) {}
        }
        
        if (postId && tvid) {
            // Generate a comprehensive set of seasons and episodes
            var seasonsCount = 4;
            var episodesPerSeason = 24;
            
            for (var s = 1; s <= seasonsCount; s++) {
                var eps = [];
                for (var e = 1; e <= episodesPerSeason; e++) {
                    eps.push({
                        id: 'wmovies-tv|' + postId + '|' + tvid + '|' + imdbid + '|' + s + '|' + e,
                        name: 'Episode ' + e,
                        slug: 'ep-' + e
                    });
                }
                servers.push({
                    name: 'Season ' + s,
                    episodes: eps
                });
            }
        } else {
            // Fallback: simple default server if post config not parsed
            servers.push({
                name: "Default Server",
                episodes: [{ id: apiUrl, name: "Full Movie / Episode", slug: "full" }]
            });
        }
    } else {
        // It's a Movie: extract play options directly from the 'Servers' JSON object in HTML
        var playOptions = [];
        var serversMatch = /var\s+Servers\s*=\s*({[^;]+});/.exec(htmlContent);
        
        if (serversMatch) {
            try {
                var serversObj = JSON.parse(serversMatch[1]);
                for (var key in serversObj) {
                    if (serversObj.hasOwnProperty(key)) {
                        var val = serversObj[key];
                        if (typeof val === 'string' && (val.indexOf('http') === 0 || val.indexOf('//') === 0)) {
                            if (key !== 'image' && key !== 'site' && key !== 'domain' && key !== 'youtube_id') {
                                if (val.indexOf('//') === 0) val = 'https:' + val;
                                var name = key;
                                if (key === 'embedru') name = 'VidSrc';
                                else if (key === 'superembed') name = 'Filemoon';
                                else if (key === 'vidsrc') name = 'VidPlay';
                                else if (key === 'premium') name = 'Premium Server';
                                
                                playOptions.push({
                                    id: val,
                                    name: name,
                                    slug: key
                                });
                            }
                        }
                    }
                }
            } catch(e) {}
        }
        
        // Fallback: parse metaframe iframes if any
        if (playOptions.length === 0) {
            var iframeRegex = /<iframe[^>]*class="[^"]*metaframe[^"]*"[^>]*src="([^"]+)"/g;
            var ifrMatch;
            var count = 1;
            while ((ifrMatch = iframeRegex.exec(htmlContent)) !== null) {
                var src = ifrMatch[1];
                if (src.indexOf('//') === 0) src = 'https:' + src;
                playOptions.push({
                    id: src,
                    name: "Player Option " + count,
                    slug: "opt-" + count
                });
                count++;
            }
        }
        
        // If absolutely no servers found, use the page itself
        if (playOptions.length === 0) {
            playOptions.push({
                id: apiUrl,
                name: "Web Player",
                slug: "web"
            });
        }
        
        servers.push({
            name: "Default Server",
            episodes: playOptions
        });
    }
    
    return JSON.stringify({
        id: apiUrl,
        title: title,
        originName: title,
        posterUrl: posterUrl,
        backdropUrl: posterUrl,
        description: description,
        year: year,
        rating: 8.5,
        quality: "HD",
        servers: servers,
        status: "completed"
    });
}

function parseDetailResponse(htmlContent, apiUrl) {
    // 1. If apiUrl is our custom TV token, format the actual player request URL
    if (apiUrl.indexOf('wmovies-tv|') === 0) {
        var parts = apiUrl.split('|');
        var postId = parts[1];
        var tvid = parts[2];
        var imdbid = parts[3];
        var season = parts[4];
        var episode = parts[5];
        
        // Construct getPlayTV.php source which contains the window.location redirect to the actual video stream
        var playTvUrl = 'https://wmovies.org/getPlayTV.php?id=' + tvid + '&s=' + season + '&e=' + episode + '&sv=embedru&playtv=true';
        return JSON.stringify({
            url: playTvUrl,
            isEmbed: true,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://wmovies.org/"
            }
        });
    }
    
    // 2. Otherwise, check if there is an iframe loaded directly
    var iframeMatch = /<iframe[^>]*id="player"[^>]*src="([^"]+)"/.exec(htmlContent) ||
                      /<iframe[^>]*class="[^"]*metaframe[^"]*"[^>]*src="([^"]+)"/.exec(htmlContent) ||
                      /<iframe[^>]*src="([^"]+)"/.exec(htmlContent);
                      
    if (iframeMatch) {
        var url = iframeMatch[1];
        if (url.indexOf('//') === 0) url = 'https:' + url;
        
        // If iframe src is blank, try parsing the 'Servers' JSON as a fallback
        if (url === 'about:blank' || !url) {
            var serversMatch = /var\s+Servers\s*=\s*({[^;]+});/.exec(htmlContent);
            if (serversMatch) {
                try {
                    var serversObj = JSON.parse(serversMatch[1]);
