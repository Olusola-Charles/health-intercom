import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const { user, hasAnyRole } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !hasAnyRole(allowedRoles)) {
    return <Navigate to={`/${user.role}/dashboard`} replace />
  }

  return children
}

export default RoleBasedRoute