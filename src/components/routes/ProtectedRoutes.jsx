import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
	const isLogged = localStorage.getItem("token");

	if (isLogged) {
		return <Outlet />;
	} else {
		alert("You need to login to view your purchases");
		return <Navigate to="/login" />;
	}
};

export default ProtectedRoutes;
