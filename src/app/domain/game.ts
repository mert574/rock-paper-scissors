import { Player } from './player';

export interface Game {
    id: number;
    player: Player;
    opponent?: Player;
    status: 1 | 2 | 3;
}
