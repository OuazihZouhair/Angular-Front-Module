import {Component, OnInit} from '@angular/core';
import {SecurityService} from "./services/security.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'angular_module_app';

  constructor(public securityService : SecurityService, private keycloakService : KeycloakService) {
  }

  ngOnInit() {
  }

  async login() {
    await this.keycloakService.login({
      redirectUri: window.location.origin
    });
  }

  logout() {
    this.keycloakService.logout(window.location.origin)
  }
}
