import { Component, OnInit } from '@angular/core';
import { CustomerServices, CustomerServicesinit } from 'src/app/shared/Models/CustomerServices';
import { DirectionService } from 'src/app/shared/services/direction.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-page-buyer-protection',
    templateUrl: './page-buyer-protection.component.html',
    styleUrls: ['./page-buyer-protection.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent]
})
export class PageBuyerProtectionComponent implements OnInit {
  basictemrs:string='';
  cus:CustomerServices=CustomerServicesinit;
  loading=true;
  constructor(
      private direction: DirectionService,public store: StoreService
  ) { 
      this.store.getCustomnerService('BuyerProtection').subscribe((res: CustomerServices) => {
          //Console.log(res);
          this.cus=res;
              this.basictemrs=res.pageString;
      });
  }

  ngOnInit(): void {
  }

}
