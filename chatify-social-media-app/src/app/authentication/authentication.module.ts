import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SigninComponent, AuthenticationComponent, SignupComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AuthenticationComponent],
})
export class AuthenticationModule {}
