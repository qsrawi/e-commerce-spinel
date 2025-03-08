import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { RootService } from '../../services/root.service';
import Item from '../../Models/Item';
import { CartItemService } from '../../services/cart-item.service';
import { WishlistItemService } from '../../services/wishlist-item.service';
import { ToastrService } from 'ngx-toastr';
import { ShopService } from '../../api/shop.service';
import { StoreService } from '../../services/store.service';
import { WebSiteInfo } from '../../Models/WebSiteInfo';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { InputNumberComponent } from '../input-number/input-number.component';
import { IconComponent } from '../icon/icon.component';
import { ClickDirective } from '../../directives/click.directive';
import { ItemGalleryComponent } from '../item-gallery/item-gallery.component';
import { NgIf, NgClass, NgFor } from '@angular/common';

export type ItemtLayout = 'standard' | 'sidebar' | 'columnar' | 'quickview';
@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    standalone: true,
    imports: [NgIf, ItemGalleryComponent, ClickDirective, NgClass, IconComponent, FormsModule, NgFor, InputNumberComponent, ReactiveFormsModule, CurrencyFormatPipe]
})
export class ItemComponent {
    @Input() layout: ItemtLayout = 'standard';

    @Input() item!: Item;

    quantity: FormControl = new FormControl(1);

    addingToCart = false;
    addingToWishlist = false;
    addingToCompare = false;
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private cart: CartItemService,
        private wishlist: WishlistItemService,
        private compare: CompareService,
        public root: RootService,
        private tst: ToastrService,
        private shopService:ShopService,
        public store: StoreService

    ) {
    }

    addToCart(): void {
        
        if(this.quantity.value > 0){
            this.shopService.checkIfItemHasAQuantity(this.item.ItemID,this.item.RelatedNo,this.item.ColorID,this.item.SizeID).subscribe(((res: any) => {
                if (res['status'] == true) {
                    console.log(res);
                    if(this.quantity.value<=res['quantity']){
                        console.log(this.item);
                        if (!this.addingToCart && this.item && this.quantity.value > 0) {
                            this.addingToCart = true;
                            console.log("addddddddddddddddddddddd");
                            this.cart.add(this.item, this.quantity.value).subscribe({
                                complete: () => {
                                    this.addingToCart = false;
                                    window.location.reload();
                                }
                            });
                        }
                    }else{
                        this.tst.error(`The Available quantity For this Color and Size is ${res['quantity']}`);
                    }
                }
                else if (res['status'] == false) {
                    this.tst.error(`This Item Color and Size is out of Stock`);
                }
            }));
        }

       
        // if (localStorage.getItem('accessTokenEcommerce') != null) {

        //     if(this.quantity.value > 0){
        //         this.shopService.checkIfItemHasAQuantity(this.item.ItemID,this.item.RelatedNo,this.item.ColorID,this.item.SizeID).subscribe(((res: any) => {
        //             if (res['status'] == true) {
        //                 console.log(res);
        //                 if(this.quantity.value<=res['quantity']){
        //                     console.log(this.item);
        //                     if (!this.addingToCart && this.item && this.quantity.value > 0) {
        //                         this.addingToCart = true;
        //                         console.log("addddddddddddddddddddddd");
        //                         this.cart.add(this.item, this.quantity.value).subscribe({
        //                             complete: () => {
        //                                 this.addingToCart = false;
        //                                 window.location.reload();
        //                             }
        //                         });
        //                     }
        //                 }else{
        //                     this.tst.error(`The Available quantity For this Color and Size is ${res['quantity']}`);
        //                 }
        //             }
        //             else if (res['status'] == false) {
        //                 this.tst.error(`This Item Color and Size is out of Stock`);
        //             }
        //         }));

        //     }

           
        // } else {
        //     this.tst.warning('You must Login to Use Cart List');

        // }
    }

    addToWishlist(): void {
        if (!this.addingToWishlist && this.item) {
            this.addingToWishlist = true;

            this.wishlist.add(this.item).subscribe({ complete: () => this.addingToWishlist = false });
        }
        // if (localStorage.getItem('accessTokenEcommerce') != null) {
        //     if (!this.addingToWishlist && this.item) {
        //         this.addingToWishlist = true;

        //         this.wishlist.add(this.item).subscribe({ complete: () => this.addingToWishlist = false });
        //     }
        // } else {
        //     this.tst.warning('You must Login to Use Wish List');
        // }

    }

    addToCompare(): void {
        if (!this.addingToCompare && this.item) {
            this.addingToCompare = true;

            this.compare.add(this.item).subscribe({ complete: () => this.addingToCompare = false });
        }
    }

}
