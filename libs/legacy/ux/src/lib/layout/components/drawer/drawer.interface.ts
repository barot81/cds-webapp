import { BehaviorSubject } from 'rxjs';

export interface DrawerAdapter {
  data: any;
  key: string;
  isValid?:BehaviorSubject<boolean>;
  primaryAction()
  secondaryAction()
}
