import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, UrlTree } from '@angular/router';

import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class AuthStateGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService) { }

    // async wraps function in a promise
    // (angular will wait for promises and observables to complete; if they never complete the page will hang!)
    async canActivate(): Promise<boolean | UrlTree> {

        console.log('AuthStateGuard has run');

        // Call isLoggedIn method and await result.
        // If false allow navigation to login page, else navigate to dash
        if (! await this.auth.isLoggedIn()) {
            return true;
            }

        return this.router.parseUrl('tabs');
    }

}
