import {Component, OnInit, ViewChild} from '@angular/core';
import {GameService} from 'src/app/services/game.service';
import {Game} from 'src/app/domain/game';
import {GameModalComponent} from './game-modal/game-modal.component';
import {GameStateService} from '../../services/game-state.service';
import {PlayerService} from '../../services/player.service';
import {Player} from '../../domain/player';
import {calculateScores, parseDate} from '../../util/game.util';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor(
    private api: GameService,
    private players: PlayerService,
    private gameUpdates: GameStateService,
    private notification: NzNotificationService) {
  }

  private games: Game[];
  private playerId: string;
  private playerName: string;

  @ViewChild(GameModalComponent, {static: true})
  private gameModal: GameModalComponent;

  parseDate = parseDate;
  scores = calculateScores;

  ngOnInit() {
    const savedPlayer = {
      id: localStorage.getItem('playerId'),
      name: localStorage.getItem('playerName'),
    };

    if (!savedPlayer.id || !savedPlayer.name) {
      // Player not found, go ahead and register.
      // Since we don't have a proper user implementation; just ask a nickname.
      let name: string;
      do {
        name = prompt('Please enter a nickname');
      } while (!name || name.length < 2 || name.length > 20);

      this.registerPlayer(name);
    } else {
      this.players.getPlayerById(savedPlayer.id)
        .subscribe(({_id, name}: Player) => {
          this.playerId = _id;
          this.playerName = name;
        }, () => {
          this.registerPlayer(savedPlayer.name);
        });
    }

    this.api.getActiveGames()
      .subscribe((response: Game[]) => {
        this.games = response;
      });

    this.gameUpdates.gameCreate$.subscribe((game: Game) => {
      this.games = [...this.games, game];
    });

    this.gameUpdates.gameUpdate$.subscribe((game: Game) => {
      const gamesWithoutUpdated = this.games.filter((it) => it._id !== game._id);
      if (game.status === 'EXPIRED') {
        this.games = gamesWithoutUpdated;
        return;
      }

      this.games = [...gamesWithoutUpdated, game];
    });
  }

  registerPlayer(nickname: string) {
    this.players.register(nickname).subscribe(({_id, name}: Player) => {
      localStorage.setItem('playerId', _id);
      localStorage.setItem('playerName', name);
      this.playerId = _id;
      this.playerName = name;
    });
  }

  handleCreate = () => {
    this.api.createGame(this.playerId).subscribe();
  }

  handleJoinGame = (game: Game) => {
    this.api.joinGame(game._id, this.playerId)
      .subscribe({
        next: (result: Game) => {
          this.games = [...this.games.filter(it => it._id !== result._id), result];
          this.gameModal.showModal(result, this.playerId);
          this.notification.success('Join Game', 'Joined the game!');
        },
        error: (err) => {
          this.notification.error('Join Game', err.error.error);
        }
      });
  }

  handleOpenModal = (game: Game) => {
    this.gameModal.showModal(game, this.playerId);
  }

  handleChoose = ({gameId, choice}) => {
    this.api.playGame(gameId, this.playerId, choice).subscribe({
      error: (err) => {
        this.notification.error('Play Game', err.error.error);
      }
    });
  }
}
