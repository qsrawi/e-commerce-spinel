import { EventEmitter, Injectable } from '@angular/core';
import { ItemsList, ProductsList } from '../../../shared/interfaces/list';
import { Product } from '../../../shared/interfaces/product';
import { Filter, SerializedFilterValues } from '../../../shared/interfaces/filter';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListOptions } from '../../../shared/api/shop.service';
import Item from 'src/app/shared/Models/Item';
@Injectable({
  providedIn: 'root'
})
export class PageTypeService {
   // isLoading
   private isLoadingState = false;
   private isLoadingSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoadingState);

   isLoading$: Observable<boolean> = this.isLoadingSource.asObservable();

   // list
   private listState: ItemsList|null = null;
   private listSource: BehaviorSubject<ItemsList|null> = new BehaviorSubject<ItemsList|null>(this.listState);

   list$: Observable<ItemsList|null> = this.listSource.pipe(filter(x => x !== null));

   // options
   private optionsState: ListOptions = {};

   get options(): ListOptions {
       return this.optionsState;
   }

   optionsChange$: EventEmitter<ListOptions> = new EventEmitter<ListOptions>();
   get items(): Item[] { return this.listState?.items || []; }
   get page(): number { return this.listState?.page || 1; }
   get limit(): number { return this.listState?.limit || 1; }
   get sort(): string { return this.listState?.sort || ''; }
   get total(): number { return this.listState?.total || 1; }
   get pages(): number { return this.listState?.pages || 1; }
   get from(): number { return this.listState?.from || 1; }
   get to(): number { return this.listState?.to || 1; }
   get filters(): Filter[] { return this.listState?.filters || []; }
   get filterValues(): SerializedFilterValues { return this.listState?.filterValues || {}; }

   // set functions
   setIsLoading(value: boolean): void {
    this.isLoadingState = value;
    this.isLoadingSource.next(value);
}

setList(list: ItemsList): void {
    this.listState = list;
    this.listSource.next(this.listState);
}

setOptions(options: ListOptions, emitEvent: boolean = true): void {
    const diff = this.optionsDiff(options);
    console.log(diff);
    
    // if ('limit' in diff || 'sort' in diff || 'filterValues' in diff) {
    //     options.page = 1;
    // }

    this.optionsState = options;

    if (emitEvent && Object.keys(diff).length > 0) {
        this.optionsChange$.emit(diff);
    }
}

updateOptions(options: ListOptions, emitEvent: boolean = true): void {
    
    this.setOptions({...this.optionsState, ...options}, emitEvent);
}

/**
 * Returns only different options.
 */
protected optionsDiff(curr: ListOptions): ListOptions {
    const result: ListOptions = {};

    (['page', 'limit', 'sort'] as ('page'|'limit'|'sort')[]).forEach(key => {
        if (key in curr && this[key] !== curr[key]) {
            result[key] = curr[key] as any;
        }
    });

    if ('filterValues' in curr) {
        const filterValues = curr.filterValues || {};

        if (Object.keys(filterValues).length !== Object.keys(this.filterValues).length) {
            result.filterValues = {};
        }

        Object.keys(filterValues).forEach(key => {
            if (this.filterValues[key] !== filterValues[key]) {
                if (!result.filterValues) {
                    result.filterValues = {};
                }

                result.filterValues[key] = filterValues[key];
            }
        });
    }

    return result;
}
  constructor() { }

}
