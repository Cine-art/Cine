// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "netshort",
        "name": "NetShort",
        "version": "1.0.1",
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
        { name: 'Báo Thù', slug: 'Báo%20Thù-1983832036302733325' },
        { name: 'Báo Thù', slug: 'Báo%20Thù-1983832092270911500' },
        { name: 'Công Sở', slug: 'Công%20Sở-1983832090857431052' },
        { name: 'Cưới Thay', slug: 'Cưới%20Thay-1983832091616600075' },
        { name: 'Cưới Trước Yêu Sau', slug: 'Cưới%20Trước%20Yêu%20Sau-1983832091939561484' },
        { name: 'Cưới Vì Có Thai', slug: 'Cưới%20Vì%20Có%20Thai-1983832091767595020' },
        { name: 'Cưới Vội', slug: 'Cưới%20Vội-1983832091880841227' },
        { name: 'Cường Giả Tái Xuất', slug: 'Cường%20Giả%20Tái%20Xuất-1983832036285956108' },
        { name: 'Cổ Đại', slug: 'Cổ%20Đại-1983832036533420044' },
        { name: 'Gia Đình Luân Lý', slug: 'Gia%20Đình%20Luân%20Lý-1983832092405129228' },
        { name: 'Giang Hồ Võ Hiệp', slug: 'Giang%20Hồ%20Võ%20Hiệp-1983832036961239048' },
        { name: 'Giả tưởng', slug: 'Giả%20tưởng-1983832036856381452' },
        { name: 'Hiện Đại', slug: 'Hiện%20Đại-1983832090844848140' },
        { name: 'Hào Môn', slug: 'Hào%20Môn-1983832091205558285' },
        { name: 'Hối Hận', slug: 'Hối%20Hận-1983832092119916552' },
        { name: 'Hợp Đồng Tình Yêu', slug: 'Hợp%20Đồng%20Tình%20Yêu-1983832091947950093' },
        { name: 'Khoa Học Viễn Tưởng', slug: 'Khoa%20Học%20Viễn%20Tưởng-1983832036952850434' },
        { name: 'Kịch Tính', slug: 'Kịch%20Tính-1983832091029397515' },
        { name: 'Lịch Sử Cổ Đại', slug: 'Lịch%20Sử%20Cổ%20Đại-1983832036931878924' },
        { name: 'Mất Trí', slug: 'Mất%20Trí-1983832091696291842' },
        { name: 'Ngôn Tình Cổ Đại', slug: 'Ngôn%20Tình%20Cổ%20Đại-1983832092962971661' },
        { name: 'Ngôn Tình Giả Tưởng', slug: 'Ngôn%20Tình%20Giả%20Tưởng-1983832092417712141' },
        { name: 'Người Sói', slug: 'Người%20Sói-1983832092153470989' },
        { name: 'Nhận Nhầm Thân Phận', slug: 'Nhận%20Nhầm%20Thân%20Phận-1983832091629182988' },
        { name: 'Níu Kéo Vợ', slug: 'Níu%20Kéo%20Vợ-1983832091641765899' },
        { name: 'Nữ Giới Trưởng Thành', slug: 'Nữ%20Giới%20Trưởng%20Thành-1983832092950388749' },
        { name: 'Nữ Theo Đuổi Nam', slug: 'Nữ%20Theo%20Đuổi%20Nam-1983832092057001997' },
        { name: 'Phát Tài', slug: 'Phát%20Tài-1983832036311121933' },
        { name: 'Song Trùng Sinh', slug: 'Song%20Trùng%20Sinh-1983832092187025421' },
        { name: 'Thương Trường', slug: 'Thương%20Trường-1983832036906713101' },
        { name: 'Trinh Thám', slug: 'Trinh%20Thám-1983832092497403916' },
        { name: 'Trùng Sinh', slug: 'Trùng%20Sinh-1983832091813732365' },
        { name: 'Tình Huống Quốc Gia', slug: 'Tình%20Huống%20Quốc%20Gia-1983832035971383309' },
        { name: 'Tình Thân', slug: 'Tình%20Thân-1983832092459655179' },
        { name: 'Tình Yêu Cưỡng Ép', slug: 'Tình%20Yêu%20Cưỡng%20Ép-1983832091708874755' },
        { name: 'Tình Yêu Học Đường', slug: 'Tình%20Yêu%20Học%20Đường-1983832093059440652' },
        { name: 'Tình Yêu Sét Đánh', slug: 'Tình%20Yêu%20Sét%20Đánh-1983832091658543113' },
        { name: 'Tình một đêm', slug: 'Tình%20một%20đêm-1984209208347541520' },
        { name: 'Vả Mặt Xấu Xa', slug: 'Vả%20Mặt%20Xấu%20Xa-1983832036294344715' },
        { name: 'Vả Mặt Xấu Xa', slug: 'Vả%20Mặt%20Xấu%20Xa-1983832092291883020' },
        { name: 'Đô Thị Giả Tưởng', slug: 'Đô%20Thị%20Giả%20Tưởng-1983832036864770056' },
        { name: 'Đô Thị Tình Cảm', slug: 'Đô%20Thị%20Tình%20Cảm-1983832092736479244' },
        { name: 'Đạo Lý', slug: 'Đạo%20Lý-1983832092283494407' },
        { name: 'Đảo Ngược', slug: 'Đảo%20Ngược-1983832091792760844' },
        { name: 'Đảo ngược', slug: 'Đảo%20ngược-1983832036239818765' },
        { name: 'Đảo ngược', slug: 'Đảo%20ngược-1984208314792402961' },
        { name: 'Ẩn Danh', slug: 'Ẩn%20Danh-1983832092082167820' },
        { name: 'Ẩn Danh', slug: 'Ẩn%20Danh-1999056777400172554' }
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
        var subtitles = [];

        // 1. Try to parse playVoucher for direct native playback (ExoPlayer instead of WebView embed)
        var voucherMatch = /\\"playVoucher\\"\s*:\s*\\"([^"]+?)\\"/i.exec(apiResponseHtml);
        if (voucherMatch) {
            streamUrl = voucherMatch[1].replace(/\\u0026/g, "&").replace(/\\\//g, "/");
        }

        // 2. Try to parse subtitleList
        var subMatch = /\\"subtitleList\\"\s*:\s*(\[.*?\])/i.exec(apiResponseHtml);
        if (subMatch) {
            try {
                var cleanedSubsJson = subMatch[1].replace(/\\"/g, '"').replace(/\\u0026/g, "&").replace(/\\\//g, "/");
                var rawSubs = JSON.parse(cleanedSubsJson);
                var langMap = {
                    "vi_VN": { lang: "vi", label: "Tiếng Việt" },
                    "en_US": { lang: "en", label: "English" },
                    "ja_JP": { lang: "ja", label: "日本語" },
                    "ko_KR": { lang: "ko", label: "한국어" },
                    "th_TH": { lang: "th", label: "ไทย" },
                    "zh_TW": { lang: "zh", label: "繁體中文" },
                    "fr_FR": { lang: "fr", label: "Français" },
                    "de_DE": { lang: "de", label: "Deutsch" },
                    "pt_PT": { lang: "pt", label: "Português" },
                    "id_ID": { lang: "id", label: "Bahasa Indonesia" },
                    "es_ES": { lang: "es", label: "Español" },
                    "ar_AE": { lang: "ar", label: "العربية" },
                    "tr_TR": { lang: "tr", label: "Türkçe" },
                    "hi_IN": { lang: "hi", label: "हिन्दी" }
                };

                for (var i = 0; i < rawSubs.length; i++) {
                    var subItem = rawSubs[i];
                    if (subItem && subItem.url) {
                        var subUrl = subItem.url;
                        var rawLang = subItem.subtitleLanguage || "";
                        var mapped = langMap[rawLang] || { lang: rawLang.split("_")[0], label: rawLang };
                        subtitles.push({
                            url: subUrl,
                            lang: mapped.lang,
                            label: mapped.label
                        });
                    }
                }
            } catch (e) {
                // Ignore parse errors
            }
        }

        if (!streamUrl) {
            var embedMatch = /"embedUrl"\s*:\s*"([^"]+)"/i.exec(apiResponseHtml);
            if (embedMatch) {
                streamUrl = embedMatch[1];
            }
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
            subtitles: subtitles
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
