import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Person } from '@tqp/models/Person';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { HttpService } from '@tqp/services/http.service';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { TokenService } from '@tqp/services/token.service';
import { ListItem } from '@tqp/models/ListItem';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private nameSearchValue;
  private stateSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public createPerson(person: Person): Observable<Person> {
    const url = environment.apiUrl + '/api/v1/person/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Person>(url,
        person,
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

  public getPersonList_All(): Observable<Person[]> {
    const url = environment.apiUrl + '/api/v1/person/all';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Person[]>(url, {
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

  public getPersonList_InfiniteScroll(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse> {
    const url = environment.apiUrl + '/api/v1/person/infinite-scroll';
    const token = this.tokenService.getToken();
    // serverSideSearchParams.pageIndex = ++serverSideSearchParams.pageIndex;
    // console.log('serverSideSearchParams', serverSideSearchParams);
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

  public getPersonSubList_InfiniteScroll(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse> {
    const url = environment.apiUrl + '/api/v1/person/sub';
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

  public getPersonDetail(guid: string) {
    const url = environment.apiUrl + '/api/v1/person/' + guid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Person>(url,
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

  public updatePerson(person: Person): Observable<Person> {
    const url = environment.apiUrl + '/api/v1/person/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Person>(url,
        person,
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

  public deletePerson(personGuid: string): Observable<string> {
    const url = environment.apiUrl + '/api/v1/person/' + personGuid;
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

  // FRIEND ADD/REMOVE

  public getCurrentFriends(personGuid: string): Observable<Person[]> {
    const url = environment.apiUrl + '/api/v1/person/friends/current/' + personGuid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Person[]>(url,
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

  public getAvailableFriends(personGuid: string): Observable<Person[]> {
    const url = environment.apiUrl + '/api/v1/person/friends/available/' + personGuid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Person[]>(url,
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

  public addFriends(personGuid: string, itemsToAdd: ListItem[]): Observable<any> {
    const url = environment.apiUrl + '/api/v1/person/friends/add/' + personGuid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<Person[]>(url,
        itemsToAdd,
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

  public removeFriends(personGuid: string, itemsToRemove: ListItem[]): Observable<any> {
    const url = environment.apiUrl + '/api/v1/person/friends/remove/' + personGuid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<ListItem[]>(url,
        itemsToRemove,
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

  // SUPPLEMENTAL

  public getStateDropDownOptions(): Observable<string[]> {
    const url = environment.apiUrl + '/api/v1/person/state-list';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<string[]>(url,
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

  public setNameSearchValue(val) {
    this.nameSearchValue = val;
  }

  public getNameSearchValue() {
    return this.nameSearchValue;
  }

  public setStateSearchValue(val) {
    this.stateSearchValue = val;
  }

  public getStateSearchValue() {
    return this.stateSearchValue;
  }

}
