import { toast } from "sonner";

export const logout = () => {
	localStorage.removeItem("token");
	window.location.reload();
};

export const checkTokenValidity = (userToken) => {
	const token = localStorage.getItem("token");

	//* Comprobamos el token
	if (userToken !== token) {
		toast.error("Token has expirated");
		setTimeout(() => {
			logout();
		}, 3000); //* Delay de 3 segundos
	}
	console.log("Token validado");
	return;
};

export const startTokenCheck = (userToken) => {
	setInterval(() => {
		checkTokenValidity(userToken);
	}, 1 * 10 * 1000); //* Validamos el token cada minuto
};
