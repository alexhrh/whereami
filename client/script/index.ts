document.addEventListener("DOMContentLoaded", function () {
    let searchButton = document.getElementById("search");
    
    searchButton.addEventListener("click", function () {
        let location = document.getElementById("location").value;
        let query = document.getElementById("query").value;
        let radius = document.getElementById("radius").value;
        let result = document.getElementById("result");
        
        fetch("/findplaces?location=" + location + "&query=" + query + "&radius=" + radius)
        .then(response => response.json())
        .then(places => {
            result.innerHTML = places
            .map(place => `<div>${place.name} at ${place.location.lat} ${place.location.lng}</div>`)
            .join('')
        })
        .catch(function (err) { return console.log(err); });
    });
});