$(document).ready(function() {

    var APIKey = "&rapidapi-key=fd37675a80msh7185028ba8850b5p1ade34jsnda4a447c074a";

    $("#submitBtn").on("click", function() {

        var citySearched = $("#cityInput").val();
        var stateSearched = $("#stateInput").val();
        var userInput = citySearched + ", " + stateSearched;
        var queryURL = "https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries/search?query=micro" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            // console.log(queryURL);
            // console.log(response);

            var result = response.filter(function(brewery) {
                return brewery.state === stateSearched && brewery.city === citySearched;
            })

            //console.log(result);
            if (result.length === 0) {
                $("#displayDrinkResults").text("Sorry, Open Breweries DB did not return any micro breweries for this city. Search another city, OR");
                localStorage.setItem('userInput', userInput);
                renderHistory();
                nonSearch();
            }
            else {
                //var numberResults = 10;
                $("#displayDrinkResults").html("");
                localStorage.setItem('userInput', userInput);
                renderHistory();
                for (var i = 0; i < result.length; i++) {
                    var cityBox = $("<div>");
                    cityBox.addClass("box");

                    var nameLine = $("<h3>");
                    var name = "Brewery: " + result[i].name;
                    nameLine.text(name);

                    var addressLine = $("<p>");
                    var street = result[i].street;
                    var city = result[i].city;
                    var state = result[i].state;
                    var zip = result[i].postal_code;
                    var address = "Address: " + street + ", " + city + ", " + state + " " + zip;
                    addressLine.text(address);

                    var phoneLine = $("<p>");
                    var phoneNum = "Phone Number: " + result[i].phone;
                    phoneLine.text(phoneNum);

                    var websiteLine = $("<a>");
                    var website = result[i].website_url;
                    websiteLine.attr("href", website);
                    websiteLine.text("Brewery Website: " + website);
                
                    cityBox.append(nameLine, addressLine, phoneLine, websiteLine);
                
                    $("#displayDrinkResults").append(cityBox);

                    
                    console.log(userInput);
                    
                };                 

            };
            
            function renderHistory() {
            
                var b = $("<button>");
                b.addClass("search-button");
                var input = localStorage.getItem('userInput');
                b.text(input);
                $("#displaySearchHistory").append(b);
            };

        });

        function nonSearch() {
            var yelpURL = "https://www.yelp.com/search?find_desc=Breweries&find_loc=" + citySearched + "%2C+" + stateSearched + "&ns=1";
            var messageBox = $("<div>");
            messageBox.addClass("box");
            var yelpLink = $("<a>");
            yelpLink.attr("href", yelpURL);
            yelpLink.text("Try Yelp instead");
            messageBox.append(yelpLink);
            $("#displayDrinkResults").append(messageBox);
        };
    });
});