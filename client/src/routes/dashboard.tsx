import {
  Dashboard,
  Person,
  Code,
  Equalizer,
  Assignment,
  School
} from '@material-ui/icons';
import DashboardPage from '../views/Dashboard/Dashboard';

import UserProfile from '../views/UserProfile/UserProfile';
import Training from '../views/Trainings/Training';
import Project from '../views/Projects/Projects';
import Education from '../views/Education/Education';
import Skills from '../views/Skills/Skills';

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
    path: '/training',
    sidebarName: 'Training',
    navbarName: 'Training',
    icon: Assignment,
    component: Training
  },
  {
    path: '/projects',
    sidebarName: 'Projects',
    navbarName: 'Projects',
    icon: Equalizer,
    component: Project
  },
  {
    path: '/education',
    sidebarName: 'Education',
    navbarName: 'Education',
    icon: School,
    component: Education
  },
  {
    path: '/skills',
    sidebarName: 'Skills',
    navbarName: 'Skills',
    icon: Code,
    component: Skills
  },
  {
    path: '/',
    navbarName: 'Redirect',
    redirect: true,
    to: '/dashboard'
  }
];

export default dashboardRoutes;
