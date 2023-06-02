import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { ReportService } from '../report.service';

export interface PeriodicElement {
  id: number;
  member_id: number;
  policy_no: string;
  sms_status: number;
  wapp_status: number;
  email_status: number;
  sms_sid: string;
  wapp_sid: string;
  created_at: string;
  pdms_member:{
    member_name: string;
    member_email: string;
    member_sms_contact: string;
    member_wapp_contact: string;
  }
}
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
  providers: [DatePipe]
})
export class DeliveryComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });
  isReportSelected: boolean = true;
  IsWait: boolean = false;
  title = 'read-excel-in-angular8';
  storeData: any;
  csvData: any;
  jsonData: any;
  textData: any;
  htmlData: any;
  fileUploaded: File;
  worksheet: any;
  filterValue: any = '';
  dataSouce: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns = ['sr_no', 'policy_no', 'member_name', 'member_email', 'member_contact', 'created_at'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  public settings: Settings;
  
  get fromDate() {
    return this.filterForm.get('fromDate').value;
  }
  get toDate() {
    return this.filterForm.get('toDate').value;
  }

  constructor(public appSettings: AppSettings,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private changeDetectorRefs: ChangeDetectorRef,
    private reportService: ReportService) {
    this.settings = this.appSettings.settings;
  }

  // doFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   this.changeDetectorRefs.detectChanges();
  // }

  ngOnInit(): void {
    this.getDefaultFilter();
  }

  onDropDownChange(type) {
    if (type === 'email') {
      this.isReportSelected = false;
      this.getEmails()
    } else if (type === 'sms') {
      this.isReportSelected = false;
      this.getSms();
    } else if (type === 'wapp') {
      this.isReportSelected = false;
      this.getWapp();
    } else {
      this.isReportSelected = true;
      console.log("Invalid Report Request Made!");
    }
  }


  applyFilter() {
    this.dataSource.filter = '' + Math.random();
  }

  getDefaultFilter(){
      this.dataSource.filterPredicate = (data, filter) => {
        if (this.fromDate && this.toDate) {
            return this.datePipe.transform(data.created_at, 'dd/MM/yyyy') >= this.datePipe.transform(this.fromDate, 'dd/MM/yyyy') && this.datePipe.transform(data.created_at, 'dd/MM/yyyy') <= this.datePipe.transform(this.toDate, 'dd/MM/yyyy') ;
        }
        return true;
      };
  }

  getEmails() {
    this.IsWait = true; 
    this.reportService.getEmails(1).subscribe(result => {
      if (result['status'] == 200) {
        const report = result['data'];
        this.dataSource = new MatTableDataSource<PeriodicElement>(report);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
        this.getDefaultFilter();
        this.IsWait = false; 
      }
    });
  }

  getSms() {
    this.IsWait = true; 
    this.reportService.getSms(1).subscribe(result => {
      if (result['status'] == 200) {
        const report = result['data'];
        this.dataSource = new MatTableDataSource<PeriodicElement>(report);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
        this.getDefaultFilter();
        this.IsWait = false; 
      }
    });
  }

  getWapp() {
    this.reportService.getWapp(1).subscribe(result => {
      if (result['status'] == 200) {
        const report = result['data'];
        this.dataSource = new MatTableDataSource<PeriodicElement>(report);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
        this.getDefaultFilter();
        this.IsWait = false; 
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

  resetFilter(){
    this.filterForm.reset();
    this.dataSource.filter = '' + Math.random();
    this.getDefaultFilter();
  }

}
