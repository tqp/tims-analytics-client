import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KeyValue } from '../../../../../../@tqp/models/KeyValue';
import { environment } from '../../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { KeyValueLong } from '../auto-tracker-models/KeyValueLong';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../../../@tqp/services/http.service';
import { TokenService } from '../../../../../../@tqp/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AutoTrackerDashboardService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              protected tokenService: TokenService) { }

  public getLongestTimeBetweenFills(): Observable<KeyValue> {
    const token = this.tokenService.getToken();
    const url = environment.apiUrl + '/api/v1/auto-tracker/dashboard/longest-time-between-fills';
    return this.http
      .get<KeyValue>(url,
        {
          headers: this.httpService.setHeadersWithToken(),
          observe: 'response',
          params: {}
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
    const url = environment.apiUrl + '/api/v1/auto-tracker/dashboard/longest-distance-between-fills';
    return this.http
      .get<KeyValue>(url,
        {
          headers: this.httpService.setHeadersWithToken(),
          observe: 'response',
          params: {}
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
    const url = environment.apiUrl + '/api/v1/auto-tracker/dashboard/estimated-1k-date';
    return this.http
      .get<KeyValue>(url,
        {
          headers: this.httpService.setHeadersWithToken(),
          observe: 'response',
          params: {}
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
    const url = environment.apiUrl + '/api/v1/auto-tracker/dashboard/odometer';
    return this.http
      .get<KeyValueLong>(url,
        {
          headers: this.httpService.setHeadersWithToken(),
          observe: 'response',
          params: {}
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
    const url = environment.apiUrl + '/api/v1/auto-tracker/dashboard/mpg';
    return this.http
      .get<KeyValueLong>(url, {
        headers: this.httpService.setHeadersWithToken(),
        observe: 'response',
        params: {}
      })
      .pipe(
        map(res => {
          // console.log('response', res);
          return res.body;
        })
      );
  }
}
