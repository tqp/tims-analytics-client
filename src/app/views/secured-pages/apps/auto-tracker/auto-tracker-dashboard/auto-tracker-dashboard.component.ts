import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities';
import { Fill } from '../auto-tracker-models/Fill';
import { KeyValue } from '@tqp/models/KeyValue';
import { AutoTrackerDashboardService } from './auto-tracker-dashboard.service';

@Component({
  selector: 'app-auto-tracker-dashboard',
  templateUrl: './auto-tracker-dashboard.component.html',
  styleUrls: ['./auto-tracker-dashboard.component.css']
})
export class AutoTrackerDashboardComponent implements OnInit {
  public statCostPerMile: string;
  public statLongestDistanceBetweenFills: string;
  public statLongestDistanceBetweenFillsLoading = false;
  public statLongestTimeBetweenFills: string;
  public statLongestTimeBetweenFillsLoading = false;
  public statEstimated1kDate: string;
  public statEstimated1kDateLoading = false;

  public odometerChartLabels: any;
  public odometerChartData: Array<any> = [];
  public odometerChartLegend = false;
  public odometerChartOptions: any = {};
  public odometerChartColors: Array<any> = [];

  public mpgChartLabels: any;
  public mpgChartData: Array<any> = [];
  public mpgChartLegend = false;
  public mpgChartOptions: any = {};
  public mpgChartColors: Array<any> = [];

  constructor(protected autoTrackerDashboardService: AutoTrackerDashboardService) {
  }

  ngOnInit(): void {
    this.getCostPerMile();
    this.getLongestTimeBetweenFills();
    this.getLongestDistanceBetweenFills();
    this.getEstimated1kDate();

    this.drawOdometerChart();
    this.drawMpgChart();
  }

  private getCostPerMile() {
    this.statCostPerMile = 'TBD';
  }

  private getLongestTimeBetweenFills() {
    this.statLongestTimeBetweenFillsLoading = true;
    this.autoTrackerDashboardService.getLongestTimeBetweenFills().subscribe(
      (result: KeyValue) => {
        // console.log('result', result);
        this.statLongestTimeBetweenFills = result.value + ' Days';
        this.statLongestTimeBetweenFillsLoading = false;
      },
      error => {
        console.error('Error: ' + error.message);
        this.statLongestTimeBetweenFillsLoading = false;
      }
    );
  }

  private getLongestDistanceBetweenFills() {
    this.statLongestDistanceBetweenFillsLoading = true;
    this.autoTrackerDashboardService.getLongestDistanceBetweenFills().subscribe(
      (result: KeyValue) => {
        // console.log('result', result);
        this.statLongestDistanceBetweenFills = result.value + ' Miles';
        this.statLongestDistanceBetweenFillsLoading = false;
      },
      error => {
        console.error('Error: ' + error.message);
        this.statLongestDistanceBetweenFillsLoading = false;
      }
    );
  }

  private getEstimated1kDate() {
    this.statEstimated1kDateLoading = true;
    this.autoTrackerDashboardService.getEstimated1kDate().subscribe(
      (result: KeyValue) => {
        // console.log('result', result);
        this.statEstimated1kDate = result.value;
        this.statEstimated1kDateLoading = false;
      },
      error => {
        console.error('Error: ' + error.message);
        this.statEstimated1kDateLoading = false;
      }
    );
  }

  public drawOdometerChart() {
    this.autoTrackerDashboardService.getOdometerData().subscribe(
      (result: any) => {
        this.odometerChartLabels = result.map(res => res.key);
        this.odometerChartData = [
          {
            data: result.map(res => res.value),
            label: 'Odometer'
          }
        ];
        this.setOdometerChartOptions();
      },
      error => {
        console.error('Error: ' + error.message);
      }
    );
  }

  private setOdometerChartOptions(): void {
    this.odometerChartColors = [
      {
        backgroundColor: hexToRgba(getStyle('--info'), 10),
        borderColor: getStyle('--info'),
        pointHoverBackgroundColor: '#fff'
      }
    ];

    this.odometerChartOptions = {
      responsive: true,
      responsiveAnimationDuration: 0,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridlines: {
            drawOnChartArea: false
          },
          type: 'time'
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Odometer'
      }
    };
  }

  public drawMpgChart() {
    this.autoTrackerDashboardService.getMpgData().subscribe(
      (result: any) => {
        let mpgResult: Fill[] = [];
        mpgResult = result
          .map(item => {
            const fuelFill: Fill = {};
            fuelFill.fillDate = item.key;
            fuelFill.fillMilesPerGallon = item.value;
            return fuelFill;
          });
        this.mpgChartLabels = mpgResult.map(res => res.fillDate);
        this.mpgChartData = [
          {
            data: mpgResult.map(res => res.fillMilesPerGallon),
            label: 'MPG'
          }
        ];
        this.setMpgOptions();
      },
      error => {
        console.error('Error: ' + error.message);
      }
    );
  }

  private setMpgOptions(): void {
    this.mpgChartColors = [
      {
        backgroundColor: hexToRgba(getStyle('--info'), 10),
        borderColor: getStyle('--info'),
        pointHoverBackgroundColor: '#fff'
      }
    ];

    this.mpgChartOptions = {
      responsive: true,
      responsiveAnimationDuration: 0,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridlines: {
            drawOnChartArea: false
          },
          type: 'time'
        }],
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      elements: {
        line: {
          borderWidth: 2
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Miles per Gallon'
      }
    };
  }
}
