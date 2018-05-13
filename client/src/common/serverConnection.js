import openSocket from 'socket.io-client'

const SERVER_URL = 'http://localhost:9090'
let socket

export function on(event, callback) {
  if (!socket)
    socket = openSocket(SERVER_URL)

  socket.on(event, callback)
}

export function off(event, callback) {
  socket.off(event, callback)
  if (!socket.hasListeners()) {
    socket.close()
    socket = null
  }
}