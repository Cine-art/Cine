// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "rapphim",
        "name": "RapPhim",
        "version": "1.0.0",
        "baseUrl": "https://rapphim.art",
        "iconUrl": "https://rapphim.art/favicon.ico",
        "isEnabled": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { "title": "Phim Mới Cập Nhật", "slug": "latest" },
        { "title": "Phim Chiếu Rạp", "slug": "chieu-rap" },
        { "title": "TV Show & Phim Bộ", "slug": "tv-show" },
        { "title": "Thịnh Hành", "slug": "trending" },
        { "title": "Phim 4K", "slug": "phim-4k" }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { "name": "Bí ẩn", "slug": "bi-an" },
        { "name": "Chiến Tranh", "slug": "chien-tranh" },
        { "name": "Chính kịch", "slug": "chinh-kich" },
        { "name": "Cổ Trang", "slug": "co-trang" },
        { "name": "Gia Đình", "slug": "gia-dinh" },
        { "name": "Hài Hước", "slug": "hai-huoc" },
        { "name": "Hành Động", "slug": "hanh-dong" },
        { "name": "Hình Sự", "slug": "hinh-su" },
        { "name": "Hoạt Hình", "slug": "hoat-hinh" },
        { "name": "Khoa Học", "slug": "khoa-hoc" },
        { "name": "Kinh Dị", "slug": "kinh-di" },
        { "name": "Lịch Sử", "slug": "lich-su" },
        { "name": "Phiêu Lưu", "slug": "phieu-luu" },
        { "name": "Tài Liệu", "slug": "tai-lieu" },
        { "name": "Tâm Lý", "slug": "tam-ly" },
        { "name": "Tình Cảm", "slug": "tinh-cam" },
        { "name": "Viễn Tây", "slug": "vien-tay" },
        { "name": "Viễn Tưởng", "slug": "vien-tuong" },
        { "name": "Võ Thuật", "slug": "vo-thuat" }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        "sort": [
            { "name": "Mới cập nhật", "value": "latest" }
        ],
        "type": [
            { "name": "Tất cả", "value": "" },
            { "name": "Phim lẻ", "value": "movie" },
            { "name": "Phim bộ", "value": "series" }
        ]
    });
}

// =============================================================================
// URL GENERATION
// =============================================================================

function getUrlList(slug, filtersJson) {
    try {
        var page = 1;
        var sort = "";
        var type = "";
        var variant = "";
        var category = "";
        
        if (filtersJson) {
            var filters = JSON.parse(filtersJson);
            if (filters.page) {
                page = parseInt(filters.page, 10);
            }
            if (filters.sort) {
                sort = filters.sort;
            }
            if (filters.type) {
                type = filters.type;
            }
            if (filters.variant) {
                variant = filters.variant;
            }
            if (filters.category) {
                category = filters.category;
            }
        }
        
        // Category routing
        var targetCat = category || (slug && slug !== "latest" && slug !== "chieu-rap" && slug !== "tv-show" && slug !== "trending" && slug !== "phim-4k" ? slug : "");
        if (targetCat) {
            return "https://rapphim.art/category/" + targetCat + (page > 1 ? "?page=" + page : "");
        }
        
        // Trending routing
        if (slug === "trending") {
            return "https://rapphim.art/trending" + (page > 1 ? "?page=" + page : "");
        }
        
        // Browse routing
        var params = [];
        
        var targetType = type;
        if (slug === "chieu-rap") {
            targetType = "movie";
        } else if (slug === "tv-show") {
            targetType = "series";
        }
        if (targetType) {
            params.push("type=" + targetType);
        }
        
        var targetVariant = variant;
        if (slug === "phim-4k") {
            targetVariant = "4k";
        }
        if (targetVariant) {
            params.push("variant=" + targetVariant);
        }
        
        var targetSort = sort;
        if (slug === "latest" || (!slug && !targetType && !targetVariant)) {
            targetSort = "latest";
        }
        if (targetSort) {
            params.push("sort=" + targetSort);
        }
        
        if (page > 1) {
            params.push("page=" + page);
        }
        
        var query = params.length > 0 ? "?" + params.join("&") : "";
        return "https://rapphim.art/browse" + query;
    } catch (e) {
        return "https://rapphim.art/browse?sort=latest";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var page = 1;
        if (filtersJson) {
            var filters = JSON.parse(filtersJson);
            if (filters.page) {
                page = parseInt(filters.page, 10);
            }
        }
        var url = "https://rapphim.art/browse?q=" + encodeURIComponent(keyword);
        if (page > 1) {
            url += "&page=" + page;
        }
        return url;
    } catch (e) {
        return "https://rapphim.art/browse?q=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    return "https://rapphim.art/phim/" + slug;
}

function getUrlCategories() {
    return "https://rapphim.art/browse";
}

function getUrlCountries() {
    return "https://rapphim.art/browse";
}

function getUrlYears() {
    return "https://rapphim.art/browse";
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(apiResponseHtml) {
    try {
        var movies = [];
        var seen = {};
        
        // Title cleaner
        var cleanTitleAndYear = function(alt) {
            var title = alt;
            var year = "";
            if (title.indexOf("Poster phim ") === 0) {
                title = title.substring(12);
            } else if (title.indexOf("Backdrop phim ") === 0) {
                title = title.substring(14);
            }
            
            var yearMatch = title.match(/\s*\((\d{4})\)\s*$/);
            if (yearMatch) {
                year = parseInt(yearMatch[1], 10);
                title = title.replace(/\s*\((\d{4})\)\s*$/, "");
            }
            return {
                title: title.trim(),
                year: year
            };
        };

        // Extract using regex chunks to ensure complete attribute groups
        var hrefRegex = /href="\/phim\/([^"/]+)"/g;
        var match;
        while ((match = hrefRegex.exec(apiResponseHtml)) !== null) {
            var slug = match[1];
            if (seen[slug]) continue;
            seen[slug] = true;
            
            var startIdx = Math.max(0, match.index - 300);
            var endIdx = Math.min(apiResponseHtml.length, match.index + 3000);
            var chunk = apiResponseHtml.substring(startIdx, endIdx);
            
            var imgAltMatch = chunk.match(/<img[^>]*alt="([^"]+)"/i);
            var title = "";
            var year = 0;
            
            if (!imgAltMatch) {
                var titleFallback = chunk.match(/title="([^"]+)"/i);
                if (titleFallback) {
                    var cleaned = cleanTitleAndYear(titleFallback[1]);
                    title = cleaned.title;
                    year = cleaned.year || 0;
                } else {
                    continue;
                }
            } else {
                var cleaned = cleanTitleAndYear(imgAltMatch[1]);
                title = cleaned.title;
                year = cleaned.year || 0;
            }
            
            var qualityMatch = chunk.match(/bg-gradient-to-br from-primary to-primary-dark[^>]*>([^<]+)<\/span>/i);
            var quality = qualityMatch ? qualityMatch[1].trim() : "HD";
            
            var poster = "";
            var urlMatches = chunk.match(/url=([^&"'\s\\]+)/g);
            if (urlMatches) {
                for (var i = 0; i < urlMatches.length; i++) {
                    var u = decodeURIComponent(urlMatches[i].substring(4));
                    if (u.indexOf("poster.webp") !== -1) {
                        poster = u;
                        break;
                    }
                }
                if (!poster) {
                    poster = decodeURIComponent(urlMatches[0].substring(4));
                }
            } else {
                var srcMatch = chunk.match(/srcSet="([^"]+)"/i) || chunk.match(/src="([^"]+)"/i);
                if (srcMatch) {
                    var firstUrl = srcMatch[1].match(/(https?:\/\/[^\s,]+)/);
                    if (firstUrl) {
                        poster = firstUrl[1];
                    }
                }
            }
            
            movies.push({
                "id": slug,
                "title": title,
                "originName": "",
                "posterUrl": poster,
                "backdropUrl": poster,
                "year": year,
                "quality": quality,
                "episode_current": "",
                "lang": "Vietsub"
            });
        }
        
        // Pagination extraction
        var currentPage = 1;
        var curMatch = apiResponseHtml.match(/aria-label="Trang (\d+)"[^>]*aria-current="page"/i) || apiResponseHtml.match(/aria-current="page"[^>]*>(\d+)<\/button>/i);
        if (curMatch) {
            currentPage = parseInt(curMatch[1], 10);
        }
        
        var totalPages = currentPage;
        var pageRegex = /aria-label="Trang (\d+)"/gi;
        var pMatch;
        while ((pMatch = pageRegex.exec(apiResponseHtml)) !== null) {
            var pNum = parseInt(pMatch[1], 10);
            if (pNum > totalPages) {
                totalPages = pNum;
            }
        }
        
        return JSON.stringify({
            "items": movies,
            "pagination": {
                "currentPage": currentPage,
                "totalPages": totalPages
            }
        });
    } catch (e) {
        return JSON.stringify({ "items": [], "pagination": { "currentPage": 1, "totalPages": 1 } });
    }
}

function parseSearchResponse(apiResponseHtml) {
    return parseListResponse(apiResponseHtml);
}

function parseMovieDetail(apiResponseHtml) {
    try {
        var movieObj = null;
        
        // Find movie JSON object
        var movieMatch = apiResponseHtml.match(/\\"movie\\"\s*:\s*(\{[\s\S]*?\})\s*,\s*\\"relatedMovies\\"/);
        if (movieMatch) {
            try {
                var jsonStr = movieMatch[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
                movieObj = JSON.parse(jsonStr);
            } catch (e) {}
        }
        
        // Try fallback matches
        if (!movieObj) {
            var epMatch = apiResponseHtml.match(/\\"episodes\\"\s*:\s*(\[[\s\S]*?\])\s*,\s*\\"totalEpisodes\\"/);
            if (epMatch) {
                try {
                    var jsonStr2 = epMatch[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
                    var episodes = JSON.parse(jsonStr2);
                    movieObj = { "episodes": episodes };
                } catch (e) {}
            }
        }
        
        if (!movieObj) {
            return "null";
        }
        
        var title = movieObj.name || "";
        var poster = movieObj.poster || "";
        var backdrop = movieObj.backdrop || "";
        var description = movieObj.description || "";
        var year = movieObj.year ? parseInt(movieObj.year, 10) : 0;
        
        var cats = [];
        if (movieObj.categories) {
            for (var i = 0; i < movieObj.categories.length; i++) {
                cats.push(movieObj.categories[i].name);
            }
        }
        var category = cats.join(", ");
        
        var countries = [];
        if (movieObj.countries) {
            for (var i = 0; i < movieObj.countries.length; i++) {
                countries.push(movieObj.countries[i].name);
            }
        }
        var country = countries.join(", ");
        
        var director = movieObj.directors ? movieObj.directors.join(", ") : "";
        var casts = movieObj.actors ? movieObj.actors.join(", ") : "";
        
        // Group episodes by server
        var serversMap = {};
        if (movieObj.episodes) {
            for (var i = 0; i < movieObj.episodes.length; i++) {
                var ep = movieObj.episodes[i];
                var epNum = ep.episodeNumber ? ep.episodeNumber.toString() : (i + 1).toString();
                var epTitle = ep.title || ("Tập " + epNum);
                
                if (ep.sources) {
                    for (var j = 0; j < ep.sources.length; j++) {
                        var src = ep.sources[j];
                        var sName = src.serverName || "Default";
                        var sUrl = src.url || "";
                        if (sUrl) {
                            if (!serversMap[sName]) {
                                serversMap[sName] = [];
                            }
                            serversMap[sName].push({
                                "id": sUrl,
                                "name": epTitle,
                                "slug": epNum
                            });
                        }
                    }
                }
            }
        }
        
        var servers = [];
        for (var sName in serversMap) {
            if (serversMap.hasOwnProperty(sName)) {
                servers.push({
                    "name": sName,
                    "episodes": serversMap[sName]
                });
            }
        }
        
        return JSON.stringify({
            "id": movieObj.slug || "",
            "title": title,
            "originName": movieObj.englishName || "",
            "posterUrl": poster,
            "backdropUrl": backdrop,
            "description": description,
            "year": year,
            "rating": 0,
            "quality": movieObj.quality || "HD",
            "servers": servers,
            "episode_current": "",
            "lang": movieObj.language || "Vietsub",
            "category": category,
            "country": country,
            "director": director,
            "casts": casts,
            "tmdbId": movieObj.tmdbId || "",
            "tmdbSeason": 0,
            "tmdbType": ""
        });
    } catch (e) {
        return "null";
    }
}

function parseDetailResponse(apiResponseHtml) {
    try {
        if (!apiResponseHtml) {
            return "{}";
        }
        
        if (apiResponseHtml.indexOf('"url":') > -1) {
            return apiResponseHtml;
        }
        
        if ((apiResponseHtml.indexOf("http://") === 0 || apiResponseHtml.indexOf("https://") === 0) && apiResponseHtml.indexOf("<html") === -1 && apiResponseHtml.indexOf("<body") === -1) {
            var directUrl = apiResponseHtml.trim();
            return JSON.stringify({
                "url": directUrl,
                "headers": {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Referer": "https://rapphim.art/"
                },
                "subtitles": []
            });
        }
        
        return "{}";
    } catch (e) {
        return "{}";
    }
}

function parseCategoriesResponse(apiResponseHtml) {
    return getPrimaryCategories();
}

function parseCountriesResponse(apiResponseHtml) {
    return JSON.stringify([]);
}

function parseYearsResponse(apiResponseHtml) {
    return JSON.stringify([]);
}
