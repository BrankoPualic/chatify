import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css'],
})
export class UploadImagesComponent implements OnInit {
  @Output() closeUploads: EventEmitter<boolean> = new EventEmitter();
  @Output() goBackEmitter: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  imageForm: FormGroup;
  files: File[] = [];
  imageUrls: SafeUrl[] = [];
  showBrowseInnerText: boolean = true;
  step1: boolean = true;
  step2: boolean = false;

  isPhoneOrTablet$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private authService: AuthService,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.imageForm = this.fb.group({
      files: [[], Validators.required],
      desc: [''],
    });

    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));
  }

  onImageUpload() {
    const user = this.authService.getUserFromToken() as { userId: number };
    const userId = user.userId;
    const formData = new FormData();
    formData.append('id', String(userId));
    formData.append('description', this.imageForm.get('desc')?.value);
    for (let file of this.files) {
      formData.append('files', file, file.name);
    }

    // this.imageForm.get('files')?.setValue(this.files);
    this.userService.publishImagePost(formData).subscribe({
      next: (response: any) => {
        this.imageForm.reset();
        this.closeUploads.emit(false);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onBrowseClick() {
    this.fileInput.nativeElement.click();
  }

  onInputChange(files?: FileList) {
    const newFiles: File[] = [];

    if (files) {
      // If files are provided (e.g., dropped images), add them to the newFiles array
      for (let i = 0; i < files.length; i++) {
        if (
          !this.isFileAlreadySelected(files[i]) &&
          this.files.length + newFiles.length < 12
        ) {
          newFiles.push(files[i]);
        }
      }
    } else {
      // If files are from the file input, add them to the newFiles array
      for (let i = 0; i < this.fileInput.nativeElement.files!.length; i++) {
        const file = this.fileInput.nativeElement.files![i];
        if (
          !this.isFileAlreadySelected(file) &&
          this.files.length + newFiles.length < 12
        ) {
          newFiles.push(file);
        }
      }
    }
    // Process the newFiles array
    for (let i = 0; i < newFiles.length; i++) {
      this.files.push(newFiles[i]);
      this.convertImageToBase64(newFiles[i]);
    }
  }

  private isFileAlreadySelected(file: File): boolean {
    return this.files.some((existingFile) => existingFile.name === file.name);
  }
  private convertImageToBase64(file: File) {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const base64Url = event.target.result.toString();
        this.imageUrls.push(this.sanitizer.bypassSecurityTrustUrl(base64Url));
      }
    };

    reader.readAsDataURL(file);
  }

  delImage(url: SafeUrl, index: number) {
    const urlIndex = this.imageUrls.indexOf(url);
    this.imageUrls.splice(urlIndex, 1);
    this.files.splice(index, 1);
  }

  onFormDragOver(event: DragEvent, element: HTMLFormElement) {
    event.preventDefault();
    element.classList.add('dragover');
    this.showBrowseInnerText = false;
  }
  onFormDragLeave(event: DragEvent, element: HTMLFormElement) {
    event.preventDefault();
    element.classList.remove('dragover');
    this.showBrowseInnerText = true;
  }
  onFormDrop(event: DragEvent, element: HTMLFormElement) {
    event.preventDefault();
    element.classList.remove('dragover');
    this.showBrowseInnerText = true;

    const droppedFiles = event.dataTransfer?.files;

    this.onInputChange(droppedFiles);
  }

  goBack() {
    this.goBackEmitter.emit(false);
  }

  goToStep2() {
    this.step1 = false;
    this.step2 = true;
  }

  goBackToImages() {
    this.step2 = false;
    this.step1 = true;
  }
}
