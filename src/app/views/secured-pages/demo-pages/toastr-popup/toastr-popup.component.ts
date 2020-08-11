import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@tqp/services/notification.service';

@Component({
  selector: 'app-toastr-popup',
  templateUrl: './toastr-popup.component.html',
  styleUrls: ['./toastr-popup.component.css']
})
export class ToastrPopupComponent {

  constructor(private notificationService: NotificationService) { }

  public showSuccess() {
    this.notificationService.showSuccess('This is a success message.', 'Success Message');
  }

  public showError() {
    this.notificationService.showError('This is an error message.', 'Error Message');
  }

  public showInfo() {
    this.notificationService.showInfo('This is an info message.', 'Info Message');
  }

  public showWarning() {
    this.notificationService.showWarning('This is a warning message.', 'Warning Message');
  }

}
