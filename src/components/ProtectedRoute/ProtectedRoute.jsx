import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../utils/authStore";


export default function ProtectedRoute() {
    const { accessToken } = useAuthStore()
    if (!accessToken) return <Navigate  to={'signin'} replace />
    return <Outlet />
}