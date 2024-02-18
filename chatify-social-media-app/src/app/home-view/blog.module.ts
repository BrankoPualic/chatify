import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { HomeViewComponent } from './home-view.component';
import { SharedModule } from '../shared/shared.module';
import { HammerModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './blog/post/post.component';

@NgModule({
  declarations: [BlogComponent, HomeViewComponent, PostComponent],
  imports: [CommonModule, SharedModule, HammerModule, ReactiveFormsModule],
  exports: [HomeViewComponent],
})
export class BlogModule {}
