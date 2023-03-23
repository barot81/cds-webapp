
export class OuCodeAccessTree {

  constructor(
      public Name: string,
      public Oucode: string,
      public caption: string,
      public fullName: string,
      public isSelected: boolean,
      public Children: OuCodeAccessTree[]) {
  }
}

export class AccessedOuCode {

  public Name:string;
  public Oucode:string;
  public fullName:string;
  constructor(
  ) {}
}

export class TenantWithOuCodeTree {

  constructor(
      public TenantId: string,
      public OucodeTree: OuCodeAccessTree[],
      public FlatArray:any[]= [],
      public TenantName: string = "Base",
    ) {
  }
}
