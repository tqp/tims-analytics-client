import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { ListAddRemoveOutputObject } from '@tqp/models/ListAddRemoveOutputObject';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '@tqp/services/auth.service';
import { Contestant } from '../../reality-tracker-models/Contestant';
import { RealityTrackerService } from '../../reality-tracker.service';
import { Season } from '../../reality-tracker-models/Season';
import { Player } from '../../reality-tracker-models/Player';
import { ContestantSeasonEditDialogComponent } from '../contestant-season-edit-dialog/contestant-season-edit-dialog.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-contestant-detail-edit',
  templateUrl: './contestant-detail-edit.component.html',
  styleUrls: ['./contestant-detail-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContestantDetailEditComponent implements OnInit {
  @ViewChild('lastNameInputField', {static: false}) lastNameInputField: ElementRef;
  public pageSource: string;
  public newRecord: boolean;
  public contestant: Contestant;
  public contestantEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  bsValue: Date = new Date();

  // Season List
  public seasonList: Season[];
  public records: Season[] = [];
  public dataSource: Season[] = [];
  public displayedColumns: string[] = [
    'name'
  ];

  // Contestant-Season Dialog
  public listAddRemoveOutputObject: ListAddRemoveOutputObject = {};

  public validationMessages = {
    'lastName': [
      {type: 'required', message: 'A Last Name is required'}
    ],
    'firstName': [
      {type: 'required', message: 'A First Name is required'}
    ],
    'nickname': [],
    'gender': [
      {type: 'required', message: 'A Gender is required'}
    ],
    'dateOfBirth': [],
    'occupation': [],
    'hometownCity': [],
    'hometownState': [],
    'twitterHandle': [],
    'guid': [
      {type: 'required', message: 'A GUID is required'}
    ],
    'comments': []
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
        const contestantGuid = params['guid'];
        // console.log('contestantGuid', contestantGuid);
        this.getContestantDetail(contestantGuid);
        this.getSeasonListByContestantGuid(contestantGuid);
      } else {
        // Create new Person
        this.newRecord = true;
        this.contestant = new Contestant();
        this.contestant.contestantGuid = null;

        setTimeout(() => {
          this.lastNameInputField.nativeElement.focus();
        }, 0);
      }
    }).then();
  }

  private initializeForm(): void {
    this.contestantEditForm = this.formBuilder.group({
      guid: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      nickname: new FormControl(''),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl(''),
      occupation: new FormControl(''),
      hometownCity: new FormControl(''),
      hometownState: new FormControl(''),
      twitterHandle: new FormControl(''),
      comments: new FormControl('')
    });
  }

  private getContestantDetail(guid: string): void {
    this.realityTrackerService.getContestantDetail(guid).subscribe(
      response => {
        this.contestant = response;
        // console.log('response', response);
        this.contestantEditForm.controls['guid'].patchValue(this.contestant.contestantGuid);
        this.contestantEditForm.controls['lastName'].patchValue(this.contestant.contestantLastName);
        this.contestantEditForm.controls['firstName'].patchValue(this.contestant.contestantFirstName);
        this.contestantEditForm.controls['nickname'].patchValue(this.contestant.contestantNickname);
        this.contestantEditForm.controls['gender'].patchValue(this.contestant.contestantGender);
        this.contestantEditForm.controls['dateOfBirth'].patchValue(this.contestant.contestantDateOfBirth);
        this.contestantEditForm.controls['occupation'].patchValue(this.contestant.occupation);
        this.contestantEditForm.controls['hometownCity'].patchValue(this.contestant.hometownCity);
        this.contestantEditForm.controls['hometownState'].patchValue(this.contestant.hometownState);
        this.contestantEditForm.controls['twitterHandle'].patchValue(this.contestant.contestantTwitterHandle);
        this.contestantEditForm.controls['comments'].patchValue(this.contestant.contestantComments);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getSeasonListByContestantGuid(contestantGuid: string): void {
    this.realityTrackerService.getSeasonListByContestantGuid(contestantGuid).subscribe(
      (playerList: Player[]) => {
        this.records = [];
        // console.log('playerList', playerList);
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

  public openSeasonDetailPage(player: Player): void {
    this.router.navigate(['reality-tracker/player-detail', player.playerGuid]).then();
  }

  public openContestantSeasonEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.contestant.contestantGuid;
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(ContestantSeasonEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      // console.log('dialogData', dialogData);
      this.listAddRemoveOutputObject = dialogData;
      if ((this.listAddRemoveOutputObject.itemsToAdd && this.listAddRemoveOutputObject.itemsToAdd.length > 0) ||
        (this.listAddRemoveOutputObject.itemsToRemove && this.listAddRemoveOutputObject.itemsToRemove.length > 0)) {
        // We'll use forkJoin to ensure that we don't redirect the page until both updates have completed.
        const first = this.realityTrackerService.addSeasonsToContestant(this.contestant.contestantGuid, this.listAddRemoveOutputObject.itemsToAdd);
        const second = this.realityTrackerService.removeSeasonsFromContestant(this.contestant.contestantGuid, this.listAddRemoveOutputObject.itemsToRemove);
        forkJoin([first, second]).subscribe(
          next => {
            // console.log(next);
            // console.log('Refresh.');
            this.getSeasonListByContestantGuid(this.contestant.contestantGuid);
          },
          error => console.log(error)
        );
      } else {
        console.log('No changes made.');
      }
    });
  }

  public delete(contestantGuid: string): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.realityTrackerService.deleteContestant(contestantGuid).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['reality-tracker/contestant-list']).then();
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
    const contestant = new Contestant();
    // console.log('crudEditForm', this.contestantEditForm.value);
    contestant.contestantGuid = this.contestantEditForm.value.guid;
    contestant.contestantLastName = this.contestantEditForm.value.lastName;
    contestant.contestantFirstName = this.contestantEditForm.value.firstName;
    contestant.contestantNickname = this.contestantEditForm.value.nickname;
    contestant.contestantGender = this.contestantEditForm.value.gender;
    contestant.contestantDateOfBirth = this.contestantEditForm.value.dateOfBirth;
    contestant.occupation = this.contestantEditForm.value.occupation;
    contestant.hometownCity = this.contestantEditForm.value.hometownCity;
    contestant.hometownState = this.contestantEditForm.value.hometownState;
    contestant.contestantTwitterHandle = this.contestantEditForm.value.twitterHandle;
    contestant.contestantComments = this.contestantEditForm.value.comments;

    if (this.newRecord) {
      this.realityTrackerService.createContestant(contestant).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['reality-tracker/contestant-detail', response.contestantGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.realityTrackerService.updateContestant(contestant).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['reality-tracker/contestant-detail', response.contestantGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.contestant.contestantGuid) {
      this.router.navigate(['reality-tracker/contestant-detail', this.contestant.contestantGuid]).then();
    } else {
      this.router.navigate(['reality-tracker/contestant-list']).then();
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
      this.delete(this.contestant.contestantGuid);
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
