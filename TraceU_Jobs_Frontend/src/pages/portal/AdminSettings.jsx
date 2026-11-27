import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import getGreeting from 'utils/getGreeting';
import { useBrand } from 'contexts/BrandContext';
import { PRESET_LOGOS } from 'utils/presetLogos';
import { getSettings, saveSettingsSection, inviteWorkspaceUser, updateWorkspaceUser, deleteWorkspaceUser } from 'api/adminSettings';
import Menu from '@mui/material/Menu';
import { validateEmail } from 'utils/emailValidation';

// material-ui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';

// icons
import BankOutlined from '@ant-design/icons/BankOutlined';
import BgColorsOutlined from '@ant-design/icons/BgColorsOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import ApartmentOutlined from '@ant-design/icons/ApartmentOutlined';
import FileDoneOutlined from '@ant-design/icons/FileDoneOutlined';
import ApiOutlined from '@ant-design/icons/ApiOutlined';
import SafetyCertificateOutlined from '@ant-design/icons/SafetyCertificateOutlined';
import HistoryOutlined from '@ant-design/icons/HistoryOutlined';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import LockOutlined from '@ant-design/icons/LockOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import HolderOutlined from '@ant-design/icons/HolderOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import LinkedinFilled from '@ant-design/icons/LinkedinFilled';
import SlackOutlined from '@ant-design/icons/SlackOutlined';

// avatar assets
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';

export default function AdminSettings() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    companyName: brandName,
    companyLogo: brandLogo,
    primaryColor: brandPrimary,
    secondaryColor: brandSecondary,
    accentColor: brandAccent,
    themeMode: brandThemeMode,
    updateBrand,
    resetBrand
  } = useBrand();

  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);

  // Active sub-page tab:
  // 'org' | 'branding' | 'users' | 'workflow' | 'templates' | 'integrations' | 'security' | 'audit'
  const activeSection = searchParams.get('tab') || 'org';

  const setActiveSection = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  // Toast snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // 1. Organization Settings State (persisted)
  const [orgData, setOrgData] = useState(() => {
    try {
      const stored = localStorage.getItem('traceu_admin_org_settings');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {
      name: brandName || 'TraceU Technologies',
      industry: 'Information Technology',
      size: '51 - 200 employees',
      website: 'https://jobs.traceu.com',
      phone: '+91 98765 43210',
      email: 'info@traceu.com',
      address: '12, Tech Park Road, Bengaluru, Karnataka 560100, India',
      timeZone: '(GMT+05:30) Asia/Kolkata',
      dateFormat: 'DD MMM YYYY (21 Oct 2025)',
      timeFormat: '12-Hour (AM/PM)',
      language: 'English'
    };
  });

  // 2. Branding & Appearance State (synchronized with BrandContext)
  const [companyName, setCompanyName] = useState(brandName || 'TraceU Technologies');
  const [companyLogo, setCompanyLogoState] = useState(brandLogo || null);
  const [primaryColor, setPrimaryColor] = useState(brandPrimary || '#530EF0');
  const [secondaryColor, setSecondaryColor] = useState(brandSecondary || '#F3EBFF');
  const [accentColor, setAccentColor] = useState(brandAccent || '#10B981');
  const [themeMode, setThemeModeState] = useState(brandThemeMode || 'light');
  const [favicon, setFaviconState] = useState(null);

  useEffect(() => {
    if (brandName) setCompanyName(brandName);
    setCompanyLogoState(brandLogo);
    if (brandPrimary) setPrimaryColor(brandPrimary);
    if (brandSecondary) setSecondaryColor(brandSecondary);
    if (brandAccent) setAccentColor(brandAccent);
    if (brandThemeMode) setThemeModeState(brandThemeMode);
  }, [brandName, brandLogo, brandPrimary, brandSecondary, brandAccent, brandThemeMode]);

  const colorPresets = [
    { name: 'TraceU Purple', primary: '#530EF0', secondary: '#F3EBFF', accent: '#10B981' },
    { name: 'Ocean Blue', primary: '#2563EB', secondary: '#EFF6FF', accent: '#06B6D4' },
    { name: 'Emerald', primary: '#059669', secondary: '#ECFDF5', accent: '#10B981' },
    { name: 'Sunset Coral', primary: '#E11D48', secondary: '#FFF1F2', accent: '#F59E0B' },
    { name: 'Midnight', primary: '#0F172A', secondary: '#F1F5F9', accent: '#6366F1' }
  ];

  // Logo file upload handler
  const handleLogoFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setSnackbar({ open: true, message: 'Logo file size exceeds 2 MB limit', severity: 'error' });
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result;
      setCompanyLogoState(dataUrl);
      updateBrand({ companyLogo: dataUrl });
      await saveSettingsSection('branding', {
        companyName,
        companyLogo: dataUrl,
        primaryColor,
        secondaryColor,
        accentColor,
        themeMode,
        favicon
      }).catch(() => {});
      setSnackbar({ open: true, message: 'Company logo uploaded and saved successfully!', severity: 'success' });
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPresetLogo = async (preset) => {
    setCompanyLogoState(preset.dataUri);
    setPrimaryColor(preset.primaryColor);
    updateBrand({ companyLogo: preset.dataUri, primaryColor: preset.primaryColor });
    await saveSettingsSection('branding', {
      companyName,
      companyLogo: preset.dataUri,
      primaryColor: preset.primaryColor,
      secondaryColor,
      accentColor,
      themeMode,
      favicon
    }).catch(() => {});
    setSnackbar({ open: true, message: `Applied ${preset.name} brand logo & theme!`, severity: 'success' });
  };

  const handleRemoveLogo = async () => {
    setCompanyLogoState(null);
    updateBrand({ companyLogo: null });
    if (logoInputRef.current) logoInputRef.current.value = '';
    await saveSettingsSection('branding', {
      companyName,
      companyLogo: null,
      primaryColor,
      secondaryColor,
      accentColor,
      themeMode,
      favicon
    }).catch(() => {});
    setSnackbar({ open: true, message: 'Custom logo removed, reverted to default monogram icon', severity: 'info' });
  };

  const handleFaviconUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result;
      setFaviconState(dataUrl);
      updateBrand({ favicon: dataUrl });
      await saveSettingsSection('branding', {
        companyName,
        companyLogo,
        primaryColor,
        secondaryColor,
        accentColor,
        themeMode,
        favicon: dataUrl
      }).catch(() => {});
      setSnackbar({ open: true, message: 'Favicon updated and saved successfully!', severity: 'success' });
    };
    reader.readAsDataURL(file);
  };

  // 3. Users & Permissions State (persisted via backend)
  const [userSearch, setUserSearch] = useState('');
  const [userPage, setUserPage] = useState(1);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [userMenuTarget, setUserMenuTarget] = useState(null);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Recruiter' });
  const [inviteErrors, setInviteErrors] = useState({});
  const [usersList, setUsersList] = useState([]);

  const handleInviteUser = async () => {
    const errs = {};
    if (!newUser.name.trim()) errs.name = 'Full name is required';
    const emailErr = validateEmail(newUser.email);
    if (emailErr) errs.email = emailErr;
    if (Object.keys(errs).length > 0) {
      setInviteErrors(errs);
      return;
    }
    try {
      const res = await inviteWorkspaceUser({
        name: newUser.name.trim(),
        email: newUser.email.trim(),
        role: newUser.role
      });
      const created = res?.data;
      if (created) {
        const mapped = { ...created, avatar: [avatar1, avatar2, avatar3, avatar4, avatar5][(created.id || 0) % 5] };
        setUsersList((prev) => [mapped, ...prev]);
      }
      await loadBackendSettings();
      setOpenInviteDialog(false);
      setNewUser({ name: '', email: '', role: 'Recruiter' });
      setInviteErrors({});
      setSnackbar({ open: true, message: `Invited ${newUser.name.trim()} successfully!`, severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to invite user', severity: 'error' });
    }
  };

  const handleUpdateUser = async (id, payload) => {
    try {
      await updateWorkspaceUser(id, payload);
      await loadBackendSettings();
      setSnackbar({ open: true, message: 'User updated successfully!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to update user', severity: 'error' });
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteWorkspaceUser(id);
      setUsersList((prev) => prev.filter((u) => u.id !== id));
      await loadBackendSettings();
      setSnackbar({ open: true, message: 'User removed from workspace', severity: 'info' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to remove user', severity: 'error' });
    }
  };

  // 4. Workflow Settings State (persisted)
  const [openAddStageDialog, setOpenAddStageDialog] = useState(false);
  const [newStageName, setNewStageName] = useState('');
  const [stageError, setStageError] = useState('');
  const [stages, setStages] = useState(() => {
    try {
      const stored = localStorage.getItem('traceu_admin_workflow');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.stages) return parsed.stages;
      }
    } catch (e) {}
    return [
      { id: 1, name: 'Applied', desc: 'Initial application received from candidate', color: '#3B82F6' },
      { id: 2, name: 'Screening', desc: 'Resume and profile evaluation by recruiter', color: '#F59E0B' },
      { id: 3, name: 'Shortlisted', desc: 'Candidate approved for departmental interview', color: '#EAB308' },
      { id: 4, name: 'Interview', desc: 'Technical and cultural assessment rounds', color: '#8B5CF6' },
      { id: 5, name: 'Assessment', desc: 'Practical test or assignment evaluation', color: '#06B6D4' },
      { id: 6, name: 'Offered', desc: 'Official job offer extended to candidate', color: '#10B981' },
      { id: 7, name: 'Hired', desc: 'Offer accepted and onboarding initiated', color: '#059669' }
    ];
  });
  const [stageAutomations, setStageAutomations] = useState(() => {
    try {
      const stored = localStorage.getItem('traceu_admin_workflow');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.stageAutomations) return parsed.stageAutomations;
      }
    } catch (e) {}
    return {
      autoMove: false,
      notifyTeam: true,
      allowComments: true
    };
  });

  const handleAddStage = async () => {
    if (!newStageName.trim()) {
      setStageError('Stage name is required');
      return;
    }
    const newStg = {
      id: Date.now(),
      name: newStageName.trim(),
      desc: 'Custom configured recruitment stage',
      color: primaryColor || '#530EF0'
    };
    const updated = [...stages, newStg];
    setStages(updated);
    try {
      await saveSettingsSection('workflow', { stages: updated, stageAutomations });
      await loadBackendSettings();
    } catch (e) {}
    setOpenAddStageDialog(false);
    setNewStageName('');
    setStageError('');
    setSnackbar({ open: true, message: `Added stage "${newStg.name}" to workflow!`, severity: 'success' });
  };

  const handleDeleteStage = async (id) => {
    const updated = stages.filter((s) => s.id !== id);
    setStages(updated);
    try {
      await saveSettingsSection('workflow', { stages: updated, stageAutomations });
      await loadBackendSettings();
    } catch (e) {}
    setSnackbar({ open: true, message: 'Workflow stage removed', severity: 'info' });
  };

  // 5. Templates & Preferences State (persisted)
  const [templateSubTab, setTemplateSubTab] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('invitation');
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [templateContent, setTemplateContent] = useState(() => {
    try {
      const stored = localStorage.getItem('traceu_admin_templates');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {
      subject: "You're invited to apply for {{job_title}} at {{company_name}}",
      body: `Hi {{candidate_name}},

We came across your profile and would like to invite you to apply for the {{job_title}} position at {{company_name}}.

{{job_description_link}}

Best regards,
{{company_name}} Team`
    };
  });

  // 6. Integrations State (persisted)
  const [integrationFilter, setIntegrationFilter] = useState('All');
  const [integrationsList, setIntegrationsList] = useState(() => {
    try {
      const stored = localStorage.getItem('traceu_admin_integrations');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [
      { id: 'linkedin', name: 'LinkedIn', desc: 'Post jobs and import candidates from LinkedIn.', category: 'Job Boards', connected: true, icon: 'linkedin' },
      { id: 'naukri', name: 'Naukri', desc: 'Post jobs to Naukri and import applications.', category: 'Job Boards', connected: true, icon: 'naukri' },
      { id: 'indeed', name: 'Indeed', desc: 'Post jobs to Indeed and import applications.', category: 'Job Boards', connected: false, icon: 'indeed' },
      { id: 'google', name: 'Google Workspace', desc: 'Sync with Google Calendar and Gmail.', category: 'Calendar', connected: true, icon: 'google' },
      { id: 'ms365', name: 'Microsoft 365', desc: 'Sync with Outlook and Teams.', category: 'Communication', connected: false, icon: 'ms365' },
      { id: 'slack', name: 'Slack', desc: 'Receive notifications in Slack.', category: 'Communication', connected: true, icon: 'slack' },
      { id: 'zoom', name: 'Zoom', desc: 'Schedule and manage interviews.', category: 'Communication', connected: false, icon: 'zoom' },
      { id: 'webhook', name: 'Webhook', desc: 'Send data to your custom endpoints.', category: 'ATS & HR Tools', connected: true, icon: 'webhook' }
    ];
  });

  const handleToggleIntegration = async (id) => {
    const updated = integrationsList.map((item) => {
      if (item.id === id) {
        const nextState = !item.connected;
        setSnackbar({
          open: true,
          message: nextState ? `Connected ${item.name} successfully!` : `Disconnected ${item.name}`,
          severity: nextState ? 'success' : 'info'
        });
        return { ...item, connected: nextState };
      }
      return item;
    });
    setIntegrationsList(updated);
    try {
      await saveSettingsSection('integrations', { items: updated });
      await loadBackendSettings();
    } catch (e) {}
  };

  // 7. Security & Data Management State (persisted)
  const [securitySettings, setSecuritySettings] = useState(() => {
    try {
      const stored = localStorage.getItem('traceu_admin_security');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {
      pwdLength: '8 characters',
      reqUpper: true,
      reqLower: true,
      reqNumbers: true,
      reqSpecial: true,
      sessionTimeout: '60 minutes',
      multiSession: false,
      newDeviceNotify: true,
      candRetention: '2 years',
      appRetention: '2 years',
      anonymizeData: true,
      allowExport: true,
      allowDeletion: false
    };
  });

  // 8. Audit Logs State
  const [auditDate, setAuditDate] = useState('Oct 1, 2025 - Oct 31, 2025');
  const [auditActionFilter, setAuditActionFilter] = useState('All');
  const [auditUserFilter, setAuditUserFilter] = useState('All');
  const [auditSearch, setAuditSearch] = useState('');
  const [auditLogs, setAuditLogs] = useState([]);

  const loadBackendSettings = async () => {
    try {
      const res = await getSettings();
      const data = res?.data || {};
      const sections = data.sections || {};

      if (sections.org) {
        setOrgData((prev) => ({ ...prev, ...sections.org }));
      }
      if (sections.branding) {
        const b = sections.branding;
        if (b.companyName) setCompanyName(b.companyName);
        if (b.companyLogo !== undefined) setCompanyLogoState(b.companyLogo);
        if (b.primaryColor) setPrimaryColor(b.primaryColor);
        if (b.secondaryColor) setSecondaryColor(b.secondaryColor);
        if (b.accentColor) setAccentColor(b.accentColor);
        if (b.themeMode) setThemeModeState(b.themeMode);
        if (b.favicon !== undefined) setFaviconState(b.favicon);
        updateBrand(b);
      }
      if (Array.isArray(data.users)) {
        const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];
        setUsersList(
          data.users.map((u) => ({
            ...u,
            avatar: avatars[(Number(u.id) || 0) % avatars.length]
          }))
        );
      }
      if (sections.workflow) {
        if (Array.isArray(sections.workflow.stages)) setStages(sections.workflow.stages);
        if (sections.workflow.stageAutomations) setStageAutomations(sections.workflow.stageAutomations);
      }
      if (sections.templates) {
        setTemplateContent((prev) => ({ ...prev, ...sections.templates }));
      }
      if (sections.integrations?.items && Array.isArray(sections.integrations.items)) {
        setIntegrationsList(sections.integrations.items);
      }
      if (sections.security) {
        setSecuritySettings((prev) => ({ ...prev, ...sections.security }));
      }
      if (Array.isArray(data.audit_logs)) {
        setAuditLogs(data.audit_logs);
      }
    } catch (e) {
      // keep existing state if backend fails
    }
  };

  useEffect(() => {
    loadBackendSettings();
  }, []);

  const handleSelectSection = (id) => {
    setActiveSection(id);
  };

  const handleSave = async () => {
    try {
      if (activeSection === 'branding') {
        const brandingPayload = {
          companyName,
          companyLogo,
          primaryColor,
          secondaryColor,
          accentColor,
          themeMode,
          favicon
        };
        await saveSettingsSection('branding', brandingPayload);
        updateBrand(brandingPayload);
        setSnackbar({ open: true, message: 'Brand identity & theme settings saved successfully!', severity: 'success' });
      } else if (activeSection === 'org') {
        if (orgData.email) {
          const emailErr = validateEmail(orgData.email);
          if (emailErr) {
            setSnackbar({ open: true, message: emailErr, severity: 'error' });
            return;
          }
        }
        await saveSettingsSection('org', orgData);
        localStorage.setItem('traceu_admin_org_settings', JSON.stringify(orgData));
        if (orgData.name && orgData.name !== companyName) {
          setCompanyName(orgData.name);
          updateBrand({ companyName: orgData.name });
        }
        setSnackbar({ open: true, message: 'Organization settings saved successfully!', severity: 'success' });
      } else if (activeSection === 'workflow') {
        await saveSettingsSection('workflow', { stages, stageAutomations });
        localStorage.setItem('traceu_admin_workflow', JSON.stringify({ stages, stageAutomations }));
        setSnackbar({ open: true, message: 'Recruitment workflow & stage settings saved successfully!', severity: 'success' });
      } else if (activeSection === 'templates') {
        await saveSettingsSection('templates', templateContent);
        localStorage.setItem('traceu_admin_templates', JSON.stringify(templateContent));
        setSnackbar({ open: true, message: 'Email template & preferences saved successfully!', severity: 'success' });
      } else if (activeSection === 'security') {
        await saveSettingsSection('security', securitySettings);
        localStorage.setItem('traceu_admin_security', JSON.stringify(securitySettings));
        setSnackbar({ open: true, message: 'Security policies & retention rules saved successfully!', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: 'Settings saved successfully!', severity: 'success' });
      }
      await loadBackendSettings();
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to save settings', severity: 'error' });
    }
  };

  const handleReset = async () => {
    if (activeSection === 'branding') {
      resetBrand();
      setPrimaryColor('#530EF0');
      setSecondaryColor('#F3EBFF');
      setAccentColor('#10B981');
      setCompanyName('TraceU Technologies');
      setCompanyLogoState(null);
      setThemeModeState('light');
      await saveSettingsSection('branding', {
        companyName: 'TraceU Technologies',
        companyLogo: null,
        primaryColor: '#530EF0',
        secondaryColor: '#F3EBFF',
        accentColor: '#10B981',
        themeMode: 'light'
      }).catch(() => {});
      setSnackbar({ open: true, message: 'Branding reset to TraceU defaults', severity: 'info' });
    } else if (activeSection === 'org') {
      const defaultOrg = {
        name: 'TraceU Technologies',
        industry: 'Information Technology',
        size: '51 - 200 employees',
        website: 'https://jobs.traceu.com',
        phone: '+91 98765 43210',
        email: 'info@traceu.com',
        address: '12, Tech Park Road, Bengaluru, Karnataka 560100, India',
        timeZone: '(GMT+05:30) Asia/Kolkata',
        dateFormat: 'DD MMM YYYY (21 Oct 2025)',
        timeFormat: '12-Hour (AM/PM)',
        language: 'English'
      };
      setOrgData(defaultOrg);
      await saveSettingsSection('org', defaultOrg).catch(() => {});
      localStorage.setItem('traceu_admin_org_settings', JSON.stringify(defaultOrg));
      setSnackbar({ open: true, message: 'Organization settings restored to defaults', severity: 'info' });
    }
    await loadBackendSettings();
  };

  // Nav menu items
  const navMenuItems = [
    { id: 'org', label: 'Organization Settings', icon: <BankOutlined /> },
    { id: 'branding', label: 'Branding & Appearance', icon: <BgColorsOutlined /> },
    { id: 'users', label: 'Users & Permissions', icon: <TeamOutlined /> },
    { id: 'workflow', label: 'Workflow Settings', icon: <ApartmentOutlined /> },
    { id: 'templates', label: 'Templates & Preferences', icon: <FileDoneOutlined /> },
    { id: 'integrations', label: 'Integrations', icon: <ApiOutlined /> },
    { id: 'security', label: 'Security & Data Management', icon: <SafetyCertificateOutlined /> },
    { id: 'audit', label: 'Audit Logs', icon: <HistoryOutlined /> }
  ];

  // Section meta
  const sectionMeta = {
    org: {
      breadcrumb: 'Organization Settings',
      title: 'Organization Settings',
      subtitle: 'Manage your organization details, contact information and basic configuration.'
    },
    branding: {
      breadcrumb: 'Branding & Appearance',
      title: 'Branding & Appearance',
      subtitle: "Customize your organization's identity and appearance."
    },
    users: {
      breadcrumb: 'Users & Permissions',
      title: 'Users & Permissions',
      subtitle: 'Manage team members, roles and access permissions.'
    },
    workflow: {
      breadcrumb: 'Workflow Settings',
      title: 'Workflow Settings',
      subtitle: 'Configure your recruitment workflow and stages.'
    },
    templates: {
      breadcrumb: 'Templates & Preferences',
      title: 'Templates & Preferences',
      subtitle: 'Manage email templates, notifications and application preferences.'
    },
    integrations: {
      breadcrumb: 'Integrations',
      title: 'Integrations',
      subtitle: 'Connect TraceU Jobs with your favorite tools and services.'
    },
    security: {
      breadcrumb: 'Security & Data Management',
      title: 'Security & Data Management',
      subtitle: 'Manage security settings, data retention and compliance.'
    },
    audit: {
      breadcrumb: 'Audit Logs',
      title: 'Audit Logs',
      subtitle: 'Track important changes and activities in your organization.'
    }
  }[activeSection] || {
    breadcrumb: 'Settings',
    title: 'Settings',
    subtitle: 'Manage your organization configuration and preferences.'
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100%', pb: 5 }}>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12.5, mb: 0.5, display: 'block' }}>
          Settings &gt; <span style={{ color: '#530EF0', fontWeight: 600 }}>{sectionMeta?.breadcrumb}</span>
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontWeight: 700, fontSize: { xs: 22, sm: 24 }, color: '#111827', letterSpacing: '-0.3px',
            
            mb: 0.5
          }}
        >
          {sectionMeta?.title}
        </Typography>
        <Typography sx={{ color: '#6B7280', fontSize: 14, fontWeight: 400, lineHeight: 1.5, mt: 0.5 }}>
          {sectionMeta?.subtitle}
        </Typography>
      </Box>

      {/* Main Settings Layout: Flex container ensuring side-by-side positioning without wrapping bugs */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start',
          gap: 3,
          width: '100%'
        }}
      >
        {/* Left Navigation Rail (fixed width 270px on desktop) */}
        <Box
          sx={{
            width: { xs: '100%', md: 260, lg: 280 },
            flexShrink: 0
          }}
        >
          <Card
            sx={{
              p: 1.5,
              borderRadius: '16px',
              border: '1px solid #F3F4F6',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              bgcolor: '#FFF'
            }}
          >
            <Stack spacing={0.5}>
              {navMenuItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Box
                    key={item.id}
                    onClick={() => handleSelectSection(item.id)}
                    sx={{
                      px: 2,
                      py: 1.2,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      cursor: 'pointer',
                      bgcolor: isActive ? '#530EF0' : 'transparent',
                      color: isActive ? '#FFF' : '#4B5563',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: 13.5,
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        bgcolor: isActive ? '#530EF0' : '#F9FAFB',
                        color: isActive ? '#FFF' : '#111827'
                      }
                    }}
                  >
                    <Box sx={{ fontSize: 16 }}>{item.icon}</Box>
                    <Typography variant="body2" sx={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>
                      {item.label}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </Card>
        </Box>

        {/* Right Dynamic Content (fills remaining space) */}
        <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
          {/* ========================================================================= */}
          {/* 1. ORGANIZATION SETTINGS                                                 */}
          {/* ========================================================================= */}
          {activeSection === 'org' && (
            <Stack spacing={2.5}>
              {/* Card 1: Organization Information */}
              <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827', fontSize: '1rem', mb: 0.5 }}>
                  Organization Information
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12.5, display: 'block', mb: 2.5 }}>
                  General details and primary contact information.
                </Typography>

                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.75 }}>
                      Company Name *
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={orgData.name}
                      onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                    />
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.75 }}>
                      Industry
                    </Typography>
                    <Select
                      fullWidth
                      size="small"
                      value={orgData.industry}
                      onChange={(e) => setOrgData({ ...orgData, industry: e.target.value })}
                    >
                      <MenuItem value="Information Technology">Information Technology</MenuItem>
                      <MenuItem value="Financial Services">Financial Services</MenuItem>
                      <MenuItem value="Healthcare & Life Sciences">Healthcare & Life Sciences</MenuItem>
                      <MenuItem value="E-Commerce & Retail">E-Commerce & Retail</MenuItem>
                    </Select>
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.75 }}>
                      Company Size
                    </Typography>
                    <Select
                      fullWidth
                      size="small"
                      value={orgData.size}
                      onChange={(e) => setOrgData({ ...orgData, size: e.target.value })}
                    >
                      <MenuItem value="1 - 50 employees">1 - 50 employees</MenuItem>
                      <MenuItem value="51 - 200 employees">51 - 200 employees</MenuItem>
                      <MenuItem value="201 - 500 employees">201 - 500 employees</MenuItem>
                      <MenuItem value="500+ employees">500+ employees</MenuItem>
                    </Select>
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.75 }}>
                      Website
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={orgData.website}
                      onChange={(e) => setOrgData({ ...orgData, website: e.target.value })}
                    />
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.75 }}>
                      Phone
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={orgData.phone}
                      onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })}
                    />
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.75 }}>
                      Email
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={orgData.email}
                      onChange={(e) => setOrgData({ ...orgData, email: e.target.value })}
                    />
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.75 }}>
                      Address
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                      value={orgData.address}
                      onChange={(e) => setOrgData({ ...orgData, address: e.target.value })}
                    />
                  </Box>
                </Stack>
              </Card>

              {/* Card 2: Time Zone & Regional Settings */}
              <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827', fontSize: '1rem', mb: 0.5 }}>
                  Time Zone & Regional Settings
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12.5, display: 'block', mb: 2.5 }}>
                  Set time zone, date format and regional preferences.
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.75 }}>
                      Time Zone
                    </Typography>
                    <Select
                      fullWidth
                      size="small"
                      value={orgData.timeZone}
                      onChange={(e) => setOrgData({ ...orgData, timeZone: e.target.value })}
                    >
                      <MenuItem value="(GMT+05:30) Asia/Kolkata">(GMT+05:30) Asia/Kolkata</MenuItem>
                      <MenuItem value="(GMT+00:00) UTC">(GMT+00:00) UTC</MenuItem>
                      <MenuItem value="(GMT-05:00) Eastern Time (US & Canada)">(GMT-05:00) Eastern Time (US & Canada)</MenuItem>
                      <MenuItem value="(GMT-08:00) Pacific Time (US & Canada)">(GMT-08:00) Pacific Time (US & Canada)</MenuItem>
                    </Select>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.75 }}>
                      Date Format
                    </Typography>
                    <Select
                      fullWidth
                      size="small"
                      value={orgData.dateFormat}
                      onChange={(e) => setOrgData({ ...orgData, dateFormat: e.target.value })}
                    >
                      <MenuItem value="DD MMM YYYY (21 Oct 2025)">DD MMM YYYY (21 Oct 2025)</MenuItem>
                      <MenuItem value="MM/DD/YYYY (10/21/2025)">MM/DD/YYYY (10/21/2025)</MenuItem>
                      <MenuItem value="YYYY-MM-DD (2025-10-21)">YYYY-MM-DD (2025-10-21)</MenuItem>
                    </Select>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.75 }}>
                      Time Format
                    </Typography>
                    <Select
                      fullWidth
                      size="small"
                      value={orgData.timeFormat}
                      onChange={(e) => setOrgData({ ...orgData, timeFormat: e.target.value })}
                    >
                      <MenuItem value="12-Hour (AM/PM)">12-Hour (AM/PM)</MenuItem>
                      <MenuItem value="24-Hour">24-Hour</MenuItem>
                    </Select>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.75 }}>
                      Default Language
                    </Typography>
                    <Select
                      fullWidth
                      size="small"
                      value={orgData.language}
                      onChange={(e) => setOrgData({ ...orgData, language: e.target.value })}
                    >
                      <MenuItem value="English">English</MenuItem>
                      <MenuItem value="Spanish">Spanish</MenuItem>
                      <MenuItem value="German">German</MenuItem>
                      <MenuItem value="French">French</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </Card>

              {/* Action Buttons */}
              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 600, borderRadius: '8px', height: 40, minHeight: 40, px: 2.5, whiteSpace: 'nowrap', textTransform: 'none', '&:hover': { bgcolor: '#430bc2' } }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  sx={{ borderColor: '#E2E8F0', color: '#334155', bgcolor: '#FFFFFF', fontWeight: 600, borderRadius: '8px', height: 40, minHeight: 40, px: 2, whiteSpace: 'nowrap', textTransform: 'none', '&:hover': { borderColor: '#CBD5E1', bgcolor: '#F8FAFC' } }}
                >
                  Discard Changes
                </Button>
              </Stack>
            </Stack>
          )}

          {/* ========================================================================= */}
          {/* 2. BRANDING & APPEARANCE                                                 */}
          {/* ========================================================================= */}
          {activeSection === 'branding' && (
            <Stack spacing={2.5}>
              {/* Hidden real file inputs */}
              <input
                ref={logoInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                style={{ display: 'none' }}
                onChange={handleLogoFileUpload}
              />
              <input
                ref={faviconInputRef}
                type="file"
                accept="image/x-icon,image/png,image/svg+xml"
                style={{ display: 'none' }}
                onChange={handleFaviconUpload}
              />

              {/* Card 1: Company Identity */}
              <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827', fontSize: '1rem', mb: 0.5 }}>
                  Company Identity
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12.5, display: 'block', mb: 2 }}>
                  Update your organization name across the header, logos, and recruitment portals.
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.75 }}>
                  Company Name *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                  placeholder="e.g. Acme Technologies"
                />
              </Card>

              {/* Card 2: Brand Assets */}
              <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827', fontSize: '1rem', mb: 0.5 }}>
                  Brand Assets & Logo
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12.5, display: 'block', mb: 2 }}>
                  Upload custom company logo or choose from verified enterprise presets.
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ p: 2, border: '1px solid #E5E7EB', borderRadius: '12px', bgcolor: '#F9FAFB' }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 1 }}>
                        Company Logo
                      </Typography>
                      <Box
                        sx={{
                          height: 70,
                          bgcolor: '#FFF',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1.5,
                          px: 2
                        }}
                      >
                        {companyLogo ? (
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Box
                              component="img"
                              src={companyLogo}
                              alt="Logo Preview"
                              sx={{ width: 44, height: 44, objectFit: 'contain', borderRadius: '8px' }}
                            />
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>
                                {companyName}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 600, fontSize: 11 }}>
                                ● Active Custom Logo
                              </Typography>
                            </Box>
                          </Stack>
                        ) : (
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Box
                              sx={{
                                width: 36,
                                height: 36,
                                borderRadius: '8px',
                                bgcolor: primaryColor,
                                color: '#FFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: 14
                              }}
                            >
                              {companyName ? companyName.substring(0, 2).toUpperCase() : 'TU'}
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>
                                {companyName}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 11 }}>
                                Brand Monogram
                              </Typography>
                            </Box>
                          </Stack>
                        )}
                      </Box>
                      <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => logoInputRef.current?.click()}
                          sx={{
                            fontSize: 12,
                            textTransform: 'none',
                            bgcolor: primaryColor,
                            color: '#FFF',
                            '&:hover': { bgcolor: primaryColor }
                          }}
                        >
                          Upload Logo
                        </Button>
                        {companyLogo && (
                          <Button
                            size="small"
                            onClick={handleRemoveLogo}
                            sx={{ fontSize: 12, textTransform: 'none', color: '#EF4444' }}
                          >
                            Remove
                          </Button>
                        )}
                      </Stack>
                      <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11, display: 'block', mb: 1.5 }}>
                        PNG, JPG, SVG, WebP (Max 2 MB)
                      </Typography>

                      <Divider sx={{ my: 1 }} />
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#4B5563', display: 'block', mb: 1 }}>
                        Or Choose an Enterprise Preset:
                      </Typography>
                      <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
                        {PRESET_LOGOS.map((preset) => (
                          <Chip
                            key={preset.id}
                            clickable
                            onClick={() => handleSelectPresetLogo(preset)}
                            avatar={<Avatar src={preset.dataUri} sx={{ width: 20, height: 20 }} />}
                            label={preset.name}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: 11.5,
                              borderColor: companyLogo === preset.dataUri ? primaryColor : '#E5E7EB',
                              bgcolor: companyLogo === preset.dataUri ? `${primaryColor}15` : '#FFF',
                              fontWeight: companyLogo === preset.dataUri ? 700 : 500
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ p: 2, border: '1px solid #E5E7EB', borderRadius: '12px', bgcolor: '#F9FAFB' }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 1 }}>
                        Favicon
                      </Typography>
                      <Box
                        sx={{
                          height: 70,
                          bgcolor: '#FFF',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1.5
                        }}
                      >
                        {favicon ? (
                          <Box component="img" src={favicon} alt="Favicon" sx={{ width: 32, height: 32, objectFit: 'contain' }} />
                        ) : companyLogo ? (
                          <Box component="img" src={companyLogo} alt="Favicon" sx={{ width: 32, height: 32, objectFit: 'contain' }} />
                        ) : (
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '6px',
                              bgcolor: primaryColor,
                              color: '#FFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: 13.5
                            }}
                          >
                            {companyName ? companyName.substring(0, 2).toUpperCase() : 'TU'}
                          </Box>
                        )}
                      </Box>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => faviconInputRef.current?.click()}
                          sx={{ fontSize: 12, textTransform: 'none', borderColor: '#D1D5DB' }}
                        >
                          Change Favicon
                        </Button>
                        {favicon && (
                          <Button
                            size="small"
                            onClick={() => {
                              setFaviconState(null);
                              updateBrand({ favicon: null });
                              setSnackbar({ open: true, message: 'Favicon removed', severity: 'info' });
                            }}
                            sx={{ fontSize: 12, textTransform: 'none', color: '#EF4444' }}
                          >
                            Remove
                          </Button>
                        )}
                      </Stack>
                      <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11, display: 'block' }}>
                        ICO, PNG, SVG (Max 512 KB)
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Card>

              {/* Card 3: Theme Colors & Mode */}
              <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827', fontSize: '1rem', mb: 1 }}>
                  Theme Colors & Appearance
                </Typography>

                {/* Theme Mode Switch */}
                <Box
                  sx={{
                    p: 1.5,
                    mb: 2.5,
                    bgcolor: '#F8FAFC',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827' }}>
                      Portal Appearance Mode
                    </Typography>
                    <Chip
                      label={themeMode === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                      size="small"
                      sx={{
                        bgcolor: themeMode === 'dark' ? '#1E293B' : '#E0F2FE',
                        color: themeMode === 'dark' ? '#F8FAFC' : '#0369A1',
                        fontWeight: 700,
                        fontSize: 11.5
                      }}
                    />
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 600 }}>Light</Typography>
                    <Switch
                      checked={themeMode === 'dark'}
                      onChange={(e) => {
                        const newMode = e.target.checked ? 'dark' : 'light';
                        setThemeModeState(newMode);
                        updateBrand({ themeMode: newMode });
                        setSnackbar({ open: true, message: `Switched to ${newMode} mode!`, severity: 'success' });
                      }}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: primaryColor },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: primaryColor }
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 600 }}>Dark</Typography>
                  </Stack>
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.75 }}>
                      Primary Brand Color
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => {
                          setPrimaryColor(e.target.value);
                          updateBrand({ primaryColor: e.target.value });
                        }}
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 8,
                          border: '1px solid #E5E7EB',
                          cursor: 'pointer',
                          padding: 2,
                          backgroundColor: '#FFF'
                        }}
                      />
                      <TextField
                        size="small"
                        value={primaryColor}
                        onChange={(e) => {
                          setPrimaryColor(e.target.value);
                          updateBrand({ primaryColor: e.target.value });
                        }}
                        sx={{ width: 120 }}
                      />
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.75 }}>
                      Secondary Background Tint
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => {
                          setSecondaryColor(e.target.value);
                          updateBrand({ secondaryColor: e.target.value });
                        }}
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 8,
                          border: '1px solid #E5E7EB',
                          cursor: 'pointer',
                          padding: 2,
                          backgroundColor: '#FFF'
                        }}
                      />
                      <TextField
                        size="small"
                        value={secondaryColor}
                        onChange={(e) => {
                          setSecondaryColor(e.target.value);
                          updateBrand({ secondaryColor: e.target.value });
                        }}
                        sx={{ width: 120 }}
                      />
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.75 }}>
                      Accent Success Color
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => {
                          setAccentColor(e.target.value);
                          updateBrand({ accentColor: e.target.value });
                        }}
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 8,
                          border: '1px solid #E5E7EB',
                          cursor: 'pointer',
                          padding: 2,
                          backgroundColor: '#FFF'
                        }}
                      />
                      <TextField
                        size="small"
                        value={accentColor}
                        onChange={(e) => {
                          setAccentColor(e.target.value);
                          updateBrand({ accentColor: e.target.value });
                        }}
                        sx={{ width: 120 }}
                      />
                    </Stack>
                  </Grid>
                </Grid>

                <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
                  <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12.5, fontWeight: 600 }}>
                    Preset Themes:
                  </Typography>
                  {colorPresets.map((p) => (
                    <Box
                      key={p.name}
                      title={p.name}
                      onClick={() => {
                        setPrimaryColor(p.primary);
                        setSecondaryColor(p.secondary);
                        setAccentColor(p.accent);
                        updateBrand({ primaryColor: p.primary, secondaryColor: p.secondary, accentColor: p.accent });
                        setSnackbar({ open: true, message: `Applied ${p.name} theme!`, severity: 'success' });
                      }}
                      sx={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        bgcolor: p.primary,
                        cursor: 'pointer',
                        border: primaryColor === p.primary ? '2.5px solid #111827' : '1px solid rgba(0,0,0,0.1)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        transition: 'transform 0.15s ease',
                        '&:hover': { transform: 'scale(1.2)' }
                      }}
                    />
                  ))}
                  <Button size="small" onClick={handleReset} sx={{ textTransform: 'none', color: '#6B7280', fontSize: 12.5, ml: 'auto' }}>
                    Reset to Default
                  </Button>
                </Stack>
              </Card>

              {/* Card 4: Live Preview */}
              <Card sx={{ borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF', overflow: 'hidden' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid #F3F4F6' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827' }}>
                    Live System & Header Preview
                  </Typography>
                </Box>
                <Box sx={{ p: 3, bgcolor: secondaryColor || '#FAF5FF', transition: 'background-color 0.2s ease' }}>
                  <Box sx={{ p: 2.5, bgcolor: '#FFF', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                      <Stack direction="row" spacing={1.2} alignItems="center">
                        {companyLogo ? (
                          <Box component="img" src={companyLogo} alt="Logo" sx={{ width: 28, height: 28, borderRadius: '6px', objectFit: 'contain' }} />
                        ) : (
                          <Box
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: '6px',
                              bgcolor: primaryColor,
                              color: '#FFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 12,
                              fontWeight: 800
                            }}
                          >
                            {companyName ? companyName.substring(0, 2).toUpperCase() : 'TU'}
                          </Box>
                        )}
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827' }}>
                          {companyName}
                        </Typography>
                      </Stack>
                      <Chip
                        label="Admin Portal"
                        size="small"
                        sx={{ bgcolor: secondaryColor, color: primaryColor, fontWeight: 700, fontSize: 11 }}
                      />
                    </Stack>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>
                      {getGreeting()}, Sarah 👋
                    </Typography>
                    <Box sx={{ mt: 1.5, height: 4, borderRadius: 2, bgcolor: primaryColor, width: '40%' }} />
                  </Box>
                </Box>
              </Card>

              {/* Action Buttons */}
              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    bgcolor: primaryColor,
                    color: '#FFF',
                    fontWeight: 600,
                    borderRadius: '8px',
                    height: 40,
                    minHeight: 40,
                    px: 2.5,
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    '&:hover': { bgcolor: primaryColor }
                  }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  sx={{
                    borderColor: '#E2E8F0',
                    color: '#334155',
                    bgcolor: '#FFFFFF',
                    fontWeight: 600,
                    borderRadius: '8px',
                    height: 40,
                    minHeight: 40,
                    px: 2,
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    '&:hover': { borderColor: '#CBD5E1', bgcolor: '#F8FAFC' }
                  }}
                >
                  Discard Changes
                </Button>
              </Stack>
            </Stack>
          )}

          {/* ========================================================================= */}
          {/* 3. USERS & PERMISSIONS                                                   */}
          {/* ========================================================================= */}
          {activeSection === 'users' && (() => {
            const filteredUsers = usersList.filter(
              (u) =>
                (u.name || '').toLowerCase().includes(userSearch.toLowerCase()) ||
                (u.email || '').toLowerCase().includes(userSearch.toLowerCase()) ||
                (u.role || '').toLowerCase().includes(userSearch.toLowerCase())
            );
            const usersPerPage = 8;
            const paginatedUsers = filteredUsers.slice((userPage - 1) * usersPerPage, userPage * usersPerPage);
            const activeUsersCount = usersList.filter((u) => u.status === 'Active').length;
            const pendingInvitesCount = usersList.filter((u) => u.status === 'Pending' || u.status === 'Invited').length;
            const rolesCount = new Set(usersList.map((u) => u.role).filter(Boolean)).size;

            return (
              <Stack spacing={2.5}>
                {/* 4 Mini Stat Cards */}
                <Grid container spacing={2}>
                  {[
                    { label: 'Total Users', count: usersList.length, icon: <TeamOutlined />, color: '#530EF0', bg: 'rgba(83, 14, 240, 0.08)' },
                    { label: 'Active Users', count: activeUsersCount, icon: <CheckCircleFilled />, color: '#10B981', bg: 'rgba(16, 185, 129, 0.08)' },
                    { label: 'Pending Invites', count: pendingInvitesCount, icon: <MailOutlined />, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.08)' },
                    { label: 'User Roles', count: rolesCount, icon: <LockOutlined />, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.08)' }
                  ].map((s, idx) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                      <Card sx={{ p: 2.2, borderRadius: '14px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                            {s.icon}
                          </Box>
                          <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', fontSize: '1.45rem' }}>
                            {s.count}
                          </Typography>
                        </Stack>
                        <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12.5, mt: 0.75, display: 'block' }}>
                          {s.label}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* Users Table Card */}
                <Card sx={{ borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF', overflow: 'hidden' }}>
                  <Box sx={{ p: 2.2, bgcolor: '#FAFAFB', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                      size="small"
                      placeholder="Search users by name, email or role..."
                      value={userSearch}
                      onChange={(e) => {
                        setUserSearch(e.target.value);
                        setUserPage(1);
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchOutlined style={{ color: '#9CA3AF' }} />
                          </InputAdornment>
                        )
                      }}
                      sx={{ width: { xs: '100%', sm: 320 }, bgcolor: '#FFF', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />

                    <Button
                      variant="contained"
                      startIcon={<PlusOutlined />}
                      onClick={() => setOpenInviteDialog(true)}
                      sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 600, borderRadius: '10px', textTransform: 'none', px: 2.2, '&:hover': { bgcolor: '#430bc2' } }}
                    >
                      Invite User
                    </Button>
                  </Box>

                  <TableContainer>
                    <Table size="medium">
                      <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                        <TableRow>
                          <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Name</TableCell>
                          <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Email</TableCell>
                          <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Role</TableCell>
                          <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Status</TableCell>
                          <TableCell align="right" sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {paginatedUsers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 5, color: '#6B7280' }}>
                              No workspace users found. Click Invite User to add a team member.
                            </TableCell>
                          </TableRow>
                        ) : (
                          paginatedUsers.map((user) => (
                            <TableRow key={user.id} hover>
                              <TableCell>
                                <Stack direction="row" spacing={1.5} alignItems="center">
                                  <Avatar src={user.avatar} sx={{ width: 34, height: 34 }} />
                                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13.5 }}>
                                    {user.name}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" sx={{ color: '#6B7280', fontSize: 13.5 }}>{user.email}</Typography>
                              </TableCell>
                              <TableCell>
                                <Chip label={user.role} size="small" sx={{ fontSize: 12, height: 24, bgcolor: '#F3F4F6', color: '#374151' }} />
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={user.status}
                                  size="small"
                                  sx={{
                                    fontSize: 12,
                                    height: 24,
                                    fontWeight: 600,
                                    bgcolor: user.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: user.status === 'Active' ? '#10B981' : '#EF4444'
                                  }}
                                />
                              </TableCell>
                              <TableCell align="right">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    setUserMenuAnchor(e.currentTarget);
                                    setUserMenuTarget(user);
                                  }}
                                >
                                  <MoreOutlined style={{ color: '#9CA3AF' }} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box sx={{ p: 2, borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: '#6B7280' }}>
                      Showing {filteredUsers.length === 0 ? 0 : (userPage - 1) * usersPerPage + 1}-{Math.min(userPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
                    </Typography>
                    <Pagination
                      count={Math.max(1, Math.ceil(filteredUsers.length / usersPerPage))}
                      page={userPage}
                      onChange={(e, val) => setUserPage(val)}
                      size="small"
                      sx={{ '& .Mui-selected': { bgcolor: '#530EF0 !important', color: '#FFF' } }}
                    />
                  </Box>
                </Card>

                <Menu anchorEl={userMenuAnchor} open={Boolean(userMenuAnchor)} onClose={() => setUserMenuAnchor(null)}>
                  <MenuItem
                    onClick={() => {
                      const target = userMenuTarget;
                      setUserMenuAnchor(null);
                      if (target) handleUpdateUser(target.id, { status: target.status === 'Active' ? 'Inactive' : 'Active' });
                    }}
                  >
                    {userMenuTarget?.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                  </MenuItem>
                  {['Admin', 'HR Manager', 'Recruiter', 'Hiring Manager', 'Interviewer', 'Viewer'].map((roleOpt) => (
                    <MenuItem
                      key={roleOpt}
                      selected={userMenuTarget?.role === roleOpt}
                      onClick={() => {
                        const target = userMenuTarget;
                        setUserMenuAnchor(null);
                        if (target) handleUpdateUser(target.id, { role: roleOpt });
                      }}
                    >
                      Set Role: {roleOpt}
                    </MenuItem>
                  ))}
                  <MenuItem
                    onClick={() => {
                      const target = userMenuTarget;
                      setUserMenuAnchor(null);
                      if (target) handleDeleteUser(target.id);
                    }}
                    sx={{ color: '#EF4444' }}
                  >
                    Remove User
                  </MenuItem>
                </Menu>
              </Stack>
            );
          })()}

          {/* ========================================================================= */}
          {/* 4. WORKFLOW SETTINGS                                                     */}
          {/* ========================================================================= */}
          {activeSection === 'workflow' && (
            <Stack spacing={2.5}>
              {/* Application Workflow Stages */}
              <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827', fontSize: '1rem' }}>
                      Application Workflow
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12.5 }}>
                      Customize the hiring stages for job applications.
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<PlusOutlined />}
                    onClick={() => setOpenAddStageDialog(true)}
                    sx={{ borderColor: '#530EF0', color: '#530EF0', fontWeight: 600, textTransform: 'none', borderRadius: '8px' }}
                  >
                    + Add Stage
                  </Button>
                </Stack>

                <Stack spacing={1.2}>
                  {stages.map((stage, idx) => (
                    <Box
                      key={stage.id}
                      sx={{
                        p: 1.5,
                        px: 2,
                        borderRadius: '12px',
                        border: '1px solid #F3F4F6',
                        bgcolor: '#FAFAFB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <HolderOutlined style={{ color: '#9CA3AF', cursor: 'grab' }} />
                        <Box
                          sx={{
                            width: 26,
                            height: 26,
                            borderRadius: '50%',
                            bgcolor: '#FFF',
                            border: `2px solid ${stage.color}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            fontWeight: 700,
                            color: stage.color
                          }}
                        >
                          {idx + 1}
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5 }}>
                            {stage.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12 }}>
                            {stage.desc}
                          </Typography>
                        </Box>
                      </Stack>
                      <IconButton size="small" onClick={() => setSnackbar({ open: true, message: 'Pipeline stage options opened', severity: 'info' })}><MoreOutlined style={{ color: '#9CA3AF' }} /></IconButton>
                    </Box>
                  ))}
                </Stack>
              </Card>

              {/* Stage Settings */}
              <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827', fontSize: '1rem', mb: 0.5 }}>
                  Stage Settings
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12.5, display: 'block', mb: 2 }}>
                  Automation and notification rules for stages.
                </Typography>

                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', fontSize: 13.5 }}>
                        Auto move to next stage
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12 }}>
                        Automatically promote candidates once evaluations are completed.
                      </Typography>
                    </Box>
                    <Switch
                      size="small"
                      checked={stageAutomations.autoMove}
                      onChange={(e) => setStageAutomations({ ...stageAutomations, autoMove: e.target.checked })}
                      sx={{ '& .Mui-checked': { color: '#530EF0' } }}
                    />
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', fontSize: 13.5 }}>
                        Send email notification to hiring team
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12 }}>
                        Alert recruiters when candidate stage changes.
                      </Typography>
                    </Box>
                    <Switch
                      size="small"
                      checked={stageAutomations.notifyTeam}
                      onChange={(e) => setStageAutomations({ ...stageAutomations, notifyTeam: e.target.checked })}
                      sx={{ '& .Mui-checked': { color: '#530EF0' } }}
                    />
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', fontSize: 13.5 }}>
                        Allow stage-wise comments
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12 }}>
                        Enable interviewers to leave stage specific notes.
                      </Typography>
                    </Box>
                    <Switch
                      size="small"
                      checked={stageAutomations.allowComments}
                      onChange={(e) => setStageAutomations({ ...stageAutomations, allowComments: e.target.checked })}
                      sx={{ '& .Mui-checked': { color: '#530EF0' } }}
                    />
                  </Stack>
                </Stack>
              </Card>

              {/* Action Buttons */}
              <Stack direction="row" spacing={1.5}>
                <Button variant="contained" onClick={handleSave} sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 600, borderRadius: '8px', height: 40, minHeight: 40, px: 2.5, whiteSpace: 'nowrap', textTransform: 'none', '&:hover': { bgcolor: '#430bc2' } }}>Save Changes</Button>
                <Button variant="outlined" onClick={handleReset} sx={{ borderColor: '#E2E8F0', color: '#334155', bgcolor: '#FFFFFF', fontWeight: 600, borderRadius: '8px', height: 40, minHeight: 40, px: 2, whiteSpace: 'nowrap', textTransform: 'none', '&:hover': { borderColor: '#CBD5E1', bgcolor: '#F8FAFC' } }}>Discard Changes</Button>
              </Stack>
            </Stack>
          )}

          {/* ========================================================================= */}
          {/* 5. TEMPLATES & PREFERENCES                                               */}
          {/* ========================================================================= */}
          {activeSection === 'templates' && (
            <Stack spacing={2.5}>
              <Card sx={{ borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF', overflow: 'hidden' }}>
                {/* Subtabs */}
                <Box sx={{ px: 2.5, borderBottom: '1px solid #F3F4F6' }}>
                  <Tabs
                    value={templateSubTab}
                    onChange={(e, v) => setTemplateSubTab(v)}
                    sx={{
                      '& .MuiTabs-indicator': { bgcolor: '#530EF0', height: 3 },
                      '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: 13.5, color: '#6B7280', '&.Mui-selected': { color: '#530EF0' } }
                    }}
                  >
                    <Tab label="Email Templates" />
                    <Tab label="Notification Settings" />
                    <Tab label="Application Preferences" />
                  </Tabs>
                </Box>

                {/* Subtab 0: Email Templates Split View */}
                {templateSubTab === 0 && (
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: 460 }}>
                    {/* Left List of Templates */}
                    <Box sx={{ width: { xs: '100%', md: 260 }, borderRight: { md: '1px solid #F3F4F6' }, p: 2 }}>
                      <Stack spacing={0.5}>
                        {[
                          { id: 'invitation', name: 'Invitation to Apply' },
                          { id: 'received', name: 'Application Received' },
                          { id: 'interview', name: 'Interview Invitation' },
                          { id: 'feedback', name: 'Interview Feedback' },
                          { id: 'offer', name: 'Offer Letter' },
                          { id: 'rejection', name: 'Rejection Email' },
                          { id: 'welcome', name: 'Welcome Email' }
                        ].map((tpl) => {
                          const isSel = selectedTemplate === tpl.id;
                          return (
                            <Box
                              key={tpl.id}
                              onClick={() => setSelectedTemplate(tpl.id)}
                              sx={{
                                p: 1.2,
                                borderRadius: '8px',
                                cursor: 'pointer',
                                bgcolor: isSel ? 'rgba(83, 14, 240, 0.08)' : 'transparent',
                                color: isSel ? '#530EF0' : '#374151',
                                fontWeight: isSel ? 700 : 500,
                                fontSize: 13.5
                              }}
                            >
                              {tpl.name}
                            </Box>
                          );
                        })}
                      </Stack>
                    </Box>

                    {/* Right Editor Area */}
                    <Box sx={{ flex: 1, p: 3 }}>
                      <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16, mb: 0.5 }}>
                        Invitation to Apply
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12.5, display: 'block', mb: 2 }}>
                        Email sent to candidates when inviting them to apply.
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.5 }}>Subject *</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          value={templateContent.subject}
                          onChange={(e) => setTemplateContent({ ...templateContent, subject: e.target.value })}
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 0.5 }}>Email Content *</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          multiline
                          rows={8}
                          value={templateContent.body}
                          onChange={(e) => setTemplateContent({ ...templateContent, body: e.target.value })}
                        />
                      </Box>

                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#374151', display: 'block', mb: 1 }}>
                        Available Variables:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
                        {['{{candidate_name}}', '{{job_title}}', '{{company_name}}', '{{job_description_link}}'].map((v) => (
                          <Chip
                            key={v}
                            label={v}
                            size="small"
                            onClick={() => setTemplateContent({ ...templateContent, body: templateContent.body + ` ${v}` })}
                            sx={{ cursor: 'pointer', fontSize: 11.5, bgcolor: '#F3F4F6' }}
                          />
                        ))}
                      </Stack>

                      <Button
                        variant="outlined"
                        startIcon={<EyeOutlined />}
                        onClick={() => setOpenPreviewDialog(true)}
                        sx={{ borderColor: '#530EF0', color: '#530EF0', textTransform: 'none', borderRadius: '8px' }}
                      >
                        Preview Email
                      </Button>
                    </Box>
                  </Box>
                )}

                {/* Subtab 1 & 2 */}
                {templateSubTab !== 0 && (
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                      Configure global defaults and delivery rules for {templateSubTab === 1 ? 'notifications' : 'application preferences'}.
                    </Typography>
                  </Box>
                )}
              </Card>

              {/* Action Buttons */}
              <Stack direction="row" spacing={1.5}>
                <Button variant="contained" onClick={handleSave} sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 600, borderRadius: '8px', height: 40, minHeight: 40, px: 2.5, whiteSpace: 'nowrap', textTransform: 'none', '&:hover': { bgcolor: '#430bc2' } }}>Save Changes</Button>
                <Button variant="outlined" onClick={handleReset} sx={{ borderColor: '#E2E8F0', color: '#334155', bgcolor: '#FFFFFF', fontWeight: 600, borderRadius: '8px', height: 40, minHeight: 40, px: 2, whiteSpace: 'nowrap', textTransform: 'none', '&:hover': { borderColor: '#CBD5E1', bgcolor: '#F8FAFC' } }}>Discard Changes</Button>
              </Stack>
            </Stack>
          )}

          {/* ========================================================================= */}
          {/* 6. INTEGRATIONS                                                          */}
          {/* ========================================================================= */}
          {activeSection === 'integrations' && (
            <Stack spacing={2.5}>
              {/* Category Filter Chips */}
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {['All', 'ATS & HR Tools', 'Job Boards', 'Communication', 'Calendar'].map((cat) => (
                  <Chip
                    key={cat}
                    label={cat === 'All' ? 'All Integrations' : cat}
                    onClick={() => setIntegrationFilter(cat)}
                    sx={{
                      cursor: 'pointer',
                      bgcolor: integrationFilter === cat ? '#530EF0' : '#FFF',
                      color: integrationFilter === cat ? '#FFF' : '#4B5563',
                      border: '1px solid #E5E7EB',
                      fontWeight: 600,
                      fontSize: 13
                    }}
                  />
                ))}
              </Stack>

              {/* Integration List */}
              <Stack spacing={1.5}>
                {integrationsList
                  .filter((item) => integrationFilter === 'All' || item.category === integrationFilter)
                  .map((item) => (
                    <Card
                      key={item.id}
                      sx={{
                        p: 2.2,
                        borderRadius: '14px',
                        border: '1px solid #F3F4F6',
                        bgcolor: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        flexWrap: { xs: 'wrap', sm: 'nowrap' }
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: '10px',
                            bgcolor: item.connected ? 'rgba(83, 14, 240, 0.08)' : '#F3F4F6',
                            color: item.connected ? '#530EF0' : '#6B7280',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 20
                          }}
                        >
                          {item.icon === 'linkedin' && <LinkedinFilled style={{ color: '#0A66C2' }} />}
                          {item.icon === 'slack' && <SlackOutlined style={{ color: '#E01E5A' }} />}
                          {item.icon !== 'linkedin' && item.icon !== 'slack' && <ApiOutlined />}
                        </Box>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 700, color: '#111827', fontSize: 13.5 }}>
                            {item.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12.5 }}>
                            {item.desc}
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Chip
                          label={item.connected ? 'Connected' : 'Disconnected'}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            fontSize: 12,
                            bgcolor: item.connected ? 'rgba(16, 185, 129, 0.1)' : '#F3F4F6',
                            color: item.connected ? '#10B981' : '#6B7280'
                          }}
                        />
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            const updated = integrationsList.map((i) => (i.id === item.id ? { ...i, connected: !i.connected } : i));
                            setIntegrationsList(updated);
                            setSnackbar({ open: true, message: `${item.name} status updated`, severity: 'info' });
                          }}
                          sx={{ textTransform: 'none', borderRadius: '8px', borderColor: '#E5E7EB', color: '#374151', fontSize: 12.5 }}
                        >
                          Configure
                        </Button>
                      </Stack>
                    </Card>
                  ))}
              </Stack>
            </Stack>
          )}

          {/* ========================================================================= */}
          {/* 7. SECURITY & DATA MANAGEMENT                                            */}
          {/* ========================================================================= */}
          {activeSection === 'security' && (
            <Stack spacing={2.5}>
              <Grid container spacing={2.5}>
                {/* Card 1: Password Policy */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF', height: '100%' }}>
                    <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16, mb: 0.5 }}>
                      Password Policy
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, display: 'block', mb: 2 }}>
                      Enforce complex credential standards for employees.
                    </Typography>

                    <Stack spacing={1.5}>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12, display: 'block', mb: 0.5 }}>
                          Minimum password length
                        </Typography>
                        <Select
                          fullWidth
                          size="small"
                          value={securitySettings.pwdLength}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, pwdLength: e.target.value })}
                        >
                          <MenuItem value="8 characters">8 characters</MenuItem>
                          <MenuItem value="10 characters">10 characters</MenuItem>
                          <MenuItem value="12 characters">12 characters</MenuItem>
                        </Select>
                      </Box>

                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" sx={{ color: '#374151', fontSize: 12.5 }}>Require uppercase letters</Typography>
                        <Switch
                          size="small"
                          checked={securitySettings.reqUpper}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, reqUpper: e.target.checked })}
                          sx={{ '& .Mui-checked': { color: '#530EF0' } }}
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" sx={{ color: '#374151', fontSize: 12.5 }}>Require lowercase letters</Typography>
                        <Switch
                          size="small"
                          checked={securitySettings.reqLower}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, reqLower: e.target.checked })}
                          sx={{ '& .Mui-checked': { color: '#530EF0' } }}
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" sx={{ color: '#374151', fontSize: 12.5 }}>Require numbers</Typography>
                        <Switch
                          size="small"
                          checked={securitySettings.reqNumbers}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, reqNumbers: e.target.checked })}
                          sx={{ '& .Mui-checked': { color: '#530EF0' } }}
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" sx={{ color: '#374151', fontSize: 12.5 }}>Require special characters</Typography>
                        <Switch
                          size="small"
                          checked={securitySettings.reqSpecial}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, reqSpecial: e.target.checked })}
                          sx={{ '& .Mui-checked': { color: '#530EF0' } }}
                        />
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>

                {/* Card 2: Session Management */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF', height: '100%' }}>
                    <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16, mb: 0.5 }}>
                      Session Management
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, display: 'block', mb: 2 }}>
                      Idle timeout and concurrent access policies.
                    </Typography>

                    <Stack spacing={1.5}>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12, display: 'block', mb: 0.5 }}>
                          Session timeout
                        </Typography>
                        <Select
                          fullWidth
                          size="small"
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                        >
                          <MenuItem value="30 minutes">30 minutes</MenuItem>
                          <MenuItem value="60 minutes">60 minutes</MenuItem>
                          <MenuItem value="120 minutes">120 minutes</MenuItem>
                        </Select>
                      </Box>

                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" sx={{ color: '#374151', fontSize: 12.5 }}>Allow multiple active sessions</Typography>
                        <Switch
                          size="small"
                          checked={securitySettings.multiSession}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, multiSession: e.target.checked })}
                          sx={{ '& .Mui-checked': { color: '#530EF0' } }}
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" sx={{ color: '#374151', fontSize: 12.5 }}>Notify on new device login</Typography>
                        <Switch
                          size="small"
                          checked={securitySettings.newDeviceNotify}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, newDeviceNotify: e.target.checked })}
                          sx={{ '& .Mui-checked': { color: '#530EF0' } }}
                        />
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>

                {/* Card 3: Data Retention */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF', height: '100%' }}>
                    <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16, mb: 0.5 }}>
                      Data Retention
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, display: 'block', mb: 2 }}>
                      Compliance duration for candidate data.
                    </Typography>

                    <Stack spacing={1.5}>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#4B5563', fontSize: 12, display: 'block', mb: 0.5 }}>
                          Retain candidate data for
                        </Typography>
                        <Select
                          fullWidth
                          size="small"
                          value={securitySettings.candRetention}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, candRetention: e.target.value })}
                        >
                          <MenuItem value="1 year">1 year</MenuItem>
                          <MenuItem value="2 years">2 years</MenuItem>
                          <MenuItem value="5 years">5 years</MenuItem>
                        </Select>
                      </Box>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" sx={{ color: '#374151', fontSize: 12.5 }}>Anonymize data after retention period</Typography>
                        <Switch
                          size="small"
                          checked={securitySettings.anonymizeData}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, anonymizeData: e.target.checked })}
                          sx={{ '& .Mui-checked': { color: '#530EF0' } }}
                        />
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>

                {/* Card 4: Data Export & Deletion */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF', height: '100%' }}>
                    <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827', fontSize: 16, mb: 0.5 }}>
                      Data Export & Deletion
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, display: 'block', mb: 2 }}>
                      GDPR and privacy export controls.
                    </Typography>

                    <Stack spacing={1.5}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" sx={{ color: '#374151', fontSize: 12.5 }}>Allow data export for admins</Typography>
                        <Switch
                          size="small"
                          checked={securitySettings.allowExport}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, allowExport: e.target.checked })}
                          sx={{ '& .Mui-checked': { color: '#530EF0' } }}
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" sx={{ color: '#374151', fontSize: 12.5 }}>Allow account deletion</Typography>
                        <Switch
                          size="small"
                          checked={securitySettings.allowDeletion}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, allowDeletion: e.target.checked })}
                          sx={{ '& .Mui-checked': { color: '#530EF0' } }}
                        />
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Stack direction="row" spacing={1.5}>
                <Button variant="contained" onClick={handleSave} sx={{ bgcolor: '#530EF0', color: '#FFF', fontWeight: 600, borderRadius: '8px', height: 40, minHeight: 40, px: 2.5, whiteSpace: 'nowrap', textTransform: 'none', '&:hover': { bgcolor: '#430bc2' } }}>Save Changes</Button>
                <Button variant="outlined" onClick={handleReset} sx={{ borderColor: '#E2E8F0', color: '#334155', bgcolor: '#FFFFFF', fontWeight: 600, borderRadius: '8px', height: 40, minHeight: 40, px: 2, whiteSpace: 'nowrap', textTransform: 'none', '&:hover': { borderColor: '#CBD5E1', bgcolor: '#F8FAFC' } }}>Discard Changes</Button>
              </Stack>
            </Stack>
          )}

          {/* ========================================================================= */}
          {/* 8. AUDIT LOGS                                                            */}
          {/* ========================================================================= */}
          {activeSection === 'audit' && (
            <Stack spacing={2.5}>
              <Card sx={{ borderRadius: '16px', border: '1px solid #F3F4F6', bgcolor: '#FFF', overflow: 'hidden' }}>
                {/* Filter Row */}
                <Box sx={{ p: 2.2, bgcolor: '#FAFAFB', borderBottom: '1px solid #F3F4F6' }}>
                  <Grid container spacing={1.5} alignItems="center">
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Select fullWidth size="small" value={auditDate} onChange={(e) => setAuditDate(e.target.value)} sx={{ bgcolor: '#FFF' }}>
                        <MenuItem value="Oct 1, 2025 - Oct 31, 2025">Oct 1, 2025 - Oct 31, 2025</MenuItem>
                        <MenuItem value="Sep 1, 2025 - Sep 30, 2025">Sep 1, 2025 - Sep 30, 2025</MenuItem>
                      </Select>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 2 }}>
                      <Select fullWidth size="small" value={auditActionFilter} onChange={(e) => setAuditActionFilter(e.target.value)} sx={{ bgcolor: '#FFF' }}>
                        <MenuItem value="All">All Actions</MenuItem>
                        <MenuItem value="Updated Settings">Updated Settings</MenuItem>
                        <MenuItem value="Created Job">Created Job</MenuItem>
                      </Select>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 2 }}>
                      <Select fullWidth size="small" value={auditUserFilter} onChange={(e) => setAuditUserFilter(e.target.value)} sx={{ bgcolor: '#FFF' }}>
                        <MenuItem value="All">All Users</MenuItem>
                        <MenuItem value="Sarah Johnson">Sarah Johnson</MenuItem>
                        <MenuItem value="Rajesh Kumar">Rajesh Kumar</MenuItem>
                      </Select>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Search by user, action or details..."
                        value={auditSearch}
                        onChange={(e) => setAuditSearch(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchOutlined style={{ color: '#9CA3AF' }} />
                            </InputAdornment>
                          )
                        }}
                        sx={{ bgcolor: '#FFF' }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                {/* Audit Logs Table */}
                <TableContainer>
                  <Table size="medium">
                    <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                      <TableRow>
                        <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Date &amp; Time</TableCell>
                        <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>User</TableCell>
                        <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Action</TableCell>
                        <TableCell sx={{ color: '#6B7280', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' }}>Details</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {auditLogs
                        .filter((log) => {
                          const matchesSearch = log.user.toLowerCase().includes(auditSearch.toLowerCase()) || log.details.toLowerCase().includes(auditSearch.toLowerCase()) || log.action.toLowerCase().includes(auditSearch.toLowerCase());
                          const matchesAction = auditActionFilter === 'All' || log.action === auditActionFilter;
                          const matchesUser = auditUserFilter === 'All' || log.user === auditUserFilter;
                          return matchesSearch && matchesAction && matchesUser;
                        })
                        .map((log, idx) => (
                          <TableRow key={idx} hover>
                            <TableCell sx={{ fontSize: 13.5, color: '#6B7280' }}>{log.time}</TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: 13.5 }}>
                                {log.user}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: 11 }}>
                                {log.role}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={log.action}
                                size="small"
                                sx={{
                                  fontSize: 12,
                                  height: 24,
                                  fontWeight: 600,
                                  bgcolor: 'rgba(83, 14, 240, 0.08)',
                                  color: '#530EF0'
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ fontSize: 13.5, color: '#374151' }}>{log.details}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ p: 2, borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: '#6B7280' }}>Showing 1-10 of 124 logs</Typography>
                  <Pagination count={3} size="small" sx={{ '& .Mui-selected': { bgcolor: '#530EF0 !important', color: '#FFF' } }} />
                </Box>
              </Card>
            </Stack>
          )}
        </Box>
      </Box>

      {/* ========================================================================= */}
      {/* DIALOGS                                                                   */}
      {/* ========================================================================= */}
      {/* 1. Invite User Dialog */}
      <Dialog
        open={openInviteDialog}
        onClose={() => {
          setOpenInviteDialog(false);
          setInviteErrors({});
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#111827' }}>
          Invite Team Member
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Full Name *"
              value={newUser.name}
              onChange={(e) => {
                setNewUser({ ...newUser, name: e.target.value });
                if (inviteErrors.name) setInviteErrors({ ...inviteErrors, name: '' });
              }}
              error={Boolean(inviteErrors.name)}
              helperText={inviteErrors.name}
            />
            <TextField
              fullWidth
              size="small"
              type="email"
              label="Email Address *"
              value={newUser.email}
              onChange={(e) => {
                setNewUser({ ...newUser, email: e.target.value });
                if (inviteErrors.email) setInviteErrors({ ...inviteErrors, email: '' });
              }}
              error={Boolean(inviteErrors.email)}
              helperText={inviteErrors.email}
            />
            <Select
              fullWidth
              size="small"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Recruiter">Recruiter</MenuItem>
              <MenuItem value="Hiring Manager">Hiring Manager</MenuItem>
              <MenuItem value="Interviewer">Interviewer</MenuItem>
              <MenuItem value="Viewer">Viewer</MenuItem>
            </Select>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => {
              setOpenInviteDialog(false);
              setInviteErrors({});
            }}
            sx={{ textTransform: 'none', color: '#6B7280' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              const errors = {};
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!newUser.name.trim()) {
                errors.name = 'Full Name is required';
              } else if (newUser.name.trim().length < 5) {
                errors.name = 'Full Name must be at least 5 characters';
              }

              if (!newUser.email.trim()) {
                errors.email = 'Email Address is required';
              } else if (!emailRegex.test(newUser.email.trim())) {
                errors.email = 'Must be a valid email address';
              }

              if (Object.keys(errors).length > 0) {
                setInviteErrors(errors);
                setSnackbar({ open: true, message: 'Please correct the validation errors', severity: 'warning' });
                return;
              }

              const updatedUsers = [...usersList, { id: Date.now(), name: newUser.name.trim(), email: newUser.email.trim(), role: newUser.role, status: 'Active', avatar: avatar4 }];
              setUsersList(updatedUsers);
              try {
                localStorage.setItem('traceu_admin_users', JSON.stringify(updatedUsers));
              } catch (e) {}
              const sentEmail = newUser.email.trim();
              setNewUser({ name: '', email: '', role: 'Recruiter' });
              setInviteErrors({});
              setOpenInviteDialog(false);
              setSnackbar({ open: true, message: `Invitation sent to ${sentEmail}!`, severity: 'success' });
            }}
            sx={{ bgcolor: primaryColor || '#530EF0', color: '#FFF', textTransform: 'none', borderRadius: '8px' }}
          >
            Send Invite
          </Button>
        </DialogActions>
      </Dialog>

      {/* 2. Add Stage Dialog */}
      <Dialog
        open={openAddStageDialog}
        onClose={() => {
          setOpenAddStageDialog(false);
          setStageError('');
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#111827' }}>
          Add Hiring Stage
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            size="small"
            label="Stage Name *"
            placeholder="e.g. Cultural Fit Interview"
            value={newStageName}
            onChange={(e) => {
              setNewStageName(e.target.value);
              if (stageError) setStageError('');
            }}
            error={Boolean(stageError)}
            helperText={stageError}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => {
              setOpenAddStageDialog(false);
              setStageError('');
            }}
            sx={{ textTransform: 'none', color: '#6B7280' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (!newStageName.trim()) {
                setStageError('Stage Name is required');
                setSnackbar({ open: true, message: 'Please enter a stage name', severity: 'warning' });
                return;
              } else if (newStageName.trim().length < 5) {
                setStageError('Stage Name must be at least 5 characters');
                setSnackbar({ open: true, message: 'Stage Name must be at least 5 characters', severity: 'warning' });
                return;
              }
              const updatedStages = [...stages, { id: Date.now(), name: newStageName.trim(), desc: 'Custom stage added by admin', color: primaryColor || '#6366F1' }];
              setStages(updatedStages);
              try {
                localStorage.setItem('traceu_admin_workflow', JSON.stringify({ stages: updatedStages, stageAutomations }));
              } catch (e) {}
              setNewStageName('');
              setStageError('');
              setOpenAddStageDialog(false);
              setSnackbar({ open: true, message: `New stage "${newStageName.trim()}" added to workflow!`, severity: 'success' });
            }}
            sx={{ bgcolor: primaryColor || '#530EF0', color: '#FFF', textTransform: 'none', borderRadius: '8px' }}
          >
            Add Stage
          </Button>
        </DialogActions>
      </Dialog>

      {/* 3. Email Preview Dialog */}
      <Dialog open={openPreviewDialog} onClose={() => setOpenPreviewDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#111827' }}>
          Email Preview
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2.5, bgcolor: '#F9FAFB', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
            <Typography variant="caption" sx={{ color: '#6B7280', display: 'block', mb: 0.5 }}>
              Subject:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827', mb: 2 }}>
              {templateContent.subject.replace('{{job_title}}', 'Senior Software Engineer').replace('{{company_name}}', companyName)}
            </Typography>

            <Typography variant="caption" sx={{ color: '#6B7280', display: 'block', mb: 0.5 }}>
              Body:
            </Typography>
            <Typography variant="body2" sx={{ color: '#374151', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
              {templateContent.body
                .replace('{{candidate_name}}', 'Alex Morgan')
                .replace(/\{\{job_title\}\}/g, 'Senior Software Engineer')
                .replace(/\{\{company_name\}\}/g, companyName)
                .replace('{{job_description_link}}', 'https://careers.traceu.com/job/0012')}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setOpenPreviewDialog(false)} sx={{ textTransform: 'none', color: '#530EF0' }}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
