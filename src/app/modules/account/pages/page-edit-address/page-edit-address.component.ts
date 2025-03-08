import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AddressService } from 'src/app/shared/api/address.service';
import { Address } from 'src/app/shared/interfaces/address';
import { RootService } from 'src/app/shared/services/root.service';
import { singleaddresses } from 'src/data/account-addresses';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-page-edit-address',
    templateUrl: './page-edit-address.component.html',
    styleUrls: ['./page-edit-address.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, NgFor]
})
export class PageEditAddressComponent implements OnInit, OnDestroy {
    addresses: Address=singleaddresses;
    destroy$: Subject<void> = new Subject<void>();
    Countreies!: any;
    AddressID = 0;
    Title = 'اضافة عنوان جديد';
    loading=true;

    constructor(private toastyService: ToastrService,
        private addresssevices: AddressService,
        private _formBuilder: FormBuilder,
        private socialAuthService: SocialAuthService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private root: RootService) {
        this.activatedRoute.params.subscribe(params => {
            this.AddressID = +params['addressId'];
            if (this.AddressID != 0) {
                this.Title = 'Edit Address';
            }
            this.getinit();
        });;

    }

    async ngOnInit(): Promise<void> {

    }
    getinit(){
        if (this.AddressID != 0)
            this.addresssevices.getaddressesid(this.AddressID).subscribe(((res: any) => {

                this.addresses = res['add'];
                this.Countreies = res['countrie'];
                this.loading=false;
            }));
        else {
            this.addresssevices.getcountries().subscribe(((res: any) => {
                this.Countreies = res['countrie'];
                this.loading=false;
            }));

        }

    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    save(){
        
        if(this.AddressID==0){
            this.addresssevices.Insertnew(this.addresses).subscribe((res:Boolean)=>{
                if(res==true){
                    this.toastyService.success(`Done`);
                    this.router.navigate(['./account/addresses']);
                }else{
                    this.toastyService.error(`Somthing went wrong`);
                }
            });
        }else{
            
            this.addresssevices.UPDATEAddress(this.addresses).subscribe((res:Boolean)=>{
                if(res==true){
                    this.toastyService.success(`Done`);
                    this.router.navigate(['./account/addresses']);
                }else{
                    this.toastyService.error(`Somthing went wrong`);
                }
            });
        }
    }

}
