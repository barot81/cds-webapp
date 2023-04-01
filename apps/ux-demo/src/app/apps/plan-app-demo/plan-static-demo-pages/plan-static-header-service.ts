import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'any'})
export class PlanDemoHeaderLayoutService {

  private container_header_height = new BehaviorSubject<number>(0);
  public container_header_height$ = this.container_header_height.asObservable();

  private nav_container_height = new BehaviorSubject<number>(0);
  public nav_container_height$ = this.nav_container_height.asObservable();

  public setContainerHeaderHeight(height: number): void {
    this.container_header_height.next(height);
  }

  public get containerHeaderHeight(): number {
    return this.container_header_height.value;
  }

  public setNavContainerHeight(height: number): void {
    this.nav_container_height.next(height);
  }

  public get navConatinerHeight(): number {
    return this.nav_container_height.value;
  }

}
