import { Component, HostListener, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { RealityTrackerService } from '../../reality-tracker.service';
import { EventService } from '../../../../../../../@tqp/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { CrudDetailEditDialogComponent } from '../../../crud/crud-detail-edit-dialog/crud-detail-edit-dialog.component';
import { Series } from '../../reality-tracker-models/Series';
import { Season } from '../../reality-tracker-models/Season';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})
export class SeriesDetailComponent implements OnInit {
  public pageSource: string;
  public series: Series;
  public dialogRef: any;

  public seasonList: Season[];
  public records: Season[] = [];
  public dataSource: Season[] = [];
  public displayedColumns: string[] = [
    'name',
    'startDate'
  ];

  constructor(private route: ActivatedRoute,
              private realityTrackerService: RealityTrackerService,
              private eventService: EventService,
              private router: Router,
              public _matDialog: MatDialog) {
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
    this.realityTrackerService.getSeriesDetail(guid).subscribe(
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
    this.realityTrackerService.getSeasonListBySeriesGuid(seriesGuid).subscribe(
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
    this.router.navigate(['reality-tracker/series-detail-edit', this.series.guid]).then();
  }

  public openSeasonDetailPage(row: Season): void {
    this.router.navigate(['reality-tracker/season-detail', row.guid]).then();
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
