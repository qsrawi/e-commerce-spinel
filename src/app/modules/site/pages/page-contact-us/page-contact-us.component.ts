import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { initMessageModal, MessageModal } from 'src/app/shared/Models/Message';
import { StoreService } from 'src/app/shared/services/store.service';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { BlockMapComponent } from '../../../blocks/block-map/block-map.component';

@Component({
    selector: 'app-contact-us',
    templateUrl: './page-contact-us.component.html',
    styleUrls: ['./page-contact-us.component.scss'],
    standalone: true,
    imports: [BlockMapComponent, PageHeaderComponent, FormsModule]
})
export class PageContactUsComponent {
    basictemrs:string='';
    loading=true;
    Email:string='';
   message:MessageModal=initMessageModal; 
    constructor(private toastyService: ToastrService,public store: StoreService) {
        this.store.getcontactus().subscribe((res: any) => {
            //Console.log(res);

            if(res.status==true){
                this.basictemrs=res.contactus.contactus;
                this.Email=res.contactus.Email;
            }
            // this.basictemrs=res;
            // this.loading=false;
        });

     }


     SendMessage(){
        this.store.Sendmessage(this.message).subscribe((res:boolean)=>{

            //Console.log(res);
            if(res==true){

                this.toastyService.success(`Message sent Successfully`);
                this.message=initMessageModal;
            }
            
        });

     }
}
