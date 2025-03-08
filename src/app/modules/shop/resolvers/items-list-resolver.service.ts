import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { ItemsList } from '../../../shared/interfaces/list';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RootService } from '../../../shared/services/root.service';
import { ListOptions, ShopService } from '../../../shared/api/shop.service';
export function parseItemsListParams(params: Params): ListOptions {
  const options: ListOptions = {};

  if (params.page) {
    options.page = parseFloat(params.page);
  }
  if (params.limit) {
    options.limit = parseFloat(params.limit);
  }
  if (params.sort) {
    options.sort = params.sort;
  }

  for (const param of Object.keys(params)) {
    const mr = param.match(/^filter_([-_A-Za-z0-9]+)$/);

    if (!mr) {
      continue;
    }

    const filterSlug = mr[1];

    if (!options.filterValues) {
      options.filterValues = {};
    }

    options.filterValues[filterSlug] = params[param];
  }

  return options;
}
@Injectable({
  providedIn: 'root'
})
export class ItemsListResolverService  {
  constructor(
    private root: RootService,
    private router: Router,
    private shop: ShopService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ItemsList> {
    const categorySlug = route.params.categorySlug || route.data.categorySlug || null;


    if (route.params.type && route.params.id && route.params.storeid && !route.params.typestring) {
      console.log(route.params.type);
      const type = atob(route.params.type);
      const id = +atob(route.params.id);
      const storeid = +atob(route.params.storeid);
      return this.shop.getItemList(type, id, storeid, parseItemsListParams(route.queryParams)).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            this.router.navigate([this.root.notFound()]).then();
          }

          return EMPTY;
        })
      );
      //do your stuff. example: console.log('id: ', this.route.snapshot.queryParams['id']);
    } else if (route.params.type && route.params.id && route.params.storeid && route.params.typestring) {
      console.log(route.params.type);
      const typestring = atob(route.params.typestring);

      const type = atob(route.params.type);
      const id = +atob(route.params.id);
      const storeid = +atob(route.params.storeid);
      return this.shop.getItemListItemCategory2(type, id, storeid,typestring ,parseItemsListParams(route.queryParams)).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            this.router.navigate([this.root.notFound()]).then();
          }

          return EMPTY;
        })
      );
    } else if (route.params.campID) {
      console.log(route.params.word);
      return this.shop.getItemListsearchCamp(route.params.word,route.params.campID, parseItemsListParams(route.queryParams)).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            this.router.navigate([this.root.notFound()]).then();
          }

          return EMPTY;
        })
      );
    }else if (route.params.word) {
      console.log(route.params.word);
      return this.shop.getItemListsearch(route.params.word, parseItemsListParams(route.queryParams)).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            this.router.navigate([this.root.notFound()]).then();
          }

          return EMPTY;
        })
      );
    } else {
      return EMPTY;

    }



  }
}
