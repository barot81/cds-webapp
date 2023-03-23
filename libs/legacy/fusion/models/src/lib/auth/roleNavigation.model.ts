export interface RoleNavigation {
  id: string;
  role: string;
  menus: NavigationJson[];
  actions: Actions[];
}

export interface NavigationJson {
  id: string;
  title?: string;
  type?: string;
  icon?: string;
  active?: boolean;
  url?: string;
  featureCode: string;
  children?: NavigationJson[];
}

export interface Actions {
  id: string;
  title?: string;
  type?: string;
  icon?: string;
  active?: boolean;
  url?: string;
  function?: any;
}
