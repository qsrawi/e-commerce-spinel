import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RootService } from '../../../shared/services/root.service';
import { ShopService } from '../../../shared/api/shop.service';
import Item from 'src/app/shared/Models/Item';
@Injectable({
  providedIn: 'root'
})
export class ItemResolverService {

  constructor(
    private root: RootService,
    private router: Router,
    private shop: ShopService,
) { }

resolve(route: ActivatedRouteSnapshot): Observable<Item> {
  const ItemID = atob(route.params.ItemID);
  //Console.log(ItemID);

  return this.shop.getItem(ItemID).pipe(
    
      catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 404) {
              this.router.navigate([this.root.notFound()]).then();
          }

          return EMPTY;
      })
  );
}


}
