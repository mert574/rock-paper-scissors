import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) {
  }

  register(name) {
    return this.http.post(`${environment.baseUrl}/api/player/register`, {name});
  }

  getPlayerById(id) {
    return this.http.get(`${environment.baseUrl}/api/player/${id}`);
  }
}
