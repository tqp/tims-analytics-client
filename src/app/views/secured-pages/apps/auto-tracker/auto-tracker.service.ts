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
import { Series } from '../reality-tracker/reality-tracker-models/Series';
import { FuelActivity } from './auto-tracker-models/FuelActivity';

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

  // Fuel Activity

  public getFuelActivityList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse> {
    const url = environment.apiUrl + '/api/v1/auto-tracker-two/fuel-activity/ssp';
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

  public getFuelActivityDetail(guid: string) {
    const url = environment.apiUrl + '/api/v1/auto-tracker-two/fuel-activity/' + guid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<FuelActivity>(url,
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

  // Auto Tracker Dashboard

  public getLongestTimeBetweenFills(): Observable<KeyValue> {
    const token = this.tokenService.getToken();
    const url = environment.apiUrl + '/api/v1/auto-tracker-two/dashboard/longest-time-between-fills';
    return this.http
      .get<KeyValue>(url,
        {
          headers: AutoTrackerService.setHeaders(token),
          observe: 'response',
          params: {
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
    const url = environment.apiUrl + '/api/v1/auto-tracker-two/dashboard/longest-distance-between-fills';
    return this.http
      .get<KeyValue>(url,
        {
          headers: AutoTrackerService.setHeaders(token),
          observe: 'response',
          params: {
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
    const url = environment.apiUrl + '/api/v1/auto-tracker-two/dashboard/estimated-1k-date';
    return this.http
      .get<KeyValue>(url,
        {
          headers: AutoTrackerService.setHeaders(token),
          observe: 'response',
          params: {
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
    const url = environment.apiUrl + '/api/v1/auto-tracker-two/dashboard/odometer';
    return this.http
      .get<KeyValueLong>(url,
        {
          headers: AutoTrackerService.setHeaders(token),
          observe: 'response',
          params: {
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
    const url = environment.apiUrl + '/api/v1/auto-tracker-two/dashboard/mpg';
    return this.http
      .get<KeyValueLong>(url, {
        headers: AutoTrackerService.setHeaders(token),
        observe: 'response',
        params: {
        }
      })
      .pipe(
        map(res => {
          // console.log('response', res);
          return res.body;
        })
      );
  }

  public setFuelActivityListNameSearchValue(val) {
    this.fuelActivityListNameSearchValue = val;
  }

  public getFuelActivityListNameSearchValue() {
    return this.fuelActivityListNameSearchValue;
  }


}
