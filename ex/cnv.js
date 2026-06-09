// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "cineviet",
        "name": "CineViet",
        "version": "1.0.0",
        "baseUrl": "https://cineviet.live",
        "iconUrl": "https://cineviet.live/favicon.svg",
        "isEnabled": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'phim-moi', title: 'Phim Mới Cập Nhật', type: 'Grid', path: 'movies' },
        { slug: 'phim-chieu-rap', title: 'Phim Chiếu Rạp', type: 'Horizontal', path: 'movies' },
        { slug: 'phim-le', title: 'Phim Lẻ', type: 'Horizontal', path: 'movies' },
        { slug: 'phim-bo', title: 'Phim Bộ', type: 'Horizontal', path: 'movies' },
        { slug: 'anime', title: 'Hoạt Hình & Anime', type: 'Horizontal', path: 'movies' },
        { slug: 'tv-shows', title: 'TV Shows', type: 'Horizontal', path: 'movies' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: "Chính Kịch", slug: "chinh-kich" },
        { name: "Hành Động", slug: "hanh-dong" },
        { name: "Tâm Lý", slug: "tam-ly" },
        { name: "Hài Hước", slug: "hai-huoc" },
        { name: "Phiêu Lưu", slug: "phieu-luu" },
        { name: "Tình Cảm", slug: "tinh-cam" },
        { name: "Viễn Tưởng", slug: "vien-tuong" },
        { name: "Bí Ẩn", slug: "bi-an" },
        { name: "Hình Sự", slug: "hinh-su" },
        { name: "Khoa Học", slug: "khoa-hoc" },
        { name: "Kinh dị", slug: "kinh-di" },
        { name: "Gia Đình", slug: "gia-dinh" },
        { name: "Tài liệu", slug: "tai-lieu" },
        { name: "Cổ Trang", slug: "co-trang" }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [
            { name: 'Mới cập nhật', value: 'created_at' },
            { name: 'Lượt xem', value: 'view_count' }
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
        var limit = filters.limit || 24;

        var query = [];
        query.push("page=" + page);
        query.push("limit=" + limit);

        if (slug === 'phim-moi') {
            query.push("sort=created_at");
            query.push("order=desc");
        } else if (slug === 'phim-le') {
            query.push("type=movie");
            query.push("sort=created_at");
            query.push("order=desc");
        } else if (slug === 'phim-bo') {
            query.push("type=series");
        } else if (slug === 'anime') {
            query.push("type=anime");
        } else if (slug === 'tv-shows') {
            query.push("type=tvshows");
        } else if (slug === 'phim-chieu-rap') {
            query.push("chieu_rap=1");
            query.push("sort=created_at");
            query.push("order=desc");
        } else if (slug === 'top-10') {
            query.push("sort=view_count_day");
            query.push("order=desc");
        } else {
            // Check country vs category
            if (isCountrySlug(slug)) {
                query.push("country=" + slug);
            } else {
                query.push("category=" + slug);
            }
        }

        // Apply filters if any
        if (filters.category && !hasQueryParam(query, "category")) {
            query.push("category=" + filters.category);
        }
        if (filters.country && !hasQueryParam(query, "country")) {
            query.push("country=" + filters.country);
        }
        if (filters.year) {
            query.push("release_year=" + filters.year);
        }
        if (filters.sort) {
            query.push("sort=" + filters.sort);
            query.push("order=desc");
        }

        return "https://cineviet.live/api/movies?" + query.join("&");
    } catch (e) {
        return "https://cineviet.live/api/movies?page=1&limit=24";
    }
}

function getUrlSearch(keyword, filtersJson) {
    var filters = JSON.parse(filtersJson || "{}");
    var page = filters.page || 1;
    var limit = filters.limit || 24;
    return "https://cineviet.live/api/movies?search=" + encodeURIComponent(keyword) + "&page=" + page + "&limit=" + limit;
}

function getUrlDetail(slug) {
    return "https://cineviet.live/api/movies/" + slug;
}

function getUrlCategories() {
    return "https://cineviet.live/api/movies?page=1&limit=1";
}

function getUrlCountries() {
    return "https://cineviet.live/api/movies?page=1&limit=1";
}

function getUrlYears() {
    return "https://cineviet.live/api/movies?page=1&limit=1";
}

// =============================================================================
// PARSERS & HELPERS
// =============================================================================

function isCountrySlug(slug) {
    var countries = ['au-my', 'trung-quoc', 'nhat-ban', 'han-quoc', 'anh', 'thai-lan', 'phap', 'viet-nam', 'an-do', 'hong-kong', 'canada', 'tay-ban-nha', 'quoc-gia-khac', 'philippines'];
    return countries.indexOf(slug) !== -1;
}

function hasQueryParam(queryParams, paramName) {
    var prefix = paramName + "=";
    for (var i = 0; i < queryParams.length; i++) {
        if (queryParams[i].indexOf(prefix) === 0) {
            return true;
        }
    }
    return false;
}

function safeJsonParse(str) {
    try {
        var start = str.indexOf('{');
        var end = str.lastIndexOf('}');
        if (start !== -1 && end !== -1 && end > start) {
            return JSON.parse(str.substring(start, end + 1));
        }
        return JSON.parse(str);
    } catch (e) {
        return null;
    }
}

function resolveStreamUrl(url) {
    if (!url) return "";
    var match = url.match(/[?&]url=([^&]+)/);
    if (match) {
        return decodeURIComponent(match[1]);
    }
    return url;
}

function getRefererForUrl(url) {
    if (!url) return "https://cineviet.live";
    var lowUrl = url.toLowerCase();
    if (lowUrl.indexOf("phim1280.tv") !== -1 || lowUrl.indexOf("phimapi.com") !== -1 || lowUrl.indexOf("kkphimplayer") !== -1) {
        return "https://phimapi.com";
    }
    if (lowUrl.indexOf("opstream") !== -1 || lowUrl.indexOf("ophim") !== -1) {
        return "https://ophim1.com";
    }
    return "https://cineviet.live";
}

function parseListResponse(apiResponseJson) {
    try {
        var data = safeJsonParse(apiResponseJson);
        if (!data) {
            return JSON.stringify({ items: [], pagination: { currentPage: 1, totalPages: 1 } });
        }

        var movies = data.movies || [];
        var items = [];
        for (var i = 0; i < movies.length; i++) {
            var item = movies[i];

            var episodeText = "";
            if (item.episode_current) {
                episodeText = "Tập " + item.episode_current;
            } else if (item.total_episodes === 1 || item.type === 'movie') {
                episodeText = "Full";
            } else if (item.total_episodes) {
                episodeText = item.total_episodes + " tập";
            }

            items.push({
                id: item.slug,
                title: item.title,
                posterUrl: item.poster || item.thumbnail || "",
                backdropUrl: item.backdrop || "",
                year: item.release_year || 0,
                quality: item.quality || "",
                episode_current: episodeText,
                lang: item.language || ""
            });
        }

        var currentPage = data.page || 1;
        var limit = data.limit || 24;
        var total = data.total || 0;
        var totalPages = Math.ceil(total / limit) || 1;

        return JSON.stringify({
            items: items,
            pagination: {
                currentPage: currentPage,
                totalPages: totalPages,
                totalItems: total,
                itemsPerPage: limit
            }
        });
    } catch (error) {
        return JSON.stringify({ items: [], pagination: { currentPage: 1, totalPages: 1 } });
    }
}

function parseSearchResponse(apiResponseJson) {
    return parseListResponse(apiResponseJson);
}

function parseMovieDetail(apiResponseJson) {
    try {
        var movie = safeJsonParse(apiResponseJson);
        if (!movie) return "null";

        var rawEpisodes = movie.episodes || [];
        if (typeof rawEpisodes === 'string') {
            try {
                rawEpisodes = JSON.parse(rawEpisodes);
            } catch (e) {}
        }

        var servers = [];
        if (Array.isArray(rawEpisodes)) {
            rawEpisodes.forEach(function (server) {
                var episodes = [];
                if (server.server_data) {
                    server.server_data.forEach(function (ep) {
                        var streamUrl = ep.link_m3u8 || ep.link_embed || ep.link || "";
                        streamUrl = resolveStreamUrl(streamUrl);

                        episodes.push({
                            id: streamUrl,
                            name: ep.name,
                            slug: ep.slug
                        });
                    });
                }
                if (episodes.length > 0) {
                    servers.push({
                        name: server.server_name,
                        episodes: episodes
                    });
                }
            });
        }

        var categories = "";
        if (movie.genres) {
            categories = movie.genres.join(", ");
        }

        var director = movie.director || "";
        var casts = "";
        if (movie.cast) {
            var castArr = movie.cast;
            if (typeof castArr === 'string') {
                try { castArr = JSON.parse(castArr); } catch(e) {}
            }
            if (Array.isArray(castArr)) {
                var names = [];
                for (var j = 0; j < castArr.length; j++) {
                    if (castArr[j] && castArr[j].name) {
                        names.push(castArr[j].name);
                    }
                }
                casts = names.join(", ");
            }
        }

        return JSON.stringify({
            id: movie.slug,
            title: movie.title,
            originName: movie.title_en || "",
            posterUrl: movie.poster || movie.thumbnail || "",
            backdropUrl: movie.backdrop || "",
            description: movie.description || "",
            year: movie.release_year || 0,
            rating: movie.rating || 0,
            quality: movie.quality || "",
            servers: servers,
            episode_current: movie.episode_current ? "Tập " + movie.episode_current : (movie.total_episodes === 1 ? "Full" : ""),
            lang: movie.language || "",
            category: categories,
            country: movie.country || "",
            director: director,
            casts: casts,
            tmdbId: movie.tmdb_id ? String(movie.tmdb_id) : ""
        });
    } catch (error) {
        return "null";
    }
}

function parseDetailResponse(apiResponseJson) {
    try {
        var streamUrl = "";
        var trimmed = (apiResponseJson || "").trim();

        if (trimmed.indexOf("http://") === 0 || trimmed.indexOf("https://") === 0) {
            streamUrl = trimmed;
        } else {
            var data = safeJsonParse(apiResponseJson);
            if (data) {
                var rawEpisodes = data.episodes || [];
                if (typeof rawEpisodes === 'string') {
                    try {
                        rawEpisodes = JSON.parse(rawEpisodes);
                    } catch (e) {}
                }
                if (Array.isArray(rawEpisodes) && rawEpisodes.length > 0) {
                    var firstServer = rawEpisodes[0];
                    if (firstServer.server_data && firstServer.server_data.length > 0) {
                        streamUrl = firstServer.server_data[0].link_m3u8 || firstServer.server_data[0].link_embed || "";
                    }
                }
            }
        }

        streamUrl = resolveStreamUrl(streamUrl);
        var referer = getRefererForUrl(streamUrl);

        return JSON.stringify({
            url: streamUrl,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": referer
            },
            subtitles: []
        });
    } catch (error) {
        return "{}";
    }
}

function parseCategoriesResponse(apiResponseJson) {
    return getPrimaryCategories();
}

function parseCountriesResponse(apiResponseJson) {
    return JSON.stringify([
        { name: "Âu Mỹ", value: "au-my" },
        { name: "Trung Quốc", value: "trung-quoc" },
        { name: "Nhật Bản", value: "nhat-ban" },
        { name: "Hàn Quốc", value: "han-quoc" },
        { name: "Anh", value: "anh" },
        { name: "Thái Lan", value: "thai-lan" },
        { name: "Pháp", value: "phap" },
        { name: "Việt Nam", value: "viet-nam" },
        { name: "Ấn Độ", value: "an-do" },
        { name: "Hồng Kông", value: "hong-kong" },
        { name: "Canada", value: "canada" },
        { name: "Tây Ban Nha", value: "tay-ban-nha" },
        { name: "Quốc Gia Khác", value: "quoc-gia-khac" },
        { name: "Philippines", value: "philippines" }
    ]);
}

function parseYearsResponse(apiResponseJson) {
    var years = [];
    var currentYear = 2026;
    for (var i = 0; i < 15; i++) {
        var yearStr = (currentYear - i).toString();
        years.push({ name: yearStr, value: yearStr });
    }
    return JSON.stringify(years);
}
