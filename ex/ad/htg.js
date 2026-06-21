// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
    "id": "hentaigem",
    "name": "Hentaigem",
    "version": "1.0.0",
    "baseUrl": "https://www.hentaigem.com",
    "iconUrl": "https://www.hentaigem.com/images/icons/favicon-32x32.png",
    "isEnabled": true,
    "isAdult": true,
    "type": "MOVIE",
    "playerType": "exoplayer",
    "layoutType": "HORIZONTAL"
});
}

// Home sections mapping
function getHomeSections() {
    return JSON.stringify([
    {
        "slug": "latest-updates",
        "title": "Latest Updates",
        "type": "Horizontal",
        "path": "latest-updates"
    },
    {
        "slug": "most-popular",
        "title": "Most Popular",
        "type": "Horizontal",
        "path": "most-popular"
    },
    {
        "slug": "top-rated",
        "title": "Top Rated",
        "type": "Horizontal",
        "path": "top-rated"
    },
    {
        "slug": "longest",
        "title": "Longest",
        "type": "Horizontal",
        "path": "longest"
    },
    {
        "slug": "3d",
        "title": "3D Hentai",
        "type": "Grid",
        "path": "categories/3d"
    }
]);
}

function getPrimaryCategories() {
    return JSON.stringify([
    {
        "name": "3D Hentai",
        "slug": "categories/3d"
    },
    {
        "name": "Futanari",
        "slug": "categories/futanari"
    },
    {
        "name": "Uncensored",
        "slug": "categories/uncensored"
    },
    {
        "name": "Milf",
        "slug": "categories/milf"
    },
    {
        "name": "Cosplay",
        "slug": "categories/cosplay"
    }
]);
}

function getFilterConfig() {
    return JSON.stringify({
    "category": [
        {
            "name": "Hentai",
            "value": "categories/hentai"
        },
        {
            "name": "3D",
            "value": "categories/3d"
        },
        {
            "name": "Ahegao",
            "value": "categories/ahegao"
        },
        {
            "name": "AI Generated",
            "value": "categories/ai-generated"
        },
        {
            "name": "Anal",
            "value": "categories/anal"
        },
        {
            "name": "BDSM",
            "value": "categories/bdsm"
        },
        {
            "name": "Big Dick",
            "value": "categories/big-dick"
        },
        {
            "name": "Big Tits",
            "value": "categories/big-tits"
        },
        {
            "name": "Blonde",
            "value": "categories/blonde"
        },
        {
            "name": "Blowjob",
            "value": "categories/blowjob"
        },
        {
            "name": "Bondage",
            "value": "categories/bondage"
        },
        {
            "name": "Boob Job",
            "value": "categories/boobjob"
        },
        {
            "name": "Brunette",
            "value": "categories/brunette"
        },
        {
            "name": "Cartoons",
            "value": "categories/cartoons"
        },
        {
            "name": "Censored",
            "value": "categories/censored"
        },
        {
            "name": "College Girl",
            "value": "categories/college-girl"
        },
        {
            "name": "Comedy",
            "value": "categories/comedy"
        },
        {
            "name": "Comics",
            "value": "categories/comics"
        },
        {
            "name": "Compilation",
            "value": "categories/compilation"
        },
        {
            "name": "Cosplay",
            "value": "categories/cosplay"
        },
        {
            "name": "Cowgirl",
            "value": "categories/cowgirl"
        },
        {
            "name": "Creampie",
            "value": "categories/creampie"
        },
        {
            "name": "Cumshot",
            "value": "categories/cumshot"
        },
        {
            "name": "Dark Skin",
            "value": "categories/dark-skin"
        },
        {
            "name": "Deepthroat",
            "value": "categories/deepthroat"
        },
        {
            "name": "Doggy Style",
            "value": "categories/doggy-style"
        },
        {
            "name": "Doujinshi",
            "value": "categories/doujinshi"
        },
        {
            "name": "Facial",
            "value": "categories/facial"
        },
        {
            "name": "Fantasy",
            "value": "categories/fantasy"
        },
        {
            "name": "Fingering",
            "value": "categories/fingering"
        },
        {
            "name": "Footjob",
            "value": "categories/footjob"
        },
        {
            "name": "Furry",
            "value": "categories/furry"
        },
        {
            "name": "Futanari",
            "value": "categories/futanari"
        },
        {
            "name": "Gangbang",
            "value": "categories/gangbang"
        },
        {
            "name": "Gay",
            "value": "categories/gay"
        },
        {
            "name": "Gyaru",
            "value": "categories/gyaru"
        },
        {
            "name": "Handjob",
            "value": "categories/handjob"
        },
        {
            "name": "Hardcore",
            "value": "categories/hardcore"
        },
        {
            "name": "Harem",
            "value": "categories/harem"
        },
        {
            "name": "HD",
            "value": "categories/hd"
        },
        {
            "name": "Horror",
            "value": "categories/horror"
        },
        {
            "name": "Lesbian",
            "value": "categories/lesbian"
        },
        {
            "name": "Masturbation",
            "value": "categories/masturbation"
        },
        {
            "name": "Mature",
            "value": "categories/mature"
        },
        {
            "name": "MILF",
            "value": "categories/milf"
        },
        {
            "name": "Monster",
            "value": "categories/monster"
        },
        {
            "name": "Nakadashi",
            "value": "categories/nakadashi"
        },
        {
            "name": "Naruto",
            "value": "categories/naruto"
        },
        {
            "name": "Nekomimi",
            "value": "categories/nekomimi"
        },
        {
            "name": "Netorare",
            "value": "categories/netorare"
        },
        {
            "name": "NTR",
            "value": "categories/ntr"
        },
        {
            "name": "Orgy",
            "value": "categories/orgy"
        },
        {
            "name": "Paizuri",
            "value": "categories/paizuri"
        },
        {
            "name": "POV",
            "value": "categories/pov"
        },
        {
            "name": "Public Sex",
            "value": "categories/public-sex"
        },
        {
            "name": "Redhead",
            "value": "categories/redhead"
        },
        {
            "name": "Rim Job",
            "value": "categories/rim-job"
        },
        {
            "name": "Rough Sex",
            "value": "categories/rough-sex"
        },
        {
            "name": "Sex Toys",
            "value": "categories/sex-toys"
        },
        {
            "name": "Shemale",
            "value": "categories/shemale"
        },
        {
            "name": "Shounen",
            "value": "categories/shounen"
        },
        {
            "name": "Softcore",
            "value": "categories/softcore"
        },
        {
            "name": "Submissive",
            "value": "categories/submissive"
        },
        {
            "name": "Taboo",
            "value": "categories/taboo"
        },
        {
            "name": "Teen 18+",
            "value": "categories/teen"
        },
        {
            "name": "Tentacle",
            "value": "categories/tentacle"
        },
        {
            "name": "Threesome",
            "value": "categories/threesome"
        },
        {
            "name": "Trap",
            "value": "categories/trap"
        },
        {
            "name": "Ugly Man",
            "value": "categories/ugly-man"
        },
        {
            "name": "Uncensored",
            "value": "categories/uncensored"
        },
        {
            "name": "Upskirt",
            "value": "categories/upskirt"
        },
        {
            "name": "Vanilla",
            "value": "categories/vanilla"
        },
        {
            "name": "X-Ray",
            "value": "categories/x-ray"
        },
        {
            "name": "Yaoi",
            "value": "categories/yaoi"
        },
        {
            "name": "Yuri",
            "value": "categories/yuri"
        }
    ],
    "sort": [
        {
            "name": "Latest",
            "value": "post_date"
        },
        {
            "name": "Views",
            "value": "video_viewed"
        },
        {
            "name": "Rating",
            "value": "rating"
        },
        {
            "name": "Duration",
            "value": "duration"
        }
    ]
});
}

// =============================================================================
// URL GENERATION
// =============================================================================

function getUrlList(slug, filtersJson) {
    var filters = JSON.parse(filtersJson || "{}");
    var page = filters.page || 1;
    var baseUrl = "https://www.hentaigem.com";
    
    var path = slug || "latest-updates";
    if (filters.category) {
        path = filters.category;
    }
    
    if (path === 'home' || path === '') {
        path = "latest-updates";
    }
    
    if (path.indexOf("/") === 0) path = path.substring(1);
    if (path.substring(path.length - 1) === "/") path = path.substring(0, path.length - 1);
    
    var url = baseUrl + "/" + path;
    if (page > 1) {
        url += "/" + page + "/";
    } else {
        url += "/";
    }
    
    var params = [];
    if (filters.sort && filters.sort !== 'post_date') {
        params.push("sort_by=" + filters.sort);
    }
    
    if (params.length > 0) {
        url += "?" + params.join("&");
    }
    
    return url;
}

function getUrlSearch(keyword, filtersJson) {
    var filters = JSON.parse(filtersJson || "{}");
    var page = filters.page || 1;
    var baseUrl = "https://www.hentaigem.com";
    var encKeyword = encodeURIComponent(keyword);
    
    var url = baseUrl + "/search/?q=" + encKeyword;
    if (page > 1) {
        url += "&from_videos=" + page;
    }
    return url;
}

function getUrlDetail(slug) {
    if (!slug) return "";
    if (slug.indexOf("http") === 0) return slug;
    if (slug.charAt(0) !== '/') slug = '/' + slug;
    return "https://www.hentaigem.com" + slug;
}

function getUrlCategories() { return ""; }
function getUrlCountries() { return ""; }
function getUrlYears() { return ""; }

function encodeUrlSafe(url) {
    if (!url) return "";
    var parts = url.split("://");
    if (parts.length > 1) {
        var protocol = parts[0];
        var rest = parts[1];
        var queryIdx = rest.indexOf("?");
        var path = queryIdx !== -1 ? rest.substring(0, queryIdx) : rest;
        var query = queryIdx !== -1 ? rest.substring(queryIdx) : "";
        
        path = path.replace(/:/g, "%3A").replace(/,/g, "%2C");
        return protocol + "://" + path + query;
    }
    return url;
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(html) {
    var items = [];
    var cards = html.split(/<div[^>]+class=["']item\s*["']/i);
    
    for (var i = 1; i < cards.length; i++) {
        var block = cards[i];
        
        var linkMatch = block.match(/href=["']([^"']+\/videos\/\d+\/[^"']*)["']/i);
        if (!linkMatch) continue;
        var link = linkMatch[1];
        
        var titleMatch = block.match(/title=["']([^"']+)["']/i);
        var title = titleMatch ? titleMatch[1] : "";
        
        var imgMatch = block.match(/data-original=["']([^"']+)["']/i) || 
                       block.match(/data-src=["']([^"']+)["']/i) || 
                       block.match(/src=["']([^"']+)["']/i);
        var poster = imgMatch ? imgMatch[1] : "";
        
        var durMatch = block.match(/<span[^>]*class=["']duration["'][^>]*>([\s\S]*?)<\/span>/i) ||
                       block.match(/\b\d{1,2}:\d{2}\b/);
        var duration = durMatch ? (durMatch[1] || durMatch[0]).replace(/<[^>]+>/g, '').trim() : "";
        
        items.push({
            id: link.replace("https://www.hentaigem.com", ""),
            title: title || link.substring(link.lastIndexOf("/") + 1),
            posterUrl: poster,
            backdropUrl: poster,
            year: 0,
            quality: "HD",
            episode_current: duration || "Full"
        });
    }
    
    var currentPage = 1;
    var totalPages = 1;
    
    var activeMatch = html.match(/class="page-current"[^>]*><span>(\d+)<\/span>/i);
    if (activeMatch) {
        currentPage = parseInt(activeMatch[1], 10);
    }
    
    var pageRegex = /\b(?:from|from_videos|from_albums)(?:\+[a-z_]+)?\:(\d+)/g;
    var pMatch;
    while ((pMatch = pageRegex.exec(html)) !== null) {
        var pageNum = parseInt(pMatch[1], 10);
        if (pageNum > totalPages && pageNum < 1000) {
            totalPages = pageNum;
        }
    }
    if (currentPage > totalPages) {
        totalPages = currentPage;
    }
    
    return JSON.stringify({
        items: items,
        pagination: {
            currentPage: currentPage,
            totalPages: totalPages
        }
    });
}

function parseSearchResponse(html) {
    return parseListResponse(html);
}

function parseMovieDetail(html) {
    try {
        var titleMatch = html.match(/video_title:\s*['"]([^'"]+)['"]/i) ||
                         html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) ||
                         html.match(/<title>([\s\S]*?)<\/title>/i);
        var title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : "External Video";
        
        var posterMatch = html.match(/preview_url:\s*['"]([^'"]+)["']/i) ||
                          html.match(/<meta[^>]*property=["']og:image["'][^]*content=["']([^"']+)["']/i) ||
                          html.match(/poster=["']([^"']+)["']/i);
        var posterUrl = posterMatch ? posterMatch[1] : "";
        
        var categoriesMatch = html.match(/video_categories:\s*['"]([^'"]+)['"]/i);
        var category = categoriesMatch ? categoriesMatch[1] : "";
        
        var tagsMatch = html.match(/video_tags:\s*['"]([^'"]+)['"]/i);
        var tags = tagsMatch ? tagsMatch[1] : "";

        var servers = [];
        var episodes = [];
        
        var foundUrls = {};
        
        // Match all video_url and quality variants (like video_url_hd, video_url_alt)
        var urlRegex = /video_url\w*["']?\s*:\s*['"]([^'"]+)['"]/gi;
        var uMatch;
        while ((uMatch = urlRegex.exec(html)) !== null) {
            var val = uMatch[1];
            if (val && val.indexOf("http") === 0) {
                if (val.indexOf("preview") !== -1 || val.indexOf("_preview") !== -1) continue;
                var safeVal = encodeUrlSafe(val);
                if (!foundUrls[safeVal]) {
                    foundUrls[safeVal] = true;
                    episodes.push({
                        id: safeVal,
                        name: "Stream " + (episodes.length + 1),
                        slug: "stream-" + episodes.length
                    });
                }
            }
        }
        
        var m3u8Regex = /(https?:\/\/[^"'\s<>\\`{},;]+\.m3u8[^"'\s<>\\`{},;]*)/gi;
        var mp4Regex = /(https?:\/\/[^"'\s<>\\`{},;]+\.mp4[^"'\s<>\\`{},;]*)/gi;
        var match;
        
        while ((match = m3u8Regex.exec(html)) !== null) {
            var mUrl = match[1].replace(/&amp;/g, '&');
            if (mUrl.indexOf("preview") !== -1 || mUrl.indexOf("_preview") !== -1) continue;
            var safeMUrl = encodeUrlSafe(mUrl);
            if (!foundUrls[safeMUrl]) {
                foundUrls[safeMUrl] = true;
                episodes.push({
                    id: safeMUrl,
                    name: "HLS Stream " + (episodes.length + 1),
                    slug: "stream-" + episodes.length
                });
            }
        }
        
        while ((match = mp4Regex.exec(html)) !== null && episodes.length < 5) {
            var mUrl = match[1].replace(/&amp;/g, '&');
            if (mUrl.endsWith(".jpg") || mUrl.endsWith(".png") || mUrl.endsWith(".webp")) continue;
            if (mUrl.indexOf("preview") !== -1 || mUrl.indexOf("_preview") !== -1) continue;
            var safeMUrl = encodeUrlSafe(mUrl);
            if (!foundUrls[safeMUrl]) {
                foundUrls[safeMUrl] = true;
                episodes.push({
                    id: safeMUrl,
                    name: "MP4 Stream " + (episodes.length + 1),
                    slug: "stream-" + episodes.length
                });
            }
        }
        
        if (episodes.length === 0) {
            var iframeRegex = /<iframe[^>]+src=["']([^"']+)["']/gi;
            while ((match = iframeRegex.exec(html)) !== null) {
                var embedUrl = match[1];
                if (embedUrl.indexOf("//") === 0) embedUrl = "https:" + embedUrl;
                if (!foundUrls[embedUrl]) {
                    foundUrls[embedUrl] = true;
                    episodes.push({
                        id: embedUrl,
                        name: "Embed Server " + (episodes.length + 1),
                        slug: "embed-" + episodes.length
                    });
                }
            }
        }
        
        if (episodes.length > 0) {
            servers.push({
                name: "Main Server",
                episodes: episodes
            });
        }
        
        return JSON.stringify({
            id: "",
            title: title,
            posterUrl: posterUrl,
            backdropUrl: posterUrl,
            description: "",
            servers: servers,
            quality: "HD",
            lang: "Sub",
            year: 0,
            rating: 0,
            casts: tags,
            director: "",
            country: "US",
            category: category,
            status: "Completed"
        });
    } catch (e) {
        return "null";
    }
}

function parseDetailResponse(html, fetchedUrl) {
    var isEmbed = true;
    var playUrl = fetchedUrl;
    if (fetchedUrl) {
        var lowerUrl = fetchedUrl.toLowerCase();
        if (lowerUrl.indexOf(".m3u8") !== -1 || lowerUrl.indexOf(".mp4") !== -1) {
            isEmbed = false;
        }
        if (!isEmbed) {
            playUrl = encodeUrlSafe(fetchedUrl);
        }
    }
    return JSON.stringify({
        url: playUrl,
        isEmbed: isEmbed,
        headers: {
            "Referer": "https://www.hentaigem.com/"
        }
    });
}

function parseEmbedResponse(html, url) {
    try {
        // Try flashvars in embed first
        var flashvarsMatch = html.match(/video_url\w*["']?\s*:\s*['"]([^'"]+)['"]/i);
        if (flashvarsMatch) {
            var directUrl = flashvarsMatch[1].replace(/&amp;/g, '&');
            if (directUrl.indexOf("http") === 0) {
                return JSON.stringify({
                    url: encodeUrlSafe(directUrl),
                    isEmbed: false,
                    headers: {
                        "Referer": "https://www.hentaigem.com/"
                    }
                });
            }
        }

        var m3u8Match = html.match(/(https?:\/\/[^"'\s<>\\`{},;]+\.m3u8[^"'\s<>\\`{},;]*)/i);
        if (m3u8Match) {
            return JSON.stringify({
                url: encodeUrlSafe(m3u8Match[1].replace(/&amp;/g, '&')),
                isEmbed: false,
                headers: {
                    "Referer": "https://www.hentaigem.com/"
                }
            });
        }
        
        var mp4Match = html.match(/(https?:\/\/[^"'\s<>\\`{},;]+\.mp4[^"'\s<>\\`{},;]*)/i);
        if (mp4Match) {
            return JSON.stringify({
                url: encodeUrlSafe(mp4Match[1].replace(/&amp;/g, '&')),
                isEmbed: false,
                headers: {
                    "Referer": "https://www.hentaigem.com/"
                }
            });
        }
        
        return JSON.stringify({ url: "", isEmbed: false, headers: {} });
    } catch (e) {
        return JSON.stringify({ url: "", isEmbed: false, headers: {} });
    }
}
