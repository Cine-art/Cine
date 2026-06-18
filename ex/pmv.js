// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "phimmoivide",
        "name": "Phim Mới Video",
        "version": "1.0.0",
        "baseUrl": "https://phimmoi.video",
        "iconUrl": "https://phimmoi.video/images/favicon.ico",
        "isEnabled": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'phim-moi', title: 'Phim Mới Cập Nhật', type: 'Grid', path: 'phim-moi' },
        { slug: 'hanh-dong', title: 'Hành Động', type: 'Horizontal', path: 'hanh-dong' },
        { slug: 'tinh-cam', title: 'Tình Cảm', type: 'Horizontal', path: 'tinh-cam' },
        { slug: 'hai-huoc', title: 'Hài Hước', type: 'Horizontal', path: 'hai-huoc' },
        { slug: 'kinh-di', title: 'Kinh Dị', type: 'Horizontal', path: 'kinh-di' },
        { slug: 'co-trang', title: 'Cổ Trang', type: 'Horizontal', path: 'co-trang' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Phim Mới', slug: 'phim-moi' },
        { name: 'Hành Động', slug: 'hanh-dong' },
        { name: 'Tình Cảm', slug: 'tinh-cam' },
        { name: 'Hài Hước', slug: 'hai-huoc' },
        { name: 'Kinh Dị', slug: 'kinh-di' },
        { name: 'Cổ Trang', slug: 'co-trang' },
        { name: 'Chính Kịch', slug: 'chinh-kich' },
        { name: 'Phiêu Lưu', slug: 'phieu-luu' },
        { name: 'Tâm Lý', slug: 'tam-ly' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        category: [
            { name: 'Tất cả thể loại', value: '' },
            { name: 'Hành Động', value: 'hanh-dong' },
            { name: 'Tình Cảm', value: 'tinh-cam' },
            { name: 'Hài Hước', value: 'hai-huoc' },
            { name: 'Kinh Dị', value: 'kinh-di' },
            { name: 'Cổ Trang', value: 'co-trang' },
            { name: 'Chính Kịch', value: 'chinh-kich' },
            { name: 'Phiêu Lưu', value: 'phieu-luu' },
            { name: 'Tâm Lý', value: 'tam-ly' },
            { name: 'Bí Ẩn', value: 'bi-an' },
            { name: 'Gia Đình', value: 'gia-dinh' },
            { name: 'Lịch Sử', value: 'lich-su' },
            { name: 'Lãng Mạn', value: 'lang-man' },
            { name: 'Khoa Học Viễn Tưởng', value: 'khoa-hoc-vien-tuong' }
        ],
        country: [
            { name: 'Tất cả quốc gia', value: '' },
            { name: 'Trung Quốc', value: 'trung-quoc' },
            { name: 'Hàn Quốc', value: 'han-quoc' },
            { name: 'Nhật Bản', value: 'nhat-ban' },
            { name: 'Thái Lan', value: 'thai-lan' },
            { name: 'Âu Mỹ', value: 'au-my' },
            { name: 'Việt Nam', value: 'viet-nam' }
        ],
        year: [
            { name: 'Tất cả năm', value: '' },
            { name: '2026', value: '2026' },
            { name: '2025', value: '2025' },
            { name: '2024', value: '2024' },
            { name: '2023', value: '2023' },
            { name: '2022', value: '2022' },
            { name: '2021', value: '2021' },
            { name: '2020', value: '2020' }
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
        var limit = filters.limit || 20;
        
        var cat = filters.category || slug || "";
        var country = filters.country || "";
        var year = filters.year || "";
        
        var query = [];
        query.push("page=" + page);
        query.push("limit=" + limit);
        
        if (cat && cat !== "phim-moi") {
            query.push("genre=" + cat);
        }
        if (country) {
            query.push("country=" + country);
        }
        if (year) {
            query.push("year=" + year);
        }
        
        if (!cat || cat === "phim-moi") {
            query.push("sort=views");
            query.push("order=desc");
        }
        
        return "https://cdn.phimmoi.video/api/v1/filter/movies?" + query.join("&");
    } catch (e) {
        return "https://cdn.phimmoi.video/api/v1/filter/movies?sort=views&order=desc&page=1&limit=20";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var limit = filters.limit || 20;
        return "https://cdn.phimmoi.video/api/v1/search?keyword=" + encodeURIComponent(keyword) + "&page=" + page + "&limit=" + limit;
    } catch (e) {
        return "https://cdn.phimmoi.video/api/v1/search?keyword=" + encodeURIComponent(keyword) + "&page=1&limit=20";
    }
}

function getUrlDetail(slug) {
    if (!slug) return "https://phimmoi.video";
    if (slug.indexOf("http") === 0) {
        return slug;
    }
    return "https://phimmoi.video/phim/" + slug;
}

function getUrlCategories() {
    return "https://phimmoi.video";
}

function getUrlCountries() {
    return "https://phimmoi.video";
}

function getUrlYears() {
    return "https://phimmoi.video";
}

// =============================================================================
// RESPONSE PARSING
// =============================================================================

function parseListResponse(apiResponseJson) {
    try {
        var response = JSON.parse(apiResponseJson);
        var data = response.data || {};
        
        var items = data.results || data.items || [];
        
        var movies = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            movies.push({
                id: item.slug,
                title: item.name,
                posterUrl: item.thumb_url || item.poster_url || "",
                backdropUrl: item.poster_url || item.thumb_url || "",
                year: item.year || 0,
                quality: item.quality || "HD",
                episode_current: item.display_status || "",
                lang: item.language || "Vietsub"
            });
        }
        
        var currentPage = data.page || response.page || 1;
        var totalItems = data.total || response.total || 0;
        var limit = data.limit || response.limit || 20;
        var totalPages = Math.ceil(totalItems / limit) || 1;
        
        return JSON.stringify({
            items: movies,
            pagination: {
                currentPage: currentPage,
                totalPages: totalPages,
                totalItems: totalItems,
                itemsPerPage: limit
            }
        });
    } catch (e) {
        return JSON.stringify({ items: [], pagination: { currentPage: 1, totalPages: 1 } });
    }
}

function parseSearchResponse(apiResponseJson) {
    return parseListResponse(apiResponseJson);
}

function parseMovieDetail(html) {
    try {
        var title = "";
        var posterUrl = "";
        var description = "";
        var year = 2026;
        var category = "";
        var country = "N/A";
        var director = "N/A";
        var casts = "N/A";
        var rating = 0.0;
        
        var titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i) || html.match(/property="og:title"\s+content="([^"]+)"/i);
        if (titleMatch) {
            title = titleMatch[1].replace(/Vietsub\s*-\s*Phim\s+Mới/i, "").replace(/\s*-\s*Phim\s+Mới/i, "").trim();
        }
        
        var posterMatch = html.match(/property="og:image"\s+content="([^"]+)"/i);
        if (posterMatch) {
            posterUrl = posterMatch[1].trim();
        }
        
        var descMatch = html.match(/property="og:description"\s+content="([^"]+)"/i);
        if (descMatch) {
            description = descMatch[1].replace(/Xem\s+.*?\s+online\s+full\s+hd\s+tại\s+Phim\s+Mới\./i, "").trim();
        }
        
        var yearMatch = html.match(/<span>(20\d\d)<\/span>/) || html.match(/\b(20\d\d|19\d\d)\b/);
        if (yearMatch) {
            year = parseInt(yearMatch[1], 10);
        }
        
        var genres = [];
        var genreRegex = /href="\/the-loai\/([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
        var gm;
        while ((gm = genreRegex.exec(html)) !== null) {
            var gName = gm[2].replace(/<[^>]*>/g, "").trim();
            if (genres.indexOf(gName) === -1) {
                genres.push(gName);
            }
        }
        category = genres.join(", ");
        
        var serversMap = {};
        var epRegex = /<a[^>]+href="(\/xem-phim\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
        var m;
        while ((m = epRegex.exec(html)) !== null) {
            var href = m[1];
            var innerText = m[2].replace(/<[^>]*>/g, "").trim();
            
            if (innerText === "Xem Ngay" || !innerText) {
                continue;
            }
            
            var absUrl = href;
            if (absUrl.indexOf("http") !== 0) {
                absUrl = "https://phimmoi.video" + absUrl;
            }
            
            var serverName = "Default";
            var langMatch = absUrl.match(/\/tap-[^\/]+\/([a-zA-Z0-9_\-]+)/);
            var serverMatch = absUrl.match(/server=([a-zA-Z0-9_\-]+)/);
            
            var parts = [];
            if (langMatch) {
                var l = langMatch[1];
                if (l === "song-ngu") parts.push("Song Ngữ");
                else if (l === "vietsub") parts.push("Vietsub");
                else if (l === "longtieng") parts.push("Lồng Tiếng");
                else if (l === "thuyetminh") parts.push("Thuyết Minh");
                else parts.push(l.charAt(0).toUpperCase() + l.slice(1));
            }
            if (serverMatch) {
                parts.push(serverMatch[1].toUpperCase());
            }
            
            if (parts.length > 0) {
                serverName = parts.join(" - ");
            }
            
            if (!serversMap[serverName]) {
                serversMap[serverName] = [];
            }
            
            var epName = innerText;
            var epSlug = epName.replace(/\D/g, "") || epName;
            
            var exists = false;
            for (var k = 0; k < serversMap[serverName].length; k++) {
                if (serversMap[serverName][k].id === absUrl) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                serversMap[serverName].push({
                    id: absUrl,
                    name: epName,
                    slug: epSlug
                });
            }
        }
        
        var servers = [];
        for (var name in serversMap) {
            if (serversMap.hasOwnProperty(name)) {
                var eps = serversMap[name];
                eps.sort(function(a, b) {
                    var na = parseInt(a.slug, 10);
                    var nb = parseInt(b.slug, 10);
                    if (!isNaN(na) && !isNaN(nb)) {
                        return na - nb;
                    }
                    return a.slug.localeCompare(b.slug);
                });
                
                servers.push({
                    name: name,
                    episodes: eps
                });
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
            rating: rating,
            quality: "HD",
            servers: servers,
            episode_current: servers.length > 0 && servers[0].episodes.length > 0 ? (servers[0].episodes.length + " tập") : "",
            lang: "Vietsub",
            category: category,
            country: country,
            director: director,
            casts: casts,
            tmdbId: "",
            tmdbSeason: 0,
            tmdbType: ""
        });
    } catch (e) {
        return "null";
    }
}

function parseDetailResponse(html, playUrl) {
    try {
        if (!html) return "{}";
        
        // 1. Detect if this is the embed player page containing window.__V_DATA__
        var vdataMatch = html.match(/window\.__V_DATA__\s*=\s*"([^"]+)"/);
        if (vdataMatch) {
            var vdataB64 = vdataMatch[1];
            var vdataStr = base64Decode(vdataB64);
            var vdataJson = JSON.parse(vdataStr);
            var rmB64 = vdataJson.rm;
            if (rmB64) {
                var streamUrl = base64Decode(rmB64);
                return JSON.stringify({
                    url: streamUrl,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                        "Referer": playUrl || "https://phimmoi.video/"
                    },
                    subtitles: []
                });
            }
        }
        
        // 2. Check if this is the watch page containing the embed iframe
        var embedMatch = html.match(/https?:\/\/[^\/]*phimmoi[^\/]*\/embed\/v2\/[a-zA-Z0-9_-]+/);
        if (embedMatch) {
            var embedUrl = embedMatch[0];
            return JSON.stringify({
                url: embedUrl,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Referer": playUrl || "https://phimmoi.video/"
                },
                subtitles: []
            });
        }
        
        return "{}";
    } catch (e) {
        return "{}";
    }
}

function parseCategoriesResponse(html) {
    return getPrimaryCategories();
}

function parseCountriesResponse(html) {
    var config = JSON.parse(getFilterConfig());
    return JSON.stringify(config.country);
}

function parseYearsResponse(html) {
    var config = JSON.parse(getFilterConfig());
    return JSON.stringify(config.year);
}

// =============================================================================
// HELPERS
// =============================================================================

function base64Decode(str) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var output = '';
    str = String(str).replace(/=+$/, '');
    if (str.length % 4 == 1) {
        return "";
    }
    for (
        var bc = 0, bs, buffer, idx = 0;
        buffer = str.charAt(idx++);
        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
        buffer = chars.indexOf(buffer);
    }
    try {
        return decodeURIComponent(escape(output));
    } catch (e) {
        return output;
    }
}
