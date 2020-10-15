import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { environment } from '../../../../../environments/environment';
import { Score } from './Score';
import { PickChart } from './PickChart';
import { BestPick } from './BestPick';

@Injectable({
  providedIn: 'root'
})
export class RealityCompetitionService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public getMyCurrentScore(teamKey: string, userKey: string): Observable<Score> {
    const url = environment.apiUrl + '/api/v1/reality/my-current-score/' + teamKey + '/' + userKey;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Score>(url, {
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

  public getMyProjectedScore(teamKey: string, userKey: string): Observable<Score> {
    const url = environment.apiUrl + '/api/v1/reality/my-projected-score/' + teamKey + '/' + userKey;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Score>(url, {
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

  public getCurrentScores(teamKey: string): Observable<Score[]> {
    const url = environment.apiUrl + '/api/v1/reality/current-scores/' + teamKey;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Score[]>(url, {
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

  public getProjectedScores(teamKey: string): Observable<Score[]> {
    const url = environment.apiUrl + '/api/v1/reality/projected-scores/' + teamKey;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Score[]>(url, {
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

  public getPickChartData(teamKey: string, userKey: String): Observable<PickChart[]> {
    const url = environment.apiUrl + '/api/v1/reality/chart/' + teamKey + '/' + userKey;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<PickChart[]>(url, {
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

  public getBestPicks(teamKey: string, userKey: String): Observable<BestPick[]> {
    const url = environment.apiUrl + '/api/v1/reality/best-picks/' + teamKey + '/' + userKey;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<BestPick[]>(url, {
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

  public getBestPicksAgainst(teamKey: string, userKey: String, againstUserKey: string): Observable<BestPick[]> {
    const url = environment.apiUrl + '/api/v1/reality/best-picks-against/' + teamKey + '/' + userKey + '/' + againstUserKey;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<BestPick[]>(url, {
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

  public getStayData(teamKey: string, userKey: String): Observable<Score[]> {
    const url = environment.apiUrl + '/api/v1/reality/root-to-stay/' + teamKey + '/' + userKey;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Score[]>(url, {
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

  public getLeaveData(teamKey: string, userKey: String): Observable<Score[]> {
    const url = environment.apiUrl + '/api/v1/reality/root-to-leave/' + teamKey + '/' + userKey;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Score[]>(url, {
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

  public getInconsequentialData(teamKey: string, userKey: String): Observable<Score[]> {
    const url = environment.apiUrl + '/api/v1/reality/inconsequential/' + teamKey + '/' + userKey;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Score[]>(url, {
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

  // public getPickChartDataFromJson(): Observable<PickChart[]> {
  //   return this.http.get<PickChart[]>('assets/data/realityData.json',
  //     {
  //       observe: 'response',
  //       params: {}
  //     })
  //     .pipe(
  //       map(res => {
  //         return res.body;
  //       })
  //     );
  // }
}
