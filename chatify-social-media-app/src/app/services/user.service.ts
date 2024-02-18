import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, ReplaySubject } from 'rxjs';

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
export class UserService {
  public passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  public fullNameRegex = /^[A-Z][a-zA-Z]{2,}(?: [A-Z][a-zA-Z]{1,})+$/;

  private userSubject = new ReplaySubject<number>(1);
  userSubject$ = this.userSubject.asObservable();

  setUserProfile(id: number) {
    this.userSubject.next(id);
  }

  constructor(private dataService: DataService) {}

  userSingin(user: UserSignin): Observable<any> {
    return this.dataService.postDataJson(user, '/user/signin');
  }

  getRegions(): Observable<any> {
    return this.dataService.getData('/user/regions');
  }

  getCountries(region: { region: string }): Observable<any> {
    return this.dataService.postDataJson(region, '/user/countries');
  }

  userSignup(user: UserSignup): Observable<any> {
    return this.dataService.postDataJson(user, '/user/signup');
  }

  search(value: { name: string }): Observable<any> {
    return this.dataService.postDataJson(value, '/user/search');
  }

  isFollowed(pack: { you: number; him: number }): Observable<any> {
    return this.dataService.postDataJson(pack, '/user/follow/check');
  }

  userProfile(value: { id: number }): Observable<any> {
    return this.dataService.postDataJson(value, '/user/profile');
  }

  follow(value: { you: number; him: number }): Observable<any> {
    return this.dataService.postDataJson(value, '/user/follow');
  }

  unfollow(value: { you: number; him: number }): Observable<any> {
    return this.dataService.deleteData(
      `/user/unfollow/you=${value.you}&him=${value.him}`
    );
  }

  getNotifications(value: { id: number }): Observable<any> {
    return this.dataService.postDataJson(value, '/user/notifications');
  }

  isRead(value: { id: number }): Observable<any> {
    return this.dataService.patchData(value, '/user/readNotification');
  }

  getReportReasons(): Observable<any> {
    return this.dataService.getData('/user/reportReasons');
  }

  sendReport(value: {
    you: number;
    him: number;
    report: object;
  }): Observable<any> {
    return this.dataService.postDataJson(value, '/user/report');
  }

  publishImagePost(value: FormData): Observable<any> {
    return this.dataService.postDataFiles(value, '/user/imagePublish');
  }

  changeProfilePicture(value: FormData): Observable<any> {
    return this.dataService.postDataFiles(value, '/user/profilePicture');
  }
}
