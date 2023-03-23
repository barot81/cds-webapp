import { Component } from '@angular/core';

@Component({
  template: `
    <div class="p-24" fxLayout="column">
      <div fxLayout="row" fxLayoutAlign="space-between center">
        <div fxLayout="row" fxLayoutAlign="start center">
          <div>
            <span class="font-weight-600 font-18 accent-fg"
              >New App Available</span
            >
          </div>
        </div>
      </div>
      <div fxLayout="row" class="mt-16">
        <div>
          <span
            >New version of application is available !! Would you like to use
            the new version ?</span
          >
        </div>
      </div>
      <div fxLayout="row" fxLayoutAlign="end center" class="mt-32">
        <div fxLayout="row" fxLayoutAlign="start center">
          <button mat-flat-button color="accent" [mat-dialog-close]="true">
            Confirm
          </button>
        </div>
      </div>
    </div>
  `,
})
export class VersionCheckConfirmationDialog {}