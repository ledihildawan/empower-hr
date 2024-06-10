import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

import { inject } from '@angular/core';
import { LocalStorageService } from '@shared/services/local-storage.service';

export const authenticationGuard = (
  route?: ActivatedRouteSnapshot,
  state?: RouterStateSnapshot
) => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  return localStorageService.get('u') ? true : router.parseUrl('/auth/sign-in');
};
