var unitType = "metric";
const bgMapContainer = document.querySelector("#bg-map-container");
var map;
var cityList;
var val;
var chromeFix; //chrome fix library var

// HEADER ITEMS
const pinButton = document.querySelector("#pin-button");
const searchButton = document.querySelector("#search-button");
const searchBar = document.querySelector("#city-search");
const city = document.querySelector("#city");

// NAV ITEMS
const navTitle = document.querySelector("#nav-title");
const arrowRight = document.querySelector("#button-right");
const arrowLeft = document.querySelector("#button-left");

// CONTENT ITEMS
const overviewSection = document.querySelector("#overview");
const temp = document.querySelector("#temp-value");
const icon = document.querySelector("#weather-icon")
const description = document.querySelector("#description");
const detailsSection = document.querySelector("#details");
const weatherDescription = document.querySelector("#weather-description");
const typeaheadList = document.querySelector("#typeahead ul");
const mainContent = document.querySelector("#main-content");
const warningText = document.querySelector("#warning-text");

// FOOTER ITEMS
const date = document.querySelector("#date");


/////////////////
////FUNCTIONS////
/////////////////

//CHROME VH UNITS FIX
chromeFix = new VHChromeFix({selector: "html", vh: 100})

// ADD ANIMATION
function animate(element, className, animationTime) {
    element.className = className;
    setTimeout(function () {
        element.className = "";
    }, animationTime)
}

// DATE FUNCTION
function getFormattedDate() {
    let date = new Date();
    stringedDate = {
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        dayOfTheWeek() {
            return this.days[date.getDay()];
        },
        monthName() {
            return this.months[date.getMonth()];
        },
    }
    return `<strong>${stringedDate.dayOfTheWeek()}</strong>, ${stringedDate.monthName()} ${date.getDate()}, ${date.getFullYear()}`
}

// GEOLOCATON API FUNCTION
function getLocation(callback) {
    function handleGeoErrors(error) {
        warningText.parentElement.classList = "";
        switch (error.code) {
            case error.PERMISSION_DENIED:
                warningText.innerHTML = "User denied the request for Geolocation";
                break;
            case error.POSITION_UNAVAILABLE:
                warningText.innerHTML = "Location information is unavailable";
                break;
            case error.TIMEOUT:
                warningText.innerHTML = "The request to get user location timed out";
                break;
            case error.UNKNOWN_ERROR:
                warningText.innerHTML = "An unknown error occurred";
                break;
        }
    };
    let coordinates = {};
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            coordinates.latitude = pos.coords.latitude;
            coordinates.longitude = pos.coords.longitude;
            warningText.parentElement.classList = "content-hidden";
            callback(coordinates, unitType);
        }, handleGeoErrors);
    } else {
        warningText.parentElement.classList = "";
        warningText.innerHTML = "Your browser doesn't support geolocation";
    }
}


// WEATHER API AJAX CALL
function ajax(coordinates, units) {
    let xhrWeather = new XMLHttpRequest();
    if (typeof coordinates == "object") {
        xhrWeather.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat=" + coordinates.latitude + "&lon=" + coordinates.longitude + "&units=" + units + "&appid=15be2987c14d02b7ae3ade0b84c5ce50", true);
    } else {
        xhrWeather.open("GET", "https://api.openweathermap.org/data/2.5/weather?id=" + coordinates + "&units=" + units + "&appid=15be2987c14d02b7ae3ade0b84c5ce50", true);
    }
    xhrWeather.addEventListener("loadend", function () {
        let weather = JSON.parse(this.response);
        warningText.parentElement.classList = "content-hidden"; //hidding geolocation api warning
        //injecting data to page
        city.innerHTML = weather.name;
        city.setAttribute("data-city-id", weather.id);
        temp.innerHTML = `${weather.main.temp}${(units=="metric")?"°C":"°F"}`;
        icon.setAttribute("src", `img\\weather\\${weather.weather[0].icon}.png`);
        description.innerHTML = weather.weather[0].main;
        console.log(weather.sys.sunrise);
        console.log(weather.sys.sunset);
        detailsSection.innerHTML = `<p>Right now temperature in <strong>${weather.name}</strong> should be around <strong>${weather.main.temp}${(units=="metric")?"°C":"°F"}</strong>${(weather.main.temp_min == weather.main.temp_max) ? "." : ", and may vary from <strong>"+weather.main.temp_min+((units=="metric")?"°C":"°F")+"</strong> to <strong>"+weather.main.temp_max+((units=="metric")?"°C</strong>.":"°F</strong>.")}</p><p>Cloudiness is about <strong>${weather.clouds.all}%</strong></p><p>Wind speed is <strong>${weather.wind.speed+((units=="metric")?" m/s":" mil/h")}</strong>.</p><p>Day lasts for <strong>${Math.floor((weather.sys.sunset-weather.sys.sunrise)/3600)} hours and ${Math.floor(((weather.sys.sunset-weather.sys.sunrise)%3600)/60)+1} minutes</strong>.</p>`;
        if (typeof map == "undefined") {
            initMap(weather.coord)
        } else {
            let uluru = {lat: weather.coord.lat, lng: weather.coord.lon};
            map.panTo(uluru)
        }            
        date.innerHTML = "Data updated!";
        animate(date, "bounceInDown", 200);
        setTimeout(function () {
            animate(date, "bounceOutUp", 200);
            date.innerHTML = getFormattedDate();
            animate(date, "bounceInDown", 200);
        }, 3000);
    });      
    xhrWeather.send();
}

// SWITCH CONTENT
function switchContent() {
    let direction, opposite;
    if (arguments[0] == "right") {
        direction = "Right";
        opposite = "Left";
    } else {
        direction = "Left";
        opposite = "Right";
    }

    if (!overviewSection.classList.contains("content-hidden")) {
        overviewSection.className = `bounceOut${opposite}`;
        setTimeout(function () {
            overviewSection.className = "content-hidden";
            detailsSection.className = `bounceIn${direction}`;
        }, 200);
    } else {
        detailsSection.className = `bounceOut${opposite}`;
        setTimeout(function () {
            detailsSection.className = "content-hidden";
            overviewSection.className = `bounceIn${direction}`;
        }, 200);
    }
};

function switchTitle() {
    navTitle.classList.toggle("switchIn");
    setTimeout(function () {
        navTitle.innerHTML == "Overview" ? navTitle.innerHTML = "Details" : navTitle.innerHTML = "Overview";
        navTitle.classList.toggle("switchIn");
    }, 200);
}


// TOGGLE SEARCH VIEW
function toggleSearch() {
    if (!city.classList.contains("content-hidden")) {
        city.classList.toggle("content-hidden");
        searchBar.parentElement.classList.toggle("content-hidden");
        searchBar.parentElement.classList.toggle("bounceInRight");
        pinButton.classList.toggle("content-hidden");
        typeaheadList.parentElement.className = "";
        setTimeout(function () {
            typeaheadList.parentElement.className = "typeahead-unfold";
        }, 200);

    } else {
        searchBar.parentElement.className = "bounceOutRight";
        setTimeout(function () {
            searchBar.parentElement.className = "content-hidden";
            pinButton.classList.toggle("content-hidden");
            city.classList.toggle("content-hidden");
            typeaheadList.parentElement.classList.toggle("typeahead-unfold");
            setTimeout(function () {
                typeaheadList.parentElement.className = "content-hidden";
            }, 200);
        }, 200)

    }
    searchBar.focus();
}


//LOAD CITY LIST FROM JSON
function loadCityList() {
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
function searchCity(searchBar) {
    let result = [];
    for (let i = 0; i < cityList.length; i++) {
        let regex = new RegExp("^" + searchBar, "gi")
        if ((regex.test(cityList[i].name)) && (result.length < 9)) {
            result.push(cityList[i]);
        };

    }
    typeaheadList.innerHTML = "";
    result.splice(9, result.length);

    result.forEach(el => {
        typeaheadList.innerHTML += `<li data-city-id="${el.id}">${el.name}, ${el.country}</li>`;
    });
    typeaheadList.querySelectorAll("li").forEach(element => {
        element.addEventListener("click", function () {
            ajax(this.getAttribute("data-city-id"), unitType);
            toggleSearch();
        })

    });
};

// INITIALIZE BACKGROUND MAP
function initMap(coord) {
    let uluru = {lat: coord.lat, lng: coord.lon};
    map = new google.maps.Map(bgMapContainer, {
      zoom: 11,
      center: uluru,
      disableDefaultUI: true,
      styles: [
        {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "stylers": [
                {
                    "hue": "#f82363"
                },
                {
                    "saturation": -70
                },
                {
                    "gamma": 4.15
                },
                {
                    "lightness": 2
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": 24
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": 57
                }
            ]
        }
    ]
    });

  };


//////////////
////EVENTS////
//////////////

//WEATHER SHOW 
getLocation(ajax);

//LOAD CITY LIST
loadCityList();

// REFRESH GEOLOCATION API
pinButton.addEventListener("click", function () {
    getLocation(ajax);
});

// SWITCH CONTENT
arrowRight.addEventListener("click", function () {
    switchContent("right");
    switchTitle();
});

arrowLeft.addEventListener("click", function () {
    switchContent("left");
    switchTitle();
});

//SWIPE GESTURES TO SWITCH CONTENT via HAMMER
var touchGesture = new Hammer(mainContent);
touchGesture.on("swipeleft", function() {
	switchContent("right");
    switchTitle();
});

touchGesture.on("swiperight", function() {
    switchContent("left");
    switchTitle();
})

// SWITCH UNITS
temp.addEventListener("click", function() {
    if (unitType == "metric") {
        unitType = "imperial";
    } else {
        unitType = "metric";
    }
    ajax(city.getAttribute("data-city-id"), unitType);
});

// SHOW SEARCH INPUT
searchButton.addEventListener("click", toggleSearch);

//SEARCH
var timeout;
searchBar.addEventListener("input", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        searchCity(searchBar.value);
    }, 600);
});


//SERVICE WORKER
if ("serviceWorker" in navigator) {
    try {
        navigator.serviceWorker.register("serviceWorker.js");
        console.log("serviceWorker registered");
    } catch (error) {
        console.log("serviceWorker not registered");
    }
}