import Smoothieboard from './Smoothieboard'

var SmoothieboardMw = (server) => {
    let smoothie = new Smoothieboard({
        server : server,
        portDevice : '/dev/ttyACM0'
    })

    return (request, response, next) => {
        request.smoothie = smoothie
        next()
    }
}

export default SmoothieboardMw