import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../crud.service';
import { Person } from '@tqp/models/Person';
import { ListItem } from '@tqp/models/ListItem';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListAddRemoveOutputObject } from '@tqp/models/ListAddRemoveOutputObject';
import { forkJoin } from 'rxjs';
import { ListAddRemoveItemsBasicComponent } from '@tqp/components/list-add-remove-items-basic/list-add-remove-items-basic.component';

@Component({
  selector: 'app-crud-person-friend-edit-page',
  templateUrl: './crud-person-friend-edit-page.component.html',
  styleUrls: ['./crud-person-friend-edit-page.component.css']
})
export class CrudPersonFriendEditPageComponent implements OnInit {
  public personGuid: string;
  public redirectOnSavePage: string;
  public currentFriendsList: ListItem[] = [];
  public availableFriendsList: ListItem[] = [];
  public listAddRemoveOutputObject: ListAddRemoveOutputObject = {};
  @ViewChild(ListAddRemoveItemsBasicComponent) listAddRemoveItemsBasicComponent: ListAddRemoveItemsBasicComponent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private crudService: CrudService) {
  }

  ngOnInit(): void {
    // this.personGuid = this.data; // For Dialog Pop-Up
    // this.personGuid = '1A1AEED908F042C2A1A38E2EF02626D1';
    const guid = this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        this.personGuid = params['guid'];
        this.getCurrentFriends(this.personGuid);
        this.getAvailableFriends(this.personGuid);
        this.redirectOnSavePage = 'secured-pages/crud-detail-edit-page/' + this.personGuid;
      }
    });
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

  public cancel(): void {
    this.router.navigate([this.redirectOnSavePage]).then();
  }

  public reset(): void {
    this.listAddRemoveItemsBasicComponent.reset();
  }

  public save(): void {
    if ((this.listAddRemoveOutputObject.itemsToAdd && this.listAddRemoveOutputObject.itemsToAdd.length > 0) ||
      (this.listAddRemoveOutputObject.itemsToRemove && this.listAddRemoveOutputObject.itemsToRemove.length > 0)) {
      // We'll use forkJoin to ensure that we don't redirect the page until both updates have completed.
      const first = this.crudService.addFriends(this.personGuid, this.listAddRemoveOutputObject.itemsToAdd);
      const second = this.crudService.removeFriends(this.personGuid, this.listAddRemoveOutputObject.itemsToRemove);
      forkJoin([first, second]).subscribe(
        next => {
          console.log(next);
          this.router.navigate([this.redirectOnSavePage]).then();
        },
        error => console.log(error)
      );
    } else {
      this.router.navigate([this.redirectOnSavePage]).then();
    }
  }

}
