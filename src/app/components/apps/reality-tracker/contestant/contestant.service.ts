import { Injectable } from '@angular/core';
import { Contestant } from './Contestant';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ServerSidePaginationRequest } from '../../../../../@tqp/models/ServerSidePaginationRequest';
import { ServerSidePaginationResponse } from '../../../../../@tqp/models/ServerSidePaginationResponse';
import { Season } from '../season/Season';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../../@tqp/authentication/services/http.service';
import { TokenService } from '../../../../../@tqp/authentication/services/token.service';
import { ListItem } from '../../../../../@tqp/models/ListItem';
import { Person } from '../../../../../@tqp/models/Person';

@Injectable({
  providedIn: 'root'
})
export class ContestantService {
  private contestantListNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public setContestantListNameSearchValue(val) {
    this.contestantListNameSearchValue = val;
  }

  public getContestantListNameSearchValue() {
    return this.contestantListNameSearchValue;
  }

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
}
