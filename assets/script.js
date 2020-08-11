moment().format('L');

function citySearch (cityName) {



 let APIkey =  "AIzaSyCnay5XlE5aql9LI3tqJ8gGkLO1RJOvNb8";
     
    var queryURL =  "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=" + APIkey;
    var queryURLforcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + APIkey;
 
         
 
 
 
 $.ajax({
         url: queryURL,
         method: "GET"
       }).then(function(response) {
         console.log(response);
         console.log(queryURL);

         var currentDate = moment().format('L');
         var currentWeather = response.weather[0].main;
         var cityElement = $("<h1>").text(response.name);
         var displayMainDate = cityElement.append(" " + mainDate);
         var humidityElement = $("<p>").text("Humidity: " + response.main.humidity);
         var temperature = $("<p>").text("Temperature: " + response.main.temp);
         var windElement = $("<p>").text("Wind Speed: " + response.wind.speed);
         

          $("#current-day").empty();
         
     

             if (currentWeather === "Snow") {
                 var weatherIcon = $("<img").attr("src", "sleet.png");
                 weatherIcon.attr("style", "height: 40px; width: 40px");
             }

             else if (currentWeather === "Clouds") {
                 var weatherIcon = $("<img>").attr("src", "overcast.png"); 
                 weatherIcon.attr("style", "height: 40px; width: 40px");
             }

             else if (currentWeather === "Clear") {
                 var weatherIcon = $("<img>").attr("src", "sunny.png"); 
                 weatherIcon.attr("style", "height: 40px; width: 40px");
             }

             else if (currentWeather === "Rain") {
                 var weatherIcon = $("<img>").attr("src", "rain.png"); 
                 weatherIcon = ("style", "height: 40px; width: 40px");
             }
             
             var cityDiv = $("<div>");

             cityDiv.append(displayMainDate, currentIcon, temperature, humidityElement, windElement);

             $("current-day").html(cityDiv);
     });
 
 cd

 
 $("#select-city").on("click", function() {

 