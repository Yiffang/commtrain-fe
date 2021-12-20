export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/demo',
    // layout: false,
    component: './Demo',
  },
  {
    path: '/inf',
    // layout: false,
    component: './Inf',
  },
  {
    path: '/manage',
    // layout: false,
    component: './Manage',
  },
  {
    path: '/test',
    component: './Test',
  },
  {
    path: '/groupmember',
    component: './Groupmember',
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/demo',
  },
  {
    component: './404',
  },
];
