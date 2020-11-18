var APIKey = "&rapidapi-key=fd37675a80msh7185028ba8850b5p1ade34jsnda4a447c074a";

// $("#some-id").on("click", function() {

    var citySearched = $("#some-input");
    var stateSearched = $("#some-input");
    var queryURL = "https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries/search?query=micro" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        // console.log(queryURL);
        // console.log(response);
        var result = response.filter(function(brewery) {
            return brewery.state === "North Carolina" && brewery.city === "Charlotte"
        })
        console.log(result);
        var numberResults = 10;//$("#some-value").val();
        for (var i = 0; i < numberResults; i++) {
            var cityBox = $("<div>");
            cityBox.addClass("box");
            var nameLine = $("<p>");
            nameLine.text(name);
            var addressLine = $("<p>");
            addressLine.text(address);
            var phoneLine = $("<p>");
            phoneLine.text(phoneNum);
            var websiteLine = $("<p>");
            websiteLine.text(website);
            var name = "Brewery: " + result[i].name;
            var website = "Website: " + result[i].website_url;
            var phoneNum = "Phone Number: " + result[i].phone;
            var street = result[i].street;
            var city = result[i].city;
            var state = result[i].state;
            var zip = result[i].postal_code;
            var address = "Address: " + street + ", " + city + ", " + state + zip
            cityBox.append(name, address, phoneNum, website);
            $("#div").append(cityBox)
        }   
        
    })

// })
