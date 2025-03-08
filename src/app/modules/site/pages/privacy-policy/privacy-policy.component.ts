import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent]
})
export class PrivacyPolicyComponent{
  basictemrs:string='';
  loading=true;
  constructor(public store: StoreService) {

      this.store.getprivecypolicy().subscribe((res: any) => {
          //Console.log(res);

          if(res.status==true){
              this.basictemrs=res.PrivacyPolicy;
          }
          // this.basictemrs=res;
          // this.loading=false;
      });
   }

}
