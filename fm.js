// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "fmoviess",
        "name": "FMovies",
        "version": "1.0.0",
        "baseUrl": "https://fmoviess.org",
        "iconUrl": "https://fmoviess.org/icon/favicon-32x32.png",
        "isEnabled": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'recent', title: 'Suggestions', type: 'Horizontal', path: '' },
        { slug: 'movies', title: 'Latest Movies', type: 'Grid', path: '' },
        { slug: 'tvshows', title: 'Latest TV-Series', type: 'Grid', path: '' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Suggestions', slug: 'recent' },
        { name: 'Latest Movies', slug: 'movies' },
        { name: 'Latest TV-Series', slug: 'tvshows' }
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
            return "https://fmoviess.org/movies/page/" + page + "/";
        } else if (slug === 'tvshows') {
            return "https://fmoviess.org/tv-series/page/" + page + "/";
        }
        
        return "https://fmoviess.org/home/";
    } catch (e) {
        return "https://fmoviess.org/home/";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        
        // Clean and prepare search keyword to match fmovies script behaviour
        var kw = keyword.replace(/(<([^>]+)>)/gi, "").replace(/[`~!@#$%^&*()_|=?;:'",.<>{}[\]\\/]/gi, "");
        kw = kw.split(" ").join("+");
        
        if (page > 1) {
            return "https://fmoviess.org/search/page/" + page + "/?q=" + encodeURIComponent(kw);
        }
        return "https://fmoviess.org/search/?q=" + encodeURIComponent(kw);
    } catch (e) {
        return "https://fmoviess.org/search/?q=" + encodeURIComponent(keyword);
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
    
    // Extremely robust Regex to capture quoted/unquoted card grid items on fmovies
    var cardRegex = /<div[^>]*class=["']?col[^>]*>([\s\S]*?)<\/a>\s*<\/div>\s*<\/div>/g;
    var match;
    
    while ((match = cardRegex.exec(htmlContent)) !== null) {
        var content = match[1];
        
        // Extract URL
        var urlMatch = /href=["']?([^"'\s>]+)/.exec(content);
        var url = urlMatch ? urlMatch[1] : "";
        if (url && url.indexOf('//') === 0) url = 'https:' + url;
        
        // Extract Poster Image (prefer data-src for lazy loading)
        var imgMatch = /data-src=["']?([^"'\s>]+)/.exec(content) || /src=["']?([^"'\s>]+)/.exec(content);
        var posterUrl = imgMatch ? imgMatch[1] : "";
        if (posterUrl && posterUrl.indexOf('//') === 0) posterUrl = 'https:' + posterUrl;
        
        // Extract Title (from alt attribute of img or card-title h2)
        var titleMatch = /alt=["']?([^"'>]+)/.exec(content) || /class=["']?card-title[^>]*>([^<]+)/.exec(content);
        var title = titleMatch ? titleMatch[1].trim() : "";
        
        // Extract Quality (mlbq span or badge class)
        var qualityMatch = /class=["']?mlbq[^>]*>([^<]+)/.exec(content) || /class=["']?badge[^>]*>([^<]+)/.exec(content);
        var quality = qualityMatch ? qualityMatch[1].trim() : "HD";
        
        // Extract Episode Count for TV Series (mlbe span)
        var epsMatch = /class=["']?mlbe[^>]*>[\s\S]*?<i>([^<]+)<\/i>/.exec(content);
        var episodeCurrent = epsMatch ? "Eps " + epsMatch[1] : "Movie";
        
        // Extract Year from URL if possible, otherwise default to 2026
        var yearMatch = /-season-(\d+)/i.exec(url) || /-(\d{4})-/i.exec(url);
        var year = yearMatch ? parseInt(yearMatch[1]) : 2026;
        if (year < 100) year = 2026;
        
        if (url && title) {
            items.push({
                id: url, // Watch page URL acts as unique detail identifier
                title: title,
                posterUrl: posterUrl,
                backdropUrl: posterUrl,
                year: year,
                quality: quality,
                episode_current: episodeCurrent
            });
        }
    }
    
    // Parse total pages for pagination
    var pagesMatch = /href=["']?[^"'\s>]*page\/(\d+)\/["']?[^>]*>Last<\/a>/.exec(htmlContent) ||
                     /href=["']?[^"'\s>]*page\/(\d+)\/["']?/.exec(htmlContent);
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
    var titleMatch = /<h1[^>]*class=["']?card-title[^>]*>([^<]+)<\/h1>/.exec(htmlContent) ||
                     /meta\s+property=["']?og:title["']?\s+content=["']?([^"'>]+)/.exec(htmlContent);
    var title = titleMatch ? titleMatch[1].replace("Full Movie on FMovies.to", "").replace("Online Full Movie without registration", "").trim() : "Movie Detail";
    
    // Extract Description
    var descMatch = /<div[^>]*class=["']?fst-italic[^>]*>([\s\S]*?)<\/div>/.exec(htmlContent);
    var description = descMatch ? descMatch[1].replace(/<[^>]*>/g, "").trim() : "";
    
    // Extract Poster
    var posterMatch = /meta\s+property=["']?og:image["']?\s+content=["']?([^"'>\s]+)/i.exec(htmlContent);
    var posterUrl = posterMatch ? posterMatch[1] : "";
    
    // Extract mid
    var midMatch = /id=["']?mid["']?\s+data-mid=["']?(\d+)/.exec(htmlContent) ||
                   /data-mid=["']?(\d+)/.exec(htmlContent);
    var mid = midMatch ? midMatch[1] : "";
    
    // Extract server buttons from HTML
    var serverList = [];
    var serverRegex = /<button[^>]*id=["']?srv-(\d+)["']?[^>]*class=["']?[^"']*server[^"']*["']?[^>]*>([^<]+)<\/button>/g;
    var sMatch;
    while ((sMatch = serverRegex.exec(htmlContent)) !== null) {
        serverList.push({
            id: sMatch[1],
            name: sMatch[2].trim()
        });
    }
    
    if (serverList.length === 0) {
        serverList.push({ id: "2", name: "Default Server" });
    }
    
    // Extract episode buttons from HTML
    var episodeList = [];
    var episodeRegex = /<button[^>]*id=["']?ep-(\d+)["']?[^>]*class=["']?[^"']*episode[^"']*["']?[^>]*>([^<]+)<\/button>/g;
    var epMatch;
    while ((epMatch = episodeRegex.exec(htmlContent)) !== null) {
        episodeList.push({
            id: epMatch[1],
            name: epMatch[2].replace(/[\r\n\t]+/g, " ").trim()
        });
    }
    
    if (episodeList.length === 0) {
        episodeList.push({ id: "1", name: "Full Movie / Episode 1" });
    }
    
    // Group episodes under their corresponding servers
    var servers = [];
    for (var s = 0; s < serverList.length; s++) {
        var server = serverList[s];
        var episodes = [];
        
        for (var e = 0; e < episodeList.length; e++) {
            var episode = episodeList[e];
            var playId = "fmovies-play|" + apiUrl + "|" + mid + "|" + server.id + "|" + episode.id;
            
            episodes.push({
                id: playId,
                name: "Episode " + episode.name,
                slug: "ep-" + episode.id
            });
        }
        
        servers.push({
            name: server.name,
            episodes: episodes
        });
    }
    
    return JSON.stringify({
        id: apiUrl,
        title: title,
        originName: title,
        posterUrl: posterUrl,
        backdropUrl: posterUrl,
        description: description,
        year: 2026,
        rating: 8.5,
        quality: "HD",
        servers: servers,
        status: "completed"
    });
}

function parseDetailResponse(htmlContent, apiUrl) {
    if (apiUrl.indexOf('fmovies-play|') === 0) {
        var parts = apiUrl.split('|');
        var originalDetailUrl = parts[1];
        var mid = parts[2];
        var serverId = parts[3];
        var episodeId = parts[4];
        
        // Custom auto-clicker script to control the WebView player
        var injectScript = 
            "<script>\n" +
            "document.addEventListener('DOMContentLoaded', function() {\n" +
            "    console.log('Fmovies Auto-Clicker Loaded: Server " + serverId + ", Episode " + episodeId + "');\n" +
            "    \n" +
            "    window.srv = " + serverId + ";\n" +
            "    \n" +
            "    var checkInterval = setInterval(function() {\n" +
            "        var playBtn = document.getElementById('play-btn');\n" +
            "        if (playBtn) {\n" +
            "            clearInterval(checkInterval);\n" +
            "            \n" +
            "            // 1. Click play-btn to initialize the iframe\n" +
            "            playBtn.click();\n" +
            "            console.log('Auto-clicked Play Button');\n" +
            "            \n" +
            "            // 2. Click correct server and episode buttons\n" +
            "            setTimeout(function() {\n" +
            "                var serverBtn = document.getElementById('srv-" + serverId + "');\n" +
            "                if (serverBtn) {\n" +
            "                    serverBtn.click();\n" +
            "                    console.log('Auto-clicked Server Button: srv-" + serverId + "');\n" +
            "                }\n" +
            "                \n" +
            "                setTimeout(function() {\n" +
            "                    var episodeBtn = document.getElementById('ep-" + episodeId + "');\n" +
            "                    if (episodeBtn) {\n" +
            "                        episodeBtn.click();\n" +
            "                        console.log('Auto-clicked Episode Button: ep-" + episodeId + "');\n" +
            "                    }\n" +
            "                }, 300);\n" +
            "            }, 500);\n" +
            "        }\n" +
            "    }, 100);\n" +
            "    \n" +
            "    setTimeout(function() { clearInterval(checkInterval); }, 6000);\n" +
            "});\n" +
            "</script>\n";
            
        // Inject script into detail page HTML
        var modifiedHtml = htmlContent;
        if (modifiedHtml.indexOf('</head>') !== -1) {
            modifiedHtml = modifiedHtml.replace('</head>', injectScript + '</head>');
        } else {
            modifiedHtml = modifiedHtml + injectScript;
        }
        
        // Base64 encode the HTML safely in ES5
        var base64Html = base64Encode(modifiedHtml);
        var dataUrl = "data:text/html;base64," + base64Html;
        
        return JSON.stringify({
            url: dataUrl,
            isEmbed: true,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://fmoviess.org/"
            }
        });
    }
    
    return JSON.stringify({
        url: apiUrl,
        isEmbed: true,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": "https://fmoviess.org/"
        }
    });
}

// Helper: safe Base64 encoding supporting UTF-8 in ES5 JS
function base64Encode(str) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var out = "";
    var i = 0;
    var len = str.length;
    var c1, c2, c3;
    
    var utf8Str = unescape(encodeURIComponent(str));
    len = utf8Str.length;
    
    while (i < len) {
        c1 = utf8Str.charCodeAt(i++) & 0xff;
        if (i === len) {
            out += chars.charAt(c1 >> 2);
            out += chars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = utf8Str.charCodeAt(i++);
        if (i === len) {
            out += chars.charAt(c1 >> 2);
            out += chars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += chars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = utf8Str.charCodeAt(i++);
        out += chars.charAt(c1 >> 2);
        out += chars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += chars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += chars.charAt(c3 & 0x3F);
    }
    return out;
}
