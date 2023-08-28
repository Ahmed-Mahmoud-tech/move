// pages
// import ResetPassword from './pages/examples/ResetPassword'
// import Lock from './pages/examples/Lock'
// import ServerError from './pages/examples/ServerError'
// import Forms from './pages/components/Forms'
// import Modals from './pages/components/Modals'
// import Navs from './pages/components/Navs'
// import NotFoundPage from './pages/examples/NotFound'
import Redirect from './components/Global/Redirect/Redirect';
import Display from './pages/Display/Display';
import HomePage from './pages/HomePage/HomePage';
import Singin from './pages/Singin/Singin';
export const Routes = {
  // Signin: {
  //   path: '/',
  //   component: Singin,
  //   roles: ['notAuth'],
  //   type: 'noSidebar',
  // },
  Homepage: {
    path: '/',
    component: HomePage,
    roles: ['notAuth'],
    type: 'noSidebar',
  },
  display: {
    path: '/display',
    component: Display,
    roles: ['notAuth'],
    type: 'noSidebar',
  },
  // ResetPassword: {
  //   path: '/examples/reset-password',
  //   component: ResetPassword,
  //   type: 'noSidebar',
  //   roles: ['notAuth'],
  // },
  // Lock: {
  //   path: '/examples/lock',
  //   component: Lock,
  //   type: 'noSidebar',
  //   roles: '*',
  // },
  // ServerError: {
  //   path: '/examples/500',
  //   component: ServerError,
  //   type: 'noSidebar',
  //   roles: '*',
  // },
  // Forms: { path: '/components/forms', component: Forms, roles: ['superAdmin'] },
  // Modals: {
  //   path: '/components/modals',
  //   component: Modals,
  //   roles: ['superAdmin'],
  // },
  // Navs: { path: '/components/navs', component: Navs, roles: ['superAdmin'] },
  // NotFound: {
  //   path: '/404',
  //   roles: '*',
  //   component: NotFoundPage,
  //   type: 'noSidebar',
  // },
  redirect: {
    path: '*',
    component: Redirect,
    roles: '*',
  },
};
