import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-episode-create-dialog',
  templateUrl: './episode-create-dialog.component.html',
  styleUrls: ['./episode-create-dialog.component.css']
})
export class EpisodeCreateDialogComponent implements OnInit {
  @ViewChild('nameInputField', {static: false}) nameInputField: ElementRef;
  public episodeEditForm: FormGroup;

  public validationMessages = {
    'seriesGuid': [
      {type: 'required', message: 'A Series GUID is required'}
    ],
    'seriesName': [
      {type: 'required', message: 'A Series Name is required'}
    ],
    'seasonGuid': [
      {type: 'required', message: 'A Season GUID is required'}
    ],
    'seasonName': [
      {type: 'required', message: 'A Season Name is required'}
    ],
    'episodeName': [
      {type: 'required', message: 'A Episode Name is required'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EpisodeCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initializeForm();
    // console.log('data', this.data);
  }

  private initializeForm(): void {
    this.episodeEditForm = this.formBuilder.group({
      seriesGuid: new FormControl(this.data.seriesGuid, Validators.required),
      seriesName: new FormControl(this.data.seriesName, Validators.required),
      seasonGuid: new FormControl(this.data.seasonGuid, Validators.required),
      seasonName: new FormControl(this.data.seasonName, Validators.required),
      episodeName: new FormControl('', Validators.required),
    });

    setTimeout(() => {
      this.nameInputField.nativeElement.focus();
    }, 0);
  }

  public save(): void {
    this.dialogRef.close(this.episodeEditForm.value);
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
