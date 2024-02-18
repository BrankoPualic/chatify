import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, map, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { ScaleAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-group-chat-settings',
  templateUrl: './group-chat-settings.component.html',
  styleUrls: ['./group-chat-settings.component.css'],
  animations: [ScaleAnimation],
})
export class GroupChatSettingsComponent implements OnInit, OnDestroy {
  @Input() groupId: number;
  @Input() groupUser: any;
  @Output() closeSettingsEmitter: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('main') mainGroupSettingsWindow: ElementRef;
  group: any;
  members: any;
  groupSubscription: Subscription;
  me: string = this.authService.getUserFromToken()?.username as string;
  editGroupComponent: boolean = false;
  addNewMembersComponent: boolean = false;
  userOptionsComponent: boolean = false;
  userEdit: any;

  isPhoneOrTablet$: Observable<boolean>;

  constructor(
    private groupService: GroupService,
    private router: Router,
    private authService: AuthService,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));

    const gid = {
      gid: this.groupId,
    };
    this.groupSubscription = this.groupService
      .fetchGroupInformations(gid)
      .subscribe({
        next: (response: any) => {
          this.group = response.group;
          this.members = response.members;

          this.groupService.changeGroupSubject$.subscribe((group) => {
            if (group) {
              if (group.group_name !== this.group.group_name) {
                if (Object.hasOwn(group, 'image')) {
                  this.group.group_image_src = group.group_image_src;
                  this.group.group_name = group.group_name;
                  this.group.description = group.description;
                } else {
                  this.group.group_name = group.group_name;
                  this.group.description = group.description;
                }
              }
            }
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
  ngOnDestroy(): void {
    this.groupSubscription.unsubscribe();
  }

  showProfile(id: number) {
    this.router.navigate([`/profile/${id}`]);
  }
  closeSettings() {
    this.closeSettingsEmitter.emit(false);
  }

  editGroup() {
    this.hideMainGroupSettingsBlock();
    this.editGroupComponent = true;
  }

  closeAllModals(value: boolean) {
    this.mainGroupSettingsWindow.nativeElement.style.display = 'flex';
    this.editGroupComponent = value;
    this.addNewMembersComponent = value;
    this.userOptionsComponent = value;
  }

  hideMainGroupSettingsBlock() {
    this.mainGroupSettingsWindow.nativeElement.style.display = 'none';
  }

  addNewMembers() {
    this.hideMainGroupSettingsBlock();
    this.addNewMembersComponent = true;
  }

  openUserOptions(index: number) {
    this.userEdit = this.members[index];
    this.hideMainGroupSettingsBlock();
    this.userOptionsComponent = true;
  }

  removeMember(id: number) {
    this.members = this.members.filter((user: any) => user.user_id !== id);
    this.mainGroupSettingsWindow.nativeElement.style.display = 'flex';
    this.userOptionsComponent = false;
  }
}
