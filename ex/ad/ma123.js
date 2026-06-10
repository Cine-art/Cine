// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "missav123",
        "name": "MissAV 123",
        "version": "1.0.1",
        "baseUrl": "https://missav123.com/dm230",
        "referrer": "https://missav123.com/",
        "iconUrl": "https://raw.githubusercontent.com/youngbi/repo/main/plugins/missav.ico",
        "isEnabled": true,
        "isAdult": true,
        "type": "MOVIE",
        "layoutType": "HORIZONTAL",
        "subtitleCat": true
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'vi/today-hot', title: 'Hot Hôm Nay', type: 'Horizontal', path: '' },
        { slug: 'vi/weekly-hot', title: 'Hot Trong Tuần', type: 'Horizontal', path: '' },
        { slug: 'vi/monthly-hot', title: 'Hot Trong Tháng', type: 'Horizontal', path: '' },
        { slug: 'vi/uncensored-leak', title: 'Không Che (Rò Rỉ)', type: 'Horizontal', path: '' },
        { slug: 'vi/release', title: 'Mới Cập Nhật', type: 'Grid', path: '' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Mới cập nhật', slug: 'vi/new' },
        { name: 'Nữ diễn viên', slug: 'vi/actresses' },
        { name: 'Thể loại', slug: 'vi/genres' },
        { name: 'Không che', slug: 'vi/uncensored-leak' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [
            { name: 'Mới nhất', value: 'new' },
            { name: 'Xem nhiều', value: 'views' },
            { name: 'Hôm nay', value: 'today_views' },
            { name: 'Tuần này', value: 'weekly_views' },
            { name: 'Tháng này', value: 'monthly_views' }
        ],
        category: [
            { name: "Tất cả thể loại", value: "vi/genres" },
            { name: "Mới cập nhật", value: "vi/new" },
            { name: "Không che (Rò rỉ)", value: "vi/uncensored-leak" },
            { name: "Nữ diễn viên", value: "vi/actresses" },
            { name: "BXH Diễn viên", value: "vi/actresses/ranking" }
        ]
    });
}

// =============================================================================
// URL GENERATION
// =============================================================================

/**
 * Normalizes movie and list slugs to avoid repeating paths (e.g. /dm230).
 */
function cleanSlug(slug) {
    if (!slug) return "";
    var s = slug.toString().replace(/^https?:\/\/[^\/]+/, "");
    
    // Strip dynamic proxy directories
    s = s.replace(/^\/dm\d+/i, "");
    
    if (s.indexOf("/") !== 0) s = "/" + s;
    s = s.replace(/\/+/g, "/");
    
    // Auto-prepend /vi for standard paths
    if (s.indexOf("/vi/") !== 0 && s !== "/vi") {
        s = "/vi" + s;
    }
    return s;
}

function getUrlList(slug, filtersJson) {
    var filters = JSON.parse(filtersJson || "{}");
    var page = filters.page || 1;
    var baseUrl = "https://missav123.com/dm230";
    var path = cleanSlug(slug || "vi/new");
    var url = baseUrl + path + "?page=" + page;
    
    if (filters.sort && filters.sort !== 'new') {
        url += "&sort=" + (filters.sort === 'hot' ? 'views' : filters.sort);
    }
    return url;
}

function getUrlSearch(keyword, filtersJson) {
    var filters = JSON.parse(filtersJson || "{}");
    var page = filters.page || 1;
    return "https://missav123.com/dm230/vi/search/" + encodeURIComponent(keyword) + "?page=" + page;
}

function getUrlDetail(slug) {
    if (slug && slug.indexOf("http") === 0) return slug;
    return "https://missav123.com/dm230" + cleanSlug(slug);
}

function getUrlCategories() { return "https://missav123.com/dm230/vi/genres"; }
function getUrlCountries() { return ""; }
function getUrlYears() { return ""; }

// =============================================================================
// PARSERS & UTILITIES
// =============================================================================

var PluginUtils = {
    normalizeHtml: function (html) {
        if (!html) return "";
        
        var prefix = "";
        // Match prefix class correctly even if other classes precede it
        var prefixMatch = html.match(/class="[^"]*?\b([a-zA-Z0-9_]+)-(?:thumbnail|relative|group)/i);
        if (prefixMatch) {
            prefix = prefixMatch[1] + "-";
        }
        
        return html.replace(/class="([^"]*)"/g, function (fullMatch, classValue) {
            var normalized = classValue;
            if (prefix) {
                normalized = normalized.split(prefix).join("");
            }
            normalized = normalized.replace(/missav_media-/g, '').replace(/missav123_com-/g, '');
            return 'class="' + normalized + '"';
        });
    },
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
    },
    getMeta: function (html, property) {
        var match = html.match(new RegExp('property="' + property + '"\\s+content="([^"]+)"', 'i'));
        return match ? match[1] : "";
    },
    extractPreviewUrl: function (itemHtml) {
        var previewMatch = itemHtml.match(/<video[^>]+data-src="([^"]+)"/);
        var url = previewMatch ? previewMatch[1] : "";
        
        if (url && url.length === 36 && url.match(/^[0-9a-f-]{36}$/i)) {
            return "https://surrit.com/" + url + "/preview.mp4";
        }
        
        if (!url || url === "") {
            var uuidMatch = itemHtml.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
            if (uuidMatch) {
                return "https://surrit.com/" + uuidMatch[0] + "/preview.mp4";
            }
        }
        
        if (url && url.indexOf('//') === 0) {
            return "https:" + url;
        }
        
        return url;
    }
};

function parseListResponse(html) {
    html = PluginUtils.normalizeHtml(html);
    var movies = [];

    var isActressesPage = (html.match(/href="[^"]*\/actresses\/[^"]+"/g) || []).length > 5;
    var isAllGenresPage = !isActressesPage && html.indexOf('class="text-nord13"') !== -1 && html.indexOf(':đếm video') !== -1;

    if (isActressesPage) {
        var gridMatch = html.match(/<ul[^>]*class="[^"]*grid-cols-2[^"]*"[^>]*>([\s\S]*?)<\/ul>/);
        var searchScope = gridMatch ? gridMatch[1] : html;
        var liRegex = /<li[\s\S]*?<\/li>/gi;
        var match;
        var seen = {};

        while ((match = liRegex.exec(searchScope)) !== null) {
            var itemHtml = match[0];
            var urlMatch = itemHtml.match(/href="([^"]*\/actresses\/[^"]+)"/);
            if (!urlMatch) continue;

            var url = urlMatch[1];
            var nameMatch = itemHtml.match(/<h4[^>]*>([\s\S]*?)<\/h4>/);
            var nameRaw = nameMatch ? nameMatch[1] : "";
            if (!nameRaw) {
                var altMatch = itemHtml.match(/<img[^>]+alt="([^"]+)"/);
                if (altMatch) nameRaw = altMatch[1];
            }

            var name = PluginUtils.cleanText(nameRaw);
            if (!name || name.indexOf(':đếm') !== -1) continue;

            var imgMatch = itemHtml.match(/<img[^>]+src="([^"]+)"/);
            var img = imgMatch ? imgMatch[1] : "";

            var slug = cleanSlug(url);
            if (!seen[slug]) {
                seen[slug] = true;
                movies.push({
                    id: slug,
                    title: name,
                    posterUrl: img,
                    backdropUrl: img,
                    description: "Nữ diễn viên",
                    year: 0,
                    quality: "ACTRESS",
                    episode_current: "",
                    lang: ""
                });
            }
        }
    } else if (isAllGenresPage) {
        var genreRegex = /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
        var seen = {};
        var match;

        while ((match = genreRegex.exec(html)) !== null) {
            var url = match[1];
            var name = PluginUtils.cleanText(match[2]);
            if (url.indexOf('/genres/') !== -1 && name.indexOf(':đếm video') === -1) {
                var slug = cleanSlug(url);
                if (!seen[slug]) {
                    seen[slug] = true;
                    movies.push({
                        id: slug,
                        title: name,
                        posterUrl: "",
                        backdropUrl: "",
                        description: "Thể loại",
                        year: 0,
                        quality: "CAT",
                        episode_current: "",
                        lang: ""
                    });
                }
            }
        }
    }

    if (movies.length === 0) {
        var parts = html.split('thumbnail group');
        if (parts.length <= 1) parts = html.split('class="thumbnail');

        for (var i = 1; i < parts.length; i++) {
            var itemHtml = parts[i];
            var linkMatch = itemHtml.match(/href="([^"]+)"/);
            if (!linkMatch) continue;

            var slug = cleanSlug(linkMatch[1]);
            if (slug.includes("actresses") || slug.includes("genres") || slug === "/" || slug === "#") continue;

            var codeMatch = itemHtml.match(/class="[^"]*text-nord13[^"]*"[^>]*>([\s\S]*?)<\/a>/);
            var code = codeMatch ? PluginUtils.cleanText(codeMatch[1]) : "";
            if (!code && slug) {
                var slugParts = slug.split("/");
                code = slugParts[slugParts.length - 1];
            }

            // Robust candidate selection for Movie Title
            var titleCandidates = [];
            var imgFullMatch = itemHtml.match(/<img[^>]+(?:alt|title)="([^"]+)"/i);
            if (imgFullMatch) titleCandidates.push(PluginUtils.cleanText(imgFullMatch[1]));

            var otherTitleRegex = /title="([^"]+)"/gi;
            var tMatch;
            while ((tMatch = otherTitleRegex.exec(itemHtml)) !== null) {
                var val = PluginUtils.cleanText(tMatch[1]);
                if (val.toUpperCase() !== code.toUpperCase()) {
                    titleCandidates.push(val);
                }
            }

            var bestTitle = "";
            for (var c = 0; c < titleCandidates.length; c++) {
                if (titleCandidates[c].length > bestTitle.length) {
                    bestTitle = titleCandidates[c];
                }
            }

            var cleanTitle = bestTitle || code;
            if (code && cleanTitle.toUpperCase().indexOf(code.toUpperCase()) === 0) {
                var stripped = cleanTitle.substring(code.length).trim();
                if (stripped.indexOf("-") === 0 || stripped.indexOf(" ") === 0) {
                    stripped = stripped.substring(1).trim();
                }
                if (stripped.length > 3) {
                    cleanTitle = stripped;
                }
            }
            if (!cleanTitle) cleanTitle = code || "No Title";

            // Properly anchor data-src/src search to <img tags to avoid video elements
            var thumbMatch = itemHtml.match(/<img[\s\S]*?data-src="([^"]+)"/) ||
                             itemHtml.match(/<img[\s\S]*?src="([^"]+)"/);
            var thumb = thumbMatch ? thumbMatch[1] : "";
            if (thumb && thumb.indexOf("cover-t.jpg") !== -1) {
                thumb = thumb.replace("/cover-t.jpg", "/cover.jpg");
            }

            var durationMatch = itemHtml.match(/<span[^>]*>\s*(\d+):(\d+):(\d+)\s*<\/span>/);
            var duration = durationMatch ? durationMatch[1] + ":" + durationMatch[2] + ":" + durationMatch[3] : "";

            var isUncensored = itemHtml.indexOf("Không kiểm duyệt") !== -1 || itemHtml.indexOf("Uncensored") !== -1;
            var previewUrl = PluginUtils.extractPreviewUrl(itemHtml);

            movies.push({
                id: slug,
                title: cleanTitle,
                posterUrl: thumb,
                backdropUrl: thumb,
                description: duration,
                year: 0,
                quality: isUncensored ? "K.K.Duyệt" : "HD",
                episode_current: isUncensored ? "K.K.Duyệt" : "Full",
                lang: code,
                previewUrl: previewUrl
            });
        }
    }

    var currentPage = 1;
    var totalPages = 1;
    var currentMatch = html.match(/class="[^"]*(?:bg-nord8|active|current)[^"]*"[^>]*>\s*(\d+)\s*<\/span>/i) ||
                       html.match(/class="[^"]*(?:bg-nord8|active|current)[^"]*"[^>]*>\s*(\d+)\s*<\/a>/i);
    if (currentMatch) currentPage = parseInt(currentMatch[1]);

    var pageLinks = html.match(/page=(\d+)/g);
    if (pageLinks) {
        for (var j = 0; j < pageLinks.length; j++) {
            var p = parseInt(pageLinks[j].match(/\d+/)[0]);
            if (p > totalPages) totalPages = p;
        }
    }

    return JSON.stringify({
        items: movies,
        pagination: {
            currentPage: currentPage,
            totalPages: totalPages || 1,
            totalItems: movies.length,
            itemsPerPage: 20
        }
    });
}

function parseSearchResponse(html) {
    return parseListResponse(html);
}

function parseMovieDetail(html, pageUrl) {
    html = PluginUtils.normalizeHtml(html);
    try {
        var getField = function (labelKey) {
            var match = html.match(new RegExp("<span>" + labelKey + ":<\\/span>([\\s\\S]*?)<\\/div>", "i"));
            if (!match) return "";
            var content = match[1];
            var linkMatch = content.match(/<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/i);
            if (linkMatch) {
                return "[" + PluginUtils.cleanText(linkMatch[2]) + "](" + cleanSlug(linkMatch[1]) + ")";
            }
            return PluginUtils.cleanText(content.replace(/<[^>]+>/g, ""));
        };

        var getMultiField = function (labelKey) {
            var matchStart = html.match(new RegExp("<span>" + labelKey + ":<\\/span>", "i"));
            if (!matchStart) return "";
            var searchArea = html.substring(matchStart.index);
            var divEnd = searchArea.indexOf("</div>");
            var content = searchArea.substring(0, divEnd === -1 ? searchArea.length : divEnd);
            var items = [];
            var linkRegex = /<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
            var linkMatch;
            while ((linkMatch = linkRegex.exec(content)) !== null) {
                items.push("[" + PluginUtils.cleanText(linkMatch[2]) + "](" + cleanSlug(linkMatch[1]) + ")");
            }
            return items.join(", ");
        };

        var code = getField("Mã số") || getField("Code");
        var releaseDate = getField("Ngày phát hành") || getField("Release date");
        var studio = getField("nhà sản xuất") || getField("Maker");
        var director = getField("Giám đốc") || getField("Director");
        var label = getField("Nhãn") || getField("Label");
        var casts = getMultiField("Nữ diễn viên") || getMultiField("Actresses");
        var genres = getMultiField("thể loại") || getMultiField("Genre") || getMultiField("Genres");

        var title = PluginUtils.getMeta(html, "og:title");
        var thumb = PluginUtils.getMeta(html, "og:image");
        var desc = PluginUtils.getMeta(html, "og:description");

        var previewMatch = html.match(/<video[^>]+data-src="([^"]+)"/) || html.match(/video_url:\s*'([^']+)'/);
        var previewUrl = previewMatch ? previewMatch[1] : "";

        var uuid = "";
        var surritMatch = html.match(/surrit\.com\/([0-9a-f-]{36})/i) ||
                          html.match(/sixyik\.com\/([0-9a-f-]{36})/i) ||
                          html.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
        if (surritMatch) uuid = surritMatch[1] || surritMatch[0];

        var streamUrl = uuid ? "https://surrit.com/" + uuid + "/playlist.m3u8" : "";
        var servers = [];
        if (streamUrl) {
            servers.push({
                name: "Stream",
                episodes: [{ id: pageUrl || streamUrl, name: "Full", slug: "full" }]
            });
        }

        var year = releaseDate ? parseInt(releaseDate.substring(0, 4)) : 0;

        return JSON.stringify({
            id: code || "",
            title: PluginUtils.cleanText(title),
            posterUrl: thumb,
            backdropUrl: thumb,
            description: PluginUtils.cleanText(desc),
            servers: servers,
            quality: "HD",
            lang: "Vietsub",
            year: year,
            casts: casts,
            director: director,
            category: genres,
            status: "Studio: " + studio + (label ? " | Label: " + label : ""),
            previewUrl: previewUrl
        });
    } catch (e) {
        return "null";
    }
}

function parseDetailResponse(html) {
    var uuid = "";
    var surritMatch = html.match(/surrit\.com\/([0-9a-f-]{36})/i) ||
                      html.match(/sixyik\.com\/([0-9a-f-]{36})/i) ||
                      html.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
    if (surritMatch) uuid = surritMatch[1] || surritMatch[0];

    return JSON.stringify({
        url: uuid ? "https://surrit.com/" + uuid + "/playlist.m3u8" : "",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": "https://missav123.com/",
            "Origin": "https://missav123.com"
        },
        subtitles: []
    });
}

function parseCategoriesResponse(html) {
    html = PluginUtils.normalizeHtml(html);
    var categories = [{ name: "Tất cả thể loại", slug: "vi/genres" }];
    var regex = /<a[^>]+href="([^"]*\/vi\/genres\/[^"]+)"[^>]*>([^<]+)<\/a>/g;
    var match;
    var seen = {};
    while ((match = regex.exec(html)) !== null) {
        var parts = match[1].split("/genres/");
        var slug = parts.length > 1 ? parts[1] : "";
        if (slug && !seen[slug]) {
            seen[slug] = true;
            categories.push({ name: PluginUtils.cleanText(match[2]), slug: "vi/genres/" + slug });
        }
    }
    return JSON.stringify(categories);
}

function parseCountriesResponse(html) { return "[]"; }
function parseYearsResponse(html) { return "[]"; }
