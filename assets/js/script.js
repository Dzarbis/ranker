var main = function() {
    var searchTerm = document.querySelector("#title-search");
    var search = searchTerm.value.trim();
    var omdbApi = "http://www.omdbapi.com/?apikey=ace027ad&t=" + search;

    fetch(omdbApi).then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
    
        addRatingItem(search + " - Rating: " + response.imdbRating);
        searchTerm.value = "";
        save();
    })
};

var addRatingItem = function(ratingString) {
    var ratingLocation = document.querySelector("#landing-spot");
    var ratingWrapper = document.createElement("li");
    var rating = document.createElement("span");
    //var ratingPull = response.imdbRating;
    rating.textContent = ratingString;
    rating.setAttribute("class", "ranked-item");
    rating.setAttribute("draggable", "true");
    ratingWrapper.appendChild(rating);
    var trash = document.createElement("i");
    trash.setAttribute("class", "material-icons");
    trash.textContent = "delete";
    trash.addEventListener("click", deleteListItem);
    ratingWrapper.appendChild(trash);
    ratingLocation.appendChild(ratingWrapper);
}

var openModal = function() {
    var elem = document.querySelector('#modal');
        $("#title-set").val("");
        var modal = M.Modal.init(elem);
        modal.open();
}

var newList = function() {
    openModal();
    $("#landing-spot").empty();
}

var save = function() {
    var loadList = localStorage.getItem("ranker");
    var title = document.querySelector("#title-set").value;
    var contents = document.querySelector("#landing-spot").children;
    loadList = JSON.parse(loadList);

    if (!loadList){
        loadList = {};
    }

    loadList[title] = [];

    for (var i = 0; i < contents.length; i++) {
        loadList[title].push($(contents[i]).children(".ranked-item").text());
    }

    localStorage.setItem("ranker", JSON.stringify(loadList));
}

var load = function() {
    var loadList = localStorage.getItem("ranker");
    loadList = JSON.parse(loadList);
    if (!loadList) {
        openModal();
        return;
    }
    
    var titleList = document.querySelector('[name="list-load"]');

    while (titleList.children.length > 1) {
        titleList.children[1].remove();
    }
    for (var name in loadList) {
        var option = document.createElement("option");
        option.textContent = name;
        titleList.appendChild(option);
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
    $("#title-set").val(this.value);
    var loadListValues = loadList[this.value]
    for (var i = 0; i < loadListValues.length; i++) {

        addRatingItem(loadListValues[i]);
    }
}

var saveNewList = function() {
    save();
    load();
}

var deleteListItem = function() {
    this.parentElement.remove();
    save();
}

load();
$("#landing-spot").sortable({
    deactivate: function(){
        save();
    }
});
document.querySelector('[name="list-load"]').addEventListener("change", listSelect);
document.querySelector("#modal-save").addEventListener("click", saveNewList);