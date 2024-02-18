import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { ScaleAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.css'],
  animations: [ScaleAnimation],
})
export class AddFriendsComponent implements OnInit {
  @Input() groupId: number;
  @Output() closeAddingModalEmitter: EventEmitter<boolean> = new EventEmitter();
  results: any[];
  myId: number = this.authService.getUserFromToken()?.userId as number;

  isPhoneOrTablet$: Observable<boolean>;

  constructor(
    private groupService: GroupService,
    private authService: AuthService,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));
  }

  onSearch(value: string) {
    if (value !== '') {
      const pack = {
        id: this.myId,
        group: this.groupId,
        value: value,
      };

      this.groupService.findFriends(pack).subscribe({
        next: (response: any) => {
          this.results = response;
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.results = [];
    }
  }

  addUser(id: number, index: number) {
    const pack = {
      user: id,
      group: this.groupId,
    };

    this.groupService.addMember(pack).subscribe({
      next: (response: any) => {
        this.results.splice(index, 1);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  closeModal() {
    this.closeAddingModalEmitter.emit(false);
  }
}
