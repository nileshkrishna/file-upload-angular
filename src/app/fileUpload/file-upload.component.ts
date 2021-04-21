import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  fileToUpload: File = null;
  fileName: string = null;
  isFileUploadEnabled: boolean = false;
  showMessage: boolean = false;
  message: string;

  constructor(private httpClient: HttpClient) {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.fileName = this.fileToUpload.name;

    this.isFileUploadEnabled = this.fileToUpload != null;
  }

  saveFileInput() {
    this.isFileUploadEnabled = false;
    this.showMessage = true;
    this.message = "Uploading selected file";
    this.postFile(this.fileToUpload).subscribe(data => {
     this.message = "File uploaded";
    }, error => { this.message="Error occured while uploading file"});
  }

  //uploadFileToActivity() {
  //  this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
  //    // do something, if upload success
  //  }, error => {
  //    console.log(error);
  //  });
  //}

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'http://www.dummyserver.om';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData, {})
      .pipe(map(() => { return true; }));
      
      //.catch((e) => this.handleError(e));
  }
}
