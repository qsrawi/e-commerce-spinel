import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductAttribute } from '../../interfaces/product';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { RootService } from '../../services/root.service';
import { CurrencyService } from '../../services/currency.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import Item from '../../Models/Item';
import { QuickviewitemService } from '../../services/quickviewitem.service';
import { CartItemService } from '../../services/cart-item.service';
import { WishlistItemService } from '../../services/wishlist-item.service';
import { RecentlyViewedService } from '../../services/recently-viewed.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { ClickDirective } from '../../directives/click.directive';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-item-card',
    templateUrl: './item-card.component.html',
    styleUrls: ['./item-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, ClickDirective, IconComponent, NgIf, RouterLink, CurrencyFormatPipe]
})
export class ItemCardComponent implements OnInit, OnDestroy, OnChanges {

    private destroy$: Subject<void> = new Subject();

    @Input() item!: Item;
    @Input() layout: 'grid-sm' | 'grid-nl' | 'grid-lg' | 'list' | 'horizontal' | null = null;

    addingToCart = false;
    addingToWishlist = false;
    addingToCompare = false;
    addingtoRecentlyViewd = false;
    showingQuickview = false;
    featuredAttributes: ProductAttribute[] = [];
    constructor(
        private cd: ChangeDetectorRef,
        public root: RootService,
        public cart: CartItemService,
        public wishlist: WishlistItemService,
        public recentlyviewed: RecentlyViewedService,
        public compare: CompareService,
        public quickview: QuickviewitemService,
        public currency: CurrencyService, private tst: ToastrService

    ) {

    }

    ngOnInit(): void {
        this.currency.changes$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.cd.markForCheck();
        });

    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnChanges(changes: SimpleChanges): void {
        // if ('product' in changes) {
        //     this.featuredAttributes = !this.item ? [] : this.item.attributes.filter(x => x.featured);
        // }
    }
    addToCart(): void {
        if (this.addingToCart) {
            return;
        }

        this.addingToCart = true;
        this.cart.add(this.item, 1).subscribe({
            complete: () => {
                this.addingToCart = false;
                this.cd.markForCheck();
            }
        });
        // if (localStorage.getItem('accessTokenEcommerce') != null) {

        //     if (this.addingToCart) {
        //         return;
        //     }

        //     this.addingToCart = true;
        //     this.cart.add(this.item, 1).subscribe({
        //         complete: () => {
        //             this.addingToCart = false;
        //             this.cd.markForCheck();
        //         }
        //     });
        // } else {
        //     this.tst.warning('You must Login to Use Cart List');

        // }
    }

    addToWishlist(): void {
        // if (localStorage.getItem('accessTokenEcommerce') != null) {

        //     if (this.addingToWishlist) {
        //         return;
        //     }

        //     this.addingToWishlist = true;
        //     this.wishlist.add(this.item).subscribe({
        //         complete: () => {
        //             this.addingToWishlist = false;
        //             this.cd.markForCheck();
        //         }
        //     });
        // } else {
        //     this.tst.warning('You must Login to Use Wish List');
        // }

        if (this.addingToWishlist) {
            return;
        }

        this.addingToWishlist = true;
        this.wishlist.add(this.item).subscribe({
            complete: () => {
                this.addingToWishlist = false;
                this.cd.markForCheck();
            }
        });
    }

    addToCompare(): void {
        if (this.addingToCompare) {
            return;
        }

        this.addingToCompare = true;
        this.compare.add(this.item).subscribe({
            complete: () => {
                this.addingToCompare = false;
                this.cd.markForCheck();
            }
        });
    }

    showQuickview(): void {
        if (this.showingQuickview) {
            return;
        }
        this.addToRecentlyViewed();
        this.showingQuickview = true;
        this.quickview.show(this.item).subscribe({
            complete: () => {
                this.showingQuickview = false;
                this.cd.markForCheck();
            }
        });
    }
    addToRecentlyViewed(): void {
        if (!this.addingtoRecentlyViewd && this.item) {
            this.addingtoRecentlyViewd = true;

            this.recentlyviewed.add(this.item).subscribe({ complete: () => this.addingtoRecentlyViewd = false });
        }
    }
}
