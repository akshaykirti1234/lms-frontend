import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './auth/Services/login.service';

export const userAuthGuard: CanActivateFn = (route : ActivatedRouteSnapshot, state : RouterStateSnapshot) => {
  const service : LoginService = inject(LoginService);
  const router : Router = inject(Router);
  return service.loginstayUser() && sessionStorage.getItem('userType') == 'User' ? true : router.navigate(['/auth/login']);
};
