import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '@tqp/authentication/services/token.service';
import { Observable } from 'rxjs';
import { KeyValueString } from './KeyValueString';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseConnectionTestService {

  constructor(private http: HttpClient,
              protected tokenService: TokenService) {
  }

  public getDatabaseTime(): Observable<KeyValueString> {
    console.log('AutoCompleteService -> getDatabaseTime');
    const token = this.tokenService.getToken();
    const url = environment.apiUrl + '/api/v1/basic-database-connection';
    return this.http
      .get<KeyValueString>(url, {
        headers: this.setHeaders(token),
        observe: 'response',
        params: {
          filter: 'test'
        }
      })
      .pipe(
        map(res => {
          console.log('response', res);
          return res.body;
        })
      );
  }

  private setHeaders(token: string): any {
    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset-utf-8')
      .set('Authorization', 'Bearer ' + token);
  }
}
