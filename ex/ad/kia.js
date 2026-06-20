// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "kissjav",
        "name": "KissJAV",
        "version": "1.0.0",
        "baseUrl": "https://kissjav.li",
        "iconUrl": "https://kissjav.li/favicon.ico",
        "isEnabled": true,
        "isAdult": true,
        "type": "MOVIE",
        "playerType": "exoplayer",
        "layoutType": "HORIZONTAL"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'latest-updates', title: 'Latest Updates', type: 'Horizontal', path: 'latest-updates' },
        { slug: 'most-popular', title: 'Popular', type: 'Horizontal', path: 'most-popular' },
        { slug: 'jav', title: 'JAV', type: 'Horizontal', path: 'categories/jav' },
        { slug: 'uncensored', title: 'Uncensored (Reducing Mosaic)', type: 'Horizontal', path: 'categories/reducing-mosaic' },
        { slug: 'korean-porn', title: 'Korean Porn', type: 'Grid', path: 'categories/korean-porn' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Latest Updates', slug: 'latest-updates' },
        { name: 'Popular', slug: 'most-popular' },
        { name: 'JAV', slug: 'categories/jav' },
        { name: 'Uncensored', slug: 'categories/reducing-mosaic' },
        { name: 'Korean Porn', slug: 'categories/korean-porn' },
        { name: 'Korean BJ', slug: 'categories/korean-bj' },
        { name: 'FC2 PPV', slug: 'categories/fc2ppv' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        category: [
            { name: "JAV", value: "categories/jav" },
            { name: "Uncensored (Reducing Mosaic)", value: "categories/reducing-mosaic" },
            { name: "Korean Porn", value: "categories/korean-porn" },
            { name: "Korean BJ", value: "categories/korean-bj" },
            { name: "FC2 PPV", value: "categories/fc2ppv" },
            { name: "OnlyFans", value: "categories/onlyfans" },
            { name: "Asian Leak", value: "categories/asian-leak" },
            { name: "IP Camera", value: "categories/ipcam" },
            { name: "Toilet", value: "categories/toilet" },
            { name: "Voyeur JP", value: "categories/voyeur-jp" },
            { name: "China", value: "categories/china" },
            { name: "K-pop", value: "categories/kpop" },
            { name: "J-pop", value: "categories/jpop" },
            { name: "C-pop", value: "categories/cpop" }
        ],
        sort: [
            { name: "Latest", value: "default" },
            { name: "Views", value: "video_viewed" },
            { name: "Rating", value: "rating" },
            { name: "Duration", value: "duration" },
            { name: "Most Commented", value: "most_commented" },
            { name: "Most Favorited", value: "most_favourited" }
        ]
    });
}

// =============================================================================
// URL GENERATION
// =============================================================================

function getUrlList(slug, filtersJson) {
    var filters = JSON.parse(filtersJson || "{}");
    var page = filters.page || 1;
    var baseUrl = "https://kissjav.li";
    
    var path = slug || "latest-updates";
    if (filters.category) {
        path = filters.category;
    }
    
    if (path === 'home' || path === '') {
        path = "latest-updates";
    }
    
    if (path.indexOf("/") === 0) path = path.substring(1);
    if (path.substring(path.length - 1) === "/") path = path.substring(0, path.length - 1);
    
    var isPopular = (path.indexOf("most-popular") === 0);
    
    var url = baseUrl + "/" + path;
    if (isPopular) {
        if (page > 1) {
            url = baseUrl + "/most-popular/" + page + "/?sort_by=video_viewed";
        } else {
            url = baseUrl + "/most-popular/?sort_by=video_viewed";
        }
    } else {
        if (page > 1) {
            url += "/" + page + "/";
        } else {
            url += "/";
        }
    }
    
    if (filters.sort && filters.sort !== 'default' && !isPopular) {
        url += "?sort_by=" + filters.sort;
    }
    
    return url;
}

function getUrlSearch(keyword, filtersJson) {
    var filters = JSON.parse(filtersJson || "{}");
    var page = filters.page || 1;
    var baseUrl = "https://kissjav.li";
    if (page > 1) {
        return baseUrl + "/search/?q=" + encodeURIComponent(keyword) + "&from=" + page;
    }
    return baseUrl + "/search/?q=" + encodeURIComponent(keyword);
}

// slug = canonical URL or path, app calls with episode.id
function getUrlDetail(slug) {
    if (!slug) return "";
    if (slug.indexOf("http") === 0) return slug;
    if (slug.charAt(0) !== '/') slug = '/' + slug;
    return "https://kissjav.li" + slug;
}

function getUrlCategories() { return ""; }
function getUrlCountries() { return ""; }
function getUrlYears() { return ""; }

// =============================================================================
// UTILITIES
// =============================================================================

function base64Decode(str) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var out = '';
    str = String(str).replace(/[=]+$/, '');
    for (var i = 0, bc = 0, bs = 0, fn = 0; fn < str.length; fn++) {
        var char = str.charAt(fn);
        var idx = chars.indexOf(char);
        if (idx === -1) continue;
        bs = bc % 4 ? bs * 64 + idx : idx;
        if (bc++ % 4) {
            out += String.fromCharCode(255 & bs >> (-2 * bc & 6));
        }
    }
    return out;
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(html) {
    var items = [];
    
    var blocks = html.split(/class=["'][^"']*\bthumb\b[^"']*["']/i);
    
    for (var i = 1; i < blocks.length; i++) {
        var block = blocks[i];
        
        var linkMatch = block.match(/href=["']([^"']+\/video\/[^"']+)["']/i) ||
                        block.match(/href=["'](\/video\/[^"']+)["']/i);
        if (!linkMatch) continue;
        
        var link = linkMatch[1];
        var slug = link.replace("https://kissjav.li", "");
        
        var titleMatch = block.match(/title=["']([^"']+)["']/i) ||
                         block.match(/alt=["']([^"']+)["']/i);
        var title = titleMatch ? titleMatch[1] : "";
        title = title.replace(/<[^>]+>/g, '').trim();
        
        var thumbMatch = block.match(/data-original=["']([^"']+)["']/i) ||
                         block.match(/data-webp=["']([^"']+)["']/i) ||
                         block.match(/src=["']([^"']+)["']/i);
        var thumb = thumbMatch ? thumbMatch[1] : "";
        
        var durMatch = block.match(/class=["']time["'][^>]*>([^<]+)/i);
        var duration = durMatch ? durMatch[1].trim() : "";
        
        if (slug) {
            items.push({
                id: slug,
                title: title || slug.substring(slug.lastIndexOf("/") + 1),
                posterUrl: thumb,
                backdropUrl: thumb,
                year: 0,
                quality: "HD",
                episode_current: duration || "Full"
            });
        }
    }
    
    var currentPage = 1;
    var totalPages = 1;
    
    var cpMatch = html.match(/class=["'][^"']*page-link active[^"']*["'][^>]*>(\d+)/i) ||
                  html.match(/class=["'][^"']*active[^"']*["'][^>]*>(\d+)/i);
    if (cpMatch) {
        currentPage = parseInt(cpMatch[1], 10);
    }
    
    var pageRegex = /\/(\d+)\/?(?:["'?>]|$)/g;
    var match;
    while ((match = pageRegex.exec(html)) !== null) {
        var pageNum = parseInt(match[1], 10);
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
        var titleMatch = html.match(/<h1[^>]*class=["']title["'][^>]*>([\s\S]*?)<\/h1>/i) ||
                         html.match(/<title>([\s\S]*?)<\/title>/i);
        var title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : "";
        title = title.replace(/\s*-\s*KissJAV\s*$/gi, "").trim();
        
        var posterMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
        var posterUrl = posterMatch ? posterMatch[1] : "";
        
        var actressesArr = [];
        var actressRegex = /href=["']https?:\/\/kissjav\.li\/models\/([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
        var actMatch;
        while ((actMatch = actressRegex.exec(html)) !== null) {
            actressesArr.push(actMatch[2].replace(/<[^>]+>/g, '').trim());
        }
        
        var categoriesArr = [];
        var catRegex = /href=["']https?:\/\/kissjav\.li\/categories\/([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
        var cmMatch;
        while ((cmMatch = catRegex.exec(html)) !== null) {
            categoriesArr.push(cmMatch[2].replace(/<[^>]+>/g, '').trim());
        }
        
        var tagsArr = [];
        var tagRegex = /href=["']https?:\/\/kissjav\.li\/tags\/([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
        var tagMatch;
        while ((tagMatch = tagRegex.exec(html)) !== null) {
            tagsArr.push(tagMatch[2].replace(/<[^>]+>/g, '').trim());
        }
        
        var servers = [];
        
        var urlMatch = html.match(/video_url:\s*['"]([^'"]+)['"]/i);
        if (urlMatch) {
            var decodedUrl = base64Decode(urlMatch[1]);
            if (decodedUrl && decodedUrl.indexOf("http") === 0) {
                servers.push({
                    name: "Standard Server",
                    episodes: [{
                        id: decodedUrl,
                        name: "Stream",
                        slug: "stream"
                    }]
                });
            }
        }
        
        if (servers.length === 0) {
            var fileMatch = html.match(/"file"\s*:\s*"([^"]+)"/i) || 
                            html.match(/file\s*:\s*['"]([^'"]+)['"]/i);
            if (fileMatch) {
                servers.push({
                    name: "Backup Server",
                    episodes: [{
                        id: fileMatch[1],
                        name: "Stream",
                        slug: "stream"
                    }]
                });
            }
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
            casts: actressesArr.join(", ") || tagsArr.join(", "),
            director: "",
            country: "Japan",
            category: categoriesArr.join(", "),
            status: "Completed"
        });
    } catch (e) {
        return "null";
    }
}

function parseDetailResponse(html, fetchedUrl) {
    var isEmbed = true;
    if (fetchedUrl) {
        var lowerUrl = fetchedUrl.toLowerCase();
        if (lowerUrl.indexOf(".m3u8") !== -1 || lowerUrl.indexOf(".mp4") !== -1) {
            isEmbed = false;
        }
    }
    return JSON.stringify({
        url: fetchedUrl,
        isEmbed: isEmbed,
        headers: {
            "Referer": "https://kissjav.li/"
        }
    });
}

function parseEmbedResponse(html, url) {
    try {
        var fileMatch = html.match(/"file"\s*:\s*"([^"]+)"/i) || 
                        html.match(/file\s*:\s*['"]([^'"]+)['"]/i);
        if (fileMatch) {
            return JSON.stringify({
                url: fileMatch[1],
                isEmbed: false,
                headers: {
                    "Referer": url
                }
            });
        }

        var m3u8Match = html.match(/(https?:\/\/[^"'\s>]+\.m3u8[^"'\s>]*)/i);
        if (m3u8Match) {
            return JSON.stringify({
                url: m3u8Match[1],
                isEmbed: false,
                headers: {
                    "Referer": url
                }
            });
        }

        return JSON.stringify({ url: "", isEmbed: false, headers: {} });
    } catch (e) {
        return JSON.stringify({ url: "", isEmbed: false, headers: {} });
    }
}
