import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(public http: HttpClient) { }

  login(loginForm: any) {
    return this.http.post(`${environment.apiUrl}/login`,loginForm);
  }

  signup(signupForm: any) {
    return this.http.post(`${environment.apiUrl}/signup`,signupForm);
  }

}
