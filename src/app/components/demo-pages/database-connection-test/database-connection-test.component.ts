import { Component, OnInit } from '@angular/core';
import { DatabaseConnectionTestService } from './database-connection-test.service';
import { KeyValueString } from './KeyValueString';

@Component({
  selector: 'app-database-connection-test',
  templateUrl: './database-connection-test.component.html',
  styleUrls: ['./database-connection-test.component.css']
})
export class DatabaseConnectionTestComponent implements OnInit {
  public databaseTime: string;

  constructor(private basicDatabaseConnectionService: DatabaseConnectionTestService) {
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
