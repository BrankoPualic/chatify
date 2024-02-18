import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { Post, Comment } from 'src/app/shared/model.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy {
  postSubscription: Subscription;
  post: Post;
  selectedIndex: number = 0;
  postComments: Comment[] = [];
  comment: FormGroup;
  userId: number;

  isPhoneOrTablet$: Observable<boolean>;

  constructor(
    private blogService: BlogService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));

    const user = this.authService.getUserFromToken() as { userId: number };
    this.userId = user.userId;
    this.postSubscription = this.route.params.subscribe((params: Params) => {
      const post_id = { user_id: this.userId, post_id: +params['pid'] };
      this.blogService.getPost(post_id).subscribe({
        next: (response: any) => {
          this.post = response;
          let images = response.file_src_array.split(',');
          this.post.file_src_array = images;
          if (this.post.comment_count !== null && this.post.comment_count > 0) {
            const pack = {
              post_id: this.post.post_id,
            };
            this.blogService.getComments(pack).subscribe({
              next: (response: any) => {
                this.postComments = response.comments;
              },
              error: (error) => {
                console.error(error);
              },
            });
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    });

    this.comment = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(700)]],
    });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  selectImage(index: number, arrayLength?: number) {
    if (arrayLength) {
      index > arrayLength - 1 || index < 0
        ? (this.selectedIndex = this.selectedIndex)
        : (this.selectedIndex = index);
    } else {
      this.selectedIndex = index;
    }
  }

  commentLiked(id: number) {
    const pack = {
      user_id: this.userId,
      comment_id: id,
    };
    this.blogService.likeComment(pack).subscribe({
      next: (response: any) => {
        this.postComments = this.postComments.map((comment) => {
          if (comment.comment_id === id) {
            comment.like_count = response.like_count;
            comment.is_liked = response.status;
          }
          return comment;
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
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
          this.post.comment_count === null
            ? (this.post.comment_count = 1)
            : this.post.comment_count++;
          this.postComments.push(response.comment);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  postLiked(id: number) {
    const pack = {
      post_id: id,
      user_id: this.userId,
    };
    this.blogService.likePost(pack).subscribe({
      next: (response: any) => {
        console.log(response);
        this.post.like_count = response.like_count;
        this.post.is_liked = response.status;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  showProfile(id: number) {
    this.router.navigate([`/profile/${id}`]);
  }
}
