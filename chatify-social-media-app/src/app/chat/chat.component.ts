import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { GroupService } from '../services/group.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @ViewChild('main') main: ElementRef;
  @ViewChild('opt') chats: ElementRef;
  @ViewChild('search') searchInput: ElementRef;
  showUsersChat: boolean = true;
  showGroupsChat: boolean = false;
  chatOpened: boolean = false;
  activeButton: boolean = true;
  conversations: any[] = [];
  searchType: string = 'users';
  searching: boolean = false;
  myId: number;
  searchedResults: any[] = [];
  textMessage: string = "You don't have conversation history.";
  whatChatIsOpened: any;
  openGroupCreationModal: boolean = false;

  routeSubscription: Subscription;
  usernameSubs: Subscription;

  isPhoneOrTablet$: Observable<boolean>;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));

    this.myId = this.authService.getUserFromToken()?.userId as number;

    const pack = {
      id: this.myId,
    };

    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      if (params['gid']) {
        this.activeButton = false;
        this.messageService.loadExistingGroupConversations(pack).subscribe({
          next: (response: any) => {
            this.conversations = response;
            this.openGroupConversation(+params['gid']);
          },
          error: (error) => {
            console.error(error);
          },
        });
      } else if (params['uid']) {
        this.activeButton = true;
        this.messageService.loadExistingConversations(pack).subscribe({
          next: (response: any) => {
            this.conversations = response;
            this.openUserConversation(+params['uid']);
          },
          error: (error) => {
            console.error(error);
          },
        });
      } else {
        this.activeButton = true;
        this.messageService.loadExistingConversations(pack).subscribe({
          next: (response: any) => {
            this.conversations = response;
          },
          error: (error) => {
            console.error(error);
          },
        });
      }
    });

    this.usernameSubs = this.messageService.sendMessageProfile$.subscribe(
      (username: string) => {
        this.submitSearch(username);
      }
    );
  }

  showUsers() {
    this.activeButton = true;
    this.searchType = 'users';
    const pack = {
      id: this.myId,
    };
    this.searchInput.nativeElement.value = '';
    this.searching = false;
    this.conversations = [];
    this.messageService.loadExistingConversations(pack).subscribe({
      next: (response: any) => {
        this.conversations = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  showGroups() {
    this.activeButton = false;
    this.searchType = 'groups';
    const pack = {
      id: this.myId,
    };
    this.searchInput.nativeElement.value = '';
    this.searching = false;
    this.conversations = [];
    this.messageService.loadExistingGroupConversations(pack).subscribe({
      next: (response: any) => {
        this.conversations = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  submitSearch(value: string) {
    this.searching = true;
    if (value !== '') {
      const pack = {
        id: this.myId,
        name: value,
        search: this.searchType,
      };
      this.searchedResults = [];
      this.messageService.findConversations(pack).subscribe({
        next: (response: any) => {
          this.searchedResults = [...response];
          if (this.searchedResults.length === 0) {
            if (this.searchType === 'users')
              this.textMessage = 'User not found!';
            if (this.searchType === 'groups')
              this.textMessage = 'Group not found!';
            this.searching = false;
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.textMessage = "You don't have conversation history.";
      this.searching = false;
    }
  }

  openUserChat(id: number) {
    if (this.main.nativeElement.classList[0] === 'phoneOrTablet') {
      this.chats.nativeElement.style.display = 'none';
    }
    this.chatOpened = true;
    this.whatChatIsOpened = this.searchedResults.find(
      (user) => user.user_id === id
    );
    this.messageService.setNewChat(this.whatChatIsOpened);
  }

  openGroupChat(id: number) {
    if (this.main.nativeElement.classList[0] === 'phoneOrTablet') {
      this.chats.nativeElement.style.display = 'none';
    }
    this.chatOpened = true;
    this.whatChatIsOpened = this.searchedResults.find(
      (group) => group.group_id === id
    );
    this.messageService.setNewChat(this.whatChatIsOpened);
  }

  openUserConversation(id: number) {
    if (this.main.nativeElement.classList[0] === 'phoneOrTablet') {
      this.chats.nativeElement.style.display = 'none';
    }
    this.chatOpened = true;
    this.whatChatIsOpened = this.conversations.find(
      (conversation) => conversation.user_id === id
    );
    this.messageService.setNewChat(this.whatChatIsOpened);
  }

  openGroupConversation(id: number) {
    if (this.main.nativeElement.classList[0] === 'phoneOrTablet') {
      this.chats.nativeElement.style.display = 'none';
    }
    this.chatOpened = true;
    this.whatChatIsOpened = this.conversations.find(
      (conversation) => conversation.group_id === id
    );
    this.messageService.setNewChat(this.whatChatIsOpened);
  }

  localTimeZone(date: string) {
    const newDate = new Date(date);
    const localTime = new Date(
      newDate.getTime() + newDate.getTimezoneOffset() * 60000
    );
    return localTime;
  }

  createGroup() {
    this.openGroupCreationModal = true;
  }

  closeGroupCreationModal(value: boolean) {
    this.openGroupCreationModal = value;
  }

  navigateUrl(id: number) {
    if (this.activeButton) {
      this.router.navigate([`chat/${id}`]);
    } else {
      this.router.navigate([`chat/group/${id}`]);
    }
  }
}
