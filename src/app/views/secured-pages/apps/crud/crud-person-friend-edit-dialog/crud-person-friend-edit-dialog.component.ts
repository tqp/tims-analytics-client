import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Person } from '@tqp/models/Person';
import { ListItem } from '@tqp/models/ListItem';
import { CrudService } from '../crud.service';
import { ListAddRemoveOutputObject } from '@tqp/models/ListAddRemoveOutputObject';
import {ListAddRemoveItemsBasicComponent} from '@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.component';

@Component({
  selector: 'app-crud-person-friend-edit-dialog',
  templateUrl: './crud-person-friend-edit-dialog.component.html',
  styleUrls: ['./crud-person-friend-edit-dialog.component.css']
})
export class CrudPersonFriendEditDialogComponent implements OnInit {
  public currentFriendsList: ListItem[] = [];
  public availableFriendsList: ListItem[] = [];
  public listAddRemoveOutputObject: ListAddRemoveOutputObject = {};
  @ViewChild(ListAddRemoveItemsBasicComponent) listAddRemoveItemsBasicComponent: ListAddRemoveItemsBasicComponent;

  constructor(private crudService: CrudService,
              private dialogRef: MatDialogRef<CrudPersonFriendEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.getCurrentFriends(this.data);
    this.getAvailableFriends(this.data);
  }

  private getCurrentFriends(personGuid: string): void {
    this.crudService.getCurrentFriends(personGuid).subscribe(
      (response: Person[]) => {
        this.currentFriendsList = response.map((item) => {
            const listItem: ListItem = new ListItem();
            listItem.guid = item.guid;
            listItem.displayText = item.lastName + ', ' + item.firstName;
            return listItem;
          },
          (error) => {
            console.error('Error: ' + error.message);
          });
      }
    );
  }

  private getAvailableFriends(personGuid: string): void {
    this.crudService.getAvailableFriends(personGuid).subscribe(
      (response: Person[]) => {
        this.availableFriendsList = response.map((item) => {
            const listItem: ListItem = new ListItem();
            listItem.guid = item.guid;
            listItem.displayText = item.lastName + ', ' + item.firstName;
            return listItem;
          },
          (error) => {
            console.error('Error: ' + error.message);
          });
      }
    );
  }

  public addRemoveFriends(listAddRemoveResponseObject: ListAddRemoveOutputObject) {
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
