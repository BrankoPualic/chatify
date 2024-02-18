import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  isSignin: boolean = true;
  isPhoneOrTablet$: Observable<boolean>;
  // isPhone$: Observable<boolean>;

  constructor(private responsive: BreakpointObserver) {}

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Tablet, Breakpoints.Handset])
      .pipe(map(({ matches }) => matches));

    // this.isPhone$ = this.responsive
    //   .observe(Breakpoints.Handset)
    //   .pipe(map(({ matches }) => matches));
  }

  changeForm(value: boolean) {
    value ? (this.isSignin = false) : (this.isSignin = true);
  }
}
