import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/homePage/HomePage';
import authRoutes from './authRoutes';
import AppLayout from '../components/appLayout/AppLayout';
import usersRoutes from './usersRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      ...authRoutes,
      ...usersRoutes,
    ]
  },
]);

export default router;