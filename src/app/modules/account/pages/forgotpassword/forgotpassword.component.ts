import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/api/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-forgotpassword',
    templateUrl: './forgotpassword.component.html',
    styleUrls: ['./forgotpassword.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule]
})
export class ForgotpasswordComponent implements OnInit {
  emailaddress: string = '';
  UserName: string = '';
  constructor(private authserverService: AuthService, private toastyService: ToastrService,private router:Router) { }

  ngOnInit(): void {
  }
  randomCode: any = '1231';
  showcodechecker: boolean = false;
  customerCode: string = '';

  showchangepassword: boolean = false;
  passwordnew: string = '';
  passwordconfirm: string = '';
  checkPasswordAndchange() {
    if (this.passwordnew != this.passwordconfirm) {
      this.toastyService.error('Passwords not match');
      return;
    } else {

      this.authserverService.chengePassword(this.emailaddress, this.UserName, this.passwordnew).subscribe((res: any) => {

        if (res.status == false) {
          this.toastyService.error(res.message);
        } else {
          this.toastyService.success(res.message);
          this.router.navigate(['account/login']);
          // this.showcodechecker = true;
          // this.randomCode = res.rand;
        }
      });
    }
  }
  checkCode() {
    if (this.customerCode == this.randomCode) {
      this.showchangepassword = true;
      this.showcodechecker = false;
    } else {
      this.toastyService.error('Incorrect Code...');
    }
  }
  sendCode() {
    // && this.UserName.length > 1
    if (this.emailaddress.length > 1) {
      this.authserverService.sendCodeForgotPassword(this.emailaddress, this.UserName).subscribe((res: any) => {
        console.log(res);

        if (res.status == false) {
          this.toastyService.error(res.message);
        } else {
          this.showcodechecker = true;
          this.randomCode = res.rand;
        }
      });
    }

  }


}
