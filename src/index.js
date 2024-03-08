const app = require('./app')
const http = require('http')

const PORT = 3001

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})
