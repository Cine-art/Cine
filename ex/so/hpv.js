// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "hotphimvnzz",
        "name": "HotPhimVN",
        "version": "1.0.0",
        "baseUrl": "https://hotphimvnzz.com",
        "iconUrl": "https://hotphimvnzz.com/images/logo.png",
        "isEnabled": true,
        "type": "SHORT",
        "layoutType": "GRID"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'phim-bo-moi-cap-nhat', title: 'Phim Bộ Mới', type: 'Grid', path: 'phim-bo-moi-cap-nhat' },
        { slug: 'phim-le-moi-cap-nhat', title: 'Phim Lẻ Mới', type: 'Grid', path: 'phim-le-moi-cap-nhat' },
        { slug: 'hoat-hinh', title: 'Phim Hoạt Hình', type: 'Grid', path: 'hoat-hinh' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Phim Bộ Mới', slug: 'phim-bo-moi-cap-nhat' },
        { name: 'Phim Lẻ Mới', slug: 'phim-le-moi-cap-nhat' },
        { name: 'Phim Hoạt Hình', slug: 'hoat-hinh' },
        { name: 'Phim Mới Cập Nhật', slug: 'phim-moi-cap-nhat' },
        { name: 'Xem Nhiều', slug: 'xem-nhieu' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [],
        category: [
            { name: "Ngôn Tình", value: "ngon-tinh" },
            { name: "Cổ Trang", value: "co-trang" },
            { name: "Tình Cảm", value: "tinh-cam" },
            { name: "Hành Động", value: "hanh-dong" },
            { name: "Cổ Đại", value: "co-dai" },
            { name: "Chính Kịch", value: "chinh-kich" },
            { name: "Bí Ẩn", value: "bi-an" },
            { name: "Kinh Dị", value: "kinh-di" },
            { name: "Viễn Tưởng", value: "vien-tuong" },
            { name: "Giả Tưởng", value: "gia-tuong" },
            { name: "Phiêu Lưu", value: "phieu-luu" },
            { name: "Hài Hước", value: "hai-huoc" },
            { name: "Gia Đình", value: "gia-dinh" },
            { name: "Hình Sự", value: "hinh-su" },
            { name: "Tâm Lý", value: "tam-ly" },
            { name: "Chiến Tranh", value: "chien-tranh" },
            { name: "Thần Thoại", value: "than-thoai" },
            { name: "Học Đường", value: "hoc-duong" },
            { name: "Võ Thuật", value: "vo-thuat" },
            { name: "Khoa Học", value: "khoa-hoc" },
            { name: "Thiếu Nhi", value: "thieu-nhi" },
            { name: "Tài Liệu", value: "tai-lieu" },
            { name: "Chiếu Rạp", value: "chieu-rap" }
        ],
        country: [
            { name: "Trung Quốc", value: "trung-quoc" },
            { name: "Hàn Quốc", value: "han-quoc" },
            { name: "Nhật Bản", value: "nhat-ban" },
            { name: "Thái Lan", value: "thai-lan" },
            { name: "Đài Loan", value: "dai-loan" },
            { name: "Hồng Kông", value: "hong-kong" },
            { name: "Âu Mỹ", value: "au-my" },
            { name: "Việt Nam", value: "viet-nam" },
            { name: "Ấn Độ", value: "an-do" },
            { name: "Philippines", value: "philippines" }
        ],
        year: [
            { name: "2026", value: "2026" },
            { name: "2025", value: "2025" },
            { name: "2024", value: "2024" },
            { name: "2023", value: "2023" },
            { name: "2022", value: "2022" },
            { name: "2021", value: "2021" },
            { name: "2020", value: "2020" },
            { name: "2019", value: "2019" }
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
        var activeSlug = slug || "phim-bo-moi-cap-nhat";
        
        // Map filters category, country, year
        var genre = filters.category || "";
        var region = filters.country || "";
        var release = filters.year || "";
        var format = "";
        
        if (activeSlug === "phim-bo-moi-cap-nhat") {
            format = "series";
        } else if (activeSlug === "phim-le-moi-cap-nhat") {
            format = "single";
        } else if (activeSlug === "hoat-hinh") {
            format = "cartoon";
        }
        
        // If there's any active filter, route to loc-phim
        if (genre || region || release || filters.category || filters.country || filters.year) {
            var url = "https://hotphimvnzz.com/loc-phim?genre=" + encodeURIComponent(genre) +
                      "&region=" + encodeURIComponent(region) +
                      "&release=" + encodeURIComponent(release) +
                      "&format=" + encodeURIComponent(format);
            if (page > 1) {
                url += "&p=" + page;
            }
            return url;
        }
        
        var listUrl = "https://hotphimvnzz.com/" + activeSlug;
        if (page > 1) {
            listUrl += "?p=" + page;
        }
        return listUrl;
    } catch (e) {
        return "https://hotphimvnzz.com/phim-bo-moi-cap-nhat";
    }
}

function getUrlSearch(keyword, filtersJson) {
    var filters = JSON.parse(filtersJson || "{}");
    var page = filters.page || 1;
    var searchUrl = "https://hotphimvnzz.com/search?wd=" + encodeURIComponent(keyword);
    if (page > 1) {
        searchUrl += "&p=" + page;
    }
    return searchUrl;
}

function getUrlDetail(slug) {
    if (!slug) return "";
    if (slug.indexOf("http") === 0) {
        return slug;
    }
    var cleanSlug = slug.replace(/^\//, "");
    if (cleanSlug.indexOf("movie/") !== 0) {
        cleanSlug = "movie/" + cleanSlug;
    }
    return "https://hotphimvnzz.com/" + cleanSlug;
}

function getUrlCategories() { return "https://hotphimvnzz.com/loc-phim"; }
function getUrlCountries() { return "https://hotphimvnzz.com/loc-phim"; }
function getUrlYears() { return "https://hotphimvnzz.com/loc-phim"; }

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
            
            // If already parsed, update empty fields with better values
            if (foundSlugs[slug]) {
                var existing = foundSlugs[slug];
                if (!existing.posterUrl && poster) {
                    existing.posterUrl = poster;
                    existing.backdropUrl = poster;
                }
                if ((existing.episode_current === "Full" || !existing.episode_current) && episode) {
                    existing.episode_current = episode;
                }
                return;
            }
            
            var newItem = {
                id: slug,
                title: title || "Phim không tiêu đề",
                posterUrl: poster || "",
                backdropUrl: poster || "",
                episode_current: episode || "Full",
                quality: "FHD",
                lang: lang || "Vietsub"
            };
            items.push(newItem);
            foundSlugs[slug] = newItem;
        }

        var parts = html.split('href="https://hotphimvnzz.com/movie/');
        for (var i = 1; i < parts.length; i++) {
            var part = parts[i];
            
            var slugMatch = part.match(/^([^"'\s>]+)/);
            if (!slugMatch) continue;
            var slug = slugMatch[1];
            
            var title = "";
            var titleMatch = part.match(/title="([^"]+)"/i) || 
                             part.match(/alt="([^"]+)"/i) ||
                             part.match(/aria-label="([^"]+)"/i) ||
                             part.match(/<strong>([^<]+)<\/strong>/i) ||
                             part.match(/class="module-poster-item-title"[^>]*>([^<]+)/i) ||
                             part.match(/class="title"[^>]*>([^<]+)/i);
            if (titleMatch) {
                title = PluginUtils.cleanText(titleMatch[1]);
            }
            
            var poster = "";
            var imgMatch = part.match(/src="([^"]+)"/i) || 
                           part.match(/data="([^"]+)"/i) ||
                           part.match(/data-original="([^"]+)"/i) ||
                           part.match(/background:\s*url\(([^)]+)\)/i) ||
                           part.match(/background-image:\s*url\(([^)]+)\)/i);
            if (imgMatch) {
                poster = imgMatch[1].replace(/['"]/g, "").trim();
                if (poster && poster.indexOf('http') === -1) {
                    poster = "https://hotphimvnzz.com" + (poster.indexOf('/') === 0 ? "" : "/") + poster;
                }
            }
            
            var episode = "Full";
            var epMatch = part.match(/class="module-item-epchap"[^>]*>([\s\S]*?)<\/div>/i) ||
                          part.match(/class="module-info-item-content"[^>]*>([\s\S]*?)<\/div>/i) ||
                          part.match(/class="module-item-note"[^>]*>([\s\S]*?)<\/div>/i);
            if (epMatch) {
                episode = PluginUtils.cleanText(epMatch[1]);
            }
            
            var lang = "Vietsub";
            if (title && (title.toLowerCase().indexOf("thuyết minh") !== -1 || title.toLowerCase().indexOf("lồng tiếng") !== -1)) {
                lang = title.toLowerCase().indexOf("lồng tiếng") !== -1 ? "Lồng Tiếng" : "Thuyết Minh";
            }
            
            addItem(slug, title, poster, episode, lang);
        }

        var currentPage = 1;
        var totalPages = 1;
        var pageBlockMatch = html.match(/id="page"([\s\S]*?)<\/div>/);
        if (pageBlockMatch) {
            var pageBlock = pageBlockMatch[1];
            var currMatch = pageBlock.match(/class="[^"]*page-current[^"]*"[^>]*>(\d+)<\/span>/) || pageBlock.match(/>(\d+)<\/span>/);
            if (currMatch) {
                currentPage = parseInt(currMatch[1], 10);
            }
            var lastPageMatch = pageBlock.match(/href="[^"]*[?&]p=(\d+)"[^>]*title="Trang cuối"/);
            if (lastPageMatch) {
                totalPages = parseInt(lastPageMatch[1], 10);
            } else {
                var pRegex = /[?&]p=(\d+)/g;
                var pMatch;
                var maxPage = currentPage;
                while (pMatch = pRegex.exec(pageBlock)) {
                    var pNum = parseInt(pMatch[1], 10);
                    if (pNum > maxPage) maxPage = pNum;
                }
                totalPages = maxPage;
            }
        }

        return JSON.stringify({
            items: items,
            pagination: {
                currentPage: currentPage,
                totalPages: totalPages,
                totalItems: items.length,
                itemsPerPage: items.length || 20
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
        var posterMatch = html.match(/class="module-item-pic"[^>]*>([\s\S]*?)<\/div>/i) ||
                          html.match(/class="module-info-poster"[^>]*>([\s\S]*?)<\/div>/i);
        if (posterMatch) {
            var imgMatch = posterMatch[1].match(/src="([^"]+)"/i) || posterMatch[1].match(/data="([^"]+)"/i);
            if (imgMatch) {
                poster = imgMatch[1].trim();
            }
        }
        if (!poster) {
            var ogImage = html.match(/<meta property="og:image" content="([^"]+)"/i);
            poster = ogImage ? ogImage[1] : "";
        }
        if (poster && poster.indexOf('http') === -1) {
            poster = "https://hotphimvnzz.com" + (poster.indexOf('/') === 0 ? "" : "/") + poster;
        }

        var description = "";
        var metaDesc = html.match(/<meta name="description" content="([^"]+)"/i) || 
                       html.match(/<meta property="og:description" content="([^"]+)"/i);
        if (metaDesc) {
            description = PluginUtils.cleanText(metaDesc[1]);
        }
        if (!description) {
            var introMatch = html.match(/class="module-info-introduction-content"([\s\S]*?)<\/div>/i);
            if (introMatch) {
                description = PluginUtils.cleanText(introMatch[1]);
            }
        }

        // Genres
        var genres = [];
        var genreRegex = /href="https?:\/\/hotphimvnzz\.com\/the-loai\/([^"'\s>]+)"[^>]*>([^<]+)<\/a>/g;
        var genreMatch;
        while (genreMatch = genreRegex.exec(html)) {
            var gName = PluginUtils.cleanText(genreMatch[2]);
            if (gName && genres.indexOf(gName) === -1) {
                genres.push(gName);
            }
        }
        var genreStr = genres.join(", ") || "Phim";

        // Country
        var country = "Trung Quốc";
        var countryMatch = html.match(/href="https?:\/\/hotphimvnzz\.com\/quoc-gia\/([^"'\s>]+)"[^>]*>([^<]+)<\/a>/i);
        if (countryMatch) {
            country = PluginUtils.cleanText(countryMatch[1]);
        }

        // Status
        var status = "HD";
        var statusMatch = html.match(/<span[^>]*>Trạng thái：<\/span>\s*<div[^>]*>([^<]+)/i) ||
                          html.match(/Trạng thái：([\s\S]*?)<\/div>/i);
        if (statusMatch) {
            status = PluginUtils.cleanText(statusMatch[1]);
        }

        // Movie ID
        var movieId = "";
        var movieMatch = html.match(/data-movie="(\d+)"/i) || html.match(/data-id="(\d+)"/i);
        if (movieMatch) {
            movieId = movieMatch[1];
        }

        var servers = [];
        
        // 1. Get server names
        var serverNames = [];
        var splitParts = html.split('id="y-playList"');
        if (splitParts.length > 1) {
            var sub = splitParts[1].substring(0, 1000);
            var svRegex = /<span>([^<]+)<\/span>/g;
            var svMatch;
            while (svMatch = svRegex.exec(sub)) {
                serverNames.push(PluginUtils.cleanText(svMatch[1]));
            }
        }
        
        // 2. Get episodes for each server
        var epParts = html.split('class="module-play-list"');
        if (epParts.length > 1 && serverNames.length > 0) {
            for (var s = 0; s < serverNames.length; s++) {
                var svName = serverNames[s];
                var svEpisodes = [];
                var epPartHtml = epParts[s + 1] || "";
                
                var epRegex = /<a[^>]+href="([^"]+)"[^>]*title="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
                var epMatch;
                while (epMatch = epRegex.exec(epPartHtml)) {
                    var epHref = epMatch[1];
                    var epTitle = PluginUtils.cleanText(epMatch[2]);
                    
                    var epSlug = epHref.replace('https://hotphimvnzz.com', '')
                                       .replace(/^\//, '');
                    svEpisodes.push({
                        id: epHref,
                        name: epTitle,
                        slug: epSlug
                    });
                }
                if (svEpisodes.length > 0) {
                    servers.push({
                        name: svName,
                        episodes: svEpisodes
                    });
                }
            }
        }

        return JSON.stringify({
            id: movieId,
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
        var linkMatch = html.match(/class="[^"]*btn-episode[^"]*active[^"]*"[^>]*data-link="([^"]+)"/i) ||
                        html.match(/data-link="([^"]+)"[^>]*class="[^"]*btn-episode[^"]*active[^"]*"/i) ||
                        html.match(/class="[^"]*active[^"]*"[^>]*data-link="([^"]+)"/i) ||
                        html.match(/data-link="([^"]+)"[^>]*class="[^"]*active[^"]*"/i);

        var typeMatch = html.match(/class="[^"]*btn-episode[^"]*active[^"]*"[^>]*data-type="([^"]+)"/i) ||
                        html.match(/data-type="([^"]+)"[^>]*class="[^"]*btn-episode[^"]*active[^"]*"/i) ||
                        html.match(/class="[^"]*active[^"]*"[^>]*data-type="([^"]+)"/i) ||
                        html.match(/data-type="([^"]+)"[^>]*class="[^"]*active[^"]*"/i);

        if (linkMatch) {
            var streamLink = linkMatch[1];
            var streamType = typeMatch ? typeMatch[1] : "";
            
            if (streamType === "embed" || streamLink.indexOf("/api/get_playback.php") !== -1 || (streamLink.indexOf("http") === 0 && streamLink.indexOf(".m3u8") === -1 && streamLink.indexOf(".mp4") === -1)) {
                var originMatch = streamLink.match(/^(https?:\/\/[^\/]+)/i);
                var embedBase = originMatch ? originMatch[1] : "https://cdn-1-hotp.com";
                var slug = streamLink.replace(embedBase, "").replace(/^\//, "");
                
                var playbackUrl = embedBase + "/api/get_playback.php?slug=" + encodeURIComponent(slug) + "&ts=" + Date.now();
                return JSON.stringify({
                    url: playbackUrl,
                    isEmbed: true,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
                        "Referer": streamLink
                    }
                });
            } else {
                var isEmbed = true;
                if (streamLink.indexOf(".m3u8") !== -1 || streamLink.indexOf(".mp4") !== -1) {
                    isEmbed = false;
                }
                return JSON.stringify({
                    url: streamLink,
                    isEmbed: isEmbed,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
                        "Referer": "https://hotphimvnzz.com/"
                    }
                });
            }
        }

        var movieMatch = html.match(/data-movie="([^"]+)"/i);
        var episodeMatch = html.match(/data-episode="([^"]+)"/i);
        var serverMatch = html.match(/data-server="([^"]+)"/i);
        var svEpMatch = html.match(/data-sv-ep="([^"]+)"/i);

        if (!movieMatch || !episodeMatch || !serverMatch || !svEpMatch) {
            return JSON.stringify({
                url: apiUrl,
                isEmbed: true,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
                    "Referer": "https://hotphimvnzz.com/"
                }
            });
        }

        var movieId = movieMatch[1];
        var episodeId = episodeMatch[1];
        var serverId = serverMatch[1];
        var serverEpId = svEpMatch[1];

        var postBody = "episode_id=" + encodeURIComponent(episodeId) +
                       "&server_id=" + encodeURIComponent(serverId) +
                       "&movie_id=" + encodeURIComponent(movieId) +
                       "&server_ep_id=" + encodeURIComponent(serverEpId);

        return JSON.stringify({
            url: "https://hotphimvnzz.com/ajax/player",
            isEmbed: true,
            postBody: postBody,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
                "Referer": apiUrl
            }
        });
    } catch (e) {
        return JSON.stringify({ url: apiUrl, isEmbed: true });
    }
}

function parseEmbedResponse(html, url) {
    try {
        // Step 1: Handling /ajax/player response
        if (url.indexOf("/ajax/player") !== -1) {
            var ajaxJson = JSON.parse(html);
            if (!ajaxJson || !ajaxJson.status || !ajaxJson.message || !ajaxJson.message.data) {
                return "{}";
            }
            
            var streamLink = ajaxJson.message.data.server_ep_link;
            var streamType = ajaxJson.message.data.server_ep_type;
            if (!streamLink) return "{}";
            
            if (streamType === "embed") {
                var originMatch = streamLink.match(/^(https?:\/\/[^\/]+)/i);
                var embedBase = originMatch ? originMatch[1] : "https://cdn-1-hotp.com";
                var slug = streamLink.replace(embedBase, "").replace(/^\//, "");
                
                var playbackUrl = embedBase + "/api/get_playback.php?slug=" + encodeURIComponent(slug) + "&ts=" + Date.now();
                return JSON.stringify({
                    url: playbackUrl,
                    isEmbed: true,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
                        "Referer": streamLink
                    }
                });
            }
            
            var isEmbed = true;
            if (streamLink.indexOf(".m3u8") !== -1 || streamLink.indexOf(".mp4") !== -1) {
                isEmbed = false;
            }
            return JSON.stringify({
                url: streamLink,
                isEmbed: isEmbed,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
                    "Referer": "https://hotphimvnzz.com/"
                }
            });
        }
        
        // Step 2: Handling get_playback.php response
        if (url.indexOf("/get_playback.php") !== -1) {
            var pbJson = JSON.parse(html);
            if (pbJson && pbJson.hls) {
                var originMatch = url.match(/^(https?:\/\/[^\/]+)/i);
                var embedBase = originMatch ? originMatch[1] : "https://cdn-1-hotp.com";
                
                var subs = [];
                if (Array.isArray(pbJson.subtitles)) {
                    for (var i = 0; i < pbJson.subtitles.length; i++) {
                        var s = pbJson.subtitles[i];
                        var sUrl = s.url || "";
                        if (sUrl && sUrl.indexOf('http') === -1) {
                            sUrl = embedBase + (sUrl.indexOf('/') === 0 ? "" : "/") + sUrl;
                        }
                        subs.push({
                            url: sUrl,
                            lang: s.language || "vi"
                        });
                    }
                }
                
                return JSON.stringify({
                    url: pbJson.hls,
                    isEmbed: false,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
                        "Referer": embedBase + "/"
                    },
                    subtitles: subs
                });
            }
        }
    } catch (e) {}
    return "{}";
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
