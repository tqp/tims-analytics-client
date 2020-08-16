import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '../../../../../../../@tqp/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { CrudDetailEditDialogComponent } from '../../../crud/crud-detail-edit-dialog/crud-detail-edit-dialog.component';
import { RealityTrackerService } from '../../reality-tracker.service';
import { Contestant } from '../../reality-tracker-models/Contestant';
import { Season } from '../../reality-tracker-models/Season';
import { Player } from '../../reality-tracker-models/Player';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-contestant-detail',
  templateUrl: './contestant-detail.component.html',
  styleUrls: ['./contestant-detail.component.css']
})
export class ContestantDetailComponent implements OnInit {
  public pageSource: string;
  public contestant: Contestant;
  public dialogRef: any;
  public genderNames = {'M': 'Male', 'F': 'Female', 'O': 'Other'};

  // Season List
  public records: Season[] = [];
  public dataSource: Season[] = [];
  public displayedColumns: string[] = [
    'name'
  ];

  constructor(private route: ActivatedRoute,
              private realityTrackerService: RealityTrackerService,
              private eventService: EventService,
              private router: Router,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const contestantGuid = params['guid'];
        // console.log('contestantGuid', contestantGuid);
        this.getContestantDetail(contestantGuid);
        this.getSeasonListByContestantGuid(contestantGuid);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getContestantDetail(guid: string): void {
    this.eventService.loadingEvent.emit(true);
    this.realityTrackerService.getContestantDetail(guid).subscribe(
      response => {
        this.contestant = response;
        // console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getSeasonListByContestantGuid(contestantGuid: string): void {
    this.realityTrackerService.getSeasonListByContestantGuid(contestantGuid).subscribe(
      (playerList: Player[]) => {
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

  // Buttons

  public returnToList(): void {
    this.router.navigate(['reality-tracker/contestant-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['reality-tracker/contestant-detail-edit', this.contestant.contestantGuid]).then();
  }

  public openSeasonDetailPage(player: Player): void {
    this.router.navigate(['reality-tracker/player-detail', player.playerGuid]).then();
  }

  public openTwitter(twitterHandle: string): void {
    console.log('openTwitter', twitterHandle);
    window.open('https://twitter.com/' + twitterHandle, '_blank');
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'e') {
      event.preventDefault();
      this.openEditPage();
    }
    if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();
      this.returnToList();
    }
  }

}
