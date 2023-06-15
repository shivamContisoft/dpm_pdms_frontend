import { Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FileUploadService } from '../../service/upload-pdf.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppSettings } from 'src/app/app.settings';
import { NgxSpinnerService } from 'ngx-spinner';
export interface Upload {
  progress: number
  state: 'PENDING' | 'IN_PROGRESS' | 'DONE'
}
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  submitted = false;
  IsWait: boolean = false;
  uploadedFiles: any = [];
  pdfUpload: FormGroup;
  isInvoiceUploadFlag: boolean = false;
  progress: number = 0;
  upload: Upload;
  ELEMENT_DATA: any;
  public displayedColumns = ['position', 'file', 'action'];
  public dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public fb: FormBuilder,
    public fileUploadService: FileUploadService,
    private router: Router,
    private toastr: ToastrService, public app_setting: AppSettings,private ngxService: NgxSpinnerService,
  ) {
  }

  ngOnInit() {
    this.pdfUpload = this.fb.group({
      files: []
    });
  }

  getFileDetails(element) {
    for (let i = 0; i < element.target.files.length; i++) {
      this.isInvoiceUploadFlag = true;
      this.uploadedFiles.push(element.target.files[i]);
    }
    this.ELEMENT_DATA = this.uploadedFiles;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }


  removeSelectedFile(index) {
    // Delete the item from UploadedFiles list
    console.log("index", index)
    this.uploadedFiles.splice(index, 1);
    this.ELEMENT_DATA = this.uploadedFiles;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  onSubmit() {
    this.IsWait = true;
    this.submitted = true;
    const formData = new FormData();
    if (!this.isInvoiceUploadFlag) {
      this.toastr.error('Please Select at least 1 file !!');
    }
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      formData.append('files[]', this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.fileUploadService.uploadFiles(formData)
      .subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              this.toastr.success('Request has been made! !!');
              this.upload = { progress: 0, state: 'PENDING' };
              break;
            case HttpEventType.ResponseHeader:
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              this.upload = { progress: this.progress, state: 'IN_PROGRESS' };
              break;
            case HttpEventType.Response:
              setTimeout(() => {
                this.IsWait = false;
                this.progress = 0;
                this.upload = { progress: 100, state: 'DONE' };
                this.uploadedFiles = [];
              }, 1500);
          }
        })
    err => {
      console.log(err);
      this.toastr.error('Something went Wrong');
    }
  }

  uploadFilesDetails(path: any) {
    this.ngxService.show();
    this.fileUploadService.uploadFilesOnFTPServer(path).subscribe(result => {
      if(result['status'] == 200){
        
        
        setTimeout(() => {
          this.ngxService.hide();
          this.toastr.success('File Upload Successfully');
        }, 5000);
      }else if(result['status'] == 404){
        
        setTimeout(() => {
          this.ngxService.hide();
          this.toastr.error('Invalid File Upload');
        }, 5000);
      } else if(result['status'] == 500){
        
        setTimeout(() => {
          this.ngxService.hide();
          this.toastr.error('Internal Server Error');
        }, 5000);
      
      }
    })

  }


  



}
