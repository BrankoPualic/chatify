import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chatting-window',
  templateUrl: './chatting-window.component.html',
  styleUrls: ['./chatting-window.component.css'],
})
export class ChattingWindowComponent {
  chatSubscription: Subscription;
  chat: any;
  whatTypeOfChat: string;

  constructor(private messageService: MessageService) {}
  ngOnInit(): void {
    this.chatSubscription = this.messageService.chatObserver$.subscribe(
      (chat: any) => {
        this.chat = chat;

        if (Object.hasOwn(this.chat, 'user_id')) {
          this.whatTypeOfChat = 'user';
        } else if (Object.hasOwn(this.chat, 'group_id')) {
          this.whatTypeOfChat = 'group';
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
  }
}
