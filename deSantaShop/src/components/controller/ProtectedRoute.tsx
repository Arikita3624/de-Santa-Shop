import { Navigate } from 'react-router-dom';
import useAuth from '../Views/Client/Pages/Auth/UseAuth';
import NotFound from './NotFound';



interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <NotFound />;
  }

  return children;
};

export default ProtectedRoute;