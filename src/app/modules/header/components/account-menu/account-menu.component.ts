import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/api/auth.service';
import { CartItemService } from 'src/app/shared/services/cart-item.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { CompareService } from 'src/app/shared/services/compare.service';
import { RootService } from 'src/app/shared/services/root.service';
import { WishlistItemService } from 'src/app/shared/services/wishlist-item.service';
import { RouterLink } from '@angular/router';
import { ClickDirective } from '../../../../shared/directives/click.directive';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, ClickDirective, RouterLink]
})
export class AccountMenuComponent implements OnInit {
  @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();
  @Output() getLoggeduserstring: EventEmitter<any> = new EventEmitter();
  @Output() getLoggedtoken: EventEmitter<any> = new EventEmitter();
  @Output() getLoggeduserid: EventEmitter<any> = new EventEmitter();
  // UserName:string='';
  // Password:string='';
  signInForm: FormGroup = this._formBuilder.group({
    UserName: ['', [Validators.required]],
    Password: ['', Validators.required],
    rememberMe: ['']
  });;
  IsAuthentecated: boolean = false;
  userstring = '';
  userid = '';
  constructor(private toastyService: ToastrService,
    private authserverService: AuthService,
    private _formBuilder: FormBuilder,
    private cart: CartItemService,
    private wish: WishlistItemService,
    private comp: CompareService,
    public root:RootService

  ) {

    // let accessToken = localStorage.getItem('accessTokenEcommerce');
    // //Console.log("contasklodjaklsDJJKADS", accessToken);

    // accessToken != null ? this.IsAuthentecated = true : this.IsAuthentecated = false;
    // if (accessToken != null) {
    //   //Console.log(this.authserverService.userstrin);
    //   //Console.log(this.authserverService.userid);
    //   //Console.log(this.authserverService.token);
    //   this.userstring = localStorage.getItem('userString') || '';
    //   this.userid = localStorage.getItem('userName') || '';
    //   //Console.log(this.userstring);
    //   //Console.log(this.userid);
    // }
    //  let accessToken = localStorage.getItem('accessTokenEcommerce');
    // //Console.log("contasklodjaklsDJJKADS", accessToken);
    // accessToken != null ? this.IsAuthentecated = true : this.IsAuthentecated = false;
    // if (accessToken != null) {
    //   //Console.log(this.authserverService.userstrin);
    //   //Console.log(this.authserverService.userid);
    //   //Console.log(this.authserverService.token);
    //   this.userstring = localStorage.getItem('userString') || '';
    //   this.userid = localStorage.getItem('userName') || '';
    //   //Console.log(this.userstring);
    //   //Console.log(this.userid);
    // }else
    if (typeof window !== 'undefined') {
      let accessToken = localStorage.getItem('accessTokenEcommerce');
      accessToken != null ? this.IsAuthentecated = true : this.IsAuthentecated = false;
      this.userstring = localStorage.getItem('userString') || '';
      this.userid = localStorage.getItem('userName') || '';
      authserverService.getLoggedtoken.subscribe(name => this.changetoken(name));
    }

    // //Console.log("setTimeout :::: asddddddddddddddddddddddddddddddddddddddddddddddddddd");
    // let accessToken = localStorage.getItem('accessTokenEcommerce');
    // //Console.log("contasklodjaklsDJJKADS", accessToken);
    // accessToken != null ? this.IsAuthentecated = true : this.IsAuthentecated = false;
    // if (accessToken != null) {
    //   //Console.log(this.authserverService.userstrin);
    //   //Console.log(this.authserverService.userid);
    //   //Console.log(this.authserverService.token);
    //   this.userstring = localStorage.getItem('userString') || '';
    //   this.userid = localStorage.getItem('userName') || '';
    //   //Console.log(this.userstring);
    //   //Console.log(this.userid);
    // }
    // this.ngOnInit();
  }
  changetoken(name: string) {
    if (name != null && name != undefined && name != '') {

      this.authserverService.getLoggeduserid.subscribe(name => this.changeName(name));
      this.authserverService.getLoggeduserstring.subscribe(name => this.changeNames(name));
      this.IsAuthentecated = true;
    }else{
      this.IsAuthentecated=false;
    }
  }
  changeName(name: string) {
    this.userid = name;
  };
  changeNames(name: string) {
    this.userstring = name;
  }
  ngOnInit() {
    // setTimeout(() => {
    // }, 500);

  }

  login() {
    if (this.signInForm.invalid) {
      return;
    }
    this.signInForm.disable();

    this.authserverService.signIn
      (this.signInForm.value)
      .subscribe(c => {
        if (c["accessTokenEcommerce"]) {
          localStorage.setItem("accessTokenEcommerce", c["accessTokenEcommerce"]);
          this.userstring = c["userstreing"];
          localStorage.setItem("userString", c["userstreing"]);
          localStorage.setItem("userName", c["username"]);
          this.userid = c["username"];
          this.IsAuthentecated = true;
          this.toastyService.success(`Welcom ${c["userstreing"]}`);
          window.location.reload();
        } else if (!c["accessTokenEcommerce"]) {
          this.toastyService.error(`${c["msg"]}`);
          this.signInForm.enable();

        }
      },
        err => {
          if (err.status == 400) {
            alert(err.error.message);
          }
        });

  }
  logout() {
    localStorage.removeItem('accessTokenEcommerce');
    localStorage.removeItem('userString');
    localStorage.removeItem('userName');
    localStorage.removeItem('wishlistItems');
    localStorage.removeItem('cartItemsNew');

    this.authserverService.logout();
    this.IsAuthentecated = false;
    this.getLoggeduserstring.emit(null);
    this.getLoggedtoken.emit(null);
    this.getLoggeduserid.emit(null);
    window.location.reload();

  }
}
