import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from '@tqp/services/auth.service';
import { Series } from '../Series';
import { Season } from '../../season/Season';
import { SeasonCreateDialogComponent } from '../../season/season-create-dialog/season-create-dialog.component';
import { EpisodeCreateDialogComponent } from '../../episode/episode-create-dialog/episode-create-dialog.component';
import { SeriesService } from '../series.service';
import { SeasonService } from '../../season/season.service';

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
  public episodeCreateDialogRef: MatDialogRef<EpisodeCreateDialogComponent>;

  public validationMessages = {
    'seriesGuid': [
      {type: 'required', message: 'A GUID is required'}
    ],
    'seriesName': [
      {type: 'required', message: 'A Series Name is required'}
    ],
    'seriesAbbreviation': [
      {type: 'required', message: 'An Abbreviation is required'}
    ]
  };

  constructor(private route: ActivatedRoute,
              public authService: AuthService,
              private seriesService: SeriesService,
              private seasonService: SeasonService,
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
      seriesGuid: new FormControl(''),
      seriesName: new FormControl('', Validators.required),
      seriesAbbreviation: new FormControl('', Validators.required),
    });
  }

  private getSeriesDetail(guid: string): void {
    this.seriesService.getSeriesDetail(guid).subscribe(
      response => {
        this.series = response;
        // console.log('response', response);
        this.seriesEditForm.controls['seriesGuid'].patchValue(this.series.seriesGuid);
        this.seriesEditForm.controls['seriesName'].patchValue(this.series.seriesName);
        this.seriesEditForm.controls['seriesAbbreviation'].patchValue(this.series.seriesAbbreviation);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public delete(seriesGuid: string): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.seriesService.deleteSeries(seriesGuid).subscribe(
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
      this.seriesService.createSeries(series).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['reality-tracker/series-detail', response.seriesGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.seriesService.updateSeries(series).subscribe(
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

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'd') {
      event.preventDefault();
      this.delete(this.series.seriesGuid);
    }
    // if (event.ctrlKey && event.key === 's') {
    //   // console.log('s', this.createNewSeasonDialogRef.getState());
    //   if (!this.seasonCreateDialogRef || this.seasonCreateDialogRef.getState() === 2) {
    //     this.save();
    //   }
    //   event.preventDefault();
    // }
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
      this.cancel();
    }
  }

}
