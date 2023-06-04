import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { scrollToTop } from "../../utils/scrollToTop";
import { ROUTES_PATH, URL_API } from "../../consts";
import { toast } from "sonner";
import closeCartSlider from "../../utils/closeCartSlider";

const Login = ({ isLogin }) => {
	const { register, handleSubmit, reset } = useForm();
	const navigate = useNavigate();

	useEffect(() => {
		isLogin && navigate(ROUTES_PATH.HOME);
		closeCartSlider();
		scrollToTop();
	}, []);

	const formSubmit = (data) => {
		const URL = `${URL_API}${ROUTES_PATH.REGISTER}`;

		axios
			.post(URL, data)
			.then(() => {
				toast.success("You are successfully registered");
				navigate(ROUTES_PATH.LOGIN);
				reset({
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					birthday: "",
					phone: "",
				});
			})
			.catch(() => toast.error("Error when trying to register"));
	};

	return (
		<section className="auth">
			<div className="productinfo__return">
				<p className="productinfo__return-home" onClick={() => navigate(ROUTES_PATH.HOME)}>
          Home
				</p>
				<div className="productinfo__return-circle"></div>
				<p className="productinfo__return-product">Sign up</p>
			</div>
			<article className="auth__card">
				<h2 className="register__title"><i className="fa-solid fa-user"></i>Sign up</h2>
				<form className="form" onSubmit={handleSubmit(formSubmit)}>
					{/* First Name */}
					<div className="form__input-div form__firstname">
						<label htmlFor="first_name">First Name<span>*</span></label>
						<input
							type="text"
							className="form__input"
							id="first_name"
							placeholder="Alberto"
							{...register("firstName")}
							required
						/>
					</div>
					{/* Last Name */}
					<div className="form__input-div form__last_name">
						<label htmlFor="last_name">Last Name<span>*</span></label>
						<input
							type="text"
							className="form__input"
							id="last_name"
							placeholder="Lopez"
							{...register("lastName")}
							required
						/>
					</div>
					{/* Email */}
					<div className="form__input-div form__email">
						<label htmlFor="email">Email<span>*</span></label>
						<input
							type="email"
							className="form__input"
							id="email"
							placeholder="alberto@hotmail.com"
							{...register("email")}
							required
						/>
					</div>
					{/* Password */}
					<div className="form__input-div form__password">
						<label htmlFor="password">Password<span>*</span></label>
						<input
							type="password"
							className="form__input"
							id="password"
							placeholder="************"
							{...register("password")}
							required
						/>
					</div>
					{/* Phone Number */}
					<div className="form__input-div form__phone-number">
						<label htmlFor="phone_number">Phone<span>*</span></label>
						<input
							type="tel"
							className="form__input"
							id="phone_number"
							placeholder="+52 XXXXXXXXXX"
							{...register("phone")}
							required
						/>
					</div>
					{/* Birthday */}
					<div className="form__input-div form__birthday">
						<label htmlFor="birthday">Birthday<span>*</span></label>
						<input
							type="date"
							className="form__input birthday"
							id="birthday"
							{...register("birthday")}
							required
						/>
					</div>
					<button className="form__submit">Sign up</button>
				</form>
			</article>
		</section>
	);
};

export default Login;
