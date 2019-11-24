import {Component, OnInit} from '@angular/core';
import {Game} from '../../domain/game';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  games: Game[] = [];

  constructor(private api: GameService) {
    this.api.getPastGames().subscribe((games: Game[]) => {
      this.games = games;
    });
  }

  ngOnInit() {
  }

  calculateScores(gameListing: Game): object {
    const initial = {player: 0, opponent: 0};
    if (!gameListing.game) {
      return initial;
    }

    // @ts-ignore
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

  parseDate(dateStr: string) {
    return Date.parse(dateStr);
  }
}
