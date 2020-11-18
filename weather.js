function findLonLat() {
  var apiKey = "2cc514a953dcebe642cacc9f80f42e25";
  var cityName = "charlotte";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    console.log(response);
    return lon, lat;
  });
}

function buildQueryURL() {
  findLonLat();
  //set api key
  var apiKey = "2cc514a953dcebe642cacc9f80f42e25";

  // set query url with fields to populate based on search parameters
  var queryURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=hourly,minutely&units=imperial&appid=" +
    apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
}

$(".btn").on("click", function () {
  buildQueryURL();
});
