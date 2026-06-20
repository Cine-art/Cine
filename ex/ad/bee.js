// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "beeg",
        "name": "Beeg",
        "version": "1.0.0",
        "baseUrl": "https://beeg.com",
        "iconUrl": "https://beeg.com/assets/favicon.svg",
        "isEnabled": true,
        "isAdult": true,
        "type": "MOVIE",
        "playerType": "exoplayer",
        "layoutType": "GRID"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'amateur', title: 'Amateur', type: 'Horizontal', path: 'amateur' },
        { slug: 'teen', title: 'Teen', type: 'Horizontal', path: 'teen' },
        { slug: 'milf', title: 'MILF', type: 'Horizontal', path: 'milf' },
        { slug: 'anal', title: 'Anal', type: 'Horizontal', path: 'anal' },
        { slug: 'lesbian', title: 'Lesbian', type: 'Horizontal', path: 'lesbian' },
        { slug: 'pov', title: 'POV', type: 'Grid', path: 'pov' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Amateur', slug: 'amateur' },
        { name: 'Teen', slug: 'teen' },
        { name: 'MILF', slug: 'milf' },
        { name: 'Anal', slug: 'anal' },
        { name: 'Lesbian', slug: 'lesbian' },
        { name: 'POV', slug: 'pov' },
        { name: 'Asian', slug: 'asian' },
        { name: 'Ebony', slug: 'ebony' },
        { name: 'Threesome', slug: 'threesome' },
        { name: 'Uncensored', slug: 'uncensored' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        category: [
            { "name": "Amateur", "value": "amateur" },
            { "name": "Anal", "value": "anal" },
            { "name": "Asian", "value": "asian" },
            { "name": "Babe", "value": "babes" },
            { "name": "BBW", "value": "bbw" },
            { "name": "Big Ass", "value": "bigass" },
            { "name": "Big Tits", "value": "bigtits" },
            { "name": "Blonde", "value": "blonde" },
            { "name": "Blowjob", "value": "blowjob" },
            { "name": "Brunette", "value": "brunette" },
            { "name": "College", "value": "college" },
            { "name": "Creampie", "value": "creampie" },
            { "name": "Cumshot", "value": "cumshot" },
            { "name": "Ebony", "value": "ebony" },
            { "name": "Facial", "value": "facial" },
            { "name": "Fetish", "value": "fetish" },
            { "name": "Footjob", "value": "footjob" },
            { "name": "Gangbang", "value": "gangbang" },
            { "name": "Gay", "value": "gay" },
            { "name": "Groping", "value": "groping" },
            { "name": "Handjob", "value": "handjob" },
            { "name": "Hardcore", "value": "hardcore" },
            { "name": "Hentai", "value": "hentai" },
            { "name": "Homemade", "value": "homemade" },
            { "name": "Indian", "value": "indian" },
            { "name": "Interracial", "value": "interracial" },
            { "name": "Japanese", "value": "japanese" },
            { "name": "Kissing", "value": "kiss" },
            { "name": "Latina", "value": "latina" },
            { "name": "Lesbian", "value": "lesbian" },
            { "name": "Lingerie", "value": "lingerie" },
            { "name": "Massage", "value": "massage" },
            { "name": "Masturbation", "value": "masturbation" },
            { "name": "Mature", "value": "mature" },
            { "name": "MILF", "value": "milf" },
            { "name": "Nurse", "value": "nurse" },
            { "name": "Office", "value": "office" },
            { "name": "Orgasm", "value": "orgasm" },
            { "name": "Outdoor", "value": "outdoor" },
            { "name": "Party", "value": "party" },
            { "name": "Petite", "value": "petite" },
            { "name": "Pissing", "value": "pissing" },
            { "name": "POV", "value": "pov" },
            { "name": "Public", "value": "public" },
            { "name": "Redhead", "value": "redhead" },
            { "name": "Rough", "value": "rough" },
            { "name": "School", "value": "school" },
            { "name": "Secretary", "value": "secretary" },
            { "name": "Shaved", "value": "shaved" },
            { "name": "Shemale", "value": "shemale" },
            { "name": "Solo", "value": "solo" },
            { "name": "Spanish", "value": "spanish" },
            { "name": "Stockings", "value": "stockings" },
            { "name": "Student", "value": "student" },
            { "name": "Teen", "value": "teen" },
            { "name": "Threesome", "value": "threesome" },
            { "name": "Toys", "value": "toys" },
            { "name": "Uncensored", "value": "uncensored" },
            { "name": "Uniform", "value": "uniform" },
            { "name": "Vintage", "value": "vintage" },
            { "name": "Voyeur", "value": "voyeur" },
            { "name": "Wet Pussy", "value": "wet" },
            { "name": "Wife", "value": "wife" }
        ],
        sort: [
            { name: "Default", value: "default" }
        ]
    });
}

// =============================================================================
// URL GENERATION
// =============================================================================

var ALL_VALID_TAGS = [
    "amateur", "anal", "asian", "babes", "bbw", "bigass", "bigtits", 
    "blonde", "blowjob", "brunette", "college", "creampie", "cumshot", 
    "ebony", "facial", "fetish", "footjob", "gangbang", "gay", "groping", 
    "handjob", "hardcore", "hentai", "homemade", "indian", "interracial", 
    "japanese", "kiss", "latina", "lesbian", "lingerie", "massage", 
    "masturbation", "mature", "milf", "nurse", "office", "orgasm", 
    "outdoor", "party", "petite", "pissing", "pov", "public", "redhead", 
    "rough", "school", "secretary", "shaved", "shemale", "solo", 
    "spanish", "stockings", "student", "teen", "threesome", "toys", 
    "uncensored", "uniform", "vintage", "voyeur", "wet", "wife"
];

function getUrlList(slug, filtersJson) {
    var filters = JSON.parse(filtersJson || "{}");
    var page = filters.page || 1;
    var limit = 24;
    var offset = (page - 1) * limit;

    var targetTag = slug || "amateur";
    if (filters.category) {
        targetTag = filters.category;
    }

    if (targetTag === "home" || targetTag === "") {
        targetTag = "amateur";
    }

    // Convert spaces/pluses to commas if needed
    targetTag = targetTag.replace(/\+/g, ',').toLowerCase();

    return "https://store.externulls.com/tag/videos/" + targetTag + "?limit=" + limit + "&offset=" + offset;
}

function getUrlSearch(keyword, filtersJson) {
    var filters = JSON.parse(filtersJson || "{}");
    var page = filters.page || 1;
    var limit = 24;
    var offset = (page - 1) * limit;

    if (!keyword) {
        return "https://store.externulls.com/tag/videos/amateur?limit=" + limit + "&offset=" + offset;
    }

    // Clean keyword and split into lowercase words
    var words = keyword.toLowerCase().split(/[^a-z0-9]+/);
    var matchedTags = [];

    for (var i = 0; i < words.length; i++) {
        var word = words[i].trim();
        if (word.length === 0) continue;
        
        // Exact match check
        if (ALL_VALID_TAGS.indexOf(word) !== -1) {
            if (matchedTags.indexOf(word) === -1) {
                matchedTags.push(word);
            }
        } else {
            // Substring match check
            for (var j = 0; j < ALL_VALID_TAGS.length; j++) {
                var validTag = ALL_VALID_TAGS[j];
                if (validTag.indexOf(word) !== -1 || word.indexOf(validTag) !== -1) {
                    if (matchedTags.indexOf(validTag) === -1) {
                        matchedTags.push(validTag);
                    }
                }
            }
        }
    }

    // Fallback if no matching tags found
    if (matchedTags.length === 0) {
        matchedTags.push("amateur");
    }

    var targetTag = matchedTags.join(",");
    return "https://store.externulls.com/tag/videos/" + targetTag + "?limit=" + limit + "&offset=" + offset;
}

function getUrlDetail(slug) {
    if (!slug) return "";
    if (slug.indexOf("http") === 0) return slug;

    // Remove negative signs and leading zeros for API request safety (prevents HTTP 500 error)
    var cleanedId = slug.replace(/[^0-9]/g, '');
    while (cleanedId.length > 0 && cleanedId.charAt(0) === '0') {
        cleanedId = cleanedId.substring(1);
    }

    return "https://store.externulls.com/facts/file/" + cleanedId;
}

function getUrlCategories() { return ""; }
function getUrlCountries() { return ""; }
function getUrlYears() { return ""; }

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(jsonStr) {
    try {
        var data = JSON.parse(jsonStr);
        var items = [];

        if (Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (!item || !item.file) continue;

                var fileId = item.file.id;
                if (!fileId) continue;

                // Pad ID to 16 characters with leading zeros (consistent with website slug format)
                var slugId = fileId.toString();
                while (slugId.length < 16) {
                    slugId = "0" + slugId;
                }

                var title = "";
                if (item.file.data && Array.isArray(item.file.data)) {
                    for (var j = 0; j < item.file.data.length; j++) {
                        if (item.file.data[j].cd_column === "sf_name") {
                            title = item.file.data[j].cd_value;
                            break;
                        }
                    }
                }

                if (!title) {
                    title = "Video " + fileId;
                }

                // Thumbnail URL construction
                var thumb = "https://thumbs.externulls.com/videos/" + fileId + "/0.webp";

                items.push({
                    id: slugId,
                    title: title,
                    posterUrl: thumb,
                    backdropUrl: thumb,
                    year: 0
                });
            }
        }

        // Dummy pagination logic (since offset/limit are used)
        return JSON.stringify({
            items: items,
            pagination: {
                currentPage: 1, // App handles page state based on list load requests
                totalPages: items.length >= 24 ? 999 : 1
            }
        });
    } catch (e) {
        return JSON.stringify({ items: [], pagination: { currentPage: 1, totalPages: 1 } });
    }
}

function parseSearchResponse(jsonStr) {
    return parseListResponse(jsonStr);
}

function parseMovieDetail(jsonStr) {
    try {
        var item = JSON.parse(jsonStr);
        if (!item || !item.file) return "null";

        var fileId = item.file.id;
        var slugId = fileId.toString();
        while (slugId.length < 16) {
            slugId = "0" + slugId;
        }

        var title = "";
        if (item.file.data && Array.isArray(item.file.data)) {
            for (var i = 0; i < item.file.data.length; i++) {
                if (item.file.data[i].cd_column === "sf_name") {
                    title = item.file.data[i].cd_value;
                    break;
                }
            }
        }

        if (!title) {
            title = "Video " + fileId;
        }

        var posterUrl = "https://thumbs.externulls.com/videos/" + fileId + "/0.webp";

        var categoriesArr = [];
        if (item.tags && Array.isArray(item.tags)) {
            for (var j = 0; j < item.tags.length; j++) {
                if (item.tags[j].tg_name) {
                    categoriesArr.push(item.tags[j].tg_name);
                }
            }
        }

        // Servers and Episodes construction
        var servers = [];

        // Server 1: HLS Adaptive streaming playlist
        if (item.file.hls_resources && item.file.hls_resources.fl_cdn_multi) {
            servers.push({
                name: "HLS Adaptive",
                episodes: [{
                    id: "https://video.beeg.com/" + item.file.hls_resources.fl_cdn_multi,
                    name: "Stream (HLS)",
                    slug: "hls"
                }]
            });
        }

        // Server 2: Direct MP4 fallback URL
        if (item.file.fallback) {
            servers.push({
                name: "Direct MP4",
                episodes: [{
                    id: "https://video.beeg.com/" + item.file.fallback,
                    name: "Direct Source",
                    slug: "mp4"
                }]
            });
        }

        // Fallback server if none found
        if (servers.length === 0) {
            servers.push({
                name: "Default Server",
                episodes: [{
                    id: "https://thumbs.externulls.com/videos/" + fileId + "/0.webp", // Dummy fallback
                    name: "Full Video",
                    slug: "default"
                }]
            });
        }

        return JSON.stringify({
            id: slugId,
            title: title,
            posterUrl: posterUrl,
            backdropUrl: posterUrl,
            description: title,
            servers: servers,
            quality: "HD",
            lang: "Sub",
            year: 0,
            rating: 0,
            casts: "",
            director: "",
            country: "Japan",
            category: categoriesArr.join(", "),
            status: "Completed"
        });
    } catch (e) {
        return "null";
    }
}

function parseDetailResponse(html, fetchedUrl) {
    return JSON.stringify({
        url: fetchedUrl,
        isEmbed: false,
        headers: {
            "Referer": "https://beeg.com/"
        }
    });
}

function parseEmbedResponse(html, url) {
    return JSON.stringify({
        url: url,
        isEmbed: false,
        headers: {
            "Referer": "https://beeg.com/"
        }
    });
}
