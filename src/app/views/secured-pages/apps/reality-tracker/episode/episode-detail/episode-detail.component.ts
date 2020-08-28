import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlayerService } from '../../player/player.service';
import { EventService } from '../../../../../../../@tqp/services/event.service';
import { Episode } from '../Episode';
import { EpisodeService } from '../episode.service';
import { Player } from '../../player/Player';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css']
})
export class EpisodeDetailComponent implements OnInit {
  public pageSource: string;
  public episode: Episode;
  public dialogRef: any;

  constructor(private route: ActivatedRoute,
              private episodeService: EpisodeService,
              private playerService: PlayerService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const episodeGuid = params['guid'];
        // console.log('episodeGuid', episodeGuid);
        this.getEpisodeDetail(episodeGuid);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getEpisodeDetail(guid: string): void {
    this.eventService.loadingEvent.emit(true);
    this.episodeService.getEpisodeDetail(guid).subscribe(
      response => {
        this.episode = response;
        // console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public returnToList(): void {
    this.router.navigate(['reality-tracker/season-detail', this.episode.seasonGuid]).then();
  }

  public openEditPage(): void {
    this.router.navigate(['reality-tracker/episode-detail-edit', this.episode.episodeGuid]).then();
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
