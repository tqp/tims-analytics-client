import { Component, HostListener, OnInit } from '@angular/core';
import { Season } from '../Season';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '../../../../../../../@tqp/services/event.service';
import { Player } from '../../player/Player';
import { Episode } from '../../episode/Episode';
import { SeasonService } from '../season.service';
import { PlayerService } from '../../player/player.service';
import { EpisodeService } from '../../episode/episode.service';

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
  public playerRecords: Player[] = [];
  public playerDataSource: Player[] = [];
  public playerDataSourceLoaded = false;
  public playerDisplayedColumns: string[] = [
    'name'
  ];

  // Player List
  public episodeRecords: Player[] = [];
  public episodeDataSource: Player[] = [];
  public episodeDataSourceLoaded = false;
  public episodeDisplayedColumns: string[] = [
    'name'
  ];

  constructor(private route: ActivatedRoute,
              private seasonService: SeasonService,
              private playerService: PlayerService,
              private episodeService: EpisodeService,
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
        this.getEpisodeListBySeasonGuid(seasonGuid);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getSeasonDetail(guid: string): void {
    this.eventService.loadingEvent.emit(true);
    this.seasonService.getSeasonDetail(guid).subscribe(
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
    this.playerService.getPlayerListBySeasonGuid(seasonGuid).subscribe(
      (playerList: Player[]) => {
        // console.log('playerList', playerList);
        playerList.forEach(item => {
          this.playerRecords.push(item);
        });
        this.playerDataSource = this.playerRecords;
        this.playerDataSourceLoaded = true;
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
        this.episodeDataSourceLoaded = true;
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

  public openEpisodeDetailPage(row: Episode): void {
    this.router.navigate(['reality-tracker/episode-detail', row.episodeGuid]).then();
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
