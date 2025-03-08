import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Order } from 'src/app/shared/interfaces/order';
import OrderModel from 'src/app/shared/Models/Order';
import { OrderTrack } from 'src/app/shared/Models/OrderTrack';
import { RootService } from 'src/app/shared/services/root.service';
import { OrdertrackService } from '../../services/ordertrack.service';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-track-order',
    templateUrl: './page-track-order.component.html',
    styleUrls: ['./page-track-order.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent, FormsModule, NgIf, NgFor, RouterLink, DatePipe, CurrencyFormatPipe]
})
export class PageTrackOrderComponent {
    active: string = '';
    orderID!: number;
    ordertracklist: any[] = [];
    statuslist: OrderTrack[] = [];
    order: any;
    showSpinner = false;
    constructor(private ordertraclservice: OrdertrackService, public root: RootService, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(params => {
            this.orderID = params['orderid'];
            //Console.log(this.orderID);

            if (this.orderID != undefined)
                this.getTrackOrder();
        });
    }


    getTrackOrder() {
        this.showSpinner = true;

        this.ordertraclservice.getorderTrack(this.orderID).subscribe((res: any) => {
            //Console.log(res);

            this.ordertracklist = res['orderTracks'];
            this.statuslist = res['statuss'];
            this.order = res['order'];
            //Console.log(this.statuslist);
            //Console.log(this.ordertracklist);
            this.showSpinner = false;

        });
    }

    setactivestatus(lkid: number) {
        // for (let i = 0; i < this.ordertracklist.length; i++) {
        //     let a: number = this.statuslist.findIndex(a => a.LKP_ID == this.ordertracklist[i]['StatusID']);
        //     this.statuslist[a].active = 'active';
        // }
        let aa = this.ordertracklist.find(a => a['StatusID'] == lkid);
        return aa != null ? 'active' : '';
    }


    getcuuretstatus() {
        return this.statuslist.find(a => a.LKP_ID == this.ordertracklist[this.ordertracklist.length - 1]['StatusID'])?.EnName;
    }
    // getstatusname(){
    //    return this.statuslist.find(a=>a.LKP_ID==this.ordertracklist[i]['StatusID']);
    // }

    getsum(order: OrderModel) {
        let sum = 0.0;
        for (let i = 0; i < order.orderItems.length; i++) {
            sum = sum + (order.orderItems[i].PriceLevel_Price * (order.orderItems[i].quantity || 1));
        }
        return sum;
    }
}
