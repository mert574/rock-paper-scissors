import { NgModule } from '@angular/core';

import { GamesRoutingModule } from './games-routing.module';

import { GamesComponent } from './games.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [CommonModule, GamesRoutingModule, NgZorroAntdModule],
  declarations: [GamesComponent],
})
export class GamesModule { }
