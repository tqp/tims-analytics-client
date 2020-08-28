import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { ListAddRemoveOutputObject } from '@tqp/models/ListAddRemoveOutputObject';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '@tqp/services/auth.service';
import { Contestant } from '../Contestant';
import { Season } from '../../season/Season';
import { Player } from '../../player/Player';
import { ContestantSeasonEditDialogComponent } from '../contestant-season-edit-dialog/contestant-season-edit-dialog.component';
import { forkJoin } from 'rxjs';
import { ContestantService } from '../contestant.service';
import { SeasonService } from '../../season/season.service';

import * as moment from 'moment';

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
    'name',
    'playerLink'
  ];

  // Contestant-Season Dialog
  public listAddRemoveOutputObject: ListAddRemoveOutputObject = {};

  public validationMessages = {
    'contestantGuid': [
      {type: 'required', message: 'A GUID is required'}
    ],
    'contestantLastName': [
      {type: 'required', message: 'A Last Name is required'}
    ],
    'contestantFirstName': [
      {type: 'required', message: 'A First Name is required'}
    ],
    'contestantNickname': [],
    'contestantGender': [
      {type: 'required', message: 'A Gender is required'}
    ],
    'contestantDateOfBirth': [],
    'contestantTwitterHandle': [],
    'contestantComments': []
  };

  constructor(private route: ActivatedRoute,
              public authService: AuthService,
              private contestantService: ContestantService,
              private seasonService: SeasonService,
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
      contestantGuid: new FormControl(''),
      contestantLastName: new FormControl('', Validators.required),
      contestantFirstName: new FormControl('', Validators.required),
      contestantNickname: new FormControl(''),
      contestantGender: new FormControl('', Validators.required),
      contestantDateOfBirth: new FormControl(''),
      contestantTwitterHandle: new FormControl(''),
      contestantComments: new FormControl('')
    });
  }

  private getContestantDetail(guid: string): void {
    this.contestantService.getContestantDetail(guid).subscribe(
      response => {
        this.contestant = response;
        // console.log('response', response);
        this.contestantEditForm.controls['contestantGuid'].patchValue(this.contestant.contestantGuid);
        this.contestantEditForm.controls['contestantLastName'].patchValue(this.contestant.contestantLastName);
        this.contestantEditForm.controls['contestantFirstName'].patchValue(this.contestant.contestantFirstName);
        this.contestantEditForm.controls['contestantNickname'].patchValue(this.contestant.contestantNickname);
        this.contestantEditForm.controls['contestantGender'].patchValue(this.contestant.contestantGender);
        this.contestantEditForm.controls['contestantDateOfBirth'].patchValue(moment(this.contestant.contestantDateOfBirth).format('MM/DD/YYYY'));
        this.contestantEditForm.controls['contestantTwitterHandle'].patchValue(this.contestant.contestantTwitterHandle);
        this.contestantEditForm.controls['contestantComments'].patchValue(this.contestant.contestantComments);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getSeasonListByContestantGuid(contestantGuid: string): void {
    this.seasonService.getSeasonListByContestantGuid(contestantGuid).subscribe(
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
        const first = this.seasonService.addSeasonsToContestant(this.contestant.contestantGuid, this.listAddRemoveOutputObject.itemsToAdd);
        const second = this.seasonService.removeSeasonsFromContestant(this.contestant.contestantGuid, this.listAddRemoveOutputObject.itemsToRemove);
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
        this.contestantService.deleteContestant(contestantGuid).subscribe(
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
    contestant.contestantGuid = this.contestantEditForm.value.contestantGuid;
    contestant.contestantLastName = this.contestantEditForm.value.contestantLastName;
    contestant.contestantFirstName = this.contestantEditForm.value.contestantFirstName;
    contestant.contestantNickname = this.contestantEditForm.value.contestantNickname;
    contestant.contestantGender = this.contestantEditForm.value.contestantGender;
    contestant.contestantDateOfBirth = moment(this.contestantEditForm.value.contestantDateOfBirth).format('YYYY-MM-DD');
    contestant.contestantTwitterHandle = this.contestantEditForm.value.twitterHandle;
    contestant.contestantComments = this.contestantEditForm.value.comments;

    if (this.newRecord) {
      this.contestantService.createContestant(contestant).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['reality-tracker/contestant-detail', response.contestantGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.contestantService.updateContestant(contestant).subscribe(
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
