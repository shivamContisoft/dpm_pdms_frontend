import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient) { }

  uploadFiles(data): Observable<any> {
    // return this.httpClient.post(`${environment.api_url}/offlinevideo/create`, data);
    return this.httpClient.post(`${environment.api_url}/document/store`, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )
  }

  getFiles(policies) {
    return this.httpClient.get(`${environment.api_url}/document/get-documents?policies=${policies}`);
  }

  downloadSelectedfiles(policies) {
    // return this.httpClient.get(`${environment.api_url}/document/download?policies=${policies}`);
    window.location.assign(`${environment.api_url}/document/download?policies=${policies}`);
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


  uploadFilesOnFTPServer(path) {

    return this.httpClient.get(`${environment.api_url}/ftp_file/read_docs?path=${path}`)

  }


  uploadFilesFromFTPServer(policy_no) {

    window.open(`${environment.api_url}/ftp_file/download_docs?policies=${policy_no}`);

  }






}
