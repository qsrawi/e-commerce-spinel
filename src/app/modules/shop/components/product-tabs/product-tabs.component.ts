import { Component, Input } from '@angular/core';
import { ProductFeaturesSection} from '../../../../shared/interfaces/product';
import { specification } from '../../../../../data/shop-product-spec';
import { reviews } from '../../../../../data/shop-product-reviews';
import { Review } from '../../../../shared/interfaces/review';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { RatingComponent } from '../../../../shared/components/rating/rating.component';
import { NgClass, NgFor } from '@angular/common';

@Component({
    selector: 'app-product-tabs',
    templateUrl: './product-tabs.component.html',
    styleUrls: ['./product-tabs.component.scss'],
    standalone: true,
    imports: [NgClass, NgFor, RatingComponent, PaginationComponent, FormsModule]
})
export class ProductTabsComponent {
    @Input() withSidebar = false;
    @Input() tab: 'description'|'specification'|'reviews' = 'description';

    specification: ProductFeaturesSection[] = specification;
    reviews: Review[] = reviews;

    constructor() { }
}
