// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "motchilll",
        "name": "Motchill",
        "version": "1.0.1",
        "baseUrl": "https://motchilli.ac",
        "iconUrl": "https://motchilli.ac/favicon.ico",
        "isEnabled": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'phim-moi-cap-nhat', title: 'Phim Mới Cập Nhật', type: 'Grid', path: '' },
        { slug: 'phim-bo', title: 'Phim Bộ', type: 'Horizontal', path: 'danh-sach/phim-bo' },
        { slug: 'phim-le', title: 'Phim Lẻ', type: 'Horizontal', path: 'danh-sach/phim-le' },
        { slug: 'hoat-hinh', title: 'Hoạt Hình', type: 'Horizontal', path: 'the-loai/hoat-hinh' },
        { slug: 'tv-shows', title: 'TV Shows', type: 'Horizontal', path: 'the-loai/tv-shows' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Phim mới', slug: 'phim-moi-cap-nhat' },
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
        var baseUrl = "https://motchilli.ac";
        var path = "";

        if (filters.category) {
            path = "/the-loai/" + filters.category;
        } else if (filters.country) {
            path = "/quoc-gia/" + filters.country;
        } else if (slug === "phim-bo" || slug === "phim-le") {
            path = "/danh-sach/" + slug;
        } else if (slug === "hoat-hinh" || slug === "tv-shows") {
            path = "/the-loai/" + slug;
        } else {
            path = "";
        }

        if (page > 1 && path !== "") {
            return baseUrl + path + "/" + page;
        }
        return baseUrl + path;
    } catch (e) {
        return "https://motchilli.ac";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var url = "https://motchilli.ac/search?q=" + encodeURIComponent(keyword);
        if (page > 1) {
            url += "&page=" + page;
        }
        return url;
    } catch (e) {
        return "https://motchilli.ac/search?q=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    return "https://motchilli.ac/phim/" + slug;
}

function getUrlCategories() {
    return "https://motchilli.ac/danh-sach/phim-le";
}

function getUrlCountries() {
    return "https://motchilli.ac/danh-sach/phim-le";
}

function getUrlYears() {
    return "https://motchilli.ac/danh-sach/phim-le";
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(apiResponseHtml) {
    try {
        var movies = [];
        var hrefRegex = /href="\/phim\/([^"\/]+)"/g;
        var match;
        while ((match = hrefRegex.exec(apiResponseHtml)) !== null) {
            var slug = match[1];
            if (slug.indexOf("/k-tap-") > -1) continue; 
            
            var subStr = apiResponseHtml.substring(match.index, match.index + 1000);
            var altMatch = /alt="([^"]+)"/.exec(subStr);
            var srcMatch = /src="([^"]+)"/.exec(subStr);
            
            if (altMatch && srcMatch) {
                var posterUrl = srcMatch[1];
                if (posterUrl.indexOf("http") !== 0) {
                    posterUrl = "https://motchilli.ac" + posterUrl;
                }
                
                var exists = false;
                for (var i = 0; i < movies.length; i++) {
                    if (movies[i].id === slug) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    movies.push({
                        id: slug,
                        title: altMatch[1],
                        posterUrl: posterUrl,
                        backdropUrl: posterUrl,
                        year: 0,
                        quality: "HD",
                        episode_current: "",
                        lang: "Vietsub"
                    });
                }
            }
        }
        
        var totalPages = 1;
        var pageMatches = apiResponseHtml.match(/\/danh-sach\/[^\/]+\/(\d+)/g);
        if (pageMatches) {
            pageMatches.forEach(function(pm) {
                var m = /\/(\d+)$/.exec(pm);
                if (m) {
                    var pageNum = parseInt(m[1], 10);
                    if (pageNum > totalPages) totalPages = pageNum;
                }
            });
        }
        
        return JSON.stringify({
            items: movies,
            pagination: {
                currentPage: 1,
                totalPages: totalPages
            }
        });
    } catch (error) {
        return JSON.stringify({ items: [], pagination: { currentPage: 1, totalPages: 1 } });
    }
}

function parseSearchResponse(apiResponseHtml) {
    return parseListResponse(apiResponseHtml);
}

function parseMovieDetail(apiResponseHtml) {
    try {
        var title = "";
        var originName = "";
        var posterUrl = "";
        var description = "";
        var year = 0;
        var genresStr = "";
        var countriesStr = "";
        var castsStr = "";
        var directorStr = "";
        var rating = 0;
        
        // Loop through all JSON-LD blocks to find TVSeries/Movie schema
        var schemaRegex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
        var sch;
        while ((sch = schemaRegex.exec(apiResponseHtml)) !== null) {
            try {
                var schemaJson = JSON.parse(sch[1]);
                var graph = schemaJson["@graph"] || [schemaJson];
                graph.forEach(function(item) {
                    if (item["@type"] === "TVSeries" || item["@type"] === "Movie" || item["@type"] === "Article") {
                        if (item.name) title = item.name;
                        if (item.alternateName) originName = item.alternateName;
                        if (item.image) posterUrl = item.image;
                        if (item.description) description = item.description;
                        if (item.datePublished) {
                            var yr = parseInt(item.datePublished.substring(0, 4), 10);
                            if (yr) year = yr;
                        }
                        if (item.genre) {
                            genresStr = (Array.isArray(item.genre) ? item.genre : [item.genre]).join(", ");
                        }
                        if (item.actor) {
                            castsStr = (Array.isArray(item.actor) ? item.actor : [item.actor]).map(function(a) { return a.name; }).join(", ");
                        }
                        if (item.director) {
                            directorStr = (Array.isArray(item.director) ? item.director : [item.director]).map(function(d) { return d.name; }).join(", ");
                        }
                        if (item.countryOfOrigin) {
                            countriesStr = (Array.isArray(item.countryOfOrigin) ? item.countryOfOrigin : [item.countryOfOrigin]).map(function(c) { return c.name || c; }).join(", ");
                        }
                        if (item.aggregateRating && item.aggregateRating.ratingValue) {
                            rating = parseFloat(item.aggregateRating.ratingValue) || 0;
                        }
                    }
                });
            } catch(e) {}
        }

        // Extract episodes links
        var episodesRegex = /\\?"server\\?":\\?"([^"\\]+)\\?",\\?"name\\?":\\?"([^"\\]+)\\?",\\?"slug\\?":\\?"([^"\\]+)\\?",\\?"type\\?":\\?"([^"\\]+)\\?",\\?"link\\?":\\?"([^"\\]+)\\?"/g;
        var epMatch;
        var serverMap = {}; 
        
        while ((epMatch = episodesRegex.exec(apiResponseHtml)) !== null) {
            var serverName = epMatch[1];
            var epName = epMatch[2];
            var epSlug = epMatch[3];
            var streamType = epMatch[4];
            var streamUrl = epMatch[5];
            
            if (!serverMap[serverName]) {
                serverMap[serverName] = {};
            }
            
            var epKey = epName + "_" + epSlug;
            if (!serverMap[serverName][epKey]) {
                serverMap[serverName][epKey] = {
                    name: epName,
                    slug: epSlug,
                    m3u8: "",
                    embed: ""
                };
            }
            
            if (streamType === "m3u8") {
                serverMap[serverName][epKey].m3u8 = streamUrl;
            } else {
                serverMap[serverName][epKey].embed = streamUrl;
            }
        }
        
        var servers = [];
        for (var sName in serverMap) {
            var epList = [];
            for (var epKey in serverMap[sName]) {
                var ep = serverMap[sName][epKey];
                epList.push({
                    id: ep.m3u8 || ep.embed,
                    name: ep.name,
                    slug: ep.slug
                });
            }
            epList.sort(function(a, b) {
                var na = parseFloat(a.name.replace(/[^\d.]/g, '')) || 0;
                var nb = parseFloat(b.name.replace(/[^\d.]/g, '')) || 0;
                return na - nb;
            });
            
            if (epList.length > 0) {
                servers.push({
                    name: sName,
                    episodes: epList
                });
            }
        }

        if (!title) {
            var titleMatch = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(apiResponseHtml);
            if (titleMatch) title = titleMatch[1].replace(/<[^>]*>/g, "").trim();
        }

        if (posterUrl && posterUrl.indexOf("http") !== 0) {
            posterUrl = "https://motchilli.ac" + posterUrl;
        }

        return JSON.stringify({
            id: "", 
            title: title,
            originName: originName,
            posterUrl: posterUrl,
            backdropUrl: posterUrl,
            description: (description || "").replace(/<[^>]*>/g, ""),
            year: year,
            rating: rating,
            quality: "HD",
            servers: servers,
            episode_current: "",
            lang: "Vietsub",
            category: genresStr,
            country: countriesStr,
            director: directorStr,
            casts: castsStr,
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
        var detail = JSON.parse(parseMovieDetail(apiResponseHtml));
        var streamUrl = "";
        if (detail && detail.servers && detail.servers.length > 0) {
            var firstServer = detail.servers[0];
            if (firstServer.episodes && firstServer.episodes.length > 0) {
                streamUrl = firstServer.episodes[0].id || "";
            }
        }
        return JSON.stringify({
            url: streamUrl,
            headers: { "User-Agent": "Mozilla/5.0", "Referer": "https://motchilli.ac" },
            subtitles: []
        });
    } catch (error) {
        return "{}";
    }
}

function parseCategoriesResponse(apiResponseHtml) {
    var categories = [
        { name: 'Hành Động', slug: 'hanh-dong' },
        { name: 'Phiêu Lưu', slug: 'phieu-luu' },
        { name: 'Hoạt Hình', slug: 'hoat-hinh' },
        { name: 'Hài Hước', slug: 'hai-huoc' },
        { name: 'Hình Sự', slug: 'hinh-su' },
        { name: 'Cổ Trang', slug: 'co-trang' },
        { name: 'Tình Cảm', slug: 'tinh-cam' },
        { name: 'Tâm Lý', slug: 'tam-ly' },
        { name: 'Chiến Tranh', slug: 'chien-tranh' },
        { name: 'Thể Thao', slug: 'the-thao' },
        { name: 'Võ Thuật', slug: 'vo-thuat' },
        { name: 'Viễn Tưởng', slug: 'vien-tuong' },
        { name: 'Khoa Học', slug: 'khoa-hoc' },
        { name: 'Kinh Dị', slug: 'kinh-di' },
        { name: 'Thần Thoại', slug: 'than-thoai' },
        { name: 'Chính Kịch', slug: 'chinh-kich' },
        { name: 'Bí Ẩn', slug: 'bi-an' },
        { name: 'Học Đường', slug: 'hoc-duong' }
    ];
    return JSON.stringify(categories);
}

function parseCountriesResponse(apiResponseHtml) {
    var countries = [
        { name: 'Trung Quốc', value: 'trung-quoc' },
        { name: 'Hàn Quốc', value: 'han-quoc' },
        { name: 'Nhật Bản', value: 'nhat-ban' },
        { name: 'Thái Lan', value: 'thai-lan' },
        { name: 'Âu Mỹ', value: 'au-my' },
        { name: 'Đài Loan', value: 'dai-loan' },
        { name: 'Hồng Kông', value: 'hong-kong' },
        { name: 'Ấn Độ', value: 'an-do' }
    ];
    return JSON.stringify(countries);
}

function parseYearsResponse(apiResponseHtml) {
    var years = [];
    var currentYear = 2026;
    for (var i = 0; i < 15; i++) {
        var yearStr = (currentYear - i).toString();
        years.push({ name: yearStr, value: yearStr });
    }
    return JSON.stringify(years);
}
