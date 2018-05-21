// IMPORTS
import * as helpers from "./helpers.js";
window.helpers = helpers;

import * as dataProcessing from "./data-processing.js";
window.dataProcessing = dataProcessing;

import * as googleMaps from "./google-maps.js";
window.googleMaps = googleMaps;

// ELEMENTS
const elements = {
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
const chromeFix = new VHChromeFix({selector: "html", vh: 100})

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
const touchGesture = new Hammer(elements.mainContent);
touchGesture.on("swipeleft", function() {
	helpers.switchContent("right");
    helpers.switchTitle();
});

touchGesture.on("swiperight", function() {
    helpers.switchContent("left");
    helpers.switchTitle();
});

// SWITCH UNITS
elements.temp.addEventListener("click", function() {
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
window.addEventListener("loadstart", function() {
    helpers.togglePreloader();
});
document.addEventListener("load", function() {
    helpers.togglePreloader();
});

//PWA - SERVICE WORKER
if (navigator.serviceWorker.controller) {
    console.log('[PWA Builder] active service worker found, no need to register')
} else {
    //register the ServiceWorker
    navigator.serviceWorker.register('serviceWorker.js', {
        scope: '/weather/'
    }).then(function (reg) {
        console.log('Service worker has been registered for scope: ' + reg.scope);
    });
};

//EXPORTS
export {elements, helpers, googleMaps, dataProcessing};