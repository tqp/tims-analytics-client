import { Component, OnInit } from '@angular/core';
import { RealityCompetitionService } from '../reality-competition.service';
import { Score } from '../Score';
import { BestPick } from '../BestPick';

export class Pick {
  public contestantName: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public teamKey: string = 'key_team2';
  public userKey: string = 'key_user1';
  public againstUserKey: string = 'key_user2';

  // Dropdown
  public status: { isOpen: boolean } = {isOpen: false};
  public items: string[] = [
    'key_user1',
    'key_user2',
    'key_user3',
    'key_user4'
  ];

  public myCurrentScore: Score;
  public myCurrentScoreLoading: boolean = false;
  public myCurrentRank: string;

  public myProjectedScore: Score;
  public myProjectedScoreLoading: boolean = false;
  public myProjectedRank: string;

  // Current Scores Table
  public currentScoresLoading: boolean = false;
  public currentScoresRecords: Score[] = [];
  public currentScoresDataSource: Score[] = [];
  public currentScoresDisplayedColumns: string[] = [
    'user',
    'currentScore'
  ];

  // Projected Scores Table
  public projectedScoresLoading: boolean = false;
  public projectedScoresRecords: Score[] = [];
  public projectedScoresDataSource: Score[] = [];
  public projectedScoresDisplayedColumns: string[] = [
    'user',
    'bestPossibleScore'
  ];

  // Best Picks Table
  public bestPicksLoading: boolean = false;
  public bestPicksRecords: BestPick[] = [];
  public bestPicksDataSource: BestPick[] = [];
  public bestPicksDisplayedColumns: string[] = [
    'contestantKey',
    'myScore',
    'theirAverage',
    'pointDifferential'
  ];

  // Points Against Table
  public bestPicksAgainstLoading: boolean = false;
  public bestPicksAgainstRecords: BestPick[] = [];
  public bestPicksAgainstDataSource: BestPick[] = [];
  public bestPicksAgainstDisplayedColumns: string[] = [
    'contestantKey',
    'myScore',
    'theirScore',
    'pointDifferential'
  ];

  constructor(private realityCompetitionService: RealityCompetitionService) {
  }

  ngOnInit(): void {
    this.getMyCurrentScore();
    this.getMyProjectedScore();
    this.getCurrentScores();
    this.getProjectedScores();
    this.getBestPicks();
    this.getBestPicksAgainst('key_user2');
  }

  private getMyCurrentScore(): void {
    this.myCurrentScoreLoading = true;
    this.realityCompetitionService.getMyCurrentScore(this.teamKey, this.userKey).subscribe(
      (score: Score) => {
        // console.log('myCurrentScore', score);
        this.myCurrentScore = score;
      }, error => {
        console.error('Error: ', error);
      }, () => {
        this.myCurrentScoreLoading = false;
      }
    );
  }

  private getMyProjectedScore(): void {
    this.projectedScoresLoading = true;
    this.realityCompetitionService.getMyProjectedScore(this.teamKey, this.userKey).subscribe(
      (score: Score) => {
        // console.log('myProjectedScore', score);
        this.myProjectedScore = score;
      }, error => {
        console.error('Error: ', error);
      }, () => {
        this.projectedScoresLoading = false;
      }
    );
  }

  private getCurrentScores(): void {
    this.currentScoresLoading = true;
    this.currentScoresRecords = [];
    this.realityCompetitionService.getCurrentScores(this.teamKey).subscribe(
      (currentScoresList: Score[]) => {
        // console.log('currentScoresList', currentScoresList);
        currentScoresList.forEach(item => {
          this.currentScoresRecords.push(item);
        });
        this.myCurrentRank = this.getUserRank(this.currentScoresRecords, this.userKey);
        this.currentScoresDataSource = this.currentScoresRecords;
        this.currentScoresDataSource.sort((a, b) => b.score - a.score);
      }, error => {
        console.error('Error: ', error);
      }, () => {
        this.currentScoresLoading = false;
      }
    );
  }

  private getProjectedScores(): void {
    this.projectedScoresLoading = true;
    this.projectedScoresRecords = [];
    this.realityCompetitionService.getProjectedScores(this.teamKey).subscribe(
      (projectedScoresList: Score[]) => {
        // console.log('projectedScoresList', projectedScoresList);
        projectedScoresList.forEach(item => {
          this.projectedScoresRecords.push(item);
        });
        this.myProjectedRank = this.getUserRank(this.projectedScoresRecords, this.userKey);
        this.projectedScoresDataSource = this.projectedScoresRecords;
        this.projectedScoresDataSource.sort((a, b) => b.score - a.score);
      }, error => {
        console.error('Error: ', error);
      }, () => {
        this.projectedScoresLoading = false;
      }
    );
  }

  private getBestPicks(): void {
    this.bestPicksLoading = false;
    this.bestPicksRecords = [];
    this.realityCompetitionService.getBestPicks(this.teamKey, this.userKey).subscribe(
      (bestPicksList: BestPick[]) => {
        console.log('bestPicksList', bestPicksList);
        bestPicksList.forEach((bestPick: BestPick) => {
          this.bestPicksRecords.push(bestPick);
        });
        this.bestPicksDataSource = this.bestPicksRecords;
        this.bestPicksDataSource.sort((a, b) => b.pointDifferential - a.pointDifferential);
      }, error => {
        console.error('Error: ', error);
      }, () => {
        this.bestPicksLoading = false;
      }
    );
  }

  private getBestPicksAgainst(againstUserKey: string): void {
    this.bestPicksAgainstLoading = false;
    this.bestPicksAgainstRecords = [];
    this.realityCompetitionService.getBestPicksAgainst(this.teamKey, this.userKey, againstUserKey).subscribe(
      (bestPicksAgainstList: BestPick[]) => {
        console.log('bestPicksAgainstList', bestPicksAgainstList);
        bestPicksAgainstList.forEach((bestPickAgainst: BestPick) => {
          this.bestPicksAgainstRecords.push(bestPickAgainst);
        });
        this.bestPicksAgainstDataSource = this.bestPicksAgainstRecords;
        this.bestPicksAgainstDataSource.sort((a, b) => b.pointDifferential - a.pointDifferential);
      }, error => {
        console.error('Error: ', error);
      }, () => {
        this.bestPicksAgainstLoading = false;
      }
    );
  }

  public setAgainst(againstUserKey: string) {
    this.againstUserKey = againstUserKey;
    this.bestPicksAgainstDataSource = [];
    this.getBestPicksAgainst(againstUserKey);
  }

  public onHidden(): void {
    console.log('Dropdown is hidden');
  }

  public onShown(): void {
    console.log('Dropdown is shown');
  }

  public isOpenChange(): void {
    console.log('Dropdown state is changed');
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isOpen = !this.status.isOpen;
  }

  change(value: boolean): void {
    this.status.isOpen = value;
  }

  // SUPPORT

  private getUserRank(list: Score[], userKey: string): string {
    list.sort((a, b) => b.score - a.score);
    const index = list.findIndex(item => {
      return item.userKey === userKey;
    });
    const superscript: string = this.getSuperscript(index + 1);
    return (index + 1) + superscript + ' Place';
  }

  private getSuperscript(number: number): string {
    if (number > 3 && number < 21) {
      return 'th';
    }
    switch (number % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

}
