import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import {UserProfile} from "./user-profile";
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
//import { UserProfile } from './user-profile';
//*import { environment } from '../../utils/environment'

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  get keycloak() {
    try {
      if (!this._keycloak) {
        this._keycloak = new Keycloak({
          url: "http://localhost:9080/auth",//////
          realm: "Postarion1",/////////
          clientId: "postarion",//////
        },
      );
      }
      return this._keycloak;
    } catch (error) {
      console.error('Failed to initialize Keycloak:', error);
      throw error;
    }
  }

  async init(){
    console.log("inside  keycloack") ;
    const authenticated = await this.keycloak.init({

      onLoad: 'login-required',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      checkLoginIframe: false,
    });
    if(authenticated){
      console.log("user authenticated")
      this._profile=(await  this.keycloak?.loadUserProfile() as UserProfile);
      this._profile.token=this.keycloak?.token;
      if(this._keycloak?.token){
        this.tokenStorageService.saveToken(this._keycloak?.token)
        const userRoles = this.keycloak?.realmAccess?.roles || [];
        await this.navigetURL(userRoles);
      }
    }

  }
  async login(){
   
    return this.keycloak?.login();
  }
  logout(){
    this.tokenStorageService.signOut();
    return this.keycloak?.logout({redirectUri: 'http://localhost:4200'});
  }

  async navigetURL(roles: string[]): Promise<void> {
    let route: string;
  
    switch (true) {
      case roles.includes('ROLE_ADMIN'):
        route = '/home';
        console.log('navigate admin');
        break;
      case roles.includes('ROLE_USER'):
        route = '/user-client';
        console.log('ROLE_USER navigate');
        break;
      
      default:
        console.error('Invalid user role.');
        return; 
    }
  
    if (route) {
      this.router.navigate([route]);
    }
  }
 
/*

  async init() {
    try {
      const authenticated = await this.keycloak.init({

        onLoad: 'login-required',
      });
      if (authenticated) {
        try {
          this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
          console.log('Retrieved user profile:', this._profile);
          this._profile.token = this.keycloak.token as string;
          console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
        } catch (error) {
          console.error('Failed to load user profile:', error);
        }
      }
    } catch (error) {
      console.error('Failed to initialize Keycloak:', error);
    }
  }

  async login() {
    return await this.keycloak.login()
      .then(() => {
        console.log('Login successful');
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  }

  async logout(): Promise<void> {
    return await this.keycloak.logout({
      redirectUri: environment.kcRedirectUrl,
      logoutMethod: 'POST',
    })
      .then(() => {
        console.log('Logout successful');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  }
  accountManagement() {
    this.keycloak.accountManagement();
  }
*/
}
