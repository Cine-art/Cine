// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "sieutamphim",
        "name": "SieuTamPhim",
        "version": "1.0.0",
        "baseUrl": "https://www.sieutamphim.pro",
        "iconUrl": "https://www.sieutamphim.pro/favicon.ico",
        "isEnabled": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { "title": "Phim Mới Cập Nhật", "slug": "phim-moi" },
        { "title": "Phim Lẻ", "slug": "phim-le" },
        { "title": "Phim Bộ", "slug": "phim-bo" },
        { "title": "Phim Chiếu Rạp", "slug": "phim-chieu-rap" },
        { "title": "Hoạt Hình", "slug": "hoat-hinh" }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { "name": "Bản Quyền", "slug": "ban-quyen" },
        { "name": "Phim Lẻ", "slug": "phim-le" },
        { "name": "Phim Bộ", "slug": "phim-bo" },
        { "name": "Movie", "slug": "movie" },
        { "name": "Series", "slug": "series" },
        { "name": "Phim Mới", "slug": "phim-moi" },
        { "name": "Phim Hàn Quốc", "slug": "phim-han-quoc" },
        { "name": "Phim Mỹ", "slug": "phim-my" },
        { "name": "Phim Trung Quốc", "slug": "phim-trung-quoc" },
        { "name": "Phim Thái Lan", "slug": "phim-thai-lan" },
        { "name": "Phim Nhật Bản", "slug": "phim-nhat-ban" },
        { "name": "Phim Việt Nam", "slug": "phim-viet-nam" },
        { "name": "Phim Ấn Độ", "slug": "phim-an-do" },
        { "name": "Phim Hồng Kông", "slug": "phim-hong-kong" },
        { "name": "Lồng Tiếng", "slug": "long-tieng" },
        { "name": "Thuyết Minh", "slug": "thuyet-minh" },
        { "name": "VietSub", "slug": "vietsub" }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        "sort": [
            { "name": "Mới cập nhật", "value": "latest" }
        ]
    });
}

// =============================================================================
// URL GENERATION
// =============================================================================

function getUrlList(slug, filtersJson) {
    try {
        var page = 1;
        var category = "";
        
        if (filtersJson) {
            var filters = JSON.parse(filtersJson);
            if (filters.page) {
                page = parseInt(filters.page, 10);
            }
            if (filters.category) {
                category = filters.category;
            }
        }
        
        var targetSlug = category || slug || "phim-moi";
        
        if (page > 1) {
            return "https://www.sieutamphim.pro/search/label/" + targetSlug + "/page/" + page;
        }
        return "https://www.sieutamphim.pro/search/label/" + targetSlug;
    } catch (e) {
        return "https://www.sieutamphim.pro/search/label/phim-moi";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var page = 1;
        if (filtersJson) {
            var filters = JSON.parse(filtersJson);
            if (filters.page) {
                page = parseInt(filters.page, 10);
            }
        }
        
        if (page > 1) {
            return "https://www.sieutamphim.pro/page/" + page + "?s=" + encodeURIComponent(keyword);
        }
        return "https://www.sieutamphim.pro/?s=" + encodeURIComponent(keyword);
    } catch (e) {
        return "https://www.sieutamphim.pro/?s=" + encodeURIComponent(keyword);
    }
}

function getUrlDetail(slug) {
    if (slug.indexOf("http") === 0) {
        return slug;
    }
    return "https://www.sieutamphim.pro/" + slug + ".html";
}

function getUrlCategories() {
    return "https://www.sieutamphim.pro/search/label/phim-le";
}

function getUrlCountries() {
    return "https://www.sieutamphim.pro/search/label/phim-le";
}

function getUrlYears() {
    return "https://www.sieutamphim.pro/search/label/phim-le";
}

// =============================================================================
// PARSERS & UTILITIES
// =============================================================================

function decryptEpisodeKey(key) {
    var result = "";
    for (var i = 0; i < key.length; i++) {
        result += String.fromCharCode(key.charCodeAt(i) ^ 0x2a);
    }
    // Replace short.ink or short.icu with abyssplayer.com
    return result.replace(/https?:\/\/(short\.ink|short\.icu)\//g, "https://abyssplayer.com/");
}

function parseListResponse(html) {
    try {
        var movies = [];
        var seen = {};
        
        // Find all wordpress style /yyyy/mm/slug.html links
        var regex = /href="https:\/\/www\.sieutamphim\.pro\/(\d{4}\/\d{2}\/[^"]+)\.html"/g;
        var match;
        while ((match = regex.exec(html)) !== null) {
            var slug = match[1];
            if (seen[slug]) continue;
            seen[slug] = true;
            
            var start = Math.max(0, match.index - 200);
            var end = Math.min(html.length, match.index + 2000);
            var chunk = html.substring(start, end);
            
            var title = "";
            var quality = "HD";
            var poster = "";
            
            var imgMatch = chunk.match(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"/i) || chunk.match(/alt="([^"]+)"[^>]*src="([^"]+)"/i);
            if (imgMatch) {
                var altText = "";
                if (imgMatch[0].indexOf("src=") < imgMatch[0].indexOf("alt=")) {
                    poster = imgMatch[1];
                    altText = imgMatch[2];
                } else {
                    altText = imgMatch[1];
                    poster = imgMatch[2];
                }
                
                altText = altText.replace(/&#8211;/g, "-").replace(/&amp;/g, "&");
                var titleParts = altText.split(/\s*-\s*Status:\s*/i);
                title = titleParts[0].trim();
                if (titleParts.length > 1) {
                    quality = titleParts[1].trim();
                }
            }
            
            if (!title) {
                var titleMatch = chunk.match(/<h5[^>]*class="post-title[^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i);
                if (titleMatch) {
                    title = titleMatch[1].replace(/<[^>]*>/g, "").replace(/&#8211;/g, "-").replace(/&amp;/g, "&").trim();
                    var titleParts = title.split(/\s*-\s*Status:\s*/i);
                    title = titleParts[0].trim();
                    if (titleParts.length > 1) {
                        quality = titleParts[1].trim();
                    }
                }
            }
            
            if (!poster) {
                var srcMatch = chunk.match(/src="([^"]+)"/i);
                if (srcMatch) {
                    poster = srcMatch[1];
                }
            }
            
            // Clean up poster URL entity references
            if (poster) {
                poster = poster.replace(/&amp;/g, "&");
            }
            
            movies.push({
                "id": slug,
                "title": title || slug.split("/").pop().replace(/-/g, " "),
                "originName": "",
                "posterUrl": poster,
                "backdropUrl": poster,
                "year": 0,
                "quality": quality,
                "episode_current": "",
                "lang": "Vietsub"
            });
        }
        
        // Pagination
        var currentPage = 1;
        var totalPages = 1;
        var pagMatch = html.match(/<div class="pagination">([\s\S]*?)<\/div>/i);
        if (pagMatch) {
            var pagHtml = pagMatch[1];
            var activeMatch = pagHtml.match(/<li[^>]*class="active"[^>]*>[\s\S]*?>(\d+)<\/a>/i) || pagHtml.match(/<li[^>]*class="active"[^>]*>([^<]+)<\/li>/i);
            if (activeMatch) {
                currentPage = parseInt(activeMatch[1], 10);
            }
            
            var pageRegex = /\/page\/(\d+)/g;
            var pMatch;
            while ((pMatch = pageRegex.exec(pagHtml)) !== null) {
                var pNum = parseInt(pMatch[1], 10);
                if (pNum > totalPages) {
                    totalPages = pNum;
                }
            }
            if (currentPage > totalPages) {
                totalPages = currentPage;
            }
        }
        
        return JSON.stringify({
            "items": movies,
            "pagination": {
                "currentPage": currentPage,
                "totalPages": totalPages
            }
        });
    } catch (e) {
        return JSON.stringify({ "items": [], "pagination": { "currentPage": 1, "totalPages": 1 } });
    }
}

function parseSearchResponse(html) {
    return parseListResponse(html);
}

function parseMovieDetail(html, currentUrl) {
    try {
        var title = "";
        var titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || html.match(/<meta property="og:title" content="([^"]+)"/i);
        if (titleMatch) {
            title = titleMatch[1].replace(/ - Status:[\s\S]*$/i, "").replace(/ - Siêu Tầm Phim/i, "").trim();
        }
        
        var description = "";
        var descMatch = html.match(/<meta name="description" content="([^"]+)"/i) || html.match(/<meta property="og:description" content="([^"]+)"/i);
        if (descMatch) {
            description = descMatch[1].replace(/Tên Phim[\s\S]*Nội Dung Phim:/i, "").trim();
        }
        
        var poster = "";
        var posterMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
        if (posterMatch) {
            poster = posterMatch[1].replace(/&amp;/g, "&");
        }
        
        var year = 0;
        var yearMatch = html.match(/\((\d{4})\)/) || description.match(/\b(19\d{2}|20\d{2})\b/);
        if (yearMatch) {
            year = parseInt(yearMatch[1], 10);
        }
        
        // Extract Categories/Genres from metadata links
        var cats = [];
        var catRegex = /href="https:\/\/www\.sieutamphim\.pro\/search\/[^\/]+\/([^"\/]+)"[^>]*>([^<]+)<\/a>/g;
        var catMatch;
        var seenCat = {};
        while ((catMatch = catRegex.exec(html)) !== null) {
            var cSlug = catMatch[1];
            var cName = catMatch[2].trim();
            if (cSlug !== "tat-ca-phim" && cSlug !== "hx" && !seenCat[cSlug] && cName && cName.indexOf("Xem Thêm") === -1) {
                seenCat[cSlug] = true;
                cats.push(cName);
            }
        }
        var category = cats.join(", ");
        
        // Parse episodes from class="episodeGroup"
        var servers = [];
        var groupRegex = /<div[^>]*class="episodeGroup"[^>]*data-server="([^"]+)"[^>]*data-episodes='([^']+)'/g;
        var groupMatch;
        while ((groupMatch = groupRegex.exec(html)) !== null) {
            var sName = groupMatch[1].toUpperCase();
            var dataEpisodes = groupMatch[2];
            
            var episodes = [];
            var epRegex = /\{"([^"]+)","([^"]+)"\}/g;
            var epMatch;
            while ((epMatch = epRegex.exec(dataEpisodes)) !== null) {
                var encryptedKey = epMatch[1];
                var epName = epMatch[2];
                var decryptedUrl = decryptEpisodeKey(encryptedKey);
                
                episodes.push({
                    "id": decryptedUrl,
                    "name": epName,
                    "slug": epName.toLowerCase().replace(/\s+/g, "-")
                });
            }
            
            if (episodes.length > 0) {
                servers.push({
                    "name": sName,
                    "episodes": episodes
                });
            }
        }
        
        return JSON.stringify({
            "id": currentUrl ? currentUrl.split("/").pop().replace(".html", "") : "",
            "title": title,
            "originName": "",
            "posterUrl": poster,
            "backdropUrl": poster,
            "description": description,
            "year": year,
            "rating": 0,
            "quality": "HD",
            "servers": servers,
            "episode_current": "",
            "lang": "Vietsub",
            "category": category,
            "country": "Hàn Quốc",
            "director": "N/A",
            "casts": "N/A",
            "tmdbId": "",
            "tmdbSeason": 0,
            "tmdbType": ""
        });
    } catch (e) {
        return "null";
    }
}

function parseDetailResponse(html) {
    try {
        if (!html) return "{}";
        
        // If it is already a direct JSON stream structure
        if (html.indexOf('"url":') > -1) {
            return html;
        }
        
        // If it's a direct url returned (e.g. from FileMoon bypass or direct mp4/m3u8 link)
        if ((html.indexOf("http://") === 0 || html.indexOf("https://") === 0) && html.indexOf("<html") === -1 && html.indexOf("<body") === -1) {
            return JSON.stringify({
                "url": html.trim(),
                "headers": {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Referer": "https://www.sieutamphim.pro/"
                },
                "subtitles": []
            });
        }
        
        // Otherwise, it is the player page HTML. We extract "datas" string and decrypt it.
        var datasB64 = "";
        var datasMatch = html.match(/var\s+datas\s*=\s*"([^"]+)"/i) || html.match(/datas\s*=\s*"([^"]+)"/i);
        if (datasMatch) {
            datasB64 = datasMatch[1];
        }
        
        if (!datasB64) {
            return "{}";
        }
        
        // Custom base64 decode (since atob might not be standard in all JS environments, we define a basic one)
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var decoded = '';
        var buffer = 0;
        var bits = 0;
        for (var i = 0; i < datasB64.length; i++) {
            var char = datasB64.charAt(i);
            var idx = chars.indexOf(char);
            if (idx === -1) continue;
            if (char === '=') break;
            buffer = (buffer << 6) | idx;
            bits += 6;
            if (bits >= 8) {
                bits -= 8;
                decoded += String.fromCharCode((buffer >> bits) & 0xff);
            }
        }
        
        var data = JSON.parse(decoded);
        var keyStr = data.user_id + ":" + data.slug + ":" + data.md5_id;
        
        // Compute MD5 key for AES decryption
        var md5Hex = CryptoJS.MD5(keyStr).toString();
        
        var cipherBytes = [];
        for (var i = 0; i < data.media.length; i++) {
            cipherBytes.push(data.media.charCodeAt(i));
        }
        var cipherWords = CryptoJS.lib.WordArray.create(new Uint8Array(cipherBytes));
        
        var decrypted = CryptoJS.AES.decrypt(
            { ciphertext: cipherWords },
            CryptoJS.enc.Utf8.parse(md5Hex),
            {
                iv: CryptoJS.enc.Utf8.parse(md5Hex.slice(0, 16)),
                mode: CryptoJS.mode.CTR,
                padding: CryptoJS.pad.NoPadding
            }
        );
        
        var plainText = decrypted.toString(CryptoJS.enc.Utf8);
        var mediaObj = JSON.parse(plainText);
        
        // Extract direct CDN URL from resolved media object
        var streamUrl = "";
        if (mediaObj.mp4 && mediaObj.mp4.fristDatas && mediaObj.mp4.fristDatas.length > 0) {
            // Find 720p or 1080p (h264 preferred), otherwise fallback to first
            var fd = null;
            var targetResIds = [5, 4, 3, 2];
            for (var r = 0; r < targetResIds.length; r++) {
                for (var i = 0; i < mediaObj.mp4.fristDatas.length; i++) {
                    var item = mediaObj.mp4.fristDatas[i];
                    if (item.res_id === targetResIds[r] && item.codec === "h264") {
                        fd = item;
                        break;
                    }
                }
                if (fd) break;
            }
            if (!fd) {
                fd = mediaObj.mp4.fristDatas[0];
            }
            if (fd) {
                // Find matching domain/sub from sources
                var matchedSource = null;
                if (mediaObj.mp4.sources) {
                    for (var i = 0; i < mediaObj.mp4.sources.length; i++) {
                        var src = mediaObj.mp4.sources[i];
                        if (src.res_id === fd.res_id && src.size === fd.size) {
                            matchedSource = src;
                            break;
                        }
                    }
                }
                if (matchedSource && matchedSource.sub) {
                    var subDomain = matchedSource.sub + ".sssrr.org";
                    var sizeStr = String(fd.size);
                    var md5_id = data.md5_id;
                    var path = "/mp4/" + md5_id + "/" + fd.res_id + "/" + sizeStr;
                    
                    // Helper base64 encoder
                    var base64Encode = function(str) {
                        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
                        var encoded = '';
                        for (var j = 0; j < str.length; j += 3) {
                            var c1 = str.charCodeAt(j);
                            var c2 = j + 1 < str.length ? str.charCodeAt(j + 1) : NaN;
                            var c3 = j + 2 < str.length ? str.charCodeAt(j + 2) : NaN;
                            
                            var byte1 = c1 >> 2;
                            var byte2 = ((c1 & 3) << 4) | (isNaN(c2) ? 0 : c2 >> 4);
                            var byte3 = isNaN(c2) ? 64 : ((c2 & 15) << 2) | (isNaN(c3) ? 0 : c3 >> 6);
                            var byte4 = isNaN(c3) ? 64 : c3 & 63;
                            
                            encoded += chars.charAt(byte1) + chars.charAt(byte2) + chars.charAt(byte3) + chars.charAt(byte4);
                        }
                        return encoded;
                    };
                    
                    // Hashing algorithm: AES-CTR-128 using MD5(sizeStr) as key
                    var keyMd5Hex = CryptoJS.MD5(sizeStr).toString();
                    var keyWords = CryptoJS.enc.Utf8.parse(keyMd5Hex);
                    var ivWords = CryptoJS.enc.Utf8.parse(keyMd5Hex.slice(0, 16));
                    
                    var encrypted = CryptoJS.AES.encrypt(
                        path,
                        keyWords,
                        {
                            iv: ivWords,
                            mode: CryptoJS.mode.CTR,
                            padding: CryptoJS.pad.NoPadding
                        }
                    );
                    
                    var ciphertextWords = encrypted.ciphertext;
                    var binaryStr = "";
                    for (var j = 0; j < ciphertextWords.sigBytes; j++) {
                        var byte = (ciphertextWords.words[j >>> 2] >>> (24 - (j % 4) * 8)) & 0xff;
                        binaryStr += String.fromCharCode(byte);
                    }
                    
                    var b64_1 = base64Encode(binaryStr).replace(/=/g, '');
                    var b64_2 = base64Encode(b64_1).replace(/=/g, '');
                    
                    streamUrl = "https://" + subDomain + "/sora/" + sizeStr + "/" + b64_2;
                } else {
                    streamUrl = fd.url;
                }
            }
        }
        
        // If we found the stream URL, return it
        if (streamUrl) {
            return JSON.stringify({
                "url": streamUrl,
                "headers": {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Referer": "https://abyssplayer.com/"
                },
                "subtitles": []
            });
        }
        
        return "{}";
    } catch (e) {
        return "{}";
    }
}

function parseCategoriesResponse(html) {
    return getPrimaryCategories();
}

function parseCountriesResponse(html) {
    return JSON.stringify([]);
}

function parseYearsResponse(html) {
    return JSON.stringify([]);
}
