import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AwsS3FileService } from '../aws-s3-file.service';
import { environment } from '../../../../../environments/environment';
import { AwsS3Object } from '../AwsS3Object';

// REF: https://stackblitz.com/edit/angular-drag-n-drop-directive?file=src%2Fapp%2Fapp.module.ts

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public selectedFiles: FileList;
  public currentFileUpload: File;
  public progress: { percentage: number } = {percentage: 0};
  public selectedFile = null;
  public changeImage = false;
  public file: string;

  // Drag-and-Drop
  public files: any[] = [];

  // Object View
  public imageUrl: string;
  public selectedObject: AwsS3Object;

  // Object List
  public objectListLoading: boolean = false;
  public objectListRecords: AwsS3Object[] = [];
  public objectListDataSource: AwsS3Object[] = [];
  public objectListDisplayedColumns: string[] = [
    'key',
    'size'
  ];

  constructor(private awsS3FileService: AwsS3FileService,
              private https: HttpClient) {
  }

  ngOnInit() {
    this.getObjectList();
  }

  private getObjectList(): void {
    this.objectListLoading = true;
    this.awsS3FileService.getObjectList().subscribe(
      (objectList: AwsS3Object[]) => {
        console.log('objectList', objectList);
        this.objectListRecords = [];
        objectList.forEach(item => {
          this.objectListRecords.push(item);
        });
        this.objectListDataSource = this.objectListRecords;
      },
      error => {
        console.error('Error: ', error);
      },
      () => {
        this.objectListLoading = false;
      }
    );
  }

  public viewFile(): void {
    window.open('https://tqp-test-bucket.s3.amazonaws.com/' + this.file);
  }

  public viewFileByKey(key: string): void {
    const object = this.objectListRecords.find(o => o.key === key);
    console.log('object', object);
    this.selectedObject = object;
    this.imageUrl = 'https://' + this.selectedObject.bucketName + '.s3.amazonaws.com/' + this.selectedObject.key;
    // window.open('https://tqp-test-bucket.s3.amazonaws.com/' + key);
  }

  public deleteFile(): void {
    const url = environment.apiUrl + '/api/v1/amazon-s3-bucket/deleteFile';
    this.https.post<string>(url, this.file).subscribe(
      res => {
        this.file = res;
      }
    );
  }

  public deleteObject(object: AwsS3Object): void {
    console.log('object', object);
    this.awsS3FileService.deleteObject(object).subscribe(
      (objectList: AwsS3Object) => {
        console.log('objectList', objectList);
      },
      error => {
        console.error('Error: ', error);
      },
      () => {
        this.objectListLoading = false;
        this.getObjectList();
      }
    );
  }

  public change(event): void {
    this.changeImage = true;
  }

  public changedImage(event): void {
    this.selectedFile = event.target.files[0];
  }

  public upload(): void {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.awsS3FileService.uploadObject(this.currentFileUpload).subscribe(event => {
      this.selectedFiles = undefined;
    });
  }

  public selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  public openObjectAddPage(): void {
    console.log('openObjectAddPage');
  }


  // Drag-and-Drop

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  prepareFilesList(files: Array<any>) {
    console.log('prepareFilesList');
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    console.log('files', this.files);
    this.uploadFilesSimulator(0);
  }

  uploadFilesSimulator(index: number) {
    console.log('uploadFilesSimulator');
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  deleteFileDragDrop(index: number) {
    this.files.splice(index, 1);
  }
}
