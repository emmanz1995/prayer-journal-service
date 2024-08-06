import  app from './app';
import http from 'http';
import {
  createRoles,
  createAdminUser,
  createModUser,
} from './mongo/setUpRoles';

const PORT = 3001

const server = http.createServer(app)

createRoles()
createAdminUser()
createModUser()

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})
