import * as serverConnection from '../common/serverConnection'

export function onSystemStatusChange(callback) {
  serverConnection.on('system-status-changed', callback)
}

export function unregisterSystemStatusChange(callback) {
  serverConnection.off('system-status-changed', callback)
}