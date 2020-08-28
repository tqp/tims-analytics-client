import { Component, HostListener, OnInit } from '@angular/core';
import { Player } from '../Player';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../../../../../@tqp/services/auth.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-detail-edit',
  templateUrl: './player-detail-edit.component.html',
  styleUrls: ['./player-detail-edit.component.css']
})
export class PlayerDetailEditComponent implements OnInit {
  public pageSource: string;
  public newRecord: boolean;
  public player: Player;
  public playerEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  public validationMessages = {
    'guid': [
      {type: 'required', message: 'A GUID is required'}
    ],
    'seriesName': [],
    'occupation': [],
    'ageOnEntry': [],
  };

  constructor(private route: ActivatedRoute,
              public authService: AuthService,
              private playerService: PlayerService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const playerGuid = params['guid'];
        // console.log('playerGuid', playerGuid);
        this.getPlayerDetail(playerGuid);
      } else {
        // Create new Person
        this.newRecord = true;
        this.player = new Player();
        this.player.playerGuid = null;
      }
    }).then();
  }

  private initializeForm(): void {
    this.playerEditForm = this.formBuilder.group({
      guid: new FormControl(''),
      seriesName: new FormControl('', Validators.required),
      occupation: new FormControl(''),
      ageOnEntry: new FormControl(''),
    });
  }

  private getPlayerDetail(guid: string): void {
    this.playerService.getPlayerDetail(guid).subscribe(
      response => {
        this.player = response;
        console.log('response', response);
        this.playerEditForm.controls['guid'].patchValue(this.player.playerGuid);
        this.playerEditForm.controls['seriesName'].patchValue(this.player.seriesName);
        this.playerEditForm.controls['occupation'].patchValue(this.player.playerOccupation);
        this.playerEditForm.controls['ageOnEntry'].patchValue(this.player.playerAgeOnEntry);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public save(): void {
    const player = new Player();
    player.playerGuid = this.playerEditForm.value.guid;
    player.playerOccupation = this.playerEditForm.value.occupation;
    player.playerAgeOnEntry = this.playerEditForm.value.ageOnEntry;
    this.playerService.updatePlayer(player).subscribe(
      response => {
        // console.log('response: ', response);
        this.router.navigate(['reality-tracker/player-detail', response.playerGuid]).then();
      },
      error => {
        console.error('Error: ' + error.message);
      }
    );
  }

  public cancel(): void {
    if (this.player.playerGuid) {
      this.router.navigate(['reality-tracker/player-detail', this.player.playerGuid]).then();
    } else {
      this.router.navigate(['reality-tracker/player-list']).then();
    }
  }

  public openPlayerDetailPage(row: Player): void {
    this.router.navigate(['reality-tracker/player-detail', row.playerGuid]).then();
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
      this.cancel();
    }
  }

}
