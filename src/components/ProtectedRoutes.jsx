import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import { ROUTES_PATH } from "../consts";

const ProtectedRoutes = ({ isLogin }) => {

	if (isLogin) {
		return <Outlet />;
	} else {
		toast("You need to login to view your purchases");
		return <Navigate to={ROUTES_PATH.LOGIN} />;
	}
};

export default ProtectedRoutes;
