export default class Server {
  constructor(app) {
    this.app = app
  }

  start(port) {
    this.app.listen(port, () => {
      console.clear()
      console.log(`Listening on http://localhost:${port}`)
    })
  }
}
