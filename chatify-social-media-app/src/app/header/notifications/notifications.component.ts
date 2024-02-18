import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ScaleAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  animations: [ScaleAnimation],
})
export class NotificationsComponent {
  @Input() notification_number: number;
  @Input() notifications: any[];
  @Output() notificationNumberEmitter: EventEmitter<number> =
    new EventEmitter();
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  constructor(private userService: UserService) {}

  isRead(id: number) {
    this.notification_number--;
    this.notificationNumberEmitter.emit(this.notification_number--);
    const value = { id: id };

    this.userService.isRead(value).subscribe({
      next: (response: any) => {
        let indexN = 0;
        this.notifications.filter((el, index) => {
          if (el.notification_id === id) {
            indexN = index;
            return;
          }
        });
        this.notifications.splice(indexN, 1);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  closeNotifications() {
    this.closeModal.emit();
  }
}
