import http from 'http'
import express from "express";
import { Server } from "socket.io";
import * as dotenv from 'dotenv'
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

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

  socket.on('chat message', (msg) => {
    const messageJson = msg;
    console.log('message: ' + msg.text);

    const replyMessage = createMessage("replied")

    // TODO: Change to broadcast
    socket.emit('message-receive', replyMessage)
  })
})

const createMessage = (text) => {
  const message = {
    author: "ABC",
    createdAt: moment().milliseconds,
    id: uuidv4(),
    text: text,
  }

  return message
}

server.listen(port, () => {
  console.log(`Server started at ${port}`);
})

