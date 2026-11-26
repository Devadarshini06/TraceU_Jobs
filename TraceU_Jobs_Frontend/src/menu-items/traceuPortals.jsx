// assets
import UserOutlined from '@ant-design/icons/UserOutlined';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import DashboardOutlined from '@ant-design/icons/DashboardOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import ShopOutlined from '@ant-design/icons/ShopOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import SolutionOutlined from '@ant-design/icons/SolutionOutlined';
import ContactsOutlined from '@ant-design/icons/ContactsOutlined';
import ReadOutlined from '@ant-design/icons/ReadOutlined';
import ThunderboltOutlined from '@ant-design/icons/ThunderboltOutlined';
import BarChartOutlined from '@ant-design/icons/BarChartOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

// ==============================|| MENU ITEMS - PORTAL SPECIFIC ||============================== //

export const adminPortalMenu = {
  id: 'group-admin-portal',
  title: '',
  type: 'group',
  children: [
    {
      id: 'admin-dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard',
      icon: DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'admin-requisitions',
      title: 'Requisitions',
      type: 'item',
      url: '/admin/requisitions',
      icon: FileTextOutlined,
      breadcrumbs: false
    },
    {
      id: 'admin-jobs',
      title: 'Jobs',
      type: 'item',
      url: '/admin/jobs',
      icon: ShopOutlined,
      breadcrumbs: false
    },
    {
      id: 'admin-candidates',
      title: 'Candidates',
      type: 'item',
      url: '/admin/candidates',
      icon: TeamOutlined,
      breadcrumbs: false
    },
    {
      id: 'admin-applications',
      title: 'Applications',
      type: 'item',
      url: '/admin/applications',
      icon: SolutionOutlined,
      breadcrumbs: false
    },
    {
      id: 'admin-talent-pool',
      title: 'Talent Pool',
      type: 'item',
      url: '/admin/talent-pool',
      icon: ContactsOutlined,
      breadcrumbs: false
    },
    {
      id: 'admin-internships',
      title: 'Internship Program',
      type: 'item',
      url: '/admin/internships',
      icon: ReadOutlined,
      breadcrumbs: false
    },
    {
      id: 'admin-ai-studio',
      title: 'AI Studio',
      type: 'item',
      url: '/admin/ai-studio',
      icon: ThunderboltOutlined,
      breadcrumbs: false
    },
    {
      id: 'admin-analytics',
      title: 'Analytics',
      type: 'item',
      url: '/admin/analytics',
      icon: BarChartOutlined,
      breadcrumbs: false
    },
    {
      id: 'admin-settings',
      title: 'Settings',
      type: 'item',
      url: '/admin/settings',
      icon: SettingOutlined,
      breadcrumbs: false
    }
  ]
};

export const employerPortalMenu = {
  id: 'group-employer-portal',
  title: '',
  type: 'group',
  children: [
    {
      id: 'hr-dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/hr/dashboard',
      icon: DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'hr-requisitions',
      title: 'Requisitions',
      type: 'item',
      url: '/hr/requisitions',
      icon: FileTextOutlined,
      breadcrumbs: false
    },
    {
      id: 'hr-jobs',
      title: 'Jobs',
      type: 'item',
      url: '/hr/jobs',
      icon: ShopOutlined,
      breadcrumbs: false
    },
    {
      id: 'hr-candidates',
      title: 'Candidates',
      type: 'item',
      url: '/hr/candidates',
      icon: TeamOutlined,
      breadcrumbs: false
    },
    {
      id: 'hr-applications',
      title: 'Applications',
      type: 'item',
      url: '/hr/applications',
      icon: SolutionOutlined,
      breadcrumbs: false
    },
    {
      id: 'hr-talent-pool',
      title: 'Talent Pool',
      type: 'item',
      url: '/hr/talent-pool',
      icon: ContactsOutlined,
      breadcrumbs: false
    },
    {
      id: 'hr-internships',
      title: 'Internship Program',
      type: 'item',
      url: '/hr/internships',
      icon: ReadOutlined,
      breadcrumbs: false
    },
    {
      id: 'hr-ai-studio',
      title: 'AI Studio',
      type: 'item',
      url: '/hr/ai-studio',
      icon: ThunderboltOutlined,
      breadcrumbs: false
    },
    {
      id: 'hr-analytics',
      title: 'Analytics',
      type: 'item',
      url: '/hr/analytics',
      icon: BarChartOutlined,
      breadcrumbs: false
    },
    {
      id: 'hr-settings',
      title: 'Settings',
      type: 'item',
      url: '/hr/settings',
      icon: SettingOutlined,
      breadcrumbs: false
    }
  ]
};

export const candidatePortalMenu = {
  id: 'group-candidate-portal',
  title: 'Candidate Portal',
  type: 'group',
  children: [
    {
      id: 'candidate-dashboard',
      title: 'Candidate Dashboard',
      type: 'item',
      url: '/candidate/dashboard',
      icon: UserOutlined,
      breadcrumbs: false
    }
  ]
};

export const sessionMenu = {
  id: 'group-session',
  title: 'Session',
  type: 'group',
  children: [
    {
      id: 'back-to-home',
      title: 'Back to Home',
      type: 'item',
      url: '/',
      icon: HomeOutlined,
      breadcrumbs: false
    }
  ]
};

export function getMenuItemsForPortal(portal) {
  switch (portal) {
    case 'admin':
      return [adminPortalMenu];
    case 'hr':
    case 'employer':
      return [employerPortalMenu];
    case 'candidate':
    default:
      return [candidatePortalMenu];
  }
}

const traceuPortals = {
  id: 'group-traceu-portals',
  title: 'TraceU Dashboard',
  type: 'group',
  children: [
    {
      id: 'candidate-portal',
      title: 'Candidate Dashboard',
      type: 'item',
      url: '/candidate/dashboard',
      icon: UserOutlined,
      breadcrumbs: false
    }
  ]
};

export default traceuPortals;
