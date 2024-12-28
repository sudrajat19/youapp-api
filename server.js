import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import sequelize from "./utils/db.js";
import routes from "./routes/index.js";
import { saveChatMessage } from "./controller/messageController.js";

const port = 3010;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static("public"));

// Menggunakan rute utama
app.use(routes);

// Socket.IO Logic
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", async (msg) => {
    console.log("Message received:", msg);
    await saveChatMessage(msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Menghubungkan ke database dan memulai server
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
