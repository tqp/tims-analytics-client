import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { Role } from '../models/Role';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private router: Router,
              private tokenService: TokenService) {
  }

  public createRole(role: Role): Observable<Role> {
    const url = environment.apiUrl + '/api/v1/role/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Role>(url,
        role,
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

  public getRoleList() {
    const url = environment.apiUrl + '/api/v1/role';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Role[]>(url,
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

  public getDeletedRoleList() {
    const url = environment.apiUrl + '/api/v1/role/deleted';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Role[]>(url,
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

  public getRoleDetail(roleId: number) {
    const url = environment.apiUrl + '/api/v1/role/' + roleId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Role>(url,
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

  public updateRole(role: Role): Observable<Role> {
    const url = environment.apiUrl + '/api/v1/role/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Role>(url,
        role,
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

  public deleteRole(roleId: number): Observable<string> {
    const url = environment.apiUrl + '/api/v1/role/' + roleId;
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

  // NON-CRUD

  public restoreDeletedRole(roleId: number): Observable<Role> {
    const url = environment.apiUrl + '/api/v1/role/restore/' + roleId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Role>(url,
        null,
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
