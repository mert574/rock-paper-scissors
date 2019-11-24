import { Player } from './player';

export interface Game {
    _id: string;
    player: Player;
    opponent?: Player;
    status: 1 | 2 | 3;
    game: object;
}
