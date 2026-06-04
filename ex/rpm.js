// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "rophimmoi",
        "name": "RoPhimMoi",
        "version": "1.0.0",
        "baseUrl": "https://www.rophimmoi.biz",
        "iconUrl": "https://www.rophimmoi.biz/wp-content/uploads/2025/10/cropped-vJqxy4F.png",
        "isEnabled": true,
        "type": "MOVIE",
        "layoutType": "VERTICAL"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'phan-loai-phim/phim-bo', title: 'Phim Bộ', type: 'Grid', path: 'phan-loai-phim' },
        { slug: 'phan-loai-phim/phim-le', title: 'Phim Lẻ', type: 'Horizontal', path: 'phan-loai-phim' },
        { slug: 'phan-loai-phim/phim-chieu-rap', title: 'Phim Chiếu Rạp', type: 'Horizontal', path: 'phan-loai-phim' },
        { slug: 'phan-loai-phim/hoat-hinh', title: 'Hoạt Hình - Anime', type: 'Horizontal', path: 'phan-loai-phim' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Phim Bộ', slug: 'phan-loai-phim/phim-bo' },
        { name: 'Phim Lẻ', slug: 'phan-loai-phim/phim-le' },
        { name: 'Phim Chiếu Rạp', slug: 'phan-loai-phim/phim-chieu-rap' },
        { name: 'Hoạt Hình - Anime', slug: 'phan-loai-phim/hoat-hinh' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [],
        category: [
            { name: 'Hành Động', value: 'the-loai-phim/hanh-dong' },
            { name: 'Phiêu Lưu', value: 'the-loai-phim/phieu-luu' },
            { name: 'Hài Hước', value: 'the-loai-phim/hai-huoc' },
            { name: 'Cổ Trang', value: 'the-loai-phim/co-trang' },
            { name: 'Tình Cảm', value: 'the-loai-phim/tinh-cam' },
            { name: 'Kinh Dị', value: 'the-loai-phim/kinh-di' },
            { name: 'Võ Thuật', value: 'the-loai-phim/vo-thuat' },
            { name: 'Viễn Tưởng', value: 'the-loai-phim/vien-tuong' },
            { name: 'Tâm Lý', value: 'the-loai-phim/tam-ly' },
            { name: 'Hình Sự', value: 'the-loai-phim/hinh-su' },
            { name: 'Học Đường', value: 'the-loai-phim/hoc-duong' },
            { name: 'Chiến Tranh', value: 'the-loai-phim/chien-tranh' },
            { name: 'Bí Ẩn', value: 'the-loai-phim/bi-an' },
            { name: 'Khoa Học', value: 'the-loai-phim/khoa-hoc' },
            { name: 'Thể Thao', value: 'the-loai-phim/the-thao' },
            { name: 'Gia Đình', value: 'the-loai-phim/gia-dinh' },
            { name: 'Âm Nhạc', value: 'the-loai-phim/am-nhac' },
            { name: 'Tài Liệu', value: 'the-loai-phim/tai-lieu' },
            { name: 'Chính Kịch', value: 'the-loai-phim/chinh-kich' },
            { name: 'Phim 18+', value: 'the-loai-phim/phim-18' }
        ],
        country: [
            { name: 'Âu Mỹ', value: 'quoc-gia-phim/au-my' },
            { name: 'Trung Quốc', value: 'quoc-gia-phim/trung-quoc' },
            { name: 'Hàn Quốc', value: 'quoc-gia-phim/han-quoc' },
            { name: 'Nhật Bản', value: 'quoc-gia-phim/nhat-ban' },
            { name: 'Thái Lan', value: 'quoc-gia-phim/thai-lan' },
            { name: 'Hồng Kông', value: 'quoc-gia-phim/hong-kong' },
            { name: 'Đài Loan', value: 'quoc-gia-phim/dai-loan' },
            { name: 'Ấn Độ', value: 'quoc-gia-phim/an-do' },
            { name: 'Quốc Gia Khác', value: 'quoc-gia-phim/quoc-gia-khac' }
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
        var baseUrl = "https://www.rophimmoi.biz";

        var activeSlug = slug || "phan-loai-phim/phim-bo";
        if (filters.category) {
            activeSlug = filters.category;
        } else if (filters.country) {
            activeSlug = filters.country;
        }
        
        // Normalize slug
        activeSlug = activeSlug.replace(/^\//, "").replace(/\/$/, "");
        
        var url = baseUrl + "/" + activeSlug + "/";
        if (page > 1) {
            url += "page/" + page + "/";
        }
        
        return url;
    } catch (e) {
        return "https://www.rophimmoi.biz/phan-loai-phim/phim-bo/";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var baseUrl = "https://www.rophimmoi.biz";
        
        var url = baseUrl + "/";
        if (page > 1) {
            url += "page/" + page + "/";
        }
        url += "?s=" + encodeURIComponent(keyword);
        return url;
    } catch (e) {
        return "https://www.rophimmoi.biz/?s=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (!slug) return "";
    if (slug.indexOf("http") === 0) return slug;
    
    var path = slug;
    if (path.indexOf("xemphim/") === -1) {
        path = "xemphim/" + path;
    }
    if (path.substring(path.length - 1) !== "/") {
        path += "/";
    }
    
    return "https://www.rophimmoi.biz/" + path.replace(/^\//, "");
}

function getUrlCategories() {
    return "https://www.rophimmoi.biz";
}

function getUrlCountries() {
    return "https://www.rophimmoi.biz";
}

function getUrlYears() {
    return "https://www.rophimmoi.biz";
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
        
        var parts = html.split('<div class="sw-item">');
        for (var i = 1; i < parts.length; i++) {
            var itemHtml = parts[i];
            
            var slug = "";
            var slugMatch = itemHtml.match(/href="([^"]*\/xemphim\/[^"]+)"/i);
            if (slugMatch) {
                slug = slugMatch[1].replace("https://www.rophimmoi.biz/", "").replace(/^\//, "");
            }
            if (!slug) continue;
            
            var title = "";
            var titleMatch = itemHtml.match(/<h4[^>]*class="item-title[^"]*"[^>]*><a[^>]*>([\s\S]*?)<\/a><\/h4>/i) ||
                             itemHtml.match(/alt="([^"]+)"/i);
            if (titleMatch) {
                title = PluginUtils.cleanText(titleMatch[1]);
            }
            
            var posterUrl = "";
            var imgMatch = itemHtml.match(/src="([^"]+)"/i) || 
                           itemHtml.match(/srcset="([^"]+)"/i);
            if (imgMatch) {
                posterUrl = imgMatch[1];
            }
            
            var episode_current = "Full";
            var epMatch = itemHtml.match(/<strong>([^<]+)<\/strong>/i) ||
                          itemHtml.match(/<div class="tag-small">([^<]+)<\/div>/i);
            if (epMatch) {
                episode_current = PluginUtils.cleanText(epMatch[1]);
            }
            
            if (!foundSlugs[slug]) {
                items.push({
                    id: slug,
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
        
        var currentMatch = html.match(/id="jump-page-input"[^>]+value="(\d+)"/i);
        if (currentMatch) {
            currentPage = parseInt(currentMatch[1], 10) || 1;
        }
        
        var totalMatch = html.match(/id="jump-page-input"[\s\S]*?<span>\/\s*(\d+)<\/span>/i);
        if (totalMatch) {
            totalPages = parseInt(totalMatch[1], 10) || 1;
        }
        
        return JSON.stringify({
            items: items,
            pagination: {
                currentPage: currentPage,
                totalPages: totalPages || 1,
                totalItems: items.length * totalPages,
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
        // Title: media-name H2
        var titleMatch = html.match(/<h2[^>]*class="[^"]*media-name[^"]*"[^>]*><a[^>]*>([\s\S]*?)<\/a><\/h2>/i) ||
                         html.match(/<h2[^>]*class="[^"]*media-name[^"]*"[^>]*>([\s\S]*?)<\/h2>/i) ||
                         html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        var title = titleMatch ? PluginUtils.cleanText(titleMatch[1]) : "Phim không tiêu đề";

        // Poster
        var posterMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) ||
                          html.match(/<img[^>]+class="[^"]*img-fluid[^"]*"[^>]+src="([^"]+)"/i) ||
                          html.match(/<img[^>]+src="([^"]+)"[^>]*class="[^"]*img-fluid[^"]*"/i);
        var poster = posterMatch ? posterMatch[1] : "";

        // Description
        var descMatch = html.match(/<div[^>]*class="description"[^>]*>([\s\S]*?)<\/div>/i);
        var description = descMatch ? PluginUtils.cleanText(descMatch[1]) : "";

        // Parsed fields
        var categories = "";
        var country = "";
        var duration = "";
        
        // Loop through all detail-line elements to extract metadata
        var detailLineRegex = /<div class="detail-line[^"]*">([\s\S]*?)<\/div>\s*<\/div>/gi;
        var match;
        while ((match = detailLineRegex.exec(html)) !== null) {
            var content = match[1];
            if (content.indexOf("Quốc gia:") !== -1) {
                var cMatch = content.match(/<div class="de-value">([\s\S]*?)$/i);
                if (cMatch) {
                    country = PluginUtils.cleanText(cMatch[1]);
                }
            } else if (content.indexOf("Thời lượng:") !== -1) {
                var dMatch = content.match(/<div class="de-value">([\s\S]*?)$/i);
                if (dMatch) {
                    duration = PluginUtils.cleanText(dMatch[1]);
                }
            } else if (content.indexOf("Tags:") !== -1) {
                var tMatch = content.match(/<div class="de-value">([\s\S]*?)$/i);
                if (tMatch) {
                    categories = PluginUtils.cleanText(tMatch[1]);
                }
            }
        }

        // Status
        var statusText = "HD";
        var statusMatch = html.match(/<div class="status[^"]*">([\s\S]*?)<\/div>/i);
        if (statusMatch) {
            var statusHtml = statusMatch[1];
            // Extract text from span
            var spanMatch = statusHtml.match(/<span>([\s\S]*?)<\/span>/i);
            if (spanMatch) {
                statusText = PluginUtils.cleanText(spanMatch[1]);
            }
        }

        // Parse Episodes
        var episodes = [];
        var tabEpsIdx = html.indexOf('id="tab-eps"');
        if (tabEpsIdx !== -1) {
            var nextBoxIdx = html.indexOf('class="child-box', tabEpsIdx + 100);
            var containerHtml = "";
            if (nextBoxIdx !== -1) {
                containerHtml = html.substring(tabEpsIdx, nextBoxIdx);
            } else {
                containerHtml = html.substring(tabEpsIdx);
            }
            
            // Loop and extract episodes
            // Format: <a class="item pd " href="https://www.rophimmoi.biz/xemphim/dao-hai-tac/tap-1-sv-0/">
            // And within the link structure, find: <div class="media-title lim-2 mb-0">1</div>
            var epRegex = /<a class="item pd\s*" href="([^"]+)">([\s\S]*?)<\/a>/gi;
            var epMatch;
            while ((epMatch = epRegex.exec(containerHtml)) !== null) {
                var epUrl = epMatch[1];
                var epInner = epMatch[2];
                
                var name = "Full";
                var nameMatch = epInner.match(/<div class="media-title[^"]*">([\s\S]*?)<\/div>/i);
                if (nameMatch) {
                    name = PluginUtils.cleanText(nameMatch[1]);
                }
                
                // Keep name formatting consistent
                if (/^\d+$/.test(name)) {
                    name = "Tập " + name;
                }
                
                episodes.push({
                    id: epUrl,
                    name: name,
                    slug: name.toLowerCase().replace("tập ", "")
                });
            }
        }

        // Fallback if no episodes are parsed in the list
        if (episodes.length === 0) {
            episodes.push({
                id: "",
                name: "Full",
                slug: "full"
            });
        }

        var servers = [{
            name: "Server RoPhimMoi",
            episodes: episodes
        }];

        return JSON.stringify({
            id: "",
            title: title,
            posterUrl: poster,
            backdropUrl: poster,
            description: description,
            servers: servers,
            category: categories || "Phim",
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
        var streamUrl = "";
        
        // Match chooseStreamingServer elements
        var serverRegex = /<a[^>]*chooseStreamingServer[\s\S]*?>([\s\S]*?)<\/a>/gi;
        var match;
        var firstEmbed = "";
        
        while ((match = serverRegex.exec(html)) !== null) {
            var tagHtml = match[0];
            var linkMatch = tagHtml.match(/data-link="([^"]+)"/i);
            var typeMatch = tagHtml.match(/data-type="([^"]+)"/i);
            
            if (linkMatch) {
                var link = linkMatch[1];
                var type = typeMatch ? typeMatch[1] : "";
                
                if (type === "m3u8" || link.indexOf(".m3u8") >= 0) {
                    streamUrl = link;
                    break;
                } else if (!firstEmbed && type === "embed") {
                    firstEmbed = link;
                }
            }
        }
        
        if (!streamUrl) {
            streamUrl = firstEmbed || apiUrl || "";
        }
        
        var isEmbed = (streamUrl.indexOf(".m3u8") === -1);
        
        return JSON.stringify({
            url: streamUrl,
            isEmbed: isEmbed,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Referer": "https://www.rophimmoi.biz/"
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
