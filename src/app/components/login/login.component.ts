import {Component, OnInit} from '@angular/core';
import {AppService} from 'symtech-shared-library';
import {AuthServiceService} from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  siteId: string;
  fusername: string;
  logo: string;
  banner: string;
  landingUrl: string;
  forgotpasswordSection = false;

  constructor(private appService: AppService, private authService: AuthServiceService) {}

  ngOnInit() {
    this.appService.lanCookieChangeService.apply('');
    this.appService.translationService.language = this.appService.lanCookieChangeService.CurrentLanguage.substr(0, 2);

    this.appService.siteSettingService.getSiteSettingStream().subscribe(x => {
      this.logo = x.logo;
      this.banner = x.vehicle;
      this.landingUrl = x.landingurl;
      this.siteId = x.siteID;
    });

    this.appService.siteSettingService.getSiteSetting(window.location.hostname);
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
      this.appService.authenticateService.passwordReset(this.fusername, this.siteId);
      this.forgotpasswordSection = false;
    }
  }
}
