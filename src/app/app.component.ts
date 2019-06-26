import {Component, OnInit} from '@angular/core';
import {AppService} from 'symtech-shared-library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngAuthentication';

  username: string;
  password: string;

  logo: string;
  banner: string;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.translationService.language = this.appService.lanCookieChangeService.CurrentLanguage.substr(0, 2);

    this.appService.siteSettingService.getSiteSettingStream().subscribe(x => {
      document.documentElement.style.setProperty('--primary', x.primary);
      document.documentElement.style.setProperty('--secondary', x.secondary);
      document.documentElement.style.setProperty('--tertiary', x.tertiary);
      document.documentElement.style.setProperty('--warning', x.warning);
      document.documentElement.style.setProperty('--danger', x.danger);
      console.log(x);
      this.logo = x.logo;
      this.banner = x.vehicle;
    });

    this.appService.siteSettingService.getSiteSetting(window.location.hostname);
    //this.appService.configSettingService.application$.next('home');
  }
}
