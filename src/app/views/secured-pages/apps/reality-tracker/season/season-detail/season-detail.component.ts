import { Component, HostListener, OnInit } from '@angular/core';
import { Season } from '../../reality-tracker-models/Season';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RealityTrackerService } from '../../reality-tracker.service';
import { EventService } from '../../../../../../../@tqp/services/event.service';
import { Player } from '../../reality-tracker-models/Player';

@Component({
  selector: 'app-season-detail',
  templateUrl: './season-detail.component.html',
  styleUrls: ['./season-detail.component.css']
})
export class SeasonDetailComponent implements OnInit {
  public pageSource: string;
  public season: Season;
  public dialogRef: any;

  // Player List
  public records: Player[] = [];
  public dataSource: Player[] = [];
  public displayedColumns: string[] = [
    'name'
  ];

  constructor(private route: ActivatedRoute,
              private realityTrackerService: RealityTrackerService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const seasonGuid = params['guid'];
        // console.log('seasonGuid', seasonGuid);
        this.getSeasonDetail(seasonGuid);
        this.getPlayerListBySeasonGuid(seasonGuid);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getSeasonDetail(guid: string): void {
    this.eventService.loadingEvent.emit(true);
    this.realityTrackerService.getSeasonDetail(guid).subscribe(
      response => {
        this.season = response;
        // console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  private getPlayerListBySeasonGuid(seasonGuid: string): void {
    this.realityTrackerService.getPlayerListBySeasonGuid(seasonGuid).subscribe(
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

  public returnToList(): void {
    this.router.navigate(['reality-tracker/series-detail', this.season.seriesGuid]).then();
  }

  public openEditPage(): void {
    this.router.navigate(['reality-tracker/season-detail-edit', this.season.seasonGuid]).then();
  }

  public openPlayerDetailPage(row: Player): void {
    this.router.navigate(['reality-tracker/player-detail', row.playerGuid]).then();
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'e') {
      event.preventDefault();
      this.openEditPage();
    }
    if (event.ctrlKey && event.key === 'r') {
      event.preventDefault();
      this.returnToList();
    }
  }

}
