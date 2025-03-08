import { Component, HostBinding, Input } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { NgFor } from '@angular/common';
import { BlockHeaderComponent } from '../../components/block-header/block-header.component';

@Component({
    selector: 'app-block-product-columns-item',
    templateUrl: './block-product-columns-item.component.html',
    styleUrls: ['./block-product-columns-item.component.sass'],
    standalone: true,
    imports: [BlockHeaderComponent, NgFor, ProductCardComponent]
})
export class BlockProductColumnsItemComponent {
    @HostBinding('class.col') classCol = true;

    @Input() header = '';
    @Input() products: Product[] = [];

    constructor() { }
}
