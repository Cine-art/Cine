// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "socolivee",
        "name": "Socolivee",
        "version": "1.0.2",
        "baseUrl": "https://socolivee.cv",
        "iconUrl": "https://socolivee.cv/wp-content/uploads/2023/09/logo-7-2.png",
        "isEnabled": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { "slug": "truc-tiep", "title": "Bóng Đá Trực Tiếp", "type": "Grid", "path": "" }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { "name": "Bóng Đá Trực Tiếp", "slug": "truc-tiep" }
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
    return "https://socolivee.cv/";
}

function getUrlSearch(keyword, filtersJson) {
    return "https://socolivee.cv/";
}

function getUrlDetail(slug) {
    // If slug is already a fully qualified watch URL, return it directly
    if (slug.indexOf("http://") === 0 || slug.indexOf("https://") === 0) {
        return slug;
    }
    return "https://socolivee.cv/truc-tiep/" + slug + "/";
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(htmlContent) {
    var items = [];
    
    // Extract matches-data JSON script tag
    var matchesMatch = /<script type="application\/json" id="matches-data">([\s\S]*?)<\/script>/.exec(htmlContent);
    if (matchesMatch) {
        try {
            var list = JSON.parse(matchesMatch[1]);
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var home = item.home_name || "Unknown";
                var away = item.away_name || "Unknown";
                var title = home + " vs " + away;
                var slug = item.post_name; // URL slug e.g. "haiti-vs-new-zealand-03-06-2026-0630"
                if (!slug) continue;
                
                var poster = item.home_logo || "";
                if (poster && poster.indexOf("http") !== 0) {
                    poster = "https://socolivee.cv/wp-content/uploads/truc-tiep/logos/football/team/" + poster;
                }
                
                var backdrop = item.away_logo || "";
                if (backdrop && backdrop.indexOf("http") !== 0) {
                    backdrop = "https://socolivee.cv/wp-content/uploads/truc-tiep/logos/football/team/" + backdrop;
                }
                
                var matchTime = parseInt(item.time, 10);
                var year = 2026;
                var timeStr = "";
                if (!isNaN(matchTime)) {
                    var date = new Date(matchTime * 1000);
                    year = date.getFullYear() || 2026;
                    var hours = date.getHours().toString().padStart(2, '0');
                    var minutes = date.getMinutes().toString().padStart(2, '0');
                    var day = date.getDate().toString().padStart(2, '0');
                    var month = (date.getMonth() + 1).toString().padStart(2, '0');
                    timeStr = hours + ":" + minutes + " " + day + "/" + month;
                }
                
                var status = "Sắp diễn ra";
                if (item.status_id === "4" || item.has_live === "1") {
                    status = "LIVE";
                } else if (item.status_id === "8" || item.status_id === "10") {
                    status = "Kết thúc";
                }
                
                var displayStatus = status + (timeStr ? " (" + timeStr + ")" : "");
                
                items.push({
                    "id": slug,
                    "title": title,
                    "posterUrl": poster || "https://socolivee.cv/wp-content/uploads/2023/09/logo-7-2.png",
                    "backdropUrl": backdrop || "https://socolivee.cv/wp-content/uploads/2023/09/logo-7-2.png",
                    "year": year,
                    "quality": "HD",
                    "episode_current": displayStatus
                });
            }
        } catch (e) {
            // parsing error
        }
    }
    
    return JSON.stringify({
        "items": items,
        "pagination": {
            "currentPage": 1,
            "totalPages": 1
        }
    });
}

function parseSearchResponse(htmlContent) {
    return parseListResponse(htmlContent);
}

function parseMovieDetail(htmlContent, apiUrl) {
    var slug = apiUrl.substring(apiUrl.lastIndexOf("/truc-tiep/") + 11);
    if (slug.endsWith("/")) {
        slug = slug.substring(0, slug.length - 1);
    }
    
    // Default meta fallback values
    var title = "Trận đấu Socolivee";
    var description = "Xem trực tiếp bóng đá chất lượng cao trên Socolivee.";
    var posterUrl = "https://socolivee.cv/wp-content/uploads/2023/09/logo-7-2.png";
    var rating = 8.0;
    var year = 2026;
    var servers = [];
    
    // Extract metadata from og tags
    var ogTitle = /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
    if (ogTitle) title = ogTitle[1];
    
    var ogDesc = /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
    if (ogDesc) description = ogDesc[1];
    
    var ogImg = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i.exec(htmlContent);
    if (ogImg) posterUrl = ogImg[1];
    
    // Try to extract window.streamData JSON block
    var streamDataMatch = /window\.streamData\s*=\s*(\{[\s\S]*?\});/.exec(htmlContent);
    if (streamDataMatch) {
        try {
            var streamData = JSON.parse(streamDataMatch[1]);
            var playerHost = streamData.playerHost || "https://live.inplyr.com";
            var matchId = streamData.matchId || "";
            var scheduleId = streamData.scheduleId || "";
            
            var episodes = [];
            
            // 1. Add Kênh chính (Main Channel) using matchId
            if (matchId) {
                episodes.push({
                    "id": playerHost + "/default/" + matchId + ".m3u8",
                    "name": "Kênh chính (Full HD)",
                    "slug": "kenh-chinh"
                });
            }
            
            // 2. Add commentators/anchors
            if (streamData.anchors && Array.isArray(streamData.anchors)) {
                for (var i = 0; i < streamData.anchors.length; i++) {
                    var anchor = streamData.anchors[i];
                    if (anchor.uid && anchor.nickName) {
                        episodes.push({
                            "id": playerHost + "/room/" + anchor.uid + ".m3u8",
                            "name": anchor.nickName,
                            "slug": "blv-" + anchor.uid
                        });
                    }
                }
            }
            
            if (episodes.length > 0) {
                servers.push({
                    "name": "Socolivee Player",
                    "episodes": episodes
                });
            }
        } catch (e) {
            // StreamData parsing failed, fallback below
        }
    }
    
    // Fallback if no streams were extracted
    if (servers.length === 0) {
        // Look for match_id and uid_s variables in scripts
        var matchIdMatch = /var\s+match_id\s*=\s*['"]([^'"]+)['"]/i.exec(htmlContent);
        var uidMatch = /var\s+uid_s\s*=\s*['"]([^'"]+)['"]/i.exec(htmlContent);
        
        var fallbackEpisodes = [];
        var mId = matchIdMatch ? matchIdMatch[1] : "";
        var uId = uidMatch ? uidMatch[1] : "";
        
        if (mId) {
            fallbackEpisodes.push({
                "id": "https://live.inplyr.com/default/" + mId + ".m3u8",
                "name": "Kênh chính (Full HD)",
                "slug": "kenh-chinh"
            });
        }
        if (uId) {
            fallbackEpisodes.push({
                "id": "https://live.inplyr.com/room/" + uId + ".m3u8",
                "name": "Bình luận viên",
                "slug": "blv"
            });
        }
        
        // If still empty, add default slug
        if (fallbackEpisodes.length === 0) {
            fallbackEpisodes.push({
                "id": "https://live.inplyr.com/default/" + slug + ".m3u8",
                "name": "Kênh chính",
                "slug": "default"
            });
        }
        
        servers.push({
            "name": "Socolivee Player (Backup)",
            "episodes": fallbackEpisodes
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
    return JSON.stringify({
        "url": apiUrl,
        "isEmbed": false,
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": "https://socolivee.cv/"
        }
    });
}
