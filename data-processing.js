import "./script.js";

export let unitType = "metric";
export let cityList;

// GEOLOCATON API FUNCTION
export const getLocation = (callback) => {
    function handleGeoErrors(error) {
        helpers.togglePreloader();
        elements.warningText.parentElement.classList = "";
        switch (error.code) {
            case error.PERMISSION_DENIED:
            elements.warningText.innerHTML = "User denied the request for Geolocation";
                break;
            case error.POSITION_UNAVAILABLE:
            elements.warningText.innerHTML = "Location information is unavailable";
                break;
            case error.TIMEOUT:
            elements.warningText.innerHTML = "The request to get user location timed out";
                break;
            case error.UNKNOWN_ERROR:
            elements.warningText.innerHTML = "An unknown error occurred";
                break;
        }
    };
    let coordinates = {};
    if (navigator.geolocation) {
        helpers.togglePreloader();
        navigator.geolocation.getCurrentPosition(function (pos) {
            coordinates.latitude = pos.coords.latitude;
            coordinates.longitude = pos.coords.longitude;
            helpers.togglePreloader();
            elements.warningText.parentElement.classList = "content-hidden";
            callback(coordinates, unitType);
        }, handleGeoErrors);
    } else {
        elements.warningText.parentElement.classList = "";
        elements.warningText.innerHTML = "Your browser doesn't support geolocation";
    }
};

// WEATHER API AJAX CALL
export const ajax = (coordinates, units) => {
    helpers.togglePreloader();
    let xhrWeather = new XMLHttpRequest();
    if (typeof coordinates == "object") {
        xhrWeather.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat=" + coordinates.latitude + "&lon=" + coordinates.longitude + "&units=" + units + "&appid=15be2987c14d02b7ae3ade0b84c5ce50", true);
    } else {
        xhrWeather.open("GET", "https://api.openweathermap.org/data/2.5/weather?id=" + coordinates + "&units=" + units + "&appid=15be2987c14d02b7ae3ade0b84c5ce50", true);
    }
    xhrWeather.addEventListener("loadend", function () {
        let weather = JSON.parse(this.response);
        elements.warningText.parentElement.classList = "content-hidden"; //hidding geolocation api warning
        //injecting data to page
        elements.city.innerHTML = weather.name;
        elements.city.setAttribute("data-city-id", weather.id);
        elements.temp.innerHTML = `${weather.main.temp}${(units=="metric")?"°C":"°F"}`;
        elements.icon.setAttribute("src", `img\\weather\\${weather.weather[0].icon}.png`);
        elements.description.innerHTML = weather.weather[0].main;
        elements.detailsSection.innerHTML = `<p>Right now temperature in <strong>${weather.name}</strong> should be around <strong>${weather.main.temp}${(units=="metric")?"°C":"°F"}</strong>${(weather.main.temp_min == weather.main.temp_max) ? "." : ", and may vary from <strong>"+weather.main.temp_min+((units=="metric")?"°C":"°F")+"</strong> to <strong>"+weather.main.temp_max+((units=="metric")?"°C</strong>.":"°F</strong>.")}</p><p>Cloudiness is about <strong>${weather.clouds.all}%</strong></p><p>Wind speed is <strong>${weather.wind.speed+((units=="metric")?" m/s":" mil/h")}</strong>.</p><p>Day lasts for <strong>${Math.floor((weather.sys.sunset-weather.sys.sunrise)/3600)} hours and ${Math.floor(((weather.sys.sunset-weather.sys.sunrise)%3600)/60)+1} minutes</strong>.</p>`;
        if (typeof map == "undefined") {
            googleMaps.initMap(weather.coord)
        } else {
            let uluru = {lat: weather.coord.lat, lng: weather.coord.lon};
            map.panTo(uluru)
        }
        helpers.togglePreloader();            
        elements.date.innerHTML = "Data updated!";
        helpers.animate(date, "bounceInDown", 200);
        setTimeout(function () {
            helpers.animate(elements.date, "bounceOutUp", 200);
            elements.date.innerHTML = helpers.getFormattedDate();
            helpers.animate(elements.date, "bounceInDown", 200);
        }, 3000);
    });      
    xhrWeather.send();
};

// TOGGLE SEARCH VIEW
export const toggleSearch = () => {
    if (!elements.city.classList.contains("content-hidden")) {
        elements.city.classList.toggle("content-hidden");
        elements.searchBar.parentElement.classList.toggle("content-hidden");
        elements.searchBar.parentElement.classList.toggle("bounceInRight");
        elements.pinButton.classList.toggle("content-hidden");
        elements.typeaheadList.parentElement.className = "";
        setTimeout(function () {
            elements.typeaheadList.parentElement.className = "typeahead-unfold";
        }, 200);

    } else {
        elements.searchBar.parentElement.className = "bounceOutRight";
        setTimeout(function () {
            elements.searchBar.parentElement.className = "content-hidden";
            elements.pinButton.classList.toggle("content-hidden");
            elements.city.classList.toggle("content-hidden");
            elements.typeaheadList.parentElement.classList.toggle("typeahead-unfold");
            setTimeout(function () {
                elements.typeaheadList.parentElement.className = "content-hidden";
            }, 200);
        }, 200)

    }
    elements.searchBar.focus();
};

//LOAD CITY LIST FROM JSON
export const loadCityList = () => {
    let xhrList = new XMLHttpRequest();
    xhrList.overrideMimeType("application/json");
    xhrList.open("GET", "city.json", true);
    xhrList.addEventListener("loadend", function(){
        cityList = JSON.parse(xhrList.response);
        cityList.forEach(function(el){
            delete el.coord;
        });
    });
    xhrList.send();
};

// CITY SEARCH IN CITY LIST AND TRIGGER AJAX CALL
export const searchCity = (searchBar) => {
    let result = [];
    for (let i = 0; i < dataProcessing.cityList.length; i++) {
        let regex = new RegExp("^" + searchBar, "gi")
        if ((regex.test(dataProcessing.cityList[i].name)) && (result.length < 9)) {
            result.push(dataProcessing.cityList[i]);
        };

    }
    elements.typeaheadList.innerHTML = "";
    result.splice(9, result.length);

    result.forEach(el => {
        elements.typeaheadList.innerHTML += `<li data-city-id="${el.id}">${el.name}, ${el.country}</li>`;
    });
    elements.typeaheadList.querySelectorAll("li").forEach(element => {
        element.addEventListener("click", function () {
            dataProcessing.ajax(this.getAttribute("data-city-id"), dataProcessing.unitType);
            dataProcessing.toggleSearch();
        })

    });
};