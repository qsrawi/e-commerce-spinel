import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShopService } from 'src/app/shared/api/shop.service';
import { NgFor } from '@angular/common';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-OurScience',
    templateUrl: './page-OurScience.component.html',
    styleUrls: ['./page-OurScience.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent, NgFor]
})
export class PageOurScienceComponent {
    basictemrs: string = '';
    loading = true;
    title='';
    // message: MessageModal = initMessageModal;
    articleslst:any[]=[];
    constructor(private router: ActivatedRoute, private toastyService: ToastrService, public shop: ShopService) {
        this.router.params.subscribe(params => {
            if(params['id']){
                this.title='Our Science';
                 let id = +params['id'];
            if (id== 0) {
                this.shop.getallwhytoChooseecommerce('article').subscribe((res: any) => {
                        // this.basictemrs = res.contactus.contactus;
                        this.articleslst = res;
                    
                }); 
            }else{
                
                this.shop.getallwhytoChooseecommercedetails(id).subscribe((res: any) => {
                        // this.basictemrs = res.contactus.contactus;
                        this.articleslst.push(res);
                    
                });
            }
            }else{
                this.title='Brand Story';

                this.shop.getallwhytoChooseecommerce('BrandStory').subscribe((res: any) => {
                    // this.basictemrs = res.contactus.contactus;
                    this.articleslst = res;
                
            }); 

            }
           
            
        });;
       
        
     
    } 



}
