console.log($);
// var cityName = "houston";
var apiKey = "85911b7ddaa78c45cace16f7435645a6";
var recentSearch = JSON.parse(localStorage.getItem("recentSearches"))||[];
console.log(recentSearch);
var submitted = $("#submitButton");
var formEl = $("#citySelector");
var cityNameEl = $("#cityName");
var recentsEl = $(".recentSearches");
var currentTempEl = $("#currentTemp");
var currentDayEl = $(".currentDay");
var cardBodyEl = $(".cardbody");
var currentDataEl = document.getElementById("currentData");
var lastSearch = localStorage.getItem("lastSearch")||'';
console.log(lastSearch);
var today = document.getElementById("currentLoc");
today.textContent = moment().format("ddd, MMMM Do, YYYY");
var cityName = "";
var buttonsList = document.getElementById("recentbtns");
var buttonArray = "";



//TODO: Atag & src PAST SEARCHES BUTTONS
//todo set city name to show in current display


buildMenu();


var handleFormSubmit = function (event) {  
  event.preventDefault();
  var cityName = cityNameEl.val();
  if (!cityName) {
    alert("Please select a city.");
    return;
  }  
  if(recentSearch.indexOf(cityName) === -1){
    recentSearch.push(cityName);
    localStorage.setItem("recentSearches", JSON.stringify(recentSearch))
    // todo shift not replacing oldest button
    if (recentSearch.length >= 5) {
    var x = recentSearch.shift() 
    console.log(x);
    }
  };

  fetchCity(cityName);
  localStorage.setItem("lastSearch", cityName); 


  currentCardEl = document.getElementById("currentCard");
  var cardTitleEl = document.createElement("h2");
  cardTitleEl.setAttribute("class", "card-title");
  cardTitleEl.textContent = cityName;
  currentCardEl.append(cardTitleEl);

 

  cityNameEl.val("");
  
};
//todo 


// if (recentSearch[i] == 5) {
//   recentShift = recentSearch.shift()
// console.log(recentShift)
//   };

function buildMenu() {

  for (var i = 0; i < recentSearch.length; i++) {
    //use break to stop the buttons after 5
      if (i == 5) {
        break;
      }
  
  var recentButtons = document.createElement("button");
    buttonsList.appendChild(recentButtons);
    recentButtons.setAttribute("class", "cityList btn-outline-secondary");
    recentButtons.setAttribute("type", "button");
    recentButtons.textContent = recentSearch[i];
    var buttonArray = recentSearch[i];
    console.log(buttonArray);


    

  //  var buttonClicks = function() {{
  //   var x = fetchCity(buttonArray);
  //  }
  //    getWeather(x);    
  // }
  // buttonClicks();
  // console.log(buttonClicks);

//     var recentfetchCity = fetchCity(buttonArray);
//     var recentgetWeather = getWeather(recentfetchCity);
//     addEventListener.recentButtons("click", recentgetWeather)
    


// buttonClicks()
}}
 



var fetchCity = function (cityName) {
  console.log(cityName);
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`,
    {
      method: "GET", //GET is the default.
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
    }
  )
    .then(function (response) {
      // console.log(response);

      return response.json();
    })
    .then(function (data) {

      var lat = data[0].lat;     
      var lon = data[0].lon;
      getWeather(lat, lon);
      
      
      cityName.value = "";
      
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
      // console.log(response);

      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      var temp = data.current.temp;
      // console.log(temp);
      var day = moment.unix(data.current.dt).format("ddd, MMMM Do, YYYY");
      //buildHTML

      var today = document.getElementById("currentLoc");
      var feelsLike = data.current.feels_like;
      var humidity = data.current.humidity;



      var currentHumidity = data.current.humidity;
      var currentUV = data.current.uvi;
      var currentTemp = data.current.temp;
      var currentIcon = 'https://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png';
      var divEl = document.createElement("div");
      var currentList = document.createElement("ul");
      var li1 = document.createElement("li1");
      li1.setAttribute("class","list-group-item");
      var li2 = document.createElement("li2");
      li2.setAttribute("class","list-group-item");
      var li3 = document.createElement("li3");
      li3.setAttribute("class","list-group-item");
      var icon = document.createElement("img");
      icon.setAttribute("src", currentIcon);
      if (currentUV < 4 ) {
        li3.setAttribute("class", "uv-green list-group-item")
       }
       else if ((currentUV >= 4 < 8)) {
        li3.setAttribute("class", "uv-orange list-group-item")
       };

       if (currentUV >= 8) {
        li3.setAttribute("class", "uv-red list-group-item")
       }
      
      
      li1.textContent = `Temp: ${currentTemp}`;
      li2.textContent = "Humidity: " + currentHumidity;
      li3.textContent = "UV Index: " + currentUV;

      today.textContent = day;
      currentDataEl.append(currentList);
      currentList.append(divEl);
      currentList.append(li1);
      li1.append(icon)



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
  
  var futureTitle = $("<h4>").addClass("mt-3 col-12").text("5- Day Forecast: ")
  var cardRow = $("<div>").addClass("row").attr("id","future")
$("#5-Day").append(futureTitle);
$(".parent").append(cardRow)
  for (var i = 0; i < 5; i++) {
     futureArray[i];

    var uvi = futureArray[i].uvi;
    var descrip = futureArray[i].weather[0].description;
    var dailyMin = futureArray[i].temp.min;
    var dailyMax = futureArray[i].temp.max;
    var main = futureArray[i].weather[0].main;
    var wind = futureArray[i].wind_speed;
    var card = $("<div>").addClass("card");
    var col = $("<div>").addClass("col-md-2");
    var futureTime = moment.unix(futureArray[i].dt).format("MM/DD/YY");
    
    var body = $("<div>").addClass("card-body p-2");
    var title = $("<h5>")
      .addClass("card-title")
      .text(futureTime);

    var img = $("<img>").attr(
      "src",
      "https://openweathermap.org/img/w/" +
        futureArray[i].weather[0].icon +
        ".png"
    );
    var p1 = $("<p>")
      .addClass("card-text")
      .text("Min Temp: " + dailyMin + "F");
    var p2 = $("<p>")
      .addClass("card-text")
      .text("Max Temp: " + dailyMax);
    var p3 = $("<p>")
      .addClass("card-text")
      .text(descrip);
    var p4 = $("<p>")
      .addClass("card-text")
      .text("UV Index: " +  uvi);
      if (uvi < 4 ) {
        p4.css("background-color", "green")
       }
       else if ((uvi >= 4 < 8)) {
        p4.css("background-color", "orange")
       };

       if (uvi >= 8) {
        p4.css("background-color", "red")
       }
      
      $("#future").append(col.append(card.append(body.append(title.append(img),p1,p2,p3,p4))));

      
      
  }

  

  

 }
formEl.on("submit", handleFormSubmit);



// }








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
