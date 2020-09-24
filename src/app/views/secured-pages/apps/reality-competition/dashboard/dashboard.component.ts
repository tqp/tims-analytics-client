import { Component, OnInit } from '@angular/core';
import { RealityCompetitionService } from '../reality-competition.service';
import { Chart } from '../Chart';

export class Pick {
  public contestantName: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public roundCount: number;
  public records: Chart[] = [];
  public dataSource: Chart[] = [];
  public displayedColumns: string[] = [];

  constructor(private realityCompetitionService: RealityCompetitionService) {
  }

  ngOnInit(): void {
    this.realityCompetitionService.getChartData().subscribe(
      (chartData: Chart[]) => {
        this.displayedColumns.push('contestantKey');

        // Get chart stats
        this.roundCount = Math.max.apply(Math, chartData.map((o) => o.roundNumber));
        const maxPosition = Math.max.apply(Math, chartData.map((o) => o.position));
        // console.log('roundCount    :' , this.roundCount, '\nmaxPosition:', maxPosition);
        // console.log('chartData', chartData);

        for (let i = 1; i <= this.roundCount; i++) {
          this.displayedColumns.push('round' + i);
        }

        // Populate Table
        chartData.forEach(item => {
          this.records.push(item);
        });

        // Pivot Data
        const pivoted = chartData.reduce((prev, cur) => {
          const existing = prev.find(x => x.contestantKey === cur.contestantKey);
          if (existing) {
            existing.values.push(cur);
          } else {
            prev.push({
              contestantKey: cur.contestantKey,
              values: [cur]
            });
          }
          return prev;
        }, []);
        console.log('pivoted', pivoted);
        this.dataSource = pivoted;
      }
    );
  }

  public getCustomIcon(value: string): string {
    switch (value.toLowerCase()) {
      case 'correct':
        return 'fa fa-check';
      case 'wrong':
        return 'fa fa-close';
      case 'projected':
        return 'fa fa-question';
      default:
        return '';
    }
  }

  public getCustomClass(value: string): string {
    return value.toLowerCase();
  }

  public counter(i: number) {
    return new Array(i);
  }

  public isActive(activeStatus): string {
    console.log('isActive', activeStatus);
    return activeStatus ? 'active' : '';
  }

}
