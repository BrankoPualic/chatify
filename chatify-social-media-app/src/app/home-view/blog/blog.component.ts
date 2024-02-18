import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { Post } from '../../shared/model.interface';
import { Observable, Subscription, map } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit, OnDestroy {
  @Output() blogEmitter: EventEmitter<Post[]> = new EventEmitter();
  blog: Post[] = [];
  blogSubscription: Subscription = new Subscription();
  selectedIndex: number = 0;
  comment: FormGroup;
  userId: number;
  lastClickTime: number | undefined = undefined;

  isPhonePortrait$: Observable<boolean>;

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private response: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.isPhonePortrait$ = this.response
      .observe(Breakpoints.HandsetPortrait)
      .pipe(map(({ matches }) => matches));

    // Getting blog for user
    const user = this.authService.getUserFromToken() as { userId: number };
    if (user !== null) {
      this.userId = user.userId;
      const userId = { id: user.userId };
      this.blogSubscription = this.blogService.getBlog(userId).subscribe({
        next: (response: any) => {
          response.forEach((post: any) => {
            let images = post.file_src_array.split(',');
            post.file_src_array = images;
            this.blog.push(post);
          });
          this.blogEmitter.emit(this.blog);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }

    // Comment
    this.comment = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(700)]],
    });
  }
  ngOnDestroy(): void {
    this.blogSubscription.unsubscribe();
  }

  postLiked(id: number) {
    const pack = {
      post_id: id,
      user_id: this.userId,
    };
    this.blogService.likePost(pack).subscribe({
      next: (response: any) => {
        this.blog = this.blog.map((post) => {
          if (post.post_id === id) {
            post.like_count = response.like_count;
            post.is_liked = response.status;
          }
          return post;
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // Sets index of image on dot/indicator click
  selectImage(index: number, arrayLength?: number): void {
    if (arrayLength) {
      index > arrayLength - 1 || index < 0
        ? (this.selectedIndex = this.selectedIndex)
        : (this.selectedIndex = index);
    } else {
      this.selectedIndex = index;
    }
  }

  showProfile(id: number) {
    this.router.navigate([`/profile/${id}`]);
  }

  showPost(postId: number, userId: number) {
    this.router.navigate([`/user/${userId}/post/${postId}`]);
  }

  onCommentSubmit(postId: number) {
    if (this.comment.get('comment')?.valid) {
      const pack = {
        user_id: this.userId,
        post_id: postId,
        comment: this.comment.get('comment')?.value,
      };
      this.blogService.postComment(pack).subscribe({
        next: (response: any) => {
          this.comment.reset();
          this.blog = this.blog.map((post) => {
            if (post.post_id === postId) {
              post.comment_count === null
                ? (post.comment_count = 1)
                : post.comment_count++;
            }
            return post;
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  onTap(postId: number) {
    const currentTime = Date.now();
    if (this.lastClickTime && currentTime - this.lastClickTime < 300) {
      this.postLiked(postId);
    }
    this.lastClickTime = currentTime;
  }
}
