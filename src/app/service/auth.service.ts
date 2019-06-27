import {Injectable} from '@angular/core';
import {AppService} from 'symtech-shared-library';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  auth$: Observable<any>;
  constructor(private appService: AppService, private router: Router) {
    this.auth$ = this.appService.authenticateService.tokenStream$;
  }

  authenticate(username: string, password: string, url: string) {
    this.appService.authenticateService.authenticateUser(username, password);

    this.auth$.subscribe(x => {
      window.location.href = url;
    });
  }
}
