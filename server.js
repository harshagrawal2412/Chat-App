const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connect = require("./config/db");
const userRoute = require("./routes/user");
const messageRoute = require("./routes/message");
const chatRoute = require("./routes/chat");

dotenv.config();
connect();

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use("/api/chat", chatRoute);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

const onlineUsers = [];

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("userConnected", (username) => {
    onlineUsers.push({ username, id: socket.id });
    io.emit("onlineUsers", onlineUsers);
    socket.broadcast.emit("userConnected", username);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);
    socket.broadcast.emit("userDisconnected", socket.id);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("User not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      if (onlineUsers[user._id]) {
        socket
          .to(onlineUsers[user._id])
          .emit("message recieved", newMessageRecieved);
      }
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
