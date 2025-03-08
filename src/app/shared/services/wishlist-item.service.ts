import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import Item from '../Models/Item';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface WishlistData {
    items: Item[];
}
@Injectable({
    providedIn: 'root'
})
export class WishlistItemService implements OnDestroy {
    private data: WishlistData = {
        items: []
    };

    private destroy$: Subject<void> = new Subject();
    private itemsSubject$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
    private onAddingSubject$: Subject<Item> = new Subject();

    readonly items$: Observable<Item[]> = this.itemsSubject$.pipe(takeUntil(this.destroy$));
    readonly count$: Observable<number> = this.itemsSubject$.pipe(map(items => items.length));
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
        }
    }

    add(itt: Item): Observable<void> {
        // timer only for demo
        // this.onAddingSubject$.next(itt);

        // const index = this.data.items.findIndex(item => item.ItemID === itt.ItemID);

        // if (index === -1) {
        //     this.data.items.push(itt);
        //     this.save();
        // }
        // return this.http.get<any>(this.server + `wishlist/addntowishlist/${itt.ItemID}`, { headers: this.headers });

        return timer(1000).pipe(map(() => {
            this.onAddingSubject$.next(itt);

            const index = this.data.items.findIndex(item => item.ItemID === itt.ItemID);

            if (index === -1) {
                this.data.items.push(itt);
                this.save();
            }
        }));
    }

    remove(itt: Item): Observable<void> {

        // const index = this.data.items.findIndex(item => item.ItemID === itt.ItemID);

        // if (index !== -1) {
        //     this.data.items.splice(index, 1);
        //     this.save();
        // }
        // return this.http.get<any>(this.server + `wishlist/removefromwishllist/${itt.ItemID}`, { headers: this.headers });

        // timer only for demo
        return timer(100).pipe(map(() => {
            const index = this.data.items.findIndex(item => item.ItemID === itt.ItemID);

            if (index !== -1) {
                this.data.items.splice(index, 1);
                this.save();
            }
        }));
    }

    private save(): void {
        localStorage.setItem('wishlistItems', JSON.stringify(this.data.items));

        this.itemsSubject$.next(this.data.items);
    }

    private load(): void {
        // // this.data.items=[];
        // if (localStorage.getItem('accessTokenEcommerce') != null) {
        //     this.getitemsfromdb().subscribe(
        //         (res: Item[]) => {
        //             if (res) {
        //                 this.data.items = res;
        //                 this.itemsSubject$.next(this.data.items);
        //             }
        //         }
        //     );
        // } else {
        //     this.data.items = [];
        //     this.itemsSubject$.next(this.data.items);
        // }

        const items = localStorage.getItem('wishlistItems');

        if (items) {
            this.data.items = JSON.parse(items);
            this.itemsSubject$.next(this.data.items);
        }
    }

    // getitemsfromdb(): Observable<Item[]> {
    //     return this.http.get<Item[]>(this.server + `wishlist/getwishlist`, { headers: this.headers });
    // }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
