import http from 'http'
import express from "express";
import { Server } from "socket.io";
import * as dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 8080;

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res, next) => {
  res.json("OK")
})

io.on('connection', (socket) => {
  // socket.emit('connect', { message: 'a new client connected' })
  console.log("New Connection!", socket.id);
  socket.on('disconnect', () => {
    console.log("Disconnected", socket.id);
  })
})

server.listen(port, () => {
  console.log(`Server started at ${port}`);
})

