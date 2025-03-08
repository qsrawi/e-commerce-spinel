import { Component } from '@angular/core';
import { Order } from '../../../../shared/interfaces/order';
import { orders } from '../../../../../data/account-orders';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/shared/api/address.service';
import { CartItemService } from 'src/app/shared/services/cart-item.service';
import { RootService } from 'src/app/shared/services/root.service';
import OrderModel from 'src/app/shared/Models/Order';
import Item from 'src/app/shared/Models/Item';
import { order } from 'src/data/account-order-details';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
import { ClickDirective } from '../../../../shared/directives/click.directive';
import { NgIf, NgFor, DatePipe } from '@angular/common';

@Component({
    selector: 'app-page-orders-list',
    templateUrl: './page-orders-list.component.html',
    styleUrls: ['./page-orders-list.component.sass'],
    standalone: true,
    imports: [NgIf, NgFor, RouterLink, ClickDirective, DatePipe, CurrencyFormatPipe]
})
export class PageOrdersListComponent {
    // orders: Partial<Order>[] = orders;
    orders: OrderModel[] = [];
    loadding = true;
    constructor(public root: RootService,
        public cart: CartItemService,
        private route: ActivatedRoute,
        private router: Router,
        private addresssevices: AddressService,
        private toastyService: ToastrService,
        private currService: CurrencyService) {
        this.getorders();
    }

    check(orderitem: Item) {
        if (orderitem.itemimages != undefined) {
            if (orderitem.itemimages.length > 0) {
                return true
            }
            else {
                return false;
            }
        } else {
            return false;
        }
    }
    getimagename(orderitem: Item) {
        if (orderitem.itemimages != undefined) {
            if (orderitem.itemimages.length > 0) {
                return orderitem.itemimages[0].ImagePath;
            }
            else {
                return false;
            }
        } else {
            return false;
        }
    }
    getorders() {
        this.addresssevices.getuserOrder().subscribe((res: OrderModel[]) => {

            this.orders = res;
            this.loadding = false;

        });
    }
    // getitemsum(orderitem:Item){
    //     return orderitem.PriceLevel_Price*(orderitem.quantity||1);
    // }
    getsum(order: OrderModel) {
        let sum = 0.0;
        for (let i = 0; i < order.orderItems.length; i++) {
            sum = sum + (order.orderItems[i].PriceLevel_Price * (order.orderItems[i].quantity || 1));
        }
        return sum;
    }
    ordertrackpage(id: number) {
        this.router.navigate([`./shop/track-order/${id}`]);
    }

    id:any=null;
    showdit(idd: number) {
    if(idd==this.id){
        this.id=null;
    }else{
        this.id=idd;
    }    
    }
}
