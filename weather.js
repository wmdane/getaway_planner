function findLonLat() {
  var apiKey = "2cc514a953dcebe642cacc9f80f42e25";
  var cityName = "#cityInput";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    console.log(response);
    buildQueryURL();
    return lon, lat;
    function buildQueryURL() {
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
        for (var i = 1; i < response.daily.length; i++) {
          var weatherBox = $("<div>");
          weatherBox.addClass("box");
          var date = $("<h5>");
          date.text(moment().add(i, "day").calendar());
          var icon = $("<img>");
          icon.attr("src", "http://openweathermap.org/img/w/" + weatherIcon + ".png");
          icon.attr("width", "40px");
          var highTempLine = $("<p>");
          highTempLine.text(highTemp);
          var lowTempLine = $("<p>");
          lowTempLine.text(lowTemp);
          var windSpeedLine = $("<p>");
          windSpeedLine.text(windSpeed);
          var weatherIcon = response.daily[i].weather.icon;
          var highTemp = "High: " + response.daily[i].temp.max;
          var lowTemp = "Low: " + response.daily[i].temp.min;
          var windSpeed = "Wind Speed: " + response.daily[i].wind_speed;
          weatherBox.append(date, icon, highTemp, lowTemp, windSpeed);
        }
      });
    }
  });
}
$("#submitBtn").on("click", function () {
  findLonLat();
});
