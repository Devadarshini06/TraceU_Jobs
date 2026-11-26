import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import { RouteErrorBoundary } from 'components/ErrorBoundary';

// candidate portal
const Candidate = Loadable(lazy(() => import('pages/portal/Candidate')));
const CandidateDashboard = Loadable(lazy(() => import('pages/portal/CandidateDashboard')));
const CandidateCompanies = Loadable(lazy(() => import('pages/portal/CandidateCompanies')));
const CandidateInternships = Loadable(lazy(() => import('pages/portal/CandidateInternships')));
const CandidateResources = Loadable(lazy(() => import('pages/portal/CandidateResources')));
const CandidateCareerTools = Loadable(lazy(() => import('pages/portal/CandidateCareerTools')));
const CandidateSaved = Loadable(lazy(() => import('pages/portal/CandidateSaved')));

// ==============================|| CANDIDATE ROUTING ||============================== //

const CandidateRoutes = {
  path: '/',
  errorElement: <RouteErrorBoundary />,
  children: [
    {
      path: 'candidate',
      element: <Candidate />
    },
    {
      path: 'candidate/profile',
      element: <Candidate />
    },
    {
      path: 'candidate/dashboard',
      element: <CandidateDashboard />
    },
    {
      path: 'candidate/jobs',
      element: <CandidateDashboard />
    },
    {
      path: 'candidate/companies',
      element: <CandidateCompanies />
    },
    {
      path: 'candidate/internships',
      element: <CandidateInternships />
    },
    {
      path: 'candidate/resources',
      element: <CandidateResources />
    },
    {
      path: 'candidate/career-tools',
      element: <CandidateCareerTools />
    },
    {
      path: 'candidate/saved',
      element: <CandidateSaved />
    }
  ]
};

export default CandidateRoutes;

