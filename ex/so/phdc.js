// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "phimnganhdc",
        "name": "PhimNganHDC",
        "version": "1.0.1",
        "baseUrl": "https://phimnganhdc.com",
        "iconUrl": "https://phimnganhdc.com/favicon.ico",
        "isEnabled": true,
        "type": "SHORT"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'phim-moi-cap-nhat', title: 'Phim Mới Cập Nhật', type: 'Grid', path: 'the-loai/phim-ngan' },
        { slug: 'phim-bo', title: 'Phim Bộ', type: 'Horizontal', path: 'danh-sach/phim-bo' },
        { slug: 'phim-hoan-thanh', title: 'Phim Hoàn Thành', type: 'Horizontal', path: 'danh-sach/phim-hoan-thanh' },
        { slug: 'phim-sap-chieu', title: 'Phim Sắp Chiếu', type: 'Horizontal', path: 'danh-sach/phim-sap-chieu' },
        { slug: 'bang-xep-hang', title: 'Bảng Xếp Hạng', type: 'Horizontal', path: 'danh-sach/bang-xep-hang' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Phim mới', slug: 'phim-moi-cap-nhat' },
        { name: 'Phim bộ', slug: 'phim-bo' },
        { name: 'Phim hoàn thành', slug: 'phim-hoan-thanh' },
        { name: 'Ngôn Tình', slug: 'ngon-tinh' },
        { name: 'Hiện Đại', slug: 'hien-dai' },
        { name: 'Phim Ngắn', slug: 'phim-ngan' },
        { name: 'Ngọt Sủng', slug: 'ngot-sung' },
        { name: 'Cổ Trang', slug: 'co-trang' },
        { name: 'Hành động', slug: 'hanh-dong' },
        { name: 'Hài hước', slug: 'hai-huoc' },
        { name: 'Học đường', slug: 'hoc-duong' },
        { name: 'Tình cảm', slug: 'tinh-cam' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        category: [
            { name: "Huyền Huyễn", value: "huyen-huyen" },
            { name: "Tiên Hiệp", value: "tien-hiep" },
            { name: "Xuyên Không", value: "xuyen-khong" },
            { name: "Chuyển Thể", value: "chuyen-the" },
            { name: "Boylove", value: "boy-love" },
            { name: "Phim Ngắn", value: "phim-ngan" },
            { name: "Phá Án", value: "pha-an" },
            { name: "Dân Quốc", value: "dan-quoc" },
            { name: "Y Khoa", value: "y-khoa" },
            { name: "Ngôn Tình", value: "ngon-tinh" },
            { name: "Ngược Luyến", value: "nguoc-luyen" },
            { name: "Nghề Nghiệp", value: "nghe-nghiep" },
            { name: "Đô Thị", value: "do-thi" },
            { name: "Hiện Đại", value: "hien-dai" },
            { name: "Tội Phạm", value: "toi-pham" },
            { name: "Lãng Mạn", value: "lang-man" },
            { name: "Phim Hài", value: "phim-hai" },
            { name: "Khoa Học Viễn Tưởng", value: "khoa-hoc-vien-tuong" },
            { name: "Giả Tưởng", value: "gia-tuong" },
            { name: "Gây Cấn", value: "gay-can" },
            { name: "Lịch Sử", value: "lich-su" },
            { name: "Xuyên Sách", value: "xuyen-sach" },
            { name: "Hệ Thống", value: "he-thong" },
            { name: "Báo Thù", value: "bao-thu" },
            { name: "Kỳ Ảo", value: "ky-ao" },
            { name: "Ngọt Sủng", value: "ngot-sung" },
            { name: "Vả Mặt Tra Nam", value: "va-mat-tra-nam" },
            { name: "Trọng Sinh", value: "trong-sinh" },
            { name: "Có con", value: "co-con" },
            { name: "Cưới Trước Yêu Sau", value: "cuoi-truoc-yeu-sau" },
            { name: "Truy Thê", value: "truy-the" },
            { name: "Hành động", value: "hanh-dong" },
            { name: "Hài hước", value: "hai-huoc" },
            { name: "Học đường", value: "hoc-duong" },
            { name: "Cổ trang", value: "co-trang" },
            { name: "Kinh dị", value: "kinh-di" },
            { name: "Tình cảm", value: "tinh-cam" },
            { name: "Võ thuật", value: "vo-thuat" },
            { name: "Phiêu lưu", value: "phieu-luu" },
            { name: "Viễn tưởng", value: "vien-tuong" },
            { name: "Chính kịch", value: "chinh-kich" },
            { name: "Thể thao", value: "the-thao" },
            { name: "Âm nhạc", value: "am-nhac" },
            { name: "Khoa học", value: "khoa-hoc" },
            { name: "Tâm lý", value: "tam-ly" },
            { name: "Hình sự", value: "hinh-su" },
            { name: "Bí ẩn", value: "bi-an" },
            { name: "Gia đình", value: "gia-dinh" },
            { name: "Hoạt hình", value: "hoat-hinh" },
            { name: "TV Shows", value: "tv-shows" }
        ],
        country: [
            { name: "Hàn Quốc", value: "han-quoc" },
            { name: "Trung Quốc", value: "trung-quoc" },
            { name: "Thái Lan", value: "thai-lan" }
        ],
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
        var baseUrl = "https://phimnganhdc.com";
        var path = "";

        if (filters.category) {
            path = "/the-loai/" + filters.category;
        } else if (filters.country) {
            path = "/quoc-gia/" + filters.country;
        } else if (slug === "phim-bo" || slug === "phim-hoan-thanh" || slug === "phim-sap-chieu" || slug === "bang-xep-hang") {
            path = "/danh-sach/" + slug;
        } else if (slug === "phim-moi-cap-nhat") {
            if (page > 1) {
                path = "/the-loai/phim-ngan";
            } else {
                path = "";
            }
        } else {
            path = "/the-loai/" + slug;
        }

        var url = baseUrl + path;
        if (page > 1) {
            url += "?page=" + page;
        }
        return url;
    } catch (e) {
        return "https://phimnganhdc.com";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var url = "https://phimnganhdc.com/?search=" + encodeURIComponent(keyword);
        if (page > 1) {
            url += "&page=" + page;
        }
        return url;
    } catch (e) {
        return "https://phimnganhdc.com/?search=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (slug.indexOf("http") === 0) {
        return slug;
    }
    return "https://phimnganhdc.com/" + slug;
}

function getUrlCategories() {
    return "https://phimnganhdc.com";
}

function getUrlCountries() {
    return "https://phimnganhdc.com";
}

function getUrlYears() {
    return "https://phimnganhdc.com";
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(apiResponseHtml) {
    try {
        var movies = [];
        var hrefRegex = /href="(?:https:\/\/phimnganhdc\.com)?\/([^"\/#\s?]+-\d+)"/g;
        var match;
        var seenIds = {};

        while ((match = hrefRegex.exec(apiResponseHtml)) !== null) {
            var slug = match[1];
            if (seenIds[slug]) continue;
            seenIds[slug] = true;

            var subStr = apiResponseHtml.substring(Math.max(0, match.index - 250), match.index + 750);
            
            var altMatch = /alt="([^"]+)"/.exec(subStr) || /title="([^"]+)"/.exec(subStr);
            var srcMatch = /data-src="([^"]+)"/.exec(subStr) || /src="([^"]+)"/.exec(subStr);
            var labelMatch = /class="label">([^<]+)/.exec(subStr);

            var title = altMatch ? altMatch[1] : slug.replace(/-/g, " ");
            title = title.replace(/<[^>]*>/g, "").trim();

            var posterUrl = "";
            if (srcMatch) {
                posterUrl = srcMatch[1];
                if (posterUrl.indexOf("data:image") === 0 || posterUrl.indexOf("base64") > -1) {
                    var storageMatch = /"(\/storage\/images\/[^"]+)"/.exec(subStr);
                    if (storageMatch) {
                        posterUrl = storageMatch[1];
                    }
                }
            }
            if (posterUrl && posterUrl.indexOf("http") !== 0) {
                posterUrl = "https://phimnganhdc.com" + posterUrl;
            }

            var label = labelMatch ? labelMatch[1].trim() : "";

            movies.push({
                id: slug,
                title: title,
                posterUrl: posterUrl,
                backdropUrl: posterUrl,
                year: 0,
                quality: "HD",
                episode_current: label,
                lang: "Vietsub"
            });
        }

        var totalPages = 1;
        var pageMatches = apiResponseHtml.match(/page=(\d+)/g);
        if (pageMatches) {
            for (var i = 0; i < pageMatches.length; i++) {
                var m = /page=(\d+)/.exec(pageMatches[i]);
                if (m) {
                    var pageNum = parseInt(m[1], 10);
                    if (pageNum > totalPages) {
                        totalPages = pageNum;
                    }
                }
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
        var originName = "";
        var posterUrl = "";
        var description = "";
        var year = 0;
        var rating = 0;

        // Parse Title
        var titleMatch = /<span[^>]*class="title"[^>]*itemprop="name">([^<]+)<\/span>/i.exec(apiResponseHtml) ||
                         /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(apiResponseHtml);
        if (titleMatch) {
            title = titleMatch[1].replace(/<[^>]*>/g, "").trim();
        }

        // Parse Origin Name and Year
        var originMatch = /<span[^>]*class="real-name"[^>]*>([\s\S]*?)<\/span>/i.exec(apiResponseHtml) ||
                          /<h2[^>]*class="real-name"[^>]*>([\s\S]*?)<\/h2>/i.exec(apiResponseHtml);
        if (originMatch) {
            originName = originMatch[1].replace(/<[^>]*>/g, "").trim();
            var yearMatch = /\((\d{4})\)/.exec(originName);
            if (yearMatch) {
                year = parseInt(yearMatch[1], 10);
                originName = originName.replace(/\(\d{4}\)/, "").trim();
            }
        }

        // Year Fallback
        if (!year) {
            var yrMatch = /<dt>Năm sản xuất:<\/dt>\s*<dd>(\d{4})<\/dd>/i.exec(apiResponseHtml);
            if (yrMatch) {
                year = parseInt(yrMatch[1], 10);
            }
        }

        // Parse Description
        var descMatch = /<p[^>]*class="short-description"[^>]*>([\s\S]*?)<\/p>/i.exec(apiResponseHtml) ||
                        /Nội dung phim[\s\S]*?<div[^>]*style="[^"]*background:\s*#222[^"]*"[^>]*>([\s\S]*?)<\/div>/i.exec(apiResponseHtml) ||
                        /style="[^"]*background:\s*#222[^"]*"[^>]*>([\s\S]*?)<\/div>/i.exec(apiResponseHtml);
        if (descMatch) {
            description = descMatch[1].replace(/<[^>]*>/g, "").trim();
        }

        // Parse Poster
        var imgMatch = /<img[^>]*itemprop="image"[^>]*src="([^"]+)"/i.exec(apiResponseHtml);
        if (imgMatch) {
            posterUrl = imgMatch[1];
            if (posterUrl.indexOf("http") !== 0) {
                posterUrl = "https://phimnganhdc.com" + posterUrl;
            }
        }

        // Parse Rating
        var ratingMatch = /id="average"[^>]*>([^<]+)/i.exec(apiResponseHtml) ||
                          /data-score="([^"]+)"/i.exec(apiResponseHtml);
        if (ratingMatch) {
            rating = parseFloat(ratingMatch[1]) || 0;
        }

        // Parse Genres
        var genres = [];
        var genreBlockMatch = /<dt>Thể loại:<\/dt>([\s\S]*?)<\/dd>/i.exec(apiResponseHtml);
        if (genreBlockMatch) {
            var genreBlock = genreBlockMatch[1];
            var genreRegex = />([^<]+)<\/a>/g;
            var gMatch;
            while ((gMatch = genreRegex.exec(genreBlock)) !== null) {
                var gName = gMatch[1].trim();
                if (gName && genres.indexOf(gName) === -1) {
                    genres.push(gName);
                }
            }
        }
        var genresStr = genres.join(", ");

        // Parse Countries
        var countries = [];
        var countryBlockMatch = /<dt>Quốc gia:<\/dt>([\s\S]*?)<\/dd>/i.exec(apiResponseHtml);
        if (countryBlockMatch) {
            var countryBlock = countryBlockMatch[1];
            var cRegex = />([^<]+)<\/a>/g;
            var cMatch;
            while ((cMatch = cRegex.exec(countryBlock)) !== null) {
                var cName = cMatch[1].trim();
                if (cName && countries.indexOf(cName) === -1) {
                    countries.push(cName);
                }
            }
        }
        var countriesStr = countries.join(", ");

        // Parse Casts
        var casts = [];
        var castBlockMatch = /<dt>Diễn viên:<\/dt>([\s\S]*?)<\/dd>/i.exec(apiResponseHtml);
        if (castBlockMatch) {
            var castBlock = castBlockMatch[1];
            var castRegex = />([^<]+)<\/a>/g;
            var castMatch;
            while ((castMatch = castRegex.exec(castBlock)) !== null) {
                var castName = castMatch[1].trim();
                if (castName && casts.indexOf(castName) === -1) {
                    casts.push(castName);
                }
            }
        }
        var castsStr = casts.join(", ");

        // Parse Director
        var director = "N/A";
        var dirMatch = /<dt>Đạo diễn:<\/dt>\s*<dd>\s*([^<]+)\s*<\/dd>/i.exec(apiResponseHtml);
        if (dirMatch) {
            director = dirMatch[1].trim();
        }

        // Parse Servers & Episodes
        var serverMap = {};
        var serverListRegex = /<div[^>]*class="[^"]*js-episode-list[^"]*"([\s\S]*?)>([\s\S]*?)<\/div>/gi;
        var sMatch;
        while ((sMatch = serverListRegex.exec(apiResponseHtml)) !== null) {
            var attrs = sMatch[1];
            var content = sMatch[2];
            
            var serverNameMatch = /data-server="([^"]+)"/.exec(attrs);
            var serverName = serverNameMatch ? serverNameMatch[1] : "Server Default";
            
            if (!serverMap[serverName]) {
                serverMap[serverName] = [];
            }
            
            var epRegex = /<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
            var epMatch;
            while ((epMatch = epRegex.exec(content)) !== null) {
                var epUrl = epMatch[1];
                var epName = epMatch[2].replace(/<[^>]*>/g, "").trim();
                
                if (epUrl.indexOf("http") !== 0) {
                    epUrl = "https://phimnganhdc.com" + epUrl;
                }
                
                var epSlug = "";
                var slugMatch = /\/([^/]+)$/.exec(epUrl);
                if (slugMatch) {
                    epSlug = slugMatch[1];
                }
                
                serverMap[serverName].push({
                    id: epUrl,
                    name: epName,
                    slug: epSlug
                });
            }
        }

        var servers = [];
        for (var sName in serverMap) {
            if (serverMap.hasOwnProperty(sName)) {
                var epList = serverMap[sName];
                
                // Sort episodes ascending by numeric value of name
                epList.sort(function(a, b) {
                    var na = parseFloat(a.name.replace(/[^\d.]/g, '')) || 0;
                    var nb = parseFloat(b.name.replace(/[^\d.]/g, '')) || 0;
                    return na - nb;
                });
                
                if (epList.length > 0) {
                    servers.push({
                        name: sName,
                        episodes: epList
                    });
                }
            }
        }

        return JSON.stringify({
            id: "",
            title: title,
            originName: originName,
            posterUrl: posterUrl,
            backdropUrl: posterUrl,
            description: description,
            year: year,
            rating: rating,
            quality: "HD",
            servers: servers,
            episode_current: "",
            lang: "Vietsub",
            category: genresStr,
            country: countriesStr,
            director: director,
            casts: castsStr,
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
        var streamUrl = "";
        
        // Find all streaming-server elements
        var serverRegex = /<a[^>]+class="[^"]*streaming-server[^"]*"[^>]*>/gi;
        var match;
        var servers = [];
        
        while ((match = serverRegex.exec(apiResponseHtml)) !== null) {
            var tagContent = match[0];
            var linkM = /data-link="([^"]*)"/i.exec(tagContent);
            var typeM = /data-type="([^"]*)"/i.exec(tagContent);
            var idM = /data-id="([^"]*)"/i.exec(tagContent);
            
            if (linkM && linkM[1]) {
                servers.push({
                    link: linkM[1].trim(),
                    type: typeM ? typeM[1] : "",
                    id: idM ? idM[1] : ""
                });
            }
        }
        
        // Select the first server with a valid link
        for (var i = 0; i < servers.length; i++) {
            if (servers[i].link) {
                streamUrl = servers[i].link;
                break;
            }
        }
        
        // Fallback: look for iframe src
        if (!streamUrl) {
            var iframeM = /<iframe[^>]+src="([^"]+)"/i.exec(apiResponseHtml);
            if (iframeM) {
                streamUrl = iframeM[1];
            }
        }
        
        // Fallback: look for direct media files
        if (!streamUrl) {
            var jwFileM = /file:\s*"([^"]+\.mp4[^"]*)"/i.exec(apiResponseHtml) ||
                          /file:\s*"([^"]+\.m3u8[^"]*)"/i.exec(apiResponseHtml);
            if (jwFileM) {
                streamUrl = jwFileM[1];
            }
        }
        
        if (streamUrl && streamUrl.indexOf("//") === 0) {
            streamUrl = "https:" + streamUrl;
        }

        var isEmbed = false;
        if (streamUrl) {
            var lowerUrl = streamUrl.toLowerCase();
            if (lowerUrl.indexOf(".m3u8") === -1 && 
                lowerUrl.indexOf(".mp4") === -1 && 
                lowerUrl.indexOf(".mpd") === -1 && 
                lowerUrl.indexOf(".mkv") === -1) {
                isEmbed = true;
            }
        }

        return JSON.stringify({
            url: streamUrl,
            isEmbed: isEmbed,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://phimnganhdc.com/"
            },
            subtitles: []
        });
    } catch (error) {
        return "{}";
    }
}

function parseEmbedResponse(embedHtml, embedUrl) {
    try {
        var lowerUrl = embedUrl.toLowerCase();
        
        // --- CASE 1: play.streamxemphimhd.site (HDC Server) ---
        if (lowerUrl.indexOf("streamxemphimhd.site") > -1) {
            // Sub-case A: We are on the player iframe page (e.g. /video/[id])
            if (lowerUrl.indexOf("/video/") > -1) {
                var idMatch = /\/video\/([a-zA-Z0-9]+)/.exec(embedUrl);
                if (idMatch) {
                    var id = idMatch[1];
                    var postUrl = "https://play.streamxemphimhd.site/player/index.php?data=" + id + "&do=getVideo";
                    var postBody = "hash=" + id + "&r=https%3A%2F%2Fphimnganhdc.com%2F";
                    return JSON.stringify({
                        url: postUrl,
                        isEmbed: true,
                        postBody: postBody,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                            "Referer": embedUrl,
                            "X-Requested-With": "XMLHttpRequest",
                            "Origin": "https://play.streamxemphimhd.site"
                        }
                    });
                }
            }
            // Sub-case B: We received the JSON response from index.php?do=getVideo
            else if (lowerUrl.indexOf("getvideo") > -1) {
                var jData = JSON.parse(embedHtml);
                if (jData.hls && jData.securedLink) {
                    return JSON.stringify({
                        url: jData.securedLink,
                        isEmbed: false,
                        headers: {
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                            "Referer": "https://play.streamxemphimhd.site/"
                        }
                    });
                } else if (jData.videoSource) {
                    return JSON.stringify({
                        url: jData.videoSource,
                        isEmbed: false,
                        headers: {
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                            "Referer": "https://play.streamxemphimhd.site/"
                        }
                    });
                }
            }
        }
        
        // --- CASE 2: tiktok.phimhdc.com (FHDC Server) ---
        if (lowerUrl.indexOf("tiktok.phimhdc.com") > -1) {
            // Sub-case A: Embed page containing edgeplayer iframe
            if (lowerUrl.indexOf("/embed/") > -1) {
                var keyMatch = /key=([a-zA-Z0-9\-]+)/.exec(embedHtml);
                if (keyMatch) {
                    var key = keyMatch[1];
                    var edgePlayerUrl = "https://tiktok.phimhdc.com/edgeplayer.html?pv=16&key=" + key + "&delivery=direct";
                    return JSON.stringify({
                        url: edgePlayerUrl,
                        isEmbed: true,
                        headers: {
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                            "Referer": embedUrl
                        }
                    });
                }
            }
            // Sub-case B: Edge player page itself, resolve directly to iOS delivery stream
            else if (lowerUrl.indexOf("edgeplayer.html") > -1) {
                var keyMatch = /key=([a-zA-Z0-9\-]+)/.exec(embedUrl);
                if (keyMatch) {
                    var key = keyMatch[1];
                    var m3u8Url = "https://tiktok.phimhdc.com/video/" + key + "/master.m3u8?delivery=ios";
                    return JSON.stringify({
                        url: m3u8Url,
                        isEmbed: false,
                        headers: {
                            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
                            "Referer": embedUrl
                        }
                    });
                }
            }
        }

        return "{}";
    } catch (e) {
        return "{}";
    }
}
