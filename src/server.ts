
import {Server} from 'socket.io';
import Connection from './game/connection';

const io = new Server({/* options */});


let connections: Connection[] = [];

export const start = (port: number) => {
  io.on('connection', (socket) => {
    connections.push(new Connection(socket));
  });

  io.listen(port);
  console.log(`Server started on port ${port}`);
};
