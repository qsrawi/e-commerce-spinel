import { Component } from '@angular/core';
import { RootService } from '../../../../shared/services/root.service';
import { WishlistItemService } from 'src/app/shared/services/wishlist-item.service';
import { CartItemService } from 'src/app/shared/services/cart-item.service';
import Item from 'src/app/shared/Models/Item';
import { ToastrService } from 'ngx-toastr';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-wishlist',
    templateUrl: './page-wishlist.component.html',
    styleUrls: ['./page-wishlist.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent, NgIf, RouterLink, NgFor, NgClass, IconComponent, AsyncPipe, CurrencyFormatPipe]
})
export class PageWishlistComponent {
    loged:boolean=false;
    constructor(
        public root: RootService,
        public wishlist: WishlistItemService,
        public cart: CartItemService, private tst: ToastrService
    ) { 

        if(localStorage.getItem('accessTokenEcommerce') != null){
            this.loged=true;
        }
    }

    addedToCartProducts: Item[] = [];
    removedProducts: Item[] = [];

    addToCart(product: Item): void {
        // if (localStorage.getItem('accessTokenEcommerce') != null) {

        //     if (this.addedToCartProducts.includes(product)) {
        //         return;
        //     }

        //     this.addedToCartProducts.push(product);
        //     this.cart.add(product, 1).subscribe({
        //         complete: () => {
        //             this.addedToCartProducts = this.addedToCartProducts.filter(eachProduct => eachProduct !== product);
        //             this.remove(product);
        //         }
        //     });
        // } else {
        //     this.tst.warning('You must Login to Use Cart List');

        // }

        if (this.addedToCartProducts.includes(product)) {
            return;
        }

        this.addedToCartProducts.push(product);
        this.cart.add(product, 1).subscribe({
            complete: () => {
                this.addedToCartProducts = this.addedToCartProducts.filter(eachProduct => eachProduct !== product);
                this.remove(product);
            }
        });
    }

    remove(product: Item): void {
        if (this.removedProducts.includes(product)) {
            return;
        }

        this.removedProducts.push(product);
        this.wishlist.remove(product).subscribe({
            complete: () => {
                this.removedProducts = this.removedProducts.filter(eachProduct => eachProduct !== product);
            }
        });
    }
}
