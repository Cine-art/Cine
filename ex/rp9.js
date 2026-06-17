// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "rophim9",
        "name": "Rổ Phim 9",
        "version": "1.0.1",
        "baseUrl": "https://rophimz.one",
        "iconUrl": "https://rophimz.one/statics/images/favicon.ico",
        "isEnabled": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'phim-bo', title: 'Phim Bộ Mới', type: 'Grid', path: 'the-loai/phim-bo' },
        { slug: 'phim-le', title: 'Phim Lẻ Mới', type: 'Horizontal', path: 'the-loai/phim-le' },
        { slug: 'shortdrama', title: 'Short Drama', type: 'Horizontal', path: 'shortdrama' },
        { slug: 'anime', title: 'Anime', type: 'Horizontal', path: 'the-loai/anime' },
        { slug: 'trung-quoc', title: 'Phim Trung Quốc', type: 'Horizontal', path: 'the-loai/trung-quoc' },
        { slug: 'han-quoc', title: 'Phim Hàn Quốc', type: 'Horizontal', path: 'the-loai/han-quoc' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Phim Bộ', slug: 'phim-bo' },
        { name: 'Phim Lẻ', slug: 'phim-le' },
        { name: 'Short Drama', slug: 'shortdrama' },
        { name: 'Anime', slug: 'anime' },
        { name: 'Hành Động', slug: 'phim-hanh-dong' },
        { name: 'Tình Cảm', slug: 'phim-tinh-cam' },
        { name: 'Tâm Lý', slug: 'phim-tam-ly' },
        { name: 'Hài Hước', slug: 'phim-hai-huoc' },
        { name: 'Cổ Trang', slug: 'phim-co-trang' },
        { name: 'Chính Kịch', slug: 'phim-chinh-kich' },
        { name: 'Viễn Tưởng', slug: 'phim-vien-tuong' },
        { name: 'Kinh Dị', slug: 'phim-kinh-di' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        category: [
            { name: 'Tất cả thể loại', value: '' },
            { name: 'Phim Bộ', value: 'phim-bo' },
            { name: 'Phim Lẻ', value: 'phim-le' },
            { name: 'Short Drama', value: 'shortdrama' },
            { name: 'Anime', value: 'anime' },
            { name: 'Hành Động', value: 'phim-hanh-dong' },
            { name: 'Tình Cảm', value: 'phim-tinh-cam' },
            { name: 'Tâm Lý', value: 'phim-tam-ly' },
            { name: 'Hài Hước', value: 'phim-hai-huoc' },
            { name: 'Cổ Trang', value: 'phim-co-trang' },
            { name: 'Chính Kịch', value: 'phim-chinh-kich' },
            { name: 'Viễn Tưởng', value: 'phim-vien-tuong' },
            { name: 'Kinh Dị', value: 'phim-kinh-di' },
            { name: 'Bí Ẩn', value: 'phim-bi-an' },
            { name: 'Gay Cấn', value: 'gay-can' },
            { name: 'Phiêu Lưu', value: 'phim-phieu-luu' },
            { name: 'Khoa Học', value: 'phim-khoa-hoc' },
            { name: 'TV Shows', value: 'tv-shows' }
        ],
        country: [
            { name: 'Tất cả quốc gia', value: '' },
            { name: 'Trung Quốc', value: 'trung-quoc' },
            { name: 'Hàn Quốc', value: 'han-quoc' },
            { name: 'Âu Mỹ', value: 'us-uk' },
            { name: 'Nhật Bản', value: 'nhat-ban' },
            { name: 'Thái Lan', value: 'thai-lan' },
            { name: 'Việt Nam', value: 'viet-nam' }
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
        var cat = filters.category || slug || "";
        var country = filters.country || "";
        var baseUrl = "https://rophimz.one";
        
        // Prioritize country if selected
        var targetCat = country || cat;
        if (targetCat === "latest" || targetCat === "hot" || !targetCat) {
            targetCat = "phim-bo";
        }
        
        var path = "";
        if (targetCat === "shortdrama") {
            path = "/shortdrama";
        } else {
            path = "/the-loai/" + targetCat;
        }
        
        if (page > 1) {
            path += "/" + page;
        }
        return baseUrl + path;
    } catch (e) {
        return "https://rophimz.one/the-loai/phim-bo";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var baseUrl = "https://rophimz.one";
        var url = baseUrl + "/search?q=" + encodeURIComponent(keyword);
        if (page > 1) {
            url += "&page=" + page;
        }
        return url;
    } catch (e) {
        return "https://rophimz.one/search?q=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (!slug) return "https://rophimz.one";
    if (slug.indexOf("http") === 0) {
        return slug;
    }
    return "https://rophimz.one/phim/" + slug;
}

function getUrlCategories() {
    return "https://rophimz.one";
}

function getUrlCountries() {
    return "https://rophimz.one";
}

function getUrlYears() {
    return "https://rophimz.one";
}

// =============================================================================
// RESPONSE PARSING
// =============================================================================

function parseListResponse(html) {
    try {
        var movies = [];
        // Split by item card classes
        var parts = html.split(/class="(?:sw-item|sw-cover)"/);
        for (var i = 1; i < parts.length; i++) {
            var chunk = parts[i];
            
            var slugMatch = chunk.match(/href="[^"]*\/phim\/([^"\/]+)"/);
            if (!slugMatch) continue;
            var slug = slugMatch[1];
            
            var titleMatch = chunk.match(/title="([^"]+)"/) || chunk.match(/alt="([^"]+)"/);
            var title = "";
            if (titleMatch) {
                title = titleMatch[1].split(" - ")[0].trim();
            } else {
                var innerTitleMatch = chunk.match(/<a[^>]*>([\s\S]*?)<\/a>/);
                if (innerTitleMatch) {
                    title = innerTitleMatch[1].replace(/<[^>]*>/g, "").trim();
                }
            }
            if (!title) {
                title = slug.replace(/-/g, " ");
            }
            
            var posterMatch = chunk.match(/src="([^"]+)"/);
            var posterUrl = posterMatch ? posterMatch[1] : "";
            
            var badgeMatch = chunk.match(/<strong>([^<]+)<\/strong>/);
            var badge = badgeMatch ? badgeMatch[1].trim() : "";
            
            var yearMatch = chunk.match(/class="dop-year[^"]*">(\d+)<\/div>/) || chunk.match(/\b(20\d\d|19\d\d)\b/);
            var year = yearMatch ? parseInt(yearMatch[1], 10) : 2026;
            
            movies.push({
                id: slug,
                title: title,
                posterUrl: posterUrl,
                backdropUrl: posterUrl,
                year: year,
                quality: "HD",
                episode_current: badge,
                lang: "Vietsub"
            });
        }
        
        // Pagination
        var currentPage = 1;
        var totalPages = 1;
        
        var curPageMatch = html.match(/class="[^"]*current[^"]*"[^>]*>(\d+)<\/a>/i);
        if (curPageMatch) {
            currentPage = parseInt(curPageMatch[1], 10);
        }
        
        var pageMatches = html.match(/\/the-loai\/[^"\/]+\/(\d+)/g);
        if (pageMatches) {
            for (var k = 0; k < pageMatches.length; k++) {
                var parts_pm = pageMatches[k].split("/");
                var pNum = parseInt(parts_pm[parts_pm.length - 1], 10);
                if (pNum > totalPages) {
                    totalPages = pNum;
                }
            }
        }
        
        return JSON.stringify({
            items: movies,
            pagination: {
                currentPage: currentPage,
                totalPages: totalPages
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
        var posterUrl = "";
        var description = "";
        var year = 2026;
        var category = "";
        var country = "N/A";
        var director = "N/A";
        var casts = "N/A";
        var rating = 0.0;
        
        // Metadata fields
        var titleMatch = html.match(/<title>([^<|]+)/i);
        if (titleMatch) {
            title = titleMatch[1].replace("Thông Tin Phim", "").trim();
        }
        
        var posterMatch = html.match(/<meta property="og:image" content="([^"]+)"/i) || html.match(/<meta name="twitter:image" content="([^"]+)"/i);
        if (posterMatch) {
            posterUrl = posterMatch[1].trim();
        }
        
        var descMatch = html.match(/<meta name="description" content="([^"]+)"/i) || html.match(/<meta property="og:description" content="([^"]+)"/i);
        if (descMatch) {
            description = descMatch[1].trim();
        }
        
        var dirMatch = html.match(/Đạo diễn:\s*([^<]+)/);
        if (dirMatch) director = dirMatch[1].trim();
        
        var castMatch = html.match(/Diễn viên:\s*([^<]+)/);
        if (castMatch) casts = castMatch[1].trim();
        
        var catMatch = html.match(/Thể loại:\s*([^<]+)/);
        if (catMatch) category = catMatch[1].trim();
        
        var countryMatch = html.match(/Quốc gia:\s*([^<]+)/);
        if (countryMatch) country = countryMatch[1].trim();
        
        var yearMatch = html.match(/Năm phát hành:\s*(\d+)/);
        if (yearMatch) year = parseInt(yearMatch[1], 10);
        
        var servers = [];
        
        // Check if watch page
        if (html.indexOf("chaptervs") > -1 || html.indexOf("chaptertm") > -1) {
            var vietsubEpisodes = [];
            var thuyetminhEpisodes = [];
            
            var vsRegex = /class="btn-episode chaptervs[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
            var tmRegex = /class="btn-episode chaptertm[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
            
            var m;
            while ((m = vsRegex.exec(html)) !== null) {
                var url = m[1];
                var nameMatch = m[2].match(/class="ep-sort[^"]*">([^<]+)/);
                var name = nameMatch ? nameMatch[1].trim() : "Tập";
                var slug = name.replace(/\D/g, "");
                vietsubEpisodes.push({ id: url, name: name, slug: slug });
            }
            
            while ((m = tmRegex.exec(html)) !== null) {
                var url = m[1];
                var nameMatch = m[2].match(/class="ep-sort[^"]*">([^<]+)/);
                var name = nameMatch ? nameMatch[1].trim() : "Tập";
                var slug = name.replace(/\D/g, "");
                thuyetminhEpisodes.push({ id: url, name: name + " TM", slug: slug });
            }
            
            if (vietsubEpisodes.length > 0) {
                servers.push({ name: "Vietsub", episodes: vietsubEpisodes });
            }
            if (thuyetminhEpisodes.length > 0) {
                servers.push({ name: "Thuyết Minh", episodes: thuyetminhEpisodes });
            }
        } else {
            // Detail page
            var episodes = [];
            var epRegex = /<a class="item" href="([^"]*\/xem-phim\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
            var m;
            while ((m = epRegex.exec(html)) !== null) {
                var url = m[1];
                var nameMatch = m[2].match(/class="ep-sort[^"]*">([^<]+)/);
                var name = nameMatch ? nameMatch[1].trim() : "Tập";
                var slug = name.replace(/\D/g, "");
                episodes.push({ id: url, name: name, slug: slug });
            }
            
            if (episodes.length > 0) {
                servers.push({ name: "Vietsub", episodes: episodes });
            }
        }
        
        return JSON.stringify({
            id: "",
            title: title,
            originName: title,
            posterUrl: posterUrl,
            backdropUrl: posterUrl,
            description: description,
            year: year,
            rating: rating,
            quality: "HD",
            servers: servers,
            episode_current: servers.length > 0 && servers[0].episodes.length > 0 ? (servers[0].episodes.length + " tập") : "",
            lang: "Vietsub",
            category: category,
            country: country,
            director: director,
            casts: casts,
            tmdbId: "",
            tmdbSeason: 0,
            tmdbType: ""
        });
    } catch (e) {
        return "null";
    }
}

function parseDetailResponse(html) {
    try {
        if (!html) return "{}";
        
        var urls = [];
        
        // 1. Match from data-value="([^"]+)"
        var valRegex = /data-value="([^"]+)"/g;
        var m;
        while ((m = valRegex.exec(html)) !== null) {
            urls.push(m[1]);
        }
        
        // 2. Match from var sources = [...]
        var sourcesMatch = html.match(/var\s+sources\s*=\s*(\[[\s\S]*?\]);/);
        if (sourcesMatch) {
            try {
                var cleanArrayStr = sourcesMatch[1].replace(/\\/g, "");
                var sources = JSON.parse(cleanArrayStr);
                for (var i = 0; i < sources.length; i++) {
                    urls.push(sources[i]);
                }
            } catch (je) {}
        }
        
        // Resolve analyticsource
        var resolved = [];
        for (var i = 0; i < urls.length; i++) {
            var u = urls[i];
            if (u.indexOf("analyticsource/?q=") > -1) {
                var qIdx = u.indexOf("q=");
                if (qIdx > -1) {
                    var rawQ = u.substring(qIdx + 2);
                    var endIdx = rawQ.indexOf("&");
                    if (endIdx > -1) {
                        rawQ = rawQ.substring(0, endIdx);
                    }
                    resolved.push(decodeURIComponent(rawQ));
                }
            } else {
                resolved.push(u);
            }
        }
        
        // Find the best URL (direct .m3u8, not containing temp?s=)
        var streamUrl = "";
        for (var i = 0; i < resolved.length; i++) {
            var u = resolved[i];
            if (u.indexOf(".m3u8") > -1 && u.indexOf("temp?s=") === -1) {
                streamUrl = u;
                break;
            }
        }
        if (!streamUrl && resolved.length > 0) {
            streamUrl = resolved[0];
        }
        
        if (streamUrl) {
            return JSON.stringify({
                url: streamUrl,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Referer": "https://rophimz.one/",
                    "Origin": "https://rophimz.one"
                },
                subtitles: []
            });
        }
        
        return "{}";
    } catch (error) {
        return "{}";
    }
}

function parseCategoriesResponse(html) {
    return getPrimaryCategories();
}

function parseCountriesResponse(html) {
    var config = JSON.parse(getFilterConfig());
    return JSON.stringify(config.country);
}

function parseYearsResponse(html) {
    var years = [];
    var currentYear = 2026;
    for (var i = 0; i < 5; i++) {
        var yearStr = (currentYear - i).toString();
        years.push({ name: yearStr, value: yearStr });
    }
    return JSON.stringify(years);
}
