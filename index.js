const express = require("express");
const app = express();
var http = require("https");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Server Is Started on Port 3001");
});

const io = new Server(server, {
  cors: {
    origin: "https://socket-io-front-end.vercel.app",
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
