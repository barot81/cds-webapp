import { Directive, Input, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MetaConstants } from '@zhealthcare/fusion/core';
import { RoleBasedAccessService } from '@zhealthcare/fusion/services';


@Directive({
  selector: '[featureCode]',
})
export class RoleBasedAccessControlDirective implements OnInit {
  @Input('featureCode') rolecode: any;
  @Input() params;
  @Input() isDisable;

  constructor(
    private readonly elm: ElementRef,
    private readonly renderer: Renderer2,
    private readonly roleBasedAccessService: RoleBasedAccessService,
    private router: Router
  ) { }

  ngOnInit() {
    let hasAcccess = this.roleBasedAccessService.hasAccess(
      this.rolecode,
      this.params
    );
    if (!hasAcccess) {
      this.renderer.setStyle(this.elm.nativeElement, 'display', 'none');
    }
  }

  ngAfterViewInit() {
    if (this.roleBasedAccessService.getRoleMeta()?.data?.activeRoles?.find(x=>x.includes(MetaConstants.VIEW_AS_STUDENT_ROLE_CODE))) {
      if (this.router.url.includes('student') && (this.elm.nativeElement.tagName == 'BUTTON' || this.elm.nativeElement.tagName == 'A')) {
        this.renderer.removeStyle(this.elm.nativeElement, 'display');
        this.renderer.addClass(this.elm.nativeElement, 'view-as-disabled');
        this.elm.nativeElement.disabled = true;

      } else if (this.router.url.includes('admin')) {
        this.renderer.removeStyle(this.elm.nativeElement, 'display');
      }
    }
  }
}
