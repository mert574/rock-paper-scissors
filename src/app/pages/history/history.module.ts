import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HistoryRoutingModule } from './history-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HistoryRoutingModule,
    NgZorroAntdModule,
  ],
  declarations: [HistoryComponent],
})
export class HistoryModule { }
