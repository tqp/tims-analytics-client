import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-username-from-id',
  templateUrl: './username-from-id.component.html',
  styleUrls: ['./username-from-id.component.css']
})
export class UsernameFromIdComponent implements OnInit {
  @Input() userId: number;
  public username: string = '';
  public loading: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsernameFromUserId(this.userId);
  }

  private getUsernameFromUserId(userId: number): void {
    this.loading = true;
    this.userService.getUserDetail(userId).subscribe(
      (response: any) => {
        // console.log('response', response);
        if (response != null) {
          const user: User = response;
          this.username = user.username;
        } else {
          this.username = 'Unknown ID ' + userId;
        }
      },
      error => {
        console.error('Error: ', error);
      },
      () => {
        this.loading = false;
      }
    );
  }

}
