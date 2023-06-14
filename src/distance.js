async function calculateDistance(currentPosition) {
    const { spherical } = await google.maps.importLibrary("geometry")
    const from = {
        lat: currentPosition.coords.latitude,
        lng: currentPosition.coords.longitude
    }
    const to = {
        lat: 25.04149805894291, 
        lng: 121.5583795762399
    }
    return spherical.computeDistanceBetween(from, to)
}

const round = (num) => Math.round(num * 100) / 100

const id = navigator.geolocation.watchPosition(
    async (position) => {
        let messageEl = document.getElementById("message")
        if (messageEl) {
            const distance = await calculateDistance(position)
            messageEl.innerHTML = `距離目的地還有 ${round(distance)} 公尺`
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
