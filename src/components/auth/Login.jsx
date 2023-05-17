import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { scrollToTop } from "../../utils/scrollToTop";
import { ROUTES_PATH, URL_API } from "../../consts";

const Login = ({ isLogin, setIsLogin }) => {
	const { register, handleSubmit, reset } = useForm();

	const navigate = useNavigate();

	useEffect(() => {
		isLogin && navigate(ROUTES_PATH.HOME);
		scrollToTop();
	}, []);

	const formSubmit = (data) => {
		const URL = `${URL_API}${ROUTES_PATH.LOGIN}`;

		axios
			.post(URL, data)
			.then((res) => {
				localStorage.setItem("token", res.data?.token);
				setIsLogin(true);
				navigate(ROUTES_PATH.HOME);
			})
			.catch((err) => {
				console.log(err);
			});

		reset({
			email: "",
			password: "",
		});
	};

	return (
		<section className="login">
			<div className="productinfo__return">
				<p className="productinfo__return-home" onClick={() => navigate("/")}>
          Home
				</p>
				<div className="productinfo__return-circle"></div>
				<p className="productinfo__return-product">Login</p>
			</div>

			<h2 className="login__title">
				<i className="fa-solid fa-user"></i>Login
			</h2>
			<article className="login__card">
				<article className="login__form">
					<form className="form" onSubmit={handleSubmit(formSubmit)}>
						<div className="form__email">
							{/* <i className="fa-solid fa-envelope"></i> */}
							<div className="form__input-div">
								<label htmlFor="email">Email<span>*</span></label>
								<input
									type="email"
									className="form__input"
									id="email"
									placeholder="alberto@gmail.com"
									{...register("email")}
									required
								/>
							</div>
						</div>
						<div className="form__password">
							{/* <i className="fa-solid fa-lock"></i> */}
							<div className="form__input-div">
								<label htmlFor="password">Password<span>*</span></label>
								<input
									type="password"
									className="form__input"
									id="password"
									placeholder="***********"
									{...register("password")}
									required
								/>
							</div>
							{/* <i
								className="fa-solid fa-eye-slash"
								onClick={() => setIsVisible(!isVisible)}
							></i> */}
						</div>
						<div className="form__options">
							<div className="form__remember">
								<input type="checkbox" name="remember" id="remember" />
								<label htmlFor="remember">Remember me</label>
							</div>
							<p
								className="form__forgot-password"
								onClick={() => alert("in development...")}
							>
                Forgot password?
							</p>
						</div>
						<button className="form__submit">Login</button>
					</form>
				</article>
			</article>
		</section>
	);
};

export default Login;
