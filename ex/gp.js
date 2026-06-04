// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "guphim",
        "name": "GuPhim",
        "version": "1.0.0",
        "baseUrl": "https://guphim.com",
        "iconUrl": "https://guphim.com/assets/icons/favicon-32x32.png",
        "isEnabled": true,
        "type": "MOVIE",
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'danh-muc/phim-moi', title: 'Mới Cập Nhật', type: 'Grid', path: 'danh-muc' },
        { slug: 'danh-muc/phim-bo', title: 'Phim Bộ', type: 'Horizontal', path: 'danh-muc' },
        { slug: 'danh-muc/phim-le', title: 'Phim Lẻ', type: 'Horizontal', path: 'danh-muc' },
        { slug: 'danh-muc/trending', title: 'Thịnh Hành', type: 'Horizontal', path: 'danh-muc' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Mới Cập Nhật', slug: 'danh-muc/phim-moi' },
        { name: 'Phim Bộ', slug: 'danh-muc/phim-bo' },
        { name: 'Phim Lẻ', slug: 'danh-muc/phim-le' },
        { name: 'Thịnh Hành', slug: 'danh-muc/trending' },
        { name: 'Phim Vietsub', slug: 'danh-muc/phim-vietsub' },
        { name: 'Phim Thuyết Minh', slug: 'danh-muc/phim-thuyet-minh' },
        { name: 'Sắp Chiếu', slug: 'danh-muc/phim-sap-chieu' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [],
        category: [
            { name: 'Hành Động', value: 'danh-muc-the-loai/hanh-dong' },
            { name: 'Tình Cảm', value: 'danh-muc-the-loai/tinh-cam' },
            { name: 'Hài Hước', value: 'danh-muc-the-loai/hai-huoc' },
            { name: 'Cổ Trang', value: 'danh-muc-the-loai/co-trang' },
            { name: 'Tâm Lý', value: 'danh-muc-the-loai/tam-ly' },
            { name: 'Hình Sự', value: 'danh-muc-the-loai/hinh-su' },
            { name: 'Chiến Tranh', value: 'danh-muc-the-loai/chien-tranh' },
            { name: 'Thể Thao', value: 'danh-muc-the-loai/the-thao' },
            { name: 'Võ Thuật', value: 'danh-muc-the-loai/vo-thuat' },
            { name: 'Viễn Tưởng', value: 'danh-muc-the-loai/vien-tuong' },
            { name: 'Phiêu Lưu', value: 'danh-muc-the-loai/phieu-luu' },
            { name: 'Khoa Học', value: 'danh-muc-the-loai/khoa-hoc' },
            { name: 'Kinh Dị', value: 'danh-muc-the-loai/kinh-di' },
            { name: 'Âm Nhạc', value: 'danh-muc-the-loai/am-nhac' },
            { name: 'Thần Thoại', value: 'danh-muc-the-loai/than-thoai' },
            { name: 'Tài Liệu', value: 'danh-muc-the-loai/tai-lieu' },
            { name: 'Gia Đình', value: 'danh-muc-the-loai/gia-dinh' },
            { name: 'Chính kịch', value: 'danh-muc-the-loai/chinh-kich' },
            { name: 'Bí ẩn', value: 'danh-muc-the-loai/bi-an' },
            { name: 'Học Đường', value: 'danh-muc-the-loai/hoc-duong' },
            { name: 'Kinh Điển', value: 'danh-muc-the-loai/kinh-dien' },
            { name: 'Hoạt Hình', value: 'danh-muc-the-loai/hoat-hinh' },
            { name: 'Hài', value: 'danh-muc-the-loai/phim-hai' },
            { name: 'Lãng Mạn', value: 'danh-muc-the-loai/lang-man' },
            { name: 'Khoa Học Viễn Tưởng', value: 'danh-muc-the-loai/khoa-hoc-vien-tuong' },
            { name: 'Gây Cấn', value: 'danh-muc-the-loai/gay-can' },
            { name: 'Miền Tây', value: 'danh-muc-the-loai/mien-tay' },
            { name: 'Phim 18+', value: 'danh-muc-the-loai/phim-18' }
        ],
        country: [
            { name: 'Trung Quốc', value: 'danh-muc-quoc-gia/trung-quoc' },
            { name: 'Hàn Quốc', value: 'danh-muc-quoc-gia/han-quoc' },
            { name: 'Thái Lan', value: 'danh-muc-quoc-gia/thai-lan' },
            { name: 'Âu Mỹ', value: 'danh-muc-quoc-gia/au-my' },
            { name: 'Nhật Bản', value: 'danh-muc-quoc-gia/nhat-ban' },
            { name: 'Đài Loan', value: 'danh-muc-quoc-gia/dai-loan' },
            { name: 'Hồng Kông', value: 'danh-muc-quoc-gia/hong-kong' },
            { name: 'Quốc Gia Khác', value: 'danh-muc-quoc-gia/quoc-gia-khac' }
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
        var baseUrl = "https://guphim.com";

        var activeSlug = slug || "danh-muc/phim-moi";
        if (filters.category) {
            activeSlug = filters.category;
        } else if (filters.country) {
            activeSlug = filters.country;
        }
        
        // Normalize slug
        activeSlug = activeSlug.replace(/^\//, "").replace(/\/$/, "");
        
        // Build final URL
        // Endpoint structure: /danh-muc/phim-le?page=2
        var url = baseUrl + "/" + activeSlug;
        if (page > 1) {
            url += "?page=" + page;
        }
        
        return url;
    } catch (e) {
        return "https://guphim.com/danh-muc/phim-moi";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var baseUrl = "https://guphim.com";
        
        // Search structure: /tu-khoa/[keyword]
        var url = baseUrl + "/tu-khoa/" + encodeURIComponent(keyword);
        if (page > 1) {
            url += "?page=" + page;
        }
        return url;
    } catch (e) {
        return "https://guphim.com/tu-khoa/" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (!slug) return "";
    if (slug.indexOf("http") === 0) return slug;
    
    var path = slug;
    if (path.indexOf("xem-phim-") === -1) {
        path = "xem-phim-" + path;
    }
    
    return "https://guphim.com/" + path.replace(/^\//, "");
}

function getUrlCategories() {
    return "https://guphim.com";
}

function getUrlCountries() {
    return "https://guphim.com";
}

function getUrlYears() {
    return "https://guphim.com";
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
        
        // Split by class="home__card" or class="card"
        var parts = [];
        if (html.indexOf('class="home__card"') !== -1) {
            parts = html.split('class="home__card"');
        } else if (html.indexOf('class="card"') !== -1) {
            parts = html.split('class="card"');
        } else if (html.indexOf('class="card ') !== -1) {
            parts = html.split('class="card ');
        } else {
            parts = html.split('home__card');
        }
        
        for (var i = 1; i < parts.length; i++) {
            var itemHtml = parts[i];
            
            var slug = "";
            var slugMatch = itemHtml.match(/href="\/xem-phim-([^"]+)"/i);
            if (slugMatch) {
                slug = slugMatch[1].trim();
            }
            if (!slug) continue;
            
            var title = "";
            var titleMatch = itemHtml.match(/data-alt="([^"]+)"/i) || 
                             itemHtml.match(/alt="([^"]+)"/i) ||
                             itemHtml.match(/data-tippy-content="([^"]+)"/i);
            if (titleMatch) {
                title = PluginUtils.cleanText(titleMatch[1]);
            }
            
            var posterUrl = "";
            var imgMatch = itemHtml.match(/src="([^"]+)"/i) || 
                           itemHtml.match(/data-src="([^"]+)"/i);
            if (imgMatch) {
                posterUrl = imgMatch[1];
                if (posterUrl.indexOf('http') === -1 && posterUrl.indexOf('/') === 0) {
                    posterUrl = 'https://guphim.com' + posterUrl;
                }
            }
            
            var episode_current = "HD";
            var epMatch = itemHtml.match(/<span[^>]*data-tippy-content="Trạng thái"[^>]*>([\s\S]*?)<\/span>/i) ||
                          itemHtml.match(/class="card__episode"[^>]*>([\s\S]*?)<\/span>/i) ||
                          itemHtml.match(/<span[^>]*class="card__episode"[^>]*>([\s\S]*?)<\/span>/i) ||
                          itemHtml.match(/class="card__episode">([^<]+)/i);
            if (epMatch) {
                episode_current = PluginUtils.cleanText(epMatch[1]);
            }
            
            if (!foundSlugs[slug]) {
                items.push({
                    id: 'xem-phim-' + slug,
                    title: title || "Phim không tiêu đề",
                    posterUrl: posterUrl,
                    backdropUrl: posterUrl,
                    episode_current: episode_current,
                    quality: "HD",
                    lang: "Vietsub"
                });
                foundSlugs[slug] = true;
            }
        }
        
        var currentPage = 1;
        var totalPages = 1;
        var limit = items.length || 24;
        
        var pageMatch = html.match(/class="pconfig[^"]*"[^>]+data-page="(\d+)"/i);
        if (pageMatch) {
            currentPage = parseInt(pageMatch[1], 10) || 1;
        }
        
        var totalMatch = html.match(/class="pconfig[^"]*"[^>]+data-totalp="(\d+)"/i);
        if (totalMatch) {
            totalPages = parseInt(totalMatch[1], 10) || 1;
        }
        
        var limitMatch = html.match(/class="pconfig[^"]*"[^>]+data-limit="(\d+)"/i);
        if (limitMatch) {
            limit = parseInt(limitMatch[1], 10) || items.length || 24;
        }
        
        return JSON.stringify({
            items: items,
            pagination: {
                currentPage: currentPage,
                totalPages: totalPages || 1,
                totalItems: limit * totalPages,
                itemsPerPage: limit
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
        // Title
        var titleMatch = html.match(/<h1[^>]*class="[^"]*mb-0[^"]*"[^>]*>([\s\S]*?)<\/h1>/i) ||
                         html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        var title = titleMatch ? PluginUtils.cleanText(titleMatch[1]) : "Phim không tiêu đề";

        // Poster
        var poster = "";
        var imgBlockMatch = html.match(/<div class="list-img[^"]*">([\s\S]*?)<\/div>/i);
        if (imgBlockMatch) {
            var imgMatch = imgBlockMatch[1].match(/(?:src|data-src)="([^"]+)"/i);
            if (imgMatch) {
                poster = imgMatch[1];
                if (poster.indexOf('http') === -1) {
                    poster = 'https://guphim.com' + poster;
                }
            }
        }

        // Description
        var description = "";
        var descMatch = html.match(/<li[^>]*class="[^"]*head-content[^"]*"[^>]*>([\s\S]*?)<\/li>/i);
        if (descMatch) {
            description = PluginUtils.cleanText(descMatch[1]);
        }

        // Genres & Country & Status
        var genres = "";
        var country = "";
        var statusText = "HD";
        
        var liRegex = /<li[^>]*>([\s\S]*?)(?=<li[^>]*>|<\/ul>|$)/gi;
        var liMatch;
        while ((liMatch = liRegex.exec(html)) !== null) {
            var liContent = liMatch[1];
            if (liContent.indexOf('Thể loại:') !== -1) {
                genres = liContent.replace(/<[^>]*>/g, '').replace('Thể loại:', '').replace(/\s+/g, ' ').trim();
            } else if (liContent.indexOf('Quốc gia:') !== -1) {
                country = liContent.replace(/<[^>]*>/g, '').replace('Quốc gia:', '').replace(/\s+/g, ' ').trim();
            } else if (liContent.indexOf('Trạng thái:') !== -1) {
                statusText = liContent.replace(/<[^>]*>/g, '').replace('Trạng thái:', '').replace(/\s+/g, ' ').trim();
            }
        }

        // Parse Episodes
        var servers = [];
        var serverParts = html.split('class="board-server');
        for (var s = 1; s < serverParts.length; s++) {
            var serverHtml = serverParts[s];
            
            var srcMatch = serverHtml.match(/data-src="([^"]+)"/i) || 
                           serverHtml.match(/data-sv="([^"]+)"/i);
            var serverName = srcMatch ? "Server " + srcMatch[1].toUpperCase() : "Server VIP";
            
            var serverEpisodes = [];
            var aRegex = /<a[^>]+class="board-item[^"]*"[^>]*>([\s\S]*?)<\/a>/gi;
            var aMatch;
            while ((aMatch = aRegex.exec(serverHtml)) !== null) {
                var tagHtml = aMatch[0];
                var hrefM = tagHtml.match(/href="([^"]+)"/i);
                var epM = tagHtml.match(/data-ep="([^"]+)"/i);
                var slugM = tagHtml.match(/data-ep_slug="([^"]*)"/i);
                var epName = aMatch[1].trim();
                
                if (hrefM && epM) {
                    var href = hrefM[1];
                    var epHash = epM[1];
                    var epSlug = slugM ? slugM[1] : "";
                    
                    var slug = href.replace('https://guphim.com', '').replace(/^\//, '').split('xem-phim-')[1];
                    var apiUrl = 'https://guphim.com/api/v1/link/' + slug + '?e=' + epHash;
                    
                    var dispName = epName ? "Tập " + epName : "Tập " + epSlug;
                    if (dispName === "Tập " || dispName === "Tập 0" || epSlug === "") dispName = "Full";
                    
                    serverEpisodes.push({
                        id: apiUrl,
                        name: dispName,
                        slug: epSlug || epName || "full"
                    });
                }
            }
            
            if (serverEpisodes.length > 0) {
                servers.push({
                    name: serverName,
                    episodes: serverEpisodes
                });
            }
        }

        // Fallback if no episodes are parsed in the list
        if (servers.length === 0) {
            servers.push({
                name: "Server VIP",
                episodes: [{
                    id: "",
                    name: "Full",
                    slug: "full"
                }]
            });
        }

        return JSON.stringify({
            id: "",
            title: title,
            posterUrl: poster,
            backdropUrl: poster,
            description: description,
            servers: servers,
            category: genres || "Phim",
            status: statusText,
            quality: "HD",
            lang: "Vietsub",
            director: "",
            casts: "",
            country: country || "Chưa rõ"
        });
    } catch (e) {
        return "null";
    }
}

function parseDetailResponse(html, apiUrl) {
    try {
        var data = JSON.parse(html);
        var streamUrl = data.link_m3u8 || data.link_embed || "";
        
        var isEmbed = (streamUrl.indexOf(".m3u8") === -1);
        
        return JSON.stringify({
            url: streamUrl,
            isEmbed: isEmbed,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Referer": "https://guphim.com/"
            },
            subtitles: []
        });
    } catch (e) {
        return JSON.stringify({ url: apiUrl, headers: {}, subtitles: [] });
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
