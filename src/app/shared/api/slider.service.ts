import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  token=localStorage.getItem('accessTokenEcommerce');
  server:string="http://192.119.110.192:5001/api/"
  // server:string="http://31.220.60.223/server/";
  headers = new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization': 'Bearer '+this.token });
  constructor(private http:HttpClient) { }

  getallslides(): Observable<any>{
    return this.http.get(this.server+"stores/imagesname",{ headers: this.headers });


  }

  getnavs(): Observable<any>{

    return this.http.get(this.server+"stores/getnav",{ headers: this.headers });

  }
}
