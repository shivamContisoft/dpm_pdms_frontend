import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  constructor(private httpClient: HttpClient) { }

  get () {
    return this.httpClient.get(`${environment.api_url}/dashboard/get`);
  }

  getTodaysReportDetails () {
    return this.httpClient.get(`${environment.api_url}/dashboard/getTodaysReportDetails`);
  }
}
