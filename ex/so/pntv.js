// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "phimngan",
        "name": "PhimNgan.TV",
        "version": "1.0.1",
        "baseUrl": "https://phimngan.tv",
        "iconUrl": "https://phimngan.tv/favicon.ico",
        "isEnabled": true,
        "type": "SHORT"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'phim-moi-cap-nhat', title: 'Phim Mới Cập Nhật', type: 'Grid', path: '' },
        { slug: 'tai-sinh', title: 'Tái Sinh', type: 'Horizontal', path: 'genres/tai-sinh' },
        { slug: 'bao-thu', title: 'Báo Thù', type: 'Horizontal', path: 'genres/bao-thu' },
        { slug: 'nguoc-luyen', title: 'Ngược Luyến', type: 'Horizontal', path: 'genres/nguoc-luyen' },
        { slug: 'tinh-yeu-ep-buoc', title: 'Tình Yêu Ép Buộc', type: 'Horizontal', path: 'genres/tinh-yeu-ep-buoc' },
        { slug: 'guong-vo-lai-lanh', title: 'Gương Vỡ Lại Lành', type: 'Horizontal', path: 'genres/guong-vo-lai-lanh' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Báo thù', slug: 'bao-thu' },
        { name: 'Bí ẩn thân phận', slug: 'bi-an-than-phan' },
        { name: 'Cạnh tranh', slug: 'canh-tranh' },
        { name: 'Đổi đời', slug: 'doi-doi' },
        { name: 'Duyên định mệnh', slug: 'duyen-dinh-menh' },
        { name: 'Gương vỡ lại lành', slug: 'guong-vo-lai-lanh' },
        { name: 'Ngược luyến', slug: 'nguoc-luyen' },
        { name: 'Tái sinh', slug: 'tai-sinh' },
        { name: 'Tình yêu ép buộc', slug: 'tinh-yeu-ep-buoc' },
        { name: 'Yêu thầm', slug: 'yeu-tham' }
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
        var baseUrl = "https://phimngan.tv";
        var path = "";

        if (filters.category) {
            path = "/genres/" + filters.category;
        } else if (slug === "phim-moi-cap-nhat" || slug === "movies") {
            if (page > 1) {
                path = "/movies";
            } else {
                path = "";
            }
        } else {
            path = "/genres/" + slug;
        }

        var url = baseUrl + path;
        if (page > 1) {
            url += "?page=" + page;
        }
        return url;
    } catch (e) {
        return "https://phimngan.tv/movies";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var url = "https://phimngan.tv/movies?search=" + encodeURIComponent(keyword);
        if (page > 1) {
            url += "&page=" + page;
        }
        return url;
    } catch (e) {
        return "https://phimngan.tv/movies?search=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (slug.indexOf("http") === 0) {
        return slug;
    }
    return "https://phimngan.tv/movies/" + slug;
}

function getUrlCategories() {
    return "https://phimngan.tv/movies";
}

function getUrlCountries() {
    return "https://phimngan.tv/movies";
}

function getUrlYears() {
    return "https://phimngan.tv/movies";
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(apiResponseHtml) {
    try {
        var movies = [];
        var regex = /\\"id\\":\\"([a-f0-9\-]+)\\",\\"title\\":\\"([^\\"]+)\\",\\"slug\\":\\"([^\\"]+)\\",.*?\\"cover\\":\\"([^\\"]+)\\",\\"episodeCount\\":(\d+)/g;
        var match;
        var seenIds = {};

        while ((match = regex.exec(apiResponseHtml)) !== null) {
            var id = match[3];
            if (seenIds[id]) continue;
            seenIds[id] = true;

            var title = match[2];
            var posterUrl = match[4];
            var episodeCount = match[5];

            movies.push({
                id: id,
                title: title,
                posterUrl: posterUrl,
                backdropUrl: posterUrl,
                year: 0,
                quality: "HD",
                episode_current: episodeCount + " tập",
                lang: "Vietsub"
            });
        }

        var totalPages = 1;
        var pageMatches = apiResponseHtml.match(/page=(\d+)/g);
        if (pageMatches) {
            for (var i = 0; i < pageMatches.length; i++) {
                var m = /page=(\d+)/.exec(pageMatches[i]);
                if (m) {
                    var pageNum = parseInt(m[1], 10);
                    if (pageNum > totalPages) {
                        totalPages = pageNum;
                    }
                }
            }
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
        var posterUrl = "";
        var description = "";
        var year = 2025;

        // Parse title from HTML
        var titleMatch = /<title>([\s\S]*?)<\/title>/i.exec(apiResponseHtml);
        if (titleMatch) {
            title = titleMatch[1].replace(/\s*-\s*PhimNgan\.TV/i, "").trim();
        }

        // Parse description from HTML
        var descMatch = /<meta\s+name="description"\s+content="([^"]+)"/i.exec(apiResponseHtml) || 
                        /<meta\s+property="og:description"\s+content="([^"]+)"/i.exec(apiResponseHtml);
        if (descMatch) {
            description = descMatch[1].trim();
        }

        // Parse posterUrl from HTML
        var imgMatch = /<meta\s+property="og:image"\s+content="([^"]+)"/i.exec(apiResponseHtml) || 
                       /<meta\s+name="twitter:image"\s+content="([^"]+)"/i.exec(apiResponseHtml);
        if (imgMatch) {
            posterUrl = imgMatch[1].trim();
        }

        // Parse year from datePublished
        var yearMatch = /datePublished[\\":]+(\d{4})/i.exec(apiResponseHtml) || 
                        /"datePublished"\s*:\s*"(\d{4})/i.exec(apiResponseHtml);
        if (yearMatch) {
            year = parseInt(yearMatch[1], 10);
        }

        // Parse genres
        var genres = [];
        var genreRegex = /href="\/genres\/([^"]+)"[^>]*>([^<]+)<\/a>/gi;
        var gMatch;
        while ((gMatch = genreRegex.exec(apiResponseHtml)) !== null) {
            var gName = gMatch[2].trim();
            if (gName && genres.indexOf(gName) === -1) {
                genres.push(gName);
            }
        }
        var genresStr = genres.join(", ");

        // Parse movieId
        var movieIdMatch = apiResponseHtml.match(/movieId\\":\\"([a-f0-9\-]+)\\"/);
        var movieId = movieIdMatch ? movieIdMatch[1] : "";

        // Parse episodes from Next.js payload
        var episodes = [];
        var seenOrders = {};
        if (movieId) {
            var epRegex = /\\"id\\":\\"([a-f0-9\-]+)\\",\\"title\\":\\"([^\\"]*)\\",\\"order\\":(\d+),.*?\\"videoUrl\\":\\"([^\\"]+)\\"/g;
            var epMatch;
            while ((epMatch = epRegex.exec(apiResponseHtml)) !== null) {
                var epOrder = parseInt(epMatch[3], 10);
                var videoUrl = epMatch[4];

                if (videoUrl.indexOf(movieId) > -1) {
                    if (!seenOrders[epOrder]) {
                        seenOrders[epOrder] = {
                            id: videoUrl,
                            name: "Tập " + epOrder,
                            slug: "tap-" + epOrder
                        };
                    }
                }
            }

            for (var ord in seenOrders) {
                if (seenOrders.hasOwnProperty(ord)) {
                    episodes.push(seenOrders[ord]);
                }
            }

            episodes.sort(function(a, b) {
                var na = parseFloat(a.name.replace(/[^\d.]/g, '')) || 0;
                var nb = parseFloat(b.name.replace(/[^\d.]/g, '')) || 0;
                return na - nb;
            });
        }

        var servers = [];
        if (episodes.length > 0) {
            servers.push({
                name: "Default",
                episodes: episodes
            });
        }

        return JSON.stringify({
            id: "",
            title: title,
            originName: title,
            posterUrl: posterUrl,
            backdropUrl: posterUrl,
            description: description,
            year: year,
            rating: 0,
            quality: "HD",
            servers: servers,
            episode_current: episodes.length > 0 ? (episodes.length + " tập") : "",
            lang: "Vietsub",
            category: genresStr,
            country: "Việt Nam",
            director: "N/A",
            casts: "N/A",
            tmdbId: "",
            tmdbSeason: 0,
            tmdbType: ""
        });
    } catch (error) {
        return "null";
    }
}

function parseDetailResponse(apiResponseHtml, apiUrl) {
    try {
        var streamUrl = "";
        var subtitles = [];

        if (apiResponseHtml && apiResponseHtml.indexOf('"url":') > -1) {
            var parsed = JSON.parse(apiResponseHtml);
            streamUrl = parsed.url;
            subtitles = parsed.subtitles || [];
        } else if (apiResponseHtml && (apiResponseHtml.indexOf("http://") === 0 || apiResponseHtml.indexOf("https://") === 0)) {
            streamUrl = apiResponseHtml.trim();
        } else if ((apiResponseHtml && apiResponseHtml.indexOf("#EXTM3U") > -1) || (apiUrl && apiUrl.indexOf(".m3u8") > -1)) {
            streamUrl = apiUrl;
        } else {
            var detail = JSON.parse(parseMovieDetail(apiResponseHtml));
            if (detail && detail.servers && detail.servers.length > 0) {
                var firstServer = detail.servers[0];
                if (firstServer.episodes && firstServer.episodes.length > 0) {
                    streamUrl = firstServer.episodes[0].id || "";
                }
            }

            if (!streamUrl) {
                var m3u8Match = /(https?:\/\/[^\s\"']+\.m3u8)/i.exec(apiResponseHtml);
                if (m3u8Match) {
                    streamUrl = m3u8Match[1];
                }
            }
        }

        // Extract subtitles if we have a stream URL (either in streamUrl or apiUrl)
        var targetUrl = streamUrl || apiUrl || "";
        if (targetUrl) {
            var match = /videos\/([a-f0-9\-]+)\/([a-f0-9\-]+)/i.exec(targetUrl);
            if (match) {
                var movieId = match[1];
                var episodeId = match[2];
                var hostIndex = targetUrl.indexOf("/videos/");
                var host = hostIndex > -1 ? targetUrl.substring(0, hostIndex) : "https://cdn.phimngan.xyz";
                subtitles = [
                    {
                        url: host + "/subtitles/" + movieId + "/" + episodeId + "/vi-VN.vtt",
                        lang: "vi",
                        label: "Tiếng Việt"
                    },
                    {
                        url: host + "/subtitles/" + movieId + "/" + episodeId + "/en-US.vtt",
                        lang: "en",
                        label: "English"
                    }
                ];
            }
        }

        return JSON.stringify({
            url: streamUrl,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://phimngan.tv/"
            },
            subtitles: subtitles
        });
    } catch (error) {
        return JSON.stringify({ url: "", headers: {}, subtitles: [] });
    }
}

function parseCategoriesResponse(apiResponseJson) {
    return getPrimaryCategories();
}

function parseCountriesResponse(apiResponseJson) {
    return JSON.stringify([
        { name: "Việt Nam", value: "viet-nam" }
    ]);
}

function parseYearsResponse(apiResponseJson) {
    var years = [];
    var currentYear = 2026;
    for (var i = 0; i < 5; i++) {
        var yearStr = (currentYear - i).toString();
        years.push({ name: yearStr, value: yearStr });
    }
    return JSON.stringify(years);
}

