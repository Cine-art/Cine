// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "phimtv",
        "name": "PhimTV",
        "version": "1.0.0",
        "baseUrl": "https://phimtv.cv",
        "iconUrl": "https://phimtv.cv/1day2love/favicon.png",
        "isEnabled": true,
        "type": "MOVIE",
        "layoutType": "VERTICAL"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'vod/phim-moi', title: 'Phim Mới Cập Nhật', type: 'Grid', path: 'vod' },
        { slug: 'vod/phim-bo', title: 'Phim Bộ', type: 'Horizontal', path: 'vod' },
        { slug: 'vod/phim-le', title: 'Phim Lẻ', type: 'Horizontal', path: 'vod' },
        { slug: 'vod/phim-chieu-rap', title: 'Phim Chiếu Rạp', type: 'Horizontal', path: 'vod' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Phim Mới', slug: 'vod/phim-moi' },
        { name: 'Phim Lẻ', slug: 'vod/phim-le' },
        { name: 'Phim Bộ', slug: 'vod/phim-bo' },
        { name: 'Phim Chiếu Rạp', slug: 'vod/phim-chieu-rap' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [],
        category: [
            { name: 'Hành Động', value: 'genre/hanh-dong' },
            { name: 'Võ Thuật', value: 'genre/vo-thuat' },
            { name: 'Tình Cảm', value: 'genre/tinh-cam' },
            { name: 'Hoạt Hình', value: 'genre/hoat-hinh' },
            { name: 'Hài Hước', value: 'genre/hai-huoc' },
            { name: 'Viễn Tưởng', value: 'genre/vien-tuong' },
            { name: 'Kinh Dị', value: 'genre/kinh-di' }
        ],
        country: [
            { name: 'Hàn Quốc', value: 'country/han-quoc' },
            { name: 'Trung Quốc', value: 'country/trung-quoc' },
            { name: 'Nhật Bản', value: 'country/nhat-ban' },
            { name: 'Âu Mỹ', value: 'country/au-my' },
            { name: 'Thái Lan', value: 'country/thai-lan' }
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
        var baseUrl = "https://phimtv.cv";

        var activeSlug = slug || "vod/phim-moi";
        if (filters.category) {
            activeSlug = filters.category;
        } else if (filters.country) {
            activeSlug = filters.country;
        } else if (filters.year) {
            activeSlug = filters.year;
        }
        
        activeSlug = activeSlug.replace(/^\//, "");
        
        var url = baseUrl + "/" + activeSlug;
        if (page > 1) {
            url += "?page=" + page;
        }
        
        return url;
    } catch (e) {
        return "https://phimtv.cv/vod/phim-moi";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var url = "https://phimtv.cv/?search=" + encodeURIComponent(keyword);
        if (page > 1) {
            url += "&page=" + page;
        }
        return url;
    } catch (e) {
        return "https://phimtv.cv/?search=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (!slug) return "";
    if (slug.indexOf("http") === 0) return slug;
    
    var path = slug;
    if (path.indexOf("phim/") === -1) {
        path = "phim/" + path;
    }
    if (path.indexOf(".html") === -1) {
        path += ".html";
    }
    
    return "https://phimtv.cv/" + path.replace(/^\//, "");
}

function getUrlCategories() {
    return "https://phimtv.cv";
}

function getUrlCountries() {
    return "https://phimtv.cv";
}

function getUrlYears() {
    return "https://phimtv.cv";
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
        
        var liRegex = /<li[^>]*class="item[^"]*"[^>]*>([\s\S]*?)<\/li>/gi;
        var match;
        while ((match = liRegex.exec(html)) !== null) {
            var itemHtml = match[1];
            
            var slug = "";
            var hrefMatch = itemHtml.match(/href="(?:https:\/\/phimtv\.cv)?\/phim\/([^"]+)"/i) || 
                            itemHtml.match(/href="([^"]+)"/i);
            if (hrefMatch) {
                slug = hrefMatch[1].replace("https://phimtv.cv/", "").replace(/^\//, "").replace(".html", "");
            }
            if (!slug) continue;
            
            var title = "";
            var titleMatch = itemHtml.match(/title="([^"]+)"/i) || 
                             itemHtml.match(/<p>([\s\S]*?)<\/p>/i);
            if (titleMatch) {
                title = PluginUtils.cleanText(titleMatch[1]);
            }
            
            var posterUrl = "";
            var imgMatch = itemHtml.match(/data-src="([^"]+)"/i) || 
                           itemHtml.match(/src="([^"]+)"/i);
            if (imgMatch) {
                posterUrl = imgMatch[1];
            }
            
            var episode_current = "";
            var labelMatch = itemHtml.match(/class="film-format">([\s\S]*?)<\/span>/i);
            if (labelMatch) {
                episode_current = PluginUtils.cleanText(labelMatch[1]);
            }

            if (!foundSlugs[slug]) {
                items.push({
                    id: slug,
                    title: title || "Phim không tiêu đề",
                    posterUrl: posterUrl,
                    backdropUrl: posterUrl,
                    episode_current: episode_current || "Full",
                    quality: "HD",
                    lang: "Vietsub"
                });
                foundSlugs[slug] = true;
            }
        }
        
        var currentPage = 1;
        var totalPages = 1;
        
        var activeMatch = html.match(/<li[^>]*aria-current="page"[^>]*><a[^>]*>(\d+)<\/a>/i) ||
                          html.match(/<a[^>]*class="current"[^>]*>(\d+)<\/a>/i);
        if (activeMatch) {
            currentPage = parseInt(activeMatch[1], 10);
        }
        
        var pagerMatch = html.match(/<div[^>]*class="pagination"[\s\S]*?<\/div>/i);
        if (pagerMatch) {
            var pagerHtml = pagerMatch[0];
            var pageRegex = /[?&]page=(\d+)/gi;
            var m;
            while ((m = pageRegex.exec(pagerHtml)) !== null) {
                var pageNum = parseInt(m[1], 10);
                if (pageNum > totalPages) {
                    totalPages = pageNum;
                }
            }
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
        var titleMatch = html.match(/<h1[^>]*itemprop="name"[^>]*>([\s\S]*?)<\/h1>/i) || 
                         html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        var title = titleMatch ? PluginUtils.cleanText(titleMatch[1]) : "Phim không tiêu đề";

        var posterMatch = html.match(/<img[^>]+itemprop="image"[^>]+src="([^"]+)"/i) || 
                          html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i);
        var poster = posterMatch ? posterMatch[1] : "";
        if (poster && poster.indexOf("http") !== 0) {
            poster = "https://phimtv.cv" + (poster.indexOf("/") === 0 ? "" : "/") + poster;
        }

        var descMatch = html.match(/<div[^>]*id="film-content"[^>]*>([\s\S]*?)<\/div>/i);
        var description = descMatch ? PluginUtils.cleanText(descMatch[1]) : "";

        var genres = [];
        var genreMatch = html.match(/<label[^>]*>\s*Thể loại:\s*<\/label>\s*([\s\S]*?)<\/li>/i);
        if (genreMatch) {
            var genreHtml = genreMatch[1];
            var aMatch;
            var aRegex = /<a[^>]*>([^<]+)<\/a>/gi;
            while ((aMatch = aRegex.exec(genreHtml)) !== null) {
                genres.push(PluginUtils.cleanText(aMatch[1]));
            }
        }
        var category = genres.join(", ");

        var directors = [];
        var directorMatch = html.match(/<label[^>]*>\s*Đạo diễn:\s*<\/label>\s*([\s\S]*?)<\/li>/i);
        if (directorMatch) {
            var dirHtml = directorMatch[1];
            var aMatch;
            var aRegex = /<a[^>]*>([\s\S]*?)<\/a>/gi;
            while ((aMatch = aRegex.exec(dirHtml)) !== null) {
                var cleanDir = PluginUtils.cleanText(aMatch[1]);
                cleanDir = cleanDir.replace(/<[^>]*>/g, "").trim();
                if (cleanDir) directors.push(cleanDir);
            }
        }
        var director = directors.join(", ");

        var casts = [];
        var castMatch = html.match(/<label[^>]*>\s*Diễn viên:\s*<\/label>\s*([\s\S]*?)<\/li>/i);
        if (castMatch) {
            var castHtml = castMatch[1];
            var aMatch;
            var aRegex = /<a[^>]*>([^<]+)<\/a>/gi;
            while ((aMatch = aRegex.exec(castHtml)) !== null) {
                casts.push(PluginUtils.cleanText(aMatch[1]));
            }
        }
        var castsStr = casts.join(", ");

        var countries = [];
        var countryMatch = html.match(/<label[^>]*>\s*Quốc gia:\s*<\/label>\s*([\s\S]*?)<\/li>/i);
        if (countryMatch) {
            var countryHtml = countryMatch[1];
            var aMatch;
            var aRegex = /<a[^>]*>([^<]+)<\/a>/gi;
            while ((aMatch = aRegex.exec(countryHtml)) !== null) {
                countries.push(PluginUtils.cleanText(aMatch[1]));
            }
        }
        var country = countries.join(", ");

        var dangPhatMatch = html.match(/<label[^>]*>\s*Đang phát:\s*<\/label>\s*<span>\s*<font[^>]*>([\s\S]*?)<\/font>/i) ||
                            html.match(/<label[^>]*>\s*Đang phát:\s*<\/label>\s*<span>\s*([\s\S]*?)<\/span>/i);
        var dangPhatText = dangPhatMatch ? PluginUtils.cleanText(dangPhatMatch[1]) : "";

        var tongSoTapMatch = html.match(/<label[^>]*>\s*Tổng số tập:\s*<\/label>\s*<span>\s*<font[^>]*>([\s\S]*?)<\/font>/i) ||
                             html.match(/<label[^>]*>\s*Tổng số tập:\s*<\/label>\s*<span>\s*([\s\S]*?)<\/span>/i);
        var tongSoTapText = tongSoTapMatch ? PluginUtils.cleanText(tongSoTapMatch[1]) : "";

        var totalEpisodes = 1;
        var isSeries = false;
        var epText = dangPhatText + " " + tongSoTapText;
        if (epText.indexOf("Tập") >= 0 || epText.indexOf("tập") >= 0 || epText.indexOf("Hoàn tất") >= 0 || epText.indexOf("/") >= 0 || epText.indexOf("Hoàn Tất") >= 0) {
            var fracMatch = epText.match(/(\d+)\s*\/\s*(\d+)/);
            if (fracMatch) {
                isSeries = true;
                totalEpisodes = Math.max(parseInt(fracMatch[1], 10), parseInt(fracMatch[2], 10)) || 1;
            } else {
                var digits = epText.match(/\d+/g);
                if (digits) {
                    isSeries = true;
                    var maxVal = 1;
                    for (var i = 0; i < digits.length; i++) {
                        var val = parseInt(digits[i], 10);
                        if (val > maxVal) {
                            maxVal = val;
                        }
                    }
                    totalEpisodes = maxVal;
                }
            }
        }

        var watchMatch = html.match(/href="([^"]*\/play\/[^"]+)"/i) ||
                         html.match(/<a[^>]+class="[^"]*btn-see[^"]*"[^>]+href="([^"]+)"/i);
        var watchUrl = watchMatch ? watchMatch[1] : "";
        if (watchUrl && watchUrl.indexOf("http") !== 0) {
            watchUrl = "https://phimtv.cv" + (watchUrl.indexOf("/") === 0 ? "" : "/") + watchUrl;
        }

        var episodes = [];
        if (watchUrl) {
            episodes.push({
                id: watchUrl,
                name: isSeries ? "Tập 01" : "Full",
                slug: "1"
            });
            
            if (isSeries && totalEpisodes > 1) {
                for (var i = 2; i <= totalEpisodes; i++) {
                    var padNum = i < 10 ? "0" + i : i;
                    episodes.push({
                        id: watchUrl + "?ep=" + i,
                        name: "Tập " + padNum,
                        slug: String(i)
                    });
                }
            }
        } else {
            episodes.push({
                id: "",
                name: "Full",
                slug: "full"
            });
        }

        var servers = [{
            name: "Server Play",
            episodes: episodes
        }];

        return JSON.stringify({
            id: "",
            title: title,
            posterUrl: poster,
            backdropUrl: poster,
            description: description,
            servers: servers,
            category: category,
            status: dangPhatText || "HD",
            quality: "HD",
            lang: "Vietsub",
            director: director,
            casts: castsStr,
            country: country
        });
    } catch (e) {
        return "null";
    }
}

function parseDetailResponse(html, apiUrl) {
    try {
        var fallbackUrl = apiUrl || "";
        var requestedEp = 1;
        var epMatch = fallbackUrl.match(/[?&]ep=(\d+)/);
        if (epMatch) {
            requestedEp = parseInt(epMatch[1], 10) || 1;
        }

        var playerUrl = fallbackUrl;
        
        if (requestedEp > 1) {
            var epListRegex = /<a[^>]+href="([^"]*\/play\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
            var match;
            var foundUrl = "";
            while ((match = epListRegex.exec(html)) !== null) {
                var href = match[1];
                var text = PluginUtils.cleanText(match[2]);
                var digits = text.match(/\d+/);
                if (digits && parseInt(digits[0], 10) === requestedEp) {
                    foundUrl = href;
                    break;
                }
            }
            if (foundUrl) {
                playerUrl = foundUrl;
                if (playerUrl.indexOf("http") !== 0) {
                    playerUrl = "https://phimtv.cv" + (playerUrl.indexOf("/") === 0 ? "" : "/") + playerUrl;
                }
            }
        }

        var streamUrl = "";
        if (requestedEp === 1) {
            var streamRegex = /<a[^>]*class="[^"]*streaming-server[^"]*"[^>]*>/gi;
            var sMatch;
            while ((sMatch = streamRegex.exec(html)) !== null) {
                var tagHtml = sMatch[0];
                var linkMatch = tagHtml.match(/data-link="([^"]+)"/i);
                var typeMatch = tagHtml.match(/data-type="([^"]+)"/i);
                if (linkMatch) {
                    var link = linkMatch[1];
                    var type = typeMatch ? typeMatch[1] : "";
                    if (link.indexOf(".m3u8") >= 0 || type === "m3u8") {
                        streamUrl = link;
                        break;
                    }
                }
            }
        }

        if (streamUrl) {
            return JSON.stringify({
                url: streamUrl,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                    "Referer": "https://phimtv.cv/"
                },
                subtitles: []
            });
        }

        return JSON.stringify({
            url: playerUrl,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Referer": "https://phimtv.cv/",
                "Custom-Js": "(function() { var s = document.createElement('style'); s.textContent = '#header, #footer, #mobile-header, #menu-mobile, .breadcrumb, .film-note, .episode-manager, .film-info, .comment, .film-related, div[id^=\"ads-\"], div[id*=\"banner\"], div[class*=\"ads-top\"], div[class*=\"ads-bottom\"], .pop-ads, #pm-server { display:none !important; }'; document.head.appendChild(s); })();"
            },
            subtitles: []
        });
    } catch (e) {
        return JSON.stringify({ url: apiUrl, headers: {}, subtitles: [] });
    }
}

function parseCategoriesResponse(html) {
    try {
        var categories = [];
        var genreRegex = /href="[^"]*\/genre\/([^"/]+)"[^>]*>([^<]+)<\/a>/gi;
        var match;
        var seen = {};
        while ((match = genreRegex.exec(html)) !== null) {
            var slug = match[1].trim();
            var name = PluginUtils.cleanText(match[2]);
            if (slug && !seen[slug]) {
                categories.push({
                    name: name,
                    slug: "genre/" + slug
                });
                seen[slug] = true;
            }
        }
        return JSON.stringify(categories);
    } catch (e) {
        return "[]";
    }
}

function parseCountriesResponse(html) {
    try {
        var countries = [];
        var countryRegex = /href="[^"]*\/country\/([^"/]+)"[^>]*>([^<]+)<\/a>/gi;
        var match;
        var seen = {};
        while ((match = countryRegex.exec(html)) !== null) {
            var slug = match[1].trim();
            var name = PluginUtils.cleanText(match[2]);
            if (slug && !seen[slug]) {
                countries.push({
                    name: name,
                    value: "country/" + slug
                });
                seen[slug] = true;
            }
        }
        return JSON.stringify(countries);
    } catch (e) {
        return "[]";
    }
}

function parseYearsResponse(html) {
    try {
        var years = [];
        var yearRegex = /href="[^"]*\/vod\/(phim-nam-\d{4})"[^>]*>([^<]+)<\/a>/gi;
        var match;
        var seen = {};
        while ((match = yearRegex.exec(html)) !== null) {
            var slug = match[1].trim();
            var name = PluginUtils.cleanText(match[2]);
            if (slug && !seen[slug]) {
                years.push({
                    name: name,
                    value: "vod/" + slug
                });
                seen[slug] = true;
            }
        }
        return JSON.stringify(years);
    } catch (e) {
        return "[]";
    }
}
