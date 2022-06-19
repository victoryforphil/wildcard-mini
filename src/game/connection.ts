import {Socket} from 'socket.io';
import {joinGame, PersonalGameState} from './game';

export interface SocketMessage {
  type: string;
  data: any;
  game_id: string;
  player_id?: string;
}

export default class Connection {
  socket: Socket;
  constructor(socket: Socket) {
    this.socket = socket;
    socket.on('message', (message: string) => {
      console.log(message);
    });
  }

  onMessage(callback: (message: string) => void) {
    const msg: SocketMessage = JSON.parse(message);

    switch (msg.type) {
      case 'join_game':
        this.onJoin(msg.data.player_name, msg.game_id);
    };
  }
  onJoin(player_name: string, room_id: string) {
    console.log(`${player_name} joined ${room_id}`);

    this.socket.join(room_id);

    const result = joinGame(room_id, player_name, this);
    if (result.succesful) {
      this.socket.emit('join_game_result', JSON.stringify(result));
    }
  }

  sendState(state: PersonalGameState) {
    this.socket.emit('personal_game_state', state);
  }
}