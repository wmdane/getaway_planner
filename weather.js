function findLonLat(cityValue) {
  var apiKey = "2cc514a953dcebe642cacc9f80f42e25";
  var cityName = cityValue;
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    // console.log(response);
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
        // console.log(response);
        for (var i = 0; i < response.daily.length; i++) {
          var weatherBox = $("<div>");
          weatherBox.addClass("box");
          var date = $("<h5>");
          date.text(moment().add(i, "day").calendar());
          var weatherIcon = response.daily[i].weather[0].icon;
          var icon = $("<img>");
          icon.attr("src", "https://openweathermap.org/img/w/" + weatherIcon + ".png");
          icon.attr("width", "50px");
          var highTempLine = $("<p>");
          highTempLine.text(highTemp);
          var lowTempLine = $("<p>");
          lowTempLine.text(lowTemp);
          var windSpeedLine = $("<p>");
          windSpeedLine.text(windSpeed);
          var highTemp = "High: " + response.daily[i].temp.max + "°F";
          var lowTemp = "Low: " + response.daily[i].temp.min + "°F";
          var windSpeed = "Wind Speed: " + response.daily[i].wind_speed + "MPH";
          weatherBox.append(
            date,
            $("<br>"),
            icon,
            $("<br>"),
            highTemp,
            $("<br>"),
            lowTemp,
            $("<br>"),
            windSpeed
          );
          $("#displayWeatherResults").append(weatherBox);
        }
      });
    }
  });
}
