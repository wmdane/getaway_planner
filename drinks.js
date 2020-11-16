var APIKey = "6b3dbd71ff84d1310200d7316192a1ec";
        var searchCity = "locality=charlotte"
        var queryURL = "https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/search?q=" +
        searchCity +
        "/?key=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(queryURL);
            console.log(response);
        });