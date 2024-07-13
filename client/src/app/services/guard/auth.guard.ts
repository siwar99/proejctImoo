import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakService } from '../keycloak/keycloak.service';

export const authGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  if (keycloakService.keycloak?.isTokenExpired()) {
    keycloakService.login();
    return false;
  }
  const requiredRoles = route.data['roles'] as string[];
  const userRoles = keycloakService.keycloak?.realmAccess?.roles || [];


  console.log("dataroles",requiredRoles)
  console.log("userRole",userRoles)
  console.log(requiredRoles.every(role => userRoles.includes(role)))

const hasAccess=requiredRoles.every(role => userRoles.includes(role));
  if (hasAccess) {
    
    return true;
  }else{
    router.navigate(['/unauthorized']);
    return false;
  }

  
};
