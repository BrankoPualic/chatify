import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/model.interface';
import { Observable, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css'],
})
export class HomeViewComponent implements OnInit {
  blogLength: number;

  isPhoneOrTablet$: Observable<any>;

  constructor(private response: BreakpointObserver) {}

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.response
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));
  }

  setBlog(blog: Post[]) {
    this.blogLength = blog.length;
  }
}
