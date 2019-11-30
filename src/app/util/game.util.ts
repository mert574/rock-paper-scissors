import {Game} from '../domain/game';

export function calculateScores(gameListing: Game): { player: number, opponent: number } {
  const initial = {player: 0, opponent: 0};
  if (!gameListing.game) {
    return initial;
  }

  return gameListing.game.pastRounds.reduce((acc, curr) => {
    switch (curr.roundWinner) {
      case 'PLAYER': {
        acc.player++;
        break;
      }
      case 'OPPONENT': {
        acc.opponent++;
        break;
      }
    }
    return acc;
  }, initial);
}

export function parseDate(dateStr: string) {
  return Date.parse(dateStr);
}
