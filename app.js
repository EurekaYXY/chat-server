const express = require('express')
const expressWs = require('express-ws')
const app = express()
const port = process.env.PORT || 3001

expressWs(app)
let connects = []

app.use(express.static('public'))

app.get('/status', (req, res) => res.json({ status: 'ok' }))
app.get('/dump', (req, res) => res.json({ headers: req.rawHeaders }))

app.ws('/ws', (ws, req) => {
  connects.push(ws)

  ws.on('message', (message) => {
    console.log('Received:', message)

    connects.forEach((socket) => {
      if (socket.readyState === 1) {
        socket.send(message)
      }
    })
  })

  ws.on('close', () => {
    connects = connects.filter((conn) => conn !== ws)
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
