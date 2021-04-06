
var main = function() {
    var searchTerm = document.querySelector("#title-search");
    var search = searchTerm.value.trim();
    var omdbApi = "http://www.omdbapi.com/?apikey=ace027ad&t=" + search;

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

var save = function() {
    var title = "";
    var listed = [];
    var contents = document.querySelector("#landing-spot").children;
    console.log(contents[0].textContent);
    for (var i = 0; i < contents.length; i++) {
        listed.push(contents[i].textContent);
    }
    
    while (title === "" || title === null) {
        title = prompt("What would you like to title this list?");
    }

    localStorage.setItem(title, JSON.stringify(listed));
}