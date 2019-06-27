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
      this.logo = x.logo;
      this.banner = x.vehicle;
      this.landingUrl = x.landingurl;
      this.siteId = x.siteID;
    });
  }

  authenticate(username: string, password: string, url: string) {
    this.appService.authenticateService.authenticateUser(username, password);

    this.auth$.subscribe(x => {
      window.location.href = url;
    });
  }
}
