import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { UserRole } from '../models/UserRole';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private router: Router,
              private tokenService: TokenService) {
  }

  public getUserRoleDetail(userRoleId: number) {
    const url = environment.apiUrl + '/api/v1/user-role/' + userRoleId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<UserRole[]>(url,
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

  public getUserRoleListByUser(userId: number) {
    const url = environment.apiUrl + '/api/v1/user-role/user/' + userId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<UserRole[]>(url,
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

  public getUserRoleListByRole(roleId: number) {
    const url = environment.apiUrl + '/api/v1/user-role/role/' + roleId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<UserRole[]>(url,
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
