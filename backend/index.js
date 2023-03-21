import Server from './src/config/server.js'
import App from './src/config/app.js'

const { app } = new App()
const port = 3001

const server = new Server(app)
server.start(port)
