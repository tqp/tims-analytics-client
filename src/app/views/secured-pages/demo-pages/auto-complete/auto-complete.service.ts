import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '@tqp/models/Person';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  constructor(private http: HttpClient) {
  }

  retrieveLastNameOptions(filter: string): Observable<Person> {
    console.log('AutoCompleteService -> retrieveLastNameOptions: filter=' + filter);
    const url = environment.apiUrl + '/api/v1/person/auto-complete-last-name';
    return this.http
      .get<Person>(url, {
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
  }

  retrieveAddressOptions(filter: string): Observable<Person> {
    console.log('AutoCompleteService -> retrieveAddressOptions: filter=' + filter);
    const url = environment.apiUrl + '/api/v1/person/auto-complete-address';
    return this.http
      .get<Person>(url, {
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
  }
}
