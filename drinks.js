var APIKey = "&rapidapi-key=fd37675a80msh7185028ba8850b5p1ade34jsnda4a447c074a";

$("#some-id").on("click", function() {

    var citySearched = $("#some-input");
    var stateSearched = $("#some-input");
    var queryURL = "https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries/search?query=micro" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        // console.log(queryURL);
        // console.log(response);
        var nc = response.filter(function(brewery) {
            return brewery.state === "North Carolina" && brewery.city === "Charlotte"
        })
        console.log(nc);
        var numberResults = $("#some-value").val();
        for (var i = 0; i < numberResults; i++) {
            var name = nc[i].name
            $("#div").append(name);
        }    
    })
})
