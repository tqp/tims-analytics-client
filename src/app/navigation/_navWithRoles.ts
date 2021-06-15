import { INavDataTqp } from './INavDataTqp';

export const navItemsWithRoles: INavDataTqp[] = [
  {
    name: 'About This App',
    url: '/main/about',
    icon: 'fa fa-info-circle',
    allow: 'ROLE_ADMIN, ROLE_USER, ROLE_GUEST'
  },

  {
    title: true,
    name: 'Applications',
    allow: 'ROLE_ADMIN, ROLE_USER, ROLE_GUEST'
  },
  {
    name: 'Auto Tracker',
    url: '/auto-tracker',
    icon: 'fa fa-car',
    allow: 'ROLE_ADMIN, ROLE_USER, ROLE_GUEST'
  },
  {
    name: 'Donor Database',
    url: '/donor-database',
    icon: 'fa fa-heart-o',
    allow: 'ROLE_ADMIN, ROLE_USER, ROLE_GUEST'
  },
  {
    name: 'Charter Sauce',
    url: '/charter-sauce',
    icon: 'fa fa-ship',
    allow: 'ROLE_ADMIN, ROLE_USER, ROLE_GUEST'
  },

  {
    title: true,
    name: 'Demo Pages',
    allow: 'ROLE_ADMIN, ROLE_USER, ROLE_GUEST'
  },
  {
    name: 'Geo Heatmap',
    url: '/demo-pages/geo-heatmap',
    icon: 'fa fa-map-o',
    allow: 'ROLE_ADMIN, ROLE_USER, ROLE_GUEST',
  },
  {
    name: 'Interactive Globe',
    url: '/demo-pages/interactive-globe',
    icon: 'fa fa-globe',
    allow: 'ROLE_ADMIN, ROLE_USER, ROLE_GUEST',
  },
  {
    name: 'CRUD App',
    url: '/crud-app',
    icon: 'fa fa-keyboard-o',
    allow: 'ROLE_ADMIN, ROLE_USER, ROLE_GUEST',
    children: [
      {
        name: 'Client-Side Scroll',
        url: '/crud-app/crud-master-client-scroll',
        icon: 'fa fa-keyboard-o'
      },
      {
        name: 'Server-Side Scroll',
        url: '/crud-app/crud-master-server-scroll',
        icon: 'fa fa-keyboard-o'
      },
      {
        name: 'Server-Side Paging',
        url: '/crud-app/crud-master-server-pagination',
        icon: 'fa fa-keyboard-o'
      }
    ]
  },
  {
    name: 'Components',
    url: '/components',
    icon: 'fa fa-wrench',
    allow: 'ROLE_ADMIN, ROLE_USER, ROLE_GUEST',
    children: [
      {
        name: 'Auto-Complete',
        url: '/demo-pages/auto-complete',
        icon: 'fa fa-edit'
      },
      {
        name: 'Toastr Popup',
        url: '/demo-pages/toastr-popup',
        icon: 'icon-bubble'
      },
      {
        name: 'Database Test Page',
        url: '/demo-pages/database-connection-test',
        icon: 'fa fa-database'
      },
    ]
  },

  {
    title: true,
    name: 'Under Development',
    allow: 'ROLE_ADMIN',
  },
  {
    name: 'Reality TV Tracker',
    url: '/reality-tracker',
    icon: 'fa fa-television',
    allow: 'ROLE_ADMIN',
    children: [
      {
        name: 'Series List',
        url: '/reality-tracker/series-list',
        icon: 'fa fa-star'
      },
      {
        name: 'Contestant List',
        url: '/reality-tracker/contestant-list',
        icon: 'fa fa-users'
      },
      {
        name: 'Competition',
        url: '/reality-competition/dashboard',
        icon: 'fa fa-trophy'
      }
    ]
  },
  {
    name: 'Multi-Timer',
    url: '/demo-pages/multi-timer',
    icon: 'icon-clock',
    allow: 'ROLE_ADMIN, ROLE_USER, ROLE_GUEST',
  },
  // {
  //   name: 'Sandbox',
  //   url: '/test-pages/test',
  //   icon: 'fa fa-rocket',
  //   allow: 'ROLE_ADMIN, ROLE_USER, ROLE_GUEST',
  // },

  {
    title: true,
    name: 'Account Management',
    allow: 'ROLE_ADMIN, ROLE_USER, ROLE_GUEST'
  },
  {
    name: 'My Profile',
    url: '/account/my-profile',
    icon: 'fa fa-user',
    allow: 'ROLE_ADMIN, ROLE_USER, ROLE_GUEST'
  },
  {
    name: 'User List',
    url: '/admin/user-list',
    icon: 'fa fa-users',
    allow: 'ROLE_ADMIN'
  },
  {
    name: 'Logout',
    url: '/logout',
    icon: 'icon-logout',
    allow: 'ROLE_ADMIN, ROLE_USER, ROLE_GUEST'
  }
];
