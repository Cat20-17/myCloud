import ProtectedRoutes from '../components/protectedRotes/ProtectedRoutes';
import FilesPage from '../pages/filesPage/FilesPage';

const userRoutes = [
  {
    path: 'user/files',
    element: <ProtectedRoutes />,
    children: [
      {
        path: '',
        element: <FilesPage />,
      }
    ]
  }
];

export default userRoutes;