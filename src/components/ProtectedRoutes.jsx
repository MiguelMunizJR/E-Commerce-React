import { Navigate, Outlet } from "react-router-dom";
import { ROUTES_PATH } from "../Constants";

const ProtectedRoutes = () => {
	const isLogged = localStorage.getItem("token");

	if (isLogged) {
		return <Outlet />;
	} else {
		alert("You need to login to view your purchases");
		return <Navigate to={ROUTES_PATH.LOGIN} />;
	}
};

export default ProtectedRoutes;
