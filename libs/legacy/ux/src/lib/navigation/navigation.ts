import { ProductNavigation } from '@zhealthcare/fusion/models';

export const productNavigation : ProductNavigation[] = [
  {
    productName : 'steps',
    roleType:'administrator',
    title:'steps',
    menus:[
      {
        id: 'dashboard',
        title: 'dashboard',
        type: 'menu-collapsable',
        icon: 'apps',
        children: [
          {
            id: 'Student',
            title: 'Student',
            type: 'menu-collapsable',
            icon: 'dashboard',
            children: [
              {
                id: 'Profile-dashboard',
                title: 'Profile',
                type: 'menu-item',
                icon: 'dashboard',
                url: '/steps/student/profile/dashboard'
              },
              {
                id: 'compliance-dashboard',
                title: 'Compliance',
                type: 'menu-item',
                url: '/steps/student/compliance/dashboard'
              }
            ]
          }
        ]
      },
      {
        id: 'Student',
        title: 'Student',
        type: 'menu-group',
        icon: 'apps',
        children: [
          {
            id: 'Profile',
            title: 'Profile',
            type: 'menu-collapsable',
            icon: 'dashboard',
            children: [
              {
                id: 'Basic-Information',
                title: 'Profile',
                type: 'menu-item',
                icon: 'Info',
                url: '/student/profile/basicInfo'
              },
              {
                id: 'Plan-of-study',
                title: 'Plan-of-study',
                type: 'menu-item',
                url: '/student/planOfStudy'
              },
              {
                id: 'Contact',
                title: 'Contact',
                type: 'menu-item',
                url: '/student/Contact'
              },
              {
                id: 'Compliance',
                title: 'Compliance',
                type: 'menu-item',
                url: '/student/Compliance'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    productName : 'plan',
    roleType:'administrator',
    title:'Plan',
    menus:[
      {
        id: 'Dashboard',
        title: 'Dashboard',
        type: 'menu-collapsable',
        icon: 'apps',
        children: [
          {
            id: 'Mapping-dashboard',
            title: 'Mapping',
            type: 'menu-collapsable',
            icon: 'dashboard',
            children: [
             {
                id: 'carriculam-dashboard',
                title: 'carriculam',
                type: 'menu-item',
                icon: 'dashboard',
                url: '/plan/carriculam/dashboard'
              }
            ]
          }
        ]
      },
      {
        id: 'Mapping',
        title: 'Mapping',
        type: 'menu-collapsable',
        icon: 'apps',
        url: '/plan/mapping',
        children: [
          {
            id: 'carriculam-mapping',
            title: 'carriculam-mapping',
            type: 'menu-item',
            icon: 'dashboard',
            url: '/plan/mapping/carriculamMapping'
          }
        ]
      },
      {
        id: 'Carriculam',
        title: 'Carriculam',
        type: 'menu-item',
        icon: 'apps',
        url: '/plan/Carriculam'
      }
    ]
  }
]
