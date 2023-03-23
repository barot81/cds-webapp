import {
  Injectable, ComponentFactoryResolver, ComponentRef,
  Type,
  ComponentFactory
} from "@angular/core";
import { EventItem } from './../../event';
import { UIState } from './models/ui-state.model';
import { ReferenceAreaDirective } from "./directives/reference-area.directive";

@Injectable({providedIn: 'any'})
export class ComponentFactoryService {
  availableLanguages: Array<any>;
  componentRef: ComponentRef<any>;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {

  }

  public DestroyIfExist() {
    if (this.componentRef)
      this.componentRef.destroy();
  }

  public createComponent(event: EventItem, refhost: ReferenceAreaDirective): ComponentRef<any> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      (event.payload as UIState).componentType
    );
    const viewContainerRef = refhost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance.baseData = (event.payload as UIState).data;
    this.componentRef.instance.isRefArea = true;
    return this.componentRef;
  }
}

@Injectable({providedIn: 'any'})
export class CoalescingComponentFactoryResolver extends ComponentFactoryResolver {
  private rootResolve: (component: Type<any>) => ComponentFactory<any>;

  private inCall = false;

  private readonly resolvers = new Map<
    ComponentFactoryResolver,
    (component: Type<any>) => ComponentFactory<any>
  >();

  constructor(private readonly rootResolver: ComponentFactoryResolver) {
    super();
  }

  init() {
    this.rootResolve = this.rootResolver.resolveComponentFactory;
    this.rootResolver.resolveComponentFactory = this.resolveComponentFactory;
  }

  public registerResolver(resolver: ComponentFactoryResolver) {
    const original = resolver.resolveComponentFactory;
    this.resolvers.set(resolver, original);
  }

  public resolveComponentFactory = <T>(
    component: Type<T>
  ): ComponentFactory<T> => {
    // Prevents cyclic calls.
    if (this.inCall) {
      return null;
    }

    this.inCall = true;
    try {
       return this.resolveInternal(component);
    } finally {
      this.inCall = false;
    }
  };

  private readonly resolveInternal = <T>(component: Type<T>): ComponentFactory<T> => {
    for (const [resolver, fn] of Array.from(this.resolvers.entries())) {
      try {
        const factory = fn.call(resolver, component);
        if (factory) {
          return factory;
        }
      } catch { }
    }

    return this.rootResolve.call(this.rootResolver, component);
  };
}
