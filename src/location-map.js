let map
var marker
const positionOptions = { enableHighAccuracy: true }

const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        if (map) {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }
            map.setCenter(pos)
        }
    }, errorCallback)
}

const createMarker = (position) => {
    const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
    }
    if (marker == undefined) {
        marker = new google.maps.Marker({
            position: pos,
            map: map,
            zIndex: 1
        })
    } else {
        marker.setPosition(pos)
    }
}

const successCallback = (position) => {
    // console
    console.log(position)

    // map
    createMarker(position)
}

const errorCallback = (error) => {
    console.log(error)
}

const createCenterControl = (map) => {
    const centerControlDiv = document.createElement("div")
    const controlButton = document.createElement("button")

    // Set CSS for the control.
    controlButton.style.backgroundColor = "#fff"
    controlButton.style.border = "none"
    controlButton.style.borderRadius = "3px"
    controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)"
    controlButton.style.color = "rgb(25,25,25)"
    controlButton.style.cursor = "pointer"
    controlButton.style.margin = "40px 20px"
    controlButton.style.padding = "0px 5px"
    controlButton.style.textAlign = "center"
    controlButton.style.backgroundImage = "url(assets/myLocation.png)"
    controlButton.style.backgroundSize = "20px 20px"
    controlButton.style.backgroundRepeat = "no-repeat"
    controlButton.style.backgroundPosition = '10px 10px'
    controlButton.style.width = "40px"
    controlButton.style.height = "40px"

    controlButton.type = "button"

    // Setup the click event listeners: simply set the map to Chicago.
    controlButton.addEventListener("click", getCurrentPosition)

    centerControlDiv.appendChild(controlButton)
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv)
}

function initMap() {
    const mapOptions = {
        zoom: 20,
        center: { lat: 25.033708, lng: 121.564899 },
        zoomControl: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: false
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions)
    const id = navigator.geolocation.watchPosition(successCallback, errorCallback, positionOptions)
    createCenterControl(map)
}