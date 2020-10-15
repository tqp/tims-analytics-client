import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../../../../@tqp/services/http.service';
import { TokenService } from '../../../../../../@tqp/services/token.service';
import { FuelActivity } from '../auto-tracker-models/FuelActivity';
import { Observable } from 'rxjs';
import { Fill } from '../auto-tracker-models/Fill';
import { environment } from '../../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ServerSidePaginationRequest } from '@tqp/models/ServerSidePaginationRequest';
import { ServerSidePaginationResponse } from '@tqp/models/ServerSidePaginationResponse';
import { AutoExpense } from '../auto-tracker-models/AutoExpense';
import { ExpenseType } from '../auto-tracker-models/ExpenseType';

@Injectable({
  providedIn: 'root'
})
export class AutoExpenseService {
  private autoExpenseListNameSearchValue;

  constructor(private http: HttpClient,
              private httpService: HttpService,
              protected tokenService: TokenService) { }

  public createAutoExpense(autoExpense: AutoExpense): Observable<Fill> {
    const url = environment.apiUrl + '/api/v1/auto-tracker/auto-expense/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Fill>(url,
        autoExpense,
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

  public getAutoExpenseList_SSP(serverSideSearchParams: ServerSidePaginationRequest): Observable<ServerSidePaginationResponse> {
    const url = environment.apiUrl + '/api/v1/auto-tracker/auto-expense/ssp';
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

  public getAutoExpenseDetail(guid: string) {
    const url = environment.apiUrl + '/api/v1/auto-tracker/auto-expense/' + guid;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<AutoExpense>(url,
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

  public updateAutoExpense(autoExpense: AutoExpense): Observable<AutoExpense> {
    const url = environment.apiUrl + '/api/v1/auto-tracker/auto-expense/';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.put<AutoExpense>(url,
        autoExpense,
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

  public deleteAutoExpense(autoExpenseGuid: string): Observable<string> {
    const url = environment.apiUrl + '/api/v1/auto-tracker/auto-expense/' + autoExpenseGuid;
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

  // SUPPLEMENTAL

  public getExpenseTypeDropDownOptions(): Observable<ExpenseType[]> {
    const url = environment.apiUrl + '/api/v1/expense-type';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<ExpenseType[]>(url,
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

  public setAutoExpenseListNameSearchValue(val) {
    this.autoExpenseListNameSearchValue = val;
  }

  public getAutoExpenseListNameSearchValue() {
    return this.autoExpenseListNameSearchValue;
  }
}
