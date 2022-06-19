
import {nanoid} from 'nanoid';
import {Card, genDeck} from './cards';
import Connection from './connection';

export enum GameStatus {
  WAITING,
  IN_PROGRESS,
  FINISHED
}

export interface Player {
  id: string;
  name: string;
  deck: Card[];
  connection: Connection;
}

export interface GameState {
  players: Player[];
  id: string;
  status: GameStatus;
  current_player: number;
  deck: Card[];
}

export interface PersonalGameState {
  top_card: Card;
  game_id: string;
  status: GameStatus;
  current_player: number;
  player_names: string[];
  player: Player;
}
const games = new Map<string, GameState>();

const makeGame = ():
    GameState => {
      return {
        players: [],
        id: nanoid(4),
        status: GameStatus.WAITING,
        current_player: 0,
        deck: genDeck()
      };
    }



export interface IJoinGameResult {
  player_id: string;
  succesful: boolean;
  message: string;
}
/**
 * @return {String} ID of the created player;
 */
export const joinGame =
    (game_id: string, player_name: string, connection: Connection):
        IJoinGameResult => {
          if (!games.has(game_id)) {
            return {
              player_id: '',
              succesful: false,
              message: 'Game does not exist'
            };
          }

          const game = games.get(game_id);

          const hand = games.get(game_id)?.deck.splice(0, 7);
          const player = {
            id: nanoid(4),
            name: player_name,
            deck: hand,
            connection: Connection
          };
          return {
            player_id: player.id, succesful: true, message: 'Player joined',
          }
        }


export const startUpdate =
    (game_id: string) => {
      setInterval(() => {
        sendGameState(game_id);
      }, 1000);
    }

export const sendGameState = (game_id: string) => {
  const game = games.get(game_id);
  if (!game) {
    return;
  }
  const state = {
    top_card: game.deck[0],
    game_id: game.id,
    status: game.status,
    current_player: game.current_player,
    player_names: game.players.map(p => p.name),
    player: game.players[game.current_player],
  };
  game.players.forEach((p: Player) => {
    p.connection.sendState(state);
  });
}