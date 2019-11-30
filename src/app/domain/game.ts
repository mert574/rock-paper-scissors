import {Player} from './player';

interface GameRound {
  round: number;
  playerMove?: string;
  opponentMove?: string;
  roundWinner?: null | 'DRAW' | 'PLAYER' | 'OPPONENT';
  roundEndsAt: string;
}

export interface Game {
  _id: string;
  player: Player;
  opponent?: Player;
  status: 'ACTIVE' | 'PLAYING' | 'FINISHED' | 'EXPIRED';
  game: {
    currentRound: GameRound,
    pastRounds: GameRound[]
  };
  winner?: string;
}
