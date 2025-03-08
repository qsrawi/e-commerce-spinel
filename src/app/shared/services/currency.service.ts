import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CurrencyFormatOptions } from '../interfaces/currency-format-options';
import CurrencyModel from '../Models/Currency';

interface CurrencyServiceData {
    options: CurrencyFormatOptions;
}

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {
    token=localStorage.getItem('accessTokenEcommerce');
    server:string="http://192.119.110.192:5001/api/"
    // server:string="http://31.220.60.223/server/";
    headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer '+this.token });
    private data: CurrencyServiceData = {
        options: {}
    };

    private changesSubject$: Subject<CurrencyFormatOptions> = new Subject();

    changes$: Observable<CurrencyFormatOptions> = this.changesSubject$.asObservable();

    get options(): CurrencyFormatOptions {
        return this.data.options;
    }
    set options(value: CurrencyFormatOptions) {
        this.data.options = value;
        this.changesSubject$.next(value);
    }

    constructor(private http:HttpClient) { }


    getcurrencies():Observable<any>{
        return this.http.get<any>(this.server+"items/gerCurrency",{ headers: this.headers });

    }
}
