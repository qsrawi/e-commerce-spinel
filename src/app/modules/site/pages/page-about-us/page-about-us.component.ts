import { Component } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';
import { DirectionService } from '../../../../shared/services/direction.service';

@Component({
    selector: 'app-about-us',
    templateUrl: './page-about-us.component.html',
    styleUrls: ['./page-about-us.component.scss'],
    standalone: true
})
export class PageAboutUsComponent {
    carouselOptions = {
        nav: false,
        dots: true,
        responsive: {
            580: {items: 3, margin: 32},
            280: {items: 2, margin: 24},
            0: {items: 1}
        },
        rtl: this.direction.isRTL()
    };
    basictemrs:string='';
    loading=true;
    constructor(
        private direction: DirectionService,public store: StoreService
    ) { 
        this.store.getaboutus().subscribe((res: any) => {
            //Console.log(res);

            if(res.status==true){
                this.basictemrs=res.terms;
            }
            // this.basictemrs=res;
            // this.loading=false;
        });
    }
}
