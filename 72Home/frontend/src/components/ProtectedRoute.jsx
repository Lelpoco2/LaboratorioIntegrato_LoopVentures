import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('auth_token');
  
  console.log('ProtectedRoute - Token:', token);
  console.log('ProtectedRoute - Token present:', !!token);
  
  if (!token || token === '' || token === 'null' || token === 'undefined') {
    console.log('ProtectedRoute - Redirecting to /login');
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  console.log('ProtectedRoute - Allowing access');
  return children;
}
