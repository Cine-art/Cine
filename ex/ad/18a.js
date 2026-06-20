// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "18jav",
        "name": "18JAV",
        "version": "1.0.0",
        "baseUrl": "https://18jav.tv",
        "iconUrl": "https://cdn.18jav.tv/assets/icon/favicon.ico",
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
        { slug: 'hot', title: 'Popular', type: 'Horizontal', path: 'hot' },
        { slug: 'chinese-subtitle', title: 'Chinese Subtitle', type: 'Horizontal', path: 'categories/chinese-subtitle' },
        { slug: 'uncensored', title: 'Uncensored', type: 'Horizontal', path: 'categories/uncensored' },
        { slug: 'taiwan-av', title: 'Taiwan AV', type: 'Grid', path: 'categories/taiwan-av' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Latest Updates', slug: 'latest-updates' },
        { name: 'Popular', slug: 'hot' },
        { name: 'Chinese Subtitle', slug: 'categories/chinese-subtitle' },
        { name: 'Uncensored', slug: 'categories/uncensored' },
        { name: 'Taiwan AV', slug: 'categories/taiwan-av' },
        { name: 'BDSM', slug: 'categories/bdsm' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        category: [
            { name: "Chinese Subtitle", value: "categories/chinese-subtitle" },
            { name: "Uncensored", value: "categories/uncensored" },
            { name: "Taiwan AV", value: "categories/taiwan-av" },
            { name: "General JAV", value: "categories/jav" },
            { name: "Uniform", value: "categories/uniform" },
            { name: "Roleplay", value: "categories/roleplay" },
            { name: "Pantyhose", value: "categories/pantyhose" },
            { name: "Sex Only", value: "categories/sex-only" },
            { name: "BDSM", value: "categories/bdsm" },
            { name: "Group Sex", value: "categories/groupsex" },
            { name: "Creampie", value: "tags/creampie" },
            { name: "Big Tits", value: "tags/big-tits" },
            { name: "Blowjob", value: "tags/blowjob" },
            { name: "Teacher", value: "tags/teacher" },
            { name: "Office Lady", value: "tags/ol" },
            { name: "Nurse", value: "tags/nurse" },
            { name: "Housewife", value: "tags/housewife" },
            { name: "Schoolgirl", value: "tags/school-uniform" }
        ],
        sort: [
            { name: "Latest", value: "release_at" }
        ]
    });
}

// =============================================================================
// URL GENERATION
// =============================================================================

function getUrlList(slug, filtersJson) {
    var filters = JSON.parse(filtersJson || "{}");
    var page = filters.page || 1;
    var baseUrl = "https://18jav.tv";
    
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
        url += "?mode=async&function=get_block&block_id=list_videos_common_videos_list&sort_by=release_at&from=" + page;
    }
    return url;
}

function getUrlSearch(keyword, filtersJson) {
    var filters = JSON.parse(filtersJson || "{}");
    var page = filters.page || 1;
    var baseUrl = "https://18jav.tv";
    if (page > 1) {
        return baseUrl + "/search/?q=" + encodeURIComponent(keyword) + "&mode=async&function=get_block&block_id=list_videos_common_videos_list&sort_by=release_at&from=" + page;
    }
    return baseUrl + "/search/?q=" + encodeURIComponent(keyword);
}

function getUrlDetail(slug) {
    if (!slug) return "";
    if (slug.indexOf("http") === 0) return slug;
    if (slug.charAt(0) !== '/') slug = '/' + slug;
    return "https://18jav.tv" + slug;
}

function getUrlCategories() { return ""; }
function getUrlCountries() { return ""; }
function getUrlYears() { return ""; }

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(html) {
    var items = [];
    
    var blocks = html.split(/class=["'][^"']*\bvideo-img-box\b[^"']*["']/i);
    if (blocks.length <= 1) {
        blocks = html.split(/class=["'][^"']*\bitem\b[^"']*["']/i);
    }
    
    for (var i = 1; i < blocks.length; i++) {
        var block = blocks[i];
        
        var linkMatch = block.match(/href=["']([^"']+\/videos\/[^"']+)["']/i) ||
                        block.match(/href=["'](\/videos\/[^"']+)["']/i);
        if (!linkMatch) continue;
        
        var link = linkMatch[1];
        var slug = link.replace("https://18jav.tv", "");
        
        var titleMatch = block.match(/<h6[^>]*class=["']title["'][^>]*><a[^>]*>([\s\S]*?)<\/a><\/h6>/i) ||
                         block.match(/title=["']([^"']+)["']/i) ||
                         block.match(/alt=["']([^"']+)["']/i);
        var title = titleMatch ? titleMatch[1] : "";
        title = title.replace(/<[^>]+>/g, '').trim();
        
        var thumbMatch = block.match(/data-src=["']([^"']+)["']/i) ||
                         block.match(/src=["']([^"']+)["']/i);
        var thumb = thumbMatch ? thumbMatch[1] : "";
        if (thumb && thumb.indexOf("placeholder") !== -1) {
            var altThumb = block.match(/data-src=["'](https?:\/\/[^"']+)["']/i);
            if (altThumb) thumb = altThumb[1];
        }
        
        var durMatch = block.match(/class=["']label["'][^>]*>([^<]+)/i);
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
    
    var pageRegex = /from:(\d+)/g;
    var match;
    while ((match = pageRegex.exec(html)) !== null) {
        var pageNum = parseInt(match[1], 10);
        if (pageNum > totalPages) {
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
        var titleMatch = html.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i) ||
                         html.match(/<title>([\s\S]*?)<\/title>/i);
        var title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : "";
        title = title.replace(/\s*-\s*18JAV\.tv\s*$/gi, "").trim();
        
        var posterMatch = html.match(/poster=["']([^"']+)["']/i) ||
                          html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
        var posterUrl = posterMatch ? posterMatch[1] : "";
        
        var actressesArr = [];
        var actressRegex = /href=["']https?:\/\/18jav\.tv\/models\/([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
        var actMatch;
        while ((actMatch = actressRegex.exec(html)) !== null) {
            actressesArr.push(actMatch[2].replace(/<[^>]+>/g, '').trim());
        }
        
        var categoriesArr = [];
        var catRegex = /href=["']https?:\/\/18jav\.tv\/categories\/([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
        var cmMatch;
        while ((cmMatch = catRegex.exec(html)) !== null) {
            categoriesArr.push(cmMatch[2].replace(/<[^>]+>/g, '').trim());
        }
        
        var tagsArr = [];
        var tagRegex = /href=["']https?:\/\/18jav\.tv\/tags\/([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
        var tagMatch;
        while ((tagMatch = tagRegex.exec(html)) !== null) {
            tagsArr.push(tagMatch[2].replace(/<[^>]+>/g, '').trim());
        }
        
        var servers = [];
        var hlsMatch = html.match(/var\s+hlsUrl\s*=\s*["']([^"']+)["']/i) ||
                       html.match(/var\s+hlsUrl\s*=\s*['"]([^']+)['"]/i);
        if (hlsMatch) {
            servers.push({
                name: "Standard Server",
                episodes: [{
                    id: hlsMatch[1],
                    name: "Stream",
                    slug: "stream"
                }]
            });
        }
        
        if (servers.length === 0) {
            var m3u8Regex = /["'](https?:\/\/[^"']+\.m3u8[^"']*)["']/gi;
            var m3Match;
            var srvCount = 1;
            while ((m3Match = m3u8Regex.exec(html)) !== null) {
                servers.push({
                    name: "Backup Server " + srvCount++,
                    episodes: [{
                        id: m3Match[1],
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
            "Referer": "https://18jav.tv/"
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
