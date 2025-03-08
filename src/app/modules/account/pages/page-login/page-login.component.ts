import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/api/auth.service';
import { RootService } from 'src/app/shared/services/root.service';
import { PrefixNot } from '@angular/compiler';
import { ClickDirective } from '../../../../shared/directives/click.directive';
import { NgClass, NgIf } from '@angular/common';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';


@Component({
    selector: 'app-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent, NgClass, FormsModule, ReactiveFormsModule, ClickDirective, RouterLink, NgIf]
})
export class PageLoginComponent implements OnInit {
  @Input() tab: 'Login' | 'Register' = 'Login';
  @Input() withSidebar = false;


    socialUser?: SocialUser;
    isLoggedin?: boolean;
    selectedphone="+972";
    ngOnInit() {
        this.socialAuthService.authState.subscribe((user) => {
            this.socialUser = user;
            this.isLoggedin = (user != null);
        });
    }
    signInForm: FormGroup = this._formBuilder.group({
        UserName: ['', [Validators.required]],
        Password: ['', Validators.required],
        rememberMe: ['']
    });;
    signUpForm: FormGroup = this._formBuilder.group({
        UserName: ['', [Validators.required]],
        Name: ['', [Validators.required]],
        Email: ['', Validators.required],
        Password: ['', Validators.required],
        RepeatPassword: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern(/\d{9}$/)]]
    });
    usernamealeradyexist: Boolean = false;
    passwordddidintmatch: Boolean = false;
    constructor(private toastyService: ToastrService,
        private authserverService: AuthService,
        private _formBuilder: FormBuilder,
        private socialAuthService: SocialAuthService,
        private router: Router,
        public root: RootService) {
        if (localStorage.getItem('accessTokenEcommerce') != null) {
            this.router.navigate([this.root.home()]);

        }
        // localStorage.removeItem('accessTokenEcommerce');
        // localStorage.removeItem('accessTokenEcommerce');
        // localStorage.removeItem('accessTokenEcommerce');
    }
    get f() {
        return this.signUpForm.controls;
    }

    login() {
        if (this.signInForm.invalid) {
            return;
        }
        this.signInForm.disable();
        this.authserverService.signIn
            (this.signInForm.value)
            .subscribe(async c => {
                if (c["accessTokenEcommerce"]) {
                    localStorage.setItem("userString", c["userstreing"]);
                    localStorage.setItem("userName", c["username"]);
                    localStorage.setItem("accessTokenEcommerce", c["accessTokenEcommerce"]);
                    this.toastyService.success(`Welcom ${c["userstreing"]}`);

                    // this.router.navigate([this.root.home()]);
                    this.authserverService.settoken(c["accessTokenEcommerce"], c["userstreing"], c["username"]);
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




    checkuser() {
        if (this.signUpForm.controls.UserName.value.length >= 3) {
            this.authserverService.validateUsername(this.signUpForm.controls.UserName.value).subscribe(
                (res: Boolean) => {
                    this.usernamealeradyexist = res;
                }
            );
        }


    }
    passChange() {

        this.passwordddidintmatch = false;
    }
    signup() {
        if (this.signUpForm.invalid) {
            return;
        }
        this.signUpForm.disable();

        if (this.signUpForm.controls.Password.value != this.signUpForm.controls.RepeatPassword.value) {
            this.passwordddidintmatch = true;
            this.signUpForm.enable();
            return;
        }

        this.signUpForm.setValue({
            UserName: this.signUpForm.controls['UserName'].value,
            Name: this.signUpForm.controls['Name'].value,
            Email: this.signUpForm.controls['Email'].value,
            Password: this.signUpForm.controls['Password'].value,
            RepeatPassword: this.signUpForm.controls['RepeatPassword'].value,
            phoneNumber : this.selectedphone+this.signUpForm.controls['phoneNumber'].value
          });
        this.authserverService.signUp(this.signUpForm.value).subscribe(
            (res: any) => {
                this.signUpForm.enable();
                if (res["accessTokenEcommerce"]) {
                    localStorage.setItem("accessTokenEcommerce", res["accessTokenEcommerce"]);
                    this.toastyService.success(`Welcom ${res["userstreing"]}`);
                    localStorage.setItem("accessTokenEcommerce", res["accessTokenEcommerce"]);
                    this.toastyService.success(`Welcom ${res["userstreing"]}`);
                    // this.router.navigate([this.root.home()]);
                    this.authserverService.settoken(res["accessTokenEcommerce"], res["userstreing"], res["username"]);
                } else if (!res["accessTokenEcommerce"]) {
                    this.toastyService.error(`${res["msg"]}`);
                    this.signInForm.enable();
                }
            }
        );
    }

    socialSignUP(type: string) {

        switch (type) {
            case 'facebook': {
                //statements; 
                this.loginWithFacebook('signup');

                break;
            }
            case 'google': {
                this.loginWithGoogle('signup');
                //statements; 

                break;
            }
            case 'apple': {
                //statements; 

                break;
            }
        }

    }
    loginWithGoogle(type: string): void {
        switch (type) {
            case 'signup': {
                this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
                    (response: any) => {

                        this.afterSocialSignUp(response.id, response.email, response.name, response.authToken);
                    },
                    (error: any) => {
                    }
                );
                break;
            }
            case 'login': {
                //statements; 
                this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
                    (response: any) => {


                        this.afterSocialLogin(response.id, response.email, response.name, response.authToken);
                    },
                    (error: any) => {
                    }
                );
                break;
            }
        }
    }



    loginWithFacebook(type: string): void {
        switch (type) {
            case 'signup': {
                this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
                    (response: any) => {

                        this.afterSocialSignUp(response.id, response.email, response.name, response.authToken);
                    },
                    (error: any) => {
                    }
                );
                break;
            }
            case 'login': {
                //statements; 
                this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
                    (response: any) => {
                        this.afterSocialLogin(response.id, response.email, response.name, response.authToken);
                    },
                    (error: any) => {
                    }
                );
                break;
            }
        }

    }
    afterSocialSignUp(uname: string, email: string, name: string, token: string) {
        this.authserverService.validateUsername(uname).subscribe(
            (res: Boolean) => {
                if (res == true) {
                    this.toastyService.error(`You are already Have An Account. Try to Login Please`);
                } else {
                    this.authserverService.signUpSocial({ UserName: uname, Email: email, Name: name, token: token }).subscribe(
                        (res: any) => {
                            localStorage.setItem("accessTokenEcommerce", res["accessTokenEcommerce"]);
                            this.toastyService.success(`Welcom ${res["userstreing"]}`);
                            this.authserverService.settokensignup(res["accessTokenEcommerce"], res["userstreing"], res["username"]);
                            // this.router.navigate(['./account/profile']);
                            this.signUpForm.enable();
                        }
                    );

                }
            }
        );


    }

    signOut(): void {
        this.socialAuthService.signOut();
    }

    socialLogIN(type: string) {

        switch (type) {
            case 'facebook': {
                //statements; 
                this.loginWithFacebook('login');
                break;
            }
            case 'google': {
                //statements; 
                this.loginWithGoogle('login');

                break;
            }
            case 'apple': {
                //statements; 
                // this.openAppleAuthWindow();
                break;
            }
        }
    }
    afterSocialLogin(uname: string, email: string, name: string, token: string) {
        this.authserverService.signInSocial({ UserName: uname, email: email }).subscribe(
            (res: any) => {
                if (res['status'] == false) {
                    this.toastyService.error(`You are Not Registered try to reigister first`);
                }
                else {
                    if (res["accessTokenEcommerce"]) {
                        localStorage.setItem("accessTokenEcommerce", res["accessTokenEcommerce"]);
                        localStorage.setItem("userString", res["userstreing"]);
                        localStorage.setItem("userName", res["username"]);
                        this.toastyService.success(`Welcom ${res["userstreing"]}`);
                        // this.router.navigate([this.root.home()]);
                        this.authserverService.settoken(res["accessTokenEcommerce"], res["userstreing"], res["username"]);

                    } else if (!res["accessTokenEcommerce"]) {
                        this.toastyService.error(`Somthing Wrong .... `);
                    }
                }
            }
        );
    }

    // openAppleAuthWindow() {
    //     window.open(
    //       'https://appleid.apple.com/auth/authorize?' +
    //         `client_id=com.stroyka.bundle.backend&` +
    //         `redirect_uri=${encodeURIComponent('http://localhost:4400/account/login')}&` +
    //         'response_type=code id_token&' +
    //         'scope=name email&' +
    //         'response_mode=form_post',
    //       '_blank',
    //     );
    //   }
}
