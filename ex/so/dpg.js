// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "dongphimngan",
        "name": "Động Phim Ngắn",
        "version": "1.0.0",
        "baseUrl": "https://dongphimngan.com",
        "iconUrl": "https://dongphimngan.com/uploads/4260e165-e0c7-45e7-9ac1-6740b4f50510-pc.webp",
        "isEnabled": true,
        "type": "SHORT",
        "layoutType": "GRID"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'phim-bo', title: 'Phim Bộ / Series', type: 'Grid', path: 'phim-bo' },
        { slug: 'phim-le', title: 'Phim Lẻ / Movie', type: 'Grid', path: 'phim-le' },
        { slug: 'the-loai/ngot-sung', title: 'Phim Ngọt Sủng', type: 'Grid', path: 'the-loai' },
        { slug: 'the-loai/cuoi-truoc-yeu-sau', title: 'Phim Cưới Trước Yêu Sau', type: 'Grid', path: 'the-loai' },
        { slug: 'the-loai/va-mat-tra-nam', title: 'Phim Vả Mặt Tra Nam', type: 'Grid', path: 'the-loai' },
        { slug: 'the-loai/nu-cuong', title: 'Phim Nữ Cường', type: 'Grid', path: 'the-loai' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Ngọt Sủng', slug: 'the-loai/ngot-sung' },
        { name: 'Ngôn Tình', slug: 'the-loai/ngon-tinh' },
        { name: 'Chữa Lành', slug: 'the-loai/chua-lanh' },
        { name: 'Vả Mặt Tra Nam', slug: 'the-loai/va-mat-tra-nam' },
        { name: 'Cưới Trước Yêu Sau', slug: 'the-loai/cuoi-truoc-yeu-sau' },
        { name: 'Nữ Cường', slug: 'the-loai/nu-cuong' },
        { name: 'Vả Mặt', slug: 'the-loai/va-mat' },
        { name: 'Hào Môn', slug: 'the-loai/hao-mon' },
        { name: 'Hiện Đại', slug: 'the-loai/hien-dai' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [],
        category: [
            { name: 'Ngọt Sủng', value: 'the-loai/ngot-sung' },
            { name: 'Ngôn Tình', value: 'the-loai/ngon-tinh' },
            { name: 'Chữa Lành', value: 'the-loai/chua-lanh' },
            { name: 'Vả Mặt Tra Nam', value: 'the-loai/va-mat-tra-nam' },
            { name: 'Cưới Trước Yêu Sau', value: 'the-loai/cuoi-truoc-yeu-sau' },
            { name: 'Nữ Cường', value: 'the-loai/nu-cuong' },
            { name: 'Vả Mặt', value: 'the-loai/va-mat' },
            { name: 'Hào Môn', value: 'the-loai/hao-mon' },
            { name: 'Hiện Đại', value: 'the-loai/hien-dai' }
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
        var page = filters.page || 1;
        var activeSlug = slug || "phim-bo";
        if (filters.category) {
            activeSlug = filters.category;
        }
        
        activeSlug = activeSlug.replace(/^\//, "").replace(/\/$/, "");
        var url = "https://dongphimngan.com/" + activeSlug;
        if (page > 1) {
            url += "?page=" + page;
        }
        return url;
    } catch (e) {
        return "https://dongphimngan.com/phim-bo";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var url = "https://dongphimngan.com/api/search?q=" + encodeURIComponent(keyword);
        if (page > 1) {
            url += "&page=" + page;
        }
        return url;
    } catch (e) {
        return "https://dongphimngan.com/api/search?q=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (!slug) return "";
    if (slug.indexOf("http") === 0) {
        return slug;
    }
    
    var cleanSlug = slug.replace(/^\//, "");
    if (cleanSlug.indexOf("phim/") !== 0 && cleanSlug.indexOf("xem-phim/") !== 0) {
        cleanSlug = "phim/" + cleanSlug;
    }
    return "https://dongphimngan.com/" + cleanSlug;
}

function getUrlCategories() {
    return "https://dongphimngan.com";
}

function getUrlCountries() {
    return "https://dongphimngan.com";
}

function getUrlYears() {
    return "https://dongphimngan.com";
}

// =============================================================================
// UTILS & HELPERS
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
    },
    toSlug: function (str) {
        if (!str) return '';
        str = str.toLowerCase();
        str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
        str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
        str = str.replace(/[ìíịỉĩ]/g, 'i');
        str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
        str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
        str = str.replace(/[ỳýỵỷỹ]/g, 'y');
        str = str.replace(/đ/g, 'd');
        str = str.replace(/([^a-z0-9]+)/g, '-');
        str = str.replace(/^-+|-+$/g, '');
        return str;
    }
};

var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        try {
            return decodeURIComponent(escape(output));
        } catch(e) {
            return output;
        }
    }
};

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(html) {
    try {
        var items = [];
        var foundSlugs = {};
        
        var parts = html.split('href="/phim/');
        for (var i = 1; i < parts.length; i++) {
            var itemHtml = parts[i];
            var slugMatch = itemHtml.match(/^([^"'\s>]+)/);
            if (!slugMatch) continue;
            var slug = slugMatch[1];
            
            var titleMatch = itemHtml.match(/alt="([^"]+)"/i) || itemHtml.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
            var title = titleMatch ? PluginUtils.cleanText(titleMatch[1]) : "";
            
            // Skip cards without valid title (mostly duplicate button/carousel empty anchors)
            if (!title) continue;
            
            var imgMatch = itemHtml.match(/src="([^"]+)"/i);
            var posterUrl = imgMatch ? imgMatch[1].trim() : "";
            if (posterUrl && posterUrl.indexOf('http') === -1) {
                posterUrl = "https://dongphimngan.com" + (posterUrl.indexOf('/') === 0 ? "" : "/") + posterUrl;
            }
            
            // Extract badges inside the card
            var spanRegex = /<span[^>]*>([\s\S]*?)<\/span>/gi;
            var spanMatch;
            var spans = [];
            while (spanMatch = spanRegex.exec(itemHtml)) {
                var txt = PluginUtils.cleanText(spanMatch[1]);
                if (txt && txt.length < 25 && spans.indexOf(txt) === -1) {
                    spans.push(txt);
                }
            }
            
            var episode = "Full";
            var lang = "Vietsub";
            
            if (spans.length > 0) {
                var epSpans = [];
                var langSpans = [];
                for (var s = 0; s < spans.length; s++) {
                    var spanText = spans[s];
                    if (spanText.indexOf('tập') !== -1 || spanText.indexOf('Tập') !== -1 || spanText.indexOf('Trọn bộ') !== -1 || spanText.indexOf('Đang chiếu') !== -1) {
                        epSpans.push(spanText);
                    } else if (spanText.indexOf('P.Đ') !== -1 || spanText.indexOf('T.M') !== -1 || spanText.indexOf('P.Đề') !== -1 || spanText.indexOf('T.Minh') !== -1) {
                        langSpans.push(spanText);
                    }
                }
                
                if (epSpans.length > 0) {
                    episode = epSpans[0];
                } else if (spans[0] !== 'TOP 10' && spans[0] !== 'Hot' && !/^\d{4}$/.test(spans[0])) {
                    episode = spans[0];
                }
                
                var isDub = false;
                var isSub = false;
                for (var l = 0; l < langSpans.length; l++) {
                    var lText = langSpans[l];
                    if (lText.indexOf('T.M') !== -1 || lText.indexOf('T.Minh') !== -1) isDub = true;
                    if (lText.indexOf('P.Đ') !== -1 || lText.indexOf('P.Đề') !== -1) isSub = true;
                }
                
                if (isDub && isSub) {
                    lang = "Vietsub + Thuyết Minh";
                } else if (isDub) {
                    lang = "Thuyết Minh";
                } else {
                    lang = "Vietsub";
                }
            }
            
            if (!foundSlugs[slug]) {
                items.push({
                    id: slug,
                    title: title,
                    posterUrl: posterUrl,
                    backdropUrl: posterUrl,
                    episode_current: episode,
                    quality: "FHD",
                    lang: lang
                });
                foundSlugs[slug] = true;
            }
        }

        var currentPage = 1;
        var totalPages = 1;
        
        // Extract totalPages and page from Next.js payload inside script
        var totalPagesMatch = html.match(/"totalPages":\s*(\d+)/);
        if (totalPagesMatch) {
            totalPages = parseInt(totalPagesMatch[1], 10);
        }
        var pageMatch = html.match(/"page":\s*(\d+)/);
        if (pageMatch) {
            currentPage = parseInt(pageMatch[1], 10);
        }

        return JSON.stringify({
            items: items,
            pagination: {
                currentPage: currentPage,
                totalPages: totalPages,
                totalItems: items.length,
                itemsPerPage: items.length || 42
            }
        });
    } catch (e) {
        return JSON.stringify({ items: [], pagination: { currentPage: 1, totalPages: 1 } });
    }
}

function parseSearchResponse(jsonStr) {
    try {
        var parsed = JSON.parse(jsonStr);
        var items = [];
        if (parsed && parsed.movies) {
            for (var i = 0; i < parsed.movies.length; i++) {
                var m = parsed.movies[i];
                var poster = m.posterUrl || "";
                if (poster && poster.indexOf('http') === -1) {
                    poster = "https://dongphimngan.com" + (poster.indexOf('/') === 0 ? "" : "/") + poster;
                }
                
                var lang = "Vietsub";
                if (m.genres) {
                    var hasDub = false;
                    for (var g = 0; g < m.genres.length; g++) {
                        if (m.genres[g].indexOf('Thuyết Minh') !== -1) {
                            hasDub = true;
                            break;
                        }
                    }
                    if (hasDub) lang = "Vietsub + Thuyết Minh";
                }

                items.push({
                    id: m.slug,
                    title: m.title,
                    posterUrl: poster,
                    backdropUrl: poster,
                    episode_current: m.currentEpisode || "Full",
                    quality: m.quality || "FHD",
                    lang: lang
                });
            }
        }

        var currentPage = 1;
        var totalPages = 1;
        var totalItems = items.length;
        var limit = 42;

        if (parsed && parsed.pagination && parsed.pagination.movies) {
            var pag = parsed.pagination.movies;
            currentPage = pag.page || 1;
            totalPages = pag.pages || 1;
            totalItems = pag.total || totalItems;
            limit = pag.limit || limit;
        }

        return JSON.stringify({
            items: items,
            pagination: {
                currentPage: currentPage,
                totalPages: totalPages,
                totalItems: totalItems,
                itemsPerPage: limit
            }
        });
    } catch (e) {
        return JSON.stringify({ items: [], pagination: { currentPage: 1, totalPages: 1 } });
    }
}

function parseMovieDetail(html, movieUrl) {
    try {
        var title = "";
        var titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        if (titleMatch) {
            title = PluginUtils.cleanText(titleMatch[1]);
        }
        if (!title) {
            var titleTag = html.match(/<title>([\s\S]*?)<\/title>/i);
            title = titleTag ? PluginUtils.cleanText(titleTag[1].split('-')[0]) : "Phim";
        }
        
        var poster = "";
        var posterMatch = html.match(/<img[^>]+src="([^"]+)"[^>]+alt="[^"]*"/i) || 
                          html.match(/src="([^"]+)"[^>]+alt=/i);
        if (posterMatch) {
            poster = posterMatch[1].trim();
        }
        if (!poster || poster.indexOf('http') === -1) {
            var ogImage = html.match(/<meta property="og:image" content="([^"]+)"/i);
            poster = ogImage ? ogImage[1] : (poster || "");
        }
        if (poster && poster.indexOf('http') === -1) {
            poster = "https://dongphimngan.com" + (poster.indexOf('/') === 0 ? "" : "/") + poster;
        }

        var description = "";
        var metaDesc = html.match(/<meta name="description" content="([^"]+)"/i) || 
                       html.match(/<meta property="og:description" content="([^"]+)"/i);
        description = metaDesc ? PluginUtils.cleanText(metaDesc[1]) : "";

        var genres = [];
        var genreRegex = /href="\/the-loai\/([^"]+)"[^>]*>([^<]+)<\/a>/g;
        var genreMatch;
        while (genreMatch = genreRegex.exec(html)) {
            var gName = PluginUtils.cleanText(genreMatch[2]);
            if (gName && genres.indexOf(gName) === -1) {
                genres.push(gName);
            }
        }
        var genreStr = genres.join(", ") || "Phim Ngắn";

        var movieSlug = "";
        if (movieUrl) {
            var slugMatch = movieUrl.match(/\/phim\/([^/?#]+)/) || movieUrl.match(/\/xem-phim\/([^/?#]+)/);
            movieSlug = slugMatch ? slugMatch[1] : "";
        }
        if (!movieSlug) {
            var canonicalMatch = html.match(/link\s+href="https?:\/\/dongphimngan\.com\/phim\/([^"]+)"/i) ||
                                 html.match(/link\s+href="https?:\/\/dongphimngan\.com\/xem-phim\/([^"/]+)/i);
            movieSlug = canonicalMatch ? canonicalMatch[1] : "";
        }

        var isWatchPage = html.indexOf('chooseStreamingServer(this)') !== -1 || html.indexOf('initialSource') !== -1;
        var servers = [];

        if (isWatchPage) {
            var epIdx = html.indexOf('"episodes"');
            if (epIdx === -1) epIdx = html.indexOf('\\"episodes\\"');
            
            if (epIdx !== -1) {
                var bracketCount = 0;
                var jsonStart = html.indexOf('[', epIdx);
                var jsonEnd = -1;
                for (var i = jsonStart; i < html.length; i++) {
                    if (html[i] === '[') bracketCount++;
                    else if (html[i] === ']') {
                        bracketCount--;
                        if (bracketCount === 0) {
                            jsonEnd = i + 1;
                            break;
                        }
                    }
                }
                var jsonStr = html.substring(jsonStart, jsonEnd).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
                var episodesList = JSON.parse(jsonStr);

                var serverMap = {};
                episodesList.forEach(function(ep) {
                    if (ep.sources) {
                        ep.sources.forEach(function(src) {
                            var group = src.serverGroup || "VIETSUB";
                            var name = src.serverName || "1080";
                            var key = group + " - " + name;
                            if (!serverMap[key]) {
                                serverMap[key] = {
                                    group: group,
                                    name: name,
                                    episodes: []
                                };
                            }
                            
                            var qSlug = PluginUtils.toSlug(name);
                            var aSlug = PluginUtils.toSlug(group);
                            var epSlug = ep.slug || "1";
                            var epUrl = "https://dongphimngan.com/xem-phim/" + movieSlug + "/" + qSlug + "/" + aSlug + "/" + epSlug;
                            
                            epUrl += "?type=" + encodeURIComponent(src.type);
                            
                            serverMap[key].episodes.push({
                                id: epUrl,
                                name: ep.title || ("Tập " + ep.number),
                                slug: epSlug
                            });
                        });
                    }
                });

                for (var k in serverMap) {
                    servers.push({
                        name: k,
                        episodes: serverMap[k].episodes
                    });
                }
            }
        }
        
        if (servers.length === 0) {
            var watchMatch = html.match(/href="(\/xem-phim\/[^"]+)"/i);
            var watchUrl = watchMatch ? watchMatch[1] : "";
            if (watchUrl) {
                watchUrl = "https://dongphimngan.com" + watchUrl;
            } else {
                watchUrl = "https://dongphimngan.com/xem-phim/" + movieSlug + "/1080/vietsub/1";
            }
            
            servers.push({
                name: "VIP",
                episodes: [{
                    id: watchUrl,
                    name: "Xem Phim",
                    slug: movieSlug
                }]
            });
        }

        return JSON.stringify({
            id: movieSlug,
            title: title,
            posterUrl: poster,
            backdropUrl: poster,
            description: description,
            servers: servers,
            category: genreStr,
            status: "Full",
            quality: "FHD",
            lang: "Vietsub",
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
        var streamUrl = "";
        
        if (apiUrl) {
            var typeMatch = apiUrl.match(/[?&]type=([^&]+)/i);
            if (typeMatch) {
                var typeVal = decodeURIComponent(typeMatch[1]);
                if (typeVal.indexOf('http') === 0) {
                    streamUrl = typeVal;
                }
            }
        }
        
        if (!streamUrl) {
            var regex = /\\?"videoUrl\\?"\s*:\s*\\?"([^\\"]+)\\?"/i;
            var match = html.match(regex);
            if (match) {
                var base64Val = match[1];
                try {
                    streamUrl = Base64.decode(base64Val);
                } catch(e) {}
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
                "Referer": "https://dongphimngan.com/"
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
