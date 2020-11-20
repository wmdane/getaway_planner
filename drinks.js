var APIKey = "&rapidapi-key=fd37675a80msh7185028ba8850b5p1ade34jsnda4a447c074a";

// Extracted renderHistory function from findDrinks function to increase scope
function renderHistory() {
  var inputs = JSON.parse(localStorage.getItem("userInput"));
  if(inputs != null){

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var [city, state] = input.split(", ");
      var b = $("<button>");
      b.attr("data-city", city);
      b.attr("data-state", state);
      b.addClass("search-button");
      b.text(input);
      // Appended <br> to create a new line between buttons
      $("#displaySearchHistory").append("<br>");
      $("#displaySearchHistory").append(b);
    }
  }
  
}

function findDrinks(citySearched, stateSearched) {
  var queryURL =
    "https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries/search?query=micro" + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    

    var result = response.filter(function (brewery) {
      return brewery.state === stateSearched && brewery.city === citySearched;
    });

    
    renderHistory();
    // console.log(result);
    if (result.length === 0) {
      $("#displayDrinkResults").text(
        "Sorry, Open Breweries DB did not return any micro breweries for this city. Search another city, OR"
      );
      nonSearch();
    } else {
      

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

       
      }
    }

    
  });

  function nonSearch() {
    var yelpURL =
      "https://www.yelp.com/search?find_desc=Breweries&find_loc=" +
      citySearched +
      "%2C+" +
      stateSearched +
      "&ns=1";
    var messageBox = $("<div>");
    messageBox.addClass("box");
    var yelpLink = $("<a>");
    yelpLink.attr("href", yelpURL);
    yelpLink.text("Try Yelp instead");
    messageBox.append(yelpLink);
    $("#displayDrinkResults").append(messageBox);
  }
}
