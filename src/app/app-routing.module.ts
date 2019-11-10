import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/games' },
  { path: 'games', loadChildren: () => import('./pages/games/games.module').then(m => m.GamesModule) },
  { path: 'history', loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
