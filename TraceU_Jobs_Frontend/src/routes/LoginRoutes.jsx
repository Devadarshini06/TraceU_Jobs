import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import { RouteErrorBoundary } from 'components/ErrorBoundary';

// traceu auth pages
const LoginPage = Loadable(lazy(() => import('pages/auth/Login')));
const AdminLoginPage = Loadable(lazy(() => import('pages/auth/AdminLogin')));
const EmployerLoginPage = Loadable(lazy(() => import('pages/auth/EmployerLogin')));
const CandidateLoginPage = Loadable(lazy(() => import('pages/auth/CandidateLogin')));
const RegisterPage = Loadable(lazy(() => import('pages/auth/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  errorElement: <RouteErrorBoundary />,
  children: [
    {
      path: 'login',
      element: <LoginPage />
    },
    {
      path: 'candidate-login',
      element: <CandidateLoginPage />
    },
    {
      path: 'candidate/login',
      element: <CandidateLoginPage />
    },
    {
      path: 'employer-login',
      element: <EmployerLoginPage />
    },
    {
      path: 'employer/login',
      element: <EmployerLoginPage />
    },
    {
      path: 'hr-login',
      element: <EmployerLoginPage />
    },
    {
      path: 'admin-login',
      element: <AdminLoginPage />
    },
    {
      path: 'admin/login',
      element: <AdminLoginPage />
    },
    {
      path: 'register',
      element: <RegisterPage />
    }
  ]
};

export default LoginRoutes;
