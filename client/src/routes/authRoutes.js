import RegisterPage from '../pages/registerPage/RegisterPage';
import LoginPage from '../pages/loginPage/LoginPage';

const authRoutes = [
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
];

export default authRoutes;