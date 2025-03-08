import { Component } from '@angular/core';
import { Order } from '../../../../shared/interfaces/order';
import { order } from '../../../../../data/account-order-details';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-page-order-details',
    templateUrl: './page-order-details.component.html',
    styleUrls: ['./page-order-details.component.scss'],
    standalone: true,
    imports: [RouterLink, NgFor, NgIf, CurrencyFormatPipe]
})
export class PageOrderDetailsComponent {
    order: Order = order;

    constructor() { }
}
