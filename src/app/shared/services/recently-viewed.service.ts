import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import Item from '../Models/Item';


interface RecentlyViewedData {
  items: Item[];
}
@Injectable({
  providedIn: 'root'
})
export class RecentlyViewedService {
  private data: RecentlyViewedData = {
    items: []
  };

  private destroy$: Subject<void> = new Subject();
  private itemsSubject$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  private onAddingSubject$: Subject<Item> = new Subject();

  readonly items$: Observable<Item[]> = this.itemsSubject$.pipe(takeUntil(this.destroy$));
  readonly count$: Observable<number> = this.itemsSubject$.pipe(map(items => items.length));
  readonly onAdding$: Observable<Item> = this.onAddingSubject$.asObservable();
  constructor(@Inject(PLATFORM_ID)
  private platformId: any) {

    if (isPlatformBrowser(this.platformId)) {
      this.load();
    }
  }
  add(itt: Item): Observable<void> {
    //Console.log(this.data.items);
    if(this.data.items.length==12){
      this.remove(this.data.items[0]).subscribe({
        complete: () => {
        }
    });;
    }
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
    //Console.log("remooooooooooooooooooooove");
    
    // timer only for demo
    return timer(1000).pipe(map(() => {
      const index = this.data.items.findIndex(item => item.ItemID === itt.ItemID);

      if (index !== -1) {
        this.data.items.splice(index, 1);
        this.save();
      }
    }));
  }
  private load(): void {
    const items = localStorage.getItem('RecentlyViewedItems');

    if (items) {
      this.data.items = JSON.parse(items);
      this.itemsSubject$.next(this.data.items);
    }
  }
  private save(): void {
    localStorage.setItem('RecentlyViewedItems', JSON.stringify(this.data.items));

    this.itemsSubject$.next(this.data.items);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
