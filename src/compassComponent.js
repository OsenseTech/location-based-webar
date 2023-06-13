// import { compassComponent } from './compass.js'
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

        function handler(e) {
            compass = e.webkitCompassHeading || Math.abs(e.alpha - 360)
            // compassEl.style.transform = `rotate(${-compass}deg)`
            // rotate doty 180 degrees to face heading
            rotation = (-compass + 180 + 90) * -1
            doty.setAttribute('rotation', `0  ${rotation} 0`)
            console.log(`rotation: ${rotation}`)
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
            const point = {
                lat: 21.422487,
                lng: 39.826206,
            }
            const phiK = (point.lat * Math.PI) / 180.0
            const lambdaK = (point.lng * Math.PI) / 180.0
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
        }

        function start() {
            navigator.geolocation.getCurrentPosition(locationHandler)
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
// console.log(compassComponent)