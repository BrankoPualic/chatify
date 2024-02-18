import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from './upload/upload.component';
import { UploadImagesComponent } from './upload/upload-images/upload-images.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserComponent,
    UserSettingsComponent,
    UploadComponent,
    UploadImagesComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
})
export class UserModule {}
