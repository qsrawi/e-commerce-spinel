import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderTrack } from 'src/app/shared/Models/OrderTrack';

@Injectable({
  providedIn: 'root'
})
export class OrdertrackService {

  server = 'http://192.119.110.192:5001/api/';
  token: string = localStorage.getItem('accessTokenEcommerce') || '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      "Access-Control-Allow-Origin": '*'
    })
  };
  constructor(private _httpClient: HttpClient) {}



  getorderTrack(orderid: number): Observable<any> {
    return this._httpClient.get<any>(this.server + `order/getorderTrack/${orderid}`, this.httpOptions);
  }
}
