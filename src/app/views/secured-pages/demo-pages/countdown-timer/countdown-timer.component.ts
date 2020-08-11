import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit {
  public countdownMillis: any;
  public countdownDisplay: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
