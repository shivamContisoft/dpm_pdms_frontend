import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private httpClient: HttpClient) { }

  sendExcelData(data): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/member/create`, data);
  }

  getCommunicationDetails() {
    return this.httpClient.get(`${environment.api_url}/member/get`);
  }


}
