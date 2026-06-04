// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "nettruyen",
        "name": "NetTruyen",
        "version": "1.0.0",
        "baseUrl": "https://nettruyen.gg",
        "iconUrl": "https://nettruyen.gg/favicon.ico",
        "isEnabled": true,
        "type": "MANGA"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'tim-truyen', title: 'Truyện Mới Cập Nhật', type: 'Grid', path: 'tim-truyen' },
        { slug: 'hot', title: 'Truyện Hot', type: 'Horizontal', path: 'hot' },
        { slug: 'truyen-full', title: 'Truyện Full', type: 'Horizontal', path: 'truyen-full' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Mới cập nhật', slug: 'tim-truyen' },
        { name: 'Truyện Hot', slug: 'hot' },
        { name: 'Truyện Full (Đã hoàn thành)', slug: 'truyen-full' },
        { name: 'Action', slug: 'tim-truyen/action-95' },
        { name: 'Adventure', slug: 'tim-truyen/adventure' },
        { name: 'Chuyển Sinh', slug: 'tim-truyen/chuyen-sinh-2130' },
        { name: 'Comedy', slug: 'tim-truyen/comedy-99' },
        { name: 'Drama', slug: 'tim-truyen/drama-103' },
        { name: 'Fantasy', slug: 'tim-truyen/fantasy-105' },
        { name: 'Manga', slug: 'tim-truyen/manga-112' },
        { name: 'Manhua', slug: 'tim-truyen/manhua' },
        { name: 'Manhwa', slug: 'tim-truyen/manhwa-1140' },
        { name: 'Romance', slug: 'tim-truyen/romance-121' },
        { name: 'School Life', slug: 'tim-truyen/school-life' },
        { name: 'Shounen', slug: 'tim-truyen/shounen-127' },
        { name: 'Supernatural', slug: 'tim-truyen/supernatural' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [
            { name: 'Ngày cập nhật', value: '0' },
            { name: 'Truyện mới', value: '15' },
            { name: 'Top all', value: '10' },
            { name: 'Top tháng', value: '11' },
            { name: 'Top tuần', value: '12' },
            { name: 'Top ngày', value: '13' },
            { name: 'Theo dõi', value: '20' },
            { name: 'Bình luận', value: '25' },
            { name: 'Số chapter', value: '30' },
            { name: 'Top Follow', value: '19' }
        ],
        status: [
            { name: 'Tất cả', value: '-1' },
            { name: 'Đang tiến hành', value: '1' },
            { name: 'Đã hoàn thành', value: '2' }
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
        var sort = filters.sort || "";
        var status = filters.status || "";
        var baseUrl = "https://nettruyen.gg";

        var path = "";
        var activeSlug = filters.category || slug || "tim-truyen";

        if (activeSlug.indexOf("tim-truyen") === 0 || activeSlug.indexOf("hot") === 0 || activeSlug.indexOf("truyen-full") === 0) {
            path = "/" + activeSlug;
        } else {
            if (activeSlug === "hot") {
                path = "/hot";
            } else if (activeSlug === "truyen-full") {
                path = "/truyen-full";
            } else {
                path = "/tim-truyen/" + activeSlug;
            }
        }

        path = path.replace(/\/+/g, "/");

        var url = baseUrl + path;
        
        var params = [];
        if (page > 1) {
            params.push("page=" + page);
        }
        if (sort && sort !== "0") {
            params.push("sort=" + sort);
        }
        if (status && status !== "-1") {
            params.push("status=" + status);
        }
        
        if (params.length > 0) {
            url += "?" + params.join("&");
        }
        
        return url;
    } catch (e) {
        return "https://nettruyen.gg/tim-truyen";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        return "https://nettruyen.gg/tim-truyen?keyword=" + encodeURIComponent(keyword) + "&page=" + page;
    } catch (e) {
        return "https://nettruyen.gg/tim-truyen?keyword=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (!slug) return "";
    if (slug.indexOf("http") === 0) return slug;
    if (slug.indexOf("/") === 0) return "https://nettruyen.gg" + slug;
    return "https://nettruyen.gg/" + slug;
}

function getUrlCategories() {
    return "https://nettruyen.gg/tim-truyen";
}

function getUrlCountries() {
    return "";
}

function getUrlYears() {
    return "";
}

// =============================================================================
// UTILS
// =============================================================================

var PluginUtils = {
    cleanText: function (text) {
        if (!text) return "";
        return text.replace(/<[^>]*>/g, "")
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/\s+/g, " ")
            .trim();
    }
};

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(html) {
    try {
        var items = [];
        var foundSlugs = {};
        
        var itemRegex = /<div[^>]*class="item"[^>]*>([\s\S]*?)<\/figure>/gi;
        var match;
        
        while ((match = itemRegex.exec(html)) !== null) {
            var itemHtml = match[1];
            
            var hrefMatch = itemHtml.match(/<h3>\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
            if (!hrefMatch) continue;
            
            var href = hrefMatch[1];
            var title = PluginUtils.cleanText(hrefMatch[2]);
            
            var imgMatch = itemHtml.match(/<img[^>]*data-original="([^"]+)"/i) || 
                           itemHtml.match(/<img[^>]*data-retries="([^"]+)"/i) || 
                           itemHtml.match(/<img[^>]*src="([^"]+)"/i);
            var posterUrl = imgMatch ? imgMatch[1] : "";
            
            if (posterUrl && posterUrl.indexOf("http") !== 0) {
                posterUrl = "https://nettruyen.gg" + (posterUrl.indexOf("/") === 0 ? "" : "/") + posterUrl;
            }
            
            var chapMatch = itemHtml.match(/<li[^>]*class="chapter[^"]*"[^>]*>\s*<a[^>]*href="[^"]*"[^>]*>([\s\S]*?)<\/a>/i) ||
                            itemHtml.match(/<a[^>]*title="([^"]+)"[^>]*>/i);
            var latestChap = chapMatch ? PluginUtils.cleanText(chapMatch[1]) : "";
            
            var id = href.replace("https://nettruyen.gg/", "").replace(/^\//, "");
            
            if (id && !foundSlugs[id]) {
                items.push({
                    id: id,
                    title: title,
                    posterUrl: posterUrl,
                    backdropUrl: posterUrl,
                    episode_current: latestChap,
                    quality: "HD",
                    lang: "Tiếng Việt"
                });
                foundSlugs[id] = true;
            }
        }
        
        var currentPage = 1;
        var totalPages = 1;
        
        var pagerMatch = html.match(/<div[^>]*class="pagination-outter"[\s\S]*?<\/ul>/gi) ||
                         html.match(/<ul[^>]*class="pagination"[\s\S]*?<\/ul>/gi);
                         
        if (pagerMatch) {
            var pagerHtml = pagerMatch[0];
            
            var activeMatch = pagerHtml.match(/<li[^>]*class="[^"]*active[^"]*"[^>]*>[\s\S]*?(\d+)<\/span>/i) ||
                              pagerHtml.match(/<li[^>]*class="[^"]*active[^"]*"[^>]*>[\s\S]*?(\d+)<\/a>/i) ||
                              pagerHtml.match(/<span[^>]*class="[^"]*current[^"]*"[^>]*>(\d+)<\/span>/i);
            if (activeMatch) {
                currentPage = parseInt(activeMatch[1], 10);
            }
            
            var pageRegex = /[?&]page=(\d+)/gi;
            var m;
            while ((m = pageRegex.exec(pagerHtml)) !== null) {
                var pageNum = parseInt(m[1], 10);
                if (pageNum > totalPages) {
                    totalPages = pageNum;
                }
            }
        }
        
        return JSON.stringify({
            items: items,
            pagination: {
                currentPage: currentPage,
                totalPages: totalPages || 1,
                totalItems: items.length * totalPages,
                itemsPerPage: items.length || 24
            }
        });
    } catch (e) {
        return JSON.stringify({ items: [], pagination: { currentPage: 1, totalPages: 1 } });
    }
}

function parseSearchResponse(html) {
    return parseListResponse(html);
}

function parseMovieDetail(html) {
    try {
        var titleMatch = html.match(/<h1[^>]*class="title-detail"[^>]*>([\s\S]*?)<\/h1>/i) ||
                         html.match(/<title>([\s\S]*?)<\/title>/i);
        var title = titleMatch ? PluginUtils.cleanText(titleMatch[1]) : "Unknown";

        var descMatch = html.match(/<div[^>]*class="detail-content"[^>]*>([\s\S]*?)<\/div>/i);
        var description = descMatch ? PluginUtils.cleanText(descMatch[1]) : "";
        description = description.replace(/^Nội dung truyện[\s\S]*?NetTruyen\s*/i, "").trim();

        var poster = "";
        var posterMatch = html.match(/<div[^>]*class="col-image"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"/i) ||
                          html.match(/<meta property="og:image" content="([^"]+)"/i);
        if (posterMatch) poster = posterMatch[1];
        if (poster && poster.indexOf("http") !== 0) {
            poster = "https://nettruyen.gg" + (poster.indexOf("/") === 0 ? "" : "/") + poster;
        }

        var chapters = [];
        var chapterRegex = /<div[^>]*class="col-xs-5 chapter"[^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
        var cMatch;
        while ((cMatch = chapterRegex.exec(html)) !== null) {
            var cUrl = cMatch[1];
            if (cUrl.indexOf("http") !== 0) {
                cUrl = "https://nettruyen.gg" + (cUrl.indexOf("/") === 0 ? "" : "/") + cUrl;
            }
            var cTitle = PluginUtils.cleanText(cMatch[2]);
            var cSlug = cUrl.replace("https://nettruyen.gg/", "").replace(/\/$/, "");

            chapters.push({
                id: cUrl,
                name: cTitle,
                slug: cSlug
            });
        }
        chapters.reverse();

        var servers = [{
            name: "NetTruyen",
            episodes: chapters
        }];

        var author = "";
        var authorMatch = html.match(/<li[^>]*class="author[^"]*"[^>]*>([\s\S]*?)<\/li>/i);
        if (authorMatch) {
            var authorHtml = authorMatch[1];
            var valMatch = authorHtml.match(/<p[^>]*class="col-xs-8"[^>]*>([\s\S]*?)<\/p>/i);
            author = valMatch ? PluginUtils.cleanText(valMatch[1]) : PluginUtils.cleanText(authorHtml.replace(/Tác giả/i, ""));
        }

        var status = "Đang tiến hành";
        var statusMatch = html.match(/<li[^>]*class="status[^"]*"[^>]*>([\s\S]*?)<\/li>/i);
        if (statusMatch) {
            var statusHtml = statusMatch[1];
            var valMatch = statusHtml.match(/<p[^>]*class="col-xs-8"[^>]*>([\s\S]*?)<\/p>/i);
            status = valMatch ? PluginUtils.cleanText(valMatch[1]) : PluginUtils.cleanText(statusHtml.replace(/Tình trạng/i, ""));
        }

        var categories = [];
        var kindMatch = html.match(/<li[^>]*class="kind[^"]*"[^>]*>([\s\S]*?)<\/li>/i);
        if (kindMatch) {
            var kindHtml = kindMatch[1];
            var aRegex = /<a[^>]*>([^<]+)<\/a>/gi;
            var aMatch;
            while ((aMatch = aRegex.exec(kindHtml)) !== null) {
                categories.push(PluginUtils.cleanText(aMatch[1]));
            }
        }

        return JSON.stringify({
            id: "",
            title: title,
            posterUrl: poster,
            backdropUrl: poster,
            description: description,
            servers: servers,
            category: categories.join(", "),
            status: status,
            author: author,
            quality: "HD",
            lang: "Tiếng Việt"
        });

    } catch (e) {
        return "null";
    }
}

function parseDetailResponse(html) {
    try {
        var images = [];
        var readingDetailMatch = html.match(/<div[^>]*class="[^"]*reading-detail[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<div[^>]*class="container"/i) || 
                                 html.match(/<div[^>]*class="[^"]*reading-detail[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i) ||
                                 html.match(/<div[^>]*class="[^"]*reading-detail[^"]*"[^>]*>([\s\S]*?)$/i);
        
        var contentHtml = readingDetailMatch ? readingDetailMatch[1] : html;
        
        var imgRegex = /<img[^>]+class=['"]lozad['"][^>]*data-src=['"]([^'"]+)['"]/gi;
        var match;
        while ((match = imgRegex.exec(contentHtml)) !== null) {
            var url = match[1].replace(/&amp;/g, "&");
            if (url.indexOf("notice") === -1 && url.indexOf("/assets/images/") === -1) {
                images.push(url);
            }
        }
        
        if (images.length === 0) {
            var fallbackRegex = /<img[^>]+data-src=['"]([^'"]+)['"]/gi;
            while ((match = fallbackRegex.exec(contentHtml)) !== null) {
                var url = match[1].replace(/&amp;/g, "&");
                if (url.indexOf("notice") === -1 && url.indexOf("/assets/images/") === -1) {
                    images.push(url);
                }
            }
        }
        
        return JSON.stringify({
            images: images,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://nettruyen.gg/"
            }
        });
    } catch (e) {
        return "{}";
    }
}

function parseCategoriesResponse(html) {
    try {
        var categories = [];
        var genreRegex = /<a[^>]+href="https:\/\/nettruyen\.gg\/tim-truyen\/([^"\?#\/]+)"[^>]*>([^<]+)<\/a>/gi;
        var match;
        var seen = {};
        while ((match = genreRegex.exec(html)) !== null) {
            var slug = match[1].trim();
            var name = match[2].trim();
            if (slug && !seen[slug] && name && name !== 'Tất cả') {
                categories.push({
                    name: name,
                    slug: "tim-truyen/" + slug
                });
                seen[slug] = true;
            }
        }
        return JSON.stringify(categories);
    } catch (e) {
        return "[]";
    }
}

function parseCountriesResponse(html) {
    return "[]";
}

function parseYearsResponse(html) {
    return "[]";
}
