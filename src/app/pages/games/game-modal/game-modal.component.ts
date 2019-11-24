import {Component, EventEmitter, Output} from '@angular/core';
import {Game} from '../../../domain/game';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss']
})
export class GameModalComponent {
  isVisible = false;
  game: Game = null;

  @Output() choose = new EventEmitter<object>();

  constructor() {
  }

  public showModal(): void {
    this.isVisible = true;
  }

  public hideModal(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  choice(choice: 'ROCK' | 'PAPER' | 'SCISSORS') {
    this.choose.emit({ gameId: this.game._id, choice });
  }
}
