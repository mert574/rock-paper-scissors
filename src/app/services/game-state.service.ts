import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable, Subscriber} from 'rxjs';
import {Game} from '../domain/game';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private emitters = new Map<string, Subscriber<Game>>();

  public readonly gameCreate$ = this.createGameSharedObservable('GAME_CREATED');
  public readonly gameUpdate$ = this.createGameSharedObservable('GAME_UPDATED');

  constructor() {
    const es = new EventSource(environment.eventSourceUrl);
    es.addEventListener('GAME_CREATED', this.handleEvent);
    es.addEventListener('GAME_UPDATED', this.handleEvent);
  }

  private createGameSharedObservable(eventType: string) {
    const $ = new Observable<Game>(subscriber => {
      this.emitters.set(eventType, subscriber);
    });

    return $.pipe(share());
  }

  handleEvent = (event: MessageEvent) => {
    // tslint:disable-next-line:no-console
    console.debug(event.type, event.data);

    if (!this.emitters.has(event.type)) {
      console.warn(`No handler found for ${event.type}!`);
      return;
    }

    try {
      const game: Game = JSON.parse(event.data);
      this.emitters.get(event.type).next(game);
    } catch (e) {
      console.error(`Received a ${event.type} event. However, failed to parse the payload.`, e);
    }
  };

}
