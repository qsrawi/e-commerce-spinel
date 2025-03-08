import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import Item from '../Models/Item';

interface CompareData {
    items: Item[];
}

@Injectable({
    providedIn: 'root'
})
export class CompareService implements OnDestroy {
    private data: CompareData = {
        items: []
    };

    private destroy$: Subject<void> = new Subject();
    private itemsSubject$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
    private onAddingSubject$: Subject<Item> = new Subject();

    readonly items$: Observable<Item[]> = this.itemsSubject$.pipe(takeUntil(this.destroy$));
    readonly onAdding$: Observable<Item> = this.onAddingSubject$.asObservable();
    readonly count$: Observable<number> = this.itemsSubject$.pipe(map(items => items.length));

    constructor(
        @Inject(PLATFORM_ID)
        private platformId: any
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.load();
        }
    }

    add(itt: Item): Observable<void> {
        // timer only for demo
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
        // timer only for demo
        return timer(1000).pipe(map(() => {
            const index = this.data.items.findIndex(item => itt.ItemID === itt.ItemID);

            if (index !== -1) {
                this.data.items.splice(index, 1);
                this.save();
            }
        }));
    }

    private save(): void {
        localStorage.setItem('compareItems', JSON.stringify(this.data.items));

        this.itemsSubject$.next(this.data.items);
    }

    private load(): void {
        const items = localStorage.getItem('compareItems');

        if (items) {
            this.data.items = JSON.parse(items);
            this.itemsSubject$.next(this.data.items);
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
