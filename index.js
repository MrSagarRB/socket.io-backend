const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  //when ceonnect
  socket.on("sendMsg", (data) => {
    console.log(data);
  });
});

app.get("/", (req, res) => {
  res.send("Server is Running ......");
});

server.listen(3001, () => {
  console.log("Server Started on port 3001");
});
