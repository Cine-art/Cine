// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "gogzone",
        "name": "GoG Zone",
        "version": "1.0.0",
        "baseUrl": "https://gog.zone",
        "iconUrl": "https://gog.zone/favicon.ico",
        "isEnabled": true,
        "type": "NOVEL"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { "slug": "danh-sach/truyen-moi", "title": "Truyện Mới", "type": "Grid", "path": "danh-sach/truyen-moi" }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { "name": "Tiên Hiệp", "slug": "tien-hiep" },
        { "name": "Kỳ Ảo", "slug": "ky-ao" },
        { "name": "Khoa Học Viễn Tưởng", "slug": "sci-fi" },
        { "name": "Trinh Thám", "slug": "trinh-tham" }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        category: [
            { "name": "Tiên Hiệp", "slug": "tien-hiep" },
            { "name": "Kỳ Ảo", "slug": "ky-ao" },
            { "name": "Khoa Học Viễn Tưởng", "slug": "sci-fi" },
            { "name": "Trinh Thám", "slug": "trinh-tham" }
        ]
    });
}

// =============================================================================
// URL GENERATION
// =============================================================================

function getUrlList(slug, filtersJson) {
    return "https://mcp.taka.zone/api/stories";
}

function getUrlSearch(keyword, filtersJson) {
    return "https://mcp.taka.zone/api/stories?q=" + encodeURIComponent(keyword);
}

function getUrlDetail(slug) {
    if (slug.indexOf("http://") === 0 || slug.indexOf("https://") === 0) {
        return slug;
    }
    return "https://mcp.taka.zone/api/stories/" + slug;
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(content) {
    try {
        var data = JSON.parse(content);
        var items = [];
        if (data.stories) {
            for (var i = 0; i < data.stories.length; i++) {
                var story = data.stories[i];
                items.push({
                    "id": story.id,
                    "title": story.title || "Unknown Title",
                    "posterUrl": story.cover_image || "https://usencbymnccvpfvnslew.supabase.co/storage/v1/object/public/novel-covers/placeholder.jpg",
                    "backdropUrl": story.cover_image || "https://usencbymnccvpfvnslew.supabase.co/storage/v1/object/public/novel-covers/placeholder.jpg",
                    "year": new Date().getFullYear(),
                    "quality": "Text",
                    "episode_current": story.author_name || "Vô Danh"
                });
            }
        }
        return JSON.stringify({
            "items": items,
            "pagination": {
                "currentPage": 1,
                "totalPages": 1
            }
        });
    } catch (e) {
        return JSON.stringify({ "items": [], "pagination": { "currentPage": 1, "totalPages": 1 } });
    }
}

function parseSearchResponse(content) {
    return parseListResponse(content);
}

function parseMovieDetail(content, apiUrl) {
    try {
        var data = JSON.parse(content);
        var story = data.story;
        
        var slugMatch = /\/stories\/([^\/]+)\/?$/.exec(apiUrl);
        var slug = slugMatch ? slugMatch[1] : story.id;
        
        var title = story.title || "Unknown Title";
        var description = story.logline || story.synopsis || "";
        var posterUrl = story.cover_image || "https://usencbymnccvpfvnslew.supabase.co/storage/v1/object/public/novel-covers/placeholder.jpg";
        var author = story.author_name || "Vô Danh";
        var category = story.genre || "";
        var status = "Đang tiến hành";
        
        var episodes = [];
        
        try {
            var chaptersUrl = "https://mcp.taka.zone/api/stories/" + slug + "/chapters";
            var chaptersJson = "";
            if (typeof KkHttpClient !== 'undefined') {
                chaptersJson = KkHttpClient.get(chaptersUrl);
            } else {
                var url = new Packages.java.net.URL(chaptersUrl);
                var conn = url.openConnection();
                conn.setRequestProperty("User-Agent", "Mozilla/5.0");
                conn.setConnectTimeout(5000);
                conn.setReadTimeout(5000);
                var is = conn.getInputStream();
                var reader = new Packages.java.io.BufferedReader(new Packages.java.io.InputStreamReader(is, "UTF-8"));
                var line = "";
                var builder = new Packages.java.lang.StringBuilder();
                while ((line = reader.readLine()) !== null) {
                    builder.append(line).append("\n");
                }
                chaptersJson = builder.toString();
                is.close();
            }
            
            var chaptersData = JSON.parse(chaptersJson);
            if (chaptersData.chapters) {
                for (var i = 0; i < chaptersData.chapters.length; i++) {
                    var c = chaptersData.chapters[i];
                    episodes.push({
                        "id": "https://mcp.taka.zone/api/chapters/" + c.id,
                        "name": c.title || ("Chương " + (c.idx || 1)),
                        "slug": c.id
                    });
                }
            }
        } catch (e) {
            episodes.push({ "id": "error", "name": "Lỗi lấy chương: " + e, "slug": "error" });
        }
        
        var servers = [{
            "name": "GoG Zone",
            "episodes": episodes
        }];
        
        return JSON.stringify({
            "id": slug,
            "title": title,
            "originName": title,
            "posterUrl": posterUrl,
            "backdropUrl": posterUrl,
            "description": description,
            "year": new Date().getFullYear(),
            "quality": "Text",
            "servers": servers,
            "author": author,
            "category": category,
            "status": status
        });
    } catch (e) {
        return JSON.stringify({});
    }
}

function parseDetailResponse(content, apiUrl) {
    try {
        var data = JSON.parse(content);
        var chapter = data.chapter;
        var textContent = chapter.content || "";
        
        var htmlContent = textContent.replace(/\n/g, "<br>");
        
        return JSON.stringify({
            "images": [],
            "text": textContent,
            "html": htmlContent,
            "content": htmlContent,
            "headers": {
                "User-Agent": "Mozilla/5.0"
            }
        });
    } catch (e) {
        return JSON.stringify({ "text": "Lỗi lấy nội dung chương", "html": "Lỗi lấy nội dung chương" });
    }
}
