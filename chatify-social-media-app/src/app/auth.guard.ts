import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.authService.getToken();
    if (token) {
      if (state.url === '/authorization') {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }

    const firstSegment = state.url.split('/')[1];
    switch (firstSegment) {
      case 'authorization':
        return true;
      case 'home':
      case 'profile':
      case 'user':
      case 'chat':
        this.router.navigate(['/authorization']);
        return false;
      default:
        return true;
    }
  }
}
