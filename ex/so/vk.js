// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "vokich",
        "name": "Võ Kịch",
        "version": "1.0.0",
        "baseUrl": "https://vokich.com",
        "iconUrl": "https://vokich.com/ic.png",
        "isEnabled": true,
        "type": "SHORT",
        "layoutType": "GRID"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'the-loai/short-drama', title: 'Phim Ngắn / Short Drama', type: 'Grid', path: 'the-loai' },
        { slug: 'the-loai/vo-thuat', title: 'Phim Võ Thuật', type: 'Grid', path: 'the-loai' },
        { slug: 'the-loai/tinh-cam', title: 'Phim Tình Cảm', type: 'Grid', path: 'the-loai' },
        { slug: 'the-loai/co-trang', title: 'Phim Cổ Trang', type: 'Grid', path: 'the-loai' },
        { slug: 'the-loai/hanh-dong', title: 'Phim Hành Động', type: 'Grid', path: 'the-loai' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Short Drama', slug: 'the-loai/short-drama' },
        { name: 'Võ Thuật', slug: 'the-loai/vo-thuat' },
        { name: 'Tình Cảm', slug: 'the-loai/tinh-cam' },
        { name: 'Cổ Trang', slug: 'the-loai/co-trang' },
        { name: 'Hành Động', slug: 'the-loai/hanh-dong' },
        { name: 'Phim Hoạt Hình', slug: 'the-loai/hoat-hinh' },
        { name: 'Chính Kịch', slug: 'the-loai/chinh-kich' },
        { name: 'Tâm Lý', slug: 'the-loai/tam-ly' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [],
        category: [
            { name: 'Short Drama', value: 'the-loai/short-drama' },
            { name: 'Võ Thuật', value: 'the-loai/vo-thuat' },
            { name: 'Tình Cảm', value: 'the-loai/tinh-cam' },
            { name: 'Cổ Trang', value: 'the-loai/co-trang' },
            { name: 'Hành Động', value: 'the-loai/hanh-dong' },
            { name: 'Phim Hoạt Hình', value: 'the-loai/hoat-hinh' },
            { name: 'Chính Kịch', value: 'the-loai/chinh-kich' },
            { name: 'Tâm Lý', value: 'the-loai/tam-ly' },
            { name: 'Gia Đình', value: 'the-loai/gia-dinh' },
            { name: 'Phiêu Lưu', value: 'the-loai/phieu-luu' },
            { name: 'Viễn Tưởng', value: 'the-loai/vien-tuong' },
            { name: 'Âm Nhạc', value: 'the-loai/am-nhac' },
            { name: 'Bí Ẩn', value: 'the-loai/bi-an' },
            { name: 'Chiến Tranh', value: 'the-loai/chien-tranh' },
            { name: 'Hài Hước', value: 'the-loai/hai-huoc' },
            { name: 'Hình Sự', value: 'the-loai/hinh-su' },
            { name: 'Khoa Học', value: 'the-loai/khoa-hoc' },
            { name: 'Kinh Dị', value: 'the-loai/kinh-di' },
            { name: 'Tài Liệu', value: 'the-loai/tai-lieu' },
            { name: 'Thể Thao', value: 'the-loai/the-thao' },
            { name: 'TV Shows', value: 'the-loai/tv-shows' }
        ],
        country: [
            { name: 'Trung Quốc', value: 'quoc-gia/trung-quoc' }
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
        var activeSlug = slug || "the-loai/short-drama";
        if (filters.category) {
            activeSlug = filters.category;
        } else if (filters.country) {
            activeSlug = filters.country;
        }
        
        activeSlug = activeSlug.replace(/^\//, "").replace(/\/$/, "");
        var url = "https://vokich.com/" + activeSlug;
        if (page > 1) {
            url += "?page=" + page;
        }
        return url;
    } catch (e) {
        return "https://vokich.com/the-loai/short-drama";
    }
}

function getUrlSearch(keyword, filtersJson) {
    return "https://vokich.com/?search=" + encodeURIComponent(keyword);
}

function getUrlDetail(slug) {
    if (!slug) return "";
    if (slug.indexOf("http") === 0) {
        return slug;
    }
    
    var cleanSlug = slug.replace(/^\//, "");
    if (cleanSlug.indexOf("phim/") !== 0) {
        cleanSlug = "phim/" + cleanSlug;
    }
    return "https://vokich.com/" + cleanSlug;
}

function getUrlCategories() {
    return "https://vokich.com";
}

// Keep compatible signatures
function getUrlCountries() {
    return "https://vokich.com";
}

function getUrlYears() {
    return "https://vokich.com";
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
        
        function addItem(slug, title, poster, episode, lang) {
            if (!slug) return;
            slug = slug.trim();
            if (slug.indexOf('{{') !== -1 || title.indexOf('{{') !== -1) {
                return;
            }
            if (!foundSlugs[slug]) {
                items.push({
                    id: slug,
                    title: title || "Phim không tiêu đề",
                    posterUrl: poster,
                    backdropUrl: poster,
                    episode_current: episode || "Full",
                    quality: "FHD",
                    lang: lang || "Vietsub"
                });
                foundSlugs[slug] = true;
            }
        }

        var parts = html.split('rounded-md group text-gray-50');
        for (var i = 1; i < parts.length; i++) {
            var itemHtml = parts[i];
            
            var hrefMatch = itemHtml.match(/href="([^"]+)"/i);
            if (!hrefMatch) continue;
            var href = hrefMatch[1];
            var slug = href.replace('https://vokich.com', '')
                           .replace(/^\//, '');
            
            var titleMatch = itemHtml.match(/title="([^"]+)"/i) || 
                             itemHtml.match(/alt="([^"]+)"/i) ||
                             itemHtml.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
            var title = titleMatch ? PluginUtils.cleanText(titleMatch[1]) : "";
            
            var imgMatch = itemHtml.match(/src="([^"]+)"/i);
            var posterUrl = imgMatch ? imgMatch[1].trim() : "";
            if (posterUrl && posterUrl.indexOf('http') === -1) {
                posterUrl = "https://vokich.com" + (posterUrl.indexOf('/') === 0 ? "" : "/") + posterUrl;
            }
            
            var statusMatch = itemHtml.match(/bg-\[#A3765D\][^>]*>([\s\S]*?)<\/span>/i);
            var status = statusMatch ? PluginUtils.cleanText(statusMatch[1]).replace(/\s+/g, ' ') : "";
            
            var lang = "Vietsub";
            var episode_current = "Full";
            if (status) {
                if (status.indexOf("Vietsub") !== -1) {
                    lang = "Vietsub";
                } else if (status.indexOf("Thuyết Minh") !== -1) {
                    lang = "Thuyết Minh";
                } else if (status.indexOf("Lồng Tiếng") !== -1) {
                    lang = "Lồng Tiếng";
                }
                episode_current = status.replace(/Vietsub/i, "")
                                        .replace(/Thuyết Minh/i, "")
                                        .replace(/Lồng Tiếng/i, "")
                                        .trim();
            }
            
            addItem(slug, title, posterUrl, episode_current, lang);
        }

        var currentPage = 1;
        var totalPages = 1;
        var pagBlockMatch = html.match(/id="pagination"[\s\S]*?<\/ul>/i);
        if (pagBlockMatch) {
            var pagHtml = pagBlockMatch[0];
            var activeMatch = pagHtml.match(/active-page[^>]*>(\d+)</i);
            if (activeMatch) {
                currentPage = parseInt(activeMatch[1]);
            }
            var pageRegex = /page=(\d+)/g;
            var pageMatch;
            var maxPage = currentPage;
            while (pageMatch = pageRegex.exec(pagHtml)) {
                var pNum = parseInt(pageMatch[1]);
                if (pNum > maxPage) {
                    maxPage = pNum;
                }
            }
            totalPages = maxPage;
        }

        return JSON.stringify({
            items: items,
            pagination: {
                currentPage: currentPage,
                totalPages: totalPages,
                totalItems: items.length,
                itemsPerPage: items.length || 24
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
        var title = "";
        var titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        if (titleMatch) {
            title = PluginUtils.cleanText(titleMatch[1]);
        }
        
        var poster = "";
        var posterMatch = html.match(/<div class="[^"]*w-5\/12[^"]*relative"[^>]*>[\s\S]*?<img src="([^"]+)"/i) || 
                          html.match(/<div class="[^"]*md:w-4\/12[^"]*"[^>]*>[\s\S]*?<img src="([^"]+)"/i) ||
                          html.match(/<img[^>]+src="([^"]+)"[^>]+title="[^"]*"/i);
        if (posterMatch) {
            poster = posterMatch[1].trim();
            if (poster && poster.indexOf('http') === -1) {
                poster = "https://vokich.com" + (poster.indexOf('/') === 0 ? "" : "/") + poster;
            }
        }
        if (!poster) {
            var ogImage = html.match(/<meta property="og:image" content="([^"]+)"/i);
            poster = ogImage ? ogImage[1] : "";
        }

        var description = "";
        var infoMatch = html.match(/id="information"[\s\S]*?<div class="pt-3[^>]*>([\s\S]*?)<\/div>/i);
        if (infoMatch) {
            description = PluginUtils.cleanText(infoMatch[1]);
        }
        if (!description) {
            var metaDesc = html.match(/<meta name="description" content="([^"]+)"/i) || 
                           html.match(/<meta property="og:description" content="([^"]+)"/i);
            description = metaDesc ? PluginUtils.cleanText(metaDesc[1]) : "";
        }

        var genres = [];
        var genreRegex = /href="https?:\/\/vokich\.com\/the-loai\/([^"]+)"[^>]*>([^<]+)<\/a>/g;
        var genreMatch;
        while (genreMatch = genreRegex.exec(html)) {
            var gName = PluginUtils.cleanText(genreMatch[2]);
            if (gName && gName !== "Xem Thêm" && genres.indexOf(gName) === -1) {
                genres.push(gName);
            }
        }
        genreRegex = /href="\/the-loai\/([^"]+)"[^>]*>([^<]+)<\/a>/g;
        while (genreMatch = genreRegex.exec(html)) {
            var gName = PluginUtils.cleanText(genreMatch[2]);
            if (gName && gName !== "Xem Thêm" && genres.indexOf(gName) === -1) {
                genres.push(gName);
            }
        }
        var genreStr = genres.join(", ") || "Phim";

        var country = "Trung Quốc";
        var countryMatch = html.match(/href="https?:\/\/vokich\.com\/quoc-gia\/[^"]+"[^>]*>([^<]+)<\/a>/i) ||
                           html.match(/href="\/quoc-gia\/[^"]+"[^>]*>([^<]+)<\/a>/i);
        if (countryMatch) {
            country = PluginUtils.cleanText(countryMatch[1]);
        }

        var status = "Hoàn Tất";
        var statusMatch = html.match(/class="[^"]*bg-\[\#A3765D\][^"]*"[^>]*>([\s\S]*?)<\/span>/i);
        if (statusMatch) {
            status = PluginUtils.cleanText(statusMatch[1]).replace(/\s+/g, ' ');
        }

        var episodes = [];
        var epBlockMatch = html.match(/id="episodes"[\s\S]*?<\/span>/i);
        if (epBlockMatch) {
            var epHtml = epBlockMatch[0];
            var epRegex = /<a[^>]+href="([^"]*\/tap-[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
            var match;
            var seenUrls = {};
            while (match = epRegex.exec(epHtml)) {
                var epUrl = match[1];
                var epName = PluginUtils.cleanText(match[2]);
                if (!seenUrls[epUrl]) {
                    var epSlug = epUrl.replace('https://vokich.com', '').replace(/^\//, '');
                    episodes.push({
                        id: epUrl,
                        name: epName || "Tập",
                        slug: epSlug
                    });
                    seenUrls[epUrl] = true;
                }
            }
        }
        
        if (episodes.length === 0) {
            var epRegex = /<a[^>]+href="([^"]*\/tap-[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
            var match;
            var seenUrls = {};
            while (match = epRegex.exec(html)) {
                var epUrl = match[1];
                var epName = PluginUtils.cleanText(match[2]);
                if (!seenUrls[epUrl]) {
                    var epSlug = epUrl.replace('https://vokich.com', '').replace(/^\//, '');
                    episodes.push({
                        id: epUrl,
                        name: epName || "Tập",
                        slug: epSlug
                    });
                    seenUrls[epUrl] = true;
                }
            }
        }

        if (episodes.length === 0) {
            var canonicalMatch = html.match(/link\s+href="([^"]+)"\s+rel="canonical"/i) || 
                                 html.match(/rel="canonical"\s+href="([^"]+)"/i);
            var currentUrl = canonicalMatch ? canonicalMatch[1] : "";
            episodes.push({
                id: currentUrl || "",
                name: "Tập Full",
                slug: "full"
            });
        }

        var servers = [];
        var svEpisodes = [];
        for (var e = 0; e < episodes.length; e++) {
            var ep = episodes[e];
            svEpisodes.push({
                id: ep.id,
                name: ep.name,
                slug: ep.slug
            });
        }
        servers.push({
            name: "VIP 1",
            episodes: svEpisodes
        });

        return JSON.stringify({
            id: "",
            title: title,
            posterUrl: poster,
            backdropUrl: poster,
            description: description,
            servers: servers,
            category: genreStr,
            status: status,
            quality: "FHD",
            lang: "Vietsub",
            director: "",
            casts: "",
            country: country
        });
    } catch (e) {
        return "null";
    }
}

function parseDetailResponse(html, apiUrl) {
    try {
        var streamUrl = "";
        
        var match = html.match(/var\s+episodes\s*=\s*(\[[^\]]+\])/) || 
                    html.match(/episodes\s*=\s*(\[[^\]]+\])/);
        if (match) {
            var jsonText = match[1];
            try {
                var parsed = JSON.parse(jsonText);
                var found = null;
                for (var i = 0; i < parsed.length; i++) {
                    var item = parsed[i];
                    if (item.url === apiUrl || apiUrl.indexOf(item.url) !== -1 || item.url.indexOf(apiUrl) !== -1) {
                        found = item;
                        break;
                    }
                }
                if (!found && apiUrl) {
                    var idMatch = apiUrl.match(/tap-\d+-(\d+)/) || apiUrl.match(/tap-(\d+)/);
                    if (idMatch) {
                        var targetId = parseInt(idMatch[1]);
                        for (var i = 0; i < parsed.length; i++) {
                            if (parsed[i].id === targetId || parsed[i].name == idMatch[1]) {
                                found = parsed[i];
                                break;
                            }
                        }
                    }
                }
                
                if (!found && parsed.length > 0) {
                    found = parsed[0];
                }
                
                if (found && found.link) {
                    streamUrl = found.link;
                }
            } catch (e) {}
        }
        
        if (!streamUrl) {
            var m3u8Match = html.match(/"(https?:\/\/[^"]+\.m3u8[^"]*)"/i) || 
                            html.match(/'(https?:\/\/[^']+\.m3u8[^']*)'/i);
            if (m3u8Match) {
                streamUrl = m3u8Match[1];
            }
        }
        
        var isEmbed = true;
        if (streamUrl && (streamUrl.indexOf('.m3u8') !== -1 || streamUrl.indexOf('.mp4') !== -1)) {
            isEmbed = false;
        }
        
        return JSON.stringify({
            url: streamUrl || apiUrl,
            isEmbed: isEmbed,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
                "Referer": "https://vokich.com/"
            },
            subtitles: []
        });
    } catch (e) {
        return JSON.stringify({ url: apiUrl, isEmbed: true, headers: {}, subtitles: [] });
    }
}

function parseCategoriesResponse(html) {
    return "[]";
}

function parseCountriesResponse(html) {
    return "[]";
}

function parseYearsResponse(html) {
    return "[]";
}
