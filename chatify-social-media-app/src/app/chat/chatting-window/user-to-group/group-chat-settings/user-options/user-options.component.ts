import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';
import { ScaleAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.css'],
  animations: [ScaleAnimation],
})
export class UserOptionsComponent implements OnInit, OnDestroy {
  @ViewChild('main') main: ElementRef;
  @Input() user: any;
  @Input() groupId: number;
  @Output() closeOptions: EventEmitter<boolean> = new EventEmitter();
  @Output() closeAndSplice: EventEmitter<number> = new EventEmitter();
  roles: { group_role_id: number; name: string }[];
  selectedUserRole: number;
  removeModal: boolean = false;
  roleSubscription: Subscription;

  isPhoneOrTablet$: Observable<boolean>;

  constructor(
    private groupService: GroupService,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));

    this.selectedUserRole = this.user.group_role_id;
    const pack = {
      my_role: this.selectedUserRole,
    };

    this.roleSubscription = this.groupService.fetchOtherRoles(pack).subscribe({
      next: (response: any) => {
        this.roles = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  ngOnDestroy(): void {
    this.roleSubscription.unsubscribe();
  }

  closeModal() {
    this.closeOptions.emit(false);
  }

  onRoleSelected() {
    console.log(this.selectedUserRole);

    const pack = {
      id: this.user.user_id,
      role: this.selectedUserRole as number,
      group: this.groupId,
    };
    this.groupService.updateUserRole(pack).subscribe({
      next: (response: any) => {
        this.user.group_role_id = response.group_role_id;
        this.user.name = response.name;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  openRemoveApproval() {
    this.main.nativeElement.style.display = 'none';
    this.removeModal = true;
  }

  closeRemoveModal(value: boolean) {
    this.main.nativeElement.style.display = 'flex';
    this.removeModal = value;
  }

  closeModalAndEmitUserId(id: number) {
    this.main.nativeElement.style.display = 'flex';
    this.closeAndSplice.emit(id);
  }
}
