moment().format('L');


// function to get information pulled for cities
function citySearch(cityname) {



    let APIkey = "2f598171c3fda674d8b93c316fb6890e";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=" + APIkey;
    var queryURLforcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=" + APIkey;





    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);

        $("#current-day").empty();

        var currentDate = moment().format('L');
        var currentWeather = response.weather[0].main;
        var cityElement = $("<h1>").text(response.name);
        var displayMainDate = cityElement.append(" " + currentDate);
        var humidityElement = $("<p>").text("Humidity: " + response.main.humidity);
        var temperatureElement = $("<p>").text("Temperature: " + response.main.temp);
        var windElement = $("<p>").text("Wind Speed: " + response.wind.speed);






        if (currentWeather === "Snow") {
            var weatherIcon = $("<img").attr("src",  "http://openweathermap.org/img/wn/13d.png");
            weatherIcon.attr("style", "height: 40px; width: 40px");
        }

        else if (currentWeather === "Clouds") {
            var weatherIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/03d.png");
            weatherIcon.attr("style", "height: 40px; width: 40px");
        }

        else if (currentWeather === "Clear") {
            var weatherIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d.png");
            weatherIcon.attr("style", "height: 40px; width: 40px");
        }

        else if (currentWeather === "Rain") {
            var weatherIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/09d.png");
            weatherIcon = ("style", "height: 40px; width: 40px");
        }

        var cityDiv = $("<div>");

        cityDiv.append(displayMainDate, weatherIcon, temperatureElement, humidityElement, windElement);

        $("current-day").html(cityDiv);

    });

    // getting 5 day forcast and creating displays
    $.ajax({
        url: queryURLforcast,
        method: 'GET'
    }).then(function (response) {
        var results = response.list;
        $("#5day").empty();
        // for loop to dispplay results in html
        for (var i = 0; i < results.length; i += 8) {
           
            var fiveDayDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");

           
            var date = results[i].dt_txt;
            var setD = date.substr(0, 10)
            var temp = results[i].main.temp;
            var hum = results[i].main.humidity;

          
            var h5date = $("<h5 class='card-title'>").text(setD);
            var pTemp = $("<p class='card-text'>").text("Temp: " + temp);;
            var pHum = $("<p class='card-text'>").text("Humidity " + hum);;

            var weather = results[i].weather[0].main

            if (weather === "Rain") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                icon.attr("style", "height: 40px; width: 40px");

            } else if (weather === "Clouds") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                icon.attr("style", "height: 40px; width: 40px");
            }
            else if (weather === "Clear") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                icon.attr("style", "height: 40px; width: 40px");
            }

            else if (weather === "Snow") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                icon.attr("style", "height: 40px; width: 40px");
            }

            
            fiveDayDiv.append(h5date);
            fiveDayDiv.append(icon);
            fiveDayDiv.append(pTemp);
            fiveDayDiv.append(pHum);
            $("#5day").append(fiveDayDiv);
        }

    });
}
generatePage();




$("#select-city").on("click", function (event) {
    event.preventDefault();
    // Storage for city names
    var cityInput = $("#city-input").val().trim();

    
    var textContent = $(this).siblings("input").val();
    var myStorageArray = [];
    myStorageArray.push(textContent);
    localStorage.setItem('cityName', JSON.stringify(myStorageArray));

    citySearch(cityInput);
    generatePage();
});

function generatePage() {
    var lastSearch = JSON.parse(localStorage.getItem("cityName"));
    var searchDiv = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>").text(lastSearch);
    var psearch = $("<div>");
    psearch.append(searchDiv)
    $("#search-history").prepend(psearch);
}

// to prevent page from loading 
$("#search-history").on('click', '.btn', function (event) {
    event.preventDefault();
    console.log($(this).text());
    citySearch($(this).text());

});