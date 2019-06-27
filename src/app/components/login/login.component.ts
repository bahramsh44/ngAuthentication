import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppService} from 'symtech-shared-library';
import {AuthServiceService} from 'src/app/service/auth.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string;
  password: string;
  newpassword: string;
  confirmpassword: string;
  fusername: string;
  landingUrl: string;
  forgotpasswordSection = false;
  resetpasswordSection = false;
  verificationCode: string;
  subscription1: Subscription;

  constructor(private appService: AppService, private authService: AuthServiceService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.appService.lanCookieChangeService.apply('');
    this.appService.translationService.language = this.appService.lanCookieChangeService.CurrentLanguage.substr(0, 2);

    this.appService.siteSettingService.getSiteSetting(window.location.hostname);

    this.subscription1 = this.activatedRoute.queryParams.subscribe(params => {
      this.verificationCode = params.verificationcode;
      if (this.verificationCode) {
        this.resetpasswordSection = true;
      }
    });
  }

  selectChange(value) {
    this.appService.translationService.language = value.substr(0, 2);
    this.appService.lanCookieChangeService.apply(value);
  }

  submit(form) {
    if (form.valid) {
      this.authService.authenticate(this.username, this.password, this.landingUrl);
    }
  }

  submitForgotPassword(form) {
    if (form.valid) {
      this.appService.authenticateService.passwordReset(this.fusername, this.authService.siteId);
      this.forgotpasswordSection = false;
    }
  }

  submitResetPassword(form) {
    if (form.valid) {
      this.appService.authenticateService.changePassword(this.verificationCode, this.newpassword);
      this.forgotpasswordSection = false;
      this.resetpasswordSection = false;
    }
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
