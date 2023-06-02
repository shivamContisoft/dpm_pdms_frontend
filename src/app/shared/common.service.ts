import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient: HttpClient) { }

  userLogin(data) {
    return this.httpClient.post(`${environment.api_url}/authenticate`, data);
  }
  resetPassword(data) {
    return this.httpClient.post(`${environment.api_url}/resetpassword`, data);
  }
  changePassword(data){
    return this.httpClient.post(`${environment.api_url}/changepassword`, data);
  }
  
}
