import {Component} from '@angular/core';
import {Game} from '../../domain/game';
import {GameService} from '../../services/game.service';
import {calculateScores} from '../../util/game.util';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  constructor(private api: GameService) {
    this.api.getPastGames().subscribe((games: Game[]) => {
      this.games = games;
    });
  }

  games: Game[] = [];

  calculateScores = calculateScores;

  parseDate(dateStr: string) {
    return Date.parse(dateStr);
  }
}
