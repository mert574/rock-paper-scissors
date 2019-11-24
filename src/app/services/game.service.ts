import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  getAllGames() {
    return this.http.get(`${environment.baseUrl}/api/game`);
  }

  getActiveGames() {
    return this.http.get(`${environment.baseUrl}/api/game/active`);
  }

  getGame(gameId) {
    return this.http.get(`${environment.baseUrl}/api/game/${gameId}`);
  }

  joinGame(gameId, opponentId) {
    return this.http.post(`${environment.baseUrl}/api/game/${gameId}/join/${opponentId}`, {});
  }

  playGame(gameId, playerId, choice) {
    return this.http.post(`${environment.baseUrl}/api/game/${gameId}/play/${playerId}/${choice}`, {});
  }

  createGame(playerId) {
    return this.http.post(`${environment.baseUrl}/api/game/create/${playerId}`, {});
  }

  getPastGames() {
    return this.http.get(`${environment.baseUrl}/api/game/past`);
  }
}
