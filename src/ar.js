const addModel = (position, parent) => {
    let latitude = position.lat
    let longitude = position.lng

    let model = document.createElement('a-entity')
    model.setAttribute('gps--entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    model.setAttribute('gltf-model', './assets/map_marker.glb')
    model.setAttribute('scale', '1 1 1')
    model.setAttribute('position', '0 -1.8 0')
    model.setAttribute('look-at', '[gps-camera]')
    model.setAttribute('animation', 'property: rotation; dur: 3000; to: 0 360 0; loop: true; easing: linear')
    model.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
    })
    if (parent) {
        parent.appendChild(model)
    }

    // let text = document.createElement('a-text')
    // text.setAttribute('value', 'OOO')
    // text.setAttribute('look-at', '[gps-camera]')
    // text.setAttribute('scale', '10 10 10')
    // text.setAttribute('position', '1 4 0')
    // model.append(text)
    return model
}

let scene = document.querySelector('a-scene')
addModel(destination, scene)
