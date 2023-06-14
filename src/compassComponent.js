AFRAME.registerComponent('compass', {
    init: function () {
        console.log('init')
        const doty = this.el
        const compassEl = document.querySelector('.compass')
        // const myPoint = document.querySelector('.my-point')
        const isIOS =
            navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
            navigator.userAgent.match(/AppleWebKit/)
        let pointDegree
        let compass
        let rotation

        // async function calculateHeading(pos) {
        //     const { spherical } = await google.maps.importLibrary("geometry")
        //     const dest = {
        //         lat: 25.04162733656967,
        //         lng: 121.55592802538551
        //     }
        //     return spherical.computeHeading(pos, dest)
        // }

        function handler(e) {
            compass = e.webkitCompassHeading || Math.abs(e.alpha - 360)
            // compassEl.style.transform = `rotate(${-compass}deg)`
            // rotate doty 180 degrees to face heading
            // console.log(`compass: ${compass}`)
            const angle = pointDegree - compass
            rotation = (angle + 180 + 90) * -1
            // rotation = (-angle + 180 + 90) * -1
            doty.setAttribute('rotation', `0  ${rotation} 0`)
        }

        function startCompass() {
            if (isIOS) {
                DeviceOrientationEvent.requestPermission()
                    .then((response) => {
                        if (response === 'granted') {
                            window.addEventListener('deviceorientation', handler, true)
                        } else {
                            alert('has to be allowed!')
                        }
                    })
                    .catch(() => alert('not supported'))
            }
        }

        function calcDegreeToPoint(latitude, longitude) {
            // Qibla geolocation
            // const point = {
            //     lat: 21.422487,
            //     lng: 39.826206,
            // }
            const phiK = (destination.lat * Math.PI) / 180.0
            const lambdaK = (destination.lng * Math.PI) / 180.0
            const phi = (latitude * Math.PI) / 180.0
            const lambda = (longitude * Math.PI) / 180.0
            const psi =
                (180.0 / Math.PI) *
                Math.atan2(
                    Math.sin(lambdaK - lambda),
                    Math.cos(phi) * Math.tan(phiK) -
                    Math.sin(phi) * Math.cos(lambdaK - lambda)
                )
            return Math.round(psi)
        }

        function locationHandler(position) {
            const { latitude, longitude } = position.coords
            pointDegree = calcDegreeToPoint(latitude, longitude)
            if (pointDegree < 0) {
                pointDegree += 360
            }
            console.log(`pointDegree: ${pointDegree}`)
        }

        function start() {
            navigator.geolocation.watchPosition(locationHandler, null, { enableHighAccuracy: true })
            if (isIOS) {
                startCompass()
            } else if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
                window.addEventListener('deviceorientationabsolute', handler, true)
            } else {
                document.querySelector('.compass').style.display = 'none'
                console.log('This device does not support compass')
            }
        }
        start()
    }
})