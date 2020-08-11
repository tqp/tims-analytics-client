import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '@tqp/services/token.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AutoTrackerDashboardService {

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
  }

  // SUPPORT METHODS

  public getFillHistory(): Observable<any> {
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get(environment.apiUrl + '/api/v1/auto-tracker/dashboard/history', {headers: this.tokenService.setAuthorizationHeader(token)});
    } else {
      console.error('No token was present.');
      return null;
    }
  }
}
