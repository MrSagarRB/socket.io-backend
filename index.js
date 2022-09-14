const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Server Is Started on Port 3001");
});

const io = new Server(server, {
  cors: {
    origin: "http://192.168.1.50:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("send_msg", (data) => {
    socket.broadcast.emit("receive_msg", data);
    console.log(data);
  });

  //   console.log(`User Connected:${socket.id}`);
  //   console.log(socket);
});

server.listen(3001, () => {
  console.log("Server Started on port 3001");
});
