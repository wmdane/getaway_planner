$(document).ready(function () {
  // calling function in event.js so that history comes up upon refresh or page-load
  renderHistory();

  function handleEvents(city, state) {
    $("#displayWeatherResults").empty();
    $("#displayFoodResults").empty();
    $("#displaySearchHistory").empty();
    $("#displayDrinkResults").html("");
    findDrinks(city, state);
    findLonLat(city);
    getCity(city, state);
  }
  $(document).on("click", ".search-button", function () {
    var city = $(this).attr("data-city");
    var state = $(this).attr("data-state");
    handleEvents(city, state);
  });

  $("#submitBtn").on("click", handleSubmit);
  function handleSubmit() {
    var citySearched = $("#cityInput").val();
    var stateSearched = $("#stateInput").val();
    var userInputList = JSON.parse(localStorage.getItem("userInput")) || [];
    var userInput = citySearched + ", " + stateSearched;
    userInputList.push(userInput);
    localStorage.setItem("userInput", JSON.stringify(userInputList));
    handleEvents(citySearched, stateSearched);
  }
});
