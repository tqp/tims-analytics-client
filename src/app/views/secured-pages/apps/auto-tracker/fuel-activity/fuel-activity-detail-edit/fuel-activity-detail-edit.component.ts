import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../../../../../@tqp/services/auth.service';
import { FuelActivity } from '../../auto-tracker-models/FuelActivity';
import { FuelActivityService } from '../fuel-activity.service';
import { Fill } from '../../auto-tracker-models/Fill';
import { Station } from '../../auto-tracker-models/Station';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-fuel-activity-detail-edit',
  templateUrl: './fuel-activity-detail-edit.component.html',
  styleUrls: ['./fuel-activity-detail-edit.component.css']
})
export class FuelActivityDetailEditComponent implements OnInit {
  @ViewChild('fillDateInputField', {static: false}) fillDateInputField: ElementRef;
  public action: string;
  public pageSource: string;
  public newRecord: boolean;
  public fuelActivity: FuelActivity;
  public fill: Fill;
  public station: Station;
  public fuelActivityLoaded = false;
  public fuelActivityEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  bsValue: Date = new Date();

  public stationNameAutoCompleteOptions: Observable<any[]>;

  public validationMessages = {
    // Fill
    'fillGuid': [],
    'fillDate': [
      {type: 'required', message: 'A Date is required'}
    ],
    'fillOdometer': [
      {type: 'required', message: 'An Odometer value is required'}
    ],
    'fillGallons': [
      {type: 'required', message: 'Gallons is required'}
    ],
    'fillCostPerGallon': [
      {type: 'required', message: 'Cost per Gallon is required'}
    ],
    'fillTotalCost': [
      {type: 'required', message: 'Total Cost is required'}
    ],
    'fillMilesTraveled': [
      {type: 'required', message: 'Miles Traveled is required'}
    ],
    'fillMilesPerGallon': [
      {type: 'required', message: 'Miles per Gallon is required'}
    ],
    'fillComments': [],
    // Station
    'stationGuid': [],
    'stationName': [],
    'stationAffiliation': [],
    'stationAddress': [],
    'stationCity': [],
    'stationState': [],
    'stationZip': [],
    'stationPhone': []
  };

  constructor(private route: ActivatedRoute,
              public authService: AuthService,
              private fuelActivityService: FuelActivityService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Create empty objects
    this.fill = new Fill({});
    this.station = new Station({});

    this.createStationNameListener();

    // Determine if this is a 'create' or an 'edit' action
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        this.action = 'edit';
        const fuelActivityGuid = params['guid'];
        // console.log('fuelActivityGuid', fuelActivityGuid);
        this.getFuelActivityDetail(fuelActivityGuid);
      } else {
        this.action = 'create';
        this.newRecord = true;
        this.fuelActivity = new FuelActivity();
        // this.fuelActivity.fill.fillGuid = null;

        // setTimeout(() => {
        //   this.lastNameInputField.nativeElement.focus();
        // }, 0);
      }
    }).then();
  }

  private initializeForm(): void {

    this.fuelActivityEditForm = this.formBuilder.group({
      fill: this.formBuilder.group({
        fillGuid: new FormControl(''),
        fillDate: new FormControl('', Validators.required),
        fillOdometer: new FormControl('', Validators.required),
        fillGallons: new FormControl('', Validators.required),
        fillCostPerGallon: new FormControl('', Validators.required),
        fillMilesTraveled: new FormControl('', Validators.required),
        fillMilesPerGallon: new FormControl('', Validators.required),
        fillTotalCost: new FormControl('', Validators.required),
        fillComments: new FormControl('')
      }),
      station: this.formBuilder.group({
        stationGuid: new FormControl(''),
        stationName: new FormControl('', Validators.required),
        stationAffiliation: new FormControl('', Validators.required),
        stationAddress: new FormControl('', Validators.required),
        stationCity: new FormControl('', Validators.required),
        stationState: new FormControl('', Validators.required),
        stationZip: new FormControl('', Validators.required),
        stationPhone: new FormControl(''),
      })
    });

  }

  private getFuelActivityDetail(guid: string): void {
    this.fuelActivityService.getFuelActivityDetail(guid).subscribe(
      response => {
        this.fuelActivity = response;
        // console.log('response', response);
        this.fuelActivityLoaded = true;

        const fillSubForm = this.fuelActivityEditForm.get('fill') as FormGroup;
        // fillSubForm.controls['stationGuid'].patchValue(this.fuelActivity.fill.stationGuid, {emitEvent: false});
        fillSubForm.controls['fillGuid'].patchValue(this.fuelActivity.fill.fillGuid);
        fillSubForm.controls['fillDate'].patchValue(this.fuelActivity.fill.fillDate);
        // fillSubForm.controls['fillTime'].patchValue(this.fuelActivity.fill.fillTime);
        fillSubForm.controls['fillOdometer'].patchValue(this.fuelActivity.fill.fillOdometer);
        fillSubForm.controls['fillMilesTraveled'].patchValue(this.fuelActivity.fill.fillMilesTraveled.toFixed(1));
        fillSubForm.controls['fillMilesPerGallon'].patchValue(this.fuelActivity.fill.fillMilesPerGallon.toFixed(1));
        fillSubForm.controls['fillGallons'].patchValue(this.fuelActivity.fill.fillGallons.toFixed(3));
        fillSubForm.controls['fillCostPerGallon'].patchValue(this.fuelActivity.fill.fillCostPerGallon.toFixed(3));
        fillSubForm.controls['fillTotalCost'].patchValue(this.fuelActivity.fill.fillTotalCost.toFixed(2));
        fillSubForm.controls['fillComments'].patchValue(this.fuelActivity.fill.fillComments);

        const stationSubForm = this.fuelActivityEditForm.get('station') as FormGroup;
        stationSubForm.controls['stationGuid'].patchValue(this.fuelActivity.station.stationGuid, {emitEvent: false});
        stationSubForm.controls['stationName'].patchValue(this.fuelActivity.station.stationName, {emitEvent: false});
        stationSubForm.controls['stationAffiliation'].patchValue(this.fuelActivity.station.stationAffiliation);
        stationSubForm.controls['stationAddress'].patchValue(this.fuelActivity.station.stationAddress);
        stationSubForm.controls['stationCity'].patchValue(this.fuelActivity.station.stationCity);
        stationSubForm.controls['stationState'].patchValue(this.fuelActivity.station.stationState);
        stationSubForm.controls['stationZip'].patchValue(this.fuelActivity.station.stationZip);
        stationSubForm.controls['stationPhone'].patchValue(this.fuelActivity.station.stationPhone);
      },
      error => {
        console.error('Error: ' + error.message);
      }
    );
  }

  get fillSubForm(): any {
    return this.fuelActivityEditForm.get('fill') as FormGroup;
  }

  get stationSubForm(): any {
    return this.fuelActivityEditForm.get('station') as FormGroup;
  }

  // AUTO-COMPLETE

  public createStationNameListener() {
    console.log('createStationNameListener', this.fuelActivityEditForm);

    this.fuelActivityEditForm.get('station').get('stationName').valueChanges.pipe(
      debounceTime(300)
    ).subscribe((value: string) => {
      if (value !== '') {
        return this.fuelActivityService.retrieveStationNameOptions(value.toLowerCase()).pipe(
          map(results => {
            console.log('results', results);
            return results;
          }),
          catchError(() => {
            return of(null);
          })
        );
      } else {
        return of(null);
      }
    });
  }

  // BUTTONS

  public delete(fuelActivityGuid: string): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fuelActivityService.deleteFuelActivity(fuelActivityGuid).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['reality-tracker/fuelActivity-list']).then();
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
    if (this.newRecord) {
      this.fuelActivityService.createFuelActivity(this.fuelActivityEditForm.getRawValue().fill).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['reality-tracker/fuelActivity-detail', response.fill.fillGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.fuelActivityService.updateFuelActivity(this.fuelActivityEditForm.getRawValue().fill).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['auto-tracker/fuel-activity-detail', response.fill.fillGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.fuelActivity.fill.fillGuid) {
      this.router.navigate(['auto-tracker/fuel-activity-detail', this.fuelActivity.fill.fillGuid]).then();
    } else {
      this.router.navigate(['auto-tracker/fuel-activity-list']).then();
    }
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.save();
    }
    if (event.key === 'Escape') {
      this.cancel();
    }
    if (event.ctrlKey && event.key === 'd') {
      event.preventDefault();
      this.delete(this.fuelActivity.fill.fillGuid);
    }
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      this.save();
    }
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
      this.cancel();
    }
  }

}
