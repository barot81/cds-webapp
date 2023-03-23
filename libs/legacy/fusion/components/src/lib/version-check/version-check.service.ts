import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import {
  Logger,
  MetaConstants,
  UserFacade,
} from '@exxat/fusion/core';
import { VersionCheckConfirmationDialog } from './version-confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class VersionCheckService {
  // this will be replaced by actual hash post-build.js
  private currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';

  constructor(
    private readonly http: HttpClient,
    private readonly dialog: MatDialog,
    private readonly userFacade: UserFacade
  ) {}

  /**
   * Checks in every set frequency the version of frontend application
   * @param url
   * @param {number} frequency - in milliseconds, defaults to 30 minutes
   */
  public initVersionCheck(url, frequency = 1000 * 60 * 30) {
    setInterval(() => {
      this.checkVersion(url);
    }, frequency);
  }

  /**
   * Will do the call and check if the hash has changed or not
   * @param url
   */
  private checkVersion(url) {
    // timestamp these requests to invalidate caches
    url = url + '?t=' + new Date().getTime();
    this.http.get(url).subscribe(
      (response: any) => {
        const hash = response.hash;
        const hashChanged = this.hasHashChanged(this.currentHash, hash);

        // If new version, do something
        if (hashChanged) {
          if (window.location.pathname === '/account/login') {
            // User is on login screen - do a silent reload
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
          }
          // Commenting out the dialog workflow - Already logged-in user, give a popup
          // else {
          //   this.openDialog();
          // }
        }
        // store the new hash so we wouldn't trigger versionChange again
        // only necessary in case you did not force refresh
        this.currentHash = hash;
        if (localStorage.getItem('mainHash') !== this.currentHash) {
          localStorage.setItem('mainHash', this.currentHash);
        }
      },
      (err) => {
        console.error(err, 'Could not get version');
      }
    );
  }

  /**
   * Checks if hash has changed.
   * This file has the JS hash, if it is a different one than in the version.json
   * we are dealing with version change
   * @param currentHash
   * @param newHash
   * @returns {boolean}
   */
  private hasHashChanged(currentHash, newHash) {
    if (!currentHash || currentHash === '{{POST_BUILD_ENTERS_HASH_HERE}}') {
      return false;
    }

    return currentHash !== newHash;
  }

  openDialog() {
    const dialogRef = this.dialog.open(VersionCheckConfirmationDialog, {
      minWidth: 392,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        Logger.trace(
          `Version check - Confirm button clicked. Logging Out user`
        );
        if (JSON.parse(sessionStorage.getItem(MetaConstants.IsDelegateUser))) {
          window.location.reload();
        } else {
          sessionStorage.clear();
          this.userFacade.LogOut();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    });
  }
}
