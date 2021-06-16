import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ServerSidePaginationRequest } from '../../models/ServerSidePaginationRequest';
import { ServerSidePaginationResponse } from '../../models/ServerSidePaginationResponse';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { TokenService } from './token.service';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userListNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private router: Router,
              private tokenService: TokenService) { }

  public setUserListNameSearchValue(val) {
    this.userListNameSearchValue = val;
  }

  public getUserListNameSearchValue() {
    return this.userListNameSearchValue;
  }

  public createUser(user: User): Observable<User> {
    const url = environment.apiUrl + '/api/v1/user/';
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

  public getUserList() {
    const url = environment.apiUrl + '/api/v1/user';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<User[]>(url,
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

  public getUserDetail(userId: number) {
    const url = environment.apiUrl + '/api/v1/user/' + userId;
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
    const url = environment.apiUrl + '/api/v1/user/';
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

  public deleteUser(userId: number): Observable<string> {
    const url = environment.apiUrl + '/api/v1/user/' + userId;
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

  public getUserDetailWithRoleList(userId: number): Observable<User> {
    const user_url = environment.apiUrl + '/api/v1/user/' + userId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<User>(user_url, {
        headers: this.httpService.setHeaders(token)
      }).pipe(
        switchMap(user => {
          // console.log('user', user);
          const user_role_url = environment.apiUrl + '/api/v1/role/user/' + userId;
          return this.http.get<Role[]>(user_role_url, {
            headers: this.httpService.setHeaders(token),
          })
            .pipe(
              map(roles => {
                user.roles = roles;
                return user;
              }),
              catchError(e => {
                console.error('Error getting your UserModel and Role information: ' + e);
                return throwError(e);
              })
            );
        })
      );
    } else {
      console.error('No Token was present.');
      this.router.navigate(['/login-page']).then();
    }
  }

  public getUserDetailByUsername(username: string) {
    const url = environment.apiUrl + '/api/v1/user/username/' + username;
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

  public getMyUserInfo(): Observable<User> {
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<User>(environment.apiUrl + '/api/v1/my-profile/', {headers: this.httpService.setHeaders(token)}).pipe(
        switchMap(user => {
          return this.http.get<Role[]>(environment.apiUrl + '/api/v1/my-profile/roles', {headers: this.httpService.setHeaders(token)})
            .pipe(
              map(roles => {
                user.roles = roles;
                return user;
              }),
              catchError(e => {
                console.error('Error getting your User and Role information: ' + e);
                return throwError(e);
              })
            );
        })
      );
    } else {
      console.error('No Token was present.');
      this.router.navigate(['/login-page']).then();
    }
  }

  public updatePassword(user: User): Observable<string> {
    const url = environment.apiUrl + '/api/v1/my-profile/update-password';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<string>(url,
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

  public confirmPassword(user: User): Observable<string> {
    const url = environment.apiUrl + '/api/v1/my-profile/confirm-password';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<string>(url,
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


}
