import { Injectable } from '@angular/core';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { Observable } from 'rxjs';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Contestant } from './reality-tracker-models/Contestant';
import { Series } from './reality-tracker-models/Series';
import { Season } from './reality-tracker-models/Season';
import { Player } from './reality-tracker-models/Player';
import { Person } from '../../../../../@tqp/models/Person';
import { ListItem } from '../../../../../@tqp/models/ListItem';

@Injectable({
  providedIn: 'root'
})
export class RealityTrackerService {
  private seriesListNameSearchValue;
  private contestantListNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  // SERIES

  public createSeries(series: Series): Observable<Series> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/series/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Series>(url,
        series,
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

  public getSeriesList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/series/ssp';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ServerSidePaginationResponse>(url,
        serverSideSearchParams,
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

  public getSeriesDetail(guid: string) {
    const url = environment.apiUrl + '/reality-tracker/api/v1/series/' + guid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Series>(url,
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

  public updateSeries(series: Series): Observable<Series> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/series/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Series>(url,
        series,
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

  public deleteSeries(seriesGuid: string): Observable<string> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/series/' + seriesGuid;
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

  // SEASON

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

  // CONTESTANT

  public createContestant(contestant: Contestant): Observable<Contestant> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/contestant/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Contestant>(url,
        contestant,
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

  public getContestantList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/contestant/ssp';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<ServerSidePaginationResponse>(url,
        serverSideSearchParams,
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

  public getContestantDetail(guid: string) {
    const url = environment.apiUrl + '/reality-tracker/api/v1/contestant/' + guid;
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

  public updateContestant(contestant: Contestant): Observable<Contestant> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/contestant/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Contestant>(url,
        contestant,
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

  public deleteContestant(contestantGuid: string): Observable<string> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/contestant/' + contestantGuid;
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

  // Season-Contestant Add/Remove
  public getCurrentContestantsBySeasonGuid(seasonGuid: string): Observable<Contestant[]> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/player/current-contestants/season/' + seasonGuid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Contestant[]>(url,
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

  public getAvailableContestantsBySeasonGuid(seasonGuid: string): Observable<Contestant[]> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/player/available-contestants/season/' + seasonGuid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Contestant[]>(url,
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

  public addContestantsToSeason(seasonGuid: string, itemsToAdd: ListItem[]): Observable<any> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/player/add-contestants/season/' + seasonGuid;
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

  public removeContestantsFromSeason(seasonGuid: string, itemsToRemove: ListItem[]): Observable<any> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/player/remove-contestants/season/' + seasonGuid;
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

  // PLAYER

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

  public setSeriesListNameSearchValue(val) {
    this.seriesListNameSearchValue = val;
  }

  public getSeriesListNameSearchValue() {
    return this.seriesListNameSearchValue;
  }

  public setContestantListNameSearchValue(val) {
    this.contestantListNameSearchValue = val;
  }

  public getContestantListNameSearchValue() {
    return this.contestantListNameSearchValue;
  }
}
