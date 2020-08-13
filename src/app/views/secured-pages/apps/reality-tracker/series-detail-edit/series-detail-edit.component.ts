import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RealityTrackerService } from '../reality-tracker.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../../../../../@tqp/services/auth.service';
import { Series } from '../reality-tracker-models/Series';

@Component({
  selector: 'app-series-detail-edit',
  templateUrl: './series-detail-edit.component.html',
  styleUrls: ['./series-detail-edit.component.css']
})
export class SeriesDetailEditComponent implements OnInit {
  public pageSource: string;
  public newRecord: boolean;
  public series: Series;
  public seriesEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  public validationMessages = {
    'name': [
      {type: 'required', message: 'A Series Name is required'}
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
        const guid = params['guid'];
        // console.log('guid', guid);
        this.getSeriesDetail(guid);
      } else {
        // Create new Person
        this.newRecord = true;
        this.series = new Series();
        this.series.guid = null;
      }
    }).then();

    const src = this.route
      .queryParams
      .subscribe(params => {
        this.pageSource = params.src;
      });
  }

  private initializeForm(): void {
    this.seriesEditForm = this.formBuilder.group({
      guid: new FormControl(''),
      name: new FormControl('', Validators.required),
    });
  }

  private getSeriesDetail(guid: string): void {
    this.realityTrackerService.getSeriesDetail(guid).subscribe(
      response => {
        this.series = response;
        // console.log('response', response);
        this.seriesEditForm.controls['guid'].patchValue(this.series.guid);
        this.seriesEditForm.controls['name'].patchValue(this.series.name);
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
    series.guid = this.seriesEditForm.value.guid;
    series.name = this.seriesEditForm.value.name;
    if (this.newRecord) {
      this.realityTrackerService.createSeries(series).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['reality-tracker/series-detail', response.guid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.realityTrackerService.updateSeries(series).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['reality-tracker/series-detail', response.guid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.series.guid) {
      this.router.navigate(['reality-tracker/series-detail', this.series.guid]).then();
    } else {
      this.router.navigate(['reality-tracker/series-list']).then();
    }
  }

}
