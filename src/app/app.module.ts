import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import {HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ClientComponent } from './client/client.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'iao-realm',
        clientId: 'angular-demo1'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ClientComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgForOf,
        RouterLink,
        RouterOutlet,
        KeycloakAngularModule,
        FormsModule,
        NgForOf,
        FormsModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  providers: [
    {provide: APP_INITIALIZER, deps : [KeycloakService],useFactory : initializeKeycloak, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
