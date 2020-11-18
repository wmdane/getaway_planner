
function getCity() {
    var queryURL2 = "https://developers.zomato.com/api/v2.1/cities?q=boston&apikey=f2f17d46cbed2f06723d01c2bf241ca1";
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {
        cityID = response.location_suggestions[0].id;
        console.log(cityID);
        searchZomato();
        return cityID;
        function searchZomato() {
            var cityCode = cityID;
            var queryURL = "https://developers.zomato.com/api/v2.1/search?apikey=f2f17d46cbed2f06723d01c2bf241ca1&entity_id=" + cityCode + "&entity_type=city&sort=rating";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                $("#displayFoodResults").html("");
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

                    console.log(restaurantName);
                    console.log("Address: " + address);
                    console.log("Average cost for two: " + avgCost);
                    console.log("Menu: " + menuURL);
                    //console.log(response.restaurants[i].restaurant);



                }
            })

        }
    })

}
getCity();




