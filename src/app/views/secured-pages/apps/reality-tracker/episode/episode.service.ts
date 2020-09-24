import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Observable } from 'rxjs';
import { Season } from '../season/Season';
import { environment } from '../../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Episode } from './Episode';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public createEpisode(episode: Episode): Observable<Episode> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/episode/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Season>(url,
        episode,
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

  public getEpisodeListBySeasonGuid(seasonGuid: string): Observable<Season[]> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/episode/filtered';
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

  public getEpisodeDetail(guid: string) {
    const url = environment.apiUrl + '/reality-tracker/api/v1/episode/' + guid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Episode>(url,
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

  public updateEpisode(episode: Episode): Observable<Episode> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/episode/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Season>(url,
        episode,
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

  public deleteEpisode(episodeGuid: string): Observable<string> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/episode/' + episodeGuid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.delete<string>(url,
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
