export interface ServiceEndpoint {
  endpoint: string;
}

export interface MicroFrontEnds {
  [key: string]: string;
}

export interface Language {
  code: string;
  name: string;
  culture: string;
}

export interface AppSettings {
  production: boolean;
  allowProductSelection: boolean;
  unauthorizedEndpoints: [];
  notFoundEndpoints: [];
  auth: ServiceEndpoint;
  realtime: ServiceEndpoint;
  gateway: ServiceEndpoint;
  services: { string: ServiceEndpoint }[];
  microfrontends: MicroFrontEnds;
  localization: {
    languages: Language[];
    defaultLanguage: string;
  };
  notifications: {
    timeOut: number;
    showProgressBar: boolean;
    pauseOnHover: boolean;
    position: []; // 'top' | 'bottom' | 'center'
    theClass: string; //'sy-notification'
    unauthorizedEndpoints: [];
    options: [];
    toasterEnable: boolean;
  };
  userIdleSettings: {
    idle: number; //5,
    timeout: number; //10,
    ping: number; //60
  };
  debugging: boolean;
  instrumentationKey: string;
  clickTrackingSettings: {
    clickTrackingEnabled: boolean;
    excludedTenants: [];
  };
  azureAdB2C: {
    clientId: string;
    activeDirectory: string;
    tenant: string;
    signUpSignInPolicyId: string;
    forgotPassword: string;
    redirectUri: string;
    b2cScopes: [];
  };
  authGuardSettings: {
    loginUrl: string;
    launchUrl: string;
  };
  Cryptography: {
    EnableEncryption: true;
    Key: string;
    IV: string;
    Keysizes: number;
  };
  other: any;
  blobStorage: {
    fusionURI: string;
  };
}
