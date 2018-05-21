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

/***/ "./data-processing.js":
/*!****************************!*\
  !*** ./data-processing.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchCity = exports.loadCityList = exports.toggleSearch = exports.ajax = exports.getLocation = exports.cityList = exports.unitType = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(/*! ./script.js */ "./script.js");

var unitType = exports.unitType = "metric";
var cityList = exports.cityList = void 0;

// GEOLOCATON API FUNCTION
var getLocation = exports.getLocation = function getLocation(callback) {
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
    var coordinates = {};
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
var ajax = exports.ajax = function ajax(coordinates, units) {
    helpers.togglePreloader();
    var xhrWeather = new XMLHttpRequest();
    if ((typeof coordinates === "undefined" ? "undefined" : _typeof(coordinates)) == "object") {
        xhrWeather.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat=" + coordinates.latitude + "&lon=" + coordinates.longitude + "&units=" + units + "&appid=15be2987c14d02b7ae3ade0b84c5ce50", true);
    } else {
        xhrWeather.open("GET", "https://api.openweathermap.org/data/2.5/weather?id=" + coordinates + "&units=" + units + "&appid=15be2987c14d02b7ae3ade0b84c5ce50", true);
    }
    xhrWeather.addEventListener("loadend", function () {
        var weather = JSON.parse(this.response);
        elements.warningText.parentElement.classList = "content-hidden"; //hidding geolocation api warning
        //injecting data to page
        elements.city.innerHTML = weather.name;
        elements.city.setAttribute("data-city-id", weather.id);
        elements.temp.innerHTML = "" + weather.main.temp + (units == "metric" ? "°C" : "°F");
        elements.icon.setAttribute("src", "img\\weather\\" + weather.weather[0].icon + ".png");
        elements.description.innerHTML = weather.weather[0].main;
        elements.detailsSection.innerHTML = "<p>Right now temperature in <strong>" + weather.name + "</strong> should be around <strong>" + weather.main.temp + (units == "metric" ? "°C" : "°F") + "</strong>" + (weather.main.temp_min == weather.main.temp_max ? "." : ", and may vary from <strong>" + weather.main.temp_min + (units == "metric" ? "°C" : "°F") + "</strong> to <strong>" + weather.main.temp_max + (units == "metric" ? "°C</strong>." : "°F</strong>.")) + "</p><p>Cloudiness is about <strong>" + weather.clouds.all + "%</strong></p><p>Wind speed is <strong>" + (weather.wind.speed + (units == "metric" ? " m/s" : " mil/h")) + "</strong>.</p><p>Day lasts for <strong>" + Math.floor((weather.sys.sunset - weather.sys.sunrise) / 3600) + " hours and " + (Math.floor((weather.sys.sunset - weather.sys.sunrise) % 3600 / 60) + 1) + " minutes</strong>.</p>";
        if (typeof map == "undefined") {
            googleMaps.initMap(weather.coord);
        } else {
            var uluru = { lat: weather.coord.lat, lng: weather.coord.lon };
            map.panTo(uluru);
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
var toggleSearch = exports.toggleSearch = function toggleSearch() {
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
        }, 200);
    }
    elements.searchBar.focus();
};

//LOAD CITY LIST FROM JSON
var loadCityList = exports.loadCityList = function loadCityList() {
    var xhrList = new XMLHttpRequest();
    xhrList.overrideMimeType("application/json");
    xhrList.open("GET", "city.json", true);
    xhrList.addEventListener("loadend", function () {
        exports.cityList = cityList = JSON.parse(xhrList.response);
        cityList.forEach(function (el) {
            delete el.coord;
        });
    });
    xhrList.send();
};

// CITY SEARCH IN CITY LIST AND TRIGGER AJAX CALL
var searchCity = exports.searchCity = function searchCity(searchBar) {
    var result = [];
    for (var i = 0; i < dataProcessing.cityList.length; i++) {
        var regex = new RegExp("^" + searchBar, "gi");
        if (regex.test(dataProcessing.cityList[i].name) && result.length < 9) {
            result.push(dataProcessing.cityList[i]);
        };
    }
    elements.typeaheadList.innerHTML = "";
    result.splice(9, result.length);

    result.forEach(function (el) {
        elements.typeaheadList.innerHTML += "<li data-city-id=\"" + el.id + "\">" + el.name + ", " + el.country + "</li>";
    });
    elements.typeaheadList.querySelectorAll("li").forEach(function (element) {
        element.addEventListener("click", function () {
            dataProcessing.ajax(this.getAttribute("data-city-id"), dataProcessing.unitType);
            dataProcessing.toggleSearch();
        });
    });
};

/***/ }),

/***/ "./google-maps.js":
/*!************************!*\
  !*** ./google-maps.js ***!
  \************************/
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
exports.switchTitle = exports.animate = exports.togglePreloader = exports.getFormattedDate = undefined;
exports.switchContent = switchContent;

__webpack_require__(/*! ./script.js */ "./script.js");

// DATE FUNCTION
var getFormattedDate = exports.getFormattedDate = function getFormattedDate() {
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
};

//TOGGLE PRELOADER
var togglePreloader = exports.togglePreloader = function togglePreloader() {
    if (elements.preloaderContainer.classList != "") {
        elements.preloaderContainer.classList = "";
    } else {
        elements.preloaderContainer.classList = "content-hidden";
    }
};

// ADD ANIMATION
var animate = exports.animate = function animate(element, className, animationTime) {
    element.className = className;
    setTimeout(function () {
        element.className = "";
    }, animationTime);
};

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

    if (!elements.overviewSection.classList.contains("content-hidden")) {
        elements.overviewSection.className = "bounceOut" + opposite;
        setTimeout(function () {
            elements.overviewSection.className = "content-hidden";
            elements.detailsSection.className = "bounceIn" + direction;
        }, 200);
    } else {
        elements.detailsSection.className = "bounceOut" + opposite;
        setTimeout(function () {
            elements.detailsSection.className = "content-hidden";
            elements.overviewSection.className = "bounceIn" + direction;
        }, 200);
    }
};
var switchTitle = exports.switchTitle = function switchTitle() {
    elements.navTitle.classList.toggle("switchIn");
    setTimeout(function () {
        elements.navTitle.innerHTML == "Overview" ? elements.navTitle.innerHTML = "Details" : elements.navTitle.innerHTML = "Overview";
        elements.navTitle.classList.toggle("switchIn");
    }, 200);
};

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dataProcessing = exports.googleMaps = exports.helpers = exports.elements = undefined;

var _helpers = __webpack_require__(/*! ./helpers.js */ "./helpers.js");

var helpers = _interopRequireWildcard(_helpers);

var _dataProcessing = __webpack_require__(/*! ./data-processing.js */ "./data-processing.js");

var dataProcessing = _interopRequireWildcard(_dataProcessing);

var _googleMaps = __webpack_require__(/*! ./google-maps.js */ "./google-maps.js");

var googleMaps = _interopRequireWildcard(_googleMaps);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

window.helpers = helpers; // IMPORTS

window.dataProcessing = dataProcessing;

window.googleMaps = googleMaps;

// ELEMENTS
var elements = {
    // PRELOADER
    preloaderContainer: document.querySelector("#preloader"),
    // HEADER ITEMS
    pinButton: document.querySelector("#pin-button"),
    searchButton: document.querySelector("#search-button"),
    searchBar: document.querySelector("#city-search"),
    city: document.querySelector("#city"),
    // NAV ITEMS
    navTitle: document.querySelector("#nav-title"),
    arrowRight: document.querySelector("#button-right"),
    arrowLeft: document.querySelector("#button-left"),
    // CONTENT ITEMS
    overviewSection: document.querySelector("#overview"),
    temp: document.querySelector("#temp-value"),
    icon: document.querySelector("#weather-icon"),
    description: document.querySelector("#description"),
    detailsSection: document.querySelector("#details"),
    weatherDescription: document.querySelector("#weather-description"),
    typeaheadList: document.querySelector("#typeahead ul"),
    mainContent: document.querySelector("#main-content"),
    warningText: document.querySelector("#warning-text"),
    // FOOTER ITEMS
    date: document.querySelector("#date")
};
window.elements = elements;

//CHROME VH UNITS FIX
var chromeFix = new VHChromeFix({ selector: "html", vh: 100 });

//////////////
////EVENTS////
//////////////

//WEATHER SHOW 
dataProcessing.getLocation(dataProcessing.ajax);

//LOAD CITY LIST
dataProcessing.loadCityList();

// REFRESH GEOLOCATION API
elements.pinButton.addEventListener("click", function () {
    dataProcessing.getLocation(dataProcessing.ajax);
});

// SWITCH CONTENT
elements.arrowRight.addEventListener("click", function () {
    helpers.switchContent("right");
    helpers.switchTitle();
});

elements.arrowLeft.addEventListener("click", function () {
    helpers.switchContent("left");
    helpers.switchTitle();
});

//SWIPE GESTURES TO SWITCH CONTENT via HAMMER
var touchGesture = new Hammer(elements.mainContent);
touchGesture.on("swipeleft", function () {
    helpers.switchContent("right");
    helpers.switchTitle();
});

touchGesture.on("swiperight", function () {
    helpers.switchContent("left");
    helpers.switchTitle();
});

// SWITCH UNITS
elements.temp.addEventListener("click", function () {
    if (dataProcessing.unitType == "metric") {
        dataProcessing.unitType = "imperial";
    } else {
        dataProcessing.unitType = "metric";
    }
    dataProcessing.ajax(city.getAttribute("data-city-id"), dataProcessing.unitType);
});

// SHOW SEARCH INPUT
elements.searchButton.addEventListener("click", dataProcessing.toggleSearch);

//SEARCH
var timeout;
elements.searchBar.addEventListener("input", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        dataProcessing.searchCity(elements.searchBar.value);
    }, 600);
});

//PRELOADER
window.addEventListener("loadstart", function () {
    helpers.togglePreloader();
});
document.addEventListener("load", function () {
    helpers.togglePreloader();
});

//PWA - SERVICE WORKER
if (navigator.serviceWorker.controller) {
    console.log('[PWA Builder] active service worker found, no need to register');
} else {
    //register the ServiceWorker
    navigator.serviceWorker.register('serviceWorker.js', {
        scope: '/weather/'
    }).then(function (reg) {
        console.log('Service worker has been registered for scope: ' + reg.scope);
    });
};

//EXPORTS
exports.elements = elements;
exports.helpers = helpers;
exports.googleMaps = googleMaps;
exports.dataProcessing = dataProcessing;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map