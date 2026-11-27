import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import AdminGuard from 'components/AdminGuard';
import { RouteErrorBoundary } from 'components/ErrorBoundary';

// Portal redirect
function PortalDashboardRedirect() {
  let portal = 'admin';
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      portal = window.localStorage.getItem('traceu_current_portal') || 'admin';
    }
  } catch (e) {
    // ignore fallback to admin
  }
  if (portal === 'employer' || portal === 'hr') {
    return <Navigate to="/hr/dashboard" replace />;
  }
  return <Navigate to={`/${portal}/dashboard`} replace />;
}

// render - Dashboards
const AdminDashboard = Loadable(lazy(() => import('pages/portal/AdminDashboard')));
const AdminRequisitions = Loadable(lazy(() => import('pages/portal/AdminRequisitions')));
const AdminJobs = Loadable(lazy(() => import('pages/portal/AdminJobs')));
const AdminCandidates = Loadable(lazy(() => import('pages/portal/AdminCandidates')));
const AdminApplications = Loadable(lazy(() => import('pages/portal/AdminApplications')));
const AdminTalentPool = Loadable(lazy(() => import('pages/portal/AdminTalentPool')));
const AdminInternships = Loadable(lazy(() => import('pages/portal/AdminInternships')));
const AdminInternshipApplications = Loadable(lazy(() => import('pages/portal/AdminInternshipApplications')));
const AdminAiStudio = Loadable(lazy(() => import('pages/portal/AdminAiStudio')));
const AdminAnalytics = Loadable(lazy(() => import('pages/portal/AdminAnalytics')));
const AdminSettings = Loadable(lazy(() => import('pages/portal/AdminSettings')));

// HR Portal Pages
const HrDashboard = Loadable(lazy(() => import('pages/portal/HrDashboard')));
const HrRequisitions = Loadable(lazy(() => import('pages/portal/HrRequisitions')));
const HrJobs = Loadable(lazy(() => import('pages/portal/HrJobs')));
const HrCandidates = Loadable(lazy(() => import('pages/portal/HrCandidates')));
const HrApplications = Loadable(lazy(() => import('pages/portal/HrApplications')));
const HrTalentPool = Loadable(lazy(() => import('pages/portal/HrTalentPool')));
const HrInternships = Loadable(lazy(() => import('pages/portal/HrInternships')));
const HrAiStudio = Loadable(lazy(() => import('pages/portal/HrAiStudio')));
const HrAnalytics = Loadable(lazy(() => import('pages/portal/HrAnalytics')));
const HrSettings = Loadable(lazy(() => import('pages/portal/HrSettings')));

// render - color & components
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  errorElement: <RouteErrorBoundary />,
  children: [
    {
      path: 'dashboard',
      element: <PortalDashboardRedirect />
    },
    {
      path: 'dashboard/default',
      element: <Navigate to="/admin/dashboard" replace />
    },
    {
      path: 'admin',
      element: <Navigate to="/admin/dashboard" replace />
    },
    // Distinct TraceU Admin Portal
    {
      path: 'admin/dashboard',
      element: (
        <AdminGuard>
          <AdminDashboard />
        </AdminGuard>
      )
    },
    {
      path: 'admin/requisitions',
      element: (
        <AdminGuard>
          <AdminRequisitions />
        </AdminGuard>
      )
    },
    {
      path: 'admin/jobs',
      element: (
        <AdminGuard>
          <AdminJobs />
        </AdminGuard>
      )
    },
    {
      path: 'admin/candidates',
      element: (
        <AdminGuard>
          <AdminCandidates />
        </AdminGuard>
      )
    },
    {
      path: 'admin/applications',
      element: (
        <AdminGuard>
          <AdminApplications />
        </AdminGuard>
      )
    },
    {
      path: 'admin/talent-pool',
      element: (
        <AdminGuard>
          <AdminTalentPool />
        </AdminGuard>
      )
    },
    {
      path: 'admin/internships',
      element: (
        <AdminGuard>
          <AdminInternships />
        </AdminGuard>
      )
    },
    {
      path: 'admin/internships/:id/applications',
      element: (
        <AdminGuard>
          <AdminInternshipApplications />
        </AdminGuard>
      )
    },
    {
      path: 'admin/ai-studio',
      element: (
        <AdminGuard>
          <AdminAiStudio />
        </AdminGuard>
      )
    },
    {
      path: 'admin/analytics',
      element: (
        <AdminGuard>
          <AdminAnalytics />
        </AdminGuard>
      )
    },
    {
      path: 'admin/settings',
      element: (
        <AdminGuard>
          <AdminSettings />
        </AdminGuard>
      )
    },

    // Distinct TraceU HR Portal
    {
      path: 'hr',
      element: <Navigate to="/hr/dashboard" replace />
    },
    {
      path: 'hr/dashboard',
      element: <HrDashboard />
    },
    {
      path: 'hr/requisitions',
      element: <HrRequisitions />
    },
    {
      path: 'hr/jobs',
      element: <HrJobs />
    },
    {
      path: 'hr/candidates',
      element: <HrCandidates />
    },
    {
      path: 'hr/applications',
      element: <HrApplications />
    },
    {
      path: 'hr/talent-pool',
      element: <HrTalentPool />
    },
    {
      path: 'hr/internships',
      element: <HrInternships />
    },
    {
      path: 'hr/ai-studio',
      element: <HrAiStudio />
    },
    {
      path: 'hr/analytics',
      element: <HrAnalytics />
    },
    {
      path: 'hr/settings',
      element: <HrSettings />
    },

    // Employer aliases
    {
      path: 'employer/dashboard',
      element: <HrDashboard />
    },
    {
      path: 'employer/requisitions',
      element: <HrRequisitions />
    },
    {
      path: 'employer/jobs',
      element: <HrJobs />
    },
    {
      path: 'employer/candidates',
      element: <HrCandidates />
    },
    {
      path: 'employer/applications',
      element: <HrApplications />
    },
    {
      path: 'employer/talent-pool',
      element: <HrTalentPool />
    },
    {
      path: 'employer/internships',
      element: <HrInternships />
    },
    {
      path: 'employer/ai-studio',
      element: <HrAiStudio />
    },
    {
      path: 'employer/analytics',
      element: <HrAnalytics />
    },
    {
      path: 'employer/settings',
      element: <HrSettings />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
