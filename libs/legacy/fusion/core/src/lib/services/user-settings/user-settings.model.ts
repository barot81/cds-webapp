export class UserSettingsModel {
  userId: number;
  theme: ThemeModel;
}

export class ThemeModel {
  colorScheme: string;
  mode: string;
}