import { Component } from '@angular/core';
import { CustomerServices, CustomerServicesinit } from 'src/app/shared/Models/CustomerServices';
import { DirectionService } from 'src/app/shared/services/direction.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-faq',
    templateUrl: './page-faq.component.html',
    styleUrls: ['./page-faq.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent]
})
export class PageFaqComponent {
    basictemrs:string='';
    cus:CustomerServices=CustomerServicesinit;
    loading=true;
    constructor(
        private direction: DirectionService,public store: StoreService
    ) { 
        this.store.getCustomnerService('FAQ').subscribe((res: CustomerServices) => {
            //Console.log(res);
            this.cus=res;
                this.basictemrs=res.pageString;
            // this.basictemrs=res;
            // this.loading=false;
        });
    }
}
