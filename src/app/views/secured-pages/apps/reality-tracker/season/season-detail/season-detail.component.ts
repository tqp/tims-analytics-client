import { Component, HostListener, OnInit } from '@angular/core';
import { Season } from '../../reality-tracker-models/Season';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RealityTrackerService } from '../../reality-tracker.service';
import { EventService } from '../../../../../../../@tqp/services/event.service';

@Component({
  selector: 'app-season-detail',
  templateUrl: './season-detail.component.html',
  styleUrls: ['./season-detail.component.css']
})
export class SeasonDetailComponent implements OnInit {
  public pageSource: string;
  public season: Season;
  public dialogRef: any;

  public playerList: Season[];
  public records: Season[] = [];
  public dataSource: Season[] = [];
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
      (playerList: Season[]) => {
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

  public returnToList(): void {
    this.router.navigate(['reality-tracker/series-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['reality-tracker/series-detail-edit', this.season.guid]).then();
  }

  public openPlayerDetailPage(row: Season): void {
    this.router.navigate(['reality-tracker/player-detail', row.guid]).then();
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
