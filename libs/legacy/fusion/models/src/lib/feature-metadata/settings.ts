export class SettingsMap {
  settings: any = new Map<string, SettingItem>();
}

export class SettingItem {
  value: string;
  description: string;
}
