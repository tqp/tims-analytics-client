import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crud-detail-edit-dialog',
  templateUrl: './crud-detail-edit-dialog.component.html',
  styleUrls: ['./crud-detail-edit-dialog.component.scss']
})
export class CrudDetailEditDialogComponent implements OnInit {
  public action: string;

  constructor(
    public matDialogRef: MatDialogRef<CrudDetailEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.action = this.data.action;
  }

  ngOnInit(): void {
  }

}
