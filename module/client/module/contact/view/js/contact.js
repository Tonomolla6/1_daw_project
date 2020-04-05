var map;
var InforObj = [];
var centerCords = {
    lat: 38.820753,
    lng: -0.599474
};
var markersOnMap = [{
        placeName: "Neteco",
        LatLng: [{
            lat: 38.820753,
            lng: -0.599474
        }]
    }
];

window.onload = function () {
    initMap();
};

function addMarker() {
    for (var i = 0; i < markersOnMap.length; i++) {
        var contentString = '<div class="content_maps"><h1>' + markersOnMap[i].placeName +
            '</h1></div>';

        const marker = new google.maps.Marker({
            position: markersOnMap[i].LatLng[0],
            map: map
        });

        const infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
        });

        marker.addListener('click', function () {
            closeOtherInfo();
            infowindow.open(marker.get('map'), marker);
            InforObj[0] = infowindow;
        });
    }
}

function closeOtherInfo() {
    if (InforObj.length > 0) {
        /* detach the info-window from the marker ... undocumented in the API docs */
        InforObj[0].set("marker", null);
        /* and close it */
        InforObj[0].close();
        /* blank the array */
        InforObj.length = 0;
    }
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: centerCords
    });
    addMarker();
}
