import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Person } from '@tqp/models/Person';
import { AutoCompleteService } from './auto-complete.service';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {
  autoCompleteForm: FormGroup;
  lastNameAutoCompleteOptions: Observable<Person[]>;
  streetAutoCompleteOptions: Observable<Person[]>;

  constructor(private autoCompleteService: AutoCompleteService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.autoCompleteForm = this.formBuilder.group({
      lastName: new FormControl(),
      firstName: new FormControl(),
      address: this.formBuilder.group({
        street: new FormControl(),
        city: new FormControl(),
        state: new FormControl(),
        zipCode: new FormControl()
      })
    });

    this.lastNameAutoCompleteOptions = this.autoCompleteForm.get('lastName').valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value', value);
        if (value !== '') {
          return this.autoCompleteService.retrieveLastNameOptions(value.toLowerCase()).pipe(
            map(results => {
              // console.log('results', results);
              return results;
            }),
            catchError(() => {
              return of(null);
            })
          );
        } else {
          return of(null);
        }
      })
    );

    this.streetAutoCompleteOptions = this.autoCompleteForm.get('address').get('street').valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value', value);
        if (value !== '') {
          return this.autoCompleteService.retrieveAddressOptions(value.toLowerCase()).pipe(
            map(results => {
              // console.log('results', results);
              return results;
            }),
            catchError(() => {
              return of(null);
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }

  public populateNameGroup(option: any) {
    // console.log('option', option);
    this.autoCompleteForm.get('firstName').patchValue(option.firstName);
  }

  public populateAddressGroup(option: any) {
    // console.log('option', option);
    this.autoCompleteForm.get('address').get('street').patchValue(option.street);
    this.autoCompleteForm.get('address').get('city').patchValue(option.city);
    this.autoCompleteForm.get('address').get('state').patchValue(option.state);
    this.autoCompleteForm.get('address').get('zipCode').patchValue(option.zipCode);
  }
}
