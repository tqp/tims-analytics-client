import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumni } from '../models/alumni.model';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { TokenService } from '@tqp/authentication/services/token.service';
import { HttpService } from '@tqp/authentication/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AlumniService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              protected tokenService: TokenService) {
  }

  public createAlumni(alumni: Alumni): Observable<Alumni> {
    const url = environment.apiUrl + '/api/v1/donor-database/alumni';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Alumni>(url,
        alumni,
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

  public getAlumniList(): Observable<Alumni[] | null> {
    const token = this.tokenService.getToken();
    // console.log('token', token);
    if (token === null) {
      return throwError(new Error('No token was found.'));
    } else {
      const url = environment.apiUrl + '/api/v1/donor-database/alumni';
      return this.http.get<Alumni[]>(url, {
        headers: this.httpService.setHeadersWithToken(),
        observe: 'response',
        params: {}
      })
        .pipe(
          map(res => {
            return res.body;
          })
        );
    }
  }

  public getAlumniListDeleted(): Observable<Alumni[] | null> {
    const token = this.tokenService.getToken();
    // console.log('token', token);
    if (token === null) {
      return throwError(new Error('No token was found.'));
    } else {
      const url = environment.apiUrl + '/api/v1/donor-database/alumni/deleted';
      return this.http.get<Alumni[]>(url, {
        headers: this.httpService.setHeadersWithToken(),
        observe: 'response',
        params: {}
      })
        .pipe(
          map(res => {
            return res.body;
          })
        );
    }
  }

  public getAlumniDetail(id: number) {
    const token = this.tokenService.getToken();
    if (token === null) {
      return throwError(new Error('No token was found.'));
    } else {
      const url = environment.apiUrl + '/api/v1/donor-database/alumni/' + id;
      return this.http.get<Alumni>(url,
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
    }
  }

  public updateAlumni(alumni: Alumni): Observable<Alumni> {
    const url = environment.apiUrl + '/api/v1/donor-database/alumni';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Alumni>(url,
        alumni,
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

  public deleteAlumni(alumniId: number): Observable<string> {
    const url = environment.apiUrl + '/api/v1/donor-database/alumni/' + alumniId;
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

  public undeleteAlumni(alumni: Alumni): Observable<Alumni> {
    console.log('undeleteAlumni', alumni);
    const url = environment.apiUrl + '/api/v1/donor-database/alumni/undelete';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Alumni>(url,
        alumni,
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

  public checkDuplicateRecords(alumni: Alumni) {
    const url = environment.apiUrl + '/api/v1/donor-database/alumni/check-duplicates';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Alumni[]>(url,
        alumni,
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
