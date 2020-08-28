import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ServerSidePaginationRequest } from '../../../../@tqp/models/ServerSidePaginationRequest';
import { ServerSidePaginationResponse } from '../../../../@tqp/models/ServerSidePaginationResponse';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../@tqp/services/http.service';
import { TokenService } from '../../../../@tqp/services/token.service';
import { User } from '../../../../@tqp/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userListNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) { }

  public setUserListNameSearchValue(val) {
    this.userListNameSearchValue = val;
  }

  public getUserListNameSearchValue() {
    return this.userListNameSearchValue;
  }

  public createUser(user: User): Observable<User> {
    const url = environment.apiUrl + '/auth/v1/user/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<User>(url,
        user,
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

  public getUserList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse> {
    const url = environment.apiUrl + '/auth/v1/user/ssp';
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

  public getUserDetail(guid: string) {
    const url = environment.apiUrl + '/auth/v1/user/' + guid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<User>(url,
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

  public updateUser(user: User): Observable<User> {
    const url = environment.apiUrl + '/auth/v1/user/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<User>(url,
        user,
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

  public deleteUser(userGuid: string): Observable<string> {
    const url = environment.apiUrl + '/auth/v1/user/' + userGuid;
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
