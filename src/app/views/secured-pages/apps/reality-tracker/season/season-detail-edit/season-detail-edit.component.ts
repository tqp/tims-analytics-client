import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '@tqp/services/auth.service';
import { Season } from '../Season';
import { Player } from '../../player/Player';
import { forkJoin } from 'rxjs';
import { SeasonContestantEditDialogComponent } from '../season-contestant-edit-dialog/season-contestant-edit-dialog.component';
import { ListAddRemoveOutputObject } from '@tqp/models/ListAddRemoveOutputObject';
import { EpisodeCreateDialogComponent } from '../../episode/episode-create-dialog/episode-create-dialog.component';
import { Episode } from '../../episode/Episode';
import { SeasonService } from '../season.service';
import { PlayerService } from '../../player/player.service';
import { EpisodeService } from '../../episode/episode.service';
import { ContestantService } from '../../contestant/contestant.service';

@Component({
  selector: 'app-season-detail-edit',
  templateUrl: './season-detail-edit.component.html',
  styleUrls: ['./season-detail-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SeasonDetailEditComponent implements OnInit {
  public pageSource: string;
  public newRecord: boolean;
  public season: Season;
  public seasonEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public createNewEpisodeDialogRef: MatDialogRef<EpisodeCreateDialogComponent>;

  // Season List
  public seasonList: Season[];
  public playerRecords: Season[] = [];
  public playerDataSource: Season[] = [];
  public playerDisplayedColumns: string[] = [
    'name'
  ];

  // Episode List
  public episodeList: Episode[];
  public episodeRecords: Episode[] = [];
  public episodeDataSource: Episode[] = [];
  public episodeDisplayedColumns: string[] = [
    'name'
  ];

  // Season-Contestant Dialog
  public listAddRemoveOutputObject: ListAddRemoveOutputObject = {};

  public validationMessages = {
    'seasonGuid': [
      {type: 'required', message: 'A Season GUID is required'}
    ],
    'seasonName': [
      {type: 'required', message: 'A Season Name is required'}
    ],
    'seasonAbbreviation': [
      {type: 'required', message: 'An Abbreviation is required'}
    ],
    'seriesName': [
      {type: 'required', message: 'A Series Name is required'}
    ],
  };

  constructor(private route: ActivatedRoute,
              public authService: AuthService,
              private seasonService: SeasonService,
              private playerService: PlayerService,
              private episodeService: EpisodeService,
              private contestantService: ContestantService,
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
        this.getEpisodeListBySeasonGuid(seasonGuid);
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
      seasonGuid: new FormControl('', Validators.required),
      seasonName: new FormControl('', Validators.required),
      seasonAbbreviation: new FormControl('', Validators.required),
      seriesName: new FormControl('', Validators.required),
    });
  }

  private getSeasonDetail(guid: string): void {
    this.seasonService.getSeasonDetail(guid).subscribe(
      response => {
        this.season = response;
        // console.log('response', response);
        this.seasonEditForm.controls['seasonGuid'].patchValue(this.season.seasonGuid);
        this.seasonEditForm.controls['seasonName'].patchValue(this.season.seasonName);
        this.seasonEditForm.controls['seasonAbbreviation'].patchValue(this.season.seasonAbbreviation);
        this.seasonEditForm.controls['seriesName'].patchValue(this.season.seriesName);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getPlayerListBySeasonGuid(seasonGuid: string): void {
    this.playerService.getPlayerListBySeasonGuid(seasonGuid).subscribe(
      (playerList: Player[]) => {
        this.playerRecords = [];
        // console.log('playerList', playerList);
        playerList.forEach(item => {
          this.playerRecords.push(item);
        });
        this.playerDataSource = this.playerRecords;
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getEpisodeListBySeasonGuid(seasonGuid: string): void {
    this.episodeService.getEpisodeListBySeasonGuid(seasonGuid).subscribe(
      (episodeList: Episode[]) => {
        // console.log('episodeList', episodeList);
        this.episodeRecords = [];
        episodeList.forEach(item => {
          this.episodeRecords.push(item);
        });
        this.episodeDataSource = this.episodeRecords;
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

  public openEpisodeDetailPage(row: Episode): void {
    this.router.navigate(['reality-tracker/episode-detail', row.episodeGuid]).then();
  }

  public openCreateEpisodeDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = dialogConfig.data = {
      seriesGuid: this.season.seriesGuid,
      seriesName: this.season.seriesName,
      seasonGuid: this.season.seasonGuid,
      seasonName: this.season.seasonName
    };
    dialogConfig.autoFocus = false;
    this.createNewEpisodeDialogRef = this._matDialog.open(EpisodeCreateDialogComponent, dialogConfig);

    this.createNewEpisodeDialogRef.afterClosed().subscribe(dialogData => {
      if (dialogData) {
        // console.log('dialogData', dialogData);
        const episode = new Episode();
        episode.seasonGuid = dialogData.seasonGuid;
        episode.episodeName = dialogData.episodeName;
        this.episodeService.createEpisode(episode).subscribe(
          () => {
            this.getEpisodeListBySeasonGuid(this.season.seasonGuid);
          },
          error => {
            console.error('Error: ' + error.message);
          }
        );
      }
    });
  }

  public openSeasonContestantEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '25%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.season.seasonGuid;
    dialogConfig.autoFocus = false;
    const dialogRef = this._matDialog.open(SeasonContestantEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      // console.log('dialogData', dialogData);
      this.listAddRemoveOutputObject = dialogData;
      if ((this.listAddRemoveOutputObject.itemsToAdd && this.listAddRemoveOutputObject.itemsToAdd.length > 0) ||
        (this.listAddRemoveOutputObject.itemsToRemove && this.listAddRemoveOutputObject.itemsToRemove.length > 0)) {
        // We'll use forkJoin to ensure that we don't redirect the page until both updates have completed.
        const first = this.contestantService.addContestantsToSeason(this.season.seasonGuid, this.listAddRemoveOutputObject.itemsToAdd);
        const second = this.contestantService.removeContestantsFromSeason(this.season.seasonGuid, this.listAddRemoveOutputObject.itemsToRemove);
        forkJoin([first, second]).subscribe(
          next => {
            // console.log(next);
            // console.log('Refresh.');
            this.getPlayerListBySeasonGuid(this.season.seasonGuid);
          },
          error => console.log(error)
        );
      } else {
        console.log('No changes made.');
      }
    });
  }

  public delete(seasonGuid: string): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.seasonService.deleteSeason(seasonGuid).subscribe(
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
    season.seasonGuid = this.seasonEditForm.value.seasonGuid;
    season.seasonName = this.seasonEditForm.value.seasonName;
    season.seasonAbbreviation = this.seasonEditForm.value.seasonAbbreviation;
    if (this.newRecord) {
      this.seasonService.createSeason(season).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['reality-tracker/season-detail', response.seasonGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.seasonService.updateSeason(season).subscribe(
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
      if (!this.createNewEpisodeDialogRef) {
        this.save();
      }
    }
    if (event.key === 'Escape') {
      if (!this.createNewEpisodeDialogRef) {
        this.cancel();
      }
    }
    if (event.ctrlKey && event.key === 'a') {
      event.preventDefault();
      this.openCreateEpisodeDialog();
    }
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
      this.cancel();
    }
    if (event.ctrlKey && event.key === 'd') {
      event.preventDefault();
      this.delete(this.season.seasonGuid);
    }
    if (event.ctrlKey && event.key === 's') {
      // console.log('s', this.createNewSeasonDialogRef.getState());
      if (!this.createNewEpisodeDialogRef || this.createNewEpisodeDialogRef.getState() === 2) {
        this.save();
      }
      event.preventDefault();
    }
  }

}
