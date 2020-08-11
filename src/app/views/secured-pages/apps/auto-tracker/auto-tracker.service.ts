import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from '@tqp/services/token.service';
import { KeyValueLong } from './auto-tracker-models/KeyValueLong';

@Injectable({
  providedIn: 'root'
})
export class AutoTrackerService {

  private static setHeaders(token: string): any {
    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset-utf-8')
      .set('Authorization', 'Bearer ' + token);
  }

  constructor(private http: HttpClient,
              protected tokenService: TokenService) {
  }

  public getLongestDistance(): Observable<KeyValueLong> {
    const token = this.tokenService.getToken();
    const url = environment.apiUrl + '/api/v1/fuel-tracker/longest-distance';
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


}
