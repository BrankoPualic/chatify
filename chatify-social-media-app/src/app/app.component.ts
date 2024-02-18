import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

declare var screen: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'chatify-social-media-app';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const auth = this.authService.isAuthenticated();
    if (auth) {
      this.authService.setAuthenticated(true);
    }

    screen.orientation.lock('portrait');

    this.lockScreenOrientation();
  }

  lockScreenOrientation() {
    if (screen && screen.orientation) {
      screen.orientation
        .lock('portrait')
        .then(() => {
          console.log('Screen orientation locked to portrait');
        })
        .catch((error: Error) => {
          console.error('Failed to lock screen orientation:', error);
        });
    }
  }
}
