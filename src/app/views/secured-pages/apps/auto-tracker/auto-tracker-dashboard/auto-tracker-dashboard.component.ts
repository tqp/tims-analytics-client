import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities';
import { AutoTrackerService } from '../auto-tracker.service';
import { FuelFill } from '../auto-tracker-models/FuelFill';
import { KeyValue } from '../../../../../../@tqp/models/KeyValue';

@Component({
  selector: 'app-auto-tracker-dashboard',
  templateUrl: './auto-tracker-dashboard.component.html',
  styleUrls: ['./auto-tracker-dashboard.component.css']
})
export class AutoTrackerDashboardComponent implements OnInit {
  public statLongestDistance: string;
  public statCostPerMile: string;
  public statLongestTimeBetweenFills: string;
  public statEstimated1kDate: string;

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

  constructor(protected autoTrackerService: AutoTrackerService) {
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
    this.statCostPerMile = '$1.25';
  }

  private getLongestTimeBetweenFills() {
    this.statLongestTimeBetweenFills = '25 Days';
    this.autoTrackerService.getLongestTimeBetweenFills().subscribe(
      (result: KeyValue) => {
        // console.log('result', result);
        this.statLongestTimeBetweenFills = result.value + ' Miles';
      },
      error => {
        console.error('Error: ' + error.message);
      }
    );
  }

  private getLongestDistanceBetweenFills() {
    this.autoTrackerService.getLongestDistanceBetweenFills().subscribe(
      (result: KeyValue) => {
        // console.log('result', result);
        this.statLongestDistance = result.value + ' Miles';
      },
      error => {
        console.error('Error: ' + error.message);
      }
    );
  }

  private getEstimated1kDate() {
    this.autoTrackerService.getEstimated1kDate().subscribe(
      (result: KeyValue) => {
        // console.log('result', result);
        this.statEstimated1kDate = result.value;
      },
      error => {
        console.error('Error: ' + error.message);
      }
    );
  }

  public drawOdometerChart() {
    this.autoTrackerService.getOdometerData().subscribe(
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
    this.autoTrackerService.getMpgData().subscribe(
      (result: any) => {
        let mpgResult: FuelFill[] = [];
        mpgResult = result
          .map(item => {
            const fuelFill: FuelFill = {};
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
