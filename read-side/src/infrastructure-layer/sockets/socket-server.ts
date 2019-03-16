import { Feed } from "../../models/feed";

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

export class SocketServer {

  private socket: any;

  listen() {

    io.on("connection", (socket: any) => {
      console.log("New write-side connected");
      this.socket = socket;
      socket.on("disconnect", () => console.log("Write-side disconnected"));
    });

    server.listen(port, () => console.log(`Listening on port ${port}`));
  }

  dispatchData<T>(data: T, eventName: string) {
    try {
      console.log(this.socket);

      if (this.socket)
        this.socket.emit(eventName, data);
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
  }
}