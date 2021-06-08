import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@tqp/components/confirm-dialog/confirm-dialog.component';
import { EpisodeCreateDialogComponent } from '../episode-create-dialog/episode-create-dialog.component';
import { ListAddRemoveOutputObject } from '@tqp/models/ListAddRemoveOutputObject';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '@tqp/services/auth.service';
import { EpisodeService } from '../episode.service';
import { Episode } from '../Episode';
import * as moment from 'moment';

@Component({
  selector: 'app-episode-detail-edit',
  templateUrl: './episode-detail-edit.component.html',
  styleUrls: ['./episode-detail-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EpisodeDetailEditComponent implements OnInit {
  public pageSource: string;
  public newRecord: boolean;
  public episode: Episode;
  public episodeEditForm: FormGroup;
  public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  public createNewEpisodeDialogRef: MatDialogRef<EpisodeCreateDialogComponent>;

  // Episode-Contestant Dialog
  public listAddRemoveOutputObject: ListAddRemoveOutputObject = {};

  public validationMessages = {
    'episodeGuid': [
      {type: 'required', message: 'A Episode GUID is required'}
    ],
    'episodeName': [
      {type: 'required', message: 'A Episode Name is required'}
    ],
    'episodeDate': [
      {type: 'required', message: 'Episode Date is required'}
    ],
    'episodeNumberInSeason': [
      {type: 'required', message: 'Number in Season is required'}
    ],
    'episodeNumberInSeries': [
      {type: 'required', message: 'Number in Series is required'}
    ],
    'episodeComments': [],
  };

  constructor(private route: ActivatedRoute,
              public authService: AuthService,
              private episodeService: EpisodeService,
              private router: Router,
              private formBuilder: FormBuilder,
              public _matDialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const episodeGuid = params['guid'];
        // console.log('episodeGuid', episodeGuid);
        this.getEpisodeDetail(episodeGuid);
      } else {
        // Create new Person
        this.newRecord = true;
        this.episode = new Episode();
        this.episode.episodeGuid = null;
      }
    }).then();
  }

  private initializeForm(): void {
    this.episodeEditForm = this.formBuilder.group({
      episodeGuid: new FormControl('', Validators.required),
      episodeName: new FormControl('', Validators.required),
      episodeDate: new FormControl('', Validators.required),
      episodeNumberInSeason: new FormControl('', Validators.required),
      episodeNumberInSeries: new FormControl('', Validators.required),
      episodeComments: new FormControl(''),
    });
  }

  private getEpisodeDetail(guid: string): void {
    this.episodeService.getEpisodeDetail(guid).subscribe(
      response => {
        this.episode = response;
        // console.log('response', response);

        const episodeDate = this.episode.episodeDate !== null
          ? moment(this.episode.episodeDate, 'YYYY-MM-DD').format('MM/DD/YYYY')
          : null;

        this.episodeEditForm.controls['episodeGuid'].patchValue(this.episode.episodeGuid);
        this.episodeEditForm.controls['episodeName'].patchValue(this.episode.episodeName);
        this.episodeEditForm.controls['episodeDate'].patchValue(episodeDate);
        this.episodeEditForm.controls['episodeNumberInSeason'].patchValue(this.episode.episodeNumberInSeason);
        this.episodeEditForm.controls['episodeNumberInSeries'].patchValue(this.episode.episodeNumberInSeries);
        this.episodeEditForm.controls['episodeComments'].patchValue(this.episode.episodeComments);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  // BUTTONS

  public delete(episodeGuid: string): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.dialogMessage = 'Are you sure you want to delete?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.episodeService.deleteEpisode(episodeGuid).subscribe(
          response => {
            // console.log('response: ', response);
            this.router.navigate(['reality-tracker/episode-list']).then();
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
    const episode = new Episode();

    const episodeDate = this.episodeEditForm.value.episodeDate !== null
      ? moment(this.episodeEditForm.value.episodeDate, 'MM/DD/YYYY').format('YYYY-MM-DD')
      : null;

    episode.episodeGuid = this.episodeEditForm.value.episodeGuid;
    episode.episodeName = this.episodeEditForm.value.episodeName;
    episode.episodeDate = episodeDate;
    episode.episodeNumberInSeason = this.episodeEditForm.value.episodeNumberInSeason;
    episode.episodeNumberInSeries = this.episodeEditForm.value.episodeNumberInSeries;
    episode.episodeComments = this.episodeEditForm.value.episodeComments;
    // console.log('episode', episode);
    if (this.newRecord) {
      this.episodeService.createEpisode(episode).subscribe(
        response => {
          console.log('response: ', response);
          this.router.navigate(['reality-tracker/episode-detail', response.episodeGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    } else {
      this.episodeService.updateEpisode(episode).subscribe(
        response => {
          // console.log('response: ', response);
          this.router.navigate(['reality-tracker/episode-detail', response.episodeGuid]).then();
        },
        error => {
          console.error('Error: ' + error.message);
        }
      );
    }
  }

  public cancel(): void {
    if (this.episode.episodeGuid) {
      this.router.navigate(['reality-tracker/episode-detail', this.episode.episodeGuid]).then();
    } else {
      this.router.navigate(['reality-tracker/episode-list']).then();
    }
  }

  public openEpisodeDetailPage(row: Episode): void {
    this.router.navigate(['reality-tracker/episode-detail', row.episodeGuid]).then();
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
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
      this.cancel();
    }
    if (event.ctrlKey && event.key === 'd') {
      event.preventDefault();
      this.delete(this.episode.episodeGuid);
    }
    if (event.ctrlKey && event.key === 's') {
      // console.log('s', this.createNewEpisodeDialogRef.getState());
      if (!this.createNewEpisodeDialogRef || this.createNewEpisodeDialogRef.getState() === 2) {
        this.save();
      }
      event.preventDefault();
    }
  }

}
