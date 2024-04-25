const app = require('./app')
const http = require('http')
const {
  createRoles,
  createAdminUser,
  createModUser,
} = require('./mongo/setUpRoles')

const PORT = 3001

const server = http.createServer(app)

createRoles()
createAdminUser()
createModUser()

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})
