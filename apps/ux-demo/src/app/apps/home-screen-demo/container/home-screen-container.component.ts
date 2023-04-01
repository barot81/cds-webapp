import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem, NavigationItemClasses } from '@exxat/fusion/models';
import { FusionNavigationService } from '@exxat/fusion/services';
import { HeaderService } from '@exxat/ux';

@Component({
  selector: 'exxat-home-screen-container',
  templateUrl: './home-screen-container.component.html',
  styleUrls: ['./home-screen-container.component.scss']
})
export class HomeScreenContainerComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('screen_header') screen_header: ElementRef;
  public screen_header_height: number = 0;
  public scroll_settlement_height: number = 40;

  navigation: Array<NavigationItem>;

  /**
   *
   */
  constructor(
    private _fusionNavigationService: FusionNavigationService,
    private readonly router: Router,
    public readonly _headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.setNavigation();
  }

  private setNavigation() {
    // Load the navigation either from the input or from the service
    this.navigation = JSON.parse(
      JSON.stringify(
        this.navigation || this._fusionNavigationService.getCurrentNavigation()
      )
    );

    this.navigation = JSON.parse(
      JSON.stringify(
        this.navigation.filter(
          x => x.id !== 'user-interface' && x.id !== 'ui_apps'
        )
      )
    );

    if (
      this.navigation &&
      this.navigation != null &&
      this.navigation.length > 0
    ) {
      this.navigation = JSON.parse(
        JSON.stringify(this.navigation.filter(x => x.type === 'menu-group'))
      );

      this.navigation.forEach(mainNav => {
        if (
          mainNav.children &&
          mainNav.children != null &&
          mainNav.children.length > 0
        ) {
          mainNav.children = JSON.parse(
            JSON.stringify(
              mainNav.children.filter(item => item.type === 'menu-item')
            )
          );
        }
      });
    }

    this.navigation.forEach(item => {
      item['styleClasses'] = <NavigationItemClasses>JSON.parse(item.classes);
    });

    this.setStyleClasses(this.navigation);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.screen_header && this.screen_header != null) {
        this.screen_header_height = this.screen_header.nativeElement.offsetHeight;
        this._headerService.setCurrentHeaderHeight(
          this.screen_header_height + this.scroll_settlement_height
        );
      }
    });
  }

  private setStyleClasses(navigation: Array<NavigationItem>) {
    navigation.forEach(element => {
      element['styleClasses'] = <NavigationItemClasses>(
        JSON.parse(element.classes)
      );

      if (element.children && element.children.length > 0) {
        this.setStyleClasses(element.children);
      }
    });
  }

  public navigate(url: string) {
    if (url && url != null && url != '' && url.length > 0) {
      this.router.navigateByUrl(url);
    }
  }

  ngOnDestroy(): void {
    this.navigation = new Array<NavigationItem>();
  }
}
