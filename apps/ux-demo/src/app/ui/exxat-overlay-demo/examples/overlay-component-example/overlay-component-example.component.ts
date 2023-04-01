import { Component, TemplateRef, ComponentFactoryResolver } from '@angular/core';
import { OverlayService } from '@exxat/ux';
import { ComponentType } from '@angular/cdk/portal';
import { SubscribeComponent } from '../../subscribe/subscribe.component';

@Component({
  selector: 'ryzen-overlay-component-example',
  templateUrl: './overlay-component-example.component.html',
  styleUrls: ['./overlay-component-example.component.scss']
})
export class OverlayComponentExampleComponent {

  subscribeData = null;
  subscribeComponentRef: any;

  constructor(private overlayService: OverlayService, private r: ComponentFactoryResolver) {
    this.subscribeComponentRef = this.r.resolveComponentFactory(SubscribeComponent).componentType;
  }

  open(content: TemplateRef<any> | ComponentType<any> | string) {
    const ref = this.overlayService.open(content, { name: 'DEMO User', email: 'demouser@gmail.com' });

    ref.afterClosed$.subscribe(res => {
      this.subscribeData = res.data;
    });
  }

}
