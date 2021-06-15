import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../../@tqp/authentication/services/http.service';
import { TokenService } from '../../../../../@tqp/authentication/services/token.service';
import { Series } from './Series';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ServerSidePaginationRequest } from '../../../../../@tqp/models/ServerSidePaginationRequest';
import { ServerSidePaginationResponse } from '../../../../../@tqp/models/ServerSidePaginationResponse';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private seriesListNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public setSeriesListNameSearchValue(val) {
    this.seriesListNameSearchValue = val;
  }

  public getSeriesListNameSearchValue() {
    return this.seriesListNameSearchValue;
  }

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
}
