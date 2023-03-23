import { getModuleFactory } from '@angular/core';

export class ComponentUtils {
  public static getComponentBySelector(resolver, compiler, moduleId, selector: string) {
    return compiler.compileModuleAndAllComponentsAsync(moduleId.constructor).then(_module => {
      return _module.componentFactories.find(x => x.selector === selector);
    });
  }
}
