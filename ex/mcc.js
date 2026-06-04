// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "motchill",
        "name": "MotChill",
        "version": "1.0.0",
        "baseUrl": "https://motchilll.xyz",
        "iconUrl": "https://motchilll.xyz/images/favicon.png",
        "isEnabled": true,
        "type": "MOVIE",
        "layoutType": "VERTICAL"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'danh-sach/phim-moi', title: 'Phim Mới Cập Nhật', type: 'Grid', path: 'danh-sach' },
        { slug: 'danh-sach/phim-le', title: 'Phim Lẻ', type: 'Horizontal', path: 'danh-sach' },
        { slug: 'danh-sach/phim-bo', title: 'Phim Bộ', type: 'Horizontal', path: 'danh-sach' },
        { slug: 'danh-sach/phim-chieu-rap', title: 'Phim Chiếu Rạp', type: 'Horizontal', path: 'danh-sach' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Phim Mới', slug: 'danh-sach/phim-moi' },
        { name: 'Phim Lẻ', slug: 'danh-sach/phim-le' },
        { name: 'Phim Bộ', slug: 'danh-sach/phim-bo' },
        { name: 'Phim Chiếu Rạp', slug: 'danh-sach/phim-chieu-rap' },
        { name: 'Phim Hot', slug: 'danh-sach/phim-de-cu' },
        { name: 'Hành Động', slug: 'the-loai/phim-hanh-dong' },
        { name: 'Cổ Trang', slug: 'the-loai/phim-co-trang' },
        { name: 'Tình Cảm', slug: 'the-loai/phim-tinh-cam' },
        { name: 'Hài Hước', slug: 'the-loai/phim-hai-huoc' },
        { name: 'Ma - Kinh Dị', slug: 'the-loai/phim-ma-kinh-di' },
        { name: 'Hoạt Hình', slug: 'the-loai/phim-hoat-hinh' },
        { name: 'Hàn Quốc', slug: 'quoc-gia/phim-han-quoc' },
        { name: 'Trung Quốc', slug: 'quoc-gia/phim-trung-quoc' },
        { name: 'Âu Mỹ', slug: 'quoc-gia/phim-au-my' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [],
        category: [
            { name: 'Hành Động', value: 'the-loai/phim-hanh-dong' },
            { name: 'Ma - Kinh Dị', value: 'the-loai/phim-ma-kinh-di' },
            { name: 'Hài Hước', value: 'the-loai/phim-hai-huoc' },
            { name: 'Hoạt Hình', value: 'the-loai/phim-hoat-hinh' },
            { name: 'Cổ Trang', value: 'the-loai/phim-co-trang' },
            { name: 'Tình Cảm', value: 'the-loai/phim-tinh-cam' }
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
        var baseUrl = "https://motchilll.xyz";

        var activeSlug = filters.category || slug || "danh-sach/phim-moi";
        
        // Ensure slug suffix is correctly formatted with .html
        var path = activeSlug;
        if (path.indexOf('.html') === -1) {
            path += ".html";
        }
        
        if (path.indexOf('/') !== 0) {
            path = "/" + path;
        }

        var url = baseUrl + path;
        if (page > 1) {
            url += "?page=" + page;
        }
        
        return url;
    } catch (e) {
        return "https://motchilll.xyz/danh-sach/phim-moi.html";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        return "https://motchilll.xyz/tim-kiem/" + encodeURIComponent(keyword).replace(/%20/g, '+') + ".html?page=" + page;
    } catch (e) {
        return "https://motchilll.xyz/tim-kiem/" + encodeURIComponent(keyword).replace(/%20/g, '+') + ".html";
    }
}

function getUrlDetail(slug) {
    if (!slug) return "";
    if (slug.indexOf("http") === 0) return slug;
    
    var path = slug;
    if (path.indexOf("phim/") === -1 && path.indexOf("xem-phim/") === -1) {
        path = "phim/" + path;
    }
    if (path.indexOf(".html") === -1) {
        path += ".html";
    }
    
    return "https://motchilll.xyz/" + path.replace(/^\//, "");
}

function getUrlCategories() {
    return "https://motchilll.xyz";
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
        
        // 1. Parse div.film-item (standard grid items)
        var itemRegex = /<div[^>]*class="film-item"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;
        var match;
        while ((match = itemRegex.exec(html)) !== null) {
            var itemHtml = match[1];
            
            var hrefMatch = itemHtml.match(/href="https:\/\/motchilll\.xyz\/phim\/([^"]+)"/i) ||
                            itemHtml.match(/href="\/phim\/([^"]+)"/i) ||
                            itemHtml.match(/href="([^"]+)"/i);
            if (!hrefMatch) continue;
            
            var slug = hrefMatch[1].replace("https://motchilll.xyz/", "").replace(/^\//, "");
            
            var title = "";
            var titleMatch = itemHtml.match(/<p class="vie-name">([\s\S]*?)<\/p>/i) ||
                             itemHtml.match(/title="([^"]+)"/i);
            if (titleMatch) title = PluginUtils.cleanText(titleMatch[1]);
            
            var posterUrl = "";
            var imgMatch = itemHtml.match(/data-src="([^"]+)"/i) ||
                           itemHtml.match(/src="([^"]+)"/i);
            if (imgMatch) posterUrl = imgMatch[1];
            
            var latestChap = "";
            var chapMatch = itemHtml.match(/class="time">([^<]+)<\/span>/i) ||
                            itemHtml.match(/class="time">([^<]+)<\/div>/i);
            if (chapMatch) latestChap = PluginUtils.cleanText(chapMatch[1]);
            
            if (slug && !foundSlugs[slug]) {
                items.push({
                    id: slug,
                    title: title || "Phim không tiêu đề",
                    posterUrl: posterUrl,
                    backdropUrl: posterUrl,
                    episode_current: latestChap || "Full",
                    quality: "HD",
                    lang: "Vietsub"
                });
                foundSlugs[slug] = true;
            }
        }
        
        // 2. Parse li.film-item-sidebar (sidebar list items) as fallback if no film-items found
        if (items.length === 0) {
            var sidebarRegex = /<li[^>]*class="film-item-sidebar"[^>]*>([\s\S]*?)<\/li>/gi;
            while ((match = sidebarRegex.exec(html)) !== null) {
                var itemHtml = match[1];
                
                var hrefMatch = itemHtml.match(/href="https:\/\/motchilll\.xyz\/phim\/([^"]+)"/i) ||
                                itemHtml.match(/href="\/phim\/([^"]+)"/i) ||
                                itemHtml.match(/href="([^"]+)"/i);
                if (!hrefMatch) continue;
                
                var slug = hrefMatch[1].replace("https://motchilll.xyz/", "").replace(/^\//, "");
                
                var title = "";
                var titleMatch = itemHtml.match(/<p class="vie-name">([\s\S]*?)<\/p>/i) ||
                                 itemHtml.match(/title="([^"]+)"/i);
                if (titleMatch) title = PluginUtils.cleanText(titleMatch[1]);
                
                var posterUrl = "";
                var imgMatch = itemHtml.match(/data-src="([^"]+)"/i) ||
                               itemHtml.match(/src="([^"]+)"/i);
                if (imgMatch) posterUrl = imgMatch[1];
                
                if (slug && !foundSlugs[slug]) {
                    items.push({
                        id: slug,
                        title: title || "Phim không tiêu đề",
                        posterUrl: posterUrl,
                        backdropUrl: posterUrl,
                        episode_current: "Full",
                        quality: "HD",
                        lang: "Vietsub"
                    });
                    foundSlugs[slug] = true;
                }
            }
        }

        // Pagination
        var currentPage = 1;
        var totalPages = 1;
        
        var pagerMatch = html.match(/<div[^>]*class="page"[\s\S]*?<\/div>/gi) ||
                         html.match(/<div[^>]*class="pagination"[\s\S]*?<\/div>/gi);
                         
        if (pagerMatch) {
            var pagerHtml = pagerMatch[0];
            
            var activeMatch = pagerHtml.match(/class="currentpage"[^>]*>(\d+)<\/a>/i) ||
                              pagerHtml.match(/class="active"[^>]*>(\d+)<\/a>/i);
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
                itemsPerPage: items.length || 20
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
        var titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        var title = titleMatch ? PluginUtils.cleanText(titleMatch[1]) : "Unknown";

        var descMatch = html.match(/<div[^>]*class="[^"]*film-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                        html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i) ||
                        html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]+)"/i);
        var description = descMatch ? PluginUtils.cleanText(descMatch[1]) : "";

        var poster = "";
        var posterMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) ||
                          html.match(/<img[^>]+itemprop="image"[^>]+data-src="([^"]+)"/i);
        if (posterMatch) poster = posterMatch[1];
        if (poster && poster.indexOf("http") !== 0) {
            poster = "https://motchilll.xyz" + (poster.indexOf("/") === 0 ? "" : "/") + poster;
        }

        var watchMatch = html.match(/<a[^>]+class="btn btn-danger"[^>]+href="([^"]+)"/i) ||
                         html.match(/href="([^"]*xem-phim[^"]*)"/i);
        var watchUrl = watchMatch ? watchMatch[1] : "";
        if (watchUrl && watchUrl.indexOf("http") !== 0) {
            watchUrl = "https://motchilll.xyz" + (watchUrl.indexOf("/") === 0 ? "" : "/") + watchUrl;
        }

        // Determine episodes number
        var durationText = "";
        var durationMatch = html.match(/<meta property="video:duration" content="([^"]+)"/i) ||
                            html.match(/class="time">([^<]+)<\/span>/i);
        if (durationMatch) {
            durationText = PluginUtils.cleanText(durationMatch[1]);
        }

        var totalEpisodes = 1;
        var isSeries = false;

        if (durationText.indexOf("Tập") >= 0 || durationText.indexOf("tập") >= 0) {
            isSeries = true;
            var splitMatch = durationText.match(/(\d+)\/(\d+)/);
            if (splitMatch) {
                totalEpisodes = parseInt(splitMatch[1], 10) || 1;
            } else {
                var singleMatch = durationText.match(/(\d+)/);
                if (singleMatch) {
                    totalEpisodes = parseInt(singleMatch[1], 10) || 1;
                }
            }
        }

        var episodes = [];
        if (watchUrl) {
            episodes.push({
                id: watchUrl,
                name: isSeries ? "Tập 01" : "Full",
                slug: "1"
            });
            
            // If TV series, append subsequent episodes with query parameters
            if (isSeries && totalEpisodes > 1) {
                for (var i = 2; i <= totalEpisodes; i++) {
                    var padNum = i < 10 ? "0" + i : i;
                    episodes.push({
                        id: watchUrl + "?ep=" + i,
                        name: "Tập " + padNum,
                        slug: String(i)
                    });
                }
            }
        } else {
            // Fallback if watch URL not found
            episodes.push({
                id: "",
                name: "Trailer/Unknown",
                slug: "trailer"
            });
        }

        var servers = [{
            name: "Server Play",
            episodes: episodes
        }];

        // Categories
        var categories = [];
        var kindRegex = /<li>\s*<label>Thể loại:<\/label>\s*([\s\S]*?)<\/li>/i;
        var kindMatch = html.match(kindRegex);
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
            status: durationText || "HD",
            quality: "HD",
            lang: "Vietsub"
        });

    } catch (e) {
        return "null";
    }
}

function parseDetailResponse(html, apiUrl) {
    try {
        var fallbackUrl = apiUrl || "";
        var requestedEp = 1;
        
        // Parse request URL to see if it's a TV series query (e.g. ?ep=3)
        var epMatch = fallbackUrl.match(/[?&]ep=(\d+)/);
        if (epMatch) {
            requestedEp = parseInt(epMatch[1], 10) || 1;
        }

        var playerUrl = fallbackUrl;

        // If requested episode is > 1, resolve its direct watch URL from the Episode 1 page
        if (requestedEp > 1) {
            var epStr = String(requestedEp);
            var epStrPad = epStr.length < 2 ? "0" + epStr : epStr;
            
            // Search inside `<div class="list_episodes show-list-1">`
            var pattern = new RegExp('href="([^"]+)"[^>]*>\\s*(?:0?' + epStr + '|' + epStrPad + ')\\s*<\\/a>', 'i');
            var match = html.match(pattern);
            if (match) {
                playerUrl = match[1];
                if (playerUrl.indexOf("http") !== 0) {
                    playerUrl = "https://motchilll.xyz" + (playerUrl.indexOf("/") === 0 ? "" : "/") + playerUrl;
                }
            }
        }

        // Return the resolved watch page URL with headers and Custom-Js to play in the webview
        return JSON.stringify({
            url: playerUrl,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Referer": "https://motchilll.xyz/",
                "Custom-Js": "(function() { var s = document.createElement('style'); s.textContent = '#header, #footer, .header, .footer, .sidebar, .sidebar-content, .comment-box, .film-note, .breadcrumb, div[id^=\"ads-\"], div[id*=\"banner\"], div[class*=\"ads-top\"], div[class*=\"ads-bottom\"], .pop-ads { display:none !important; }'; document.head.appendChild(s); })();"
            },
            subtitles: []
        });
    } catch (e) {
        return JSON.stringify({ url: apiUrl, headers: {}, subtitles: [] });
    }
}

function parseCategoriesResponse(html) {
    try {
        var categories = [];
        var genreRegex = /href="https:\/\/motchilll\.xyz\/the-loai\/([^"]+)\.html"[^>]*>([^<]+)<\/a>/gi;
        var match;
        var seen = {};
        while ((match = genreRegex.exec(html)) !== null) {
            var slug = match[1].trim();
            var name = match[2].trim();
            if (slug && !seen[slug]) {
                categories.push({
                    name: name,
                    slug: "the-loai/" + slug
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
