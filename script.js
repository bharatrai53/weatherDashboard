var previousSearches = [];

// Function to handle the search process
function searchCity() {
  document.getElementById("cardHolder").innerHTML = "";
  let city = getCityName();
  saveToPreviousSearches(city);
  getForecast(city);
  getCurrentWeather(city);
}


// Function to get the city name from user input
function getCityName() {
  return document.getElementById("citySearchEntry").value;
}

// Function to save the current city name to previous searches
function saveToPreviousSearches(city) {
  if (localStorage.getItem("previousSearches")) {
    previousSearches = JSON.parse(localStorage.getItem("previousSearches"));
  }
  previousSearches.push(city);
  localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
}

// Function to make API request and get the weather data
function getForecast(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3e1dd7d0420bdf9e5a6b806b1cedb6bb`, {
    cache: 'reload',
  })
    .then(response => response.json())
    .then(data => filterData(data))
    .catch(error => console.error(error));
}

function getCurrentWeather(city) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3e1dd7d0420bdf9e5a6b806b1cedb6bb`)
    .then(response => response.json())
    .then(data => {
      //extract the current temperature from currentWeatherData 
      var currentTemperature = data.main.temp;
      console.log(data)
      var currentTemperatureInFahrenheit = (currentTemperature - 273.15) * 9 / 5 + 32;
      //create a new element to show the current temperature
      var currentTempElem = document.createElement("p");
      currentTempElem.textContent = "Current Temperature: " + currentTemperatureInFahrenheit.toFixed(2) + "°F";
      //append it to the HTML
      document.getElementById("todayForecast").appendChild(currentTempElem);
    })
    .catch(error => console.error(error));
}
//filter search results
function filterData(data) {
  var targetArray = [];
  for (var i = 0; i < data.list.length; i++) {
    console.log(data.list[i]);
    var targetCard = data.list[i];
    var targetValue = data.list[i].dt_txt.split(" ")[1];
    console.log(targetValue);
    if (targetValue === "12:00:00") {
      targetArray.push(targetCard);
    }
    //upon first page load show headers
    document.getElementById("forecastContainer").style.display = "block";
  }
  console.log(targetArray)
  displayData(targetArray);
}

function displayData(data) {
  document.getElementById("cardHolder").innerHTML = "";
  //pull the data stored in array to the page
  for (var i = 0; i < data.length; i++) {
    var card = document.createElement("div");
    card.setAttribute("class", "card card-spacing");

    var cardTitle = document.createElement("h3");
    cardTitle.setAttribute("class", "card-title");

    //save date in day and date format
    var date = dayjs.unix(data[i].dt);
    var dayName = date.format('ddd\nMM-DD-YY');

    //title with date
    cardTitle.textContent = dayName;
    card.appendChild(cardTitle);
    document.getElementById("cardHolder").appendChild(card);

    //get temperature
    var temp = data[i].main.temp;
    var tempInFahrenheit = (temp - 273.15) * 9 / 5 + 32;
    var tempElement = document.createElement("p");
    tempElement.textContent = "Temperature: " + tempInFahrenheit.toFixed(2) + "°F";
    card.appendChild(tempElement);
    document.getElementById("cardHolder").appendChild(card);

    //get icon
    //get temperature
    var icon = data[i].weather.icon;
    var iconElement = document.createElement("p");
    iconElement.textContent = icon;
    card.appendChild(iconElement);
    document.getElementById("cardHolder").appendChild(card);

    //get wind speed
    var windSpeed = data[i].wind.speed;
    var windElement = document.createElement("p");
    windElement.textContent = "Wind Speed: " + windSpeed + " MPH";
    card.appendChild(windElement);
    document.getElementById("cardHolder").appendChild(card);

    //get humidity
    var humid = data[i].main.humidity;
    var humidElement = document.createElement("p");
    humidElement.textContent = "Humidity: " + humid + "%";
    card.appendChild(humidElement);
    document.getElementById("cardHolder").appendChild(card);

  }
  previousCities();
}


function previousCities() {
  document.getElementById("previousCitiesList").innerHTML = "";
  for (var i = 0; i < previousSearches.length; i++) {
    var listItem = document.createElement("li");
    listItem.setAttribute("style", "list-style-type: none")
    listItem.textContent = previousSearches[i];
    document.getElementById("previousCitiesList").appendChild(listItem);
  }
}






















//https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}

// function afterLoadedData(query, resultsTable) {
//   // console.log(query.target.value);
//   localStorage.setItem(query);
//   console.log("first Function");
// }





// var city = "Los Angeles, CA"

//   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
//   .then(response => response.json())
//   .then(data => {
//     // Do something with the data
//     console.log(data);
//   })
//   .catch(error => {
//     // Handle any errors
//     console.log('error');
//   });