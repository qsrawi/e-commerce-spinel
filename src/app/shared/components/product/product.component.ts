import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Product } from '../../interfaces/product';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { RootService } from '../../services/root.service';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { AbsoluteUrlPipe } from '../../pipes/absolute-url.pipe';
import { ShareButtonsComponent } from '../share-buttons/share-buttons.component';
import { InputNumberComponent } from '../input-number/input-number.component';
import { RatingComponent } from '../rating/rating.component';
import { IconComponent } from '../icon/icon.component';
import { ClickDirective } from '../../directives/click.directive';
import { ProductGalleryComponent } from '../product-gallery/product-gallery.component';
import { NgIf, NgClass } from '@angular/common';

export type ProductLayout = 'standard' | 'sidebar' | 'columnar' | 'quickview';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    standalone: true,
    imports: [NgIf, ProductGalleryComponent, ClickDirective, NgClass, IconComponent, RatingComponent, FormsModule, InputNumberComponent, ReactiveFormsModule, ShareButtonsComponent, AbsoluteUrlPipe, CurrencyFormatPipe]
})
export class ProductComponent {
    @Input() layout: ProductLayout = 'standard';

    @Input() product!: Product;

    quantity: FormControl = new FormControl(1);

    addingToCart = false;
    addingToWishlist = false;
    addingToCompare = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private cart: CartService,
        private wishlist: WishlistService,
        private compare: CompareService,
        public root: RootService,
    ) { }

    addToCart(): void {
        if (!this.addingToCart && this.product && this.quantity.value > 0) {
            this.addingToCart = true;

            this.cart.add(this.product, this.quantity.value).subscribe({complete: () => this.addingToCart = false});
        }
    }

    addToWishlist(): void {
        if (!this.addingToWishlist && this.product) {
            this.addingToWishlist = true;

            this.wishlist.add(this.product).subscribe({complete: () => this.addingToWishlist = false});
        }
    }

    addToCompare(): void {
        if (!this.addingToCompare && this.product) {
            this.addingToCompare = true;

            // this.compare.add(this.product).subscribe({complete: () => this.addingToCompare = false});
        }
    }
}
