export class DrgLookup {
  constructor(
    public no: string,
    public title: string,
    public weight: number,
    public gmlos: number
  ) {}
}

export class MSDrgLookup {
  id: string;
  items: MsDrgLookupItem[];
}

export class MsDrgLookupItem {
  drgNo: string;
  isPostAcuteDrg: string;
  isSpecialPayDrg: string;
  mdc: string;
  drgType: string;
  drgTitle: string;
  weights: number;
  geometricMeanLos: number;
  arithmeticMeanLos: string;
}

export class APRDrgLookup {
  id: string;
  items: APRDrgLookupItem[];
}

export class APRDrgLookupItem {
  drgNo: string;
  drgDescription: string;
  nationalAverageLos: number;
  relativeWeight: number;
  adultMedicaidCareCategory: string;
  pediatricMedicaidCareCategory: string;
}

export class QueryDiagnosisLookup {
  id: string;
  items: QueryDiagnosisLookupItem[];
}
export class QueryDiagnosisLookupItem {
  id: string;
  name: string;
}
