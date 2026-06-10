// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "doctruyen5s",
        "name": "Doctruyen5s",
        "version": "1.0.0",
        "baseUrl": "https://manga.io.vn",
        "iconUrl": "https://manga.io.vn/uploads/images/favicon.png",
        "isEnabled": true,
        "type": "MANGA"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'moi-cap-nhat', title: 'Mới Cập Nhật', type: 'Grid', path: 'all-manga' },
        { slug: 'hot', title: 'Hot', type: 'Horizontal', path: 'ranking/month' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Manga', slug: 'manga' },
        { name: 'Manhua', slug: 'manhua' },
        { name: 'Manhwa', slug: 'manhwa' },
        { name: 'Ngôn Tình', slug: 'ngon-tinh' },
        { name: 'Chuyển sinh', slug: 'chuyen-sinh' },
        { name: 'Action', slug: 'action' },
        { name: 'Drama', slug: 'drama' },
        { name: 'Fantasy', slug: 'fantasy' },
        { name: 'Comedy', slug: 'comedy' },
        { name: 'Cổ Đại', slug: 'co-dai' },
        { name: 'Tu Tiên', slug: 'tu-tien' },
        { name: 'Xuyên Không', slug: 'xuyen-khong' }
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
        var baseUrl = "https://manga.io.vn";
        var path = "";

        if (filters.category) {
            path = "/genres/" + filters.category;
        } else if (slug === "moi-cap-nhat" || slug === "all-manga") {
            path = "/all-manga/" + page;
            return baseUrl + path;
        } else if (slug === "hot" || slug.indexOf("ranking/") === 0) {
            path = "/" + slug;
        } else {
            path = "/genres/" + slug;
        }

        var url = baseUrl + path;
        if (page > 1) {
            url += "?page=" + page;
        }
        return url;
    } catch (e) {
        return "https://manga.io.vn/all-manga/1";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var url = "https://manga.io.vn/search?keyword=" + encodeURIComponent(keyword);
        if (page > 1) {
            url += "&page=" + page;
        }
        return url;
    } catch (e) {
        return "https://manga.io.vn/search?keyword=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (slug.indexOf("http") === 0) {
        return slug;
    }
    return "https://manga.io.vn/manga/" + slug;
}

function getUrlCategories() {
    return "https://manga.io.vn";
}

function getUrlCountries() {
    return "https://manga.io.vn";
}

function getUrlYears() {
    return "https://manga.io.vn";
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(apiResponseHtml) {
    try {
        var movies = [];
        var seenIds = {};
        
        // Find links of the form /manga/<slug>
        var hrefRegex = /href=["'](?:https?:\/\/manga\.io\.vn)?\/manga\/([^"'#?]+)["']/g;
        var match;

        while ((match = hrefRegex.exec(apiResponseHtml)) !== null) {
            var slug = match[1];
            if (slug.indexOf("chapter-") > -1 || slug.indexOf("chapters/") > -1 || slug.indexOf("all-manga") > -1) {
                continue;
            }
            if (seenIds[slug]) continue;
            seenIds[slug] = slug;

            var subStr = apiResponseHtml.substring(match.index, match.index + 2000);
            
            // Extract cover poster image
            var srcMatch = /data-src=["']([^"']+)["']/.exec(subStr) || 
                           /src=["']([^"']+)["']/.exec(subStr);
            var posterUrl = "";
            if (srcMatch) {
                posterUrl = srcMatch[1];
                if (posterUrl.indexOf("data:image") === 0 || posterUrl.indexOf("base64") > -1) {
                    // Lookahead further for a real cover link
                    var secondaryMatch = /uploads\/covers\/([^"'\s>]+)/.exec(subStr);
                    if (secondaryMatch) {
                        posterUrl = "https://manga.io.vn/uploads/covers/" + secondaryMatch[1];
                    }
                }
            }

            // Extract title
            var altMatch = /alt=["']([^"']+)["']/.exec(subStr) || 
                           /title=["']([^"']+)["']/.exec(subStr);
            var title = altMatch ? altMatch[1] : slug.replace(/-/g, " ");
            title = title.replace(/<[^>]*>/g, "").trim();

            // Extract recent chapter info as current episode label
            var chapMatch = /href=["'](?:https?:\/\/manga\.io\.vn)?\/manga\/[^"']+\/(chapter-[^"']+)["']/.exec(subStr) ||
                            /(Chapter\s+\d+)/i.exec(subStr);
            var label = chapMatch ? chapMatch[1].replace(/-/g, " ") : "";

            movies.push({
                id: slug,
                title: title,
                posterUrl: posterUrl,
                backdropUrl: posterUrl,
                year: 0,
                quality: "HD",
                episode_current: label,
                lang: "VI"
            });
        }

        var totalPages = 1;
        var pageMatches = apiResponseHtml.match(/page=(\d+)/g) || 
                          apiResponseHtml.match(/\/all-manga\/(\d+)/g);
        if (pageMatches) {
            for (var i = 0; i < pageMatches.length; i++) {
                var m = /(\d+)/.exec(pageMatches[i]);
                if (m) {
                    var pageNum = parseInt(m[1], 10);
                    if (pageNum > totalPages) totalPages = pageNum;
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
        var posterUrl = "";
        var description = "";
        var year = 2025;
        var author = "Đang cập nhật";
        var genres = [];

        // Title parsing
        var titleMatch = /<title>([\s\S]*?)<\/title>/i.exec(apiResponseHtml) ||
                         /headline\s*:\s*["']([^"']+)["']/i.exec(apiResponseHtml);
        if (titleMatch) {
            title = titleMatch[1].replace(/\s*-\s*DocTruyen5s/i, "").replace(/Đọc truyện tranh/i, "").replace(/Tiếng Việt.*/i, "").trim();
        }

        // Description parsing
        var descMatch = /<meta[^>]*name="description"[^>]*content="([^"]*)"/i.exec(apiResponseHtml) ||
                        /<meta[^>]*property="og:description"[^>]*content="([^"]*)"/i.exec(apiResponseHtml);
        if (descMatch) {
            description = descMatch[1].trim();
        }

        // Poster parsing
        var posterMatch = /<meta[^>]*property="og:image"[^>]*content="([^"]*)"/i.exec(apiResponseHtml) ||
                          /primaryimage["']\s*,\s*["']inLanguage["']\s*:\s*["']vi["']\s*,\s*["']url["']\s*:\s*["']([^"']+)["']/i.exec(apiResponseHtml);
        if (posterMatch) {
            posterUrl = posterMatch[1];
            if (posterUrl && posterUrl.indexOf("//") === 0) {
                posterUrl = "https:" + posterUrl;
            } else if (posterUrl && posterUrl.indexOf("/") === 0) {
                posterUrl = "https://manga.io.vn" + posterUrl;
            }
        }

        // Parse genres from tags/links
        var genreRegex = /href=["'](?:https?:\/\/manga\.io\.vn)?\/genres\/([^"']+)["'][^>]*>([^<]+)/gi;
        var gMatch;
        while ((gMatch = genreRegex.exec(apiResponseHtml)) !== null) {
            var gName = gMatch[2].trim();
            if (gName && genres.indexOf(gName) === -1) {
                genres.push(gName);
            }
        }
        var genresStr = genres.join(", ");

        // Build server & episodes list. First try JSON-LD list items which map URLs to IDs.
        var idMap = {};
        var schemaRegex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
        var sch;
        while ((sch = schemaRegex.exec(apiResponseHtml)) !== null) {
            try {
                var schemaJson = JSON.parse(sch[1]);
                var graph = schemaJson["@graph"] || [schemaJson];
                for (var j = 0; j < graph.length; j++) {
                    var item = graph[j];
                    if (item["@type"] === "ItemList" && item.itemListElement) {
                        var list = item.itemListElement;
                        for (var k = 0; k < list.length; k++) {
                            var u = list[k].url; // e.g. https://manga.io.vn/chapters/nguoi-dua-thu-vo-han/chapter-317/208850
                            var parts = u.split("/");
                            var id = parts[parts.length - 1]; // "208850"
                            var slug = parts[parts.length - 2]; // "chapter-317"
                            idMap[slug] = id;
                        }
                    }
                }
            } catch(e) {}
        }

        // Get base slug of manga
        var baseSlug = "";
        var canonicalMatch = /<link\s+rel="canonical"\s+href="https:\/\/manga\.io\.vn\/manga\/([^"'/]+)"/i.exec(apiResponseHtml) ||
                             /url["']\s*:\s*["']https?:\\\/\\\/manga\.io\.vn\\\/manga\\\/([^"']+)["']/i.exec(apiResponseHtml);
        if (canonicalMatch) {
            baseSlug = canonicalMatch[1];
        }

        // Extract all chapter links from HTML
        var episodes = [];
        var seenSlugs = {};
        var chapRegex = /href=["'](?:https?:\/\/manga\.io\.vn)?\/manga\/([^"'/]+)\/(chapter-[^"'/]+)["']/gi;
        var epMatch;
        while ((epMatch = chapRegex.exec(apiResponseHtml)) !== null) {
            var epSlug = epMatch[2];
            if (seenSlugs[epSlug]) continue;
            seenSlugs[epSlug] = true;

            var epName = epSlug.replace(/-/g, " ").replace(/\b\w/g, function(l){ return l.toUpperCase(); }); // "Chapter 317"
            var playId = "";
            if (idMap[epSlug]) {
                playId = "https://manga.io.vn/ajax/image/list/chap/" + idMap[epSlug];
            } else {
                playId = "https://manga.io.vn/manga/" + baseSlug + "/" + epSlug;
            }

            episodes.push({
                id: playId,
                name: epName,
                slug: epSlug
            });
        }

        // Sort episodes in ascending order (by chapter number)
        episodes.sort(function(a, b) {
            var na = parseFloat(a.slug.replace(/[^\d.]/g, '')) || 0;
            var nb = parseFloat(b.slug.replace(/[^\d.]/g, '')) || 0;
            return na - nb;
        });

        var servers = [];
        if (episodes.length > 0) {
            servers.push({
                name: "Manga",
                episodes: episodes
            });
        }

        return JSON.stringify({
            id: baseSlug,
            title: title,
            originName: title,
            posterUrl: posterUrl,
            backdropUrl: posterUrl,
            description: description,
            year: year,
            rating: 0,
            quality: "HD",
            servers: servers,
            episode_current: episodes.length > 0 ? (episodes.length + " chương") : "",
            lang: "VI",
            category: genresStr,
            country: "VI",
            director: author,
            casts: "",
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
        var images = [];

        // Check if response is AJAX JSON response
        if (apiResponseHtml.indexOf('{"status":') === 0 || apiResponseHtml.indexOf('{"status":') > -1) {
            var data = JSON.parse(apiResponseHtml);
            var html = data.html || "";
            var imgRegex = /href=["']([^"']+)["']/g;
            var match;
            while ((match = imgRegex.exec(html)) !== null) {
                var imgUrl = match[1];
                if (imgUrl.indexOf("http") !== 0) {
                    if (imgUrl.indexOf("//") === 0) {
                        imgUrl = "https:" + imgUrl;
                    } else {
                        imgUrl = "https://manga.io.vn" + imgUrl;
                    }
                }
                if (images.indexOf(imgUrl) === -1) {
                    images.push(imgUrl);
                }
            }
        } else {
            // It's the watch page HTML (fallback for older chapters)
            var chapIdMatch = /const\s+CHAPTER_ID\s*=\s*(\d+)/.exec(apiResponseHtml) ||
                             /CHAPTER_ID\s*=\s*(\d+)/.exec(apiResponseHtml);
            if (chapIdMatch) {
                var chapId = chapIdMatch[1];
                var fallbackUrl = "https://manga.io.vn/ajax/image/list/chap/" + chapId;
                images.push(fallbackUrl);
            }
        }

        return JSON.stringify({
            urls: images,
            images: images,
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://manga.io.vn/"
            }
        });
    } catch (error) {
        return JSON.stringify({ urls: [], images: [], headers: {} });
    }
}

function parseCategoriesResponse(apiResponseJson) {
    return getPrimaryCategories();
}

function parseCountriesResponse(apiResponseJson) {
    return JSON.stringify([]);
}

function parseYearsResponse(apiResponseJson) {
    return JSON.stringify([]);
}
