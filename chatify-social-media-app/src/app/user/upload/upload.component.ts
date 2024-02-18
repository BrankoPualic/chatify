import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ScaleAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  animations: [ScaleAnimation],
})
export class UploadComponent implements OnInit {
  @Output() closeModalEmit: EventEmitter<boolean> = new EventEmitter();
  showImageUploads: boolean = false;

  isPhoneOrTablet$: Observable<boolean>;

  constructor(private responsive: BreakpointObserver) {}

  ngOnInit(): void {
    this.isPhoneOrTablet$ = this.responsive
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map(({ matches }) => matches));
  }

  uploadImages() {
    this.showImageUploads = true;
  }

  closeUploadModal() {
    this.closeModalEmit.emit(false);
  }

  closeImageUpload(value: boolean) {
    this.showImageUploads = value;
  }
}
