import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {
tenantId:string;
selectedOucode:string;
  constructor() { }

  getTenantId(){
   return this.tenantId;
  }
 
  setTenantId(selectedTenant:string){
   this.tenantId=selectedTenant;
  }

  getOucode(){
return this.selectedOucode
  }

  setOucode(selectedOucode:string){
this.selectedOucode=selectedOucode;
  }
}
