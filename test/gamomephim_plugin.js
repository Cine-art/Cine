// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "gamomephim",
        "name": "Gà Mờ Mê Phim",
        "version": "1.0.0",
        "baseUrl": "https://gamomephim.com",
        "iconUrl": "https://gamomephim.com/favicon.ico",
        "isEnabled": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'phim-moi-cap-nhat', title: 'Phim Mới Cập Nhật', type: 'Grid', path: 'phim-moi' },
        { slug: 'phim-full', title: 'Phim Full', type: 'Horizontal', path: 'phim-ngan' },
        { slug: 'co-trang', title: 'Cổ Trang', type: 'Horizontal', path: 'the-loai/co-trang' },
        { slug: 'dan-quoc', title: 'Dân Quốc', type: 'Horizontal', path: 'the-loai/dan-quoc' },
        { slug: 'hien-dai', title: 'Hiện Đại', type: 'Horizontal', path: 'the-loai/hien-dai' },
        { slug: 'hai-huoc', title: 'Hài Hước', type: 'Horizontal', path: 'the-loai/hai-huoc' },
        { slug: 'trong-sinh', title: 'Trọng Sinh', type: 'Horizontal', path: 'the-loai/trong-sinh' },
        { slug: 'xuyen-khong', title: 'Xuyên Không', type: 'Horizontal', path: 'the-loai/xuyen-khong' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Phim mới', slug: 'phim-moi-cap-nhat' },
        { name: 'Phim full', slug: 'phim-full' },
        { name: 'Cổ Trang', slug: 'co-trang' },
        { name: 'Dân Quốc', slug: 'dan-quoc' },
        { name: 'Hiện Đại', slug: 'hien-dai' },
        { name: 'Hài Hước', slug: 'hai-huoc' },
        { name: 'Trọng Sinh', slug: 'trong-sinh' },
        { name: 'Xuyên Không', slug: 'xuyen-khong' },
        { name: 'Chữa Lành', slug: 'chua-lanh' },
        { name: 'Cưới Trước Yêu Sau', slug: 'cuoi-truoc-yeu-sau' },
        { name: 'Gương Vỡ Lại Lành', slug: 'guong-vo-lai-lanh' },
        { name: 'Thanh Xuân', slug: 'thanh-xuan' },
        { name: 'Trà Xanh Nam', slug: 'tra-xanh-nam' },
        { name: 'Yêu Thầm', slug: 'yeu-tham' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        category: [
            { name: 'Tất cả', value: '' },
            { name: 'Cổ Trang', value: 'co-trang' },
            { name: 'Dân Quốc', value: 'dan-quoc' },
            { name: 'Hiện Đại', value: 'hien-dai' },
            { name: 'Hài Hước', value: 'hai-huoc' },
            { name: 'Trọng Sinh', value: 'trong-sinh' },
            { name: 'Xuyên Không', value: 'xuyen-khong' },
            { name: 'Chữa Lành', value: 'chua-lanh' },
            { name: 'Cưới Trước Yêu Sau', value: 'cuoi-truoc-yeu-sau' },
            { name: 'Gương Vỡ Lại Lành', value: 'guong-vo-lai-lanh' },
            { name: 'Thanh Xuân', value: 'thanh-xuan' },
            { name: 'Trà Xanh Nam', value: 'tra-xanh-nam' },
            { name: 'Yêu Thầm', value: 'yeu-tham' }
        ],
        sort: [
            { name: 'Mới cập nhật', value: 'update' },
            { name: 'Thịnh hành', value: 'trending' },
            { name: 'Bảng xếp hạng', value: 'bxh' }
        ],
        status: [
            { name: 'Tất cả', value: 'all' },
            { name: 'Trọn bộ (FULL)', value: 'full' },
            { name: 'Đang cập nhật', value: 'updating' }
        ],
        format: [
            { name: 'Tất cả', value: 'all' },
            { name: 'Vietsub', value: 'vietsub' },
            { name: 'Thuyết Minh', value: 'thuyet-minh' }
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
        var baseUrl = "https://gamomephim.com";
        var path = "";

        // Determine category
        var category = filters.category || (slug && slug !== "phim-moi-cap-nhat" && slug !== "phim-full" && slug !== "ban-xep-hang" ? slug : "");

        if (category) {
            path = "/the-loai/" + category;
        } else if (filters.sort === "bxh" || slug === "ban-xep-hang") {
            path = "/ban-xep-hang";
        } else if (filters.status === "full" || slug === "phim-full") {
            path = "/phim-ngan";
        } else {
            path = "/phim-moi";
        }

        var url = baseUrl + path;
        if (page > 1) {
            url += "?page=" + page;
        }
        return url;
    } catch (e) {
        return "https://gamomephim.com/phim-moi";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var url = "https://gamomephim.com/tim-kiem?q=" + encodeURIComponent(keyword);
        if (page > 1) {
            url += "&page=" + page;
        }
        return url;
    } catch (e) {
        return "https://gamomephim.com/tim-kiem?q=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (!slug) return "https://gamomephim.com";
    if (slug.indexOf("http") === 0) {
        return slug;
    }
    // Episode IDs start with cmp or cmq (typically 25 chars)
    if (slug.indexOf("cmp") === 0 || slug.indexOf("cmq") === 0) {
        return "https://gamomephim.com/api/public/video-link?id=" + slug;
    }
    return "https://gamomephim.com/" + slug;
}

function getUrlCategories() {
    return "https://gamomephim.com/phim-moi";
}

function getUrlCountries() {
    return "https://gamomephim.com/phim-moi";
}

function getUrlYears() {
    return "https://gamomephim.com/phim-moi";
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(apiResponseHtml) {
    try {
        var movies = [];
        var seen = {};
        
        var hrefRegex = /href="\/phim\/([^"/]+)"/g;
        var match;
        while ((match = hrefRegex.exec(apiResponseHtml)) !== null) {
            var slug = match[1];
            if (seen[slug]) continue;
            seen[slug] = true;
            
            var startIdx = Math.max(0, match.index - 300);
            var endIdx = Math.min(apiResponseHtml.length, match.index + 2000);
            var chunk = apiResponseHtml.substring(startIdx, endIdx);
            
            var titleMatch = chunk.match(/title="([^"]+)"/i) || chunk.match(/alt="Poster phim ([^"]+)"/i) || chunk.match(/alt="([^"]+)"/i);
            var title = titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, " ");
            
            var imgMatch = chunk.match(/src="([^"]+)"/i);
            var posterUrl = imgMatch ? imgMatch[1].trim() : "";
            
            var badgeMatch = chunk.match(/bg-(?:red-600|black\/70)[^>]*>([^<]+)<\/span>/i) || 
                             chunk.match(/absolute top-2 left-2 z-10"[^>]*><span[^>]*>([^<]+)<\/span>/i) ||
                             chunk.match(/class="[^"]*absolute top-2 left-2 z-10[^"]*"[^>]*><span[^>]*>([^<]+)<\/span>/i);
            var badge = badgeMatch ? badgeMatch[1].trim() : "";
            
            movies.push({
                id: slug,
                title: title,
                posterUrl: posterUrl,
                backdropUrl: posterUrl,
                year: 0,
                quality: "HD",
                episode_current: badge,
                lang: "Vietsub"
            });
        }
        
        // Pagination
        var currentPage = 1;
        var totalPages = 1;
        
        // Find links matching ?page=N or &page=N
        var pageMatches = apiResponseHtml.match(/page=(\d+)/g);
        if (pageMatches) {
            for (var i = 0; i < pageMatches.length; i++) {
                var m = /page=(\d+)/.exec(pageMatches[i]);
                if (m) {
                    var pNum = parseInt(m[1], 10);
                    if (pNum > totalPages) {
                        totalPages = pNum;
                    }
                }
            }
        }
        
        // Find active page indicator
        var curPageMatch = apiResponseHtml.match(/bg-\[var\(--color-brand-500\)\][^>]*>(\d+)<\/a>/i) ||
                           apiResponseHtml.match(/bg-\[var\(--color-brand-500\)\][^>]*>(\d+)<\/button>/i);
        if (curPageMatch) {
            currentPage = parseInt(curPageMatch[1], 10);
        }
        
        return JSON.stringify({
            items: movies,
            pagination: {
                currentPage: currentPage,
                totalPages: totalPages
            }
        });
    } catch (e) {
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
        var year = 2026;
        var category = "";
        var country = "Trung Quốc";
        var director = "N/A";
        var casts = "N/A";
        var rating = 0;

        // Parse JSON-LD Schema
        var ldMatches = apiResponseHtml.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
        var movieObj = null;
        if (ldMatches) {
            for (var i = 0; i < ldMatches.length; i++) {
                var content = ldMatches[i].replace(/<script[^>]*>/i, "").replace(/<\/script>/i, "");
                try {
                    var parsed = JSON.parse(content);
                    if (parsed && (parsed["@type"] === "Movie" || parsed["type"] === "Movie" || parsed["@type"] === "VideoObject" || parsed["type"] === "VideoObject" || parsed["@type"] === "TVSeries" || parsed["type"] === "TVSeries")) {
                        movieObj = parsed;
                        break;
                    }
                } catch(e) {}
            }
        }

        if (movieObj) {
            if (movieObj.name) title = movieObj.name;
            if (movieObj.description) description = movieObj.description;
            if (movieObj.image) {
                posterUrl = Array.isArray(movieObj.image) ? movieObj.image[0] : (movieObj.image.url || movieObj.image);
            } else if (movieObj.thumbnailUrl) {
                posterUrl = Array.isArray(movieObj.thumbnailUrl) ? movieObj.thumbnailUrl[0] : movieObj.thumbnailUrl;
            }
            if (movieObj.dateCreated) {
                var yr = parseInt(movieObj.dateCreated.substring(0, 4), 10);
                if (yr) year = yr;
            } else if (movieObj.uploadDate) {
                var yr = parseInt(movieObj.uploadDate.substring(0, 4), 10);
                if (yr) year = yr;
            }
            if (movieObj.genre) {
                category = (Array.isArray(movieObj.genre) ? movieObj.genre : [movieObj.genre]).join(", ");
            }
            if (movieObj.actor) {
                casts = (Array.isArray(movieObj.actor) ? movieObj.actor : [movieObj.actor]).map(function(a) { return a.name || a; }).join(", ");
            }
        }

        // Fallbacks
        if (!title) {
            var titleMatch = apiResponseHtml.match(/<title>([\s\S]*?)<\/title>/i);
            if (titleMatch) {
                title = titleMatch[1].replace(/\s*-\s*Gà Mờ Mê Phim/i, "").replace(/\s*Xem Phim/i, "").trim();
            }
        }
        if (!description) {
            var descMatch = apiResponseHtml.match(/<meta\s+name="description"\s+content="([^"]+)"/i) || 
                            apiResponseHtml.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
            if (descMatch) {
                description = descMatch[1].trim();
            }
        }
        if (!posterUrl) {
            var imgMatch = apiResponseHtml.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i) || 
                           apiResponseHtml.match(/<meta\s+name="twitter:image"\s+content="([^"]+)"/i);
            if (imgMatch) {
                posterUrl = imgMatch[1].trim();
            }
        }

        // Extract genres from URL search params / HTML
        if (!category) {
            var genres = [];
            var genreRegex = /genre=([^"&\s\\]+)/g;
            var gMatch;
            while ((gMatch = genreRegex.exec(apiResponseHtml)) !== null) {
                var gName = decodeURIComponent(gMatch[1]).trim();
                if (gName && gName !== "genre" && genres.indexOf(gName) === -1) {
                    genres.push(gName);
                }
            }
            category = genres.join(", ");
        }

        // Extract cast from RSC payload
        if (casts === "N/A" || !casts) {
            var castMatch = apiResponseHtml.match(/\\"cast\\"\s*:\s*\\"([^"\\]+)\\"/) || apiResponseHtml.match(/"cast"\s*:\s*"([^"]+)"/);
            if (castMatch) {
                casts = castMatch[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            }
        }

        // Extract episodes from RSC payload
        var episodes = [];
        var epMatch = apiResponseHtml.match(/\\"episodes\\"\s*:\s*(\[[\s\S]*?\])/) || apiResponseHtml.match(/"episodes"\s*:\s*(\[[\s\S]*?\])/);
        if (epMatch) {
            try {
                var jsonStr = epMatch[1];
                if (jsonStr.indexOf('\\"') > -1) {
                    jsonStr = jsonStr.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
                }
                episodes = JSON.parse(jsonStr);
            } catch (e) {}
        }

        // Group by audioType
        var serversMap = {};
        if (episodes && episodes.length > 0) {
            for (var i = 0; i < episodes.length; i++) {
                var ep = episodes[i];
                var epNum = ep.episodeNumber || 1;
                var audioType = ep.audioType || "VIETSUB";
                
                var serverName = "Vietsub";
                if (audioType === "THUYET_MINH") {
                    serverName = "Thuyết Minh";
                } else if (audioType !== "VIETSUB") {
                    serverName = audioType;
                }
                
                if (!serversMap[serverName]) {
                    serversMap[serverName] = [];
                }
                
                serversMap[serverName].push({
                    id: "https://gamomephim.com/api/public/video-link?id=" + ep.id,
                    name: "Tập " + epNum,
                    slug: epNum.toString()
                });
            }
        }
        
        var servers = [];
        for (var key in serversMap) {
            if (serversMap.hasOwnProperty(key)) {
                serversMap[key].sort(function(a, b) {
                    return parseInt(a.slug, 10) - parseInt(b.slug, 10);
                });
                
                servers.push({
                    name: key,
                    episodes: serversMap[key]
                });
            }
        }

        return JSON.stringify({
            id: "",
            title: title,
            originName: title,
            posterUrl: posterUrl,
            backdropUrl: posterUrl,
            description: (description || "").replace(/<[^>]*>/g, ""),
            year: year,
            rating: rating,
            quality: "HD",
            servers: servers,
            episode_current: episodes.length > 0 ? (episodes.length + " tập") : "",
            lang: "Vietsub",
            category: category,
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

function parseDetailResponse(apiResponseHtml) {
    try {
        if (!apiResponseHtml) {
            return "{}";
        }
        
        var streamUrl = "";
        
        // Parse JSON URL from api response
        if (apiResponseHtml.indexOf('"url":') > -1) {
            try {
                var response = JSON.parse(apiResponseHtml);
                streamUrl = response.url || "";
            } catch (e) {}
        }
        
        // Fallback: direct URL input
        if (!streamUrl && (apiResponseHtml.indexOf("http://") === 0 || apiResponseHtml.indexOf("https://") === 0)) {
            streamUrl = apiResponseHtml.trim();
        }
        
        if (streamUrl) {
            return JSON.stringify({
                url: streamUrl,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Referer": "https://gamomephim.com/",
                    "Origin": "https://gamomephim.com"
                },
                subtitles: []
            });
        }
        
        return "{}";
    } catch (error) {
        return "{}";
    }
}

function parseCategoriesResponse(apiResponseHtml) {
    return getPrimaryCategories();
}

function parseCountriesResponse(apiResponseHtml) {
    return JSON.stringify([
        { name: 'Trung Quốc', value: 'trung-quoc' },
        { name: 'Việt Nam', value: 'viet-nam' }
    ]);
}

function parseYearsResponse(apiResponseHtml) {
    var years = [];
    var currentYear = 2026;
    for (var i = 0; i < 5; i++) {
        var yearStr = (currentYear - i).toString();
        years.push({ name: yearStr, value: yearStr });
    }
    return JSON.stringify(years);
}
