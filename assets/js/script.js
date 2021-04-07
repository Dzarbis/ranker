
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
    var loadList = localStorage.getItem("ranker");
    loadList = JSON.parse(loadList);

    if (!loadList){
        loadList = [];
    }
    var title = "";
    var listed = [];

    var contents = document.querySelector("#landing-spot").children;

    for (var i = 0; i < contents.length; i++) {
        listed.push(contents[i].textContent);
        console.log(contents[i].textContent);
    }
    
    while (title === "" || title === null) {
        title = prompt("What would you like to title this list?");
    }
    var listObj = {
        name: title,
        value: listed
    };
    loadList.push(listObj);

    localStorage.setItem("ranker", JSON.stringify(loadList));
}

var load = function() {
    var loadList = localStorage.getItem("ranker");
    loadList = JSON.parse(loadList);
    if (!loadList) {
        $('#modal').foundation('open');
        return;
    }
    
    for (var i = 0; i < loadList.length; i++) {
        var option = document.createElement("option");
        option.textContent = loadList[i].name;
        document.querySelector('[name="list-load"]').appendChild(option);
    }
};

var listSelect = function() {
    var ratingLocation = document.querySelector("#landing-spot");
    ratingLocation.innerHTML = "";
    var loadList = localStorage.getItem("ranker");
    loadList = JSON.parse(loadList);
    if (!loadList){
        return;
    }
    for (var i = 0; i < loadList.length; i++) {
        var loadListItem = loadList[i];
        if (this.value === loadListItem.name) {
            var loadListValues = loadListItem.value;
            for (var ii = 0; ii < loadListValues.length; ii++) {

                var rating = document.createElement("li");
                rating.textContent = loadListValues[ii];
                rating.setAttribute("id", "ranked-item");
                rating.setAttribute("draggable", "true");
                ratingLocation.appendChild(rating);
            }
        }
    }
}
load();
document.querySelector('[name="list-load"]').addEventListener("change", listSelect);