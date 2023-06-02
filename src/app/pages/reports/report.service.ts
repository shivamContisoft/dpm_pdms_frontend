import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class ReportService {

  constructor(private httpClient: HttpClient) {}
  
  getEmails (status) {
    return this.httpClient.get(`${environment.api_url}/report/get-email/?status=${status}`);
  }

  getSms (status) {
    return this.httpClient.get(`${environment.api_url}/report/get-sms/?status=${status}`);
  }

  getWapp (status) {
    return this.httpClient.get(`${environment.api_url}/report/get-wapp/?status=${status}`);
  }

}
