import {Component, EventEmitter, Output} from '@angular/core';
import {Game} from '../../../domain/game';
import {GameStateService} from '../../../services/game-state.service';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {calculateScores, parseDate} from '../../../util/game.util';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss']
})
export class GameModalComponent {
  isVisible = false;
  game: Game = null;
  playerId: string;
  updateSubscription: Subscription;

  @Output() choose = new EventEmitter<object>();

  constructor(private gameUpdates: GameStateService, private notification: NzNotificationService) {
  }

  get date(): number {
    return parseDate(this.game.game.currentRound.roundEndsAt);
  }

  get scores(): { player: number, opponent: number } {
    return calculateScores(this.game);
  }

  get side(): string {
    return this.game.player._id === this.playerId ? 'PLAYER' : 'OPPONENT';
  }

  get myCurrentMove(): string {
    if (this.game && this.game.game && this.game.game.currentRound) {
      const side = this.side.toLowerCase();
      return this.game.game.currentRound[`${side}Move`];
    }
    return null;
  }

  get otherSideMove(): string {
    if (this.game && this.game.game && this.game.game.currentRound) {
      const side = this.side === 'PLAYER' ? 'opponent' : 'player';
      return this.game.game.currentRound[`${side}Move`];
    }
    return null;
  }

  public showModal(game: Game, playerId?: string): void {
    if (!game) {
      throw new Error('Cannot show modal without a game!');
    }

    this.game = game;
    this.isVisible = true;

    if (playerId) {
      this.playerId = playerId;
    }

    this.updateSubscription = this.gameUpdates.gameUpdate$
      .pipe(
        filter((updatedGame: Game) => updatedGame._id === this.game._id)
      ).subscribe((updatedGame: Game) => {
        if (updatedGame.game.currentRound && updatedGame.game.currentRound.round > this.game.game.currentRound.round) {
          const lastRoundNumber = updatedGame.game.pastRounds.length - 1;
          const lastRound = updatedGame.game.pastRounds[lastRoundNumber];
          const message = lastRound.roundWinner === 'DRAW' ? 'DRAW' : lastRound.roundWinner === this.side ? 'YOU WIN' : 'YOU LOST';
          this.notification.info(`Round #${lastRound.round} Ended!`, `<strong>${message}</strong>!`);
        }
        if (updatedGame.status === 'FINISHED' && updatedGame.winner) {
          const winOrLost = updatedGame.winner === this.side ? 'WIN' : 'LOST';
          this.notification.info('Game Ended!', `You <strong>${winOrLost}</strong>!`);
        }
        this.game = updatedGame;
      });
  }

  public hideModal(): void {
    this.isVisible = false;
    this.updateSubscription.unsubscribe();
    this.updateSubscription = null;
    this.playerId = null;
    this.game = null;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.hideModal();
  }

  choice(choice: 'ROCK' | 'PAPER' | 'SCISSORS') {
    this.choose.emit({gameId: this.game._id, choice});
  }
}
