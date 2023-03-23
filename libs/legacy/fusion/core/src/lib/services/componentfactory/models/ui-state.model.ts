import { Type } from '@angular/core';

export class UIState implements IUIState{
  componentType: Type<any>;
  data: any;
  disableClose: boolean;
  mode: string;
  position: string;

  constructor(componentType: Type<any>, data: any, mode = "over", position = "end", disableClose = false)
  {
    this.componentType = componentType;
    this.data = data;
    this.mode = mode;
    this.position = position;
    this.disableClose = disableClose;
  }

}

export interface IUIState
{
  componentType: Type<any>;
  data: any;
  disableClose: boolean;
  mode: string;
  position: string;
}
