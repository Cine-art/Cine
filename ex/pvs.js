// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "phimvietsub",
        "name": "PhimVietsub",
        "version": "1.0.0",
        "baseUrl": "https://phimvietsub.run",
        "iconUrl": "https://phimvietsub.run/favicon.ico",
        "isEnabled": true,
        "type": "MOVIE",
        "layoutType": "GRID"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: '', title: 'Phim Mới Cập Nhật', type: 'Grid', path: '' },
        { slug: 'danh-sach/phim-bo', title: 'Phim Bộ Mới', type: 'Grid', path: 'danh-sach/phim-bo' },
        { slug: 'danh-sach/phim-le', title: 'Phim Lẻ Mới', type: 'Grid', path: 'danh-sach/phim-le' },
        { slug: 'the-loai/hoat-hinh', title: 'Hoạt Hình', type: 'Grid', path: 'the-loai/hoat-hinh' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Phim Bộ', slug: 'danh-sach/phim-bo' },
        { name: 'Phim Lẻ', slug: 'danh-sach/phim-le' },
        { name: 'Hoạt Hình', slug: 'the-loai/hoat-hinh' },
        { name: 'Phim Ngắn', slug: 'the-loai/phim-ngan' },
        { name: 'Hành Động', slug: 'the-loai/hanh-dong' },
        { name: 'Cổ Trang', slug: 'the-loai/co-trang' },
        { name: 'Tình Cảm', slug: 'the-loai/tinh-cam' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [],
        category: [
            { name: 'Hành Động', value: 'the-loai/hanh-dong' },
            { name: 'Thần Thoại', value: 'the-loai/than-thoai' },
            { name: 'Phim Ngắn', value: 'the-loai/phim-ngan' },
            { name: 'Khoa Học Viễn Tưởng', value: 'the-loai/khoa-hoc-vien-tuong' },
            { name: 'Giả Tưởng', value: 'the-loai/gia-tuong' },
            { name: 'Lịch Sử', value: 'the-loai/lich-su' },
            { name: 'Khoa Học', value: 'the-loai/khoa-hoc' },
            { name: 'Gây Cấn', value: 'the-loai/gay-can' },
            { name: 'Phim Hài', value: 'the-loai/phim-hai' },
            { name: 'Phim 18+', value: 'the-loai/phim-18' },
            { name: 'Lãng Mạn', value: 'the-loai/lang-man' },
            { name: 'Thể Thao', value: 'the-loai/the-thao' },
            { name: 'Âm Nhạc', value: 'the-loai/am-nhac' },
            { name: 'Bí ẩn', value: 'the-loai/bi-an' },
            { name: 'Viễn Tưởng', value: 'the-loai/vien-tuong' },
            { name: 'Học Đường', value: 'the-loai/hoc-duong' },
            { name: 'Tài Liệu', value: 'the-loai/tai-lieu' },
            { name: 'Võ Thuật', value: 'the-loai/vo-thuat' },
            { name: 'Hình Sự', value: 'the-loai/hinh-su' },
            { name: 'Cổ Trang', value: 'the-loai/co-trang' },
            { name: 'TV Shows', value: 'the-loai/tv-shows' },
            { name: 'Tình Cảm', value: 'the-loai/tinh-cam' },
            { name: 'Chiến Tranh', value: 'the-loai/chien-tranh' },
            { name: 'Gia Đình', value: 'the-loai/gia-dinh' },
            { name: 'Phiêu Lưu', value: 'the-loai/phieu-luu' },
            { name: 'Tâm Lý', value: 'the-loai/tam-ly' },
            { name: 'Kinh Dị', value: 'the-loai/kinh-di' },
            { name: 'Chính kịch', value: 'the-loai/chinh-kich' },
            { name: 'Hài Hước', value: 'the-loai/hai-huoc' },
            { name: 'Kinh Điển', value: 'the-loai/kinh-dien' }
        ],
        country: [
            { name: 'Trung Quốc', value: 'quoc-gia/trung-quoc' },
            { name: 'Hàn Quốc', value: 'quoc-gia/han-quoc' },
            { name: 'Thái Lan', value: 'quoc-gia/thai-lan' },
            { name: 'Nhật Bản', value: 'quoc-gia/nhat-ban' },
            { name: 'Âu Mỹ', value: 'quoc-gia/au-my' },
            { name: 'Đài Loan', value: 'quoc-gia/dai-loan' },
            { name: 'Hồng Kông', value: 'quoc-gia/hong-kong' },
            { name: 'Anh', value: 'quoc-gia/anh' },
            { name: 'Malaysia', value: 'quoc-gia/malaysia' },
            { name: 'Indonesia', value: 'quoc-gia/indonesia' },
            { name: 'Philippines', value: 'quoc-gia/philippines' },
            { name: 'Thổ Nhĩ Kỳ', value: 'quoc-gia/tho-nhi-ky' },
            { name: 'Bồ Đào Nha', value: 'quoc-gia/bo-dao-nha' }
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
        var activeSlug = slug || "";
        if (filters.category) {
            activeSlug = filters.category;
        } else if (filters.country) {
            activeSlug = filters.country;
        }
        
        activeSlug = activeSlug.replace(/^\//, "").replace(/\/$/, "");
        var url = "https://phimvietsub.run/";
        if (activeSlug) {
            url += activeSlug;
        }
        if (page > 1) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + "page=" + page;
        }
        return url;
    } catch (e) {
        return "https://phimvietsub.run/";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var url = "https://phimvietsub.run/?search=" + encodeURIComponent(keyword);
        if (page > 1) {
            url += "&page=" + page;
        }
        return url;
    } catch (e) {
        return "https://phimvietsub.run/?search=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (!slug) return "";
    if (slug.indexOf("http") === 0) {
        return slug;
    }
    var cleanSlug = slug.replace(/^\//, "");
    return "https://phimvietsub.run/" + cleanSlug;
}

function getUrlCategories() {
    return "https://phimvietsub.run";
}

function getUrlCountries() {
    return "https://phimvietsub.run";
}

function getUrlYears() {
    return "https://phimvietsub.run";
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
        
        function addItem(slug, title, poster, episode) {
            if (!slug) return;
            slug = slug.trim();
            if (slug.indexOf('{{') !== -1 || (title && title.indexOf('{{') !== -1)) {
                return;
            }
            
            slug = slug.replace('https://phimvietsub.run/', '').replace(/^\//, '');
            
            if (!foundSlugs[slug]) {
                var itemObj = {
                    id: slug,
                    title: title || slug.replace(/-\d+$/, '').replace(/-/g, ' '),
                    posterUrl: poster,
                    backdropUrl: poster,
                    episode_current: episode || "Full",
                    quality: "HD",
                    lang: "Vietsub"
                };
                if (!title) {
                    itemObj.title = itemObj.title.substring(0, 1).toUpperCase() + itemObj.title.substring(1);
                }
                items.push(itemObj);
                foundSlugs[slug] = itemObj;
            } else {
                var existingItem = foundSlugs[slug];
                if (title && (!existingItem.title || existingItem.title.toLowerCase() === slug.replace(/-\d+$/, '').replace(/-/g, ' '))) {
                    existingItem.title = title;
                }
                if (poster && !existingItem.posterUrl) {
                    existingItem.posterUrl = poster;
                    existingItem.backdropUrl = poster;
                }
                if (episode && (!existingItem.episode_current || existingItem.episode_current === "Full")) {
                    existingItem.episode_current = episode;
                }
            }
        }

        var parts = html.split('href="https://phimvietsub.run/');
        for (var i = 1; i < parts.length; i++) {
            var itemHtml = parts[i];
            var slugMatch = itemHtml.match(/^([^"'\s>]+)/);
            if (!slugMatch) continue;
            var slug = slugMatch[1];
            
            if (slug.indexOf('the-loai') === 0 || 
                slug.indexOf('quoc-gia') === 0 || 
                slug.indexOf('danh-sach') === 0 || 
                slug.indexOf('dao-dien') === 0 ||
                slug.indexOf('dien-vien') === 0) {
                continue;
            }
            
            var isMovieLink = /-\d+$/.test(slug);
            if (!isMovieLink) continue;
            
            var title = "";
            var titleClassMatch = itemHtml.match(/class="splide__item-title"[^>]*>([\s\S]*?)<\/div>/i) ||
                                  itemHtml.match(/class="crs-content__title"[^>]*>[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/i) ||
                                  itemHtml.match(/class="item-title"[^>]*>([\s\S]*?)<\/a>/i) ||
                                  itemHtml.match(/class="item-title"[^>]*>([\s\S]*?)<\/div>/i) ||
                                  itemHtml.match(/class="item-title"[^>]*>([\s\S]*?)<\/h2>/i);
            if (titleClassMatch) {
                title = PluginUtils.cleanText(titleClassMatch[1]);
            }
            
            if (!title) {
                var altMatch = itemHtml.match(/title="([^"]+)"/i) || itemHtml.match(/alt="([^"]+)"/i);
                if (altMatch) {
                    var tempTitle = PluginUtils.cleanText(altMatch[1]);
                    if (tempTitle !== "Slider" && tempTitle !== "Thumb" && tempTitle !== "Poster" && tempTitle !== "Banner") {
                        title = tempTitle;
                    }
                }
            }
            
            if (title && title.indexOf('Phim ') === 0) {
                title = title.substring(5);
            }
            
            var imgMatch = itemHtml.match(/src="([^"]+)"/i) || itemHtml.match(/data-src="([^"]+)"/i);
            var posterUrl = imgMatch ? imgMatch[1].trim() : "";
            
            var badgeMatch = itemHtml.match(/class="top">([\s\S]*?)<\/div>/i) || 
                             itemHtml.match(/class="episodes">([^<]+)<\/div>/i) ||
                             itemHtml.match(/class="update-info-mask">([^<]+)<\/div>/i) ||
                             itemHtml.match(/class="update-info-mask">([\s\S]*?)<\/div>/i);
            var badge = badgeMatch ? PluginUtils.cleanText(badgeMatch[1]) : "";
            
            addItem(slug, title, posterUrl, badge);
        }

        var currentPage = 1;
        var totalPages = 1;
        var pagBlockMatch = html.match(/class="list-item pagination"([\s\S]*?)<\/nav>/i) ||
                            html.match(/class="wp-pagenavi"([\s\S]*?)<\/nav>/i);
        if (pagBlockMatch) {
            var pagHtml = pagBlockMatch[1];
            var currentMatch = pagHtml.match(/class="page-item active"[^>]*>[\s\S]*?>(\d+)<\/a>/i) ||
                               pagHtml.match(/class="active"[^>]*>[\s\S]*?>(\d+)<\/a>/i);
            if (currentMatch) {
                currentPage = parseInt(currentMatch[1]);
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
        var titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) ||
                         html.match(/class="banner-content__title"[^>]*>[\s\S]*?<h1[^>]*>([\s\S]*?)<\/h1>/i);
        if (titleMatch) {
            title = PluginUtils.cleanText(titleMatch[1]);
        }
        
        var originName = "";
        var topMatch = html.match(/class="banner-content__top"[^>]*>[\s\S]*?<\/div>([\s\S]*?)<\/span>/i);
        if (topMatch) {
            originName = PluginUtils.cleanText(topMatch[1]);
        }
        
        var poster = "";
        var posterMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
        if (posterMatch) {
            poster = posterMatch[1].trim();
        }
        
        var description = "";
        var descMatch = html.match(/class="banner-content__desc[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
        if (descMatch) {
            description = PluginUtils.cleanText(descMatch[1]).replace(/^Giới thiệu:\s*/i, '');
        }
        if (!description) {
            var metaDesc = html.match(/<meta name="description" content="([^"]+)"/i) || 
                           html.match(/<meta property="og:description" content="([^"]+)"/i);
            description = metaDesc ? PluginUtils.cleanText(metaDesc[1]).replace(/^Giới thiệu:\s*/i, '') : "";
        }
        
        var genres = [];
        var tagRegex = /<span class="type-style"[^>]*>([\s\S]*?)<\/span>/gi;
        var tagMatch;
        while (tagMatch = tagRegex.exec(html)) {
            var val = PluginUtils.cleanText(tagMatch[1]);
            if (val && val !== "Vietsub + TM" && val !== "Thuyết minh" && val !== "Vietsub" && val.indexOf('Phim') !== 0) {
                genres.push(val);
            }
        }
        var genreStr = genres.join(", ") || "Phim";
        
        var country = "Trung Quốc";
        var focusBlockMatch = html.match(/class="focus-info-tag type"([\s\S]*?)<\/div>/i);
        if (focusBlockMatch) {
            var focusHtml = focusBlockMatch[1];
            var countryMatch = focusHtml.match(/href="[^"]*quoc-gia\/([^"]+)"[^>]*>[\s\S]*?class="type-style"[^>]*>([^<]+)/i) ||
                               focusHtml.match(/href="[^"]*quoc-gia\/([^"]+)"[^>]*>([^<]+)/i);
            if (countryMatch) {
                country = PluginUtils.cleanText(countryMatch[2]);
            }
        }
        
        var status = "Hoàn thành";
        var statusMatch = html.match(/class="top"[^>]*>([\s\S]*?)<\/div>/i);
        if (statusMatch) {
            status = PluginUtils.cleanText(statusMatch[1]);
        }
        
        var tabNames = {};
        var tabRegex = /<button[^>]*data-bs-target="#pills-firm-(\d+)"[^>]*>([\s\S]*?)<\/button>/gi;
        var match;
        while (match = tabRegex.exec(html)) {
            var id = match[1];
            var name = match[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
            tabNames[id] = name;
        }
        
        var tabRegex2 = /<a[^>]*href="#pills-firm-(\d+)"[^>]*>([\s\S]*?)<\/a>/gi;
        while (match = tabRegex2.exec(html)) {
            var id = match[1];
            var name = match[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
            tabNames[id] = name;
        }
        
        var servers = [];
        var panes = html.split('id="pills-firm-');
        for (var i = 1; i < panes.length; i++) {
            var paneHtml = panes[i];
            var idMatch = paneHtml.match(/^(\d+)/);
            if (!idMatch) continue;
            var paneId = idMatch[1];
            var serverName = tabNames[paneId];
            if (!serverName) continue;
            
            var episodes = [];
            var epRegex = /href="https:\/\/phimvietsub\.run\/([^"]+)"[\s\S]*?video-item-name[^>]*>([\s\S]*?)<\/div>/gi;
            var epMatch;
            var seenEpUrls = {};
            while (epMatch = epRegex.exec(paneHtml)) {
                var epUrl = epMatch[1];
                var epName = PluginUtils.cleanText(epMatch[2]);
                
                if (title && epName.indexOf(title) === 0) {
                    epName = epName.substring(title.length).replace(/^[-\s:|]+/, '').trim();
                }
                
                if (!seenEpUrls[epUrl]) {
                    episodes.push({
                        id: 'https://phimvietsub.run/' + epUrl,
                        name: epName || "Tập",
                        slug: epUrl
                    });
                    seenEpUrls[epUrl] = true;
                }
            }
            
            episodes.reverse();
            
            if (episodes.length > 0) {
                servers.push({
                    name: serverName,
                    episodes: episodes
                });
            }
        }
        
        if (servers.length === 0) {
            var singleEpMatch = html.match(/href="(https:\/\/phimvietsub\.run\/[^"]+\/tap-[^"]+)"[^>]*class="[^"]*btn-s[^"]*"/i) ||
                                html.match(/class="[^"]*btn-s[^"]*"[^>]*href="(https:\/\/phimvietsub\.run\/[^"]+\/tap-[^"]+)"/i) ||
                                html.match(/href="(https:\/\/phimvietsub\.run\/[^"]+\/tap-[^"]+)"/i);
            if (singleEpMatch) {
                var epUrl = singleEpMatch[1];
                var epSlug = epUrl.replace('https://phimvietsub.run/', '');
                servers.push({
                    name: "Mặc định",
                    episodes: [{
                        id: epUrl,
                        name: "Xem Phim",
                        slug: epSlug
                    }]
                });
            }
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
            quality: "HD",
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
        var epIdMatch = apiUrl.match(/tap-\d+-(\d+)/) || apiUrl.match(/-(\d+)/);
        var targetId = epIdMatch ? epIdMatch[1] : "";
        
        var streamUrl = "";
        var isEmbed = true;
        
        var parts = html.split('chooseStreamingServer(this)');
        for (var i = 1; i < parts.length; i++) {
            var part = parts[i];
            var idMatch = part.match(/data-id="([^"]*)"/i);
            var id = idMatch ? idMatch[1] : "";
            
            if (id && id === targetId) {
                var linkMatch = part.match(/data-link="([^"]*)"/i);
                if (linkMatch) {
                    streamUrl = linkMatch[1];
                    var typeMatch = part.match(/data-type="([^"]*)"/i);
                    var type = typeMatch ? typeMatch[1] : "";
                    isEmbed = (type !== 'm3u8' && type !== 'mp4');
                    break;
                }
            }
        }
        
        if (!streamUrl) {
            for (var i = 1; i < parts.length; i++) {
                var part = parts[i];
                var linkMatch = part.match(/data-link="([^"]*)"/i);
                if (linkMatch && linkMatch[1]) {
                    streamUrl = linkMatch[1];
                    var typeMatch = part.match(/data-type="([^"]*)"/i);
                    var type = typeMatch ? typeMatch[1] : "";
                    isEmbed = (type !== 'm3u8' && type !== 'mp4');
                    break;
                }
            }
        }
        
        if (!streamUrl) {
            var m3u8Match = html.match(/"(https?:\/\/[^"]+\.m3u8[^"]*)"/i) || 
                            html.match(/'(https?:\/\/[^']+\.m3u8[^']*)'/i);
            if (m3u8Match) {
                streamUrl = m3u8Match[1];
                isEmbed = false;
            }
        }
        
        return JSON.stringify({
            url: streamUrl || apiUrl,
            isEmbed: isEmbed,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
                "Referer": "https://phimvietsub.run/"
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
