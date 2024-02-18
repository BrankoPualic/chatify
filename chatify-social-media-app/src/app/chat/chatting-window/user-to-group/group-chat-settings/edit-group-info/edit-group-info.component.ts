import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';
import { ScaleAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-edit-group-info',
  templateUrl: './edit-group-info.component.html',
  styleUrls: ['./edit-group-info.component.css'],
  animations: [ScaleAnimation],
})
export class EditGroupInfoComponent implements OnInit {
  @Output() closeEditEmitter: EventEmitter<boolean> = new EventEmitter();
  @Input() groupInfo: any;
  @ViewChild('inputFile') inputFile: ElementRef;
  imageFile: File;
  newGroupImage: SafeUrl;
  form: FormGroup;

  isPhoneOrTablet$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private groupService: GroupService,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));

    this.form = this.fb.group({
      name: [
        this.groupInfo.group_name,
        [Validators.required, Validators.maxLength(50)],
      ],
      desc: [this.groupInfo.description, Validators.required],
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
        this.newGroupImage = this.sanitizer.bypassSecurityTrustUrl(base64Url);
      }
    };

    reader.readAsDataURL(file);
  }

  saveChanges() {
    if (
      this.form.get('name')?.value === this.groupInfo.group_name &&
      this.form.get('desc')?.value === this.groupInfo.description &&
      this.imageFile === undefined
    ) {
      return;
    } else if (this.imageFile) {
      const formData = new FormData();
      formData.append('id', this.groupInfo.group_id);
      formData.append('name', this.form.get('name')?.value);
      formData.append('desc', this.form.get('desc')?.value);
      formData.append('file', this.imageFile, this.imageFile.name);

      // Update
      this.groupService.updateAllGroupInfo(formData).subscribe({
        next: (response: any) => {
          this.groupService.setChangedGroupInformations(response);
          this.closeEdit();
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      const pack = {
        id: this.groupInfo.group_id,
        name: this.form.get('name')?.value,
        desc: this.form.get('desc')?.value,
      };
      this.groupService.updateGroupInfo(pack).subscribe({
        next: (response: any) => {
          this.groupService.setChangedGroupInformations(response);
          this.closeEdit();
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  closeEdit() {
    this.closeEditEmitter.emit(false);
  }
}
