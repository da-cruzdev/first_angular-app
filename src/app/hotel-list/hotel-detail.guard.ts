import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const hotelDetailGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log(route, state);

  const id = +route.url[1].path;
  const router = new Router();
  if (isNaN(id) || id <= 0) {
    alert('Hotel inconnu');

    router.navigate(['/hotels']);

    return false;
  }

  return true;
};
