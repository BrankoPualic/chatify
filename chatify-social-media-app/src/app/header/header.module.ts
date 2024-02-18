import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SearchComponent } from './search/search.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, SearchComponent, NotificationsComponent],
  imports: [CommonModule, AppRoutingModule, SharedModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
