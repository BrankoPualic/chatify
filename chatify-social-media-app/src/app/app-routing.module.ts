import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivateFn } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserComponent } from './user/user.component';
import { PostComponent } from './home-view/blog/post/post.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: 'authorization', pathMatch: 'full' },
  {
    path: 'authorization',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'home', component: HomeViewComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: UserComponent, canActivate: [AuthGuard] },
  {
    path: 'user/:uid/post/:pid',
    component: PostComponent,
    canActivate: [AuthGuard],
  },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'chat/:uid', component: ChatComponent, canActivate: [AuthGuard] },
  {
    path: 'chat/group/:gid',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
