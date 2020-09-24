import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, max } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Chart } from './Chart';

@Injectable({
  providedIn: 'root'
})
export class RealityCompetitionService {

  constructor(private http: HttpClient) {
  }

  public getChartData(): Observable<Chart[]> {
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

  // public getChartData2(): Observable<Chart[]> {
  //   return this.http.get<Chart[]>('assets/data/realityData.json').pipe(
  //     max<Chart>((a: Chart, b: Chart) => a.position < b.position ? -1 : 1)
  //   );
  // }
}
