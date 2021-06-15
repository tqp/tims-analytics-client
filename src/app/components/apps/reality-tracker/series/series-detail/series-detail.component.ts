import { Component, HostListener, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '@tqp/services/event.service';
import { Series } from '../Series';
import { Season } from '../../season/Season';
import { SeriesService } from '../series.service';
import { SeasonService } from '../../season/season.service';
import { AuthService } from '../../../../../../@tqp/authentication/services/auth.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SeasonCreateDialogComponent } from '../../season/season-create-dialog/season-create-dialog.component';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})
export class SeriesDetailComponent implements OnInit {
  public pageSource: string;
  public series: Series;
  public dialogRef: any;
  public seasonCreateDialogRef: MatDialogRef<SeasonCreateDialogComponent>;

  // Season List
  public seasonListLoading: boolean = false;
  public seasonListRecords: Season[] = [];
  public seasonListDataSource: Season[] = [];
  public seasonListDisplayedColumns: string[] = [
    'seasonNumber',
    'seasonName'
  ];

  constructor(private route: ActivatedRoute,
              private seriesService: SeriesService,
              private seasonService: SeasonService,
              private eventService: EventService,
              private router: Router,
              public authService: AuthService,
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
    this.seasonListLoading = true;
    this.seasonService.getSeasonListBySeriesGuid(seriesGuid).subscribe(
      (seasonList: Season[]) => {
        // console.log('seasonList', seasonList);
        seasonList.forEach(item => {
          this.seasonListRecords.push(item);
        });
        this.seasonListDataSource = this.seasonListRecords;
        this.seasonListDataSource.sort((a, b) => a.seasonNumber - b.seasonNumber);
      },
      error => {
        console.error('Error: ', error);
      },
      () => {
        this.seasonListLoading = false;
      }
    );
  }

  public openCreateSeasonDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      seriesGuid: this.series.seriesGuid,
      seriesName: this.series.seriesName
    };
    dialogConfig.autoFocus = false;
    this.seasonCreateDialogRef = this._matDialog.open(SeasonCreateDialogComponent, dialogConfig);

    this.seasonCreateDialogRef.afterClosed().subscribe(dialogData => {
      if (dialogData) {
        const season = new Season();
        season.seriesGuid = dialogData.seriesGuid;
        season.seasonName = dialogData.name;
        this.seasonService.createSeason(season).subscribe(
          () => {
            this.getSeasonListBySeriesGuid(this.series.seriesGuid);
          },
          error => {
            console.error('Error: ' + error.message);
          }
        );
      }
    });
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
