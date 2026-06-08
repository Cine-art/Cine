// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "nguonc",
        "name": "Nguồn C",
        "version": "1.1.2",
        "baseUrl": "https://phim.nguonc.com",
        "iconUrl": "https://phim.nguonc.com/public/images/Logo/logonc.png",
        "isEnabled": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'phim-moi-cap-nhat', title: 'Phim Mới Cập Nhật', type: 'Grid', path: 'phim-moi-cap-nhat' },
        { slug: 'phim-bo', title: 'Phim Bộ', type: 'Horizontal', path: 'danh-sach' },
        { slug: 'phim-le', title: 'Phim Lẻ', type: 'Horizontal', path: 'danh-sach' },
        { slug: 'hoat-hinh', title: 'Hoạt Hình', type: 'Horizontal', path: 'danh-sach' },
        { slug: 'tv-shows', title: 'TV Shows', type: 'Horizontal', path: 'danh-sach' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Phim mới cập nhật', slug: 'phim-moi-cap-nhat' },
        { name: 'Phim bộ', slug: 'phim-bo' },
        { name: 'Phim lẻ', slug: 'phim-le' },
        { name: 'Hoạt hình', slug: 'hoat-hinh' },
        { name: 'TV Shows', slug: 'tv-shows' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [
            { name: 'Mới cập nhật', value: 'update' }
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
        var baseUrl = "https://phim.nguonc.com/api/films";
        var path = "";

        if (filters.category) {
            path = "/the-loai/" + filters.category;
        } else if (filters.country) {
            path = "/quoc-gia/" + filters.country;
        } else if (slug === "phim-bo" || slug === "phim-le" || slug === "hoat-hinh" || slug === "tv-shows") {
            path = "/danh-sach/" + slug;
        } else {
            path = "/phim-moi-cap-nhat";
        }

        return baseUrl + path + "?page=" + page;
    } catch (e) {
        return "https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=1";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        return "https://phim.nguonc.com/api/films/search?keyword=" + encodeURIComponent(keyword) + "&page=" + page;
    } catch (e) {
        return "https://phim.nguonc.com/api/films/search?keyword=" + encodeURIComponent(keyword) + "&page=1";
    }
}

function getUrlDetail(slug) {
    return "https://phim.nguonc.com/api/film/" + slug;
}

function getUrlCategories() {
    return "https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=1";
}

function getUrlCountries() {
    return "https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=1";
}

function getUrlYears() {
    return "https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=1";
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(apiResponseJson) {
    try {
        var response = JSON.parse(apiResponseJson);
        var items = response.items || [];
        var paginate = response.paginate || {};

        var movies = items.map(function (item) {
            return {
                id: item.slug,
                title: item.name,
                posterUrl: item.thumb_url || "",
                backdropUrl: item.poster_url || "",
                year: 0,
                quality: item.quality || "",
                episode_current: item.current_episode || "",
                lang: item.language || ""
            };
        });

        return JSON.stringify({
            items: movies,
            pagination: {
                currentPage: paginate.current_page || 1,
                totalPages: paginate.total_page || 1,
                totalItems: paginate.total_items || 0,
                itemsPerPage: paginate.items_per_page || 10
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
        var response = JSON.parse(apiResponseJson);
        var movie = response.movie || {};
        
        var servers = [];
        var rawEpisodes = movie.episodes || [];
        rawEpisodes.forEach(function (server) {
            var episodes = [];
            if (server.items) {
                server.items.forEach(function (ep) {
                    episodes.push({
                        id: ep.m3u8 || ep.embed || "",
                        name: ep.name,
                        slug: ep.slug
                    });
                });
            }
            if (episodes.length > 0) {
                servers.push({ name: server.server_name, episodes: episodes });
            }
        });

        var year = 0;
        if (movie.category && movie.category["3"] && movie.category["3"].list && movie.category["3"].list.length > 0) {
            year = parseInt(movie.category["3"].list[0].name, 10) || 0;
        }

        var categories = "";
        if (movie.category && movie.category["2"] && movie.category["2"].list) {
            categories = movie.category["2"].list.map(function (c) { return c.name; }).join(", ");
        }

        var countries = "";
        if (movie.category && movie.category["4"] && movie.category["4"].list) {
            countries = movie.category["4"].list.map(function (c) { return c.name; }).join(", ");
        }

        return JSON.stringify({
            id: movie.slug,
            title: movie.name,
            originName: movie.original_name || "",
            posterUrl: movie.thumb_url || "",
            backdropUrl: movie.poster_url || "",
            description: (movie.description || "").replace(/<[^>]*>/g, ""),
            year: year,
            rating: 0,
            quality: movie.quality || "",
            servers: servers,
            episode_current: movie.current_episode || "",
            lang: movie.language || "",
            category: categories,
            country: countries,
            director: movie.director || "",
            casts: movie.casts || "",
            tmdbId: "",
            tmdbSeason: 0,
            tmdbType: ""
        });
    } catch (error) { return "null"; }
}

function parseDetailResponse(apiResponseJson) {
    try {
        var response = JSON.parse(apiResponseJson);
        var movie = response.movie || {};
        var episodes = movie.episodes || [];

        var streamUrl = "";
        if (episodes.length > 0) {
            var firstServer = episodes[0];
            if (firstServer.items && firstServer.items.length > 0) {
                streamUrl = firstServer.items[0].m3u8 || firstServer.items[0].embed || "";
            }
        }

        return JSON.stringify({
            url: streamUrl,
            headers: { "User-Agent": "Mozilla/5.0", "Referer": "https://phim.nguonc.com" },
            subtitles: []
        });
    } catch (error) { return "{}"; }
}

function parseCategoriesResponse(apiResponseJson) {
    var categories = [
        { name: 'Hành Động', slug: 'hanh-dong' },
        { name: 'Phiêu Lưu', slug: 'phieu-luu' },
        { name: 'Hoạt Hình', slug: 'hoat-hinh' },
        { name: 'Hài Hước', slug: 'hai-huoc' },
        { name: 'Hình Sự', slug: 'hinh-su' },
        { name: 'Tài Liệu', slug: 'tai-lieu' },
        { name: 'Chính Kịch', slug: 'chinh-kich' },
        { name: 'Gia Đình', slug: 'gia-dinh' },
        { name: 'Giả Tưởng', slug: 'gia-tuong' },
        { name: 'Lịch Sử', slug: 'lich-su' },
        { name: 'Kinh Dị', slug: 'kinh-di' },
        { name: 'Nhạc', slug: 'nhac' },
        { name: 'Bí Ẩn', slug: 'bi-an' },
        { name: 'Tình Cảm', slug: 'tinh-cam' },
        { name: 'Khoa Học', slug: 'khoa-hoc' },
        { name: 'Viễn Tưởng', slug: 'vien-tuong' },
        { name: 'Thần Thoại', slug: 'than-thoai' },
        { name: 'Chiến Tranh', slug: 'chien-tranh' },
        { name: 'Cổ Trang', slug: 'co-trang' },
        { name: 'Võ Thuật', slug: 'vo-thuat' }
    ];
    return JSON.stringify(categories);
}

function parseCountriesResponse(apiResponseJson) {
    var countries = [
        { name: 'Trung Quốc', value: 'trung-quoc' },
        { name: 'Hàn Quốc', value: 'han-quoc' },
        { name: 'Nhật Bản', value: 'nhat-ban' },
        { name: 'Mỹ', value: 'my' },
        { name: 'Âu Mỹ', value: 'au-my' },
        { name: 'Việt Nam', value: 'viet-nam' },
        { name: 'Thái Lan', value: 'thai-lan' },
        { name: 'Ấn Độ', value: 'an-do' },
        { name: 'Hồng Kông', value: 'hong-kong' },
        { name: 'Đài Loan', value: 'dai-loan' },
        { name: 'Anh', value: 'anh' },
        { name: 'Pháp', value: 'phap' },
        { name: 'Canada', value: 'canada' },
        { name: 'Quốc Gia Khác', value: 'quoc-gia-khac' }
    ];
    return JSON.stringify(countries);
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
