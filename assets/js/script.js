
var main = function() {
    var searchTerm = document.querySelector("#title-search");
    var search = searchTerm.value.trim();
    var omdbApi = "http://www.omdbapi.com/?apikey=ace027ad&t=" + search;

    console.log(search);
    fetch(omdbApi).then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
    
    
    var ratingLocation = document.querySelector("#landing-spot");

    var rating = document.createElement("li");
    var ratingPull = response.imdbRating;
    rating.textContent = search + " - Rating: " + ratingPull;
    rating.setAttribute("id", "ranked-item");
    rating.setAttribute("draggable", "true");
    ratingLocation.appendChild(rating);
    })
};