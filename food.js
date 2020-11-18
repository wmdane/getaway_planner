// var zomatoCities = {

// }

function searchZomato(){
    var cityCode = 12;
    var queryURL = "https://developers.zomato.com/api/v2.1/search?apikey=f2f17d46cbed2f06723d01c2bf241ca1&entity_id=" + cityCode + "&entity_type=city";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        for(var i=0; i<response.restaurants.length; i++){
            console.log(response.restaurants[i].restaurant.name);
        }
    })

}

/* function getCityCodes(){
    var queryURL = "https://developers.zomato.com/api/v2.1/search?apikey=f2f17d46cbed2f06723d01c2bf241ca1&entity_id=" + cityCode + "&entity_type=city";

} */

searchZomato();


