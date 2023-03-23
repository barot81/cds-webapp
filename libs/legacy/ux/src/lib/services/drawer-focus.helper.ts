import { FuseSidebarService } from "../components/sidebar/sidebar.service";

export class DrawerFocusHelper {
  public static shiftFocusToDrawer(
    _fuseSidebarService: FuseSidebarService,
    document: Document
  ) {
    if (_fuseSidebarService.manifoldPanelInstances > 0) {
      const className = _fuseSidebarService.manifoldPanelFocusActiveElement.get(
        _fuseSidebarService.manifoldPanelInstances
      ).focusedBtnClass;
      let manifoldSidebar = <HTMLElement>(
        document.querySelector('.' + className)
      );
      if (manifoldSidebar != undefined) {
        manifoldSidebar.focus({ preventScroll: true });
      }
    } else {
      setTimeout(() => {
        let drawerSidebar = <HTMLElement>document.querySelector('.kprocking');
        if (drawerSidebar != undefined) {
          drawerSidebar.focus({ preventScroll: true });
        }
      }, 650);
    }
  }

  public static shiftBackFocusFromDrawer(
    _fuseSidebarService: FuseSidebarService
  ) {
    if (_fuseSidebarService.manifoldPanelInstances > 0) {
      const manipanelFocusElement =
        _fuseSidebarService.manifoldPanelFocusActiveElement.get(
          _fuseSidebarService.manifoldPanelInstances
        ).focusElement;
      if (manipanelFocusElement != undefined) {
        let originalFocus = manipanelFocusElement.nativeElement;
        if (originalFocus != undefined) {
          originalFocus.focus({ preventScroll: true });
        }
        //accessibility
        _fuseSidebarService.manifoldPanelFocusActiveElement.delete(
          _fuseSidebarService.manifoldPanelInstances
        );
        _fuseSidebarService.manifoldPanelInstances--;
        //#endregion
      }
    } else {
      if (_fuseSidebarService.focusActiveElement != undefined) {
        let originalFocus =
          _fuseSidebarService.focusActiveElement.nativeElement;
        if (originalFocus != undefined) {
          originalFocus.focus({ preventScroll: true });
        }
      }
    }
  }
}
