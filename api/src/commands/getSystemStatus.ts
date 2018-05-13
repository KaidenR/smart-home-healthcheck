export enum STATUS {
  OK = 'OK',
  UNKNOWN = 'UNKNOWN',
  DOWN = 'DOWN',
  UPDATING = 'UPDATING'
}

function getRandomStatus() : STATUS {
  const keys = Object.keys(STATUS)
  const index = Math.floor(Math.random() * keys.length)

  return STATUS[<STATUS>keys[index]]
}

export default async function getSystemStatus() {
  return {
    devices: [
      { name: 'Nest Devices', status: getRandomStatus() },
      { name: 'TV Lights Pi', status: getRandomStatus() },
      { name: 'Monitor Backlight Pi', status: getRandomStatus() },
      { name: 'WeMo Devices', status: getRandomStatus() }
    ]
  }
}