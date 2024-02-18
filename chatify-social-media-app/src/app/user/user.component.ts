import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, map, take } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MessageService } from '../services/message.service';

interface Post {
  post_id: number;
  like_count: number | null;
  comment_count: number | null;
  first_post_file_id: number;
  first_file_src: string;
  showHover: boolean;
}
interface User {
  user_id: number;
  full_name: string;
  username: string;
  biography: string | null;
  profile_picture_src: string;
  total_posts: number;
  followers_count: number;
  following_count: number;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;
  following: string[] = ['Posts', 'Followers', 'Following'];
  followingValues: number[] = [];
  blog: Post[] = [];
  user: User;
  doFollow: boolean;
  myProfile: boolean;
  paramId: number;
  lsUser: any;
  userId: number;
  openPublishOptions: boolean = false;
  settings: boolean = false;
  profileSubscription: Subscription;

  isPhoneOrTablet$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private responsive: BreakpointObserver,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));

    this.lsUser = this.authService.getUserFromToken() as { userId: number };
    this.userId = this.lsUser.userId;
    this.route.params.subscribe((params: Params) => {
      this.paramId = +params['id'];
      this.userService.setUserProfile(this.paramId);
      if (this.paramId === this.userId) {
        this.myProfile = true;
      } else {
        this.myProfile = false;
      }
      if (!this.myProfile) {
        const pack = {
          you: this.userId,
          him: this.paramId,
        };
        this.userService.isFollowed(pack).subscribe({
          next: (response: any) => {
            response.state ? (this.doFollow = true) : (this.doFollow = false);
          },
          error: (error) => {
            console.error(error);
          },
        });
      }

      // Get User Profile
      this.userService.userSubject$.pipe(take(1)).subscribe((id: number) => {
        const value = { id: id };
        this.userService.userProfile(value).subscribe({
          next: (response: any) => {
            this.user = response.user;
            this.followingValues = [
              response.user.total_posts,
              response.user.followers_count,
              response.user.following_count,
            ];
            this.blog = [];
            if (response.blog.length !== 0) {
              response.blog.forEach((el: Post) => {
                this.blog.push({ ...el, showHover: false });
              });
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
      });
    });
  }

  ngOnDestroy(): void {
    // this.profileSubscription.unsubscribe();
  }

  follow(id: number) {
    const value = { you: this.userId, him: id };
    this.userService.follow(value).subscribe({
      next: (response: any) => {
        console.log(response);
        this.doFollow = true;
        this.followingValues[1]++;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  unfollow(id: number) {
    const value = { you: this.userId, him: id };
    this.userService.unfollow(value).subscribe({
      next: (response: any) => {
        console.log(response);
        this.doFollow = false;
        this.followingValues[1]--;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // Profile Options

  openSettings() {
    this.settings = !this.settings;
  }
  closeSettings(value: boolean) {
    this.settings = value;
  }

  // Uploads

  publishPost() {
    this.openPublishOptions = true;
  }
  closePublishModal(value: boolean) {
    this.openPublishOptions = value;
  }

  changeProfilePicture() {
    this.fileInput.nativeElement.click();
  }
  onImageAdded() {
    const file = this.fileInput.nativeElement.files;
    const formData = new FormData();
    formData.append('id', String(this.userId));
    formData.append('file', file[0], file[0].name);

    this.userService.changeProfilePicture(formData).subscribe({
      next: (response: any) => {
        this.user.profile_picture_src = response.picture;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  showPost(id: number) {
    this.router.navigate([`/user/${this.paramId}/post/${id}`]);
  }

  goToChat(username: string) {
    this.messageService.setUsernameInSearch(username);
    this.router.navigate([`/chat`]);
  }
}
