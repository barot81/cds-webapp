export class LookupMap{
    lookups: any = new Map<string, Lookup>();
}

export class Lookup {
    description: string;
    top: string;
    items: Array<LookupItem>;
  settings: any;
  slotStatusList: any;
  slotTypes: any;
}

export class LookupItem {
    itemId: string;
    description: string;
    tag: any = new Map<string, string>();
}
