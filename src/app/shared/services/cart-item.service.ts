import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import Item from '../Models/Item';


interface CartTotal {
    title: string;
    price: number;
    type: 'shipping' | 'fee' | 'other' | 'disc';
}

interface CartData {
    items: CartItemNew[];
    quantity: number;
    subtotal: number;
    totals: CartTotal[];
    total: number;
}
export interface CartItemNew {
    product: Item;
    options: {
        name: string;
        value: string;
    }[];
    quantity: number;
}
@Injectable({
    providedIn: 'root'
})
export class CartItemService {

    private data: CartData = {
        items: [],
        quantity: 0,
        subtotal: 0,
        totals: [],
        total: 0
    };

    private itemsSubject$: BehaviorSubject<CartItemNew[]> = new BehaviorSubject(this.data.items);
    private quantitySubject$: BehaviorSubject<number> = new BehaviorSubject(this.data.quantity);
    private subtotalSubject$: BehaviorSubject<number> = new BehaviorSubject(this.data.subtotal);
    private totalsSubject$: BehaviorSubject<CartTotal[]> = new BehaviorSubject(this.data.totals);
    private totalSubject$: BehaviorSubject<number> = new BehaviorSubject(this.data.total);
    private onAddingSubject$: Subject<Item> = new Subject();

    get items(): ReadonlyArray<CartItemNew> {
        return this.data.items;
    }

    get quantity(): number {
        return this.data.quantity;
    }

    readonly items$: Observable<CartItemNew[]> = this.itemsSubject$.asObservable();
    readonly quantity$: Observable<number> = this.quantitySubject$.asObservable();
    readonly subtotal$: Observable<number> = this.subtotalSubject$.asObservable();
    readonly totals$: Observable<CartTotal[]> = this.totalsSubject$.asObservable();
    readonly total$: Observable<number> = this.totalSubject$.asObservable();

    readonly onAdding$: Observable<Item> = this.onAddingSubject$.asObservable();
    token = localStorage.getItem('accessTokenEcommerce');
    server: string = "http://192.119.110.192:5001/api/"
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
    });
    constructor(
        @Inject(PLATFORM_ID)
        private platformId: any,
        private http: HttpClient
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.load();
            this.calc();
        }
    }

    add(product: Item, quantity: number, options: { name: string; value: string }[] = []): Observable<CartItemNew> {
        // timer only for demo
        // this.onAddingSubject$.next(product);

        // let item = this.items.find(eachItem => {
        //     if (eachItem.product.ItemID !== product.ItemID || eachItem.options.length !== options.length) {
        //         return false;
        //     }

        //     if (eachItem.options.length) {
        //         for (const option of options) {
        //             if (!eachItem.options.find(itemOption => itemOption.name === option.name && itemOption.value === option.value)) {
        //                 return false;
        //             }
        //         }
        //     }
        //     return true;
        // });

        // // if (item) {
        // //     item.quantity += quantity;
        // // } else {
        // item = { product, quantity, options };

        // this.data.items.push(item);
        // // }

        // this.save();
        // this.calc();

        // return this.http.get<any>(this.server + `wishlist/addntocart/${product.ItemID}/${quantity}/${product.SizeID}/${product.ColorID}`, { headers: this.headers });

        return timer(100).pipe(map(() => {
            this.onAddingSubject$.next(product);

            let item = this.items.find(eachItem => {
                if (eachItem.product.ItemID !== product.ItemID || eachItem.options.length !== options.length) {
                    return false;
                }

                if (eachItem.options.length) {
                    for (const option of options) {
                        if (!eachItem.options.find(itemOption => itemOption.name === option.name && itemOption.value === option.value)) {
                            return false;
                        }
                    }
                }
                return true;
            });

            // if (item) {
            //     item.quantity += quantity;
            // } else {
            item = { product, quantity, options };

            this.data.items.push(item);
            // }

            this.save();
            this.calc();

            return item;
        }));
    }

    update(updates: { item: CartItemNew, quantity: number }[]): Observable<void> {

        // timer only for demo
        return timer(100).pipe(map(() => {
            let itemss:Item[]=[];
            updates.forEach(update => {
                update.item.product.quantity=update.quantity;
                itemss.push(update.item.product);
                const item = this.items.find(eachItem => eachItem === update.item);
                if (item) {
                    item.quantity = update.quantity;
                }
            });
            this.save();
            this.calc();
            // return this.http.post<any>(this.server + `wishlist/UPDatecatlist/`,itemss, { headers: this.headers });

            

        }));
    }

    remove(item: CartItemNew): Observable<void> {
        // timer only for demo
        this.data.items = this.data.items.filter(eachItem => eachItem !== item);
        this.save();
        this.calc();
        // return this.http.get<any>(this.server + `wishlist/removefromcatlist/${item.product.ItemID}`, { headers: this.headers });
        return timer(0).pipe(map(() => {

        }));

    }
    removeall(): Observable<void> {
        // timer only for demo
        localStorage.removeItem('cartItemsNew');
        this.data.items = [];

        this.save();
        this.calc();
        return timer(0).pipe(map(() => {

        }));

    }
    public calcShipment(ship:number): void {
        let quantity = 0;
        let subtotal = 0;

        this.data.items.forEach(item => {
            quantity += item.quantity;
            subtotal += item.product.PriceLevel_Price * item.quantity;
        });

        const totals: CartTotal[] = [];

        totals.push({
            title: 'التوصيل',
            price: ship,
            type: 'shipping'
        });
        // totals.push({
        //     title: 'Tax',
        //     price: subtotal * 0.20,
        //     type: 'tax'
        // });

        const total = subtotal + totals.reduce((acc, eachTotal) => acc + eachTotal.price, 0);

        this.data.quantity = quantity;
        this.data.subtotal = subtotal;
        this.data.totals = totals;
        this.data.total = total;

        this.itemsSubject$.next(this.data.items);
        this.quantitySubject$.next(this.data.quantity);
        this.subtotalSubject$.next(this.data.subtotal);
        this.totalsSubject$.next(this.data.totals);
        this.totalSubject$.next(this.data.total);
    }
    public calcDiscount(ship:number,discount:number): void {
        let quantity = 0;
        let subtotal = 0;

        this.data.items.forEach(item => {
            quantity += item.quantity;
            subtotal += item.product.PriceLevel_Price * item.quantity;
        });

        const totals: CartTotal[] = [];

        totals.push({
            title: 'التوصيل',
            price: ship,
            type: 'shipping'
        });
        // totals.push({
        //     title: 'Tax',
        //     price: subtotal * 0.20,
        //     type: 'tax'
        // });
        totals.push({
            title: 'الخصم '+discount +'%',
            price: subtotal * (discount/100),
            type: 'disc'
        });

        const total = subtotal + totals.reduce((acc, eachTotal) => acc + eachTotal.price, 0);

        this.data.quantity = quantity;
        this.data.subtotal = subtotal;
        this.data.totals = totals;
        this.data.total = total;

        this.itemsSubject$.next(this.data.items);
        this.quantitySubject$.next(this.data.quantity);
        this.subtotalSubject$.next(this.data.subtotal);
        this.totalsSubject$.next(this.data.totals);
        this.totalSubject$.next(this.data.total);
    }
    private calc(): void {
        let quantity = 0;
        let subtotal = 0;

        this.data.items.forEach(item => {
            quantity += item.quantity;
            subtotal += item.product.PriceLevel_Price * item.quantity;
        });

        const totals: CartTotal[] = [];

        totals.push({
            title: 'التوصيل',
            price: 0,
            type: 'shipping'
        });
        // totals.push({
        //     title: 'Tax',
        //     price: subtotal * 0.20,
        //     type: 'tax'
        // });

        const total = subtotal + totals.reduce((acc, eachTotal) => acc + eachTotal.price, 0);

        this.data.quantity = quantity;
        this.data.subtotal = subtotal;
        this.data.totals = totals;
        this.data.total = total;

        this.itemsSubject$.next(this.data.items);
        this.quantitySubject$.next(this.data.quantity);
        this.subtotalSubject$.next(this.data.subtotal);
        this.totalsSubject$.next(this.data.totals);
        this.totalSubject$.next(this.data.total);
    }

    private save(): void {
        localStorage.setItem('cartItemsNew', JSON.stringify(this.data.items));
    }

    getitemsfromdb(): Observable<Item[]> {
        return this.http.get<Item[]>(this.server + `wishlist/getcartlist`, { headers: this.headers });
    }
    private load(): void {
        // if (localStorage.getItem('accessTokenEcommerce') != null) {
        //     this.getitemsfromdb().subscribe(
        //         (res: Item[]) => {
        //             if (res) {
        //                 console.log(res);
        //                 let CartItemNewList: CartItemNew[] = [];
        //                 for (let i = 0; i < res.length; i++) {

        //                     let crt: CartItemNew = {
        //                         product: res[i], quantity: res[i].quantity||0,
        //                         options: []
        //                     };
        //                     // crt.product=res[i];
        //                     // crt.quantity!=res[i].quantity;
        //                     CartItemNewList.push(crt);
        //                 }
        //                 this.data.items = CartItemNewList;
        //                 this.calc();
        //             }
        //         }
        //     );
        // } else {
        //     this.data.items = [];
        //     // this.itemsSubject$.next(this.data.items);
        // }
        const items = localStorage.getItem('cartItemsNew');

        if (items) {
            this.data.items = JSON.parse(items);
        }
    }
}
