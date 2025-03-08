import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import Item from '../Models/Item';
@Injectable({
  providedIn: 'root'
})
export class QuickviewitemService {

  private destroy$: Subject<void> = new Subject();
  private showSubject$: Subject<Item> = new Subject();

  show$: Observable<Item> = this.showSubject$.pipe(takeUntil(this.destroy$));

  constructor() { }

  show(item: Item): Observable<void> {
      // timer only for demo
      return timer(1).pipe(map(() => {
          this.showSubject$.next(item);
      }));
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }}
