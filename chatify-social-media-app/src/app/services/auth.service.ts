import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import jwtdecode from 'jwt-decode';
import { User } from '../shared/model.interface';

interface UserSignin {
  email: string;
  password: string;
}
interface UserSignup {
  fullName: string;
  email: string;
  password: string;
  region: string;
  country: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private dataService: DataService, private router: Router) {}

  setAuthenticated(value: boolean) {
    this.isAuthenticatedSubject.next(value);
  }

  signup(userData: UserSignup): Observable<any> {
    return this.dataService.postDataJson(userData, '/user/signup').pipe(
      map((response) => {
        localStorage.setItem('token', response.token);
        this.setAuthenticated(true);
        return response;
      }),
      catchError((error) => {
        console.error('Signup error', error);
        throw error;
      })
    );
  }

  signin(credentials: UserSignin): Observable<any> {
    return this.dataService.postDataJson(credentials, '/user/signin').pipe(
      map((response) => {
        localStorage.setItem('token', response.token);
        this.setAuthenticated(true);
        return response;
      }),
      catchError((error) => {
        console.error('Signin error', error);
        throw error;
      })
    );
  }

  signout(): void {
    localStorage.removeItem('token');
    this.setAuthenticated(false);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserFromToken() {
    const token = this.getToken();
    if (token !== null) {
      const decodeToken = jwtdecode(token);
      return decodeToken as User;
    }
    return null;
  }
}
