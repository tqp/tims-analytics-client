import { Component, OnInit } from '@angular/core';
import { Chart } from './Chart';
import { DashboardsService } from '../dashboards.service';

export class Picks {
  public pickName: string;
  public round1?: string;
  public round2?: string;
}

const pickList: Picks[] = [
  {pickName: 'David', round1: 'Y', round2: 'Y'},
  {pickName: 'Nicole F.', round1: 'Y', round2: 'Y'},
  {pickName: 'Tyler', round1: 'Y', round2: 'Y'},
  {pickName: 'Nicole A.', round1: 'Y', round2: 'N'},
  {pickName: 'Cody', round1: 'Y', round2: 'Y'},
  {pickName: 'Christmas', round1: 'Y', round2: 'Y'},
  {pickName: 'Ian', round1: 'Y', round2: 'Y'},
  {pickName: 'Dani', round1: 'Y', round2: 'Y'},
  {pickName: 'Memphis', round1: 'Y', round2: 'Y'},
  {pickName: 'Kevin', round1: 'Y', round2: 'Y'},
  {pickName: 'Enzo', round1: 'Y', round2: 'Y'},
  {pickName: 'Kaysar', round1: 'Y', round2: 'Y'},
  {pickName: 'Bayleigh', round1: 'Y', round2: 'Y'},
  {pickName: 'Keesha', round1: 'N', round2: 'N'},
  {pickName: 'Da\'Vonne', round1: 'Y', round2: 'Y'},
  {pickName: 'Janelle', round1: 'Y', round2: 'Y'},
];

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  public records: Picks[] = [];
  public dataSource: Picks[] = [];
  public displayedColumns: string[] = [];

  public chartList: Chart[];

  // public displayedColumns: string[] = [
  //   'pickName',
  //   'round1',
  //   'round2',
  //   'round3',
  //   'round4'
  // ];

  constructor(private dashboardsService: DashboardsService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this.dashboardsService.getChartData1().subscribe(
      (chartData: Chart[]) => {
        console.log('chartData', chartData);
        chartData.map(item => item.position * 10);
        const maxRound = Math.max.apply(Math, chartData.map((o) => o.round));
        console.log('maxRound', maxRound);
        const maxPosition = Math.max.apply(Math, chartData.map((o) => o.position));
        console.log('maxPosition', maxPosition);
      }
    );
  }

  public isActive(activeStatus): string {
    // console.log('isActive', activeStatus);
    return activeStatus ? 'active' : '';
  }


}
