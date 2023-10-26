
export class StatusCount {

  constructor(
      public name: string,
      public count: number,
      public description: string,
      public isSelected: boolean = false) {
  }
}

export class AccessedOuCode {

  public Name:string;
  public Oucode:string;
  public fullName:string;
  constructor(
  ) {}
}

export class FacilityWiseStatuses {

  constructor(
      public FacilityId: string,
      public StatusCount: StatusCount[]
    ) {
  }
}
