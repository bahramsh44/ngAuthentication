import {Injectable} from '@angular/core';
import {AppService} from 'symtech-shared-library';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  logo: string;
  banner: string;
  landingUrl: string;
  siteId: string;
  auth$: Observable<any>;
  constructor(private appService: AppService, private router: Router) {
    this.auth$ = this.appService.authenticateService.tokenStream$;

    this.appService.siteSettingService.getSiteSettingStream().subscribe(x => {
      document.documentElement.style.setProperty('--primary', x.primary);
      document.documentElement.style.setProperty('--secondary', x.secondary);
      document.documentElement.style.setProperty('--tertiary', x.tertiary);
      document.documentElement.style.setProperty('--warning', x.warning);
      document.documentElement.style.setProperty('--danger', x.danger);
      this.logo = x.logo;
      this.banner = x.vehicle;
      this.landingUrl = x.landingurl;
      this.siteId = x.siteID;
    });
  }

  initializeLanguage(): string {
    let result = '';
    const language = this.appService.lanCookieChangeService.getCookieByKey('locale');
    if (!language) {
      this.appService.lanCookieChangeService.apply('');
      this.appService.translationService.language = this.appService.lanCookieChangeService.CurrentLanguage.substr(0, 2);
      result = this.appService.lanCookieChangeService.CurrentLanguage;
    } else {
      this.appService.translationService.language = language.substr(0, 2);
      result = language;
    }
    return result;
  }

  authenticate(username: string, password: string) {
    this.appService.authenticateService.authenticateUser(username, password);
    this.auth$.subscribe(x => {
      window.location.href = this.landingUrl;
    });
  }
}
