import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompareService } from '../../../../shared/services/compare.service';
import { CartService } from '../../../../shared/services/cart.service';
import { Product } from '../../../../shared/interfaces/product';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RootService } from '../../../../shared/services/root.service';
import Item from 'src/app/shared/Models/Item';
import { CartItemService } from 'src/app/shared/services/cart-item.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

interface Feature {
    name: string;
    values: { [productId: number]: string };
}

@Component({
    selector: 'app-compare',
    templateUrl: './page-compare.component.html',
    styleUrls: ['./page-compare.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent, NgIf, RouterLink, NgFor, NgClass, CurrencyFormatPipe]
})
export class PageCompareComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();

    products: Item[] = [];
    features: Feature[] = [];
    addedToCartProducts: Item[] = [];
    removedProducts: Item[] = [];

    constructor(
        public root: RootService,
        private compare: CompareService,
        private cart: CartItemService,
        private tst:ToastrService
    ) { }

    ngOnInit(): void {
        this.compare.items$.pipe(takeUntil(this.destroy$)).subscribe(products => {
            const features: Feature[] = [];

            // products.forEach(product => product.attributes.forEach(productAttribute => {
            //     let feature: Feature|undefined = features.find(eachFeature => eachFeature.name === productAttribute.name);

            //     if (!feature) {
            //         feature = {
            //             name: productAttribute.name,
            //             values: {}
            //         };
            //         features.push(feature);
            //     }

            //     feature.values[product.id] = productAttribute.values.map(x => x.name).join(', ');
            // }));

            this.products = products;
            this.features = features;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    addToCart(product: Item): void {
        if (this.addedToCartProducts.includes(product)) {
            return;
        }

        this.addedToCartProducts.push(product);
        this.cart.add(product, 1).subscribe({
            complete: () => {
                this.addedToCartProducts = this.addedToCartProducts.filter(eachProduct => eachProduct !== product);
            }
        });
        // if (localStorage.getItem('accessTokenEcommerce') != null) {

        //     if (this.addedToCartProducts.includes(product)) {
        //         return;
        //     }

        //     this.addedToCartProducts.push(product);
        //     this.cart.add(product, 1).subscribe({
        //         complete: () => {
        //             this.addedToCartProducts = this.addedToCartProducts.filter(eachProduct => eachProduct !== product);
        //         }
        //     });
        // } else {
        //     this.tst.warning('You must Login to Use Cart List');

        // }

        
    }

    remove(product: Item): void {
        if (this.removedProducts.includes(product)) {
            return;
        }

        this.removedProducts.push(product);
        this.compare.remove(product).subscribe({
            complete: () => {
                this.removedProducts = this.removedProducts.filter(eachProduct => eachProduct !== product);
            }
        });
    }
}
