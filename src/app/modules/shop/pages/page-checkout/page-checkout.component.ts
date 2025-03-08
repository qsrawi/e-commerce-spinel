import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RootService } from '../../../../shared/services/root.service';
import { CartItemNew, CartItemService } from 'src/app/shared/services/cart-item.service';
import { AddressService } from 'src/app/shared/api/address.service';
import { addresses, singleaddresses } from 'src/data/account-addresses';
import { Address } from 'src/app/shared/interfaces/address';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/shared/interfaces/order';
import OrderModel from 'src/app/shared/Models/Order';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import Item from 'src/app/shared/Models/Item';
import { formatDate, NgIf, NgFor, NgStyle, AsyncPipe } from '@angular/common';
import {
    IPayPalConfig,
    ICreateOrderRequest,
    ITransactionItem
} from 'ngx-paypal';
import { CartCampaignsandOffersService } from 'src/app/shared/services/cart-campaignsand-offers.service';
import { AuthService } from 'src/app/shared/api/auth.service';
import Coupons from 'src/app/shared/Models/Coupons';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-checkout',
    templateUrl: './page-checkout.component.html',
    styleUrls: ['./page-checkout.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent, NgIf, NgFor, AlertComponent, RouterLink, FormsModule, NgStyle, IconComponent, AsyncPipe, CurrencyFormatPipe]
})
export class PageCheckoutComponent implements OnInit, OnDestroy {
    public payPalConfig?: IPayPalConfig;
    PaymentMethod: number | undefined;
    addresses: Address[] = addresses;
    biilingAddress: Address = singleaddresses;
    loadding: boolean = true;
    Countreies!: any;
    agree: boolean = false;
    gift: boolean = false
    Total: number = 0;
    carditems: ITransactionItem[] = []
    showpayment: string = '';
    private destroy$: Subject<void> = new Subject();
    IsAuthenticated = true;
    selectedphone = '+972';
    isCamp: boolean = false;
    GfitDescription: String = '';
    palpayRedirectData: any;
    couponcode: any;
    couponApplied:boolean=false;
    constructor(
        public root: RootService,
        public cart: CartItemService,
        public cartCamp: CartCampaignsandOffersService,
        private route: ActivatedRoute,
        private router: Router,
        private addresssevices: AddressService,
        private toastyService: ToastrService,
        private currService: CurrencyService,
        private authService: AuthService


    ) {

        if (localStorage.getItem("accessTokenEcommerce") === null) {
            this.IsAuthenticated = false;
            console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1");

            this.getcountryjust();
        } else {
            console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

            this.IsAuthenticated = true;
            this.getaddresses();
        }

    }
    method:any='0';
    changecity() {
        console.log(this.biilingAddress.countryCode);
        console.log(this.Countreies);
        console.log(this.Countreies.find((a: any) => a['country_code'] == this.biilingAddress.countryCode)['FrightAmount']);

        if (this.isCamp == true) {
            this.cartCamp.calcshipment(this.Countreies.find((a: any) => a['country_code'] == this.biilingAddress.countryCode)['FrightAmount']);
        } else {
            this.cart.calcShipment(this.Countreies.find((a: any) => a['country_code'] == this.biilingAddress.countryCode)['FrightAmount']);
        }
    }
    showpaymen(paytype: string) {
        if (this.showpayment == paytype)
            this.showpayment = '';
        else
            this.showpayment = paytype;
    }
    changeinpaymentmethid() {
        console.log(this.PaymentMethod);
        console.log(this.method);
    }
    coupon!: Coupons;
    Applycouponcode() {
        console.log(this.couponcode);
        this.addresssevices.getCopuneByCode(this.couponcode).subscribe((Co: Coupons[]) => {
            if (Co.length > 0) {
                this.coupon = Co[0];
                console.log(this.coupon);
                if (this.isCamp == true) {
                    let TF = true;
                    this.cartCamp.items$.forEach((element: CartItemNew[]) => {
                        element.forEach(itt => {
                            console.log(itt.product.StoreID);
                            if (this.coupon.CouponsDetlist.findIndex(x => x.RelatedID == itt.product.StoreID) >= 0) {
                                console.log("findeddd");

                            } else {
                                console.log("notttttt");
                                TF = false;
                            }
                            // itemslist.push(itt.product);
                            // itemslist[itemslist.length - 1].quantity = itt.quantity;
                        });
                    });
                    if (TF == true) {
                        this.cartCamp.calcDiscount(this.Countreies.find((a: any) => a['country_code'] == this.biilingAddress.countryCode)['FrightAmount'],this.coupon.DiscountPercentage);
                        this.toastyService.success('Done');
                        this.couponApplied=true;
                        // do discount
                    } else {
                        this.toastyService.error('Cannot Apply Coupon for these items');

                    }
                } else {
                    let TF = true;

                    this.cart.items$.forEach((element: CartItemNew[]) => {
                        element.forEach(itt => {
                            if (this.coupon.CouponsDetlist.findIndex(x => x.RelatedID == itt.product.StoreID) >= 0) {
                                console.log("findeddd");

                            } else {
                                console.log("notttttt");
                                TF = false;
                            }

                        });
                    });
                    if (TF == true) {

                        this.cart.calcDiscount(this.Countreies.find((a: any) => a['country_code'] == this.biilingAddress.countryCode)['FrightAmount'],this.coupon.DiscountPercentage);

                        this.couponApplied=true;

                        // do discount
                    } else {
                        this.toastyService.error('Cannot Apply Coupon for these items');

                    }
                }
                
            } else {
                this.toastyService.error('Incorrect Coupon Code');

            }
        });

    }
    ngOnInit(): void {
        if (this.route.snapshot.params.campID) { this.isCamp = true; }

        if (this.isCamp == true) {
            this.cartCamp.quantity$.pipe(takeUntil(this.destroy$)).subscribe(quantity => {
                if (!quantity) {
                    this.router.navigate(['../cart'], { relativeTo: this.route }).then();
                }
            });
            this.cartCamp.items$.subscribe((carts: CartItemNew[]) => {
                carts.forEach((element: CartItemNew) => {
                    this.carditems.push(
                        {
                            name: element.product.ItemEnName,
                            quantity: element.product.quantity != undefined ? element.product.quantity.toString() : '1',
                            category: 'PHYSICAL_GOODS',
                            unit_amount: {
                                currency_code: 'USD',
                                value: element.product.PriceLevel_Price != undefined ? element.product.PriceLevel_Price.toString() : '1',
                            },
                        }
                    );
                })
            });
            this.cartCamp.subtotal$.subscribe((num: number) => {
                this.Total = num;
            })
        } else {
            this.cart.quantity$.pipe(takeUntil(this.destroy$)).subscribe(quantity => {
                if (!quantity) {
                    this.router.navigate(['../cart'], { relativeTo: this.route }).then();
                }
            });
            this.cart.items$.subscribe((carts: CartItemNew[]) => {
                carts.forEach((element: CartItemNew) => {
                    this.carditems.push(
                        {
                            name: element.product.ItemEnName,
                            quantity: element.product.quantity != undefined ? element.product.quantity.toString() : '1',
                            category: 'PHYSICAL_GOODS',
                            unit_amount: {
                                currency_code: 'USD',
                                value: element.product.PriceLevel_Price != undefined ? element.product.PriceLevel_Price.toString() : '1',
                            },
                        }
                    );
                })
            });
            this.cart.subtotal$.subscribe((num: number) => {
                this.Total = num;
            })

        }


        this.initConfig();

        // forEach((element:Itemcar) => {
        //     this.carditems.push(
        //         {
        //             name: element 'Enterprise Subscription',
        //             quantity: '1',
        //             category: 'DIGITAL_GOODS',
        //             unit_amount: {
        //                 currency_code: 'USD',
        //                 value: '9.99',
        //             },
        //         }
        //     );
        // });

    }
    private initConfig(): void {
        console.log(this.Total);
        console.log(this.carditems);

        this.payPalConfig = {
            currency: 'USD',
            clientId: 'AeGdIF0UkeKrH_z5G9KCxTPJKYcXaH-3rH7IGEqWmyHVdbMIUOLnirm_MUenqCubPMw3cYllpez1wfId',

            createOrderOnClient: (data) => <ICreateOrderRequest>
                {
                    intent: 'CAPTURE',
                    purchase_units: [{
                        amount: {
                            currency_code: 'USD',
                            value: this.Total.toString(),
                            breakdown: {
                                item_total: {
                                    currency_code: 'USD',
                                    value: this.Total.toString()
                                }
                            }
                        },
                        items: this.carditems
                        //     [
                        //         {
                        //         name: 'Enterprise Subscription',
                        //         quantity: '1',
                        //         category: 'DIGITAL_GOODS',
                        //         unit_amount: {
                        //             currency_code: 'USD',
                        //             value: '9.99',
                        //         },
                        //     }
                        // ]
                    }]
                },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then((details: any) => {
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
                });
            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
                // this.showSuccess = true;
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
                // this.showCancel = true;
            },
            onError: err => {
                console.log('OnError', err);
                // this.showError = true;
                this.toastyService.error('Somthing Wrong in your Payment Transaction');
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
                this.PaymentMethod = 2;
                // this.resetStatus();
            }
        };
        console.log(this.payPalConfig.createOrderOnClient);

    }
    getcountryjust() {
        this.loadding = true;

        this.addresssevices.getcountries().subscribe(((res: any) => {
            console.log(res);
            this.Countreies = res['countrie'];
            this.GfitDescription = res['GiftDescription'];
            this.changecity();

            this.loadding = false;

        }));
    }


    getaddresses() {
        this.loadding = true;

        this.addresssevices.getcountries().subscribe(((res: any) => {
            this.Countreies = res['countrie'];
            this.GfitDescription = res['GiftDescription'];
            console.log(this.GfitDescription);

            this.addresssevices.getaddresses().subscribe(((res: Address[]) => {
                //Console.log(res);
                this.addresses = res;
                this.loadding = false;
                this.changecity();

            }));
        }));

    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    billingtothis(add: Address) {
        this.biilingAddress = add;

    }

    emptyaddress() {
        this.router.navigate(['./account/addresses/0']);
        this.biilingAddress = singleaddresses;
    }
    FinalTotal: number = 0.0;
    OrderID?: number;

    sendMessage(to: string) {
        //        this.messageApiKey = ss['messageApiKey'];
        this.addresssevices.getorderTrackdash().subscribe(
            (ss: any) => {
                //console.log(ss);
                this.addresssevices.sendmessage(to, `Your Order Number :${this.OrderID}, Total : ${this.FinalTotal} Confirmed Successfully `, ss['messageApiKey']).subscribe((res) => {
                    console.log(res);

                });

                //   this.get();
            }
        );

    }
    saveorders() {
        if (this.PaymentMethod == undefined || this.PaymentMethod == null) {
            this.toastyService.error(`You must Choose Payment Method*`);
            return;
        }

        if (this.agree == false) {
            this.toastyService.error(`You must agree to the website terms and conditions*`);
            return;
        } else if (this.biilingAddress.phone == null || this.biilingAddress.phone == '' ||
            this.biilingAddress.address == null || this.biilingAddress.address == ''
            // this.biilingAddress.lastName == null || this.biilingAddress.lastName == '' ||
            // this.biilingAddress.email == null || this.biilingAddress.email == '' ||
            // this.biilingAddress.country == null || this.biilingAddress.country == '' ||
            // this.biilingAddress.city == null || this.biilingAddress.city == '' ||
            // this.biilingAddress.postcode == null || this.biilingAddress.postcode == '' ||
            // this.biilingAddress.countryCode == null || this.biilingAddress.countryCode == ''
        ) {
            this.toastyService.error(`You must fill Billing Address Info`);
            return;
        }
        let itemslist: Item[] = [];
        // let ite: any = this.cart.items$;
        // //Console.log(ite.source._value);
        if (this.isCamp == true) {
            this.cartCamp.items$.forEach((element: CartItemNew[]) => {
                element.forEach(itt => {
                    itemslist.push(itt.product);
                    itemslist[itemslist.length - 1].quantity = itt.quantity;
                });
            });
        } else {
            this.cart.items$.forEach((element: CartItemNew[]) => {
                element.forEach(itt => {
                    itemslist.push(itt.product);
                    itemslist[itemslist.length - 1].quantity = itt.quantity;
                });
            });
        }

        let dd: string = formatDate(new Date(), 'yyyy/MM/dd', 'en');
        this.currService.options.ID || 1;
        //Console.log(new Date());
        this.biilingAddress.phone = this.selectedphone + this.biilingAddress.phone;

        if (this.isCamp == false) {
            let order: OrderModel = new OrderModel(
                0, 1, 2017, '7', 2967, 2, this.currService.options.ID || 1,
                this.currService.options.TheRate || this.currService.options.MaxRate || 1,
                1,
                new Date(),
                this.biilingAddress.ID || 0,
                itemslist,
                this.biilingAddress, 0, this.couponApplied==true? this.coupon.DiscountPercentage:0, this.Countreies.find((a: any) => a['country_code'] == this.biilingAddress.countryCode)['FrightAmount']
            );
            order.gift = this.gift;
            //Console.log(order);
            this.addresssevices.addnewOrder(order).subscribe((res: any) => {
                if (res['status'] == true) {
                    this.toastyService.success(`Done..`);
                    this.FinalTotal = res['FinalTotal'];
                    this.OrderID = res['orderID'];
                    if (this.isCamp == true) { this.cartCamp.removeall(); } else { this.cart.removeall(); }
                    if (this.PaymentMethod == 1) {
                        this.sendMessage(this.biilingAddress.phone);
                        this.openModaldisplayPaymentMethod();
                    } else {
                        console.log("elseelseelseelseelseelse");
                        
                        this.sendMessage(this.biilingAddress.phone);
                        this.openModaldisplaySuccessOrder();
                    }
                }
            });
        } else {
            let order: OrderModel = new OrderModel(
                0, 1, 2017, '7', 2967, 2, this.currService.options.ID || 1,
                this.currService.options.TheRate || this.currService.options.MaxRate || 1,
                1,
                new Date(),
                this.biilingAddress.ID || 0,
                itemslist,
                this.biilingAddress,
                0,
                (itemslist[0]?.campaign_DiscountPercentage != undefined ? itemslist[0]?.campaign_DiscountPercentage : 0) + (this.couponApplied==true? this.coupon.DiscountPercentage:0), this.Countreies.find((a: any) => a['country_code'] == this.biilingAddress.countryCode)['FrightAmount']
            );
            order.gift = this.gift;
            //Console.log(order);
            this.addresssevices.addnewOrder(order).subscribe((res: any) => {
                if (res['status'] == true) {
                    this.toastyService.success(`Done..`);
                    this.FinalTotal = res['FinalTotal'];
                    this.OrderID = res['orderID'];
                    // for(let i= 0 ; i < this.cart.items.length;i++)
                    // {
                    //     console.log(this.cart.items[i]);

                    //     this.cart.remove(this.cart.items[i].product);

                    // }
                    if (this.isCamp == true) { this.cartCamp.removeall(); } else { this.cart.removeall(); }

                    // localStorage.removeItem('cartItemsNew');
                    if (this.PaymentMethod == 1) {
                        this.sendMessage(this.biilingAddress.phone);

                        this.openModaldisplayPaymentMethod();
                    } else {
                        this.sendMessage(this.biilingAddress.phone);

                        this.openModaldisplaySuccessOrder();
                        // this.router.navigate([this.root.home()]);

                    }
                }
            });
        }
    }
    PaymentUsingPalPay() {
        let comm: any = { Id: this.OrderID, OrderTotal: this.FinalTotal };
        this.authService.PaymentUsingPalPay(comm).subscribe(response => {
            console.log(response);
            let p: any = "paymentForm";
            this.palpayRedirectData = response;
            setTimeout(() => {
                document.forms[p].submit();
            }, 7000);
        })
    }
    display = "none";

    openModal() {
        this.display = "block";
    }
    onCloseHandled() {
        this.display = "none";
    }


    displaygift = "none";

    openModalgift() {
        this.displaygift = "block";
    }
    onCloseHandledgift() {
        this.displaygift = "none";
    }


    displayship = "none";

    openModaldisplayship() {
        this.displayship = "block";
    }
    onCloseHandleddisplayship() {
        this.displayship = "none";
    }

    displayPaymentMethod = "none";
    displaySuccessOrder = "none";

    openModaldisplayPaymentMethod() {
        this.displayPaymentMethod = "block";
    }
    onCloseHandleddisplayPaymentMethod() {
        this.displayPaymentMethod = "none";
    }

    openModaldisplaySuccessOrder() {
        this.displaySuccessOrder = "block";
    }
    onCloseHandledisplaySuccessOrder() {
        this.displaySuccessOrder = "none";
    }
}
