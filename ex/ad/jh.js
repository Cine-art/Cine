// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "javhd",
        "name": "JavHD",
        "version": "1.0.7",
        "baseUrl": "https://javhdz.today",
        "iconUrl": "https://javhdz.today/favicon-32x32.png",
        "isEnabled": true,
        "isAdult": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'recent', title: 'Latest Updates', type: 'Horizontal', path: 'recent' },
        { slug: 'engsub', title: 'Jav English Sub', type: 'Horizontal', path: 'engsub' },
        { slug: 'uncensored', title: 'Uncensored JAV', type: 'Horizontal', path: 'uncensored' },
        { slug: 'beautifulgirl', title: 'Beautiful Girl', type: 'Horizontal', path: 'beautifulgirl' },
        { slug: 'bigtit', title: 'Big Tits', type: 'Horizontal', path: 'bigtit' },
        { slug: 'creampie', title: 'Creampie', type: 'Horizontal', path: 'creampie' },
        { slug: 'amateur', title: 'Amateur JAV', type: 'Horizontal', path: 'amateur' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Jav Eng Sub', slug: 'jav-sub' },
        { name: 'Uncensored Jav', slug: 'uncensored-jav' },
        { name: 'Beautiful Girl', slug: 'beautiful-girl' },
        { name: 'Big Tits', slug: 'big-tits' },
        { name: 'Married Woman', slug: 'married-woman' },
        { name: 'Creampie', slug: 'creampie' },
        { name: 'Amateur', slug: 'amateur' },
        { name: 'Reducing Mosaic', slug: 'reducing-mosaic' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        category: [
            { "name": "Jav Sub", "value": "jav-sub" },
            { "name": "Uncensored JAV", "value": "uncensored-jav" },
            { "name": "Chinese Subtitle", "value": "chinese-subtitle" },
            { "name": "Reducing Mosaic", "value": "reducing-mosaic" },
            { "name": "Amateur", "value": "amateur" },
            { "name": "Creampie", "value": "creampie" },
            { "name": "Big tits", "value": "big-tits" },
            { "name": "Married Woman", "value": "married-woman" },
            { "name": "Beautiful Girl", "value": "beautiful-girl" },
            { "name": "Mature Woman", "value": "mature-woman" },
            { "name": "Squirting", "value": "squirting" },
            { "name": "Nasty", "value": "nasty" },
            { "name": "Hardcore", "value": "hardcore" },
            { "name": "BBW", "value": "bbw" },
            { "name": "Breasts", "value": "breasts" },
            { "name": "Bukkake", "value": "bukkake" },
            { "name": "Cosplay", "value": "cosplay" },
            { "name": "Cowgirl", "value": "cowgirl" },
            { "name": "Debut Production", "value": "debut-production" },
            { "name": "Deep Throating", "value": "deep-throating" },
            { "name": "Shaved", "value": "shaved" },
            { "name": "Massage", "value": "massage" },
            { "name": "Sister", "value": "sister" },
            { "name": "Documentary", "value": "documentary" },
            { "name": "Solowork", "value": "solowork" },
            { "name": "Titty Fuck", "value": "titty-fuck" },
            { "name": "Young Wife", "value": "young-wife" },
            { "name": "Cuckold", "value": "cuckold" },
            { "name": "7mmtv", "value": "7mmtv" },
            { "name": "Anchorwoman", "value": "anchorwoman" },
            { "name": "Asian", "value": "asian" },
            { "name": "Avgle", "value": "avgle" },
            { "name": "Bestjav", "value": "bestjav" },
            { "name": "Busty Fetish", "value": "busty-fetish" },
            { "name": "Car Sex", "value": "car-sex" },
            { "name": "Dead Drunk", "value": "dead-drunk" },
            { "name": "Dirty Words", "value": "dirty-words" },
            { "name": "Drama", "value": "drama" },
            { "name": "English Sub Jav", "value": "eng-sub-jav" },
            { "name": "Facials", "value": "facials" },
            { "name": "Female Doctor", "value": "female-doctor" },
            { "name": "Fighting Action", "value": "fighting-action" },
            { "name": "Glasses", "value": "glasses" },
            { "name": "Handjob", "value": "handjob" },
            { "name": "Hentai", "value": "hentai" },
            { "name": "Huge Butt", "value": "huge-butt" },
            { "name": "Humiliation", "value": "humiliation" },
            { "name": "Incest", "value": "incest" },
            { "name": "Jable", "value": "jable" },
            { "name": "Japan Sex", "value": "japan-sex" },
            { "name": "Jav Censored", "value": "jav-censored" },
            { "name": "Jav Guru", "value": "jav-guru" },
            { "name": "Jav Porn", "value": "jav-porn" },
            { "name": "Jav Tube", "value": "jav-tube" },
            { "name": "JavBangers", "value": "javbangers" },
            { "name": "Javct", "value": "javct" },
            { "name": "Javfinder", "value": "javfinder" },
            { "name": "Javgg", "value": "javgg" },
            { "name": "Javhub", "value": "javhub" },
            { "name": "Javlibrary", "value": "javlibrary" },
            { "name": "Javmost", "value": "javmost" },
            { "name": "Javtiful", "value": "javtiful" },
            { "name": "Javtrailers", "value": "javtrailers" },
            { "name": "Kimono", "value": "kimono" },
            { "name": "Kiss", "value": "kiss" },
            { "name": "Leg Fetish", "value": "leg-fetish" },
            { "name": "Lesbian", "value": "lesbian" },
            { "name": "Lingerie", "value": "lingerie" },
            { "name": "Missav", "value": "missav" },
            { "name": "Mother", "value": "mother" },
            { "name": "Nampa", "value": "nampa" },
            { "name": "Njav", "value": "njav" },
            { "name": "Omnibus", "value": "omnibus" },
            { "name": "Outdoors", "value": "outdoors" },
            { "name": "Piss Drinking", "value": "piss-drinking" },
            { "name": "Planning", "value": "planning" },
            { "name": "Pornhub", "value": "pornhub" },
            { "name": "POV", "value": "pov" },
            { "name": "Promiscuity", "value": "promiscuity" },
            { "name": "Prostitutes", "value": "prostitutes" },
            { "name": "Rape", "value": "rape" },
            { "name": "Restraints", "value": "restraints" },
            { "name": "Risky Mosaic", "value": "risky-mosaic" },
            { "name": "School", "value": "school" },
            { "name": "Sextb", "value": "sextb" },
            { "name": "Slender", "value": "slender" },
            { "name": "Sport", "value": "sport" },
            { "name": "Supjav", "value": "supjav" },
            { "name": "Teacher", "value": "teacher" },
            { "name": "Thisav", "value": "thisav" },
            { "name": "Top most searched Jav movies on the internet", "value": "top-most-searched-jav-movies-on-the-internet" },
            { "name": "Toy", "value": "toy" },
            { "name": "Various Professions", "value": "various-professions" },
            { "name": "Virgin Man", "value": "virgin-man" },
            { "name": "Vjav", "value": "vjav" },
            { "name": "Xhamster", "value": "xhamster" },
            { "name": "Xnxx", "value": "xnxx" },
            { "name": "Xvideos", "value": "xvideos" }
        ],
        sort: [
            { name: 'Recent', value: 'recent' },
            { name: 'Popular', value: 'popular' },
            { name: 'Release Date', value: 'releaseday' },
            { name: 'Rated', value: 'rated' }
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
        var sort = filters.sort || "recent";
        var baseUrl = "https://javhdz.today";

        if (filters.category) {
            slug = filters.category;
        }

        // Map homepage sections to their respective list page slugs
        var sectionCategoryMap = {
            "engsub": "jav-sub",
            "uncensored": "uncensored-jav",
            "beautifulgirl": "beautiful-girl",
            "bigtit": "big-tits",
            "creampie": "creampie",
            "amateur": "amateur"
        };

        if (page === 1) {
            var homeSections = ['recent', 'featured', 'watched', 'engsub', 'topmostsearch', 'amateur', 'beautifulgirl', 'uncensored', 'bigtit', 'creampie', 'debut'];
            if (homeSections.indexOf(slug) >= 0) {
                return baseUrl + "/?ajax=fp_section&s=" + slug;
            }
            if (slug.indexOf('tag/') === 0 || slug.indexOf('tag-') === 0) {
                var tagname = slug.replace('tag/', '').replace('tag-', '');
                return baseUrl + "/tag/" + tagname + "/?ajax=1";
            }
            return baseUrl + "/" + slug + "/?ajax=1";
        } else {
            if (slug === 'recent' || slug === 'popular' || slug === 'releaseday' || slug === 'rated' || slug === 'discussed' || slug === 'downloaded' || slug === 'longest' || slug === 'watched') {
                return baseUrl + "/" + slug + "/" + page + "/?ajax=1";
            }
            if (sectionCategoryMap[slug]) {
                return baseUrl + "/" + sectionCategoryMap[slug] + "/" + sort + "/" + page + "/?ajax=1";
            }
            if (slug.indexOf('tag/') === 0 || slug.indexOf('tag-') === 0) {
                var tagname = slug.replace('tag/', '').replace('tag-', '');
                return baseUrl + "/tag/" + tagname + "/" + page + "/?ajax=1";
            }
            return baseUrl + "/" + slug + "/" + sort + "/" + page + "/?ajax=1";
        }
    } catch (e) {
        return "https://javhdz.today/recent/?ajax=1";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        return "https://javhdz.today/search/video/?s=" + encodeURIComponent(keyword) + "&ajax=1&page=" + page;
    } catch (e) {
        return "https://javhdz.today/search/video/?s=" + encodeURIComponent(keyword) + "&ajax=1";
    }
}

function getUrlDetail(slug) {
    if (!slug) return "";
    if (slug.indexOf('http') === 0) {
        return slug;
    }
    if (slug.indexOf('/') === 0) {
        return "https://javhdz.today" + slug;
    }
    return "https://javhdz.today/" + slug;
}

function getUrlCategories() { return "https://javhdz.today/categories/"; }
function getUrlCountries() { return ""; }
function getUrlYears() { return ""; }

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(apiResponseJson) {
    try {
        var response = JSON.parse(apiResponseJson);
        var html = response.html || "";
        var paginationHtml = response.pagination || "";
        
        var movies = [];
        var itemRegex = /<li[^>]*id="video-(\d+)"[^>]*>([\s\S]*?)<\/li>/g;
        var match;
        
        while ((match = itemRegex.exec(html)) !== null) {
            var itemId = match[1];
            var itemContent = match[2];
            
            var hrefMatch = itemContent.match(/<a[^>]*href="([^"]+)"/);
            var titleMatch = itemContent.match(/<span[^>]*class="video-title"[^>]*>([\s\S]*?)<\/span>/);
            if (!titleMatch) {
                titleMatch = itemContent.match(/title="([^"]+)"/);
            }
            var imgMatch = itemContent.match(/<img[^>]*src="([^"]+)"/);
            var durationMatch = itemContent.match(/<span[^>]*class="video-overlay badge transparent"[^>]*>([\s\S]*?)<\/span>/);
            var codeMatch = itemContent.match(/<span[^>]*class="video-overlay1 badge transparent"[^>]*>([\s\S]*?)<\/span>/);
            
            var href = hrefMatch ? hrefMatch[1] : "";
            var title = titleMatch ? titleMatch[1].trim() : "";
            var imgUrl = imgMatch ? imgMatch[1] : "";
            var duration = durationMatch ? durationMatch[1].trim() : "";
            var code = codeMatch ? codeMatch[1].trim() : "";
            
            title = title.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&');
            duration = duration.replace(/\s+/g, ' ');
            
            movies.push({
                id: href,
                title: title,
                posterUrl: imgUrl,
                backdropUrl: imgUrl,
                year: 0,
                quality: duration.indexOf('HD') >= 0 ? "HD" : "SD",
                episode_current: code || duration,
                lang: "Sub"
            });
        }
        
        var currentPage = 1;
        var activePageMatch = paginationHtml.match(/<li[^>]*class="[^"]*active[^"]*"[^>]*>[\s\S]*?>(\d+)</);
        if (activePageMatch) {
            currentPage = parseInt(activePageMatch[1], 10);
        }
        
        var totalPages = parseTotalPages(paginationHtml);
        
        return JSON.stringify({
            items: movies,
            pagination: {
                currentPage: currentPage,
                totalPages: totalPages,
                totalItems: movies.length * totalPages,
                itemsPerPage: movies.length || 24
            }
        });
    } catch (error) {
        return JSON.stringify({ items: [], pagination: { currentPage: 1, totalPages: 1 } });
    }
}

function parseSearchResponse(apiResponseJson) {
    return parseListResponse(apiResponseJson);
}

function parseMovieDetail(html) {
    try {
        var title = "";
        var titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/i);
        if (!titleMatch) {
            titleMatch = html.match(/<h1>([^<]+)<\/h1>/i);
        }
        if (titleMatch) {
            title = titleMatch[1].trim().replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&');
        }

        var posterUrl = "";
        var posterMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
        if (!posterMatch) {
            posterMatch = html.match(/<img[^>]*class="[^"]*col-xs-12[^"]*"[^>]*src="([^"]+)"/i);
        }
        if (posterMatch) {
            posterUrl = posterMatch[1];
        }

        var description = "";
        var descMatch = html.match(/<p class="description">([\s\S]*?)<\/p>/i);
        if (!descMatch) {
            descMatch = html.match(/<meta property="og:description" content="([^"]+)"/i);
        }
        if (descMatch) {
            description = descMatch[1].replace(/<[^>]*>/g, "").trim().replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&');
        }

        var year = 0;
        var yearMatch = html.match(/Release Day:\s*(\d{4})/i);
        if (yearMatch) {
            year = parseInt(yearMatch[1], 10);
        }

        var rating = 0;
        var ratingMatch = html.match(/(\d+)%\s*\(\d+\/\d+\)/i);
        if (ratingMatch) {
            rating = parseFloat(ratingMatch[1]) / 10.0;
        }

        var categories = [];
        var genreBlockMatch = html.match(/Genre:([\s\S]*?)<\/div>/i);
        if (genreBlockMatch) {
            var genreHtml = genreBlockMatch[1];
            var genreRegex = /<a[^>]*>[\s\S]*?<\/i>\s*([^<]+)<\/a>/g;
            var gMatch;
            while ((gMatch = genreRegex.exec(genreHtml)) !== null) {
                categories.push(gMatch[1].trim());
            }
        }
        var categoriesStr = categories.join(", ");

        var director = "";
        var directorMatch = html.match(/Director:\s*<a[^>]*>([^<]+)<\/a>/i);
        if (directorMatch) {
            director = directorMatch[1].trim();
        }

        var studio = "";
        var studioMatch = html.match(/Studio:\s*<a[^>]*>([^<]+)<\/a>/i);
        if (studioMatch) {
            studio = studioMatch[1].trim();
        }

        var country = "Japan";
        var countryMatch = html.match(/Country:\s*<a[^>]*>([^<]+)<\/a>/i);
        if (countryMatch) {
            country = countryMatch[1].trim();
        }

        var casts = "";
        var castsMatch = description.match(/pornstar\s+([^and\.,]+)/i);
        if (castsMatch) {
            casts = castsMatch[1].trim();
        }

        var servers = [];
        var serverRegex = /<button[^>]*class="button_choice_server"[^>]*data-embed="([^"]+)"[^>]*data-name="([^"]+)"/g;
        var sMatch;
        
        while ((sMatch = serverRegex.exec(html)) !== null) {
            var encodedEmbed = sMatch[1];
            var serverName = sMatch[2].trim();
            var embedUrl = "";
            try {
                embedUrl = base64Decode(encodedEmbed);
            } catch (e) {
                embedUrl = encodedEmbed;
            }
            
            if (embedUrl) {
                servers.push({
                    name: serverName,
                    episodes: [
                        {
                            id: embedUrl,
                            name: "Full",
                            slug: "full"
                        }
                    ]
                });
            }
        }

        var canonicalMatch = html.match(/<link rel="canonical" href="https:\/\/javhdz\.today([^"]+)"/i);
        var id = canonicalMatch ? canonicalMatch[1] : "";

        return JSON.stringify({
            id: id,
            title: title,
            originName: title,
            posterUrl: posterUrl,
            backdropUrl: posterUrl,
            description: description,
            year: year,
            rating: rating,
            quality: "HD",
            servers: servers,
            episode_current: "Full",
            lang: "Sub",
            category: categoriesStr,
            country: country,
            director: director,
            casts: casts,
            tmdbId: "",
            tmdbSeason: 0,
            tmdbType: ""
        });
    } catch (error) {
        return "null";
    }
}

function parseDetailResponse(html, detailUrl) {
    try {
        var firstEmbed = "";
        var serverRegex = /<button[^>]*class="button_choice_server"[^>]*data-embed="([^"]+)"/i;
        var match = html.match(serverRegex);
        if (match) {
            try {
                firstEmbed = base64Decode(match[1]);
            } catch (e) {
                firstEmbed = match[1];
            }
        } else {
            firstEmbed = detailUrl || "";
        }

        var isEmbed = false;
        if (firstEmbed) {
            var lowerUrl = firstEmbed.toLowerCase();
            if (lowerUrl.indexOf(".m3u8") === -1 && 
                lowerUrl.indexOf(".mp4") === -1 && 
                lowerUrl.indexOf(".mpd") === -1 && 
                lowerUrl.indexOf(".mkv") === -1) {
                isEmbed = true;
            }
        }

        return JSON.stringify({
            url: firstEmbed,
            isEmbed: isEmbed,
            headers: { 
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", 
                "Referer": "https://javhdz.today" 
            },
            subtitles: []
        });
    } catch (error) {
        return "{}";
    }
}

function parseEmbedResponse(embedHtml, embedUrl) {
    try {
        var lowerUrl = embedUrl.toLowerCase();
        
        // 1. Turbovid
        if (lowerUrl.indexOf("turbovid") > -1 || lowerUrl.indexOf("turboviplay") > -1) {
            var urlPlayMatch = embedHtml.match(/var\s+urlPlay\s*=\s*['"]([^'"]+)['"]/);
            if (urlPlayMatch && urlPlayMatch[1]) {
                return JSON.stringify({
                    url: urlPlayMatch[1],
                    isEmbed: false,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                        "Referer": embedUrl
                    }
                });
            }
        }
        
        // 2. Streamtape
        if (lowerUrl.indexOf("streamtape") > -1) {
            var botlinkMatch = embedHtml.match(/document\.getElementById\('botlink'\)\.innerHTML\s*=\s*['"]([^'"]+)['"]\s*\+\s*\(['"]([^'"]+)['"]\)([\s\S]*?);/);
            if (botlinkMatch) {
                var base = botlinkMatch[1];
                var token = botlinkMatch[2];
                var ops = botlinkMatch[3];
                
                var subRegex = /\.substring\((\d+)\)/g;
                var subMatch;
                while ((subMatch = subRegex.exec(ops)) !== null) {
                    var start = parseInt(subMatch[1], 10);
                    token = token.substring(start);
                }
                
                var streamUrl = base + token;
                if (streamUrl.indexOf("//") === 0) {
                    streamUrl = "https:" + streamUrl;
                }
                if (streamUrl.indexOf("stream=1") === -1) {
                    streamUrl += (streamUrl.indexOf("?") > -1 ? "&" : "?") + "stream=1";
                }
                return JSON.stringify({
                    url: streamUrl,
                    isEmbed: false,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                        "Referer": "https://streamtape.com/"
                    }
                });
            }
        }
        
        // 3. Cloudwish
        if (lowerUrl.indexOf("cloudwish") > -1) {
            var unpacked = unpackPacker(embedHtml);
            var linksMatch = unpacked.match(/"hls4"\s*:\s*"([^"]+)"/) || 
                             unpacked.match(/"hls2"\s*:\s*"([^"]+)"/) ||
                             unpacked.match(/"hls3"\s*:\s*"([^"]+)"/);
            if (linksMatch && linksMatch[1]) {
                var hlsUrl = linksMatch[1];
                if (hlsUrl.indexOf('/') === 0) {
                    var hostMatch = embedUrl.match(/^(https?:\/\/[^/]+)/);
                    if (hostMatch) {
                        hlsUrl = hostMatch[1] + hlsUrl;
                    }
                }
                return JSON.stringify({
                    url: hlsUrl,
                    isEmbed: false,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                        "Referer": embedUrl
                    }
                });
            }
        }
        
        // Generic Fallback search
        var m3u8Match = embedHtml.match(/["'](https?:\/\/[^"'\s]+\.m3u8[^"'\s]*)["']/i) ||
                        embedHtml.match(/file\s*:\s*["']([^"'\s]+\.m3u8[^"'\s]*)["']/i);
        if (m3u8Match && m3u8Match[1]) {
            return JSON.stringify({
                url: m3u8Match[1].replace(/\\/g, ''),
                isEmbed: false,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Referer": embedUrl
                }
            });
        }
        
        var mp4Match = embedHtml.match(/["'](https?:\/\/[^"'\s]+\.mp4[^"'\s]*)["']/i) ||
                       embedHtml.match(/file\s*:\s*["']([^"'\s]+\.mp4[^"'\s]*)["']/i);
        if (mp4Match && mp4Match[1]) {
            return JSON.stringify({
                url: mp4Match[1].replace(/\\/g, ''),
                isEmbed: false,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Referer": embedUrl
                }
            });
        }
        
        // Fallback to original embed url
        return JSON.stringify({
            url: embedUrl,
            isEmbed: false,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://javhdz.today"
            }
        });
    } catch(e) {
        return JSON.stringify({
            url: embedUrl,
            isEmbed: false,
            headers: {}
        });
    }
}

function unpackPacker(html) {
    var pRegex = /eval\(function\(p,a,c,k,e,d\)[\s\S]*?\}\('([\s\S]*?)',\s*(\d+),\s*(\d+),\s*'([\s\S]*?)'\.split\('\|'\)/;
    var match = html.match(pRegex);
    if (!match) return html;
    
    var p = match[1];
    var a = parseInt(match[2], 10);
    var c = parseInt(match[3], 10);
    var k = match[4].split('|');
    
    var e = function(c) {
        return (c < a ? '' : e(parseInt(c / a, 10))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    
    var d = {};
    while (c--) {
        d[e(c)] = k[c] || e(c);
    }
    
    var result = p.replace(/\b\w+\b/g, function(val) {
        return d[val] || val;
    });
    return result;
}

function parseCategoriesResponse(html) {
    try {
        var categories = [];
        var regex = /<li[^>]*class="boxlist"[^>]*><a[^>]*href="https:\/\/javhdz\.today\/([^/]+)\/"[^>]*>[\s\S]*?<div>([^<]+)<\/div>/g;
        var match;
        while ((match = regex.exec(html)) !== null) {
            categories.push({
                name: match[2].trim(),
                slug: match[1]
            });
        }
        return JSON.stringify(categories);
    } catch (e) {
        return "[]";
    }
}

function parseCountriesResponse(apiResponseJson) { return "[]"; }
function parseYearsResponse(apiResponseJson) { return "[]"; }

// =============================================================================
// HELPERS & DECODERS
// =============================================================================

function parseTotalPages(paginationHtml) {
    if (!paginationHtml) return 1;
    var matches = paginationHtml.match(/(?:page=|\/)(\d+)(?:["'&]|\/)/g);
    if (!matches) return 1;
    var maxPage = 1;
    for (var i = 0; i < matches.length; i++) {
        var numMatch = matches[i].match(/(\d+)/);
        if (numMatch) {
            var num = parseInt(numMatch[1], 10);
            if (num > maxPage) {
                maxPage = num;
            }
        }
    }
    return maxPage;
}

function base64Decode(str) {
    if (typeof atob === 'function') {
        return atob(str);
    }
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var output = '';
    str = String(str).replace(/[=]+$/, '');
    if (str.length % 4 === 1) {
        throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (var bc = 0, bs, code, idx = 0; idx < str.length; ) {
        code = chars.indexOf(str.charAt(idx++));
        bs = bc % 4 ? bs * 64 + code : code;
        if (bc++ % 4) {
            output += String.fromCharCode(255 & bs >> (-2 * bc & 6));
        }
    }
    return output;
}
