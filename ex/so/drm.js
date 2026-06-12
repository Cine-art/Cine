// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "dramangan",
        "name": "DramaNgắn",
        "version": "1.0.0",
        "baseUrl": "https://dramangan.org",
        "iconUrl": "https://dramangan.org/static/images/favicon.png",
        "isEnabled": true,
        "type": "SHORT",
        "layoutType": "VERTICAL"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'the-loai-short/short-moi-cap-nhat', title: 'Mới Cập Nhật', type: 'Grid', path: 'the-loai-short' },
        { slug: 'the-loai-short/short-pd-tm', title: 'Thuyết Minh', type: 'Horizontal', path: 'the-loai-short' },
        { slug: 'the-loai-short/short-phude', title: 'Phụ Đề', type: 'Horizontal', path: 'the-loai-short' },
        { slug: 'the-loai-short/short-tong-tai', title: 'Tổng Tài', type: 'Horizontal', path: 'the-loai-short' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Mới Cập Nhật', slug: 'the-loai-short/short-moi-cap-nhat' },
        { name: 'Thuyết Minh', slug: 'the-loai-short/short-pd-tm' },
        { name: 'Phụ Đề', slug: 'the-loai-short/short-phude' },
        { name: 'Tổng Tài', slug: 'the-loai-short/short-tong-tai' },
        { name: 'Cổ Trang', slug: 'the-loai-short/short-co-trang' },
        { name: 'Lụy Tình', slug: 'the-loai-short/short-luy-tinh' },
        { name: 'Báo Thù', slug: 'the-loai-short/short-bao-thu' },
        { name: 'Xuyên Không', slug: 'the-loai-short/short-xuyen-khong' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [],
        category: [
            { name: 'Mới Cập Nhật', value: 'the-loai-short/short-moi-cap-nhat' },
            { name: 'Thuyết Minh', value: 'the-loai-short/short-pd-tm' },
            { name: 'Phụ Đề', value: 'the-loai-short/short-phude' },
            { name: 'Tổng Tài', value: 'the-loai-short/short-tong-tai' },
            { name: 'Công Sở', value: 'the-loai-short/short-cong-so' },
            { name: 'Lụy Tình', value: 'the-loai-short/short-luy-tinh' },
            { name: 'Báo Thù', value: 'the-loai-short/short-bao-thu' },
            { name: 'Cổ Trang', value: 'the-loai-short/short-co-trang' },
            { name: 'Xuyên Không', value: 'the-loai-short/short-xuyen-khong' },
            { name: 'Kết Hôn Bí Mật', value: 'the-loai-short/short-ket-hon-bi-mat' },
            { name: 'Đại Chiến Gia Tộc', value: 'the-loai-short/short-dai-chien-gia-toc' },
            { name: 'Tái Sinh', value: 'the-loai-short/short-tai-sinh' },
            { name: 'Gài Bẫy Hãm Hại', value: 'the-loai-short/short-gai-bay-ham-hai' },
            { name: 'Chiến Thần', value: 'the-loai-short/short-chien-than' },
            { name: 'Ảnh Hậu', value: 'the-loai-short/short-anh-hau' },
            { name: 'Tiểu Thư', value: 'the-loai-short/short-tieu-thu' },
            { name: 'Hài Nhẹ', value: 'the-loai-short/short-hai-nhe' },
            { name: 'Siêu Năng Lực', value: 'the-loai-short/short-sieu-nang-luc' },
            { name: 'Ngọt Sủng', value: 'the-loai-short/short-ngot-sung' },
            { name: 'Hậu Cung', value: 'the-loai-short/short-hau-cung' }
        ],
        country: []
    });
}

// =============================================================================
// URL GENERATION
// =============================================================================

function getUrlList(slug, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var activeSlug = slug || "the-loai-short/short-moi-cap-nhat";
        if (filters.category) {
            activeSlug = filters.category;
        }
        
        activeSlug = activeSlug.replace(/^\//, "").replace(/\/$/, "");
        return "https://dramangan.org/" + activeSlug;
    } catch (e) {
        return "https://dramangan.org/the-loai-short/short-moi-cap-nhat";
    }
}

function getUrlSearch(keyword, filtersJson) {
    return "https://dramangan.org/search?query=" + encodeURIComponent(keyword);
}

function getUrlDetail(slug) {
    if (!slug) return "";
    if (slug.indexOf("http") === 0) return slug;
    return "https://dramangan.org/vodwatch/" + slug.replace(/^\//, "");
}

function getUrlCategories() {
    return "https://dramangan.org";
}

function getUrlCountries() {
    return "https://dramangan.org";
}

function getUrlYears() {
    return "https://dramangan.org";
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
            // Skip Handlebars template placeholder blocks
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
                    quality: "HD",
                    lang: lang || "Thuyết Minh"
                });
                foundSlugs[slug] = true;
            }
        }

        // 1. Parse from HTML listing items
        var parts = html.split('class="listing__item"');
        if (parts.length === 1) {
            parts = html.split('listing__item');
        }
        for (var i = 1; i < parts.length; i++) {
            var itemHtml = parts[i];
            var endIdx = itemHtml.indexOf('</a>');
            if (endIdx !== -1) {
                itemHtml = itemHtml.substring(0, endIdx);
            }
            
            var hrefMatch = itemHtml.match(/href="([^"]+)"/i);
            if (!hrefMatch) continue;
            var href = hrefMatch[1];
            var slug = href.replace('https://dramangan.org', '')
                           .replace('/vodwatch/', '')
                           .replace('/smartphone/', '')
                           .replace(/^\//, '');
            
            var titleMatch = itemHtml.match(/title="([^"]+)"/i) || 
                             itemHtml.match(/alt="([^"]+)"/i);
            var title = titleMatch ? PluginUtils.cleanText(titleMatch[1]) : "";
            if (!title) {
                var textMatch = itemHtml.match(/class="item-title">([\s\S]*?)<\/div>/i);
                if (textMatch) title = PluginUtils.cleanText(textMatch[1]);
            }
            
            var imgMatch = itemHtml.match(/src="([^"]+)"/i) ||
                           itemHtml.match(/background-image:\s*url\(([^)]+)\)/i);
            var posterUrl = imgMatch ? imgMatch[1].replace(/['"]/g, "").trim() : "";
            if (posterUrl && posterUrl.indexOf('http') === -1) {
                if (posterUrl.indexOf('/') === 0) {
                    posterUrl = "https://dramangan.org" + posterUrl;
                } else {
                    posterUrl = "https://dramangan.org/" + posterUrl;
                }
            }
            
            var labelMatch = itemHtml.match(/class="adlabel"[^>]*>([\s\S]*?)<\/div>/i);
            var lang = labelMatch ? PluginUtils.cleanText(labelMatch[1]) : "Thuyết minh";
            
            var epMatch = itemHtml.match(/class="adlabel bottom"[^>]*>([\s\S]*?)<\/div>/i);
            var episode_current = epMatch ? PluginUtils.cleanText(epMatch[1]) : "Full";
            
            addItem(slug, title, posterUrl, episode_current, lang);
        }

        // 2. Parse from JSON-LD blocks
        var ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
        if (ldMatch) {
            for (var j = 0; j < ldMatch.length; j++) {
                try {
                    var ldContent = ldMatch[j].replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
                    var json = JSON.parse(ldContent);
                    if (json && json.itemListElement) {
                        for (var k = 0; k < json.itemListElement.length; k++) {
                            var el = json.itemListElement[k];
                            if (el.item && el.item.name) {
                                var name = el.item.name;
                                var url = el.item.url || "";
                                var slug = url.replace('https://dramangan.org', '')
                                              .replace('/vodwatch/', '')
                                              .replace('/smartphone/', '')
                                              .replace(/^\//, '');
                                var poster = el.item.thumbnailUrl || "";
                                var desc = el.item.description || "";
                                var lang = "Thuyết minh";
                                if (desc.toLowerCase().indexOf("vietsub") !== -1 && desc.toLowerCase().indexOf("thuyết minh") === -1) {
                                    lang = "Vietsub";
                                }
                                addItem(slug, name, poster, "Full", lang);
                            }
                        }
                    }
                } catch (e) {
                    // Ignore
                }
            }
        }

        return JSON.stringify({
            items: items,
            pagination: {
                currentPage: 1,
                totalPages: 1,
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
        var poster = "";
        var description = "";
        var genres = "";
        
        var ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
        if (ldMatch) {
            try {
                var json = JSON.parse(ldMatch[1]);
                if (json && json["@type"] === "VideoObject") {
                    title = json.name || "";
                    poster = json.thumbnailUrl || "";
                    description = json.description || "";
                    if (Array.isArray(json.genre)) {
                        genres = json.genre.join(", ");
                    }
                }
            } catch (e) {}
        }
        
        if (!title) {
            var titleMatch = html.match(/<h1[^>]*class\s*=\s*"?movie-title"?\s*[^>]*>([\s\S]*?)<\/h1>/i);
            title = titleMatch ? PluginUtils.cleanText(titleMatch[1]) : "Phim không tiêu đề";
        }
        if (!poster) {
            var imgMatch = html.match(/background-image\s*:\s*url\(([^)]+)\)/i);
            poster = imgMatch ? imgMatch[1].replace(/['"]/g, "").trim() : "";
        }
        if (!description) {
            var descMatch = html.match(/class\s*=\s*"?watch-short-text"?\s*[^>]*>([\s\S]*?)<\/div>/i);
            description = descMatch ? PluginUtils.cleanText(descMatch[1]) : "";
        }

        var episodes = [];
        var aRegex = /<a\s+([^>]+)>([\s\S]*?)<\/a>/gi;
        var aMatch;
        while ((aMatch = aRegex.exec(html)) !== null) {
            var attrs = aMatch[1];
            var name = PluginUtils.cleanText(aMatch[2]);
            
            if (attrs.indexOf('btn-episode') !== -1) {
                var hrefMatch = attrs.match(/href="([^"]*)"/i);
                var titleMatch = attrs.match(/title="([^"]*)"/i);
                
                if (hrefMatch) {
                    var href = hrefMatch[1];
                    var titleAttr = titleMatch ? titleMatch[1] : "";
                    
                    var epSlug = href.replace('https://dramangan.org', '')
                                     .replace('/vodwatch/', '')
                                     .replace('/smartphone/', '')
                                     .replace(/^\//, '');
                                     
                    episodes.push({
                        id: href,
                        name: name || titleAttr || "Tập",
                        slug: epSlug
                    });
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

        var ploptionMatch = html.match(/id\s*=\s*"?ploption"?\s*[^>]*>([\s\S]*?)<\/div>/i);
        var serverList = [];
        if (ploptionMatch) {
            var plHtml = ploptionMatch[1];
            var svRegex = /data-server="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
            var svMatch;
            while ((svMatch = svRegex.exec(plHtml)) !== null) {
                serverList.push({
                    key: svMatch[1],
                    name: PluginUtils.cleanText(svMatch[2])
                });
            }
        }
        
        if (serverList.length === 0) {
            serverList.push({ key: "vip1", name: "VIP 1" });
        }

        var servers = [];
        for (var s = 0; s < serverList.length; s++) {
            var sv = serverList[s];
            var svEpisodes = [];
            for (var e = 0; e < episodes.length; e++) {
                var ep = episodes[e];
                var epId = ep.id;
                if (epId.indexOf('?') === -1) {
                    epId += "?server=" + sv.key;
                } else {
                    epId += "&server=" + sv.key;
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

        return JSON.stringify({
            id: "",
            title: title,
            posterUrl: poster,
            backdropUrl: poster,
            description: description,
            servers: servers,
            category: genres || "Drama",
            status: "Full",
            quality: "HD",
            lang: "Thuyết Minh",
            director: "",
            casts: "",
            country: "Trung Quốc"
        });
    } catch (e) {
        return "null";
    }
}

function parseDetailResponse(html, apiUrl) {
    try {
        var serverKey = "vip1";
        if (apiUrl) {
            var keyMatch = apiUrl.match(/[?&]server=([^&]+)/i);
            if (keyMatch) {
                serverKey = keyMatch[1];
            }
        }
        
        var streamUrl = "";
        
        var btnRegex = new RegExp('data-server="' + serverKey + '"[^>]*data-value="([^"]+)"', 'i');
        var btnMatch = html.match(btnRegex);
        if (btnMatch) {
            streamUrl = btnMatch[1];
        }
        
        if (!streamUrl) {
            var ploptionMatch = html.match(/id\s*=\s*"?ploption"?\s*[^>]*>([\s\S]*?)<\/div>/i);
            if (ploptionMatch) {
                var valMatch = ploptionMatch[1].match(/data-value="([^"]+)"/i);
                if (valMatch) {
                    streamUrl = valMatch[1];
                }
            }
        }
        
        if (!streamUrl) {
            var iframeMatch = html.match(/<iframe[^>]*class\s*=\s*"?videoplayer[^>]*src="([^"]+)"/i) || 
                              html.match(/<iframe[^>]*src="([^"]+)"[^>]*class\s*=\s*"?videoplayer/i) ||
                              html.match(/<iframe[^>]*src="([^"]+)"/i);
            if (iframeMatch) {
                streamUrl = iframeMatch[1];
            }
        }
        
        if (!streamUrl) {
            var ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
            if (ldMatch) {
                try {
                    var json = JSON.parse(ldMatch[1]);
                    if (json && json.embedUrl) {
                        streamUrl = json.embedUrl;
                    }
                } catch (e) {}
            }
        }
        
        var realUrl = "";
        if (streamUrl) {
            var sMatch = streamUrl.match(/[?&]s=([^&]+)/i);
            if (sMatch) {
                var decoded = decodeURIComponent(sMatch[1]);
                if (decoded.indexOf('.m3u8') !== -1 || decoded.indexOf('.mp4') !== -1) {
                    realUrl = decoded;
                }
            }
            if (!realUrl) {
                if (streamUrl.indexOf('.m3u8') !== -1 || streamUrl.indexOf('.mp4') !== -1) {
                    realUrl = streamUrl;
                }
            }
        }
        
        if (realUrl && realUrl.indexOf('http') === -1 && realUrl.indexOf('//') === -1) {
            var originMatch = streamUrl.match(/^(https?:\/\/[^\/]+)/i);
            var origin = originMatch ? originMatch[1] : "https://costa.salesperyear.xyz";
            if (realUrl.indexOf('/') !== 0) {
                realUrl = origin + '/' + realUrl;
            } else {
                realUrl = origin + realUrl;
            }
        }
        
        var isEmbed = true;
        var finalUrl = streamUrl;
        if (realUrl) {
            finalUrl = realUrl;
            isEmbed = false;
        }
        
        return JSON.stringify({
            url: finalUrl,
            isEmbed: isEmbed,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
                "Referer": "https://dramangan.org/"
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
