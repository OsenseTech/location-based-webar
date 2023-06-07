import data from './data.js';

const getPlaceModel = (place) => {
    let latitude = place.position.latitude
    let longitude = place.position.longitude

    let model = document.createElement('a-entity')
    model.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    model.setAttribute('gltf-model', './assets/magnemite/scene.gltf')
    model.setAttribute('animation-mixer', '')
    model.setAttribute('scale', '1 1 1')
    model.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
    })
    return model
}

const renderPlaces = (places) => {
    let scene = document.querySelector('a-scene')

    places.forEach((place) => {
        let model = getPlaceModel(place)
        scene.appendChild(model)
    })
}

renderPlaces(data.osense)