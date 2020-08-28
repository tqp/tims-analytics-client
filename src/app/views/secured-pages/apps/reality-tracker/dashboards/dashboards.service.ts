import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chart } from './user-dashboard/Chart';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  constructor(private http: HttpClient) {
  }

  public getChartData1(): Observable<Chart[]> {
    return this.http.get<Chart[]>('assets/data/realityData.json',
      {
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
