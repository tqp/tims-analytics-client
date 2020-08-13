import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { RealityTrackerService } from '../reality-tracker.service';
import { EventService } from '../../../../../../@tqp/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { CrudDetailEditDialogComponent } from '../../crud/crud-detail-edit-dialog/crud-detail-edit-dialog.component';
import { Series } from '../reality-tracker-models/Series';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})
export class SeriesDetailComponent implements OnInit {
  public pageSource: string;
  public series: Series;
  public dialogRef: any;

  constructor(private route: ActivatedRoute,
              private realityTrackerService: RealityTrackerService,
              private eventService: EventService,
              private router: Router,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    const temp = this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        const guid = params['guid'];
        // console.log('guid', guid);
        this.getSeriesDetail(guid);
      } else {
        console.error('No ID was present.');
      }
    });

    const src = this.route
      .queryParams
      .subscribe(params => {
        this.pageSource = params.src;
      });
  }

  private getSeriesDetail(guid: string): void {
    this.eventService.loadingEvent.emit(true);
    this.realityTrackerService.getSeriesDetail(guid).subscribe(
      response => {
        this.series = response;
        // console.log('response', response);
        this.eventService.loadingEvent.emit(false);
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
    this.router.navigate(['reality-tracker/series-detail-edit', this.series.guid]).then();
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

}
