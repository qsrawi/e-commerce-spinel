import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RootService } from '../../../shared/services/root.service';
import { ShopService } from '../../../shared/api/shop.service';

@Injectable({
  providedIn: 'root'
})
export class TypeResolverService  {
  constructor(
      private root: RootService,
      private router: Router,
      private shop: ShopService,
  ) { }
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const categorySlug = route.params.categorySlug || route.data.categorySlug || null;
    //Console.log(route.params.storeid);

    try{
        const StoreID= +atob(route.params.storeid);
        if (StoreID === null) {
            return this.shop.getCategoryitem(0).pipe(
                catchError(error => {
                    if (error instanceof HttpErrorResponse && error.status === 404) {
                        this.router.navigateByUrl(this.root.notFound()).then();
                    }
                    return EMPTY;
                })
            );        
        }else if(route.params.storeid){
            return this.shop.getCategoryitem(StoreID).pipe(
                catchError(error => {
                    if (error instanceof HttpErrorResponse && error.status === 404) {
                        this.router.navigateByUrl(this.root.notFound()).then();
                    }
                    return EMPTY;
                })
            );
        }
    }catch(e){

    }
    //Console.log();
    
   
    //Console.log(StoreID);
    
    
}
}
