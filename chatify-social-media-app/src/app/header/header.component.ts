import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userId: number;
  show_notifications: boolean = false;
  notification_num: number;
  notificationsFetched: any[] = [];
  user: { userId: number } | null;
  isSignedin: boolean = false;
  search: boolean = false;

  // Responsive
  isPhoneOrTablet$: Observable<boolean>;
  isOtherThanHome: boolean = false;

  constructor(
    private responsive: BreakpointObserver,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const firstSegment = event.url.split('/')[1];
        firstSegment !== 'home'
          ? (this.isOtherThanHome = true)
          : (this.isOtherThanHome = false);
      }
    });
  }

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));

    // Code

    this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isSignedin = isAuthenticated;
      if (isAuthenticated) {
        this.user = this.authService.getUserFromToken() as { userId: number };
        if (this.user) {
          this.userId = this.user.userId;
          const value = { id: this.user.userId };
          this.userService.getNotifications(value).subscribe({
            next: (response: any) => {
              this.notification_num = response.total;
              if (response.total > 0) {
                this.notificationsFetched = response.all_notifications;
              }
            },
            error: (error) => {
              console.error(error);
            },
          });
        }
      }
    });
  }

  // Search bar logic

  openSearchBar() {
    this.search = true;
  }

  hideSearchModal(value: boolean) {
    this.search = value;
  }

  // Notifications logic

  showNotifications() {
    this.show_notifications = !this.show_notifications;
  }

  // Sign out

  signout() {
    this.authService.signout();
  }

  newNotificationNumber(notifications: number) {
    this.notification_num = notifications;
  }
}
