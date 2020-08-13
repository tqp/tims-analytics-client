import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '../../../../../../@tqp/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { CrudDetailEditDialogComponent } from '../../crud/crud-detail-edit-dialog/crud-detail-edit-dialog.component';
import { RealityTrackerService } from '../reality-tracker.service';
import { Contestant } from '../reality-tracker-models/Contestant';

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

  constructor(private route: ActivatedRoute,
              private realityTrackerService: RealityTrackerService,
              private eventService: EventService,
              private router: Router,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const guid = params['guid'];
        // console.log('guid', guid);
        this.getContestantDetail(guid);
      } else {
        console.error('No ID was present.');
      }
    }).then();

    const src = this.route
      .queryParams
      .subscribe(params => {
        this.pageSource = params.src;
      });
  }

  private getContestantDetail(guid: string): void {
    this.eventService.loadingEvent.emit(true);
    this.realityTrackerService.getContestantDetail(guid).subscribe(
      response => {
        this.contestant = response;
        console.log('response', response);
        this.eventService.loadingEvent.emit(false);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  public returnToList(): void {
    this.router.navigate(['reality-tracker/contestant-list']).then();
  }

  public openEditPage(): void {
    this.router.navigate(['reality-tracker/contestant-detail-edit', this.contestant.guid]).then();
  }

  public openEditDialog(personGuid: string): void {
    this.dialogRef = this._matDialog.open(CrudDetailEditDialogComponent, {
      panelClass: 'crud-edit-dialog',
      data: {
        personGuid: personGuid,
        action: 'edit'
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        console.log('response', response);
      }, error => {
        console.error('Error: ', error);
      });
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
