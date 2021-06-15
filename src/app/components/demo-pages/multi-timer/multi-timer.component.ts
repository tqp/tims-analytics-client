import { Component, OnInit, ViewChild } from '@angular/core';
import { MultiTimerEvent } from '@tqp/models/MultiTimerEvent';
import { v4 as uuid } from 'uuid';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MultiTimerEditDialogComponent } from '../multi-timer-edit-dialog/multi-timer-edit-dialog.component';

const ELEMENT_DATA: MultiTimerEvent[] = [
  {uuid: uuid(), start: 1564963200000, end: 1564966800000, description: 'MultiTimerEvent 1'},
  {uuid: uuid(), start: 1565222400000, end: 1565226000000, description: 'MultiTimerEvent 2'},
  {uuid: uuid(), start: 1577880000000, end: 1577887200000, description: 'MultiTimerEvent 3'},
  {uuid: uuid(), start: 1601560800000, end: 1601571600000, description: 'MultiTimerEvent 4'},
  {uuid: uuid(), start: 1612180800000, end: 1612184400000, description: 'MultiTimerEvent 5'}
];

@Component({
  selector: 'app-multi-timer',
  templateUrl: './multi-timer.component.html',
  styleUrls: ['./multi-timer.component.css']
})
export class MultiTimerComponent implements OnInit {
  public displayedColumns: string[] = [
    'start',
    'end',
    'description',
    'duration',
    'countdown',
    'actions'
  ];
  public dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('dialogContent') public dialogRef: any;

  constructor(private dialog: MatDialog,
              private _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.dataSource.sort = this.sort;
  }

  public createMultiTimer(): void {
    this.dialogRef = this._matDialog.open(MultiTimerEditDialogComponent, {
      data: {
        panelClass: 'multi-timer-edit-dialog',
        action: 'new'
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog Result', result);
    });
  }

  public editMultiTimer(row: Event): void {
    this.dialogRef = this._matDialog.open(MultiTimerEditDialogComponent, {
      data: {
        panelClass: 'multi-timer-edit-dialog',
        action: 'edit',
        multiTimer: row
      }
    });

    this.dialogRef.afterClised().subscribe(result => {
      console.log('Dialog Result', result);
    });
  }

  public openMultiTimerEditDialog(row: Event): void {
    console.log('row', row);

    // this.dialogRef = this._matDialog.open(MultiTimerEditDialogComponent, {
    //   data: {
    //     action: 'new'
    //   }
    // })

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = '768px';
    dialogConfig.maxWidth = '1024px';
    dialogConfig.data = row;
    const dialogRef = this.dialog.open(MultiTimerEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(dialogData => {
      if (dialogData) {
        console.log('dialogData', dialogData);
        const index = ELEMENT_DATA.findIndex(p => p.uuid === dialogData.uuid);
        ELEMENT_DATA[index] = {
          uuid: dialogData.uuid,
          description: dialogData.description,
          start: dialogData.startMillis,
          end: dialogData.endMillis
        };
        console.log('ELEMENT_DATA After: ', ELEMENT_DATA);
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      }
    });

  }


}
