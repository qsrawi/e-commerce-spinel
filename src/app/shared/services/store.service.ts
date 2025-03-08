import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerServices } from '../Models/CustomerServices';
import { MessageModal } from '../Models/Message';
import { Newsletterecommerce } from '../Models/newsletterecommerce';
import { initweb, WebSiteInfo } from '../Models/WebSiteInfo';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    address = '715 Fake Street, New York 10021 USA';
    email = 'stroyka@example.com';
    phone = ['(800) 060-0730', '(800) 060-0730'];
    hours = 'Mon-Sat 10:00pm - 7:00pm';

    get primaryPhone(): string | null {
        return this.phone.length > 0 ? this.phone[0] : null;
    }

    web: WebSiteInfo = initweb;


    token = localStorage.getItem('accessTokenEcommerce');
    server: string = "http://192.119.110.192:5001/api/"
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
    });
    constructor(private http: HttpClient) { }
    getallinfo(): Observable<WebSiteInfo> {
        return this.http.get<WebSiteInfo>(this.server + "WebSiteInfo", { headers: this.headers });
    }
    getterms(): Observable<any> {
        return this.http.get<any>(this.server + "getterms", { headers: this.headers });
    }
    getprivecypolicy(): Observable<any> {
        return this.http.get<any>(this.server + "getPrivacyPolicy", { headers: this.headers });
    }
    getaboutus(): Observable<any> {
        return this.http.get<any>(this.server + "getaboutus", { headers: this.headers });
    }
    getcontactus(): Observable<any> {
        return this.http.get<any>(this.server + "getcontaactus", { headers: this.headers });
    }
    setWebSiteInfo(w: WebSiteInfo) {
        this.web = w;
        // this.elementRef.nativeElement.style.setProperty('--color', 'red')
        // this.elementRef.nativeElement.style.setProperty('--accent-color', this.web.color1);
    }
    getWebSiteInfo() {
        return this.web;
    }
    Sendmessage(mess: MessageModal): Observable<boolean> {
        return this.http.post<boolean>(this.server + "message/Insertnewmessage", mess, { headers: this.headers });
    }
    getCustomnerService(type: string): Observable<CustomerServices> {
        return this.http.get<CustomerServices>(this.server + `customerservice/getbytype/${type}`, { headers: this.headers });
    }
    getnewsletterecommerce(): Observable<Newsletterecommerce> {
        return this.http.get<Newsletterecommerce>(this.server + `customerservice/getnewslettertemplete`, { headers: this.headers });
    }
    inseremail(email: string, tempid: Number): Observable<any> {
        return this.http.get<any>(this.server + `customerservice/insertemail/${email}/${tempid}`, { headers: this.headers });
    }

}
