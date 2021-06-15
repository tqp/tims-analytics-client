import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Contestant } from '../contestant/Contestant';
import { map } from 'rxjs/operators';
import { Player } from './Player';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../../@tqp/authentication/services/http.service';
import { TokenService } from '../../../../../@tqp/authentication/services/token.service';
import { Season } from '../season/Season';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public getPlayerListBySeasonGuid(seasonGuid: string): Observable<Season[]> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/player/filtered';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Season[]>(url, {
        headers: this.httpService.setHeadersWithToken(),
        observe: 'response',
        params: {
          'season-guid': seasonGuid
        }
      })
        .pipe(
          map(res => {
            return res.body;
          })
        );
    } else {
      console.error('No token was present.');
      return null;
    }
  }

  public getPlayerDetail(playerGuid: string) {
    const url = environment.apiUrl + '/reality-tracker/api/v1/player/' + playerGuid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Contestant>(url,
        {
          headers: this.httpService.setHeadersWithToken(),
          observe: 'response',
          params: {}
        })
        .pipe(
          map(res => {
            return res.body;
          })
        );
    } else {
      console.error('No token was present.');
      return null;
    }
  }

  public updatePlayer(player: Player): Observable<Player> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/player/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Contestant>(url,
        player,
        {
          headers: this.httpService.setHeadersWithToken(),
          observe: 'response',
          params: {}
        })
        .pipe(
          map(res => {
            return res.body;
          })
        );
    } else {
      console.error('No token was present.');
      return null;
    }
  }
}
