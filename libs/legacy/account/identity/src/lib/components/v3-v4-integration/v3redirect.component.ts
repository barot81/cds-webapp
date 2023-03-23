import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpService, FusionConfigService } from '@zhealthcare/fusion/core';
import { IdentitySandbox } from '../../identity.sandbox';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'landing',
  template: ''
})
export class V3RedirectComponent extends HttpService {
  constructor(public router: Router, public configService: FusionConfigService, public identitySandbox: IdentitySandbox, private _snackBar: MatSnackBar){
    super();
  }

  ngOnInit(){
    this.identitySandbox.redirectToV3().subscribe((res: HttpResponse<any>)=>{
          this.userFacade.LogOut();
          localStorage.clear();
          this.router.navigate(['/externalRedirect', { externalUrl:  this.configService.getservice('v3.launch').endpoint}]);
      },error => {
        if(error.status == 404)
        this._snackBar.open(error.statusText, null, {
          duration: 5000,
        })
      });
  }
}
