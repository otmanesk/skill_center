import { Dashboard, Person } from '@material-ui/icons';
import DashboardPage from '../views/Dashboard/Dashboard';

import UserProfile from '../views/UserProfile/UserProfile';
import Formation from '../views/Formation/Formation';
export type Route = typeof dashboardRoutes[0];
const dashboardRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: '/user',
    sidebarName: 'User Profile',
    navbarName: 'Profile',
    icon: Person,
    component: UserProfile
  },
  {
    path: '/formation',
    sidebarName: 'Formation',
    navbarName: 'Formation',
    icon: Person,
    component: Formation
  },
  {
    path: '/',
    navbarName: 'Redirect',
    redirect: true,
    to: '/dashboard'
  }
];

export default dashboardRoutes;