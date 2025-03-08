import { Component, Input,EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItemNew, CartItemService } from 'src/app/shared/services/cart-item.service';
import { OffcanvasCartService } from 'src/app/shared/services/offcanvas-cart.service';
import { RootService } from 'src/app/shared/services/root.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';


export type DropcartType = 'dropdown' | 'offcanvas';

@Component({
    selector: 'app-itemdropcart',
    templateUrl: './itemdropcart.component.html',
    styleUrls: ['./itemdropcart.component.scss'],
    standalone: true,
    imports: [NgIf, IconComponent, NgFor, RouterLink, NgClass, AsyncPipe, CurrencyFormatPipe]
})
export class ItemdropcartComponent{

  removedItems: CartItemNew[] = [];

  @Input() type: DropcartType = 'dropdown';

  @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

  constructor(
      public state: OffcanvasCartService,
      public cart: CartItemService,
      public root: RootService,
      private toast:ToastrService,
      private router:Router,
      public store:StoreService
  ) { }

  remove(item: CartItemNew): void {
      if (this.removedItems.includes(item)) {
          return;
      }

      this.removedItems.push(item);
      this.cart.remove(item).subscribe({complete: () => this.removedItems = this.removedItems.filter(eachItem => eachItem !== item)});
  }

  close(): void {
    console.log("close");
    
      this.state.close();
  }
  Proceedtocheckout(){
    console.log("ProceedtocheckoutProceedtocheckout");
    
    if(this.store.getWebSiteInfo().ItemColorAndSize==true){
        let TF=false;
        this.cart.items.forEach(element => {
            if(element.product.SizeID==undefined || element.product.SizeID==null || element.product.ColorID==undefined || element.product.ColorID==null){
                TF=true;
            }
        });
    
        if(TF){
            this.toast.error("Some Item Need to select thier Color and Size");
            this.router.navigate([this.root.cart()]);
        }

        return;

    }
   
    this.router.navigate([this.root.checkout()]);
}
}
