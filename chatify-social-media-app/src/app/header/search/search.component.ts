import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ScaleAnimation } from 'src/app/shared/animations/animations';
interface SearchUsers {
  user_id: number;
  username: string;
  profile_picture_src: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [ScaleAnimation],
})
export class SearchComponent {
  searchUsers: SearchUsers[] = [];
  searchMessage: string = '';
  @Output() emitClose: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private userService: UserService) {}

  showProfile(id: number) {
    this.emitClose.emit(false);
    this.router.navigate([`/profile/${id}`]);
  }

  searched(value: string) {
    if (value !== '') {
      const name = {
        name: value,
      };
      this.userService.search(name).subscribe({
        next: (response: any) => {
          if (response.message) {
            this.searchMessage = response.message;
          } else {
            this.searchUsers = response;
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.searchUsers = [];
      this.searchMessage = '';
    }
  }

  closeSearchModal() {
    this.emitClose.emit(false);
  }
}
