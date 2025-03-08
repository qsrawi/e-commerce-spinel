import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../../shared/services/cart.service';
import { map } from 'rxjs/operators';
import { CartItemService } from 'src/app/shared/services/cart-item.service';

@Injectable({
    providedIn: 'root'
})
export class CheckoutGuard   {
    constructor(
        private cart: CartItemService,
        private router: Router
    ) { }

    canActivate(): Observable<boolean | UrlTree> {
        return this.cart.quantity$.pipe(map(quantity => {
            //Console.log("____________________");
            //Console.log(quantity);
            if (quantity) {                
                return true;
            }
            this.router.navigateByUrl('/cart').then();

            return false;
        }));
    }
}
