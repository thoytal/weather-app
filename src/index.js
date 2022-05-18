let currentTime = new Date();
function formatDate(currentTime) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let currentDay = days[currentTime.getDay()];
  let currentMonth = months[currentTime.getMonth()];
  let currentDate = currentTime.getDate();
  let currentHour = currentTime.getHours();
  let currentMinutes = (`0` + currentTime.getMinutes()).slice(-2);

  let formattedDate = `${currentDay} ${currentMonth}/${currentDate} ${currentHour}:${currentMinutes}`;

  return formattedDate;
}

document.getElementById("current-date").innerHTML = formatDate(currentTime);

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-conditions").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  //console.log(response.data);
}

function search(city) {
  let apiKey = "57c85a0a26b344352fe49171a4724f4d";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function searchForm(event) {
  event.preventDefault();

  let city = document.querySelector("#location").value;
  search(city);
}
let form = document.querySelector("form");
form.addEventListener("submit", searchForm);

function actualLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "57c85a0a26b344352fe49171a4724f4d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function retrievePosition() {
  navigator.geolocation.getCurrentPosition(actualLocation);
  //console.log(retrievePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", retrievePosition);

search("Austin");
