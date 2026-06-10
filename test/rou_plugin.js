// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "rouvideo",
        "name": "RouVideo",
        "version": "1.0.0",
        "baseUrl": "https://rou.video",
        "iconUrl": "https://rou.video/favicon.ico",
        "isEnabled": true,
        "isAdult": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'latest', title: 'Latest Videos', type: 'Grid', path: 'v' },
        { slug: 'hot', title: 'Hot Videos', type: 'Horizontal', path: 'v?order=viewCount' },
        { slug: 'liked', title: 'Highly Rated', type: 'Horizontal', path: 'v?order=likeCount' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'OnlyFans', slug: 'OnlyFans' },
        { name: '國產AV', slug: '國產AV' },
        { name: '自拍流出', slug: '自拍流出' },
        { name: '糖心Vlog', slug: '糖心Vlog' },
        { name: '蜜桃影像傳媒', slug: '蜜桃影像傳媒' },
        { name: '星空無限傳媒', slug: '星空無限傳媒' },
        { name: '麻豆傳媒', slug: '麻豆傳媒' },
        { name: '熟女', slug: '熟女' },
        { name: '韓國', slug: '韓國' },
        { name: '91lisa', slug: '91lisa' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [
            { name: '最新发布', value: '' },
            { name: '热门视频', value: 'viewCount' },
            { name: '最多好评', value: 'likeCount' }
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
        var order = filters.sort || "";
        var baseUrl = "https://rou.video";
        var path = "";

        if (filters.category) {
            path = "/t/" + encodeURIComponent(filters.category);
        } else if (slug && slug !== "latest" && slug !== "hot" && slug !== "liked" && slug !== "v") {
            path = "/t/" + encodeURIComponent(slug);
        } else {
            path = "/v";
        }

        var queryParams = [];
        if (page > 1) {
            queryParams.push("page=" + page);
        }
        if (order) {
            queryParams.push("order=" + order);
        } else if (slug === "hot") {
            queryParams.push("order=viewCount");
        } else if (slug === "liked") {
            queryParams.push("order=likeCount");
        }

        if (queryParams.length > 0) {
            return baseUrl + path + "?" + queryParams.join("&");
        }
        return baseUrl + path;
    } catch (e) {
        return "https://rou.video/v";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var baseUrl = "https://rou.video";
        var url = baseUrl + "/search?q=" + encodeURIComponent(keyword);
        if (page > 1) {
            url += "&page=" + page;
        }
        return url;
    } catch (e) {
        return "https://rou.video/search?q=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    return "https://rou.video/v/" + slug;
}

function getUrlCategories() {
    return "https://rou.video/cat";
}

function getUrlCountries() {
    return "https://rou.video/v";
}

function getUrlYears() {
    return "https://rou.video/v";
}

// =============================================================================
// HELPERS
// =============================================================================

function extractNextData(html) {
    var match = /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/.exec(html);
    if (match) {
        try {
            return JSON.parse(match[1]);
        } catch (e) {}
    }
    return null;
}

function base64Decode(str) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var lookup = [];
    for (var i = 0; i < 256; i++) {
        lookup[i] = 0;
    }
    for (var i = 0; i < chars.length; i++) {
        lookup[chars.charCodeAt(i)] = i;
    }
    
    var cleaned = str.replace(/[^A-Za-z0-9\+\/]/g, "");
    var len = cleaned.length;
    var bytes = [];
    
    for (var i = 0; i < len; i += 4) {
        var c1 = lookup[cleaned.charCodeAt(i)] || 0;
        var c2 = lookup[cleaned.charCodeAt(i + 1)] || 0;
        var c3 = lookup[cleaned.charCodeAt(i + 2)] || 0;
        var c4 = lookup[cleaned.charCodeAt(i + 3)] || 0;
        
        var byte1 = (c1 << 2) | (c2 >> 4);
        bytes.push(byte1);
        
        if (i + 2 < len) {
            var byte2 = ((c2 & 15) << 4) | (c3 >> 2);
            bytes.push(byte2);
        }
        if (i + 3 < len) {
            var byte3 = ((c3 & 3) << 6) | (c4 & 63);
            bytes.push(byte3);
        }
    }
    return bytes;
}

function decryptEv(ev) {
    if (!ev || !ev.d || typeof ev.k === 'undefined') return null;
    var d = ev.d;
    var k = ev.k;
    var bytes = base64Decode(d);
    var decryptedChars = [];
    for (var i = 0; i < bytes.length; i++) {
        var decryptedByte = (bytes[i] - k + 256) % 256;
        decryptedChars.push(String.fromCharCode(decryptedByte));
    }
    var decryptedString = decryptedChars.join("");
    try {
        return JSON.parse(decryptedString);
    } catch (e) {
        return decryptedString;
    }
}

function formatDuration(seconds) {
    if (!seconds || isNaN(seconds)) return "";
    var secs = Math.floor(seconds);
    var h = Math.floor(secs / 3600);
    var m = Math.floor((secs % 3600) / 60);
    var s = secs % 60;
    
    var mStr = m < 10 ? "0" + m : m;
    var sStr = s < 10 ? "0" + s : s;
    
    if (h > 0) {
        var hStr = h < 10 ? "0" + h : h;
        return hStr + ":" + mStr + ":" + sStr;
    }
    return mStr + ":" + sStr;
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(apiResponseHtml) {
    try {
        var movies = [];
        var totalPages = 1;
        var currentPage = 1;

        var nextData = extractNextData(apiResponseHtml);
        if (nextData && nextData.props && nextData.props.pageProps) {
            var props = nextData.props.pageProps;
            var videos = props.videos || props.latestVideos || [];
            totalPages = props.totalPage || 1;
            currentPage = props.pageNum || 1;

            for (var i = 0; i < videos.length; i++) {
                var v = videos[i];
                var id = v.id;
                var title = v.nameZh || v.name || "";
                var posterUrl = v.coverImageUrl || "";
                var duration = formatDuration(v.duration);
                
                movies.push({
                    id: id,
                    title: title,
                    posterUrl: posterUrl,
                    backdropUrl: posterUrl,
                    year: v.createdAt ? parseInt(v.createdAt.substring(0, 4), 10) : 0,
                    quality: "HD",
                    episode_current: duration,
                    lang: "ZH"
                });
            }
        } else {
            // Regex fallback
            var seenIds = {};
            var hrefRegex = /\/v\/([a-zA-Z0-9]+)/g;
            var match;
            while ((match = hrefRegex.exec(apiResponseHtml)) !== null) {
                var id = match[1];
                if (seenIds[id]) continue;
                seenIds[id] = true;

                var subStr = apiResponseHtml.substring(match.index, match.index + 1000);
                
                var srcMatch = /src="([^"]+)"/.exec(subStr) || /data-src="([^"]+)"/.exec(subStr);
                var posterUrl = srcMatch ? srcMatch[1] : "";

                var altMatch = /alt="([^"]+)"/.exec(subStr) || /title="([^"]+)"/.exec(subStr);
                var title = altMatch ? altMatch[1] : id;

                movies.push({
                    id: id,
                    title: title,
                    posterUrl: posterUrl,
                    backdropUrl: posterUrl,
                    year: 0,
                    quality: "HD",
                    episode_current: "",
                    lang: "ZH"
                });
            }
        }

        return JSON.stringify({
            items: movies,
            pagination: {
                currentPage: currentPage,
                totalPages: totalPages
            }
        });
    } catch (e) {
        return JSON.stringify({ items: [], pagination: { currentPage: 1, totalPages: 1 } });
    }
}

function parseSearchResponse(apiResponseHtml) {
    return parseListResponse(apiResponseHtml);
}

function parseMovieDetail(apiResponseHtml) {
    try {
        var title = "";
        var posterUrl = "";
        var description = "";
        var year = 0;
        var category = "";
        var servers = [];

        var nextData = extractNextData(apiResponseHtml);
        if (nextData && nextData.props && nextData.props.pageProps) {
            var props = nextData.props.pageProps;
            var v = props.video || {};
            var ev = props.ev || {};

            title = v.nameZh || v.name || "";
            posterUrl = v.coverImageUrl || "";
            description = v.description || "";
            year = v.createdAt ? parseInt(v.createdAt.substring(0, 4), 10) : 0;
            
            var tags = v.tagsZh || v.tags || [];
            category = tags.join(", ");

            var videoId = v.id || "";
            var watchUrl = "https://rou.video/v/" + videoId;

            if (videoId) {
                servers.push({
                    name: "Rou Stream",
                    episodes: [
                        {
                            id: watchUrl,
                            name: "Play Video",
                            slug: "play"
                        }
                    ]
                });
            }
        }

        // Regex fallback
        if (servers.length === 0) {
            var titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(apiResponseHtml);
            if (titleMatch) title = titleMatch[1].replace(/<[^>]*>/g, "").trim();

            var descMatch = /<meta[^>]*name="description"[^>]*content="([^"]*)"/i.exec(apiResponseHtml);
            if (descMatch) description = descMatch[1].trim();

            var imageMatch = /<meta[^>]*property="og:image"[^>]*content="([^"]*)"/i.exec(apiResponseHtml);
            if (imageMatch) posterUrl = imageMatch[1];
        }

        return JSON.stringify({
            id: "",
            title: title,
            originName: "",
            posterUrl: posterUrl,
            backdropUrl: posterUrl,
            description: description,
            year: year,
            rating: 0,
            quality: "HD",
            servers: servers,
            episode_current: "",
            lang: "ZH",
            category: category,
            country: "",
            director: "",
            casts: "",
            tmdbId: "",
            tmdbSeason: 0,
            tmdbType: ""
        });
    } catch (e) {
        return "null";
    }
}

function parseDetailResponse(apiResponseHtml) {
    try {
        if (!apiResponseHtml) {
            return "{}";
        }
        
        if (apiResponseHtml.indexOf('"url":') > -1) {
            return apiResponseHtml;
        }

        // If the response is a direct HTTP URL (and not an HTML page)
        if ((apiResponseHtml.indexOf("http://") === 0 || apiResponseHtml.indexOf("https://") === 0) && apiResponseHtml.indexOf("<html") === -1 && apiResponseHtml.indexOf("<body") === -1) {
            var directUrl = apiResponseHtml.trim();
            directUrl = directUrl.replace("/index.jpg", "/index.m3u8");
            return JSON.stringify({
                url: directUrl,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Referer": "https://rou.video/"
                },
                subtitles: []
            });
        }

        // Extract and decrypt stream URL from the detail page HTML
        var streamUrl = "";
        var nextData = extractNextData(apiResponseHtml);
        if (nextData && nextData.props && nextData.props.pageProps) {
            var props = nextData.props.pageProps;
            var ev = props.ev || {};
            var decrypted = decryptEv(ev);
            if (decrypted && decrypted.videoUrl) {
                streamUrl = decrypted.videoUrl;
            }
        }

        if (streamUrl) {
            streamUrl = streamUrl.replace("/index.jpg", "/index.m3u8");
        }

        return JSON.stringify({
            url: streamUrl,
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://rou.video/"
            },
            subtitles: []
        });
    } catch (error) {
        return "{}";
    }
}

function parseCategoriesResponse(apiResponseHtml) {
    try {
        var categories = [];
        var nextData = extractNextData(apiResponseHtml);
        if (nextData && nextData.props && nextData.props.pageProps) {
            var props = nextData.props.pageProps;
            var groups = ["gcAV", "madouAV", "v91", "onlyfans"];
            for (var g = 0; g < groups.length; g++) {
                var list = props[groups[g]] || [];
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    if (item && item.id) {
                        categories.push({
                            name: item.id + (item.count ? " (" + item.count + ")" : ""),
                            slug: item.id
                        });
                    }
                }
            }
        }
        
        if (categories.length === 0) {
            var staticCats = [
                { name: 'OnlyFans', slug: 'OnlyFans' },
                { name: '國產AV', slug: '國產AV' },
                { name: '自拍流出', slug: '自拍流出' },
                { name: '糖心Vlog', slug: '糖心Vlog' },
                { name: '蜜桃影像傳媒', slug: '蜜桃影像傳媒' },
                { name: '星空無限傳媒', slug: '星空無限傳媒' },
                { name: '麻豆傳媒', slug: '麻豆傳媒' }
            ];
            return JSON.stringify(staticCats);
        }
        return JSON.stringify(categories);
    } catch (e) {
        return JSON.stringify([]);
    }
}

function parseCountriesResponse(apiResponseHtml) {
    return JSON.stringify([]);
}

function parseYearsResponse(apiResponseHtml) {
    return JSON.stringify([]);
}
