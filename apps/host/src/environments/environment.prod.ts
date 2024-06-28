export const environment = {
  production: true,
  appSettings: {
    production: false,
    allowProductSelection: false,
    unauthorizedEndpoints: [],
    notFoundEndpoints: [],
    auth: {
      endpoint: '',
    },
    realtime: {
      endpoint: '',
    },
    gateway: {
      endpoint: '',
    },
    services: {
      facility: {
        endpoint: 'https://abzcds.azurewebsites.net/api',
      },
    },
    microfrontends: {
      remote: 'https://wonderful-tree-03951661e.3.azurestaticapps.net'
    },
    instrumentationKey: '',
    clickTrackingSettings: {
      clickTrackingEnabled: true,
      excludedTenants: [],
    },
    azureAd: {
      clientId: 'ccdf8d9f-bd27-49d3-8239-8f37dcaeae99',
      tenant: 'ed1842b4-e4ca-4da6-8587-1f81a3cffa8f',
      redirectUri: '/',
      objectId: '2b7d602d-a3d2-4bdd-816f-5c9a3034fafb',
      groupMapping: {
        Management: 'd8ea4b5e-8c07-4a32-87a9-0a72069c5ecb',
        'MD CDI': '3f54d578-74f7-4090-ba56-0974345774d4',
        ClaimOptimization: '652bf906-4e29-4327-bcc1-303a5c11e1d2',
      },
    },
    authGuardSettings: {
      loginUrl: '',
      launchUrl: '',
    },
    userIdleSettings: {
      idle: 1800,
      timeout: 300,
    },
    releaseNoteNotification: {
      offset: 7,
    },
    silentTokenRefreshSettings: {
      oldTokenDeleteOffset: 120,
    },
    helpCenterSettings: {
      switchOverInfo: '',
    },
    resources: {
      eventDaysOffSet: 7,
      voracoAuthKey: '',
    },
    GoogleReCaptcha: {
      SiteKey: '',
    },
    Cryptography: {
      EnableEncryption: false,
      Key: '',
      IV: '',
      Keysizes: 128,
    },
    other: {
      platformSettings: {
        controlSettings: {
          searchControlSetting: {
            apiKey: '',
            searchUriICD: '',
            autocompleteUriICD: '',
            searchUriCPT: '',
            autocompleteUriCPT: '',
          },
        },
      },
    },
    AzureMap: {
      subscriptionKey: '',
    },
    blobStorage: {
      fusionURI: '',
    },
  },
  uiSettings: {
    colorTheme: 'theme-blue-light',
    customScrollbars: true,
    layout: {
      style: 'vertical-layout-1',
      width: 'fullwidth',
      navbar: {
        primaryBackground: 'fuse-navy-700',
        secondaryBackground: 'fuse-navy-900',
        folded: false,
        hidden: false,
        position: 'left',
        variant: 'vertical-style-2',
      },
      header: {
        customBackgroundColor: true,
        background: 'fuse-white-bg',
        hidden: false,
        position: 'above',
      },
      footer: {
        customBackgroundColor: true,
        background: 'fuse-white',
        hidden: false,
        position: 'below-fixed',
      },
      sidepanel: {
        hidden: false,
        position: 'right',
      },
    },
  },
};
