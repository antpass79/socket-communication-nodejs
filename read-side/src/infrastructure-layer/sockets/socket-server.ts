import express from 'express';
import http from 'http';
import socketIo from 'socket.io';

export class SocketServer {

  private socketIo: any;
  private socket: any;
  private server: any;

  constructor(app: express.Application) {

    this.server = http.createServer(app);
    this.socketIo = socketIo(this.server);
  }

  get isReady() {
    return this.socket != undefined;
  }

  listen(serverSocketPort: string) {

    this.socketIo.on("connection", (socket: any) => {      
      console.log("New write-side connected to read-side");

      this.socket = socket;
      this.socket.on("disconnect", () => console.log("Write-side disconnected from read-side"));
    });

    this.server.listen(serverSocketPort, () => console.log(`Read-side listening on port ${serverSocketPort}`));
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