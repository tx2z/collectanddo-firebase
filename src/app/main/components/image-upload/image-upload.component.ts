import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export interface ImageFile {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  @Input() image: string;
  @Input() imageType: string;
  @Input() forceName: string;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  userUid: string;

  // Upload Task
  uploadTask: AngularFireUploadTask;

  // Progress in percentage
  uploadPercentage$: Observable<number>;

  // Snapshot of uploading file
  uploadSnapshot$: Observable<any>;

  // Uploaded File URL
  uploadedFileURL$: Observable<string>;


  // File details
  fileSize: number;

  // Status check
  isUploading: boolean;

  constructor(
    private firebaseStorage: AngularFireStorage,
    private authService: AuthService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.isUploading = false;
    this.authService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.userUid = user.uid;
        } else {
          this.userUid = null;
        }
      },
    });
  }

  uploadFile(event: FileList) {

    // The File object
    const file = event.item(0);

    const fileExtension = file.type.split('/')[1];
    const allowedExtensions = ['gif', 'jpeg', 'png', 'webp'];

    // Validation for Images Only
    if (!allowedExtensions.includes(fileExtension)) {
     alert('Unsupported file type');
     return;
    }

    this.isUploading = true;

    let path: string;
    // The storage path
    if (this.forceName) {
      path = `${this.userUid}/${this.forceName}.${fileExtension}`;
    } else {
      path = `${this.userUid}/${this.imageType}_${new Date().getTime()}_${file.name}`;
    }
    // Optional metadata
    const customMetadata = {
      userUid: this.userUid,
      type: this.imageType,
    };

    // File reference
    const fileRef = this.firebaseStorage.ref(path);

    // The main task
    this.uploadTask = this.firebaseStorage.upload(path, file, { customMetadata });

    // Get file progress percentage
    this.uploadPercentage$ = this.uploadTask.percentageChanges();
    this.uploadSnapshot$ = this.uploadTask.snapshotChanges().pipe(
      finalize(() => {
        // Get uploaded file storage path
        this.uploadedFileURL$ = fileRef.getDownloadURL();

        this.uploadedFileURL$.subscribe(async filepath => {
          this.isUploading = false;
          this.notify.emit(filepath);
          const toast = await this.toastController.create({
            message: 'Image Updated',
            duration: 5000
          });
          toast.present();
        }, error => {
          console.error(error);
        });
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    );
  }

}
