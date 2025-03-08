import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/api/auth.service';
import { Newsletterecommerce, newsletterecommerceinit } from 'src/app/shared/Models/newsletterecommerce';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { MobileMenuService } from 'src/app/shared/services/mobile-menu.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { MobileMenuItem } from '../../../../shared/interfaces/mobile-menu-item';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { CollapseDirective, CollapseItemDirective, CollapseContentDirective } from '../../../../shared/directives/collapse.directive';
interface Currency {
    name: string;
    url: string;
    code: string;
    symbol: string;
    TheRate: number;
    MaxRate: number;
    ID: number;
}
@Component({
    selector: 'app-mobile-links',
    templateUrl: './mobile-links.component.html',
    styleUrls: ['./mobile-links.component.scss'],
    standalone: true,
    imports: [CollapseDirective, NgFor, NgIf, CollapseItemDirective, RouterLink, IconComponent, CollapseContentDirective, NgStyle, FormsModule, ReactiveFormsModule]
})
export class MobileLinksComponent {
    @Input() links: MobileMenuItem[] = [];
    @Input() level = 0;

    @Output() itemClick: EventEmitter<MobileMenuItem> = new EventEmitter();
    @Output() getLoggeduserstring: EventEmitter<any> = new EventEmitter();
    @Output() getLoggedtoken: EventEmitter<any> = new EventEmitter();
    @Output() getLoggeduserid: EventEmitter<any> = new EventEmitter();
    news: Newsletterecommerce = newsletterecommerceinit;
    signInForm: FormGroup = this._formBuilder.group({
        Email: ['', [Validators.required]],
      });;
    constructor(private currencyService: CurrencyService, public mobilemenu: MobileMenuService, private authserverService: AuthService,
        private _formBuilder: FormBuilder, public store: StoreService, private toastyService: ToastrService
        ) {
            this.store.getnewsletterecommerce().subscribe((res: Newsletterecommerce) => {
                //Console.log(res);
                this.news = res;
              });
         }

    onItemClick(item: MobileMenuItem): void {
        this.itemClick.emit(item);
        if (item.type == 'button' && item.data['currency'] != undefined && item.data['currency'] != null) {
            // console.log(item.data['currency']);
            this.setCurrency(item.data['currency']);
            this.mobilemenu.close();
        }else if (item.type == 'button' && item.data['logout'] != undefined && item.data['logout'] != null){
            this.logout();
            this.mobilemenu.close();
        }else if (item.type == 'button' && item.data['openmodal'] != undefined && item.data['openmodal'] != null) {
            this.openModalgift();
            // this.mobilemenu.close();

        }

    }
    displaygift = "none";
  
    openModalgift() {
        this.displaygift = "block";
      }
      onCloseHandledgift() {
        this.displaygift = "none";
      }

      Subscribe() {

        if (this.signInForm.invalid) {
          return;
        }
        this.signInForm.disable();
        this.store.inseremail
          (this.signInForm.value.Email,this.news.ID||1)
          .subscribe((c: any) => {
            //Console.log(c);
            if (c.status == true) {
              this.toastyService.success(c.msg);
              this.signInForm.enable();
            } else if (c.status == false) {
              this.toastyService.warning(c.msg);
              this.signInForm.enable();
            }
            else if (!c) {
              this.signInForm.enable();
            }
          },
            err => {
              if (err.status == 400) {
                //Console.log(err);
                alert(err.error.message);
              }
            });
    
    
      }
    setCurrency(currency: Currency): void {
        this.currencyService.options = {
            code: currency.code,
            display: currency.symbol,
            TheRate: currency.TheRate,
            MaxRate: currency.MaxRate,
            ID: currency.ID
        };
    }
    logout() {
        localStorage.removeItem('accessTokenEcommerce');
        localStorage.removeItem('userString');
        localStorage.removeItem('userName');
        localStorage.removeItem('wishlistItems');
        localStorage.removeItem('cartItemsNew');
        this.authserverService.logout();
        this.getLoggeduserstring.emit(null);
        this.getLoggedtoken.emit(null);
        this.getLoggeduserid.emit(null);
        window.location.reload();

    }
}
