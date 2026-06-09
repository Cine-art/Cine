// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "javguru",
        "name": "Jav Guru",
        "version": "1.0.0",
        "baseUrl": "https://jav.guru",
        "iconUrl": "https://jav.guru/favicon.ico",
        "isEnabled": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'moi-nhat', title: 'New Videos', type: 'Grid', path: '' },
        { slug: 'english-subbed', title: 'English Subbed', type: 'Horizontal', path: 'category/english-subbed' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'JAV', slug: 'jav' },
        { name: 'English Subbed', slug: 'english-subbed' },
        { name: 'Uncensored', slug: 'uncensored' },
        { name: 'Creampie', slug: 'creampie' },
        { name: 'Big Tits', slug: 'big-tits' },
        { name: 'Amateur', slug: 'amateur' },
        { name: 'Married', slug: 'married' },
        { name: 'Beautiful Girl', slug: 'beautiful-girl' },
        { name: 'Blowjob', slug: 'blowjob' },
        { name: 'Mature Woman', slug: 'mature-woman' },
        { name: 'Slender', slug: 'slender' },
        { name: 'Slut', slug: 'slut' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [
            { name: 'Mới nhất', value: 'date' }
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
        var baseUrl = "https://jav.guru";
        var path = "";

        if (filters.category) {
            path = "/category/" + filters.category + "/";
        } else if (slug === "moi-nhat" || slug === "") {
            path = "/";
        } else if (slug.indexOf("category/") === 0) {
            path = "/" + slug + "/";
        } else {
            path = "/category/" + slug + "/";
        }

        var url = baseUrl + path;
        if (page > 1) {
            url += "page/" + page + "/";
        }
        return url;
    } catch (e) {
        return "https://jav.guru/";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var url = "https://jav.guru/?s=" + encodeURIComponent(keyword);
        if (page > 1) {
            url = "https://jav.guru/page/" + page + "/?s=" + encodeURIComponent(keyword);
        }
        return url;
    } catch (e) {
        return "https://jav.guru/?s=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (slug.indexOf("http") === 0) {
        return slug;
    }
    return "https://jav.guru/" + slug;
}

function getUrlCategories() {
    return "https://jav.guru";
}

function getUrlCountries() {
    return "https://jav.guru";
}

function getUrlYears() {
    return "https://jav.guru";
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(apiResponseHtml) {
    try {
        var movies = [];
        var seenIds = {};
        
        var parts = apiResponseHtml.split("inside-article");
        
        for (var i = 1; i < parts.length; i++) {
            var part = parts[i];
            
            var linkMatch = /href=["']https?:\/\/jav\.guru\/(\d+\/[^"']+\/)/i.exec(part) || 
                            /href=["'](?:https?:\/\/jav\.guru)?\/(\d+\/[^"']+\/)/i.exec(part);
            if (!linkMatch) continue;
            var slug = linkMatch[1];
            
            if (seenIds[slug]) continue;
            seenIds[slug] = true;
            
            var imgMatch = /<img[^>]*src=["']([^"']+)["']/i.exec(part) || 
                           /<img[^>]*data-src=["']([^"']+)["']/i.exec(part);
            var posterUrl = imgMatch ? imgMatch[1] : "";
            
            var titleMatch = /<img[^>]*alt=["']([^"']+)["']/i.exec(part) ||
                             /title=["']([^"']+)["']/i.exec(part);
            var title = titleMatch ? titleMatch[1] : slug.replace(/-/g, " ");
            title = title.replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&amp;/g, "&").trim();
            
            movies.push({
                id: slug,
                title: title,
                posterUrl: posterUrl,
                backdropUrl: posterUrl,
                year: 0,
                quality: "HD",
                episode_current: "",
                lang: "EN"
            });
        }
        
        var totalPages = 1;
        var pagenaviMatch = /Page \d+ of ([\d,]+)/.exec(apiResponseHtml);
        if (pagenaviMatch) {
            totalPages = parseInt(pagenaviMatch[1].replace(/,/g, ""), 10) || 1;
        } else {
            var pageRegex = /\/page\/(\d+)\//g;
            var match;
            while ((match = pageRegex.exec(apiResponseHtml)) !== null) {
                var pageNum = parseInt(match[1], 10);
                if (pageNum > totalPages) {
                    totalPages = pageNum;
                }
            }
        }
        
        return JSON.stringify({
            items: movies,
            pagination: {
                currentPage: 1,
                totalPages: totalPages
            }
        });
    } catch (error) {
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
        var director = "";
        var categories = [];
        var casts = [];
        
        var titleMatch = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(apiResponseHtml) ||
                         /<title>([\s\S]*?)<\/title>/i.exec(apiResponseHtml);
        if (titleMatch) {
            title = titleMatch[1].replace(/<[^>]*>/g, "").replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").trim();
        }
        
        var posterMatch = /class="large-screenshot"[\s\S]*?<img[^>]*src="([^"]+)"/i.exec(apiResponseHtml) ||
                           /class="large-screenimg"[\s\S]*?<img[^>]*src="([^"]+)"/i.exec(apiResponseHtml) ||
                           /<meta[^>]*property="og:image"[^>]*content="([^"]*)"/i.exec(apiResponseHtml);
        if (posterMatch) {
            posterUrl = posterMatch[1];
        }
        
        var descMatch = /<meta[^>]*name="description"[^>]*content="([^"]*)"/i.exec(apiResponseHtml) ||
                        /<meta[^>]*property="og:description"[^>]*content="([^"]*)"/i.exec(apiResponseHtml);
        if (descMatch) {
            description = descMatch[1].replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").trim();
        }
        
        var dateMatch = /Release Date:\s*<\/span><\/strong>\s*(\d{4})/i.exec(apiResponseHtml) ||
                        /Release Date:<\/strong>\s*(\d{4})/i.exec(apiResponseHtml);
        if (dateMatch) {
            year = parseInt(dateMatch[1], 10) || 0;
        }
        
        var dirMatch = /Director:<\/strong>\s*<a[^>]*>([^<]+)/i.exec(apiResponseHtml);
        if (dirMatch) {
            director = dirMatch[1].trim();
        }
        
        var actressRegex = /\/actress\/[^\/]+\/['"][^>]*>([^<]+)<\/a>/g;
        var actressMatch;
        while ((actressMatch = actressRegex.exec(apiResponseHtml)) !== null) {
            var actName = actressMatch[1].trim();
            if (actName && casts.indexOf(actName) === -1) {
                casts.push(actName);
            }
        }
        
        var catRegex = /\/category\/[^\/]+\/['"][^>]*>([^<]+)<\/a>/g;
        var tagRegex = /\/tag\/[^\/]+\/['"][^>]*>([^<]+)<\/a>/g;
        var match;
        
        while ((match = catRegex.exec(apiResponseHtml)) !== null) {
            var catName = match[1].trim();
            if (catName && categories.indexOf(catName) === -1) {
                categories.push(catName);
            }
        }
        
        while ((match = tagRegex.exec(apiResponseHtml)) !== null) {
            var tagName = match[1].trim();
            if (tagName && categories.indexOf(tagName) === -1) {
                categories.push(tagName);
            }
        }
        
        var categoryStr = categories.join(", ");
        var castsStr = casts.join(", ");
        
        var nameMap = {};
        var buttonRegex = /data-localize=["'](\w+)["'][^>]*>([\s\S]*?)<\/a>/gi;
        var btnMatch;
        while ((btnMatch = buttonRegex.exec(apiResponseHtml)) !== null) {
            nameMap[btnMatch[1]] = btnMatch[2].replace(/<[^>]*>/g, "").trim();
        }

        var servers = [];
        
        var scriptMatch = /<script id="wp-btn-iframe-js-extra">([\s\S]*?)<\/script>/i.exec(apiResponseHtml);
        if (scriptMatch) {
            var scriptContent = scriptMatch[1];
            
            var varRegex = /var\s+(\w+)\s*=\s*(\{[\s\S]*?\});/g;
            var varMatch;
            
            while ((varMatch = varRegex.exec(scriptContent)) !== null) {
                var varName = varMatch[1];
                var jsonStr = varMatch[2];
                
                try {
                    var varData = JSON.parse(jsonStr);
                    var iframeUrlB64 = varData.iframe_url || "";
                    var btnTitle = nameMap[varName] || varData.btn_title || varName.toUpperCase();
                    
                    if (iframeUrlB64) {
                        var decodedUrl = es5Base64Decode(iframeUrlB64);
                        var paramMatch = /[?&]([a-z]d)=([a-zA-Z0-9]+)/i.exec(decodedUrl);
                        if (paramMatch) {
                            var paramName = paramMatch[1];
                            var token = paramMatch[2];
                            var typeLetter = paramName.charAt(0);
                            var reversedToken = token.split("").reverse().join("");
                            var realSrc = "https://jav.guru/searcho/?" + typeLetter + "r=" + reversedToken;
                            
                            servers.push({
                                name: btnTitle,
                                episodes: [
                                    {
                                        id: realSrc,
                                        name: "Play Video",
                                        slug: varName
                                    }
                                ]
                            });
                        }
                    }
                } catch (e) {}
            }
        }
        
        return JSON.stringify({
            id: "",
            title: title,
            originName: title,
            posterUrl: posterUrl,
            backdropUrl: posterUrl,
            description: description,
            year: year,
            rating: 0,
            quality: "HD",
            servers: servers,
            episode_current: "",
            lang: "EN",
            category: categoryStr,
            country: "JP",
            director: director,
            casts: castsStr,
            tmdbId: "",
            tmdbSeason: 0,
            tmdbType: ""
        });
    } catch (error) {
        return "null";
    }
}

function parseDetailResponse(apiResponseHtml) {
    try {
        var unpacked = "";
        
        var evalMatch = /eval\(function\(p,\s*a,\s*c,\s*k,\s*e,\s*d\)[\s\S]*?\}\(\s*['"]([\s\S]*?)['"]\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*['"]([\s\S]*?)['"]\.split\(['"]\|['"]\)\s*\)\s*\)/i.exec(apiResponseHtml);
        if (evalMatch) {
            var p = evalMatch[1];
            var a = parseInt(evalMatch[2], 10);
            var c = parseInt(evalMatch[3], 10);
            var k = evalMatch[4].split("|");
            
            unpacked = unpackPackedCode(p, a, c, k);
        }
        
        var streamUrl = "";
        if (unpacked) {
            var hls4Match = /"hls4"\s*:\s*"([^"]+)"/.exec(unpacked);
            var hls2Match = /"hls2"\s*:\s*"([^"]+)"/.exec(unpacked);
            var hls3Match = /"hls3"\s*:\s*"([^"]+)"/.exec(unpacked);
            
            var relativeM3u8 = hls4Match ? hls4Match[1] : "";
            var absoluteM3u8 = hls2Match ? hls2Match[1] : (hls3Match ? hls3Match[1] : "");
            
            if (relativeM3u8 && relativeM3u8.indexOf("/") === 0) {
                streamUrl = "https://javclan.com" + relativeM3u8;
            } else if (absoluteM3u8) {
                streamUrl = absoluteM3u8;
            } else {
                var anyM3u8 = /"([^"]+\.m3u8[^"]*)"/.exec(unpacked);
                if (anyM3u8) {
                    streamUrl = anyM3u8[1];
                }
            }
        }
        
        if (!streamUrl) {
            var fallbackMatch = /<source[^>]*src="([^"]+\.m3u8[^"]*)"/i.exec(apiResponseHtml) ||
                                /<source[^>]*src="([^"]+\.mp4[^"]*)"/i.exec(apiResponseHtml) ||
                                /file\s*:\s*["']([^"']+\.(?:m3u8|mp4)[^"']*)["']/i.exec(apiResponseHtml);
            if (fallbackMatch) {
                streamUrl = fallbackMatch[1];
            }
        }
        
        return JSON.stringify({
            url: streamUrl,
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://javclan.com/"
            },
            subtitles: []
        });
    } catch (error) {
        return JSON.stringify({ url: "", headers: {} });
    }
}

function parseCategoriesResponse(apiResponseJson) {
    return getPrimaryCategories();
}

function parseCountriesResponse(apiResponseJson) {
    return JSON.stringify([]);
}

function parseYearsResponse(apiResponseJson) {
    return JSON.stringify([]);
}

// =============================================================================
// HELPERS
// =============================================================================

function es5Base64Decode(str) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var lookup = {};
    for (var i = 0; i < chars.length; i++) {
        lookup[chars.charAt(i)] = i;
    }
    lookup["="] = 0;
    
    str = str.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
    
    var len = str.length;
    var result = "";
    
    for (var idx = 0; idx < len; idx += 4) {
        var char1 = str.charAt(idx);
        var char2 = str.charAt(idx + 1);
        var char3 = str.charAt(idx + 2) || "=";
        var char4 = str.charAt(idx + 3) || "=";
        
        var val1 = lookup[char1];
        var val2 = lookup[char2];
        var val3 = lookup[char3];
        var val4 = lookup[char4];
        
        if (val1 === undefined || val2 === undefined || val3 === undefined || val4 === undefined) {
            continue;
        }
        
        var combined = (val1 << 18) | (val2 << 12) | (val3 << 6) | val4;
        
        var byte1 = (combined >> 16) & 255;
        var byte2 = (combined >> 8) & 255;
        var byte3 = combined & 255;
        
        result += String.fromCharCode(byte1);
        if (char3 !== "=") {
            result += String.fromCharCode(byte2);
        }
        if (char4 !== "=") {
            result += String.fromCharCode(byte3);
        }
    }
    return result;
}

function unpackPackedCode(p, a, c, k) {
    function baseN(num, base) {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (num === 0) return "0";
        var res = "";
        while (num > 0) {
            res = chars.charAt(num % base) + res;
            num = Math.floor(num / base);
        }
        return res;
    }
    
    for (var idx = c - 1; idx >= 0; idx--) {
        if (k[idx]) {
            var code = baseN(idx, a);
            var regex = new RegExp("\\b" + code + "\\b", "g");
            p = p.replace(regex, k[idx]);
        }
    }
    return p;
}
