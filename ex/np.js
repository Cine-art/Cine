// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "newphim",
        "name": "Newphim",
        "version": "1.0.0",
        "baseUrl": "https://www.newphim.net",
        "iconUrl": "https://www.newphim.net/storage/files/Logo/logo_newphimnet.png",
        "isEnabled": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'phim-moi', title: 'Phim Mới Cập Nhật', type: 'Grid', path: 'danh-sach/phim-moi' },
        { slug: 'phim-bo', title: 'Phim Bộ', type: 'Horizontal', path: 'danh-sach/phim-bo' },
        { slug: 'phim-le', title: 'Phim Lẻ', type: 'Horizontal', path: 'danh-sach/phim-le' },
        { slug: 'hoat-hinh', title: 'Hoạt Hình', type: 'Horizontal', path: 'the-loai/hoat-hinh' },
        { slug: 'hanh-dong', title: 'Hành Động', type: 'Horizontal', path: 'the-loai/hanh-dong' },
        { slug: 'tinh-cam', title: 'Tình Cảm', type: 'Horizontal', path: 'the-loai/tinh-cam' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Phim Mới', slug: 'phim-moi' },
        { name: 'Phim Bộ', slug: 'phim-bo' },
        { name: 'Phim Lẻ', slug: 'phim-le' },
        { name: 'Hoạt Hình', slug: 'hoat-hinh' },
        { name: 'Hành Động', slug: 'hanh-dong' },
        { name: 'Hài Hước', slug: 'hai-huoc' },
        { name: 'Phiêu Lưu', slug: 'phieu-luu' },
        { name: 'Tình Cảm', slug: 'tinh-cam' },
        { name: 'Học Đường', slug: 'hoc-duong' },
        { name: 'Cổ Trang', slug: 'co-trang' },
        { name: 'Tâm Lý', slug: 'tam-ly' },
        { name: 'Võ Thuật', slug: 'vo-thuat' },
        { name: 'Viễn Tưởng', slug: 'vien-tuong' },
        { name: 'Kinh Dị', slug: 'kinh-di' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        category: [
            { name: 'Tất cả thể loại', value: '' },
            { name: 'Hoạt Hình', value: 'hoat-hinh' },
            { name: 'Hành Động', value: 'hanh-dong' },
            { name: 'Hài Hước', value: 'hai-huoc' },
            { name: 'Phiêu Lưu', value: 'phieu-luu' },
            { name: 'Tình Cảm', value: 'tinh-cam' },
            { name: 'Học Đường', value: 'hoc-duong' },
            { name: 'Chiến Tranh', value: 'chien-tranh' },
            { name: 'Chính kịch', value: 'chinh-kich' },
            { name: 'Cổ Trang', value: 'co-trang' },
            { name: 'Tâm Lý', value: 'tam-ly' },
            { name: 'Võ Thuật', value: 'vo-thuat' },
            { name: 'Viễn Tưởng', value: 'vien-tuong' },
            { name: 'Khoa Học', value: 'khoa-hoc' },
            { name: 'Gia Đình', value: 'gia-dinh' },
            { name: 'Hình Sự', value: 'hinh-su' },
            { name: 'Bí ẩn', value: 'bi-an' },
            { name: 'Kinh Dị', value: 'kinh-di' },
            { name: 'TV Shows', value: 'tv-shows' },
            { name: 'Âm Nhạc', value: 'am-nhac' },
            { name: 'Phim 18+', value: 'phim-18' },
            { name: 'Thể Thao', value: 'the-thao' },
            { name: 'Tài Liệu', value: 'tai-lieu' },
            { name: 'Kinh Điển', value: 'kinh-dien' },
            { name: 'Thần Thoại', value: 'than-thoai' }
        ],
        country: [
            { name: 'Tất cả quốc gia', value: '' },
            { name: 'Nhật Bản', value: 'nhat-ban' },
            { name: 'Âu Mỹ', value: 'au-my' },
            { name: 'Thổ Nhĩ Kỳ', value: 'tho-nhi-ky' },
            { name: 'Trung Quốc', value: 'trung-quoc' },
            { name: 'Thái Lan', value: 'thai-lan' },
            { name: 'Hàn Quốc', value: 'han-quoc' },
            { name: 'Anh', value: 'anh' },
            { name: 'Pháp', value: 'phap' },
            { name: 'Đức', value: 'duc' },
            { name: 'Hồng Kông', value: 'hong-kong' },
            { name: 'Ấn Độ', value: 'an-do' },
            { name: 'Tây Ban Nha', value: 'tay-ban-nha' },
            { name: 'Đài Loan', value: 'dai-loan' },
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
        var baseUrl = "https://www.newphim.net";
        var path = "";

        if (filters.category) {
            path = "/the-loai/" + filters.category;
        } else if (filters.country) {
            path = "/quoc-gia/" + filters.country;
        } else if (slug && slug.indexOf("the-loai/") === 0) {
            path = "/" + slug;
        } else if (slug && slug.indexOf("quoc-gia/") === 0) {
            path = "/" + slug;
        } else if (slug && slug.indexOf("danh-sach/") === 0) {
            path = "/" + slug;
        } else if (slug === "phim-le") {
            path = "/danh-sach/phim-le";
        } else if (slug === "phim-bo") {
            path = "/danh-sach/phim-bo";
        } else {
            path = "/danh-sach/phim-moi";
        }

        var url = baseUrl + path;
        if (page > 1) {
            url += "?page=" + page;
        }
        return url;
    } catch (e) {
        return "https://www.newphim.net/danh-sach/phim-moi";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var url = "https://www.newphim.net/?search=" + encodeURIComponent(keyword);
        if (page > 1) {
            url += "&page=" + page;
        }
        return url;
    } catch (e) {
        return "https://www.newphim.net/?search=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (!slug) return "https://www.newphim.net";
    if (slug.indexOf("http") === 0) {
        return slug;
    }
    return "https://www.newphim.net/phim/" + slug;
}

function getUrlCategories() {
    return "https://www.newphim.net/danh-sach/phim-moi";
}

function getUrlCountries() {
    return "https://www.newphim.net/danh-sach/phim-moi";
}

function getUrlYears() {
    return "https://www.newphim.net/danh-sach/phim-moi";
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(html) {
    try {
        var movies = [];
        var seen = {};
        
        var hrefRegex = /href="https:\/\/www\.newphim\.net\/phim\/([^"\/]+)"/g;
        var match;
        while ((match = hrefRegex.exec(html)) !== null) {
            var slug = match[1];
            if (seen[slug]) continue;
            seen[slug] = true;
            
            var startIdx = Math.max(0, match.index - 300);
            var endIdx = Math.min(html.length, match.index + 2000);
            var chunk = html.substring(startIdx, endIdx);
            
            var titleMatch = chunk.match(/<h2 class="Title">([^<]+)<\/h2>/i) || 
                             chunk.match(/class="Title">([^<]+)<\/div>/i) ||
                             chunk.match(/title="([^"]+)"/i) || 
                             chunk.match(/alt="([^"]+)"/i);
            var title = titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, " ");
            
            var imgMatch = chunk.match(/src="([^"]+)"/i);
            var posterUrl = imgMatch ? imgMatch[1].trim() : "";
            if (posterUrl && posterUrl.indexOf("http") !== 0) {
                posterUrl = "https://www.newphim.net" + posterUrl;
            }
            
            var badgeMatch = chunk.match(/class="mli-quality">([^<]+)<\/span>/i) || 
                             chunk.match(/<span class="Time AAIco-access_time">([^<]+)<\/span>/i);
            var badge = badgeMatch ? badgeMatch[1].trim() : "";
            
            var yearMatch = chunk.match(/<span class="Year">([^<]+)<\/span>/i) || 
                            chunk.match(/<span class="Date AAIco-date_range">([^<]+)<\/span>/i);
            var yearStr = yearMatch ? yearMatch[1].trim() : "";
            var year = parseInt(yearStr, 10) || 0;
            
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
        
        var pageMatches = html.match(/page=(\d+)/g);
        if (pageMatches) {
            for (var i = 0; i < pageMatches.length; i++) {
                var m = /page=(\d+)/.exec(pageMatches[i]);
                if (m) {
                    var pNum = parseInt(m[1], 10);
                    if (pNum > totalPages) {
                        totalPages = pNum;
                    }
                }
            }
        }
        
        var curPageMatch = html.match(/class="page-numbers current"[^>]*>(\d+)<\/span>/i) ||
                           html.match(/class="[^"]*active[^"]*"[^>]*>[\s\S]*?>(\d+)<\/a>/i);
        if (curPageMatch) {
            currentPage = parseInt(curPageMatch[1], 10);
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

        // Parse JSON-LD Schema
        var ldMatches = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
        var movieObj = null;
        if (ldMatches) {
            for (var i = 0; i < ldMatches.length; i++) {
                var content = ldMatches[i].replace(/<script[^>]*>/i, "").replace(/<\/script>/i, "");
                try {
                    var parsed = JSON.parse(content);
                    if (parsed && (parsed["@type"] === "Movie" || parsed["type"] === "Movie" || parsed["@type"] === "VideoObject" || parsed["type"] === "VideoObject" || parsed["@type"] === "TVSeries" || parsed["type"] === "TVSeries")) {
                        movieObj = parsed;
                        break;
                    }
                } catch(e) {}
            }
        }

        if (movieObj) {
            if (movieObj.name) title = movieObj.name;
            if (movieObj.description) description = movieObj.description;
            if (movieObj.image) {
                posterUrl = Array.isArray(movieObj.image) ? movieObj.image[0] : (movieObj.image.url || movieObj.image);
            }
            if (movieObj.dateCreated) {
                var yr = parseInt(movieObj.dateCreated.substring(0, 4), 10);
                if (yr) year = yr;
            } else if (movieObj.datePublished) {
                var yr = parseInt(movieObj.datePublished.substring(0, 4), 10);
                if (yr) year = yr;
            }
            if (movieObj.genre) {
                category = (Array.isArray(movieObj.genre) ? movieObj.genre : [movieObj.genre]).join(", ");
            }
            if (movieObj.actor) {
                casts = (Array.isArray(movieObj.actor) ? movieObj.actor : [movieObj.actor]).map(function(a) { return a.name || a; }).join(", ");
            }
            if (movieObj.director) {
                director = (Array.isArray(movieObj.director) ? movieObj.director : [movieObj.director]).map(function(d) { return d.name || d; }).join(", ");
            }
        }

        // Fallbacks
        if (!title) {
            var titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
            if (titleMatch) {
                title = titleMatch[1].replace("Phim ", "").replace("Xem phim ", "").split(" tập ")[0].split(" Vietsub ")[0].split(" HD")[0].trim();
            }
        }
        if (!posterUrl) {
            var imgMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i) || 
                           html.match(/<meta\s+name="twitter:image"\s+content="([^"]+)"/i);
            if (imgMatch) {
                posterUrl = imgMatch[1].trim();
            }
        }
        if (!description) {
            var descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i) || 
                            html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
            if (descMatch) {
                description = descMatch[1].trim();
            }
        }

        if (!category) {
            var genreBlock = html.match(/<strong>Thể loại:<\/strong>([\s\S]*?)<\/li>/i);
            if (genreBlock) {
                var genreMatches = [];
                var gRegex = /href="[^"]*\/the-loai\/([^"\/]+)"[^>]*>([^<]+)<\/a>/g;
                var gm;
                while ((gm = gRegex.exec(genreBlock[1])) !== null) {
                    genreMatches.push(gm[2].trim());
                }
                category = genreMatches.join(", ");
            }
        }

        var countryBlock = html.match(/<strong>Quốc gia:<\/strong>([\s\S]*?)<\/li>/i);
        if (countryBlock) {
            var cRegex = /href="[^"]*\/quoc-gia\/([^"\/]+)"[^>]*>([^<]+)<\/a>/i;
            var cm = cRegex.exec(countryBlock[1]);
            if (cm) {
                country = cm[2].trim();
            }
        }

        var servers = [];

        if (html.indexOf('id="list-server"') > -1) {
            // We are on the watch page. Extract server groups
            var listServerIndex = html.indexOf('id="list-server"');
            var containerHtml = html.substring(listServerIndex);
            
            var serverBlocks = containerHtml.split('<h3 class="server-name">');
            for (var i = 1; i < serverBlocks.length; i++) {
                var block = serverBlocks[i];
                var snameMatch = block.match(/^([\s\S]*?)<\/h3>/);
                if (!snameMatch) continue;
                var sname = snameMatch[1].trim();
                
                var episodes = [];
                var epRegex = /href="([^"]*\/phim\/[^"]+)"[^>]*>([^<]+)<\/a>/g;
                var epMatch;
                while ((epMatch = epRegex.exec(block)) !== null) {
                    var epUrl = epMatch[1];
                    var epName = epMatch[2].trim();
                    var cleanName = epName;
                    if (/^\d+$/.test(epName)) {
                        cleanName = "Tập " + epName;
                    }
                    episodes.push({
                        id: epUrl,
                        name: cleanName,
                        slug: epName
                    });
                }
                
                // Sort episodes ascending by slug numeric value
                episodes.sort(function(a, b) {
                    var na = parseFloat(a.slug) || 0;
                    var nb = parseFloat(b.slug) || 0;
                    return na - nb;
                });
                
                if (episodes.length > 0) {
                    servers.push({
                        name: sname,
                        episodes: episodes
                    });
                }
            }
        } else {
            // We are on the details page. Extract "Xem phim" link & "Tập mới" links
            var episodes = [];
            var seenEpUrls = {};
            
            var watchBtnMatch = html.match(/class="watch_button_more"[^>]*href="([^"]+)"/) ||
                                html.match(/href="([^"]*\/phim\/[^"]+\/tap-\d+-\d+)"/);
            if (watchBtnMatch) {
                var watchUrl = watchBtnMatch[1];
                seenEpUrls[watchUrl] = true;
                var epNum = "1";
                var numMatch = watchUrl.match(/\/tap-(\d+)-/);
                if (numMatch) {
                    epNum = numMatch[1];
                }
                episodes.push({
                    id: watchUrl,
                    name: "Tập " + epNum,
                    slug: epNum
                });
            }
            
            var latestEpsMatch = html.match(/class="[^"]*latest_eps[^"]*"([\s\S]*?)<\/li>/i);
            if (latestEpsMatch) {
                var linksRegex = /href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
                var lm;
                while ((lm = linksRegex.exec(latestEpsMatch[1])) !== null) {
                    var lUrl = lm[1];
                    var lName = lm[2].trim();
                    if (!seenEpUrls[lUrl]) {
                        seenEpUrls[lUrl] = true;
                        episodes.push({
                            id: lUrl,
                            name: "Tập " + lName,
                            slug: lName
                        });
                    }
                }
            }
            
            episodes.sort(function(a, b) {
                var na = parseFloat(a.slug) || 0;
                var nb = parseFloat(b.slug) || 0;
                return na - nb;
            });
            
            if (episodes.length > 0) {
                servers.push({
                    name: "Vietsub",
                    episodes: episodes
                });
            }
        }

        return JSON.stringify({
            id: "",
            title: title,
            originName: title,
            posterUrl: posterUrl,
            backdropUrl: posterUrl,
            description: (description || "").replace(/<[^>]*>/g, ""),
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
    } catch (error) {
        return "null";
    }
}

function parseDetailResponse(html) {
    try {
        if (!html) return "{}";
        
        var streamUrl = "";
        var serverRegex = /data-link="([^"]+)"[^>]*data-type="([^"]+)"/g;
        var sm;
        var bestUrl = "";
        var fallbackUrl = "";
        while ((sm = serverRegex.exec(html)) !== null) {
            var link = sm[1].replace(/^http:\/\//i, 'https://');
            var type = sm[2];
            if (type === "m3u8" || link.indexOf(".m3u8") > -1) {
                bestUrl = link;
            } else if (!fallbackUrl) {
                fallbackUrl = link;
            }
        }
        streamUrl = bestUrl || fallbackUrl;
        
        if (streamUrl) {
            return JSON.stringify({
                url: streamUrl,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Referer": "https://www.newphim.net/",
                    "Origin": "https://www.newphim.net"
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
    return JSON.stringify([
        { name: 'Nhật Bản', value: 'nhat-ban' },
        { name: 'Âu Mỹ', value: 'au-my' },
        { name: 'Thổ Nhĩ Kỳ', value: 'tho-nhi-ky' },
        { name: 'Trung Quốc', value: 'trung-quoc' },
        { name: 'Thái Lan', value: 'thai-lan' },
        { name: 'Hàn Quốc', value: 'han-quoc' },
        { name: 'Việt Nam', value: 'viet-nam' }
    ]);
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
