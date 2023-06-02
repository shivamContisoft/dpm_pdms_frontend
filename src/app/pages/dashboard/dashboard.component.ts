import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { DashbordService } from './dashbord.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any = {};
  todaysData: any = {};

  public settings: Settings;
  constructor(public appSettings:AppSettings, private dashboardService: DashbordService){
    this.settings = this.appSettings.settings; 
  }

  ngOnInit() {
    this.get();
    this.getTodaysReportDetails();
  }

  get () {
    this.dashboardService.get().subscribe(result => {
      console.log(result);
      if (result['status'] == 200) {
        this.data = result['data']
      }
    }, error => {
      console.log(error);
    });
  }

  getTodaysReportDetails () {
    this.dashboardService.getTodaysReportDetails().subscribe(result => {
      console.log(result);
      if (result['status'] == 200) {
        this.todaysData = result['data']
      }
    }, error => {
      console.log(error);
    });
  }

}
