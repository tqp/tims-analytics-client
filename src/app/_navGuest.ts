import { INavData } from '@coreui/angular';

export const navItemsGuest: INavData[] = [
  {
    name: 'About This App',
    url: '/site-admin/about',
    icon: 'icon-info'
  },

  {
    title: true,
    name: 'Applications'
  },
  {
    name: 'Auto Tracker',
    url: '/auto-tracker',
    icon: 'icon-speedometer'
  },

  {
    name: 'Reality TV Tracker',
    url: '/reality-tracker',
    icon: 'fa fa-television',
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
    title: true,
    name: 'Demo Pages'
  },
  {
    name: 'CRUD App',
    url: '/crud-app',
    icon: 'fa fa-keyboard-o',
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
    name: 'Geo Heatmap',
    url: '/demo-pages/geo-heatmap',
    icon: 'fa fa-map-o'
  },
  {
    name: 'Interactive Globe',
    url: '/demo-pages/interactive-globe',
    icon: 'fa fa-globe'
  },
  {
    name: 'Components',
    url: '/components',
    icon: 'fa fa-wrench',
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
        url: '/test-pages/basic-database-connection',
        icon: 'fa fa-database'
      },
    ]
  },


  {
    title: true,
    name: 'Under Development'
  },
  {
    name: 'Sandbox',
    url: '/test-pages/test',
    icon: 'fa fa-rocket'
  },
  {
    name: 'Multi-Timer',
    url: '/demo-pages/multi-timer',
    icon: 'icon-clock'
  },

  {
    title: true,
    name: 'Account Management'
  },
  {
    name: 'My Profile',
    url: '/site-admin/my-profile',
    icon: 'fa fa-user'
  },
  {
    name: 'Logout',
    url: '/logout',
    icon: 'icon-logout'
  }
];
