import { Input, Component, TemplateRef, AfterViewInit } from '@angular/core';
import { SecurityContext, OuCode } from '@exxat/fusion/models';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { OrgFacade, OucodeHelper } from '@exxat/fusion/core';



@Component({
  selector: 'security-context',
  templateUrl: 'securityContext.component.html',
  providers: [
    {

      provide: NG_VALUE_ACCESSOR,
      useExisting: SecurityContextComponent,
      multi: true
    }]
})
export class SecurityContextComponent implements  ControlValueAccessor,AfterViewInit {

  @Input() template?: TemplateRef<any>;
  @Input() errorMessage :string;
  @Input() fieldName = 'Department';
  @Input() showError = false;
  public oucodeContext:{ oucodeList: OuCode[] } = {
    oucodeList:[]
  };
  level=1;
  public isVisible = false;
  public isError = false;
  disabled = false;
  _securityContext: SecurityContext;

  onTouched: any = () => { };

  onChange = (securityContext:SecurityContext) => {};


  constructor(
    private readonly orgFacade:OrgFacade) {

  }
  ngAfterViewInit() {
    // tslint:disable-next-line: triple-equals
    if (this._securityContext !== undefined && 
      this._securityContext !== null && 
      this._securityContext["owningOrganizationUnit"] !== undefined && 
      this._securityContext["owningOrganizationUnit"] !== null && 
      this._securityContext["owningOrganizationUnit"] === "" && 
      this.oucodeContext["oucodeList"].length > 1) {
      this.onChange(null);
    }
  }
  writeValue(value: SecurityContext): void {
    this.getOucodeContext();
    this._securityContext = value;

    if(this._securityContext !== undefined && this._securityContext !== null &&
       this._securityContext["owningOrganizationUnit"] !== undefined && 
       this._securityContext["owningOrganizationUnit"]!==null && 
       this._securityContext["owningOrganizationUnit"] !== "")
    {
      this.onChange(this._securityContext);
    }
    else if (this.oucodeContext["oucodeList"].length === 1) {
      this._securityContext["owningOrganizationUnit"] = this.oucodeContext["oucodeList"][0].key;
      this.onChange(this._securityContext);
    }

    else {
      this.isVisible = true;
      this.onChange(undefined);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getOucodeContext() {
    this.orgFacade.OrgState$.subscribe(data => {
         this.oucodeContext["oucodeList"]=OucodeHelper.getOuCodeFlatList(data.TenantWithOuCodeTree.OucodeTree);

     });
  }

  onOucodeChanged(selectedOucode) {
    if(selectedOucode==="")
      this.isError = true;
    else
      this.isError = false;
    this.showError = false;
    this._securityContext["owningOrganizationUnit"] = selectedOucode;
    this.onChange(this._securityContext);
  }

  onOucodeTouched(){
    this.onTouched(true);
    if(this._securityContext["owningOrganizationUnit"] === "" || this._securityContext["owningOrganizationUnit"]===null)
      this.isError = true;
    else
      this.isError = false;
  }
}
