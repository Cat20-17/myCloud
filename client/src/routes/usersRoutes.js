import ProtectedRoutes from '../components/protectedRotes/ProtectedRoutes';
import UserPage from '../pages/userPage/UserPage';

const usersRoutes = [
  {
    path: 'users/:id',
    element: <ProtectedRoutes />,
    children: [
      {
        path: '',
        element: <UserPage />,
      }
    ]
  }
];

export default usersRoutes;