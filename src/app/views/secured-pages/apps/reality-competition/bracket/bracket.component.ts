import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { RealityCompetitionService } from '../reality-competition.service';
import { PickChart } from '../PickChart';
import { Score } from '../Score';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})
export class BracketComponent implements OnInit {
  public userGuid: string;

  // Picks Table
  public picksLoading: boolean = false;
  public picksRoundCount: number;
  public picksDataSource: PickChart[] = [];
  public picksRecords: PickChart[] = [];
  public picksDisplayedColumns: string[] = [];

  // Stay Table
  public stayLoading: boolean = false;
  public stayRecords: Score[] = [];
  public stayDataSource: Score[] = [];
  public stayDisplayedColumns: string[] = [
    'contestantName',
    'pointDifferential'
  ];

  // Leave Table
  public leaveLoading: boolean = false;
  public leaveRecords: Score[] = [];
  public leaveDataSource: Score[] = [];
  public leaveDisplayedColumns: string[] = [
    'contestantName',
    'pointDifferential'
  ];

  // Inconsequential Table
  public inconsequentialLoading: boolean = false;
  public inconsequentialRecords: Score[] = [];
  public inconsequentialDataSource: Score[] = [];
  public inconsequentialDisplayedColumns: string[] = [
    'contestantName',
    'pointDifferential'
  ];

  constructor(private realityCompetitionService: RealityCompetitionService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['guid'] !== undefined) {
        this.userGuid = params['guid'];
        this.populatePickChart('key_team2', this.userGuid);
        this.populateStayTable('key_team2', this.userGuid);
        this.populateLeaveTable('key_team2', this.userGuid);
        this.populateInconsequentialTable('key_team2', this.userGuid);
      } else {
        console.error('No ID was present.');
      }
    }).then();
  }

  public populatePickChart(teamKey: string, userKey: string): void {
    this.picksLoading = true;
    this.realityCompetitionService.getPickChartData(teamKey, userKey).subscribe(
      (chartData: PickChart[]) => {
        // console.log('chartData', chartData);

        this.picksDisplayedColumns.push('contestantKey');

        // Get chart stats
        this.picksRoundCount = Math.max.apply(Math, chartData.map((o) => o.round));
        const maxPosition = Math.max.apply(Math, chartData.map((o) => o.position));
        // console.log('picksRecordCount: ', this.picksRecordCount, '\nmaxPosition:', maxPosition);
        // console.log('chartData', chartData);

        for (let i = 1; i <= this.picksRoundCount; i++) {
          this.picksDisplayedColumns.push('round' + i);
        }

        // Poulate Table
        chartData.forEach(item => {
          this.picksRecords.push(item);
        });

        // Pivot Data
        this.picksDataSource = chartData.reduce((prev, cur) => {
          const existing = prev.find(x => x.contestantKey === cur.contestant.contestantKey);
          if (existing) {
            existing.values.push(cur);
          } else {
            prev.push({
              contestantKey: cur.contestant.contestantKey,
              values: [cur]
            });
          }
          return prev;
        }, []);
      }, error => {
        console.error('Error: ', error);
      }, () => {
        this.picksLoading = false;
      }
    );
  }

  private populateStayTable(teamKey: string, userKey: string): void {
    this.stayLoading = true;
    this.realityCompetitionService.getStayData(teamKey, userKey).subscribe(
      (stayList: Score[]) => {
        // console.log('stayList', stayList);
        stayList.forEach(item => {
          this.stayRecords.push(item);
        });
        this.stayDataSource = this.stayRecords;
      }, error => {
        console.error('Error: ', error);
      }, () => {
        this.stayLoading = false;
      }
    );
  }

  private populateLeaveTable(teamKey: string, userKey: string): void {
    this.inconsequentialLoading = true;
    this.realityCompetitionService.getLeaveData(teamKey, userKey).subscribe(
      (leaveList: Score[]) => {
        // console.log('leaveList', leaveList);
        leaveList.forEach(item => {
          this.leaveRecords.push(item);
        });
        this.leaveDataSource = this.leaveRecords;
      }, error => {
        console.error('Error: ', error);
      }, () => {
        this.inconsequentialLoading = false;
      }
    );
  }

  private populateInconsequentialTable(teamKey: string, userKey: string): void {
    this.inconsequentialLoading = true;
    this.realityCompetitionService.getInconsequentialData(teamKey, userKey).subscribe(
      (inconsequentialList: Score[]) => {
        // console.log('inconsequentialList', inconsequentialList);
        inconsequentialList.forEach(item => {
          this.inconsequentialRecords.push(item);
        });
        this.inconsequentialDataSource = this.inconsequentialRecords;
      }, error => {
        console.error('Error: ', error);
      }, () => {
        this.inconsequentialLoading = false;
      }
    );
  }

  public getCustomClass(value: string): string {
    return value.toLowerCase();
  }

  public getCustomIcon(value: string): string {
    switch (value.toLowerCase()) {
      case 'correct':
        return '';
      case 'wrong':
        return 'fa fa-close';
      case 'projected':
        return 'fa fa-question';
      default:
        return '';
    }
  }

  public getCustomText(value: string, points: number): string {
    switch (value.toLowerCase()) {
      case 'correct':
        return points.toString();
      case 'wrong':
        return '';
      case 'projected':
        return '';
      default:
        return '';
    }
  }

  public calculateTotal(picksDataSource: PickChart[], i): string {
    const points = picksDataSource.reduce((accum, curr) => {
      // Add points for all picks in the current round that are correct.
      const pickChartItem = curr['values']
        .filter(obj => obj.round === i + 1)
        .filter(obj => obj.status === 'CORRECT');
      const cellPoints = pickChartItem[0] ? pickChartItem[0].points : 0;
      return accum + cellPoints;
    }, 0);
    return points !== 0 ? points : '';
  }

  public counter(i: number) {
    return new Array(i);
  }

}
