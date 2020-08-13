import { Injectable } from '@angular/core';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { Observable } from 'rxjs';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Person } from '../../../../../@tqp/models/Person';
import { Contestant } from './reality-tracker-models/Contestant';
import { Series } from './reality-tracker-models/Series';
import { Season } from './reality-tracker-models/Season';

@Injectable({
  providedIn: 'root'
})
export class RealityTrackerService {
  private nameSearchValue;

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

  // Series-Season List
  public getSeriesSeasonList(seriesGuid: string): Observable<Season[]> {
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

  // CONTESTANT

  public createContestant(contestant: Contestant): Observable<Contestant> {
    const url = environment.apiUrl + '/reality-tracker/api/v1/contestant/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Person>(url,
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


  public setNameSearchValue(val) {
    this.nameSearchValue = val;
  }

  public getNameSearchValue() {
    return this.nameSearchValue;
  }
}
