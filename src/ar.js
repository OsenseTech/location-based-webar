const addModel = (position, parent) => {
    let latitude = position.lat
    let longitude = position.lng

    let model = document.createElement('a-entity')
    model.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    model.setAttribute('gltf-model', './assets/map_marker.glb')
    model.setAttribute('scale', '1 1 1')
    model.setAttribute('position', '0 -2.5 0')
    model.setAttribute('look-at', '[gps-new-camera]')
    model.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
    })
    if (parent) {
        parent.appendChild(model)
    }

    // let text = document.createElement('a-text')
    // text.setAttribute('value', 'OOO')
    // text.setAttribute('look-at', '[gps-new-camera]')
    // text.setAttribute('scale', '10 10 10')
    // text.setAttribute('position', '1 4 0')
    // model.append(text)
    return model
}

let scene = document.querySelector('a-scene')
addModel(destination, scene)
