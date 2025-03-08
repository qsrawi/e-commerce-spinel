import { Component, Input } from '@angular/core';
import Item from 'src/app/shared/Models/Item';
import { Product } from '../../../shared/interfaces/product';
import { RootService } from '../../../shared/services/root.service';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-widget-products',
    templateUrl: './widget-products.component.html',
    styleUrls: ['./widget-products.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf, RouterLink, CurrencyFormatPipe]
})
export class WidgetProductsComponent {
    @Input() header = '';
    @Input() products: Item[] = [];

    constructor(public root: RootService) { 
        console.log(this.products);
        
    }
}
