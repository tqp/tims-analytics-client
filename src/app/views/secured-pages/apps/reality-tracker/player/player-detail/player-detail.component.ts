import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '../../../../../../../@tqp/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { Player } from '../Player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  public pageSource: string;
  public player: Player;
  public dialogRef: any;

  constructor(private route: ActivatedRoute,
              private playerService: PlayerService,
              private eventService: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const playerGuid = params['guid'];
        // console.log('playerGuid', playerGuid);
        this.getPlayerDetail(playerGuid);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  private getPlayerDetail(playerGuid: string): void {
    this.eventService.loadingEvent.emit(true);
    this.playerService.getPlayerDetail(playerGuid).subscribe(
      response => {
        this.player = response;
        // console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public returnToSeason(): void {
    this.router.navigate(['reality-tracker/season-detail', this.player.seasonGuid]).then();
  }

  public openEditPage(): void {
    this.router.navigate(['reality-tracker/player-detail-edit', this.player.playerGuid]).then();
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'e') {
      event.preventDefault();
      this.openEditPage();
    }
    if (event.ctrlKey && event.key === 'r') {
      event.preventDefault();
      this.returnToSeason();
    }
  }

}
