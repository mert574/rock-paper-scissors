import {Component, OnInit, ViewChild} from '@angular/core';
import {GameService} from 'src/app/services/game.service';
import {Game} from 'src/app/domain/game';
import {GameModalComponent} from './game-modal/game-modal.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  private games: Game[];
  playerId = '1';

  @ViewChild(GameModalComponent, { static: true })
  private gameModal: GameModalComponent;

  constructor(private api: GameService) {
  }

  ngOnInit() {
    this.api.getActiveGames()
      .subscribe((response: Game[]) => {
        this.games = response;
      });
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

  handleCreate = () => {
    this.api.createGame(this.playerId)
      .subscribe((response: Game) => {
        this.games = [...this.games, response];
      });
  }

  handleJoinGame = (game: Game) => {
    // @ts-ignore
    this.api.joinGame(game._id, this.playerId)
      .subscribe((result: Game) => {
        this.games = [...this.games.filter(it => it._id !== result._id), result];
        this.gameModal.game = result;
        this.gameModal.showModal();
    });
  }

  handleOpenModal = (game: Game) => {
    this.gameModal.game = game;
    this.gameModal.showModal();
  }

  handleChoose = ({ gameId, choice }) => {
    this.api.playGame(gameId, this.playerId, choice).subscribe((result: Game) => {
      console.log('playGame result', result);
    });
  }
}
