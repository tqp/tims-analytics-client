import { Component, HostListener, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '@tqp/services/event.service';
import { Series } from '../Series';
import { Season } from '../../season/Season';
import { SeriesService } from '../series.service';
import { SeasonService } from '../../season/season.service';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})
export class SeriesDetailComponent implements OnInit {
  public pageSource: string;
  public series: Series;
  public dialogRef: any;

  // Season List
  public records: Season[] = [];
  public dataSource: Season[] = [];
  public displayedColumns: string[] = [
    'name'
  ];

  constructor(private route: ActivatedRoute,
              private seriesService: SeriesService,
              private seasonService: SeasonService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const seriesGuid = params['guid'];
        // console.log('seriesGuid', seriesGuid);
        this.getSeriesDetail(seriesGuid);
        this.getSeasonListBySeriesGuid(seriesGuid);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getSeriesDetail(guid: string): void {
    this.eventService.loadingEvent.emit(true);
    this.seriesService.getSeriesDetail(guid).subscribe(
      response => {
        this.series = response;
        // console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getSeasonListBySeriesGuid(seriesGuid: string): void {
    this.seasonService.getSeasonListBySeriesGuid(seriesGuid).subscribe(
      (seasonList: Season[]) => {
        // console.log('seasonList', seasonList);
        seasonList.forEach(item => {
          this.records.push(item);
        });
        this.dataSource = this.records;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public returnToList(): void {
    this.router.navigate(['reality-tracker/series-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['reality-tracker/series-detail-edit', this.series.seriesGuid]).then();
  }

  public openSeasonDetailPage(row: Season): void {
    this.router.navigate(['reality-tracker/season-detail', row.seasonGuid]).then();
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'e') {
      event.preventDefault();
      this.openEditPage();
    }
    if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();
      this.returnToList();
    }
  }

}
