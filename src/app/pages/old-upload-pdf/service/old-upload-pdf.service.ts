import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OldUploadPdfService {

  constructor(private httpClient: HttpClient) { }

  uploadFiles(data) {

  }

  getFiles(policies) {
    return this.httpClient.get(`${environment.api_url}/document/old-documents?policies=${policies}`);
  }

  downloadSelectedfiles(policies) {
    // return this.httpClient.get(`${environment.api_url}/document/download?policies=${policies}`);
    window.location.assign(`${environment.api_url}/document/old-download?policies=${policies}`);
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
