import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '@tqp/models/Person';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpService } from '@tqp/authentication/services/http.service';
import { TokenService } from '@tqp/authentication/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public retrieveLastNameOptions(filter: string): Observable<Person> {
    const url = environment.apiUrl + '/api/v1/auto-complete/last-name';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http
        .get<Person>(url,
        {
          headers: this.httpService.setHeadersWithToken(),
          observe: 'response',
          params: {
            filter: filter
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

  public retrieveAddressOptions(filter: string): Observable<Person> {
    const url = environment.apiUrl + '/api/v1/auto-complete/address';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http
        .get<Person>(url,
          {
            headers: this.httpService.setHeadersWithToken(),
            observe: 'response',
            params: {
              filter: filter
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
}
