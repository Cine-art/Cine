// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "netshort",
        "name": "NetShort",
        "version": "1.0.0",
        "baseUrl": "https://netshort.com",
        "iconUrl": "https://netshort.com/favicon.ico",
        "isEnabled": true,
        "type": "SHORT"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'phim-moi-cap-nhat', title: 'Phim Mới Cập Nhật', type: 'Grid', path: '' },
        { slug: 'Báo%20Thù-1983832092270911500', title: 'Báo Thù', type: 'Horizontal', path: 'vi/drama/Báo%20Thù-1983832092270911500' },
        { slug: 'Song%20Trùng%20Sinh-1983832092187025421', title: 'Song Trùng Sinh', type: 'Horizontal', path: 'vi/drama/Song%20Trùng%20Sinh-1983832092187025421' },
        { slug: 'Cưới%20Vì%20Có%20Thai-1983832091767595020', title: 'Cưới Vì Có Thai', type: 'Horizontal', path: 'vi/drama/Cưới%20Vì%20Có%20Thai-1983832091767595020' },
        { slug: 'Tình%20Yêu%20Cưỡng%20Ép-1983832091708874755', title: 'Tình Yêu Cưỡng Ép', type: 'Horizontal', path: 'vi/drama/Tình%20Yêu%20Cưỡng%20Ép-1983832091708874755' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Phim mới', slug: 'phim-moi-cap-nhat' },
        { name: 'Báo Thù', slug: 'Báo%20Thù-1983832092270911500' },
        { name: 'Song Trùng Sinh', slug: 'Song%20Trùng%20Sinh-1983832092187025421' },
        { name: 'Cưới Vì Có Thai', slug: 'Cưới%20Vì%20Có%20Thai-1983832091767595020' },
        { name: 'Tình Yêu Cưỡng Ép', slug: 'Tình%20Yêu%20Cưỡng%20Ép-1983832091708874755' }
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
        var baseUrl = "https://netshort.com";
        var path = "";

        if (filters.category) {
            path = "/vi/drama/" + filters.category;
        } else if (slug === "phim-moi-cap-nhat" || slug === "movies") {
            if (page > 1) {
                path = "/vi/movies";
            } else {
                path = "/vi";
            }
        } else {
            if (slug.indexOf("vi/drama/") === 0 || slug.indexOf("/vi/drama/") === 0) {
                path = slug.indexOf("/") === 0 ? slug : "/" + slug;
            } else {
                path = "/vi/drama/" + slug;
            }
        }

        var url = baseUrl + path;
        if (page > 1) {
            url += (url.indexOf("?") > -1 ? "&" : "?") + "pageNum=" + page;
        }
        return url;
    } catch (e) {
        return "https://netshort.com/vi/movies";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var url = "https://netshort.com/vi/movies?search=" + encodeURIComponent(keyword);
        if (page > 1) {
            url += "&pageNum=" + page;
        }
        return url;
    } catch (e) {
        return "https://netshort.com/vi/movies?search=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (slug.indexOf("http") === 0) {
        return slug;
    }
    if (slug.indexOf("vi/episode/") > -1) {
        return "https://netshort.com/" + (slug.indexOf("/") === 0 ? slug.substring(1) : slug);
    }
    return "https://netshort.com/vi/episode/" + slug;
}

function getUrlCategories() {
    return "https://netshort.com/vi/movies";
}

function getUrlCountries() {
    return "https://netshort.com/vi/movies";
}

function getUrlYears() {
    return "https://netshort.com/vi/movies";
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(apiResponseHtml) {
    try {
        var movies = [];
        var seenIds = {};
        var regex = /href="\/vi\/episode\/([^"]+)"/g;
        var match;

        while ((match = regex.exec(apiResponseHtml)) !== null) {
            var slug = match[1];
            if (slug.indexOf("-ep-") > -1) continue;
            
            var id = decodeURIComponent(slug);
            if (seenIds[id]) continue;
            seenIds[id] = true;

            var startIdx = match.index;
            var subStr = apiResponseHtml.substring(startIdx, startIdx + 2000);
            
            var altMatch = /alt="([^"]+)"/.exec(subStr);
            var srcMatch = /src="([^"]+)"/.exec(subStr);

            var title = altMatch ? altMatch[1] : id.replace(/-/g, " ");
            var posterUrl = srcMatch ? srcMatch[1] : "";

            movies.push({
                id: id,
                title: decodeURIComponent(title),
                posterUrl: posterUrl,
                backdropUrl: posterUrl,
                year: 0,
                quality: "HD",
                episode_current: "Full",
                lang: "Vietsub"
            });
        }

        var totalPages = 1;
        var totalCountMatch = /"totalCount"\s*:\s*(\d+)/i.exec(apiResponseHtml);
        var pageSizeMatch = /"pageSize"\s*:\s*(\d+)/i.exec(apiResponseHtml);
        if (totalCountMatch && pageSizeMatch) {
            var totalCount = parseInt(totalCountMatch[1], 10);
            var pageSize = parseInt(pageSizeMatch[1], 10);
            if (pageSize > 0) {
                totalPages = Math.ceil(totalCount / pageSize);
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

        var titleMatch = /<title>([\s\S]*?)<\/title>/i.exec(apiResponseHtml);
        if (titleMatch) {
            title = titleMatch[1].replace(/\s*-\s*NetShort/i, "").replace(/\s*Xem trực tuyến/i, "").trim();
        }

        var descMatch = /<meta\s+name="description"\s+content="([^"]+)"/i.exec(apiResponseHtml) || 
                        /<meta\s+property="og:description"\s+content="([^"]+)"/i.exec(apiResponseHtml);
        if (descMatch) {
            description = descMatch[1].trim();
        }

        var imgMatch = /<meta\s+property="og:image"\s+content="([^"]+)"/i.exec(apiResponseHtml) || 
                       /<meta\s+name="twitter:image"\s+content="([^"]+)"/i.exec(apiResponseHtml);
        if (imgMatch) {
            posterUrl = imgMatch[1].trim();
        }

        var yearMatch = /"uploadDate"\s*:\s*"(\d{4})/i.exec(apiResponseHtml);
        if (yearMatch) {
            year = parseInt(yearMatch[1], 10);
        }

        var baseSlug = "";
        var canonicalMatch = /<link\s+rel="canonical"\s+href="https:\/\/netshort\.com\/vi\/episode\/([^"]+)"/i.exec(apiResponseHtml);
        if (canonicalMatch) {
            baseSlug = canonicalMatch[1];
        } else {
            var ogUrlMatch = /<meta\s+property="og:url"\s+content="https:\/\/netshort\.com\/vi\/episode\/([^"]+)"/i.exec(apiResponseHtml);
            if (ogUrlMatch) {
                baseSlug = ogUrlMatch[1];
            }
        }

        var episodes = [];
        if (baseSlug) {
            var decodedSlug = decodeURIComponent(baseSlug);
            var encodedSlug = encodeURIComponent(decodedSlug);
            
            var escDecoded = decodedSlug.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            var escEncoded = encodedSlug.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            
            var epRegex = new RegExp('href="\\/vi\\/episode\\/(' + escDecoded + '|' + escEncoded + ')(-ep-(\\d+))?"', 'g');
            var epMatch;
            var seenOrders = {};

            while ((epMatch = epRegex.exec(apiResponseHtml)) !== null) {
                var epNum = epMatch[3] ? parseInt(epMatch[3], 10) : 1;
                if (!seenOrders[epNum]) {
                    var epSlug = baseSlug + (epMatch[2] ? epMatch[2] : "");
                    seenOrders[epNum] = {
                        id: "https://netshort.com/vi/episode/" + epSlug,
                        name: "Tập " + epNum,
                        slug: "tap-" + epNum
                    };
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
            category: "Phim ngắn",
            country: "Trung Quốc",
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

function parseDetailResponse(apiResponseHtml) {
    try {
        if (apiResponseHtml && apiResponseHtml.indexOf('"url":') > -1) {
            return apiResponseHtml;
        }
        
        var streamUrl = "";
        
        var embedMatch = /"embedUrl"\s*:\s*"([^"]+)"/i.exec(apiResponseHtml);
        if (embedMatch) {
            streamUrl = embedMatch[1];
        }
        
        if (!streamUrl) {
            var ogVideoMatch = /<meta\s+property="og:video"\s+content="([^"]+)"/i.exec(apiResponseHtml);
            if (ogVideoMatch) {
                streamUrl = ogVideoMatch[1];
            }
        }

        if (!streamUrl && apiResponseHtml && (apiResponseHtml.indexOf("http://") === 0 || apiResponseHtml.indexOf("https://") === 0)) {
            streamUrl = apiResponseHtml.trim();
        }

        if (streamUrl) {
            streamUrl = streamUrl.replace(/&amp;/g, "&");
        }

        return JSON.stringify({
            url: streamUrl,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://netshort.com/"
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
        { name: "Trung Quốc", value: "trung-quoc" }
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
