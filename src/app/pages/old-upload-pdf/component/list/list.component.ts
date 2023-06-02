import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { OldUploadPdfService } from '../../service/old-upload-pdf.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatTableDataSource } from '@angular/material/table';

export interface Policy {
  policy_no: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  Uploader = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  policies: any = [];
  public displayedColumns = ['position', 'document_name', 'action'];
  ELEMENT_DATA: any;
  public dataSource: any;
  public settings: Settings;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public appSettings: AppSettings, public dialog: MatDialog, public router: Router, public fileUploadService: OldUploadPdfService) {
    this.getPolicies();

    const email = window.localStorage.getItem('pdms_email');
    if (email == 'dinesh.m@dpmprinters.com') {
      this.Uploader = true;
    }

  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.policies.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Policy): void {
    const index = this.policies.indexOf(fruit);

    if (index >= 0) {
      this.policies.splice(index, 1);
    }
  }

  getPolicies() {
    // this.fileUploadService.getFiles(this.policies).subscribe(response => {
    //   this.ELEMENT_DATA = response['data'];
    //   this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    //   this.dataSource.paginator = this.paginator;
    // });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onSearch() {
    console.log("console.log()", this.policies)
    this.fileUploadService.getFiles(this.policies).subscribe(res => {
      console.log(res);
      this.ELEMENT_DATA = res['data'];
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  onDownload() {
    this.fileUploadService.downloadSelectedfiles(this.policies);
  }


  public openUserDialog() {
    this.router.navigate(['/uploadpdf/create']);
  }

}
