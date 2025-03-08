import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../../../../shared/interfaces/order';
import { orders } from '../../../../../data/account-orders';
import { Address } from '../../../../shared/interfaces/address';
import { addresses, singleaddresses } from '../../../../../data/account-addresses';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/shared/api/address.service';
import { Subject } from 'rxjs';
import OrderModel from 'src/app/shared/Models/Order';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-page-dashboard',
    templateUrl: './page-dashboard.component.html',
    styleUrls: ['./page-dashboard.component.sass'],
    standalone: true,
    imports: [NgIf, RouterLink]
})
export class PageDashboardComponent implements OnInit, OnDestroy {
    address: Address = singleaddresses;
    // orders: Partial<Order>[] = orders.slice(0, 3);
    destroy$: Subject<void> = new Subject<void>();
    orders: OrderModel[] = [];

    userinfo:any;
    loading=true;
    constructor(private toastyService: ToastrService,
        private addresssevices: AddressService,
    ) { }
    async ngOnInit(): Promise<void> {
        this.addresssevices.getdefaultaddresses().subscribe(((res: any) => {
            this.address = res['add'];
            this.userinfo=res['user'];
            this.orders = res['recentlyorder'];      
            console.log(res);
                  
            this.loading=false
        }));
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getsum(order:OrderModel){
        let sum=0.0;
        for(let i =0;i<order.orderItems.length;i++){
            sum=sum+(order.orderItems[i].PriceLevel_Price*(order.orderItems[i].quantity||1));
        }        
        return sum;
    }
}
