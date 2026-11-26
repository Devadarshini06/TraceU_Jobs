import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { clearAdminSession, getAdminProfile, isAdminAuthenticated, saveAdminSession, getAdminToken } from 'api/adminAuth';

export default function AdminGuard({ children }) {
  const [authorized, setAuthorized] = useState(() => isAdminAuthenticated());

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      setAuthorized(false);
      return;
    }

    let cancelled = false;
    getAdminProfile()
      .then((res) => {
        if (!cancelled && res?.data) {
          saveAdminSession({
            token: getAdminToken(),
            admin: res.data
          });
        }
      })
      .catch((err) => {
        if (!cancelled && err?.status === 401) {
          clearAdminSession();
          setAuthorized(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!authorized) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

AdminGuard.propTypes = {
  children: PropTypes.node.isRequired
};

