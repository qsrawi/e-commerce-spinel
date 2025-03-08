import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { RootService } from '../../../../shared/services/root.service';
import { CartItemNew, CartItemService } from 'src/app/shared/services/cart-item.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistItemService } from 'src/app/shared/services/wishlist-item.service';
import Item from 'src/app/shared/Models/Item';
import { ShopService } from 'src/app/shared/api/shop.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CartCampaignsandOffersService } from 'src/app/shared/services/cart-campaignsand-offers.service';
import { getLocaleFirstDayOfWeek, NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { StoreService } from 'src/app/shared/services/store.service';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ClickDirective } from '../../../../shared/directives/click.directive';
import { InputNumberComponent } from '../../../../shared/components/input-number/input-number.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

interface Iteminterface {
    cartItem: CartItemNew;
    quantity: number;
    quantityControl: FormControl;
}

@Component({
    selector: 'app-cart',
    templateUrl: './page-cart.component.html',
    styleUrls: ['./page-cart.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent, NgIf, RouterLink, NgFor, FormsModule, InputNumberComponent, ReactiveFormsModule, ClickDirective, NgClass, IconComponent, AsyncPipe, CurrencyFormatPipe]
})
export class PageCartComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();
    addingToWishlist = false;
    isCamp:boolean=false;
    removedItems: CartItemNew[] = [];
    items: Iteminterface[] = [];
    updating = false;

    constructor(
        private cd: ChangeDetectorRef,
        public root: RootService,
        public cart: CartItemService,
        public cartCamp: CartCampaignsandOffersService,
        private toast: ToastrService,
        private router: Router,
        private wishlist: WishlistItemService,
        private shopService: ShopService,
        private routeActivated: ActivatedRoute,
        public store:StoreService
    ) {

        // if(this.routeActivated.snapshot.params.campID){
        //     console.log(this.routeActivated.snapshot.params.campID);
        // }
    }
    addToCartCamp(item:Item): void {

        this.cartCamp.add(item, 1).subscribe({
            complete: () => {
                this.cd.markForCheck();
            }
        });
      
    }
    ngOnInit(): void {
        if (this.routeActivated.snapshot.params.campID) {
            this.isCamp=true;
            console.log(this.routeActivated.snapshot.params.campID);
            this.shopService.getItemListsearchCampForCart(this.routeActivated.snapshot.params.campID).subscribe((res: Item[]) => {
                this.cartCamp.removeall().subscribe(()=>{
                    for(let i = 0; i < res.length;i++){
                        this.addToCartCamp(res[i]);
                    }
                    this.cartCamp.items$.pipe(
                        takeUntil(this.destroy$),
                        map(cartItems => cartItems.map(cartItem => {
                            return {
                                cartItem,
                                quantity: cartItem.quantity,
                                quantityControl: new FormControl(cartItem.quantity, Validators.required)
                            };
                        }))
                    ).subscribe(items => this.items = items);
                });  
                
            });
        } else {
            this.cart.items$.pipe(
                takeUntil(this.destroy$),
                map(cartItems => cartItems.map(cartItem => {
                    return {
                        cartItem,
                        quantity: cartItem.quantity,
                        quantityControl: new FormControl(cartItem.quantity, Validators.required)
                    };
                }))
            ).subscribe(items => this.items = items);
        }

    }
    // changesize(ind: number, sid: any) {
    //     console.log(ind);
    //     this.items[ind].cartItem.product.SizeID = sid;
    //     console.log(this.items);
    //     this.update();
    // }
    // changecolor(ind: number, cid: any) {
    //     this.items[ind].cartItem.product.ColorID = cid;
    //     this.update();
    // }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    remove(item: CartItemNew): void {
        if (this.removedItems.includes(item)) {
            return;
        }

        this.removedItems.push(item);
        this.cart.remove(item).subscribe({ complete: () => this.removedItems = this.removedItems.filter(eachItem => eachItem !== item) });
    }

    update(): void {

        /* this.updating = true;
         this.cart.update(
             this.items
                 .filter(item => item.quantityControl.value !== item.quantity)
                 .map(item => ({
                     item: item.cartItem,
                     quantity: item.quantityControl.value
                 }))
         ).subscribe({ complete: () => this.updating = false });*/

        // Start OLD 20.4.2022
        if (this.routeActivated.snapshot.params.campID) {
            this.updating = true;
            this.cartCamp.update(
                this.items
                    // .filter(item => item.quantityControl.value !== item.quantity)
                    .map(item => ({
                        item: item.cartItem,
                        quantity: item.quantityControl.value
                    }))
            ).subscribe({ complete: () => this.updating = false });
        }else{
            this.updating = true;
            this.cart.update(
                this.items
                    // .filter(item => item.quantityControl.value !== item.quantity)
                    .map(item => ({
                        item: item.cartItem,
                        quantity: item.quantityControl.value
                    }))
            ).subscribe({ complete: () => this.updating = false });
        }
        
        // END OLD 20.4.2022



    }
    checkIfItemHasAQuantity(item: CartItemNew, index: number) {
        if (item.quantity > 0 && item.product.SizeID && item.product.ColorID) {
            this.shopService.checkIfItemHasAQuantity(item.product.ItemID, item.product.RelatedNo, item.product.ColorID, item.product.SizeID).subscribe(((res: any) => {
                if (res['status'] == true) {
                    console.log(res);
                    if (item.quantity <= res['quantity']) {
                        console.log(item);
                        this.update();
                    } else {
                        this.items[index].cartItem.product.SizeID = undefined;
                        this.items[index].cartItem.product.ColorID = undefined;

                        this.toast.error(`The Available quantity For ${item.product.ItemEnName} Color and Size is ${res['quantity']}`);
                    }
                }
                else if (res['status'] == false) {
                    this.items[index].cartItem.product.SizeID = undefined;
                    this.items[index].cartItem.product.ColorID = undefined;
                    this.toast.error(`This ${item.product.ItemEnName} Color and Size is out of Stock`);
                }
            }));

        }

    }
    needUpdate(): boolean {
        let needUpdate = false;

        for (const item of this.items) {
            if (!item.quantityControl.valid) {
                return false;
            }

            if (item.quantityControl.value !== item.quantity) {
                needUpdate = true;
                this.update();
            }
        }

        //return needUpdate;
        return true;
    }
    Proceedtocheckout() {
        let TF = false;
        if (this.store.getWebSiteInfo().ItemColorAndSize==true ){
            this.items.forEach(element => {
                if (element.cartItem.product.SizeID == undefined || element.cartItem.product.SizeID == null || element.cartItem.product.ColorID == undefined || element.cartItem.product.ColorID == null) {
                    TF = true;
                }
            });
        }
      

        if (this.store.getWebSiteInfo().ItemColorAndSize==true && TF) {
            this.toast.error("Must Select the Color and Size For Each Item");
            return;
        } else{
            if(this.routeActivated.snapshot.params.campID){
                console.log("asjdhajksdasjkdhaskjd");
                console.log(this.routeActivated.snapshot.params.campID);
                console.log('./shop/cart/checkout/'+this.routeActivated.snapshot.params.campID);
                
                this.router.navigate(['./shop/cart/checkout/'+this.routeActivated.snapshot.params.campID]);

            }
            else
            {
                this.router.navigate(['./shop/cart/checkout']);

            }

        }
    }

    addToWishlist(item: Item): void {
        // if (localStorage.getItem('accessTokenEcommerce') != null) {
        //     item.existwishlist = true;
        //     if (!this.addingToWishlist && item) {
        //         this.addingToWishlist = true;
        //         this.wishlist.add(item).subscribe({ complete: () => this.addingToWishlist = false });
        //     }
        // } else {
        //     this.toast.warning('You must Login to Use Wish List');
        // }

        if (!this.addingToWishlist && item) {
            this.addingToWishlist = true;
            this.wishlist.add(item).subscribe({ complete: () => this.addingToWishlist = false });
        }
    }
}
