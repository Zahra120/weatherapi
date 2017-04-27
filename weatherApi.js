
var now = new Date();
var minutes = now.getMinutes();
var hours = now.getHours();
var split = new Date().toString().split(" ");


var APPID = "8bc508927c27a7a33e05b6cb3d9f7839";
var temp ,
	loc,
	icon,
	humidity,
	wind;


function update(weather){
	wind.innerHTML = weather.wind ;
	humidity.innerHTML = weather.humidity;
	icon.src = "http://openweathermap.org/img/w/" + weather.icon + ".png";
	temp.innerHTML = weather.temp;

}

	window.onload = function(){
		temp = document.getElementById("temperature");
		loc = document.getElementById("location");
		humidity = document.getElementById("humidity");
		wind = document.getElementById("wind");
		direction = document.getElementById("direction");
		icon = document.getElementById("icon");
		if( minutes < 10){
		document.getElementById("localTime").innerHTML +=(hours + ":0" + minutes) ;
	}else {
		document.getElementById("localTime").innerHTML +=(hours + ":" + minutes) ;

	}
		document.getElementById('localDate').innerHTML += (split[0] + ", " + split[2] + " "+split[1] +" "+ split[3] );

		if(navigator.geolocation){
	var showPosition = function(position){
	    updateByGeo(position.coords.latitude, position.coords.longitude);
	}
	navigator.geolocation.getCurrentPosition(showPosition);
    } else {
	var city = window.prompt("Could not find your location. What is your city name?");
	updateByName(city);
    }


};

function updateByGeo(lat, lon){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"lat=" + lat +
	"&lon=" + lon +
	"&APPID=" + APPID;
    sendRequest(url);
}


function updateByName(city){
	var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"q=" + city + "&APPID=" + APPID;
	sendRequest(url);
	}

function sendRequest(url){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){

		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

			var data = JSON.parse(xmlhttp.responseText);
			var weather = {};

			weather.icon = data.weather[0].icon;
			weather.humidity = data.main.humidity;
			weather.wind = data.wind.speed;
			weather.direction = data.wind.deg;
			weather.loc = data.name;
			weather.temp = K2C(data.main.temp);
			update(weather);
		}

	};
	xmlhttp.open('GET', url, true);
	xmlhttp.send();
}

function K2C(k){
	return Math.round(k-273,15);
}
