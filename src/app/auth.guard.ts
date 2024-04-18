import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './auth/Services/login.service';
import { inject } from '@angular/core';

export const adminAuthGuard: CanActivateFn = (route : ActivatedRouteSnapshot, state : RouterStateSnapshot) => {
  const service : LoginService = inject(LoginService);
  const router : Router = inject(Router);
  return service.loginstayUser() && sessionStorage.getItem('userType') == 'Admin' ? true : router.navigate(['/auth/login']);
};
