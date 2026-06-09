// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "javhd",
        "name": "JavHD",
        "version": "1.0.6",
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

function parseDetailResponse(html) {
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
        }

        return JSON.stringify({
            url: firstEmbed,
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
