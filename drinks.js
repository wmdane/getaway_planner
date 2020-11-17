var APIKey = "&rapidapi-key=fd37675a80msh7185028ba8850b5p1ade34jsnda4a447c074a";



    var citySearched = $("#user-input")
    var queryURL = "https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries/autocomplete?query=" + citySearched + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);
        
    })

