// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "phimvivu",
        "name": "PhimViVu",
        "version": "1.0.1",
        "baseUrl": "https://phimvivu.lol",
        "iconUrl": "https://phimvivu.lol/wp-content/uploads/2025/08/cropped-FAV_VIVU_2025-32x32.png",
        "isEnabled": true,
        "hasDownload": true,
        "type": "MOVIE",
        "layoutType": "GRID"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'phimz', title: 'Phim Mới Cập Nhật', type: 'Grid', path: 'phimz' },
        { slug: 'phan-loai/phim-bo', title: 'Phim Bộ Mới', type: 'Grid', path: 'phan-loai' },
        { slug: 'phan-loai/phim-le', title: 'Phim Lẻ Mới', type: 'Grid', path: 'phan-loai' },
        { slug: 'phan-loai/phim-chieu-rap', title: 'Phim Chiếu Rạp', type: 'Grid', path: 'phan-loai' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Phim Bộ', slug: 'phan-loai/phim-bo' },
        { name: 'Phim Lẻ', slug: 'phan-loai/phim-le' },
        { name: 'Phim Chiếu Rạp', slug: 'phan-loai/phim-chieu-rap' },
        { name: 'Hành Động', slug: 'the-loai-phim/hanh-dong' },
        { name: 'Kinh Dị', slug: 'the-loai-phim/kinh-di' },
        { name: 'Phiêu Lưu', slug: 'the-loai-phim/phieu-luu' },
        { name: 'Cổ Trang', slug: 'the-loai-phim/co-trang' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [],
        category: [
            { name: 'Hành Động', value: 'the-loai-phim/hanh-dong' },
            { name: 'Hình Sự', value: 'the-loai-phim/hinh-su' },
            { name: 'Học Đường', value: 'the-loai-phim/hoc-duong' },
            { name: 'Kinh Dị', value: 'the-loai-phim/kinh-di' },
            { name: 'Hoạt Hình', value: 'phan-loai/hoat-hinh' },
            { name: 'Âm Nhạc', value: 'the-loai-phim/am-nhac' },
            { name: 'Bí Ẩn', value: 'the-loai-phim/bi-an' },
            { name: 'Chiến Tranh', value: 'the-loai-phim/chien-tranh' },
            { name: 'Chính Kịch', value: 'the-loai-phim/chinh-kich' },
            { name: 'Cổ Trang', value: 'the-loai-phim/co-trang' },
            { name: 'Gia Đình', value: 'the-loai-phim/gia-dinh' },
            { name: 'Hài', value: 'the-loai-phim/hai-huoc' },
            { name: 'Khoa Học', value: 'the-loai-phim/khoa-hoc' },
            { name: 'Phiêu Lưu', value: 'the-loai-phim/phieu-luu' },
            { name: 'Phim 18+', value: 'the-loai-phim/phim-18' },
            { name: 'Thần Thoại', value: 'the-loai-phim/than-thoai' },
            { name: 'TV Show', value: 'phan-loai/tv-shows' }
        ],
        country: [
            { name: 'Mỹ', value: 'quoc-gia/au-my' },
            { name: 'Trung Quốc', value: 'quoc-gia/trung-quoc' },
            { name: 'Hàn Quốc', value: 'quoc-gia/han-quoc' },
            { name: 'Nhật Bản', value: 'quoc-gia/nhat-ban' },
            { name: 'Hồng Kông', value: 'quoc-gia/hong-kong' },
            { name: 'Đài Loan', value: 'quoc-gia/dai-loan' },
            { name: 'Việt Nam', value: 'quoc-gia/viet-nam' },
            { name: 'Thái Lan', value: 'quoc-gia/thai-lan' },
            { name: 'Ấn Độ', value: 'quoc-gia/an-do' },
            { name: 'Anh', value: 'quoc-gia/anh' },
            { name: 'Pháp', value: 'quoc-gia/phap' },
            { name: 'Đức', value: 'quoc-gia/duc' },
            { name: 'Canada', value: 'quoc-gia/canada' }
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
        var activeSlug = slug || "phimz";
        if (filters.category) {
            activeSlug = filters.category;
        } else if (filters.country) {
            activeSlug = filters.country;
        }
        
        activeSlug = activeSlug.replace(/^\//, "").replace(/\/$/, "");
        var url = "https://phimvivu.lol/" + activeSlug;
        if (page > 1) {
            url += "/page/" + page + "/";
        } else {
            url += "/";
        }
        return url;
    } catch (e) {
        return "https://phimvivu.lol/phimz/";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var url = "https://phimvivu.lol/";
        if (page > 1) {
            url += "page/" + page + "/";
        }
        url += "?search=" + encodeURIComponent(keyword);
        return url;
    } catch (e) {
        return "https://phimvivu.lol/?search=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (!slug) return "";
    if (slug.indexOf("http") === 0) {
        return slug;
    }
    
    var cleanSlug = slug.replace(/^\//, "");
    if (cleanSlug.indexOf("phimz/") !== 0) {
        cleanSlug = "phimz/" + cleanSlug;
    }
    return "https://phimvivu.lol/" + cleanSlug;
}

function getUrlCategories() {
    return "https://phimvivu.lol";
}

function getUrlCountries() {
    return "https://phimvivu.lol";
}

function getUrlYears() {
    return "https://phimvivu.lol";
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
            .replace(/&#8220;/g, '"')
            .replace(/&#8221;/g, '"')
            .replace(/&#8211;/g, '-')
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

        var parts = html.split('class="film-item');
        for (var i = 1; i < parts.length; i++) {
            var itemHtml = parts[i];
            
            var hrefMatch = itemHtml.match(/href="([^"]+)"/i);
            if (!hrefMatch) continue;
            var href = hrefMatch[1];
            var slug = href.replace('https://phimvivu.lol', '')
                           .replace(/^\//, '');
            
            var titleMatch = itemHtml.match(/title="([^"]+)"/i) || 
                             itemHtml.match(/<p class="name">([^<]+)<\/p>/i);
            var title = titleMatch ? PluginUtils.cleanText(titleMatch[1]) : "";
            
            var imgMatch = itemHtml.match(/src="([^"]+)"/i) || itemHtml.match(/data-src="([^"]+)"/i);
            var posterUrl = imgMatch ? imgMatch[1].trim() : "";
            
            var statusMatch = itemHtml.match(/class="current-status"[^>]*>([\s\S]*?)<\/span>/i);
            var status = statusMatch ? PluginUtils.cleanText(statusMatch[1]).replace(/\s+/g, ' ') : "";
            
            var qualityMatch = itemHtml.match(/class="label-quality">([^<]+)<\/span>/i);
            var lang = qualityMatch ? PluginUtils.cleanText(qualityMatch[1]) : "Vietsub";
            
            addItem(slug, title, posterUrl, status, lang);
        }

        var currentPage = 1;
        var totalPages = 1;
        var pagBlockMatch = html.match(/<nav class="pagination">([\s\S]*?)<\/nav>/i);
        if (pagBlockMatch) {
            var pagHtml = pagBlockMatch[1];
            var currentMatch = pagHtml.match(/class="page-numbers current"[^>]*>(\d+)</i) || 
                               pagHtml.match(/class="current"[^>]*>(\d+)</i);
            if (currentMatch) {
                currentPage = parseInt(currentMatch[1]);
            }
            var pageRegex = /\/page\/(\d+)\/?/g;
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
        var titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || 
                         html.match(/<h2 class="[^"]*title[^"]*"[^>]*>([\s\S]*?)<\/h2>/i) ||
                         html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
        if (titleMatch) {
            title = PluginUtils.cleanText(titleMatch[1].split('-')[0].split('(')[0]);
        }
        if (!title) {
            var titleTag = html.match(/<title>([\s\S]*?)<\/title>/i);
            if (titleTag) {
                title = PluginUtils.cleanText(titleTag[1].replace(/Xem Phim/i, '').split('-')[0].split('|')[0]);
            }
        }
        
        var poster = "";
        var posterMatch = html.match(/class="poster"[^>]*>[\s\S]*?<img src="([^"]+)"/i) || 
                          html.match(/class="poster"[\s\S]*?src="([^"]+)"/i) ||
                          html.match(/<img[^>]+src="([^"]+)"[^>]+alt="[^"]*"/i);
        if (posterMatch) {
            poster = posterMatch[1].trim();
        }
        if (!poster) {
            var ogImage = html.match(/<meta property="og:image" content="([^"]+)"/i);
            poster = ogImage ? ogImage[1] : "";
        }

        var description = "";
        var contentMatch = html.match(/class="film-content"[^>]*>([\s\S]*?)<\/div>/i);
        if (contentMatch) {
            description = PluginUtils.cleanText(contentMatch[1]);
        }
        if (!description) {
            var metaDesc = html.match(/<meta name="description" content="([^"]+)"/i) || 
                           html.match(/<meta property="og:description" content="([^"]+)"/i);
            description = metaDesc ? PluginUtils.cleanText(metaDesc[1]) : "";
        }

        var genres = [];
        var genreRegex = /href="https?:\/\/phimvivu\.lol\/the-loai-phim\/([^"]+)"[^>]*>([^<]+)<\/a>/g;
        var genreMatch;
        while (genreMatch = genreRegex.exec(html)) {
            var gName = PluginUtils.cleanText(genreMatch[2]);
            if (gName && genres.indexOf(gName) === -1) {
                genres.push(gName);
            }
        }
        genreRegex = /href="\/the-loai-phim\/([^"]+)"[^>]*>([^<]+)<\/a>/g;
        while (genreMatch = genreRegex.exec(html)) {
            var gName = PluginUtils.cleanText(genreMatch[2]);
            if (gName && genres.indexOf(gName) === -1) {
                genres.push(gName);
            }
        }
        var genreStr = genres.join(", ") || "Phim";

        var country = "Âu Mỹ";
        var countryMatch = html.match(/href="https?:\/\/phimvivu\.lol\/quoc-gia\/([^"]+)"[^>]*>([^<]+)<\/a>/i) ||
                           html.match(/href="\/quoc-gia\/([^"]+)"[^>]*>([^<]+)<\/a>/i);
        if (countryMatch) {
            country = PluginUtils.cleanText(countryMatch[2]);
        }

        var status = "Full";
        var statusMatch = html.match(/class="current-status"[^>]*>([\s\S]*?)<\/span>/i);
        if (statusMatch) {
            status = PluginUtils.cleanText(statusMatch[1]).replace(/\s+/g, ' ');
        }

        var isWatchPage = html.indexOf('chooseStreamingServer(this)') !== -1;
        var episodes = [];
        
        if (isWatchPage) {
            var seenUrls = {};
            var epRegex = /href="([^"]*\/tap-[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
            var epMatch;
            while (epMatch = epRegex.exec(html)) {
                var epUrl = epMatch[1];
                var epName = PluginUtils.cleanText(epMatch[2]);
                if (!seenUrls[epUrl]) {
                    var epSlug = epUrl.replace('https://phimvivu.lol', '').replace(/^\//, '');
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
            var watchBtnMatch = html.match(/class="btn-see[^"]*"[^>]*href="([^"]+)"/i) || 
                                html.match(/href="([^"]+)"[^>]*class="btn-see/i);
            if (watchBtnMatch) {
                var watchUrl = watchBtnMatch[1];
                var epSlug = watchUrl.replace('https://phimvivu.lol', '').replace(/^\//, '');
                episodes.push({
                    id: watchUrl,
                    name: "Xem Phim",
                    slug: epSlug
                });
            } else {
                var canonicalMatch = html.match(/link\s+href="([^"]+)"\s+rel="canonical"/i) || 
                                     html.match(/rel="canonical"\s+href="([^"]+)"/i);
                var currentUrl = canonicalMatch ? canonicalMatch[1] : "";
                var epSlug = currentUrl.replace('https://phimvivu.lol', '').replace(/^\//, '');
                episodes.push({
                    id: currentUrl,
                    name: "Tập Full",
                    slug: epSlug
                });
            }
        }

        var servers = [];
        if (isWatchPage) {
            var serverList = [];
            var parts = html.split('chooseStreamingServer(this)');
            for (var i = 1; i < parts.length; i++) {
                var part = parts[i];
                var typeMatch = part.match(/data-type="([^"]*)"/i);
                var cleanPart = part.replace(/<span class="link_playing"[\s\S]*?<\/span>/i, '');
                var textMatch = cleanPart.match(/>([^<]+)<\/span>/i);
                var serverName = textMatch ? textMatch[1].trim() : ("Server " + i);
                
                serverList.push({
                    key: typeMatch ? typeMatch[1] : "m3u8",
                    name: serverName
                });
            }
            if (serverList.length === 0) {
                serverList.push({ key: "m3u8", name: "VIP #1" });
            }

            for (var s = 0; s < serverList.length; s++) {
                var sv = serverList[s];
                var svEpisodes = [];
                for (var e = 0; e < episodes.length; e++) {
                    var ep = episodes[e];
                    var epId = ep.id;
                    if (epId.indexOf('#') === -1) {
                        epId += "#server=" + sv.key;
                    }
                    svEpisodes.push({
                        id: epId,
                        name: ep.name,
                        slug: ep.slug
                    });
                }
                servers.push({
                    name: sv.name,
                    episodes: svEpisodes
                });
            }
        } else {
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
                name: "VIP #1",
                episodes: svEpisodes
            });
        }

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
        var serverKey = "m3u8";
        if (apiUrl) {
            var keyMatch = apiUrl.match(/#server=([^&]+)/i);
            if (keyMatch) {
                serverKey = keyMatch[1];
            }
        }
        
        var streamUrl = "";
        var parts = html.split('chooseStreamingServer(this)');
        for (var i = 1; i < parts.length; i++) {
            var part = parts[i];
            var typeMatch = part.match(/data-type="([^"]*)"/i);
            var type = typeMatch ? typeMatch[1] : "";
            
            if (type === serverKey || (!serverKey && type === "m3u8")) {
                var linkMatch = part.match(/data-link="([^"]*)"/i);
                if (linkMatch) {
                    streamUrl = linkMatch[1];
                    break;
                }
            }
        }
        
        if (!streamUrl) {
            var linkRegex = /data-link="([^"]+)"/g;
            var match;
            while (match = linkRegex.exec(html)) {
                var link = match[1];
                if (link.indexOf('m3u8') !== -1 || link.indexOf('mp4') !== -1) {
                    streamUrl = link;
                    break;
                }
            }
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
                "Referer": "https://phimvivu.lol/"
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
