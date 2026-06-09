// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "chuoichientv",
        "name": "ChuoiChienTV",
        "version": "1.0.3",
        "baseUrl": "https://live33.chuoichientv.com",
        "iconUrl": "https://media.chuoichientv.com/media/uploads/20250618_144837_81ae2275.png",
        "isEnabled": true,
        "type": "LIVE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { "slug": "truc-tiep", "title": "Bóng Đá & Bóng Chuyền", "type": "Grid", "path": "" },
        { "slug": "hot", "title": "Trận Đấu Hot", "type": "Horizontal", "path": "" },
        { "slug": "live", "title": "Đang Diễn Ra (LIVE)", "type": "Horizontal", "path": "" }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { "name": "Bóng Đá & Bóng Chuyền", "slug": "truc-tiep" },
        { "name": "Trận Đấu Hot", "slug": "hot" },
        { "name": "Đang Diễn Ra", "slug": "live" }
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
    // We always request all matches, client-side filtering handles sections
    var ts = new Date().getTime();
    return "https://api-v2.chuoichientv.com/v2/matches?_t=" + ts + "|__headers__=Referer=https://live33.chuoichientv.com/";
}

function getUrlSearch(keyword, filtersJson) {
    var ts = new Date().getTime();
    return "https://api-v2.chuoichientv.com/v2/matches?_t=" + ts + "|__headers__=Referer=https://live33.chuoichientv.com/";
}

function getUrlDetail(slug) {
    // If slug is already a fully qualified watch URL, return it directly
    if (slug.indexOf("http://") === 0 || slug.indexOf("https://") === 0) {
        return slug;
    }
    // We append the match ID as a query parameter so we can isolate it during parsing
    return "https://api-v2.chuoichientv.com/v2/matches?id=" + encodeURIComponent(slug) + "|__headers__=Referer=https://live33.chuoichientv.com/";
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(jsonContent) {
    var items = [];
    
    try {
        var data = JSON.parse(jsonContent);
        var list = data.matches || [];
        
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var home = "Unknown";
            var away = "Unknown";
            var poster = "";
            var backdrop = "";
            
            if (item.teams) {
                if (item.teams.home) {
                    home = item.teams.home.name || "Unknown";
                    poster = item.teams.home.logo || "";
                }
                if (item.teams.away) {
                    away = item.teams.away.name || "Unknown";
                    backdrop = item.teams.away.logo || "";
                }
            }
            
            var title = home + " vs " + away;
            var slug = item._id;
            if (!slug) continue;
            
            var defaultLogo = "https://media.chuoichientv.com/media/uploads/20250618_144837_81ae2275.png";
            
            // Format match time (ISO format e.g. "2026-06-03T03:30:00Z")
            var matchTimeStr = item.matchTime || "";
            var year = 2026;
            var timeStr = "";
            if (matchTimeStr) {
                try {
                    var date = new Date(matchTimeStr);
                    year = date.getFullYear() || 2026;
                    var hours = date.getHours().toString().padStart(2, '0');
                    var minutes = date.getMinutes().toString().padStart(2, '0');
                    var day = date.getDate().toString().padStart(2, '0');
                    var month = (date.getMonth() + 1).toString().padStart(2, '0');
                    timeStr = hours + ":" + minutes + " " + day + "/" + month;
                } catch(e) {}
            }
            
            // Score and Status
            var statusVal = (item.status || "").toLowerCase();
            var statusText = "Sắp diễn ra";
            
            if (statusVal !== "ns" && statusVal !== "ft" && statusVal !== "ft_ot" && statusVal !== "pen") {
                statusText = "LIVE";
            } else if (statusVal === "ft" || statusVal === "ft_ot" || statusVal === "pen") {
                statusText = "Kết thúc";
            }
            
            var homeScore = (item.score && item.score.home !== undefined) ? item.score.home : 0;
            var awayScore = (item.score && item.score.away !== undefined) ? item.score.away : 0;
            
            var scoreLabel = "";
            if (statusText !== "Sắp diễn ra") {
                scoreLabel = " (" + homeScore + "-" + awayScore + ")";
            }
            
            var displayStatus = statusText + scoreLabel + (timeStr ? " [" + timeStr + "]" : "");
            
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

function parseMovieDetail(jsonContent, apiUrl) {
    var cleanApiUrl = apiUrl;
    if (apiUrl.indexOf("|") > -1) {
        cleanApiUrl = apiUrl.substring(0, apiUrl.indexOf("|"));
    }
    var slug = "";
    var idMatch = /[?&]id=([^&]+)/.exec(cleanApiUrl);
    if (idMatch) {
        slug = decodeURIComponent(idMatch[1]);
    }
    
    var title = "Trận đấu ChuoiChienTV";
    var description = "Xem trực tiếp thể thao chất lượng cao trên ChuoiChienTV.";
    var posterUrl = "https://media.chuoichientv.com/media/uploads/20250618_144837_81ae2275.png";
    var rating = 9.0;
    var year = 2026;
    var servers = [];
    
    try {
        var data = JSON.parse(jsonContent);
        var list = data.matches || [];
        var matchObj = null;
        
        for (var i = 0; i < list.length; i++) {
            if (list[i]._id === slug) {
                matchObj = list[i];
                break;
            }
        }
        
        if (matchObj) {
            var home = "Unknown";
            var away = "Unknown";
            if (matchObj.teams) {
                if (matchObj.teams.home) {
                    home = matchObj.teams.home.name || "Unknown";
                    posterUrl = matchObj.teams.home.logo || posterUrl;
                }
                if (matchObj.teams.away) {
                    away = matchObj.teams.away.name || "Unknown";
                }
            }
            
            title = home + " vs " + away;
            description = "Trực tiếp giải " + (matchObj.league ? matchObj.league.name : "thể thao") + ".";
            
            // Map commentators to servers
            var blvList = matchObj.blvs || [];
            for (var j = 0; j < blvList.length; j++) {
                var blv = blvList[j];
                var name = blv.name || blv.username || "Bình luận viên";
                var streams = blv.streams || [];
                var episodes = [];
                
                for (var k = 0; k < streams.length; k++) {
                    var stream = streams[k];
                    // Only prioritize m3u8 formats for ExoPlayer playback
                    if (stream.url && stream.url.indexOf(".m3u8") > -1) {
                        episodes.push({
                            "id": stream.url,
                            "name": stream.label || ("Kênh " + (k + 1)),
                            "slug": "stream-" + j + "-" + k
                        });
                    }
                }
                
                if (episodes.length > 0) {
                    servers.push({
                        "name": "BLV " + name,
                        "episodes": episodes
                    });
                }
            }
            
            // Also check blvs_bonglau list for additional commentators
            var blvBongLau = matchObj.blvs_bonglau || [];
            for (var m = 0; m < blvBongLau.length; m++) {
                var blvBl = blvBongLau[m];
                var nameBl = blvBl.name || blvBl.username || "Bình luận viên";
                var streamsBl = blvBl.streams || [];
                var episodesBl = [];
                
                for (var n = 0; n < streamsBl.length; n++) {
                    var streamBl = streamsBl[n];
                    if (streamBl.url && streamBl.url.indexOf(".m3u8") > -1) {
                        episodesBl.push({
                            "id": streamBl.url,
                            "name": streamBl.label || ("Kênh " + (n + 1)),
                            "slug": "stream-bl-" + m + "-" + n
                        });
                    }
                }
                
                if (episodesBl.length > 0) {
                    servers.push({
                        "name": "BLV " + nameBl + " (Bóng Lẩu)",
                        "episodes": episodesBl
                    });
                }
            }
        }
    } catch (e) {
        // Parsing error
    }
    
    // Fallback empty server if none resolved
    if (servers.length === 0) {
        servers.push({
            "name": "ChuoiChienTV Player",
            "episodes": [
                {
                    "id": "https://chuoichientv.com",
                    "name": "Kênh chính",
                    "slug": "default"
                }
            ]
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
    var isEmbed = false;
    var cleanUrl = apiUrl;
    if (apiUrl.indexOf("|") > -1) {
        cleanUrl = apiUrl.substring(0, apiUrl.indexOf("|"));
    }
    if (cleanUrl.indexOf(".m3u8") === -1) {
        isEmbed = true;
    }
    
    return JSON.stringify({
        "url": cleanUrl,
        "isEmbed": isEmbed,
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": "https://live.chuoichien.tv/"
        }
    });
}
