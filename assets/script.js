console.log ($)
// var cityName = "Austin";
var apiKey = "85911b7ddaa78c45cace16f7435645a6";

var submitted = $("#submitButton");
var cityName = "";
var formEl = $('#citySelector');
var cityNameEl = $('#cityName');
var recentsEl = $('.recentSearches');
var currentDayEl = $('currentDay')
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
    console.log('Please select a city.');
    return;
  
    
//   // printSkills(cityInput);

//   // resets form
  // 
  
}};



// localStorage.setItem("recentSearches", cityNameEl);
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
 


fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`,{
  
     method: 'GET', //GET is the default.
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
    })
      .then(function (response) { console.log(response)

        return response.json();
      })
      .then(function (data) {
        console.log(data);

        var lat = data[0].lat;
        console.log(lat);

        var lon = data[0].lon;
getWeather(lat,lon);
var name = data[0].name;
var state = data[0].state;
console.log(name)
console.log(state);

var currentState = function (name, state) {
  var headerEl = $('<h3>');
  var showState = name.concat(',', state);
  headerEl.addClass('currentState').text(showState);
  headerEl.appendTo(currentDay);

  currentState();
};


      });

function getWeather(lat,lon) {
  fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}
  `,{
  
     method: 'GET', //GET is the default.
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
    })
      .then(function (response) { console.log(response)

        return response.json();
      })
      .then(function (data) {
        console.log(data);
var temp = data.current.temp;
console.log(temp)
var day = moment.unix(data.current.dt).format("ddd, MMMM Do, YYYY");
console.log(day)
//buildHTML

var feelsLike = data.current.feels_like;
var humidity = data.current.humidity;

console.log(feelsLike);
console.log(humidity);

// future = function {
// var dailyMin = data.daily[i].temp.min;
// var dailyMax = data.daily[i].temp.max;
// var main = data.daily[i].weather.[0].main;
// var wind = data.daily[i].wind_speed;
// 
// }

      });

}


formEl.on("submit", handleFormSubmit );

cityNameEl.val('');


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