async function calculateDistance(currentPosition) {
    const { spherical } = await google.maps.importLibrary("geometry")
    const from = {
        lat: currentPosition.coords.latitude,
        lng: currentPosition.coords.longitude
    }
    return spherical.computeDistanceBetween(from, destination)
}

const round = (num) => Math.round(num * 100) / 100

const id = navigator.geolocation.watchPosition(
    async (position) => {
        let messageEl = document.getElementById("message")
        if (messageEl) {
            const distance = await calculateDistance(position)
            const arrow = document.getElementById('arrow')
            if (distance <= 5) {
                messageEl.innerHTML = '您已抵達目的地'
                arrow.setAttribute('visible', 'false')
            } else {
                messageEl.innerHTML = `距離目的地還有 ${round(distance)} 公尺`
                arrow.setAttribute('visible', 'true')
            }
            console.log(arrow)
        }
    },
    (error) => {
        console.error(error)
    },
    {
        enableHighAccuracy: true
    }
)
console.log(`distance.js: id = ${id}`)
