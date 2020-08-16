import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RealityTrackerService } from '../../reality-tracker.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from '@tqp/services/auth.service';
import { Series } from '../../reality-tracker-models/Series';
import { Season } from '../../reality-tracker-models/Season';
import { SeasonCreateDialogComponent } from '../../season/season-create-dialog/season-create-dialog.component';

@Component({
  selector: 'app-series-detail-edit',
  templateUrl: './series-detail-edit.component.html',
  styleUrls: ['./series-detail-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SeriesDetailEditComponent implements OnInit {
  public pageSource: string;
  public newRecord: boolean;
  public series: Series;
  public seriesEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public createNewSeasonDialogRef: MatDialogRef<SeasonCreateDialogComponent>;

  // Season List
  public seasonList: Season[];
  public records: Season[] = [];
  public dataSource: Season[] = [];
  public displayedColumns: string[] = [
    'name'
  ];

  public validationMessages = {
    'guid': [
      {type: 'required', message: 'A GUID is required'}
    ],
    'name': [
      {type: 'required', message: 'A Series Name is required'}
    ],
    'abbreviation': [
      {type: 'required', message: 'An Abbreviation is required'}
    ]
  };

  constructor(private route: ActivatedRoute,
              public authService: AuthService,
              private realityTrackerService: RealityTrackerService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const seriesGuid = params['guid'];
        // console.log('seriesGuid', seriesGuid);
        this.getSeriesDetail(seriesGuid);
        this.getSeasonListBySeriesGuid(seriesGuid);
      } else {
        // Create new Person
        this.newRecord = true;
        this.series = new Series();
        this.series.seriesGuid = null;
      }
    }).then();
  }

  private initializeForm(): void {
    this.seriesEditForm = this.formBuilder.group({
      guid: new FormControl(''),
      name: new FormControl('', Validators.required),
      abbreviation: new FormControl('', Validators.required),
    });
  }

  private getSeriesDetail(guid: string): void {
    this.realityTrackerService.getSeriesDetail(guid).subscribe(
      response => {
        this.series = response;
        // console.log('response', response);
        this.seriesEditForm.controls['guid'].patchValue(this.series.seriesGuid);
        this.seriesEditForm.controls['name'].patchValue(this.series.seriesName);
        this.seriesEditForm.controls['abbreviation'].patchValue(this.series.seriesAbbreviation);
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
        this.records = [];
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

  // BUTTONS

  public openCreateSeasonDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {seriesGuid: this.series.seriesGuid, seriesName: this.series.seriesName};
    dialogConfig.autoFocus = false;
    this.createNewSeasonDialogRef = this._matDialog.open(SeasonCreateDialogComponent, dialogConfig);

    this.createNewSeasonDialogRef.afterClosed().subscribe(dialogData => {
      if (dialogData) {
        const season = new Season();
        season.seriesGuid = dialogData.seriesGuid;
        season.seasonName = dialogData.name;
        this.realityTrackerService.createSeason(season).subscribe(
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

  public delete(seriesGuid: string): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.realityTrackerService.deleteSeries(seriesGuid).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['reality-tracker/series-list']).then();
          },
          error => {
            console.error('Error: ' + error.message);
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }

  public save(): void {
    const series = new Series();
    series.seriesGuid = this.seriesEditForm.value.guid;
    series.seriesName = this.seriesEditForm.value.name;
    series.seriesAbbreviation = this.seriesEditForm.value.abbreviation;
    if (this.newRecord) {
      this.realityTrackerService.createSeries(series).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['reality-tracker/series-detail', response.seriesGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.realityTrackerService.updateSeries(series).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['reality-tracker/series-detail', response.seriesGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.series.seriesGuid) {
      this.router.navigate(['reality-tracker/series-detail', this.series.seriesGuid]).then();
    } else {
      this.router.navigate(['reality-tracker/series-list']).then();
    }
  }

  public openSeasonDetailPage(row: Season): void {
    this.router.navigate(['reality-tracker/season-detail', row.seasonGuid]).then();
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'a') {
      event.preventDefault();
      this.openCreateSeasonDialog();
    }
    if (event.key === 'Enter') {
      if (!this.createNewSeasonDialogRef) {
        this.save();
      }
    }
    if (event.key === 'Escape') {
      if (!this.createNewSeasonDialogRef) {
        this.cancel();
      }
    }
    if (event.ctrlKey && event.key === 'd') {
      event.preventDefault();
      this.delete(this.series.seriesGuid);
    }
    if (event.ctrlKey && event.key === 's') {
      // console.log('s', this.createNewSeasonDialogRef.getState());
      if (!this.createNewSeasonDialogRef || this.createNewSeasonDialogRef.getState() === 2) {
        this.save();
      }
      event.preventDefault();
    }
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
      this.cancel();
    }
  }

}
