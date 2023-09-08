import data from './data.js';

const getPlaceModel = (place) => {
    let latitude = place.position.latitude
    let longitude = place.position.longitude

    let model = document.createElement('a-entity')
    model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    model.setAttribute('gltf-model', place.type === 'destination' ? './assets/map_marker.glb': './assets/arrow.glb')
    model.setAttribute('scale', '1 1 1')
    model.setAttribute('id', place.type)
    model.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
    })
    return model
}

const renderPlaces = (places) => {
    let scene = document.querySelector('a-scene')

    places.forEach((place) => {
        place.markers.forEach((marker) => {
            let model = getPlaceModel(marker)
            scene.appendChild(model)
        })
    })
}

renderPlaces(data.chinChin)