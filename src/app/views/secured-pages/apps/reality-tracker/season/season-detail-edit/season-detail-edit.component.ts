import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { SeasonCreateDialogComponent } from '../season-create-dialog/season-create-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../../../../../@tqp/services/auth.service';
import { RealityTrackerService } from '../../reality-tracker.service';
import { Season } from '../../reality-tracker-models/Season';
import { Player } from '../../reality-tracker-models/Player';

@Component({
  selector: 'app-season-detail-edit',
  templateUrl: './season-detail-edit.component.html',
  styleUrls: ['./season-detail-edit.component.css']
})
export class SeasonDetailEditComponent implements OnInit {
  public pageSource: string;
  public newRecord: boolean;
  public season: Season;
  public seasonEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public createNewSeasonDialogRef: MatDialogRef<SeasonCreateDialogComponent>;

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
      {type: 'required', message: 'A Season Name is required'}
    ],
    'abbreviation': [
      {type: 'required', message: 'An Abbreviation is required'}
    ],
    'seriesName': [
      {type: 'required', message: 'A Series Name is required'}
    ],
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
        const seasonGuid = params['guid'];
        // console.log('seasonGuid', seasonGuid);
        this.getSeasonDetail(seasonGuid);
        this.getPlayerListBySeasonGuid(seasonGuid);
      } else {
        // Create new Person
        this.newRecord = true;
        this.season = new Season();
        this.season.seasonGuid = null;
      }
    }).then();
  }

  private initializeForm(): void {
    this.seasonEditForm = this.formBuilder.group({
      guid: new FormControl(''),
      name: new FormControl('', Validators.required),
      abbreviation: new FormControl('', Validators.required),
      seriesName: new FormControl('', Validators.required),
    });
  }

  private getSeasonDetail(guid: string): void {
    this.realityTrackerService.getSeasonDetail(guid).subscribe(
      response => {
        this.season = response;
        // console.log('response', response);
        this.seasonEditForm.controls['guid'].patchValue(this.season.seasonGuid);
        this.seasonEditForm.controls['name'].patchValue(this.season.seasonName);
        this.seasonEditForm.controls['abbreviation'].patchValue(this.season.seasonAbbreviation);
        this.seasonEditForm.controls['seriesName'].patchValue(this.season.seriesName);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getPlayerListBySeasonGuid(seasonGuid: string): void {
    this.realityTrackerService.getPlayerListBySeasonGuid(seasonGuid).subscribe(
      (playerList: Player[]) => {
        console.log('playerList', playerList);
        playerList.forEach(item => {
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

  public openPlayerDetailPage(row: Player): void {
    this.router.navigate(['reality-tracker/player-detail', row.playerGuid]).then();
  }

  public delete(seasonGuid: string): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.realityTrackerService.deleteSeason(seasonGuid).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['reality-tracker/season-list']).then();
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
    const season = new Season();
    season.seasonGuid = this.seasonEditForm.value.guid;
    season.seasonName = this.seasonEditForm.value.name;
    season.seasonAbbreviation = this.seasonEditForm.value.abbreviation;
    if (this.newRecord) {
      this.realityTrackerService.createSeason(season).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['reality-tracker/season-detail', response.seasonGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.realityTrackerService.updateSeason(season).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['reality-tracker/season-detail', response.seasonGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.season.seasonGuid) {
      this.router.navigate(['reality-tracker/season-detail', this.season.seasonGuid]).then();
    } else {
      this.router.navigate(['reality-tracker/season-list']).then();
    }
  }

  public openSeasonDetailPage(row: Season): void {
    this.router.navigate(['reality-tracker/season-detail', row.seasonGuid]).then();
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
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
      this.delete(this.season.seasonGuid);
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
