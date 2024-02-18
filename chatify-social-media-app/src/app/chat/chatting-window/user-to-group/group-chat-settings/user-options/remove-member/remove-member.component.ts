import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';
import { ScaleAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-remove-member',
  templateUrl: './remove-member.component.html',
  styleUrls: ['./remove-member.component.css'],
  animations: [ScaleAnimation],
})
export class RemoveMemberComponent implements OnInit {
  @Input() userId: number;
  @Input() groupId: number;
  @Output() exit: EventEmitter<boolean> = new EventEmitter();
  @Output() exitUserOptions: EventEmitter<number> = new EventEmitter();

  isPhoneOrTablet$: Observable<boolean>;

  constructor(
    private groupService: GroupService,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));
  }

  exitRemoveModal() {
    this.exit.emit(false);
  }

  removeUserFromGroup() {
    const pack = {
      uid: this.userId,
      gid: this.groupId,
    };
    this.groupService.removeUserFromGroup(pack).subscribe({
      next: (response: any) => {
        this.exitUserOptions.emit(this.userId);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
