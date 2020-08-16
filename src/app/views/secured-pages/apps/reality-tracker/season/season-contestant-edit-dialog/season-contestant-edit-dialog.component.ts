import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { ListItem } from '@tqp/models/ListItem';
import { ListAddRemoveOutputObject } from '@tqp/models/ListAddRemoveOutputObject';
import { ListAddRemoveItemsBasicComponent } from '@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.component';
import { RealityTrackerService } from '../../reality-tracker.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contestant } from '../../reality-tracker-models/Contestant';

@Component({
  selector: 'app-season-contestant-edit-dialog',
  templateUrl: './season-contestant-edit-dialog.component.html',
  styleUrls: ['./season-contestant-edit-dialog.component.css']
})
export class SeasonContestantEditDialogComponent implements OnInit {
  public currentContestantsList: ListItem[] = [];
  public availableContestantsList: ListItem[] = [];
  public listAddRemoveOutputObject: ListAddRemoveOutputObject = {};
  @ViewChild(ListAddRemoveItemsBasicComponent) listAddRemoveItemsBasicComponent: ListAddRemoveItemsBasicComponent;

  constructor(private realityTrackerService: RealityTrackerService,
              private dialogRef: MatDialogRef<SeasonContestantEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    const seasonGuid = this.data;
    // console.log('seasonGuid', seasonGuid);
    this.getCurrentContestantsBySeasonGuid(seasonGuid);
    this.getAvailableContestantsBySeasonGuid(seasonGuid);
  }

  private getCurrentContestantsBySeasonGuid(seasonGuid: string): void {
    this.realityTrackerService.getCurrentContestantsBySeasonGuid(seasonGuid).subscribe(
      (response: Contestant[]) => {
        // console.log('response', response);
        this.currentContestantsList = response.map((item) => {
            const listItem: ListItem = new ListItem();
            listItem.guid = item.contestantGuid;
            listItem.displayText = item.contestantLastName + ', ' + item.contestantFirstName;
            return listItem;
          },
          (error) => {
            console.error('Error: ' + error.message);
          });
      }
    );
  }

  private getAvailableContestantsBySeasonGuid(seasonGuid: string): void {
    this.realityTrackerService.getAvailableContestantsBySeasonGuid(seasonGuid).subscribe(
      (response: Contestant[]) => {
        this.availableContestantsList = response.map((item) => {
            const listItem: ListItem = new ListItem();
            listItem.guid = item.contestantGuid;
            listItem.displayText = item.contestantLastName + ', ' + item.contestantFirstName;
            return listItem;
          },
          (error) => {
            console.error('Error: ' + error.message);
          });
      }
    );
  }

  public addRemoveContestants(listAddRemoveResponseObject: ListAddRemoveOutputObject) {
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
