import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppService, SharedModule} from 'symtech-shared-library';
import {environment} from './../environments/environment';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [BrowserModule, FormsModule, SharedModule.forRoot(environment), AppRoutingModule],

  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {}
