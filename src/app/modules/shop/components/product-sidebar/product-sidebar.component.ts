import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product';
import { ShopService } from '../../../../shared/api/shop.service';
import { Category } from '../../../../shared/interfaces/category';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Item from 'src/app/shared/Models/Item';
import { AsyncPipe } from '@angular/common';
import { WidgetProductsComponent } from '../../../widgets/widget-products/widget-products.component';
import { WidgetCategoriesComponent } from '../../../widgets/widget-categories/widget-categories.component';

@Component({
    selector: 'app-product-sidebar',
    templateUrl: './product-sidebar.component.html',
    styleUrls: ['./product-sidebar.component.sass'],
    standalone: true,
    imports: [WidgetCategoriesComponent, WidgetProductsComponent, AsyncPipe]
})
export class ProductSidebarComponent implements OnInit {
    categories$!: Observable<Category[]>;
    bestsellers$!: Observable<Item[]>;

    constructor(
        private shop: ShopService,
    ) { }

    ngOnInit(): void {
        // this.categories$ = this.shop.getCategories(null, 1);
        // this.bestsellers$ = this.shop.getBestsellers().pipe(map(x => x.slice(0, 5)));
    }
}
