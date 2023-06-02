import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { HealthCheckupService } from '../../service/health-checkup.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public displayedColumns = ['position', 'file_name', 'action'];
  ELEMENT_DATA: any;
  public dataSource: any;
  public settings: Settings;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public appSettings: AppSettings, public dialog: MatDialog, public router: Router, public HealthCheckupService: HealthCheckupService) { }

  ngOnInit(): void {
  }

  getIssuanceDetails() {
    this.HealthCheckupService.getHealthCheckupDetails().subscribe(response => {
      this.ELEMENT_DATA = response['data'];
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public SendMessages() {
    this.router.navigate(['/healthcheckup/create']);
  }

  public sampleDownload() {
    window.location.assign('http://localhost/pdms/backend/uploads/sample/sample_file.xlsx');
  }


}
