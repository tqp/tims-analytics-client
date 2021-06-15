import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../../@tqp/authentication/services/http.service';
import { TokenService } from '../../../../../@tqp/authentication/services/token.service';
import { Season } from './Season';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ListItem } from '../../../../../@tqp/models/ListItem';
import { Person } from '../../../../../@tqp/models/Person';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public createSeason(season: Season): Observable<Season> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/season/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Season>(url,
        season,
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

  // Series-Season List
  public getSeasonListBySeriesGuid(seriesGuid: string): Observable<Season[]> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/season';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Season[]>(url, {
        headers: this.httpService.setHeadersWithToken(),
        observe: 'response',
        params: {
          'series-guid': seriesGuid
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

  // Contestant-Season List
  public getSeasonListByContestantGuid(contestantGuid: string): Observable<Season[]> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/player/filtered';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Season[]>(url, {
        headers: this.httpService.setHeadersWithToken(),
        observe: 'response',
        params: {
          'contestant-guid': contestantGuid
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

  public getSeasonDetail(guid: string) {
    const url = environment.apiUrl + '/reality-tracker/api/v1/season/' + guid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Season>(url,
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

  public updateSeason(season: Season): Observable<Season> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/season/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Season>(url,
        season,
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

  public deleteSeason(seasonGuid: string): Observable<string> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/season/' + seasonGuid;
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

  // Contestant-Season Add/Remove
  public getCurrentSeasonsByContestantGuid(contestantGuid: string): Observable<Season[]> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/player/current-seasons/contestant/' + contestantGuid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Season[]>(url,
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

  public getAvailableSeasonsByContestantGuid(contestantGuid: string): Observable<Season[]> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/player/available-seasons/contestant/' + contestantGuid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Season[]>(url,
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

  public addSeasonsToContestant(contestantGuid: string, itemsToAdd: ListItem[]): Observable<any> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/player/add-seasons/contestant/' + contestantGuid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Person[]>(url,
        itemsToAdd,
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

  public removeSeasonsFromContestant(contestantGuid: string, itemsToRemove: ListItem[]): Observable<any> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/player/remove-seasons/contestant/' + contestantGuid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<ListItem[]>(url,
        itemsToRemove,
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
