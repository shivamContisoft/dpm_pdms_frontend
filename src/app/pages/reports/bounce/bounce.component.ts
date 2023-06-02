import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Settings } from 'src/app/app.settings.model';
import { AppSettings } from 'src/app/app.settings';
import { CreateComponent } from '../../upload-pdf/component/create/create.component';
import { MatSort } from '@angular/material/sort';
import { ReportService } from '../report.service';

import * as XLSX from 'xlsx';  
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-bounce',
  templateUrl: './bounce.component.html',
  styleUrls: ['./bounce.component.scss']
})
export class BounceComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  title = 'read-excel-in-angular8';
  storeData: any;
  csvData: any;
  jsonData: any;
  textData: any;
  htmlData: any;
  fileUploaded: File;
  worksheet: any;

  dataSouce: any;

  @ViewChild('table', { static: true }) TABLE: ElementRef;  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns = ['sr_no', 'policy_no', 'member_name', 'member_email', 'member_contact', 'created_at'];
  public dataSource: any;
  public settings: Settings;
  
  constructor(public appSettings: AppSettings,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private reportService: ReportService) {
    this.settings = this.appSettings.settings;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
  }

  onDropDownChange(type) {
    if (type === 'email') {
      this.getEmails()
    } else if (type === 'sms') {
      this.getSms();
    } else if (type === 'wapp') {
      this.getWapp();
    } else {
      console.log("Invalid Report Request Made!");
    }
  }

  getEmails() {
    this.reportService.getEmails(0).subscribe(result => {
      if (result['status'] == 200) {
        const report = result['data'];
        this.dataSource = new MatTableDataSource<Element>(report);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  getSms() {
    this.reportService.getSms(0).subscribe(result => {
      if (result['status'] == 200) {
        const report = result['data'];
        this.dataSource = new MatTableDataSource<Element>(report);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  getWapp() {
    this.reportService.getWapp(0).subscribe(result => {
      if (result['status'] == 200) {
        const report = result['data'];
        this.dataSource = new MatTableDataSource<Element>(report);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  openErrorSnackBar(message) {
    let config = new MatSnackBarConfig();
    config.panelClass = ['error-class'];
    this.snackBar.open(message, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: config.panelClass
    });
  }

  openSuccessSnackBar(message) {
    let config = new MatSnackBarConfig();
    config.panelClass = ['succsess-class'];
    this.snackBar.open(message, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: config.panelClass
    });
  }

  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'BouncedReport.xlsx');  
  }  


}
