import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MobileMenuService } from '../../../../shared/services/mobile-menu.service';
import { mobileMenu } from '../../../../../data/mobile-menu';
import { MobileMenuItem } from '../../../../shared/interfaces/mobile-menu-item';
import { SliderService } from 'src/app/shared/api/slider.service';
import { NestedLink } from 'src/app/shared/interfaces/nested-link';
import { MegamenuColumn } from 'src/app/shared/interfaces/megamenu-column';
import { NavigationLink } from 'src/app/shared/interfaces/navigation-link';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import CurrencyModel from 'src/app/shared/Models/Currency';
import { ThisReceiver } from '@angular/compiler';
import { AuthService } from 'src/app/shared/api/auth.service';
import { MobileLinksComponent } from '../mobile-links/mobile-links.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { NgClass } from '@angular/common';

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
    selector: 'app-mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: ['./mobile-menu.component.scss'],
    standalone: true,
    imports: [NgClass, IconComponent, MobileLinksComponent]
})

export class MobileMenuComponent implements OnDestroy, OnInit {
    private destroy$: Subject<any> = new Subject();
    currencies: Currency[] = [
        // {name: '€ Euro',           url: '', code: 'EUR', symbol: '€'},
        // {name: '£ Pound Sterling', url: '', code: 'GBP', symbol: '£'},
        // {name: '$ US Dollar',      url: '', code: 'USD', symbol: '$'},
        // {name: '₽ Russian Ruble',  url: '', code: 'RUB', symbol: '₽'}
    ];
    isOpen = false;
    IsAuthentecated: boolean = false;
    token: any = "";

    // links: MobileMenuItem[] =mobileMenu;
    links: MobileMenuItem[] = [];
    constructor(private authserverService: AuthService, public mobilemenu: MobileMenuService, private sliderservice: SliderService, private currencyService: CurrencyService) {
        if (typeof window !== 'undefined') {
            this.token = localStorage.getItem('accessTokenEcommerce');
        }
        this.token != null ? this.IsAuthentecated = true : this.IsAuthentecated = false;
        authserverService.getLoggedtoken.subscribe(name => this.changetoken(name));

        this.getcurrencies();

        this.getnavs();

    }
    changetoken(name: string) {
        if (name != null && name != undefined && name != '') {
            this.IsAuthentecated = true;
        } else {
            this.IsAuthentecated = false;
        }
        this.getnavs();

    }
    getcurrencies() {
        this.currencyService.getcurrencies().subscribe(
            (res: any) => {
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
    getnavs() {
        this.sliderservice.getnavs().subscribe(
            (res) => {
                this.links = [];
                for (let i = 0; i < res['nav'].length; i++) {
                    let items: MobileMenuItem[] = [];
                    let columns: MobileMenuItem[] = [];
                    for (let x = 0; x < res['nav'][i]['category'].length; x++) {
                        // //Console.log(res['nav'][i]['category'][x]['subcategory']);
                        if (res['nav'][i]['category'][x]['subcategory'].length > 0) {
                            for (let y = 0; y < res['nav'][i]['category'][x]['subcategory'].length; y++) {
                                let subitems: MobileMenuItem[] = [];
                                if(res['nav'][i]['category'][x]['subcategory'][y]['ItemCategory2'].length>0){
                                    for (let p = 0; p < res['nav'][i]['category'][x]['subcategory'][y]['ItemCategory2'].length; p++) {
                                        subitems.push({ label: res['nav'][i]['category'][x]['subcategory'][y]['ItemCategory2'][p]['ArName'], url: `/shop/catalog/${btoa(res['nav'][i]['category'][x]['subcategory'][y]['LKP_ID'])}/${btoa(res['nav'][i]['category'][x]['subcategory'][y]['ItemCategory2'][p]['LKP_ID'])}/${btoa(res['nav'][i]['StoreID'])}/${btoa(res['nav'][i]['category'][x]['subcategory'][y]['ItemCategory2'][p]['LKP_Type'])}`, type: 'link' });
                                    }

                                }
                                items.push({ label: res['nav'][i]['category'][x]['subcategory'][y]['ArName'], url: `/shop/catalog/${btoa(res['nav'][i]['category'][x]['LKP_ID'])}/${btoa(res['nav'][i]['category'][x]['subcategory'][y]['LKP_ID'])}/${btoa(res['nav'][i]['StoreID'])}`, type: 'link',children:subitems});
                            }
                        }
                        columns.push(
                            {

                                label: res['nav'][i]['category'][x]['ArName'], url: `/shop/catalog/${btoa(res['nav'][i]['category'][x]['LKP_Type'])}/${btoa(res['nav'][i]['category'][x]['LKP_ID'])}/${btoa(res['nav'][i]['StoreID'])}`,
                                type: 'link',
                                children: items

                            }
                        );
                        items = [];
                    }
                    let obj: MobileMenuItem = {
                        label: res['nav'][i]['StoreEnName'],
                        type: 'link',
                        url: `/shop/catalog/${btoa('store')}/${btoa(res['nav'][i]['StoreID'])}/${btoa(res['nav'][i]['StoreID'])}`,
                        children: columns

                        // label: res['nav'][i]['StoreEnName'], url: `/shop/catalog/${btoa('store')}/${btoa(res['nav'][i]['StoreID'])}/${btoa(res['nav'][i]['StoreID'])}`, 
                        // menu: {
                        //     type: 'megamenu',
                        //     size: 'xl',
                        //     columns: columns
                        // }
                    };
                    this.links.push(obj);
                }

                this.links.push({
                    label: 'Our Science',type: 'link', url: `/site/OurScience/0`,

                });
                this.links.push({
                    label: 'Brand Story', type: 'link',url: `/site/BrandStory`,

                });
                this.links.push({
                    label: 'Track Your Order',type: 'link', url: `/shop/track-order`,

                });
                this.links.push({
                    label: 'Contact Us',type: 'link', url: `/site/contact-us`,

                });

                if (this.IsAuthentecated == true) {
                    this.links.push({
                        type: 'link', label: 'Account', url: '/account', children: [
                            { type: 'link', label: 'Dashboard', url: '/account/dashboard' },
                            { type: 'link', label: 'Edit Profile', url: '/account/profile' },
                            { type: 'link', label: 'Order History', url: '/account/orders' },
                            { type: 'link', label: 'Address', url: '/account/addresses' },
                        ]
                    });
                } else {
                    this.links.push({
                        type: 'link', label: 'Account', url: '/account', children: [
                            { type: 'link', label: 'Login', url: '/account/login' },
                            { type: 'link', label: 'Comparison', url: '/shop/compare' },
                            { type: 'link', label: 'Wish List', url: '/shop/wishlist' },
                            { type: 'button', label: 'Newsletter',data: { openmodal: 'openmodal' } }
                        ]
                    });
                }
                this.links.push({
                    type: 'link', label: 'Pages', url: '/site', children: [
                        { type: 'link', label: 'About Us', url: '/site/about-us' },
                        { type: 'link', label: 'Contact Us', url: '/site/contact-us' },
                        { type: 'link', label: 'Terms And Conditions', url: '/site/terms' },
                        { type: 'link', label: 'FAQ', url: '/site/faq' }
                    ]
                });

                let curr: MobileMenuItem[] = [];

                for (let i = 0; i < this.currencies.length; i++) {
                    curr.push({ type: 'button', label: this.currencies[i].name, data: { currency: this.currencies[i] } });
                }

                this.links.push({
                    type: 'button', label: 'Currency', children:
                        curr
                },
                );

                this.links.push({ type: 'divider' });
                if (this.IsAuthentecated == true)
                    this.links.push({ type: 'button', label: 'Log out', data: { logout: 'logout' } });
            }
        );
    }
    ngOnInit(): void {
        this.mobilemenu.isOpen$.pipe(takeUntil(this.destroy$)).subscribe(isOpen => this.isOpen = isOpen);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onItemClick(event: MobileMenuItem): void {
        if (event.type === 'link') {
            this.mobilemenu.close();
        }

        // if (event.data && event.data.language) {
        //     //Console.log(event.data.language); // change language
        // }
    }
}
