import * as socketIo from 'socket.io'

import getSystemStatus from './commands/getSystemStatus'

const PORT = 9090
const io = socketIo()

io.on('connection', async client => {
  client.emit('system-status-changed', await getSystemStatus())
  setInterval(async () => client.emit('system-status-changed', await getSystemStatus()), 2000)
})

io.listen(PORT)
console.log(`listening on port ${PORT}`)
