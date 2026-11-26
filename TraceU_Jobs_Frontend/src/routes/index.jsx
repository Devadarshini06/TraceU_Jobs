import { createBrowserRouter } from 'react-router-dom';

// project imports
import LandingRoutes from './LandingRoutes';
import LoginRoutes from './LoginRoutes';
import CandidateRoutes from './CandidateRoutes';
import MainRoutes from './MainRoutes';
import { RouteErrorBoundary } from 'components/ErrorBoundary';

// ==============================|| ROUTING RENDER ||============================== //

const basename =
  import.meta.env.VITE_APP_BASE_NAME && import.meta.env.VITE_APP_BASE_NAME !== '/'
    ? import.meta.env.VITE_APP_BASE_NAME
    : '';

const router = createBrowserRouter(
  [
    LandingRoutes,
    LoginRoutes,
    CandidateRoutes,
    MainRoutes,
    {
      path: '*',
      element: <RouteErrorBoundary is404 />
    }
  ],
  { basename }
);

export default router;
