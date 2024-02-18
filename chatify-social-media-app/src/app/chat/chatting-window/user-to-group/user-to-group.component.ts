import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, map, take, timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/shared/model.interface';
import { io } from 'socket.io-client';
import { GroupService } from 'src/app/services/group.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-user-to-group',
  templateUrl: './user-to-group.component.html',
  styleUrls: ['./user-to-group.component.css'],
})
export class UserToGroupComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('messagesContainer', { static: false })
  messagesContainer: ElementRef;
  @ViewChild('mess') textareaMsg: ElementRef;
  chat: any;
  chatSubscription: Subscription;
  messages: Message[];
  mineId: number = this.authService.getUserFromToken()?.userId as number;
  isTyping: boolean = false;
  userThatIsTyping: string;
  socket: any;
  private typingTimerSubscription: Subscription;
  changeGroup: Subscription;
  offset: number = 0;
  openGroupSettings: boolean = false;
  myRoleInThisGroup: { group_role_id: number; name: string };

  isPhoneOrTablet$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private groupService: GroupService,
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
          group: this.chat.group_id as number,
          offset: this.offset,
        };
        this.messageService.getConversation(pack).subscribe({
          next: (response: any) => {
            this.messages = response.messages;
            this.messages.reverse();
            this.changeDetector.detectChanges();
            this.scrollToBottom();
            this.myRoleInThisGroup = response.myRole;
          },
          error: (error) => {
            console.error(error);
          },
        });

        // Socket emitter
        const group_id = this.chat.group_id as number;
        this.socket.emit('groupUserConnected', group_id);

        // Socket event listeners
        this.socket.on('receiveMessage', (response: Message) => {
          this.messages.push(response);
          this.changeDetector.detectChanges();
          this.scrollToBottom();
        });
        this.socket.on(
          'gTyping',
          ({ myId, myUsername }: { myId: number; myUsername: string }) => {
            if (myId !== this.mineId) {
              this.userThatIsTyping = myUsername;
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
          }
        );
      }
    );

    this.changeGroup = this.groupService.changeGroupSubject$.subscribe(
      (group) => {
        if (group) {
          if (group.group_name !== this.chat.group_name) {
            if (Object.hasOwn(group, 'image')) {
              this.chat.group_image_src = group.group_image_src;
              this.chat.group_name = group.group_name;
              this.chat.description = group.description;
            } else {
              this.chat.group_name = group.group_name;
              this.chat.description = group.description;
            }
          }
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
    this.changeGroup.unsubscribe();
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

  onMessageTyping() {
    const group_id = this.chat.group_id as number;
    this.startTyping(group_id);
  }

  sendMessage(value: string) {
    if (value !== '') {
      const pack = {
        me: this.mineId,
        group: this.chat.group_id as number,
        message: value,
      };
      this.messageService.sendMessage(pack).subscribe({
        next: (response: any) => {
          this.textareaMsg.nativeElement.value = '';
          this.messages.push(response);
          this.changeDetector.detectChanges();
          this.scrollToBottom();

          // for socket.io emitter
          const sender_id = this.mineId;
          const username = response.username;
          const profile_picture_src = response.profile_picture_src;
          const message_date = response.message_date;
          const message_id = response.message_id;
          const message_text = value;
          const group_id = this.chat.group_id as number;

          this.socket.emit('sendGroupMessage', {
            message_id,
            sender_id,
            group_id,
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
      this.scrollToBottom();
    }
  }

  showProfile(id: number) {
    this.router.navigate([`/profile/${id}`]);
  }

  localTimeZone(date: string) {
    const newDate = new Date(date);
    const localTime = new Date(
      newDate.getTime() + newDate.getTimezoneOffset() * 60000
    );
    return localTime;
  }

  startTyping(group_id: number) {
    const myId = this.mineId;
    const myUsername = this.authService.getUserFromToken()?.username as string;
    this.socket.emit('groupTyping', { myId, group_id, myUsername });
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
  closeSettings(value: boolean) {
    this.openGroupSettings = value;
  }
}
