import { Feed } from "../../models/feed";

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

export class SocketServer {

  listen() {

    io.on("connection", (socket: any) => {
      console.log("New client connected"), setInterval(
        () => getApiAndEmit(socket),
        1000
      );
      socket.on("disconnect", () => console.log("Client disconnected"));
    });
    const getApiAndEmit = async (socket: any) => {
      try {
        let feed: Feed = {
          id: '',
          text: Math.random().toString()
        };
        socket.emit("feedArrived", feed);
      } catch (error) {
        console.error(`Error: ${error.code}`);
      }
    };
    server.listen(port, () => console.log(`Listening on port ${port}`));
  }
}