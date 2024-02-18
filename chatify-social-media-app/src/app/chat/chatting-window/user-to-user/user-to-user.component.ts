import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'src/app/shared/model.interface';
import { io } from 'socket.io-client';
import { MessageService } from 'src/app/services/message.service';
import { Observable, Subscription, map, timer } from 'rxjs';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-user-to-user',
  templateUrl: './user-to-user.component.html',
  styleUrls: ['./user-to-user.component.css'],
})
export class UserToUserComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('messagesContainer', { static: false })
  messagesContainer: ElementRef;
  @ViewChild('mess') textareaMsg: ElementRef;
  chat: any;
  chatSubscription: Subscription;
  messages: Message[];
  mineId: number = this.authService.getUserFromToken()?.userId as number;
  isTyping: boolean = false;
  socket: any;
  private typingTimerSubscription: Subscription;
  offset: number = 0;
  settings: boolean = false;

  isPhoneOrTablet$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private responsive: BreakpointObserver
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));

    this.chatSubscription = this.messageService.chatObserver$.subscribe(
      (chat: any) => {
        this.chat = chat;

        const pack = {
          me: this.mineId,
          him: this.chat.user_id as number,
          offset: this.offset,
        };
        this.messageService.getConversation(pack).subscribe({
          next: (response: any) => {
            this.messages = response;
            this.messages.reverse();
            this.changeDetector.detectChanges();
            this.scrollToBottom();
          },
          error: (error) => {
            console.error(error);
          },
        });

        // Socket event emitter
        this.socket.emit('userConnected', this.mineId);

        // Socket event listeners
        this.socket.on('receiveMessage', (response: Message) => {
          this.messages.push(response);
          this.changeDetector.detectChanges();
          this.scrollToBottom();
        });
        this.socket.on('isTyping', (user_id: number) => {
          if (user_id !== this.mineId) {
            this.isTyping = true;
            this.changeDetector.detectChanges();
            this.scrollToBottom();

            if (this.typingTimerSubscription) {
              this.typingTimerSubscription.unsubscribe();
            }
            this.typingTimerSubscription = timer(1500).subscribe(() => {
              this.isTyping = false;
            });
          }
        });
      }
    );
  }
  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    }
  }

  showProfile(id: number) {
    this.router.navigate([`/profile/${id}`]);
  }

  onMessageTyping() {
    const recipient_id = this.chat.user_id as number;
    this.startTyping(recipient_id);
  }

  sendMessage(value: string) {
    if (value !== '') {
      const pack = {
        me: this.mineId,
        him: this.chat.user_id as number,
        message: value,
      };
      this.messageService.sendMessage(pack).subscribe({
        next: (response: any) => {
          this.textareaMsg.nativeElement.value = '';
          this.messages.push(response);
          this.changeDetector.detectChanges();
          this.scrollToBottom();

          // Package for socket.io emitter
          const sender_id = this.mineId;
          const username = response.username;
          const profile_picture_src = response.profile_picture_src;
          const message_date = response.message_date;
          const message_id = response.message_id;
          const message_text = value;
          const recipient_id = this.chat.user_id as number;

          this.socket.emit('sendMessage', {
            message_id,
            sender_id,
            recipient_id,
            message_text,
            message_date,
            username,
            profile_picture_src,
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
    this.scrollToBottom();
  }

  localTimeZone(date: string) {
    const newDate = new Date(date);
    const localTime = new Date(
      newDate.getTime() + newDate.getTimezoneOffset() * 60000
    );
    return localTime;
  }

  startTyping(recipient_id: number) {
    const myId = this.mineId;
    this.socket.emit('typing', { myId, recipient_id });
  }

  onChatScroll() {
    const container = this.messagesContainer.nativeElement;
    if (container.scrollTop === 0) {
      this.offset += 20;
      this.fetchMessages();
    }
  }

  fetchMessages() {
    const pack = {
      me: this.mineId,
      him: this.chat.user_id as number,
      offset: this.offset,
    };
    this.messageService.getConversation(pack).subscribe({
      next: (response: any) => {
        response.reverse();
        this.messages = [...response, ...this.messages];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  openChatUserSettings() {
    this.settings = true;
  }

  closeSettings(value: boolean) {
    this.settings = value;
  }
}
