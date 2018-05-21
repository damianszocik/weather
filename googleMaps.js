const bgMapContainer = document.querySelector("#bg-map-container");
let map;
export function initMap(coord) {
    let uluru = {
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
            },
            {
                "featureType": "transit",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
                    "lightness": 57
                }]
            }
        ]
    });
};