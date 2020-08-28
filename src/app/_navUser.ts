import { INavData } from '@coreui/angular';

export const navItemsUser: INavData[] = [
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
    name: 'Reality TV Tracker',
    url: '/reality-tracker',
    icon: 'fa fa-trophy',
    children: [
      {
        name: 'User Dashboard',
        url: '/reality-tracker/user-dashboard',
        icon: 'fa fa-bar-chart'
      },
      {
        name: 'Series List',
        url: '/reality-tracker/series-list',
        icon: 'fa fa-star'
      },
      {
        name: 'Contestant List',
        url: '/reality-tracker/contestant-list',
        icon: 'fa fa-users'
      }
    ]
  },

  {
    title: true,
    name: 'Demo Pages'
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
    name: 'Auto-Complete',
    url: '/demo-pages/auto-complete',
    icon: 'fa fa-edit'
  },
  {
    name: 'Multi-Timer',
    url: '/demo-pages/multi-timer',
    icon: 'icon-clock'
  },
  {
    name: 'Toastr Popup',
    url: '/demo-pages/toastr-popup',
    icon: 'icon-bubble'
  },

  {
    title: true,
    name: 'Test Pages'
  },
  {
    name: 'Test Component',
    url: '/test-pages/test',
    icon: 'fa fa-rocket'
  },
  {
    name: 'Database Test Page',
    url: '/test-pages/basic-database-connection',
    icon: 'fa fa-database'
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
    name: 'User List',
    url: '/site-admin/user-list',
    icon: 'fa fa-users'
  },
  {
    name: 'Logout',
    url: '/logout',
    icon: 'icon-logout'
  }

];
