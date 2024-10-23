import { createBrowserRouter } from 'react-router-dom';
import authRoutes from './authRoutes';
import AppLayout from '../components/appLayout/AppLayout';
import userRoutes from './userRoutes';
import FilesPage from '../pages/filesPage/FilesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <FilesPage />,
      },
      ...authRoutes,
      ...userRoutes,
    ]
  },
]);

export default router;