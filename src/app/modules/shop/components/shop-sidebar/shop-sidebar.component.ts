import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ShopSidebarService } from '../../services/shop-sidebar.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { fromMatchMedia } from '../../../../shared/functions/rxjs/fromMatchMedia';
import { isPlatformBrowser, NgClass, NgIf, AsyncPipe } from '@angular/common';
import { ShopService } from '../../../../shared/api/shop.service';
import { ActivatedRoute } from '@angular/router';
import Item from 'src/app/shared/Models/Item';
import { WidgetProductsComponent } from '../../../widgets/widget-products/widget-products.component';
import { WidgetItemsFiltersComponent } from '../../../widgets/widget-items-filters/widget-items-filters.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
    selector: 'app-shop-sidebar',
    templateUrl: './shop-sidebar.component.html',
    styleUrls: ['./shop-sidebar.component.sass'],
    standalone: true,
    imports: [NgClass, IconComponent, WidgetItemsFiltersComponent, NgIf, WidgetProductsComponent, AsyncPipe]
})
export class ShopSidebarComponent implements OnInit, OnDestroy {
    /**
     * Indicates when filters will be offcanvas.
     * - always: https://stroyka.angular.themeforest.scompiler.ru/themes/default-ltr/classic/shop/category-grid-4-columns-full
     * - mobile: https://stroyka.angular.themeforest.scompiler.ru/themes/default-ltr/classic/shop/category-grid-3-columns-sidebar
     */
    @Input() offcanvas: 'always'|'mobile' = 'mobile';

    destroy$: Subject<void> = new Subject<void>();
    bestsellers$!: Observable<Item[]>;
    isOpen = false;

    constructor(
        private acctiveroute:ActivatedRoute,
        private shop: ShopService,
        public sidebar: ShopSidebarService,
        @Inject(PLATFORM_ID)
        private platformId: any
    ) { 

        this.acctiveroute.params.subscribe(params => {
            //Console.log("_________________________");
            
            //Console.log(params);
            if(params.type)
            this.getlast(params);
            // this.itemid = +params['id'];
            // if (this.itemid == null || this.itemid == undefined) {
            //   // this.router.navigate(['./voucher']);
            // } else {
            //   if (this.itemid == 0) {
      
            //   } else {
            //     this.inititemimage();
            //   }
            //   //  this.showorderdetinit();
      
            // }
          });
    }

    getlast(params:any){
        //Console.log(params.id);
        //Console.log(params.storeid);
        //Console.log(params.type);
        this.bestsellers$=this.shop.getlastitems(atob(params.type),+atob(params.id),+atob(params.storeid)).pipe(map(x => x.slice(0, 5)));
        
    }
    ngOnInit(): void {
        // this.bestsellers$ = this.shop.getBestsellers().pipe(map(x => x.slice(0, 5)));

        this.sidebar.isOpen$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(isOpen => {
            if (isOpen) {
                this.open();
            } else {
                this.close();
            }
        });

        if (isPlatformBrowser(this.platformId)) {
            fromMatchMedia('(max-width: 991px)').pipe(takeUntil(this.destroy$)).subscribe(media => {
                if (this.offcanvas === 'mobile' && this.isOpen && !media.matches) {
                    this.close();
                }
            });
        }
    }

    ngOnDestroy(): void {
        this.close();
        this.destroy$.next();
        this.destroy$.complete();
    }

    private open(): void {
        if (isPlatformBrowser(this.platformId)) {
            const bodyWidth = document.body.offsetWidth;

            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = (document.body.offsetWidth - bodyWidth) + 'px';
        }

        this.isOpen = true;
    }

    private close(): void {
        if (isPlatformBrowser(this.platformId)) {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }

        this.isOpen = false;
    }
}
