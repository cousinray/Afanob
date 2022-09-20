import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/auth';
import { StorageService } from './../services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        // private afAuth: AngularFireAuth,
        private storageService: StorageService) {
         }

    // Pipe first value emitted and convert to promise
    isLoggedIn() {
        // return this.afAuth.authState.pipe(first()).toPromise();
        return this.storageService.get(name).then();
    }
}
