import { NavigationItem } from './navigationItem';
type roleTypeOption = 'student' | 'administrator' | 'faculty' | 'dalegator';
export interface ProductNavigation {
  productName: string;
  title: string;
  roleType: roleTypeOption;
  icon?: string;
  menus: NavigationItem[];
}

export interface NavigationChangeDetector {
  isModified: boolean;
  hash: string;
  data: ProductNavigation[];
}
