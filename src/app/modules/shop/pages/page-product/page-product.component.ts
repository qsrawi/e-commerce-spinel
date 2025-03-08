import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../../../shared/api/shop.service';
import { Observable } from 'rxjs';
import { ProductSidebarComponent } from '../../components/product-sidebar/product-sidebar.component';
import { BlockProductsCarouselComponent } from '../../../blocks/block-products-carousel/block-products-carousel.component';
import { ProductTabsComponent } from '../../components/product-tabs/product-tabs.component';
import { ProductComponent } from '../../../../shared/components/product/product.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-page-product',
    templateUrl: './page-product.component.html',
    styleUrls: ['./page-product.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent, NgIf, ProductComponent, ProductTabsComponent, BlockProductsCarouselComponent, ProductSidebarComponent, AsyncPipe]
})
export class PageProductComponent implements OnInit {
    relatedProducts$!: Observable<Product[]>;

    product!: Product;
    layout: 'standard'|'columnar'|'sidebar' = 'standard';
    sidebarPosition: 'start'|'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"

    constructor(
        private shop: ShopService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            //Console.log(data);
            
            this.layout = data.layout || this.layout;
            this.sidebarPosition = data.sidebarPosition || this.sidebarPosition;
            this.product = data.product;
            //Console.log(this.product);

            this.relatedProducts$ = this.shop.getRelatedProducts(data.product);
        });
    }
}
