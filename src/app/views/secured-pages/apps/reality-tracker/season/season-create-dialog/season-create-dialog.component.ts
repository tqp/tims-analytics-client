import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-season-create-dialog',
  templateUrl: './season-create-dialog.component.html',
  styleUrls: ['./season-create-dialog.component.css']
})
export class SeasonCreateDialogComponent implements OnInit {
  @ViewChild('nameInputField', {static: false}) nameInputField: ElementRef;
  public seasonEditForm: FormGroup;

  public validationMessages = {
    'seriesGuid': [
      {type: 'required', message: 'A Series GUID is required'}
    ],
    'seriesName': [
      {type: 'required', message: 'A Series Name is required'}
    ],
    'name': [
      {type: 'required', message: 'A Season Number is required'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<SeasonCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.seasonEditForm = this.formBuilder.group({
      seriesGuid: new FormControl(this.data.seriesGuid, Validators.required),
      seriesName: new FormControl(this.data.seriesName, Validators.required),
      name: new FormControl('', Validators.required),
    });

    setTimeout(() => {
      this.nameInputField.nativeElement.focus();
    }, 0);
  }

  public save(): void {
    this.dialogRef.close(this.seasonEditForm.value);
  }

  @HostListener('window:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.save();
    }
    if (event.key === 'Escape') {
      this.dialogRef.close();
    }
  }
}
