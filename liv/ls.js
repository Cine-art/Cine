// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================
function getManifest() {
    return JSON.stringify({
        "id": "luongsontv",
        "name": "LuongSonTV",
        "version": "1.0.1",
        "baseUrl": "https://luongsontv60.online",
        "iconUrl": "https://luongsontv60.online/wp-content/uploads/2025/04/cropped-fav-32x32.webp",
        "isEnabled": true,
        "type": "MOVIE"
    });
}
function getHomeSections() {
    return JSON.stringify([
        { "slug": "truc-tiep", "title": "Bóng Đá Trực Tiếp", "type": "Grid", "path": "" },
        { "slug": "hot", "title": "Trận Đấu Hot", "type": "Horizontal", "path": "" },
        { "slug": "live", "title": "Đang Diễn Ra (LIVE)", "type": "Horizontal", "path": "" }
    ]);
}
function getPrimaryCategories() {
    return JSON.stringify([
        { "name": "Bóng Đá Trực Tiếp", "slug": "truc-tiep" },
        { "name": "Trận Đấu Hot", "slug": "hot" },
        { "name": "Đang Trực Tiếp", "slug": "live" },
        { "name": "Hôm Nay", "slug": "today" },
        { "name": "Ngày Mai", "slug": "tomorrow" }
    ]);
}
function getFilterConfig() {
    return JSON.stringify({
        "sort": [
            { "name": "Mặc định", "value": "default" }
        ]
    });
}
// =============================================================================
// URL GENERATION
// =============================================================================
function getUrlList(slug, filtersJson) {
    var isHot = "false";
    var isLive = "false";
    var isToday = "false";
    var isTomorrow = "false";
    if (slug === "hot") {
        isHot = "true";
    } else if (slug === "live") {
        isLive = "true";
    } else if (slug === "today") {
        isToday = "true";
    } else if (slug === "tomorrow") {
        isTomorrow = "true";
    }
    var ts = new Date().getTime();
    return "https://api-ls.cdnokvip.com/api/get-livestream-group?isHot=" + isHot + 
           "&isLive=" + isLive + 
           "&isToday=" + isToday + 
           "&isTomorrow=" + isTomorrow + 
           "&limit=100&offset=0&_t=" + ts;
}
function getUrlSearch(keyword, filtersJson) {
    // Return all matches, client-side filtering will be applied
    var ts = new Date().getTime();
    return "https://api-ls.cdnokvip.com/api/get-livestream-group?isHot=false&isLive=false&isToday=false&isTomorrow=false&limit=150&offset=0&_t=" + ts;
}
function getUrlDetail(slug) {
    if (slug.indexOf("http://") === 0 || slug.indexOf("https://") === 0) {
        return slug;
    }
    return "https://luongsontv60.online/truc-tiep/" + slug + "/";
}
// =============================================================================
// PARSERS
// =============================================================================
function parseListResponse(jsonContent) {
    var items = [];
    
    try {
        var payload = JSON.parse(jsonContent);
        var list = [];
        
        // Normalize payload structure
        if (Array.isArray(payload)) {
            list = payload;
        } else if (payload && payload.value && Array.isArray(payload.value.datas)) {
            list = payload.value.datas;
        } else if (payload && Array.isArray(payload.datas)) {
            list = payload.datas;
        } else if (payload && Array.isArray(payload.data)) {
            list = payload.data;
        } else if (payload && Array.isArray(payload.matches)) {
            list = payload.matches;
        }
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var home = item.homeName || item.home_name || "Unknown";
            var away = item.awayName || item.away_name || "Unknown";
            var title = home + " vs " + away;
            var slug = item.slugUrl || item.slug;
            if (!slug) continue;
            
            var poster = item.homeLogo || item.home_logo || "";
            var backdrop = item.awayLogo || item.away_logo || "";
            var defaultLogo = "https://luongsontv60.online/wp-content/uploads/2025/04/cropped-fav-180x180.webp";
            
            var matchTime = parseInt(item.matchTime || item.match_time, 10);
            var year = 2026;
            var timeStr = "";
            if (!isNaN(matchTime)) {
                // Determine if timestamp is in milliseconds or seconds
                var seconds = matchTime > 2000000000 ? Math.floor(matchTime / 1000) : matchTime;
                var date = new Date(seconds * 1000);
                year = date.getFullYear() || 2026;
                var hours = date.getHours().toString().padStart(2, '0');
                var minutes = date.getMinutes().toString().padStart(2, '0');
                var day = date.getDate().toString().padStart(2, '0');
                var month = (date.getMonth() + 1).toString().padStart(2, '0');
                timeStr = hours + ":" + minutes + " " + day + "/" + month;
            }
            
            var status = "Sắp diễn ra";
            var isLive = item.liveGame || item.live_game || item.isLiveHomePage || item.is_live_home_page;
            var statusCode = Number(item.status || 0);
            
            if (isLive || statusCode === 1 || statusCode === 2 || statusCode === 3 || statusCode === 4) {
                status = "LIVE";
            } else if (statusCode === 5 || statusCode === -1) {
                status = "Kết thúc";
            }
            
            var displayStatus = status + (timeStr ? " (" + timeStr + ")" : "");
            
            items.push({
                "id": slug,
                "title": title,
                "posterUrl": poster || defaultLogo,
                "backdropUrl": backdrop || defaultLogo,
                "year": year,
                "quality": "HD",
                "episode_current": displayStatus
            });
        }
    } catch (e) {
        // Parsing error
    }
    
    return JSON.stringify({
        "items": items,
        "pagination": {
            "currentPage": 1,
            "totalPages": 1
        }
    });
}
function parseSearchResponse(jsonContent, keyword) {
    var resultJson = parseListResponse(jsonContent);
    if (!keyword) return resultJson;
    
    try {
        var parsed = JSON.parse(resultJson);
        var items = parsed.items || [];
        var kw = keyword.toLowerCase();
        
        var filteredItems = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.title.toLowerCase().indexOf(kw) > -1 || item.id.toLowerCase().indexOf(kw) > -1) {
                filteredItems.push(item);
            }
        }
        
        parsed.items = filteredItems;
        return JSON.stringify(parsed);
    } catch (e) {
        return resultJson;
    }
}
function parseMovieDetail(htmlContent, apiUrl) {
    var slug = apiUrl.substring(apiUrl.lastIndexOf("/") + 1);
    if (slug.endsWith("/")) {
        slug = slug.substring(0, slug.length - 1);
    }
    if (slug.indexOf("?") > -1) {
        slug = slug.substring(0, slug.indexOf("?"));
    }
    
    var title = "Trận đấu LuongSonTV";
    var description = "Xem trực tiếp thể thao chất lượng cao trên LuongSonTV.";
    var posterUrl = "https://luongsontv60.online/wp-content/uploads/2025/04/cropped-fav-180x180.webp";
    var rating = 8.5;
    var year = 2026;
    
    // Extract metadata from og tags
    var ogTitle = /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
    if (ogTitle) title = ogTitle[1];
    
    var ogDesc = /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
    if (ogDesc) description = ogDesc[1];
    
    var ogImg = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
    if (ogImg) posterUrl = ogImg[1];
    var matchObj = null;
    
    // Attempt 1: Search for match data JSON object block (supporting currentMatchData)
    var matchDataMatch = /(?:var|window\.)\s*(?:match|matchData|currentMatch|currentMatchData)\s*=\s*(\{[\s\S]*?\});/.exec(htmlContent);
    if (matchDataMatch) {
        try {
            matchObj = JSON.parse(matchDataMatch[1]);
        } catch (e) {}
    }
    
    // Attempt 2: Search for window.streamData JSON block
    if (!matchObj) {
        var streamDataMatch = /window\.streamData\s*=\s*(\{[\s\S]*?\});/.exec(htmlContent);
        if (streamDataMatch) {
            try {
                matchObj = JSON.parse(streamDataMatch[1]);
            } catch (e) {}
        }
    }
    
    var matchId = "";
    var commentators = [];
    
    if (matchObj) {
        matchId = matchObj.matchId || matchObj.match_id || "";
        
        var refs = matchObj.liveScoreRefs || matchObj.live_score_refs || [];
        if (Array.isArray(refs)) {
            for (var i = 0; i < refs.length; i++) {
                var ref = refs[i];
                if (ref && ref.commentator) {
                    commentators.push({
                        "name": ref.commentator,
                        "id": ref.commentatorId || ref.commentator_id || ""
                    });
                }
            }
        }
        
        // Fallback commentator from root object
        if (commentators.length === 0 && matchObj.commentator) {
            commentators.push({
                "name": matchObj.commentator,
                "id": matchObj.commentatorId || matchObj.commentator_id || ""
            });
        }
    }
    
    // Attempt 3: Regex fallback for matchId and commentators if JSON object was not parsed
    if (!matchId) {
        var matchIdRegex = /matchId\s*["']?\s*:\s*["']([^"']+)["']/i.exec(htmlContent);
        if (matchIdRegex) matchId = matchIdRegex[1];
        
        if (!matchId) {
            var matchIdVarRegex = /var\s+match_id\s*=\s*["']([^"']+)["']/i.exec(htmlContent);
            if (matchIdVarRegex) matchId = matchIdVarRegex[1];
        }
    }
    
    var servers = [];
    var episodesDirect = [];
    var episodesInplyr = [];
    var episodesCdnokvip = [];
    
    if (matchObj) {
        // Extract main direct streaming link
        var mainLink = matchObj.linkLive || matchObj.link_live || "";
        if (mainLink) {
            episodesDirect.push({
                "id": mainLink,
                "name": "Kênh chính (Đường truyền trực tiếp)",
                "slug": "kenh-chinh-direct"
            });
        }
    }
    
    // Add Main Channel streams
    if (matchId) {
        episodesInplyr.push({
            "id": "https://live.inplyr.com/default/" + matchId + ".m3u8",
            "name": "Kênh chính (Inplyr)",
            "slug": "kenh-chinh-inplyr"
        });
        episodesCdnokvip.push({
            "id": "https://hls.cdnokvip.com/default/" + matchId + ".m3u8",
            "name": "Kênh chính (Okvip)",
            "slug": "kenh-chinh-okvip"
        });
    } else {
        // Ultimate fallback using slug URL
        episodesInplyr.push({
            "id": "https://live.inplyr.com/default/" + slug + ".m3u8",
            "name": "Kênh chính (Inplyr)",
            "slug": "default"
        });
    }
    
    // Add Commentator streams
    for (var j = 0; j < commentators.length; j++) {
        var comm = commentators[j];
        if (comm.id) {
            episodesInplyr.push({
                "id": "https://live.inplyr.com/room/" + comm.id + ".m3u8",
                "name": comm.name + " (Inplyr)",
                "slug": "blv-inplyr-" + comm.id
            });
            episodesCdnokvip.push({
                "id": "https://hls.cdnokvip.com/room/" + comm.id + ".m3u8",
                "name": comm.name + " (Okvip)",
                "slug": "blv-okvip-" + comm.id
            });
        }
    }
    
    // Attempt 4: Scan page for any raw HLS .m3u8 URLs and add them to servers list
    var rawM3u8Regex = /https?:\/\/[^\s"'`<>]*\.m3u8[^\s"'`<>]*/gi;
    var rawMatch;
    var seenUrls = {};
    var rawEps = [];
    
    while ((rawMatch = rawM3u8Regex.exec(htmlContent)) !== null) {
        var m3u8Url = rawMatch[0].replace(/\\/g, "");
        if (!seenUrls[m3u8Url]) {
            seenUrls[m3u8Url] = true;
            rawEps.push({
                "id": m3u8Url,
                "name": "Đường truyền trực tiếp " + (rawEps.length + 1),
                "slug": "raw-stream-" + (rawEps.length + 1)
            });
        }
    }
    
    if (rawEps.length > 0) {
        servers.push({
            "name": "Đường truyền trực tiếp (Web)",
            "episodes": rawEps
        });
    }
    
    // Add direct server (highest priority)
    if (episodesDirect.length > 0) {
        servers.push({
            "name": "Lương Sơn Direct Server",
            "episodes": episodesDirect
        });
    }
    
    // Add default servers
    if (episodesInplyr.length > 0) {
        servers.push({
            "name": "Inplyr Stream Server",
            "episodes": episodesInplyr
        });
    }
    if (episodesCdnokvip.length > 0) {
        servers.push({
            "name": "Okvip Stream Server",
            "episodes": episodesCdnokvip
        });
    }
    
    // Attempt 5: Look for iframe elements as fallback embeds
    var iframeRegex = /<iframe[^>]+src=["']([^"']+)["']/gi;
    var iframeMatch;
    var iframeEps = [];
    while ((iframeMatch = iframeRegex.exec(htmlContent)) !== null) {
        var srcUrl = iframeMatch[1];
        if (srcUrl.indexOf("http") !== 0) {
            if (srcUrl.indexOf("//") === 0) {
                srcUrl = "https:" + srcUrl;
            } else {
                srcUrl = "https://luongsontv60.online" + srcUrl;
            }
        }
        if (srcUrl.indexOf("facebook.com") === -1 && srcUrl.indexOf("google.com") === -1) {
            iframeEps.push({
                "id": srcUrl,
                "name": "Trình phát nhúng " + (iframeEps.length + 1),
                "slug": "embed-" + (iframeEps.length + 1)
            });
        }
    }
    
    if (iframeEps.length > 0) {
        servers.push({
            "name": "Trình phát nhúng dự phòng",
            "episodes": iframeEps
        });
    }
    
    return JSON.stringify({
        "id": slug,
        "title": title,
        "originName": title,
        "posterUrl": posterUrl,
        "backdropUrl": posterUrl,
        "description": description,
        "year": year,
        "rating": rating,
        "quality": "HD",
        "servers": servers,
        "casts": "",
        "category": "Live Sports",
        "country": "Vietnam",
        "status": "ongoing"
    });
}
function parseDetailResponse(htmlContent, apiUrl) {
    // If the resolved episode ID is a direct HLS url, we can play it directly,
    // otherwise check if it needs embedding.
    var isEmbed = false;
    if (apiUrl.indexOf(".m3u8") === -1 && (apiUrl.indexOf("/room/") === -1 && apiUrl.indexOf("/default/") === -1)) {
        isEmbed = true;
    }
    
    return JSON.stringify({
        "url": apiUrl,
        "isEmbed": isEmbed,
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": "https://luongsontv60.online/"
        }
    });
}
