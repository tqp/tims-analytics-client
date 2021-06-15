import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { ListItem } from '@tqp/models/ListItem';
import { ListAddRemoveOutputObject } from '@tqp/models/ListAddRemoveOutputObject';
import { ListAddRemoveItemsBasicComponent } from '@tqp/components/toolkit/list-add-remove-items-basic/list-add-remove-items-basic.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Season } from '../../season/Season';
import { SeasonService } from '../../season/season.service';

@Component({
  selector: 'app-contestant-season-edit-dialog',
  templateUrl: './contestant-season-edit-dialog.component.html',
  styleUrls: ['./contestant-season-edit-dialog.component.css']
})
export class ContestantSeasonEditDialogComponent implements OnInit {
  public currentSeasonsList: ListItem[] = [];
  public availableSeasonsList: ListItem[] = [];
  public listAddRemoveOutputObject: ListAddRemoveOutputObject = {};
  @ViewChild(ListAddRemoveItemsBasicComponent) listAddRemoveItemsBasicComponent: ListAddRemoveItemsBasicComponent;

  constructor(private seasonService: SeasonService,
              private dialogRef: MatDialogRef<ContestantSeasonEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    const contestantGuid = this.data;
    this.getCurrentSeasonsByContestantGuid(contestantGuid);
    this.getAvailableSeasonsByContestantGuid(contestantGuid);
  }

  private getCurrentSeasonsByContestantGuid(contestantGuid: string): void {
    this.seasonService.getCurrentSeasonsByContestantGuid(contestantGuid).subscribe(
      (response: Season[]) => {
        // console.log('response', response);
        this.currentSeasonsList = response.map((item) => {
            const listItem: ListItem = new ListItem();
            listItem.guid = item.seasonGuid;
            listItem.displayText = item.seriesName + ' ' + item.seasonName;
            return listItem;
          },
          (error) => {
            console.error('Error: ' + error.message);
          });
      }
    );
  }

  private getAvailableSeasonsByContestantGuid(contestantGuid: string): void {
    this.seasonService.getAvailableSeasonsByContestantGuid(contestantGuid).subscribe(
      (response: Season[]) => {
        this.availableSeasonsList = response.map((item) => {
            const listItem: ListItem = new ListItem();
            listItem.guid = item.seasonGuid;
            listItem.displayText = item.seriesName + ' ' + item.seasonName;
            return listItem;
          },
          (error) => {
            console.error('Error: ' + error.message);
          });
      }
    );
  }

  public addRemoveSeasons(listAddRemoveResponseObject: ListAddRemoveOutputObject) {
    // This stores the current lists of items to add and remove.
    this.listAddRemoveOutputObject = listAddRemoveResponseObject;
  }

  public reset(): void {
    this.listAddRemoveItemsBasicComponent.reset();
  }

  public save(): void {
    this.dialogRef.close(this.listAddRemoveOutputObject);
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    // Escape
    if (event.key === 'Escape') {
      this.dialogRef.close();
    }
  }

}
