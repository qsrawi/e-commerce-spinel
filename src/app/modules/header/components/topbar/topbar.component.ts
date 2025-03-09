import { Component, ElementRef, Inject, Input, NgZone, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/api/auth.service';
import CurrencyModel from 'src/app/shared/Models/Currency';
import { EventEmitter } from '@angular/core';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { Observable, Subject } from 'rxjs';
import { DropcartType } from '../dropcart/dropcart.component';
import { ActivatedRoute } from '@angular/router';
import { OffcanvasCartService } from 'src/app/shared/services/offcanvas-cart.service';
import { RootService } from 'src/app/shared/services/root.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { CartItemService } from 'src/app/shared/services/cart-item.service';
import { WishlistItemService } from 'src/app/shared/services/wishlist-item.service';
import { CompareService } from 'src/app/shared/services/compare.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Coupons from 'src/app/shared/Models/Coupons';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { DropdownDirective } from '../../../../shared/directives/dropdown.directive';
import { NewsletterMenuComponent } from '../newsletter-menu/newsletter-menu.component';
import { AccountMenuComponent } from '../account-menu/account-menu.component';
import { ItemdropcartComponent } from '../itemdropcart/itemdropcart.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { IndicatorComponent } from '../indicator/indicator.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

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
    selector: 'app-header-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
    animations: [
        trigger('scroll', [
            state('on', style({ right: '-100px' })),
            transition('* => *', [
                style({ right: '-100px' }),
                animate(10000, style({ right: '100%' }))
            ])
        ])
    ],
    standalone: true,
    imports: [NgIf, IndicatorComponent, SearchComponent, ItemdropcartComponent, AccountMenuComponent, NewsletterMenuComponent, DropdownDirective, IconComponent, NgFor, AsyncPipe]
})
export class TopbarComponent {
    @Input() search = true;

    @Output() getLoggeduserstring: EventEmitter<any> = new EventEmitter();
    @Output() getLoggedtoken: EventEmitter<any> = new EventEmitter();
    @Output() getLoggeduserid: EventEmitter<any> = new EventEmitter();
    languages = [
        { name: 'English', image: 'language-1' },
        // {name: 'French',  image: 'language-2'},
        // {name: 'German',  image: 'language-3'},
        // {name: 'Russian', image: 'language-4'},
        // {name: 'Italian', image: 'language-5'}
    ];
    IsAuthentecated: boolean = false;

    currencies: Currency[] = [
        // {name: '€ Euro',           url: '', code: 'EUR', symbol: '€'},
        // {name: '£ Pound Sterling', url: '', code: 'GBP', symbol: '£'},
        // {name: '$ US Dollar',      url: '', code: 'USD', symbol: '$'},
        // {name: '₽ Russian Ruble',  url: '', code: 'RUB', symbol: '₽'}
    ];
    @ViewChild('element') elementRef!: ElementRef;

    destroy$: Subject<void> = new Subject<void>();

    stuckFrom: number | null = null;
    staticFrom: number | null = null;
    scrollPosition = 0;
    scrollDistance = 0;
    token: any = "";

    media!: Observable<MediaQueryList>;

    dropcartType: DropcartType = 'dropdown';

    get element(): HTMLDivElement {
        return this.elementRef?.nativeElement;
    }

    constructor(
        public currencyService: CurrencyService,
        private authservice: AuthService,
        @Inject(PLATFORM_ID) private platformId: any,
        private route: ActivatedRoute,
        private offcanvasCart: OffcanvasCartService,
        public root: RootService,
        public cart: CartService,
        public cartitem: CartItemService,
        public wishlist: WishlistItemService,
        public comparelist: CompareService,
        public zone: NgZone,
        public header: HeaderService,
    ) {
        this.route.data.subscribe(data => {
            this.dropcartType = data.dropcartType || 'dropdown';
        });
        if (typeof window !== 'undefined') {
            this.token = localStorage.getItem('accessTokenEcommerce');
        }
        this.token != null ? this.IsAuthentecated = true : this.IsAuthentecated = false;
        authservice.getLoggedtoken.subscribe(name => this.changetoken(name));
        this.getcurrencies();
    }

    countDownDate:any ;
    demo:any;

    




    state = 0;

    scrollDone() {
        this.state++;
    }
    changetoken(name: string) {
        if (name != null && name != undefined && name != '') {
            this.IsAuthentecated = true;
        } else {
            this.IsAuthentecated = false;
        }
    }

    onCartClick(): void {
        if (this.dropcartType === 'offcanvas') {
            this.offcanvasCart.open();
        }
    }
    scrollingNews: string = '';
    CouponsScrolling: any = null;
    done: boolean = false;
    getcurrencies() {
        this.currencyService.getcurrencies().subscribe(
            (res: any) => {
                this.scrollingNews = res['scrollingNews'];
                this.CouponsScrolling = res['CouponsScrolling'];
                if(this.CouponsScrolling!=null){
                    this.countDownDate= new Date(this.CouponsScrolling['EndDate']).getTime();
                     setInterval(() => {
                        var now = new Date().getTime();
                        var distance = this.countDownDate - now;
                        var dayes=Math.floor(distance/(1000*60*60*24));
                        var hours=Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
                        var minuets=Math.floor((distance % (1000*60*60)) / (1000*60));
                        var second=Math.floor((distance % (1000*60)) / 1000);
                        this.demo=dayes + "d " + hours + "h "+minuets +"m " +second + "s ";
                
                    });
                }
                console.log(this.CouponsScrolling);
                this.done = true;
                let c: CurrencyModel[] = res['cuu'];
                c.forEach(curr => {
                    this.currencies.push({ ID: curr.CurrencyID, TheRate: curr.TheRate, MaxRate: curr.MaxRate, name: curr.CurrencyEnName, url: '', code: curr.CurruncySymbol, symbol: curr.CurruncySymbol + " " });
                });
                this.setCurrency(this.currencies[0]);
            }
        );
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
        this.authservice.logout();
        this.IsAuthentecated = false;
        this.getLoggeduserstring.emit(null);
        this.getLoggedtoken.emit(null);
        this.getLoggeduserid.emit(null);
        window.location.reload();


        // localStorage.clear();
    }
}
