console.log($);
// var cityName = "houston";
var apiKey = "85911b7ddaa78c45cace16f7435645a6";
var recentSearch = [];
var submitted = $("#submitButton");
var cityName = "";
var formEl = $("#citySelector");
var cityNameEl = $("#cityName");
var recentsEl = $(".recentSearches");
var currentTempEl = $("#currentTemp");
var currentDayEl = $(".currentDay");
var cardBodyEl = $(".cardbody");
var currentDataEl = document.getElementById("currentData");
console.log(document.documentElement);
//TODO: CREATE PAST SEARCHES BUTTONS
// var printSkills = function (name, date) {
//   var listEl = $('<li>');
//   var listDetail = name.concat(' on ', date);
//   listEl.addClass('list-group-item').text(listDetail);
//   listEl.appendTo(skillsListEl);
// };

var handleFormSubmit = function (event) {
  console.log("click");
  event.preventDefault();

  cityName = cityNameEl.val();
  console.log(cityName);

  if (!cityName) {
    console.log("Please select a city.");
    return;
  }
  fetchCity(cityName);
};

// recentSearch.push(cityName);
// localStorage.setItem("lastSearch", cityName);
// localStorage.setItem("recentSearches", JSON.stringify(recentSearch));

// localStorage.setItem("recentSearches", JSON.stringify(recentSearches));

// add last-searched-city data into savedCities[]
//  if (savedCities.indexOf(city) < 0) {
//    savedCities.push(city);
//  }

//  recentSearches[] to localStorage
//  localStorage.setItem("lastSearched", city);
//

// if (submitted.addEventListener) {
//   submitted.addEventListener("click", getWeather, false);
// }

var fetchCity = function () {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`,
    {
      method: "GET", //GET is the default.
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
    }
  )
    .then(function (response) {
      console.log(response);

      return response.json();
    })
    .then(function (data) {
      console.log({ data });

      var lat = data[0].lat;
      console.log(lat);

      var lon = data[0].lon;
      getWeather(lat, lon);
      // var name = data[0].name;
      // var state = data[0].state;
      console.log(name);
      console.log(state);
      $(state).appendTo(currentDayEl);

      // var currentState = function (name, state) {
      //   var headerEl = $('<h3>');
      //   var showState = name.concat(',', state);
      //   headerEl.addClass('currentState').text(showState);
      //   headerEl.appendTo(currentDay);

      //   currentState();
      // };
    });
};
function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}
  `,
    {
      method: "GET", //GET is the default.
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
    }
  )
    .then(function (response) {
      console.log(response);

      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var temp = data.current.temp;
      console.log(temp);
      var day = moment.unix(data.current.dt).format("ddd, MMMM Do, YYYY");
      console.log(day);
      //buildHTML

      var feelsLike = data.current.feels_like;
      var humidity = data.current.humidity;

      console.log(feelsLike);
      console.log(humidity);

      var currentHumidity = data.current.humidity;
      var currentUV = data.current.uvi;
      var currentTemp = data.current.temp;
      var currentIcon = data.current.weather[0].icon;

      var divEl = document.createElement("div");
      var currentList = document.createElement("ul");
      var li1 = document.createElement("li1");
      var li2 = document.createElement("li2");
      var li3 = document.createElement("li3");

      li1.textContent = `Temp: ${currentTemp}`;
      li2.textContent = "Humidity: " + currentHumidity;
      li3.textContent = "UV Index: " + currentUV;

      currentDataEl.append(currentList);
      currentList.append(divEl);
      currentList.append(li1);


      currentList.append(li2);

      currentList.append(li3);


      fiveDayInfo(data.daily);
      // var currentDay = function () {

      // }
      //  for (var i = 0; in < array.length; index++) {
      //    const element = array[index];

      //  }
      // currentDay();
    });
}

function fiveDayInfo(futureArray) {
  console.log(futureArray);
  // var futureArray = data.daily;
  for (var i = 0; i < 5; i++) {
    var futureDay = futureArray[i];
    console.log(futureDay);
console.log(i);
    var uvi = futureArray[i].uvi;
    var descrip = futureArray[i].weather[0].description;
    var dailyMin = futureArray[i].temp.min;
    var dailyMax = futureArray[i].temp.max;
    var main = futureArray[i].weather[0].main;
    var wind = futureArray[i].wind_speed;

    $("#future")
      .html("<h4 class='mt-3'> 5-Day Forecast:</h4>")
      .append('<div class="fiveDay">');
    var col = $("<div>").addClass("col-md-2");
    var card = $("<div>").addClass("card");
    var body = $("<div>").addClass("card-body p-2");
    var title = $("<h5>")
      .addClass("card-title")
      .text(new Date(futureArray[i].dt_txt).toLocaleDateString());
    var img = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/w/" +
        futureArray[i].weather[0].icon +
        ".png"
    );
    var p1 = $("<p>")
      .addClass("card-text")
      .text("Min Temp: " + futureArray[i] + dailyMin + "F");
    var p2 = $("<p>")
      .addClass("card-text")
      .text("Max Temp: " + futureArray[i] + dailyMax);
    var p3 = $("<p>")
      .addClass("card-text")
      .text(futureArray[i] + descrip);
    var p4 = $("<p>")
      .addClass("card-text")
      .text("UV Index: " + futureArray[i] + uvi);

    col.append(card.append(body.append(title, img, p1, p2, p3, p4)));
    $("#future .row").append(col);
  }
}

formEl.on("submit", handleFormSubmit);

// cityNameEl.val('');

//
// Your API key is 85911b7ddaa78c45cace16f7435645a6
// Endpoint:
// - Please, use the endpoint api.openweathermap.org for your API calls
// - Example of API call:
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=85911b7ddaa78c45cace16f7435645a6

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
