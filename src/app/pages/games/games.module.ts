import {NgModule} from '@angular/core';

import {GamesRoutingModule} from './games-routing.module';

import {GamesComponent} from './games.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import {NewGameModalComponent} from './new-game-modal/new-game-modal.component';
import {GameModalComponent} from './game-modal/game-modal.component';
import {CountdownModule} from 'ngx-countdown';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [CommonModule, GamesRoutingModule, NgZorroAntdModule, CountdownModule, FormsModule],
  declarations: [GamesComponent, NewGameModalComponent, GameModalComponent],
})
export class GamesModule {
}
