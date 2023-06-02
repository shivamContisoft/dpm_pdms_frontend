import { Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommunicationService } from '../../service/communication.service';
import * as XLSX from 'xlsx';

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
    userData : any = [];
    uploadedFiles: any = [];
    pdfUpload: FormGroup;
    isInvoiceUploadFlag: boolean = false;
    progress: number = 0;
    upload: Upload;
    arrayBuffer:any;
    file:File;
    ELEMENT_DATA: any;
    public displayedColumns = ['position', 'file', 'action'];
    public dataSource: any;
    constructor(
      public fb: FormBuilder,
      public communicationService: CommunicationService,
      private router: Router,
      private toastr: ToastrService,
    ) { 

    }
  
    ngOnInit() {
      this.pdfUpload = this.fb.group({
        files: []
      });
    }
  
    getFileDetails(element) {
      this.uploadedFiles = [];
      for (let i = 0; i < element.target.files.length; i++) {
        this.isInvoiceUploadFlag = true;
        this.uploadedFiles.push(element.target.files[i]);
      }
      this.ELEMENT_DATA =  this.uploadedFiles;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    }
    

    removeSelectedFile(index) {
      // Delete the item from UploadedFiles list
      console.log("index",index)
      this.uploadedFiles.splice(index, 1);
      this.ELEMENT_DATA =  this.uploadedFiles;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
     }

     onSubmit() {
      this.IsWait = true; 
       this.userData = [];
          this.submitted = true;
          if(!this.isInvoiceUploadFlag){
            this.toastr.error('Please Select at least 1 file !!');
          }
          let fileReader = new FileReader();
          var Heading = [
            ["id", "policy_no", "member_name", "member_email", "member_sms_contact", "member_wapp_contact", "member_address", "member_city", "start_date", "end_date", "premium_amount"],
          ];
          fileReader.onload = (e) => {
              this.arrayBuffer = fileReader.result;
              var data = new Uint8Array(this.arrayBuffer);
              var arr = new Array();
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
              var bstr = arr.join("");
              var workbook = XLSX.read(bstr, {type:"binary"});
              var first_sheet_name = workbook.SheetNames[0];
              var worksheet = workbook.Sheets[first_sheet_name];
              // XLSX.utils.sheet_add_aoa(worksheet, Heading);
              var jsonRes = XLSX.utils.sheet_to_json(worksheet,{raw:false, dateNF: "dd/mm/yyyy"});
              // const ws = XLSX.utils.sheet_add_json(worksheet, jsonRes, { origin: 'A2', skipHeader: true });
              // this.userData = XLSX.utils.sheet_to_json(ws,{raw:true});
              console.log(jsonRes);
              if(jsonRes)
                this.communicationService.sendExcelData(jsonRes)
                .subscribe(
                  res => {
                    this.IsWait = false; 
                    this.toastr.success("Policy document sent successfully !!!")
                    this.router.navigate(['/communication/list']);
                })
                err => {
                    console.log(err);
                    this.toastr.error('Somthing Wents Wrong');
                }
          }
          fileReader.readAsArrayBuffer(this.uploadedFiles[0]);
         
     }
  
}
