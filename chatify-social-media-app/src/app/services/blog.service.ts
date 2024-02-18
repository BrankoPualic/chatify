import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DataService } from './data.service';
import { Post } from '../shared/model.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private dataService: DataService) {}

  getBlog(userId: { id: number }): Observable<any> {
    return this.dataService.postDataJson(userId, '/blog');
  }

  likePost(pack: { post_id: number; user_id: number }): Observable<any> {
    return this.dataService.postDataJson(pack, '/blog/post/like');
  }

  postComment(pack: {
    user_id: number;
    post_id: number;
    comment: string;
  }): Observable<any> {
    return this.dataService.postDataJson(pack, '/blog/post/publishComment');
  }

  getComments(value: { post_id: number }): Observable<any> {
    return this.dataService.postDataJson(value, '/blog/post/allComments');
  }

  likeComment(pack: { user_id: number; comment_id: number }): Observable<any> {
    return this.dataService.postDataJson(pack, '/blog/post/commentLike');
  }

  getPost(value: { user_id: number; post_id: number }): Observable<any> {
    return this.dataService.postDataJson(value, '/blog/post');
  }
}
