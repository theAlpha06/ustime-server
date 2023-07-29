import express from 'express';
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import msgRoutes from "./routes/messageRoutes.js";
connectDB();
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: "GET,POST,PUT,DELETE,OPTIONS",
//   })
// );
app.use(express.json());

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send("It's up and running!");
});

app.use("/auth", authRoutes);
app.use('/user', userRoutes);
app.use('/msg', msgRoutes);

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`.red);
});

// Socket setup

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://ustime-chat.onrender.com"],
    credentials: true,
  }
});

global.onlineUsers = new Map();
global.totalOnlineUsers = new Map();

function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue)
      return key;
  }
}


io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    totalOnlineUsers.set(userId, socket.id);
    io.emit("online-users", [...totalOnlineUsers.keys()]);
  });

  socket.on("offline", () => {
    totalOnlineUsers.delete(getByValue(totalOnlineUsers, `${socket.id}`));
    io.emit("online-users", totalOnlineUsers);
  })


  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data);
    }
  })

  socket.on("typing", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    console.log('first')
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("typing", data);
    }
  })

  socket.on("disconnect", () => {
    totalOnlineUsers.delete(getByValue(totalOnlineUsers, `${socket.id}`));
    io.emit("online-users", totalOnlineUsers);
  })
});
