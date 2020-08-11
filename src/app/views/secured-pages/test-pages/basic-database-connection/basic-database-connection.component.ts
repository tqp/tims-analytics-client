import {Component, OnInit} from '@angular/core';
import {BasicDatabaseConnectionService} from './basic-database-connection.service';
import {KeyValueString} from './KeyValueString';

@Component({
  selector: 'app-basic-database-connection',
  templateUrl: './basic-database-connection.component.html',
  styleUrls: ['./basic-database-connection.component.css']
})
export class BasicDatabaseConnectionComponent implements OnInit {
  public databaseTime: string;

  constructor(private basicDatabaseConnectionService: BasicDatabaseConnectionService) {
  }

  ngOnInit(): void {
    this.getDatabaseTime();
  }

  public getDatabaseTime(): void {
    this.basicDatabaseConnectionService.getDatabaseTime().subscribe(
      (result: any) => {
        const temp: KeyValueString = result;
        console.log('date', temp.value);
        this.databaseTime = temp.value;
      },
      error => {
        console.error('Error: ' + error.message);
      },
      () => {
      }
    );
  }

}
