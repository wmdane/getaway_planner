function getCity() {
    var cityInput = $("#cityInput").val();
    var stateInput = $("#stateInput").val();
    var queryURL2 = "https://developers.zomato.com/api/v2.1/cities?q=" + cityInput + "&apikey=f2f17d46cbed2f06723d01c2bf241ca1";
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var result = response.location_suggestions.filter(function(city){
            return city.state_name === stateInput;
        });
        console.log(result);
        if (result.length){
            cityID = result[0].id;
            console.log(cityID);
            searchZomato();
            return cityID;
        } else {
            nonSearch();
        }
        function nonSearch() {
            var yelpURL = "https://www.yelp.com/search?find_desc=restaurants&find_loc=" + cityInput + "%2C+" + stateInput + "&ns=1";
            var messageBox = $("<div>");
            messageBox.addClass("box");

            var messageDiv = $("<p>");
            messageDiv.text("Zomato did not return any restaurants for this city.");

            var yelpLink = $("<a>");
            yelpLink.attr("href", yelpURL);
            yelpLink.text("Try Yelp instead");

            messageBox.append(messageDiv, yelpLink);
            $("#displayFoodResults").append(messageBox);


        }
        function searchZomato() {
            var cityCode = cityID;
            var queryURL = "https://developers.zomato.com/api/v2.1/search?apikey=f2f17d46cbed2f06723d01c2bf241ca1&entity_id=" + cityCode + "&entity_type=city&sort=rating";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                for (var i = 0; i < 10; i++) {
                    var restaurantName = response.restaurants[i].restaurant.name;
                    var address = response.restaurants[i].restaurant.location.address;
                    var avgCost = response.restaurants[i].restaurant.average_cost_for_two;
                    var menuURL = response.restaurants[i].restaurant.menu_url;
                    var restaurantBox = $("<div>");
                    restaurantBox.addClass("box");
                    var nameDiv = $("<h4>");
                    nameDiv.text(restaurantName);
                    var addressDiv = $("<p>");
                    addressDiv.text(address);
                    var costDiv = $("<p>");
                    costDiv.text("Average cost for two: " + avgCost)
                    var menuLink = $("<a>");
                    menuLink.attr("href", menuURL);
                    menuLink.text("Menu");
                    restaurantBox.append(nameDiv, addressDiv, costDiv, menuLink);
                    $("#displayFoodResults").append(restaurantBox);
                    //console.log(response.restaurants[i].restaurant);
                }
            })
        }
    })
}
$("#submitBtn").on("click", function(){
    $("#displayFoodResults").empty();
    getCity();
});