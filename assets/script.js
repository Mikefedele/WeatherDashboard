console.log ($)
var cityName = "Philadelphia";
var apiKey = "85911b7ddaa78c45cace16f7435645a6"

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
      });

}







// 
// Your API key is 85911b7ddaa78c45cace16f7435645a6
// Endpoint:
// - Please, use the endpoint api.openweathermap.org for your API calls
// - Example of API call:
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=85911b7ddaa78c45cace16f7435645a6
