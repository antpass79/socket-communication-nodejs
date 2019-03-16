const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

export class SocketServer {

  private socket: any;

  get isReady() {
    return this.socket != undefined;
  }

  listen(serverSocketPort: string) {

    io.on("connection", (socket: any) => {
      console.log("New write-side connected");
      this.socket = socket;
      socket.on("disconnect", () => console.log("Write-side disconnected"));
    });

    server.listen(serverSocketPort, () => console.log(`Listening on port ${serverSocketPort}`));
  }

  dispatchData<T>(data: T, eventName: string) {
    try {
      console.log(this.socket);

      if (this.isReady)
        this.socket.emit(eventName, data);
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
  }
}