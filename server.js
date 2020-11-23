const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// mongoose.connect("mongodb://127.0.0.1/ChatSales", {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });

// const Chat = mongoose.model("Chat", {
//   id: String,
//   messages: String,
//   user: String,
// });

app.use("/", (req, res) => {
  res.render("index.html");
});

io.on("connection", (socket) => {
  // const { userId } = socket.handshake.query;
  // Chat.find().then((data) => {
  //   socket.emit("previousMessages", data);
  // });

  socket.on("send", (data) => {
    // const ChatMessage = new Chat({
    //   id: socket.id,
    //   messages: data.message,
    //   user: userId,
    // });

    // ChatMessage.save().then(() => console.log("Saving"));
    console.log(data);
    console.log(`Socket conectado: ${socket.id}`);

    socket.broadcast.to(socket.id).emit("received", data);
  });
});

server.listen(3333);
