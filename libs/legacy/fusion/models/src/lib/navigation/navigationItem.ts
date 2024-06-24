type navigationItemType = | 'menu-item'
  | 'menu-group'
  | 'menu-collapsable'
  | 'page-nav-item';
export interface NavigationItem {
  id: string;
  title: string;
  type: navigationItemType;

  icon?: string;
  image?: string;
  order?: string;
  hidden?: boolean;
  url?: string;
  translate?: string;
  classes?: string;
  description?:string;
  exactMatch?: boolean;
  openInNewTab?: boolean;
  function?: any;
  badge?: {
    title?: string;
    translate?: string;
    bg?: string;
    fg?: string;
  };
  groups?:string[];
  children?: NavigationItem[];
}
export class NavigationItemClasses {
  bg: string;
  hoverBG: string;
  activeBG: string;
  font: string;
  border: string;
}
