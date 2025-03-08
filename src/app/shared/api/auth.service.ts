import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { RootService } from '../services/root.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() getLoggeduserstring: EventEmitter<any> = new EventEmitter();
  @Output() getLoggedtoken: EventEmitter<any> = new EventEmitter();
  @Output() getLoggeduserid: EventEmitter<any> = new EventEmitter();

  userstrin = '';
  userid = '';
  server = 'http://192.119.110.192:5001/api/';
  token: any = localStorage.getItem('accessTokenEcommerce') || '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      "Access-Control-Allow-Origin": '*'
    })
  };
  constructor(private _httpClient: HttpClient, private router: Router, private root: RootService
  ) { }
  PaymentUsingPalPay(obj: any): Observable<any> {
    return this._httpClient.post(this.server + "PaymentUsingPalPay", obj, this.httpOptions);

  }

  signIn(credentials: { UserName: string; Password: string }): Observable<any> {
    return this._httpClient.post(this.server + "login", credentials, this.httpOptions);

  }
  signInSocial(credentials: { UserName: string; email: string }): Observable<any> {
    return this._httpClient.post(this.server + "loginSocial", credentials, this.httpOptions);
  }
  validateUsername(val: string): Observable<boolean> {

    return this._httpClient.get<boolean>(this.server + `checkifuseralreadyexist/${val}`, this.httpOptions);
  }

  signUp(credentials: { UserName: string; Password: string, Email: string, Name: string, phoneNumber: string }): Observable<any> {
    //Console.log(credentials);
    return this._httpClient.post<any>(this.server + `signup`, credentials, this.httpOptions);
  }


  signUpSocial(credentials: { UserName: string; Email: string, Name: string, token: string }): Observable<any> {
    //Console.log(credentials);
    return this._httpClient.post<any>(this.server + `signupSocial`, credentials, this.httpOptions);
  }


  getuserinfo(): Observable<any> {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessTokenEcommerce') || '',
        "Access-Control-Allow-Origin": '*'
      })
    };
    return this._httpClient.get<any>(this.server + `getUserInfo`, this.httpOptions);
  }

  UpdateUserInfo(credentials: { UserName: string; FullName: string, Email: string, phoneNumber: string }): Observable<Boolean> {
    return this._httpClient.post<Boolean>(this.server + `updateuserinfo`, credentials, this.httpOptions);
  }


  async settoken(ccc: string, userstring: string, userid: string): Promise<Boolean> {
    localStorage.setItem("accessTokenEcommerce", ccc);


    this.getLoggeduserstring.emit(userstring);
    this.getLoggedtoken.emit(ccc);
    this.getLoggeduserid.emit(userid);


    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + ccc || '',
        "Access-Control-Allow-Origin": '*'
      })
    };
    //Console.log(this.httpOptions);
    this.router.navigate([this.root.home()]);

    return true;
  }
  async settokensignup(ccc: string, userstring: string, userid: string): Promise<Boolean> {
    localStorage.setItem("accessTokenEcommerce", ccc);


    this.getLoggeduserstring.emit(userstring);
    this.getLoggedtoken.emit(ccc);
    this.getLoggeduserid.emit(userid);


    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + ccc || '',
        "Access-Control-Allow-Origin": '*'
      })
    };
    //Console.log(this.httpOptions);
    this.router.navigate(['./account/profile']);

    return true;
  }
  logout(): void {
    this.getLoggeduserstring.emit(null);
    this.getLoggedtoken.emit(null);
    this.getLoggeduserid.emit(null);
  }




  sendCodeForgotPassword(email: string, username: string): Observable<any> {
    username='aaa';
    return this._httpClient.get<any>(this.server + `sendcodeforgetpassword/${email}/${username}`, this.httpOptions);
  }


  chengePassword(email: string, username: string, password: string): Observable<any> {
    // return this._httpClient.get<any>(this.server + `changePassword/anaskome@gmail.com/israr/${password}`, this.httpOptions);

    return this._httpClient.get<any>(this.server + `changePassword/${email}/${password}`, this.httpOptions);
  }
}
