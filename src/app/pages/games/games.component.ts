import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/domain/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  private games: Game[];

  constructor(private api: GameService) { }

  ngOnInit() {
    this.api.getActiveGames()
    .subscribe((response: Game[]) => { this.games = response; });
  }
}
