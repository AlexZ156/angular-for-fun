import { GlobalOverlayService } from './../../common/global-overlay.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private readonly _loginPath = 'login';

  constructor(
    private _router: Router,
    private _loginService: LoginService,
    public overlay: GlobalOverlayService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoginPage = this.isLoginPage(route);
    const isAuthorized = this._loginService.isAuthorized();

    if (!isAuthorized) {
      this.overlay.hide();
      if (!isLoginPage) {
        this.goToLogin();
        return false;
      }
      return true;
    } else {
      if (isLoginPage) {
        this.goToHome();
        return false;
      }
      return true;
    }
  }

  goToLogin(): void {
    this._router.navigate([this._loginPath]);
  }

  goToHome(): void {
    this._router.navigate([''], { replaceUrl: true });
  }

  isLoginPage(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig.path === this._loginPath;
  }
}
