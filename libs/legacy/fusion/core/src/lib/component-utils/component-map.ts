export class ComponentMap {
  componentMap: Map<string, any>;

  constructor() {
    this.componentMap = new Map(null);
  }

  get(componentKey: string) {
    return this.componentMap.get(componentKey);
  }

  add(componentKey, componentType: any) {
    return this.componentMap.set(componentKey, componentType);
  }
}

export class AppComponentApp {

  public static componentMapForApps: Map<string, any> = new Map(null);

  static add(componentKey, componentType: any) {
    return AppComponentApp.componentMapForApps.set(componentKey, componentType);
  }

}
