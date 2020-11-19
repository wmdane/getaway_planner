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
                $("#displayDrinkResults").text("Sorry no micro breweries found. Please try another city.");
                localStorage.setItem('userInput', userInput);
                renderHistory();
            }
            else {
                var numberResults = 10;
                $("#displayDrinkResults").html("");
                for (var i = 0; i < numberResults; i++) {
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

                    localStorage.setItem('userInput', userInput);
                };  

                renderHistory();

            };
            
        });

        function renderHistory() {
            
            var array = [];
            array.push(localStorage.getItem('userInput'));

            var b = $("<button>");
            b.addClass("search-button");
            //var input = localStorage.getItem('userInput');
            b.text(array);
            $("#displaySearchHistory").append(b);
        };
    });
});