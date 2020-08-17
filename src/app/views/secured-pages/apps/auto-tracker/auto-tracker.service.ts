import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from '@tqp/services/token.service';
import { KeyValueLong } from './auto-tracker-models/KeyValueLong';
import { ServerSidePaginationRequest } from '../../../../../@tqp/models/ServerSidePaginationRequest';
import { ServerSidePaginationResponse } from '../../../../../@tqp/models/ServerSidePaginationResponse';
import { HttpService } from '../../../../../@tqp/services/http.service';
import { KeyValue } from '../../../../../@tqp/models/KeyValue';

@Injectable({
  providedIn: 'root'
})
export class AutoTrackerService {
  private fuelActivityListNameSearchValue;

  private static setHeaders(token: string): any {
    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset-utf-8')
      .set('Authorization', 'Bearer ' + token);
  }

  constructor(private http: HttpClient,
              private httpService: HttpService,
              protected tokenService: TokenService) {
  }

  // Auto Tracker Dashboard

  public getLongestTimeBetweenFills(): Observable<KeyValue> {
    const token = this.tokenService.getToken();
    const url = environment.apiUrl + '/api/v1/fuel-tracker/longest-time-between-fills';
    return this.http
      .get<KeyValue>(url,
        {
          headers: AutoTrackerService.setHeaders(token),
          observe: 'response',
          params: {
            filter: 'test'
          }
        })
      .pipe(
        map(res => {
          // console.log('response', res);
          return res.body;
        })
      );
  }

  public getLongestDistanceBetweenFills(): Observable<KeyValue> {
    const token = this.tokenService.getToken();
    const url = environment.apiUrl + '/api/v1/fuel-tracker/longest-distance-between-fills';
    return this.http
      .get<KeyValue>(url,
        {
          headers: AutoTrackerService.setHeaders(token),
          observe: 'response',
          params: {
            filter: 'test'
          }
        })
      .pipe(
        map(res => {
          // console.log('response', res);
          return res.body;
        })
      );
  }

  public getEstimated1kDate(): Observable<KeyValue> {
    const token = this.tokenService.getToken();
    const url = environment.apiUrl + '/api/v1/fuel-tracker/estimated-1k-date';
    return this.http
      .get<KeyValue>(url,
        {
          headers: AutoTrackerService.setHeaders(token),
          observe: 'response',
          params: {
            filter: 'test'
          }
        })
      .pipe(
        map(res => {
          // console.log('response', res);
          return res.body;
        })
      );
  }


  public getOdometerData(): Observable<KeyValueLong> {
    const token = this.tokenService.getToken();
    const url = environment.apiUrl + '/api/v1/fuel-tracker/odometer';
    return this.http
      .get<KeyValueLong>(url,
        {
          headers: AutoTrackerService.setHeaders(token),
          observe: 'response',
          params: {
            filter: 'test'
          }
        })
      .pipe(
        map(res => {
          // console.log('response', res);
          return res.body;
        })
      );
  }

  public getMpgData(): Observable<KeyValueLong> {
    const token = this.tokenService.getToken();
    const url = environment.apiUrl + '/api/v1/fuel-tracker/mpg';
    return this.http
      .get<KeyValueLong>(url, {
        headers: AutoTrackerService.setHeaders(token),
        observe: 'response',
        params: {
          filter: 'test'
        }
      })
      .pipe(
        map(res => {
          // console.log('response', res);
          return res.body;
        })
      );
  }

  // Fuel Activity

  public getFuelActivityList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse> {
    const url = environment.apiUrl + '/auto-tracker/api/v1/fuel-activity/ssp';
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


  public setFuelActivityListNameSearchValue(val) {
    this.fuelActivityListNameSearchValue = val;
  }

  public getFuelActivityListNameSearchValue() {
    return this.fuelActivityListNameSearchValue;
  }


}
