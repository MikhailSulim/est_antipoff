import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../redux/store';

function ProtectedRoutes() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" replace />;
}

export default ProtectedRoutes;
