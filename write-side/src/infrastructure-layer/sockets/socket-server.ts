import { Feed } from "../../models/feed";

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4002;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

export class SocketServer {

  private socket: any;

  listen() {

    io.on("connection", (socket: any) => {
      this.socket = socket;
      console.log("New read-side connected");
      socket.on("disconnect", () => console.log("Read-side disconnected"));
    });

    server.listen(port, () => console.log(`Listening on port ${port}`));
  }

  addFeed(feed: Feed) {
    setTimeout(
      () => this.dispatchFeed(feed));
  }

  private dispatchFeed(feed: Feed) {

    try {
      if (this.socket)
        this.socket.emit("feedAdded", feed);
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
  }
}