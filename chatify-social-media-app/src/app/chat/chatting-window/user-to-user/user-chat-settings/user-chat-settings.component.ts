import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { ScaleAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-user-chat-settings',
  templateUrl: './user-chat-settings.component.html',
  styleUrls: ['./user-chat-settings.component.css'],
  animations: [ScaleAnimation],
})
export class UserChatSettingsComponent {
  @Output() closeSettingsEmitter: EventEmitter<boolean> = new EventEmitter();
  @Input() chatUser: any;
  @ViewChild('main') mainBlock: ElementRef;
  reportModal: boolean = false;

  constructor(private router: Router) {}
  closeSettings() {
    this.closeSettingsEmitter.emit(false);
  }
  showProfile() {
    this.router.navigate([`/profile/${this.chatUser}`]);
  }

  showReportModal() {
    this.reportModal = true;
    this.mainBlock.nativeElement.style.display = 'none';
  }
  closeModal(value: boolean) {
    this.mainBlock.nativeElement.style.display = 'flex';
    this.reportModal = value;
  }
}
