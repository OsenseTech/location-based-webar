let cameraMarker
window.addEventListener("gps-camera-update-position", async (event) => {
    if (map === undefined) {
        return;
    }
    const position = event.detail.position
    const pos = {
        lat: position.latitude,
        lng: position.longitude,
    }
    if (cameraMarker) {
        cameraMarker.setPosition(pos)
    } else {
        cameraMarker = addMarker(pos, "./assets/ic_my_location_dark.png", 2)
    }
    let messageEl = document.getElementById("arLocation")
    messageEl.innerHTML = `AR GPS: ${pos.lat}, ${pos.lng}`
})

let map
let userMarker
const positionOptions = { enableHighAccuracy: true }
const errorCallback = (error) => console.log(error)
function successCallback(position) {
    const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
    }
    if (userMarker) {
        userMarker.setPosition(pos)
    } else {
        userMarker = addMarker(pos, "./assets/ic_my_location.png", 10)
        map.setCenter(pos)
    }
    let messageEl = document.getElementById("gpsLocation")
    messageEl.innerHTML = `Browser GPS: ${pos.lat}, ${pos.lng}`
}

function addMarker(position, icon, zIndex = 1) {
    const markerOptions = {
        position: position,
        map: map,
        zIndex: zIndex,
        icon: icon
    }
    return new google.maps.Marker(markerOptions)
}

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const mapOptions = {
        zoom: 20,
        center: { lat: 25.033708, lng: 121.564899 },
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: false
    }
    map = new Map(document.getElementById('map'), mapOptions)
    const id = navigator.geolocation.watchPosition(successCallback, errorCallback, positionOptions)

    // add destination
    addMarker(destination, "./assets/ic_location.png")
}

initMap()