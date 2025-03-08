import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { order } from '../../../../../data/account-order-details';
import { Order } from '../../../../shared/interfaces/order';
import { RootService } from '../../../../shared/services/root.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-page-order-success',
    templateUrl: './page-order-success.component.html',
    styleUrls: ['./page-order-success.component.scss'],
    standalone: true,
    imports: [NgIf, IconComponent, RouterLink]
})
export class PageOrderSuccessComponent {
    order: Order = order;
    isSucc:boolean=false;
    constructor(
        public root: RootService,
        private routeActivated: ActivatedRoute,
    ) {

        console.log("__________________hiiiii______________________________________");
        if(this.routeActivated.snapshot.params.done==1){this.isSucc=true}
     }
}
