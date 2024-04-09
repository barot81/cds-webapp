export const navigations = {
  hash: '',
  data: [
    {
      roleType: 'Administrator',
      menus: [
        {
          active: true,
          icon: 'fa-light fa-table-cells pink-fg',
          image: null,
          order: '0',
          id: 'dashboard',
          title: 'Home',
          type: 'menu-item',
          url: '/admin/account/launch',
          classes: '{"bg":"pink-50-bg","font":"pink-fg","border":"pink"}',
          hidden: false,
          featureCode: 'navigation.programme'
        },
        {
          active: false,
          icon: 'web',
          image: null,
          order: '1',
          id: 'patients',
          title: '360\xB0 MD CDI',
          type: 'menu-group',
          url: null,
          classes: '{"bg":"pink-50-bg","font":"pink-fg","border":"pink"}',
          hidden: false,
          featureCode: 'navigation.patients',
          description: null,
          breadcrumb: [],
          children: [
            {
              active: false,
              icon: 'fa-light fa-university pink-fg',
              image: null,
              order: null,
              id: 'program.information',
              title: '360\xB0 MD CDI',
              type: 'menu-item',
              url: '/admin/patients',
              classes:
                '{"bg":"pink-50-bg","hoverBG":"pink-50-hover-bg","activeBG":"pink-100-bg"}',
              hidden: false,
              featureCode: 'Programme.Basic.Information',
              description: '',
              breadcrumb: [],
              children: []
            },
            {
              icon: 'fa-light fa-cog pink-fg',
              title: '360\xB0 CLAIM OPTIMIZATION',
              type: 'menu-item',
              url: '/admin/pd-patients',
              classes:
                '{"bg":"pink-50-bg","hoverBG":"pink-50-hover-bg","activeBG":"pink-100-bg"}',

            },
            // {
            //   active: false,
            //   icon: 'fa-light fa-cog pink-fg',
            //   image: null,
            //   order: null,
            //   id: 'admin.configuration',
            //   title: 'Configuration',
            //   type: 'menu-collapsable',
            //   url: '',
            //   classes: null,
            //   hidden: false,
            //   featureCode: 'navigation.admin.profile.header',
            //   description: null,
            //   breadcrumb: [],
            //   children: [
            //     {
            //       active: false,
            //       icon: 'fa-light fa-user pink-fg',
            //       image: null,
            //       order: null,
            //       id: 'User',
            //       title: 'Manage Users',
            //       type: 'menu-item',
            //       url: 'user-management',
            //       classes: '{"bg":"pink-50-bg","hoverBG":"pink-50-hover-bg","activeBG":"pink-100-bg"}',
            //       hidden: false,
            //       featureCode: 'Service.Programme.General',
            //       description: null,
            //       breadcrumb: [],
            //       children: [],
            //     },
            //     {
            //       active: false,
            //       icon: 'fa-light fa-cubes pink-fg',
            //       image: null,
            //       order: null,
            //       id: 'standards',
            //       title: 'Manage Roles',
            //       type: 'menu-item',
            //       url: 'standards',
            //       classes: '{"bg":"pink-50-bg","hoverBG":"pink-50-hover-bg","activeBG":"pink-100-bg"}',
            //       hidden: false,
            //       featureCode: 'Service.Programme.Standards',
            //       description: null,
            //       breadcrumb: [],
            //       children: [],
            //     },
            //     {
            //       active: false,
            //       icon: 'fa-light fa-chart-network pink-fg',
            //       image: null,
            //       order: null,
            //       id: 'lookups',
            //       title: 'Manage Lookups',
            //       type: 'menu-item',
            //       url: 'lookups',
            //       classes: '{"bg":"pink-50-bg","hoverBG":"pink-50-hover-bg","activeBG":"pink-100-bg"}',
            //       hidden: false,
            //       featureCode: 'Service.Programme.Campus',
            //       description: null,
            //       breadcrumb: [],
            //       children: [],
            //     },
            //     {
            //       active: false,
            //       icon: 'fa-light fa-file-invoice pink-fg',
            //       image: null,
            //       order: null,
            //       id: 'external-resources',
            //       title: 'CDS',
            //       type: 'menu-item',
            //       url: 'external-resources',
            //       classes:  '{"bg":"pink-50-bg","hoverBG":"pink-50-hover-bg","activeBG":"pink-100-bg"}',
            //       hidden: false,
            //       featureCode:
            //         'navigation.program.information.external-resources',
            //       description: null,
            //       breadcrumb: [],
            //       children: [],
            //     },
            //     {
            //       active: true,
            //       icon: 'fa-light fa-file-invoice pink-fg',
            //       image: null,
            //       order: '2',
            //       id: 'admin.compliance-new',
            //       title: 'PDS',
            //       type: 'menu-item',
            //       url: '/admin/compliance-new',
            //       classes:
            //         '{"bg":"pink-50-bg","hoverBG":"pink-50-hover-bg","activeBG":"pink-100-bg"}',
            //       hidden: false,
            //       featureCode: 'navigation.admin.compliance-v2',
            //       description:
            //         'Configure, collect, review and communicate with students about clearance documents for clinical education.',
            //       breadcrumb: []
            //     }
            //   ],
            // },
            // {
            //   active: false,
            //   icon: 'fa-light fa-file pink-fg',
            //   image: null,
            //   order: '3',
            //   id: 'program.information',
            //   title: 'Reports',
            //   type: 'menu-item',
            //   url: '/admin/remote-home/reports',
            //   classes:
            //     '{"bg":"pink-50-bg","hoverBG":"pink-50-hover-bg","activeBG":"pink-100-bg"}',
            //   hidden: false,
            //   featureCode: 'Programme.Basic.Information',
            //   description: '',
            //   breadcrumb: [],
            //   children: []
            // }
          ],
        },
      ],
      productName: 'Facilities',
      title: 'Facilities',
      icon: null,
      partitionKey: null,
      entityName: null,
      id: 'Meta.Navigation.Facility.Administrator'
    },
    // {
    //   roleType: 'Administrator',
    //   menus: [
    //     {
    //       active: false,
    //       icon: null,
    //       image: null,
    //       order: '5',
    //       id: 'user-interface',
    //       title: 'User Interface',
    //       type: 'menu-group',
    //       url: null,
    //       classes: '{"bg":"green-50-bg","font":"green-fg","border":"green"}',
    //       hidden: false,
    //       featureCode: 'navigation.fuse.theme',
    //       description: null,
    //       breadcrumb: [],
    //       children: [
    //         {
    //           active: false,
    //           icon: 'fa-light fa-columns green-fg',
    //           image: null,
    //           order: null,
    //           id: 'zhealthcare-ux-repo',
    //           title: 'Component Library',
    //           type: 'menu-item',
    //           url: '/admin/ux/ui/zhealthcare-component-library',
    //           classes:
    //             '{"bg":"green-50-bg","hoverBG":"green-50-hover-bg","activeBG":"green-100-bg"}',
    //           hidden: false,
    //           featureCode: 'navigation.fuse.theme',
    //           description: null,
    //           breadcrumb: [],
    //           children: [],
    //         },
    //         {
    //           active: true,
    //           icon: 'fa-light fa-columns green-fg',
    //           image: null,
    //           order: null,
    //           id: 'zhealthcare-layouts',
    //           title: 'Layouts',
    //           type: 'menu-collapsable',
    //           url: null,
    //           classes:
    //             '{"bg":"green-50-bg","hoverBG":"green-50-hover-bg","activeBG":"green-100-bg"}',
    //           hidden: false,
    //           featureCode: 'navigation.fuse.theme',
    //           description: null,
    //           breadcrumb: [],
    //           children: [
    //             {
    //               active: false,
    //               icon: 'fa-light fa-columns green-fg',
    //               image: null,
    //               order: null,
    //               id: 'zhealthcare-page-layouts',
    //               title: 'zhealthcare Page Layouts',
    //               type: 'menu-collapsable',
    //               url: null,
    //               classes:
    //                 '{"bg":"green-50-bg","hoverBG":"green-50-hover-bg","activeBG":"green-100-bg"}',
    //               hidden: false,
    //               featureCode: 'navigation.fuse.theme',
    //               description: null,
    //               breadcrumb: [],
    //               children: [
    //                 {
    //                   active: false,
    //                   icon: null,
    //                   image: null,
    //                   order: null,
    //                   id: 'Fullwidth-Page-scroll',
    //                   title: 'Fullwidth Page scroll',
    //                   type: 'menu-item',
    //                   url: '/admin/ux/ui/page-layouts/layouts/fullwidth-page-scroll',
    //                   classes:
    //                     '{"bg":"green-50-bg","hoverBG":"green-50-hover-bg","activeBG":"green-100-bg"}',
    //                   hidden: false,
    //                   featureCode: 'navigation.fuse.theme',
    //                   description: null,
    //                   breadcrumb: [],
    //                   children: [],
    //                 },
    //                 {
    //                   active: false,
    //                   icon: null,
    //                   image: null,
    //                   order: null,
    //                   id: 'Fullwidth-Component-Scroll',
    //                   title: 'Fullwidth Component Scroll',
    //                   type: 'menu-item',
    //                   url: '/admin/ux/ui/page-layouts/layouts/fullwidth-component-scroll',
    //                   classes:
    //                     '{"bg":"green-50-bg","hoverBG":"green-50-hover-bg","activeBG":"green-100-bg"}',
    //                   hidden: false,
    //                   featureCode: 'navigation.fuse.theme',
    //                   description: null,
    //                   breadcrumb: [],
    //                   children: [],
    //                 },
    //                 {
    //                   active: false,
    //                   icon: null,
    //                   image: null,
    //                   order: null,
    //                   id: 'zhealthcare-layout-Scroll',
    //                   title: 'Layout Scroll',
    //                   type: 'menu-item',
    //                   url: '/admin/ux/ui/zhealthcare-layout-scroll',
    //                   classes:
    //                     '{"bg":"green-50-bg","hoverBG":"green-50-hover-bg","activeBG":"green-100-bg"}',
    //                   hidden: false,
    //                   featureCode: 'navigation.fuse.theme',
    //                   description: null,
    //                   breadcrumb: [],
    //                   children: [],
    //                 },
    //                 {
    //                   active: false,
    //                   icon: null,
    //                   image: null,
    //                   order: null,
    //                   id: 'Two-Column',
    //                   title: 'Two-Column',
    //                   type: 'menu-item',
    //                   url: '/admin/ux/ui/page-layouts/layouts/two-column',
    //                   classes:
    //                     '{"bg":"green-50-bg","hoverBG":"green-50-hover-bg","activeBG":"green-100-bg"}',
    //                   hidden: false,
    //                   featureCode: 'navigation.fuse.theme',
    //                   description: null,
    //                   breadcrumb: [],
    //                   children: [],
    //                 },
    //                 {
    //                   active: false,
    //                   icon: null,
    //                   image: null,
    //                   order: null,
    //                   id: 'Two-Column-With-Header',
    //                   title: 'Two Column With Header',
    //                   type: 'menu-item',
    //                   url: '/admin/ux/ui/page-layouts/layouts/two-column-with-header',
    //                   classes:
    //                     '{"bg":"green-50-bg","hoverBG":"green-50-hover-bg","activeBG":"green-100-bg"}',
    //                   hidden: false,
    //                   featureCode: 'navigation.fuse.theme',
    //                   description: null,
    //                   breadcrumb: [],
    //                   children: [],
    //                 },
    //                 {
    //                   active: false,
    //                   icon: null,
    //                   image: null,
    //                   order: null,
    //                   id: 'Two-Sidebar-Layout',
    //                   title: 'Two Sidebar Layout',
    //                   type: 'menu-item',
    //                   url: '/admin/ux/ui/page-layouts/layouts/two-sidebar-layout',
    //                   classes:
    //                     '{"bg":"green-50-bg","hoverBG":"green-50-hover-bg","activeBG":"green-100-bg"}',
    //                   hidden: false,
    //                   featureCode: 'navigation.fuse.theme',
    //                   description: null,
    //                   breadcrumb: [],
    //                   children: [],
    //                 },
    //               ],
    //             },
    //             {
    //               active: false,
    //               icon: 'fa-light fa-columns green-fg',
    //               image: null,
    //               order: null,
    //               id: 'left-sidebar',
    //               title: 'Left Sidebar Layout',
    //               type: 'menu-item',
    //               url: '/admin/ux/apps/left-sidebar-layout',
    //               classes:
    //                 '{"bg":"green-50-bg","hoverBG":"green-50-hover-bg","activeBG":"green-100-bg"}',
    //               hidden: false,
    //               featureCode: 'navigation.fuse.theme',
    //               description: null,
    //               breadcrumb: [],
    //               children: [],
    //             },
    //           ],
    //         }
    //       ],
    //     },
    //   ],
    //   productName: 'FuseTheme',
    //   title: 'FuseTheme',
    //   id: 'Meta.Navigation.FuseTheme.Administrator'
    // }
  ],
  isModified: true,
};
