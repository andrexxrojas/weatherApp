const apiKey = "2fa73590fd8b5a4c6e68098ad5625395"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric"

let searchValue = document.querySelector(".search-box")

searchValue.addEventListener("keypress", function(evt){
    if(evt.keyCode === 13){
        checkWeather(searchValue.value);
        searchValue.value = "";
    }
})

async function checkWeather(query){
    const response = await fetch(apiUrl + `&appid=${apiKey}&q=${query}`)
    var data = await response.json();

    console.log(data);

    //Changes to be made in HTML
    let cityName = document.querySelector("#title");
    let date = document.querySelector("#date");
    let temp = document.querySelector(".temperature");
    let sumMsg = document.querySelector("#message");
    let sumEst = document.querySelector("#estimate");
    let windInfo = document.querySelector(".extra-info");

    //Change City Name
    cityName.innerHTML = `${data.name}`;

    //Change Date
    let now = new Date();
    date.innerText = dateBuilder(now);

    //Change Temperature
    temp.innerText = `${Math.floor(data.main.temp)}°`;

    //Change Message
    sumMsg.innerText = `${data.weather[0].main}`;

    //Change Estimate Temperature
    sumEst.innerText = `${Math.floor(data.main.temp_min)}° - ${Math.floor(data.main.temp_max)}°`;

    //Change Wind Information
    windInfo.innerText = `Wind: ${Math.floor(data.wind.speed)} km/h`;
}

function dateBuilder(d){
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    return `${day} - ${date} ${month}`;
}

// checkWeather()