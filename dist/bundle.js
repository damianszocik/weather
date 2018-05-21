/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./googleMaps.js":
/*!***********************!*\
  !*** ./googleMaps.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initMap = initMap;
var bgMapContainer = document.querySelector("#bg-map-container");
var map = void 0;
function initMap(coord) {
    var uluru = {
        lat: coord.lat,
        lng: coord.lon
    };
    map = new google.maps.Map(bgMapContainer, {
        zoom: 11,
        center: uluru,
        disableDefaultUI: true,
        styles: [{
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "stylers": [{
                "hue": "#f82363"
            }, {
                "saturation": -70
            }, {
                "gamma": 4.15
            }, {
                "lightness": 2
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "lightness": 24
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "lightness": 57
            }]
        }]
    });
};

/***/ }),

/***/ "./helpers.js":
/*!********************!*\
  !*** ./helpers.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFormattedDate = getFormattedDate;
function getFormattedDate() {
    var date = new Date();
    var stringedDate = {
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        dayOfTheWeek: function dayOfTheWeek() {
            return this.days[date.getDay()];
        },
        monthName: function monthName() {
            return this.months[date.getMonth()];
        }
    };
    return "<strong>" + stringedDate.dayOfTheWeek() + "</strong>, " + stringedDate.monthName() + " " + date.getDate() + ", " + date.getFullYear();
}

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _helpers = __webpack_require__(/*! ./helpers.js */ "./helpers.js");

var helpers = _interopRequireWildcard(_helpers);

var _googleMaps = __webpack_require__(/*! ./googleMaps.js */ "./googleMaps.js");

var googleMaps = _interopRequireWildcard(_googleMaps);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var unitType = "metric";
var map;
var cityList;
var val;
var chromeFix; //chrome fix library var

// PRELOADER
var preloaderContainer = document.querySelector("#preloader");

// HEADER ITEMS
var pinButton = document.querySelector("#pin-button");
var searchButton = document.querySelector("#search-button");
var searchBar = document.querySelector("#city-search");
var city = document.querySelector("#city");

// NAV ITEMS
var navTitle = document.querySelector("#nav-title");
var arrowRight = document.querySelector("#button-right");
var arrowLeft = document.querySelector("#button-left");

// CONTENT ITEMS
var overviewSection = document.querySelector("#overview");
var temp = document.querySelector("#temp-value");
var icon = document.querySelector("#weather-icon");
var description = document.querySelector("#description");
var detailsSection = document.querySelector("#details");
var weatherDescription = document.querySelector("#weather-description");
var typeaheadList = document.querySelector("#typeahead ul");
var mainContent = document.querySelector("#main-content");
var warningText = document.querySelector("#warning-text");

// FOOTER ITEMS
var date = document.querySelector("#date");

/////////////////
////FUNCTIONS////
/////////////////

//CHROME VH UNITS FIX
chromeFix = new VHChromeFix({ selector: "html", vh: 100 });

// ADD ANIMATION
function animate(element, className, animationTime) {
    element.className = className;
    setTimeout(function () {
        element.className = "";
    }, animationTime);
}

//TOGGLE PRELOADER
function togglePreloader() {
    if (preloaderContainer.classList != "") {
        preloaderContainer.classList = "";
    } else {
        preloaderContainer.classList = "content-hidden";
    }
}

// DATE FUNCTION


// GEOLOCATON API FUNCTION
function getLocation(callback) {
    function handleGeoErrors(error) {
        togglePreloader();
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
    var coordinates = {};
    if (navigator.geolocation) {
        togglePreloader();
        navigator.geolocation.getCurrentPosition(function (pos) {
            coordinates.latitude = pos.coords.latitude;
            coordinates.longitude = pos.coords.longitude;
            togglePreloader();
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
    togglePreloader();
    var xhrWeather = new XMLHttpRequest();
    if ((typeof coordinates === "undefined" ? "undefined" : _typeof(coordinates)) == "object") {
        xhrWeather.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat=" + coordinates.latitude + "&lon=" + coordinates.longitude + "&units=" + units + "&appid=15be2987c14d02b7ae3ade0b84c5ce50", true);
    } else {
        xhrWeather.open("GET", "https://api.openweathermap.org/data/2.5/weather?id=" + coordinates + "&units=" + units + "&appid=15be2987c14d02b7ae3ade0b84c5ce50", true);
    }
    xhrWeather.addEventListener("loadend", function () {
        var weather = JSON.parse(this.response);
        warningText.parentElement.classList = "content-hidden"; //hidding geolocation api warning
        //injecting data to page
        city.innerHTML = weather.name;
        city.setAttribute("data-city-id", weather.id);
        temp.innerHTML = "" + weather.main.temp + (units == "metric" ? "°C" : "°F");
        icon.setAttribute("src", "img\\weather\\" + weather.weather[0].icon + ".png");
        description.innerHTML = weather.weather[0].main;
        detailsSection.innerHTML = "<p>Right now temperature in <strong>" + weather.name + "</strong> should be around <strong>" + weather.main.temp + (units == "metric" ? "°C" : "°F") + "</strong>" + (weather.main.temp_min == weather.main.temp_max ? "." : ", and may vary from <strong>" + weather.main.temp_min + (units == "metric" ? "°C" : "°F") + "</strong> to <strong>" + weather.main.temp_max + (units == "metric" ? "°C</strong>." : "°F</strong>.")) + "</p><p>Cloudiness is about <strong>" + weather.clouds.all + "%</strong></p><p>Wind speed is <strong>" + (weather.wind.speed + (units == "metric" ? " m/s" : " mil/h")) + "</strong>.</p><p>Day lasts for <strong>" + Math.floor((weather.sys.sunset - weather.sys.sunrise) / 3600) + " hours and " + (Math.floor((weather.sys.sunset - weather.sys.sunrise) % 3600 / 60) + 1) + " minutes</strong>.</p>";
        if (typeof map == "undefined") {
            googleMaps.initMap(weather.coord);
        } else {
            var uluru = { lat: weather.coord.lat, lng: weather.coord.lon };
            map.panTo(uluru);
        }
        togglePreloader();
        date.innerHTML = "Data updated!";
        animate(date, "bounceInDown", 200);
        setTimeout(function () {
            animate(date, "bounceOutUp", 200);
            date.innerHTML = helpers.getFormattedDate();
            animate(date, "bounceInDown", 200);
        }, 3000);
    });
    xhrWeather.send();
}

// SWITCH CONTENT
function switchContent() {
    var direction = void 0,
        opposite = void 0;
    if (arguments[0] == "right") {
        direction = "Right";
        opposite = "Left";
    } else {
        direction = "Left";
        opposite = "Right";
    }

    if (!overviewSection.classList.contains("content-hidden")) {
        overviewSection.className = "bounceOut" + opposite;
        setTimeout(function () {
            overviewSection.className = "content-hidden";
            detailsSection.className = "bounceIn" + direction;
        }, 200);
    } else {
        detailsSection.className = "bounceOut" + opposite;
        setTimeout(function () {
            detailsSection.className = "content-hidden";
            overviewSection.className = "bounceIn" + direction;
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
        }, 200);
    }
    searchBar.focus();
}

//LOAD CITY LIST FROM JSON
function loadCityList() {
    var xhrList = new XMLHttpRequest();
    xhrList.overrideMimeType("application/json");
    xhrList.open("GET", "city.json", true);
    xhrList.addEventListener("loadend", function () {
        cityList = JSON.parse(xhrList.response);
        cityList.forEach(function (el) {
            delete el.coord;
        });
    });
    xhrList.send();
};

// CITY SEARCH IN CITY LIST AND TRIGGER AJAX CALL
function searchCity(searchBar) {
    var result = [];
    for (var i = 0; i < cityList.length; i++) {
        var regex = new RegExp("^" + searchBar, "gi");
        if (regex.test(cityList[i].name) && result.length < 9) {
            result.push(cityList[i]);
        };
    }
    typeaheadList.innerHTML = "";
    result.splice(9, result.length);

    result.forEach(function (el) {
        typeaheadList.innerHTML += "<li data-city-id=\"" + el.id + "\">" + el.name + ", " + el.country + "</li>";
    });
    typeaheadList.querySelectorAll("li").forEach(function (element) {
        element.addEventListener("click", function () {
            ajax(this.getAttribute("data-city-id"), unitType);
            toggleSearch();
        });
    });
};

// INITIALIZE BACKGROUND MAP


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
touchGesture.on("swipeleft", function () {
    switchContent("right");
    switchTitle();
});

touchGesture.on("swiperight", function () {
    switchContent("left");
    switchTitle();
});

// SWITCH UNITS
temp.addEventListener("click", function () {
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

if (navigator.serviceWorker.controller) {
    console.log('[PWA Builder] active service worker found, no need to register');
} else {
    //Register the ServiceWorker
    navigator.serviceWorker.register('serviceWorker.js', {
        scope: '/weather/'
    }).then(function (reg) {
        console.log('Service worker has been registered for scope: ' + reg.scope);
    });
}

//PRELOADER

window.addEventListener("loadstart", function () {
    togglePreloader();
});

document.addEventListener("load", function () {
    togglePreloader();
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map