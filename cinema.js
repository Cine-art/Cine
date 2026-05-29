// =============================================================================
// CONFIGURATION & METADATA
// =============================================================================

function getManifest() {
    return JSON.stringify({
        "id": "cinemabz",
        "name": "CinemaBZ",
        "version": "1.0.0",
        "baseUrl": "https://cinema.bz",
        "iconUrl": "https://cinema.bz/logo-icon.svg",
        "isEnabled": true,
        "type": "MOVIE"
    });
}

function getHomeSections() {
    return JSON.stringify([
        { slug: 'trending', title: 'Trending Today', type: 'Grid', path: '' },
        { slug: 'popular-movies', title: 'Popular Movies', type: 'Horizontal', path: '' },
        { slug: 'popular-shows', title: 'Popular TV Shows', type: 'Horizontal', path: '' }
    ]);
}

function getPrimaryCategories() {
    return JSON.stringify([
        { name: 'Trending Today', slug: 'trending' },
        { name: 'Popular Movies', slug: 'popular-movies' },
        { name: 'Popular TV Shows', slug: 'popular-shows' }
    ]);
}

function getFilterConfig() {
    return JSON.stringify({
        sort: [
            { name: 'Default', value: 'default' }
        ]
    });
}

// Internal TMDB API Keys used by cinema.bz
var apiKeys = [
    "ba3609ae60802e763dab999238caf96c",
    "f0d3b7ff352587cb2f778b691fa986f4",
    "51a2777c53398c9f3692d7b8188c538d",
    "01f649ccbb68c061f9128767b5bdf54f",
    "42f809b500b8e5a1cca4a0fa3bda68fb"
];

function getApiKey() {
    var idx = Math.floor(Math.random() * apiKeys.length);
    return apiKeys[idx];
}

// =============================================================================
// URL GENERATION
// =============================================================================

function getUrlList(slug, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var key = getApiKey();
        
        if (slug === 'popular-movies') {
            return "https://api.themoviedb.org/3/movie/popular?api_key=" + key + "&page=" + page;
        } else if (slug === 'popular-shows') {
            return "https://api.themoviedb.org/3/tv/popular?api_key=" + key + "&page=" + page;
        }
        
        return "https://api.themoviedb.org/3/trending/all/day?api_key=" + key + "&page=" + page;
    } catch (e) {
        return "https://api.themoviedb.org/3/trending/all/day?api_key=" + apiKeys[0] + "&page=1";
    }
}

function getUrlSearch(keyword, filtersJson) {
    try {
        var filters = JSON.parse(filtersJson || "{}");
        var page = filters.page || 1;
        var key = getApiKey();
        return "https://api.themoviedb.org/3/search/multi?api_key=" + key + "&query=" + encodeURIComponent(keyword) + "&page=" + page;
    } catch (e) {
        return "https://api.themoviedb.org/3/search/multi?api_key=" + apiKeys[0] + "&query=" + encodeURIComponent(keyword) + "&page=1";
    }
}

function getUrlDetail(slug) {
    var key = getApiKey();
    if (slug.indexOf('movie-') === 0) {
        var id = slug.substring(6);
        return "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + key + "&append_to_response=credits";
    } else if (slug.indexOf('tv-') === 0) {
        var id = slug.substring(3);
        return "https://api.themoviedb.org/3/tv/" + id + "?api_key=" + key + "&append_to_response=credits";
    }
    
    return slug;
}

// =============================================================================
// PARSERS
// =============================================================================

function parseListResponse(apiResponseJson) {
    try {
        var response = JSON.parse(apiResponseJson);
        var results = response.results || [];
        var items = [];
        
        for (var i = 0; i < results.length; i++) {
            var item = results[i];
            var id = item.id;
            var mediaType = item.media_type || (item.first_air_date ? "tv" : "movie");
            
            var title = item.title || item.name || item.original_title || item.original_name || "";
            var posterPath = item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : "";
            var backdropPath = item.backdrop_path ? "https://image.tmdb.org/t/p/w780" + item.backdrop_path : "";
            
            var date = item.release_date || item.first_air_date || "";
            var year = date ? parseInt(date.substring(0, 4)) : 2026;
            
            var slug = mediaType + "-" + id;
            
            if (id && title) {
                items.push({
                    id: slug,
                    title: title,
                    posterUrl: posterPath,
                    backdropUrl: backdropPath,
                    year: year,
                    quality: "HD",
                    episode_current: mediaType === "tv" ? "TV Series" : "Movie"
                });
            }
        }
        
        return JSON.stringify({
            items: items,
            pagination: {
                currentPage: response.page || 1,
                totalPages: response.total_pages || 1
            }
        });
    } catch (e) {
        return JSON.stringify({ items: [], pagination: { currentPage: 1, totalPages: 1 } });
    }
}

function parseSearchResponse(apiResponseJson) {
    return parseListResponse(apiResponseJson);
}

function parseMovieDetail(apiResponseJson, apiUrl) {
    try {
        var data = JSON.parse(apiResponseJson);
        var id = data.id;
        var isTv = apiUrl.indexOf('/tv/') !== -1;
        
        var title = data.title || data.name || data.original_title || data.original_name || "Movie Detail";
        var description = data.overview || "";
        var posterUrl = data.poster_path ? "https://image.tmdb.org/t/p/w500" + data.poster_path : "";
        var backdropUrl = data.backdrop_path ? "https://image.tmdb.org/t/p/w780" + data.backdrop_path : "";
        
        var date = data.release_date || data.first_air_date || "";
        var year = date ? parseInt(date.substring(0, 4)) : 2026;
        
        var categories = [];
        var genres = data.genres || [];
        for (var g = 0; g < genres.length; g++) {
            categories.push(genres[g].name);
        }
        
        var countries = [];
        var prodCountries = data.production_countries || [];
        for (var c = 0; c < prodCountries.length; c++) {
            countries.push(prodCountries[c].name);
        }
        
        var directors = [];
        var casts = [];
        var credits = data.credits || {};
        var crew = credits.crew || [];
        for (var cr = 0; cr < crew.length; cr++) {
            if (crew[cr].job === "Director") {
                directors.push(crew[cr].name);
            }
        }
        var castList = credits.cast || [];
        for (var ca = 0; ca < Math.min(castList.length, 10); ca++) {
            casts.push(castList[ca].name);
        }
        
        var servers = [];
        
        if (isTv) {
            var seasons = data.seasons || [];
            
            var hosts = [
                { name: 'Videasy', slug: 'videasy' },
                { name: 'VidUp', slug: 'vidup' },
                { name: 'VidNest', slug: 'vidnest' }
            ];
            
            for (var h = 0; h < hosts.length; h++) {
                var host = hosts[h];
                
                for (var sIdx = 0; sIdx < seasons.length; sIdx++) {
                    var s = seasons[sIdx];
                    var sNum = s.season_number;
                    if (sNum === 0) continue;
                    
                    var epCount = s.episode_count || 0;
                    var episodes = [];
                    
                    for (var e = 1; e <= epCount; e++) {
                        var watchUrl = "https://cinema.bz/watch?type=show&id=" + id + "&s=" + sNum + "&e=" + e + "&host=" + host.slug;
                        episodes.push({
                            id: watchUrl,
                            name: 'Episode ' + e,
                            slug: 'ep-' + e
                        });
                    }
                    
                    if (episodes.length > 0) {
                        servers.push({
                            name: host.name + " (Season " + sNum + ")",
                            episodes: episodes
                        });
                    }
                }
            }
        } else {
            var playOptions = [
                {
                    id: "https://cinema.bz/watch?type=movie&id=" + id + "&host=videasy",
                    name: "Server Videasy",
                    slug: "videasy"
                },
                {
                    id: "https://cinema.bz/watch?type=movie&id=" + id + "&host=vidup",
                    name: "Server VidUp",
                    slug: "vidup"
                },
                {
                    id: "https://cinema.bz/watch?type=movie&id=" + id + "&host=vidnest",
                    name: "Server VidNest",
                    slug: "vidnest"
                }
            ];
            
            servers.push({
                name: "Default Server",
                episodes: playOptions
            });
        }
        
        return JSON.stringify({
            id: isTv ? "tv-" + id : "movie-" + id,
            title: title,
            originName: title,
            posterUrl: posterUrl,
            backdropUrl: backdropUrl,
            description: description,
            year: year,
            rating: data.vote_average || 8.0,
            quality: "HD",
            servers: servers,
            category: categories.join(", "),
            country: countries.join(", "),
            director: directors.join(", "),
            casts: casts.join(", "),
            status: data.status === "Ended" || data.status === "Canceled" ? "completed" : "ongoing"
        });
    } catch (e) {
        return "null";
    }
}

function parseDetailResponse(htmlContent, apiUrl) {
    var typeMatch = /[?&]type=([^&]+)/.exec(apiUrl);
    var isTv = typeMatch ? typeMatch[1] === 'show' : false;
    
    var idMatch = /[?&]id=(\d+)/.exec(apiUrl);
    var tmdbId = idMatch ? idMatch[1] : "";
    
    var seasonMatch = /[?&]s=(\d+)/.exec(apiUrl);
    var season = seasonMatch ? seasonMatch[1] : "1";
    
    var episodeMatch = /[?&]e=(\d+)/.exec(apiUrl);
    var episode = episodeMatch ? episodeMatch[1] : "1";
    
    var hostMatch = /[?&]host=([^&]+)/.exec(apiUrl);
    var host = hostMatch ? hostMatch[1] : "videasy";
    
    var streamUrl = "";
    if (isTv) {
        if (host === 'vidup') {
            streamUrl = "https://vidup.to/tv/" + tmdbId + "/" + season + "/" + episode + "?autoPlay=true";
        } else if (host === 'vidnest') {
            streamUrl = "https://vidnest.fun/tv/" + tmdbId + "/" + season + "/" + episode;
        } else {
            streamUrl = "https://player.videasy.net/tv/" + tmdbId + "/" + season + "/" + episode;
        }
    } else {
        if (host === 'vidup') {
            streamUrl = "https://vidup.to/movie/" + tmdbId + "?autoPlay=true";
        } else if (host === 'vidnest') {
            streamUrl = "https://vidnest.fun/movie/" + tmdbId;
        } else {
            streamUrl = "https://player.videasy.net/movie/" + tmdbId;
        }
    }
    
    return JSON.stringify({
        url: streamUrl,
        isEmbed: true,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": "https://cinema.bz/"
        }
    });
}
