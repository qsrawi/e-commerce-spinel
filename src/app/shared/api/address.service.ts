import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../interfaces/address';
import Coupons from '../Models/Coupons';
import OrderModel from '../Models/Order';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  server = 'http://192.119.110.192:5001/api/';
  token: string = localStorage.getItem('accessTokenEcommerce') || '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      "Access-Control-Allow-Origin": '*'
    })
  };
  constructor(private _httpClient: HttpClient,
  ) { }

  getaddresses(): Observable<Address[]> {
    this.token = localStorage.getItem('accessTokenEcommerce') || '';

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
        "Access-Control-Allow-Origin": '*'
      })
    };
    return this._httpClient.get<Address[]>(this.server + `address/getUserAddresses`, this.httpOptions);
  }
  getaddressesid(idd: number): Observable<JSON> {
    return this._httpClient.get<JSON>(this.server + `address/gettUserAdreesByID/${idd}`, this.httpOptions);
  }
  getcountries(): Observable<JSON> {
    return this._httpClient.get<JSON>(this.server + `address/getcuntries`, this.httpOptions);
  }
  getCopuneByCode(code:string) {
    return this._httpClient.get<Coupons[]>(this.server + `Campaigns/getCopuneByCode/${code}`, this.httpOptions);

  }
  Insertnew(addresses: Address): Observable<Boolean> {
    return this._httpClient.post<Boolean>(this.server + `address/Insertnew`, addresses, this.httpOptions);
  }

  UPDATEAddress(addresses: Address): Observable<Boolean> {
    return this._httpClient.post<Boolean>(this.server + `address/UPDATEAddress`, addresses, this.httpOptions);
  }

  getdefaultaddresses():Observable<any> {

    return this._httpClient.get<any>(this.server + `address/gettUserdefaultAdrees`, this.httpOptions);

  }



  // orderrr .............................
  addnewOrder(order:OrderModel):Observable<any> {
    return this._httpClient.post<any>(this.server + `order/insertnewOrder`,order, this.httpOptions);
  }
  
  sendmessage(phone:string,message:string,messageApiKey:string){
    return this._httpClient.get<any>(`http://smsservice.hadara.ps:4545/SMS.ashx/bulkservice/sessionvalue/sendmessage/?apikey=${messageApiKey}&to=${phone}&msg=${message}`);
 }

 getorderTrackdash(): Observable<JSON> {
  return this._httpClient.get<JSON>('http://192.119.110.192:5001/api/order/getorderTrackdash', this.httpOptions);
}
  getuserOrder():Observable<OrderModel[]> {

    return this._httpClient.get<OrderModel[]>(this.server + `order/getuserorder`, this.httpOptions);

  }


  removeAddress(id:any):Observable<Boolean>{
    return this._httpClient.get<Boolean>(this.server + `address/removeaddress/${id}`, this.httpOptions);

  }
}
