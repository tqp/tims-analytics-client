import { Injectable } from '@angular/core';
import { Alumni } from '../models/alumni.model';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { AlumniContact } from '../models/alumni-contact.model';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AlumniContactService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              protected tokenService: TokenService) { }

  public createAlumniContact(alumniContact: AlumniContact): Observable<AlumniContact> {
    const url = environment.apiUrl + '/api/v1/donor-database/alumni-contact';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Alumni>(url,
        alumniContact,
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

  public getAlumniContactListByAlumniId(alumniId: number) {
    const token = this.tokenService.getToken();
    if (token === null) {
      return throwError(new Error('No token was found.'));
    } else {
      const url = environment.apiUrl + '/api/v1/donor-database/alumni-contact/alumni/' + alumniId;
      return this.http.get<AlumniContact[]>(url,
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
}
