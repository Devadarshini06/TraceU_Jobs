import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import { RouteErrorBoundary } from 'components/ErrorBoundary';

// landing page
const LandingPage = Loadable(lazy(() => import('pages/landing/LandingPage')));

// ==============================|| LANDING ROUTING ||============================== //

const LandingRoutes = {
  path: '/',
  errorElement: <RouteErrorBoundary />,
  children: [
    {
      index: true,
      element: <LandingPage />
    },
    {
      path: 'landing',
      element: <LandingPage />
    }
  ]
};

export default LandingRoutes;

