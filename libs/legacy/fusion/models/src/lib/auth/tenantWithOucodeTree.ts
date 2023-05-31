
export class StatusCount {

  constructor(
      public status: string,
      public count: string,
      public isSelected: boolean) {
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
