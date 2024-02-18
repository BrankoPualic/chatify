import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { ScaleAnimation } from 'src/app/shared/animations/animations';

interface UserSearched {
  user_id: number;
  username: string;
  profile_picture_src: string;
  added: boolean;
}
@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
  animations: [ScaleAnimation],
})
export class CreateGroupComponent implements OnInit {
  @ViewChild('inputFile') inputFile: ElementRef;
  @Output() closeModalEmitter: EventEmitter<boolean> = new EventEmitter();
  steps: number = 1;
  groupForm: FormGroup;
  groupImage: SafeUrl;
  imageFile: File;
  searching: boolean = false;
  addedUsers: UserSearched[] = [];
  searchedUsers: any[] = [];
  mineId: number;
  alreadyAdded: boolean = false;

  isPhoneOrTablet$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private authService: AuthService,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));

    this.mineId = this.authService.getUserFromToken()?.userId as number;
    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      desc: ['', Validators.required],
    });
  }

  closeGroupCreateModal() {
    this.closeModalEmitter.emit(false);
  }

  goStepBack() {
    this.steps--;
  }
  goStepForward() {
    this.steps++;
  }

  createGroup() {
    const formData = new FormData();
    formData.append('name', this.groupForm.get('name')?.value);
    formData.append('desc', this.groupForm.get('desc')?.value);
    formData.append('file', this.imageFile, this.imageFile.name);
    const users = this.addedUsers.map((user) => user.user_id);
    users.unshift(this.mineId);
    for (const userId of users) {
      formData.append('user_ids', String(userId));
    }
    this.messageService.createGroup(formData).subscribe({
      next: (response: any) => {
        this.groupForm.reset();
        this.closeModalEmitter.emit(false);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  uploadImage() {
    this.inputFile.nativeElement.click();
  }

  onInputChange() {
    const file = this.inputFile.nativeElement.files[0];

    this.convertImageToBase64(file);
    this.imageFile = file;
  }

  convertImageToBase64(file: File) {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const base64Url = event.target.result.toString();
        this.groupImage = this.sanitizer.bypassSecurityTrustUrl(base64Url);
      }
    };

    reader.readAsDataURL(file);
  }

  findFriends(name: string) {
    if (name !== '') {
      this.searching = true;
      const pack = {
        id: this.mineId,
        name: name,
        search: 'users',
      };
      this.messageService.findConversations(pack).subscribe({
        next: (response: any) => {
          this.searchedUsers = [...response];
          this.searchedUsers.forEach((user) => {
            const isAdded = this.addedUsers.find(
              (el) => el.user_id === user.user_id
            );

            if (isAdded) {
              user.added = true;
            }
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.searching = false;
    }
  }

  addFriendToGroup(user: any) {
    user.added = true;
    this.addedUsers.push(user);
  }

  removeFriend(index: number) {
    this.addedUsers.splice(index, 1);
  }
}
