import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Error404 } from './shared/components/error404/error404';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  {
    path: 'not-found',
    component: Error404,
  },
  { path: '**', redirectTo: '/not-found' },
];
