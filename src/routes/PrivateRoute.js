import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '../recoil/atoms';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PrivateRoute() {
    const isLoggedIn = useRecoilValue(isLoggedInState);
    const hasAuth = !!localStorage.getItem('auth');
    const location = useLocation();

    console.log(' 현재 위치:', location.pathname);
    console.log(' isLoggedIn:', isLoggedIn);
    console.log(' localStorage auth:', hasAuth);

    return (isLoggedIn || hasAuth) ? <Outlet /> : <Navigate to="/login" replace />;
}