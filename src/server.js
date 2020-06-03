const http = require('http')
const { app } = require('./app')
require('./utils/db/mongoose')

const port = process.env.PORT || 5000
const server = http.createServer(app)

server.listen(port, () => console.log(`App listening on port ${port}`))
