export const navigations = {
  hash: '',
  data: [
    {
      roleType: 'Administrator',
      menus: [
        {
          active: true,
          icon: 'fa-solid fa-table-cells pink-fg mr-4',
          image: null,
          order: 0,
          id: 'dashboard',
          title: 'Home',
          type: 'menu-item',
          url: '/admin/account/launch',
          classes: '{"bg":"pink-50-bg","font":"pink-fg","border":"pink"}',
          hidden: false,
          featureCode: 'navigation.programme',
          groups: ['Management', 'MD CDI']
        },
        {
          active: false,
          icon: 'fa-solid fa-university pink-fg  m-8',
          image: null,
          order: 1,
          id: 'program.information',
          title: '360\xB0 MD CDI',
          type: 'menu-item',
          url: '/admin/patients',
          classes:
            '{"bg":"pink-50-bg","hoverBG":"pink-50-hover-bg","activeBG":"pink-100-bg"}',
          hidden: false,
          featureCode: 'Programme.Basic.Information',
          groups: ['Management', 'MD CDI'],
          description: '',
          breadcrumb: [],
          children: []
        },
        {
          icon: 'fa-solid fa-user pink-fg m-8',
          title: '360\xB0 CLAIM OPTIMIZATION',
          type: 'menu-item',
          order: 2,
          url: '/admin/pd-patients',
          classes:
            '{"bg":"pink-50-bg","hoverBG":"pink-50-hover-bg","activeBG":"pink-100-bg"}',
          groups: ['Management', 'Claim Optimization']
        }

      ],
      productName: 'Facilities',
      title: 'Facilities',
      icon: null,
      partitionKey: null,
      entityName: null,
      id: 'Meta.Navigation.Facility.Administrator'
    }
  ],
  isModified: true,
};
