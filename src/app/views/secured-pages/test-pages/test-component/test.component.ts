import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  public buildTimestamp: string;
  public environmentName: string;

  constructor() { }

  ngOnInit(): void {
    this.buildTimestamp = environment.buildTimestamp;
    this.environmentName = environment.name;
  }

}
