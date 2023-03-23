import { Directive, Input, OnInit, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

import { RoleBasedAccessService } from '@exxat/fusion/services';

import { DrawerService } from '../../layout/components/drawer/drawer.service';
import { FuseSidebarService } from '../../components/sidebar/sidebar.service';
import { LayoutService } from '../../layout/vertical/layout-1/layout-1.service';

@Directive({ selector: '[exxatDrawerAction]' })
export class ExxatDrawerActionDirective implements OnInit {

  key = 'drawer';
  @Input() componentSelector: string = null;
  @Input() moduleId: string = null;
  @Input() caption: string = null;
  @Input() size: string = null;
  @Input() data: any = null;
  @Input() entityKey: any = null;
  @Input() primaryAction: string = null;
  @Input() secondaryAction: string = null;
  @Input() featureCode: string;
  @Input() closeOnNavigation: boolean = true;
  @Output() exxatDrawerAction: EventEmitter<any> = new EventEmitter<any>();
  // origin = this.formatOrigin(null);
 
  constructor(
    private _drawerService: DrawerService,
    private _layoutService: LayoutService,
    private _fuseSidebarService: FuseSidebarService,
    private _roleBasedAccessService: RoleBasedAccessService,
    private element: ElementRef
  ) {

   }

  ngOnInit(): void { }

  @HostListener('click', ['$event.target']) onClick() {
    this._layoutService.drawerTitle.next(this.caption != null && this.caption.replace(/\s/g, '').trim() !== '' ? this.caption : null);
    this.exxatDrawerAction.emit();
    this._fuseSidebarService.getSidebar(this.key).open();
    this._fuseSidebarService.focusActiveElement = this.element;
    this._layoutService.drawerSize.next(this.size);
    let isDeleteVisible = true;
    if(this.secondaryAction?.toLowerCase() === 'delete') {
      isDeleteVisible = this._roleBasedAccessService.hasAccess(this.featureCode, {CAN: ['DELETE']});
    }
    this._layoutService.isDeleteVisible = isDeleteVisible;
    this._layoutService.closeOnNavigation = this.closeOnNavigation;
    this._drawerService.showDrawerContent(this.componentSelector, this.moduleId, this.data, this.entityKey, this.primaryAction, this.secondaryAction, isDeleteVisible);
  }
}
