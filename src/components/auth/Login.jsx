import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {scrollToTop} from "../../utils/scrollToTop";

const Login = ({ setIsLoading, isLogin, setIsLogin }) => {
	const { register, handleSubmit, reset } = useForm();
	const [isCorrect, setIsCorrect] = useState();
	const [isVisible, setIsVisible] = useState(false);
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	/* Use Navigate */
	const navigate = useNavigate();
  
	useEffect(() => {
		setIsLoading(true);
		const token = localStorage.getItem("token");
		const firstName = localStorage.getItem("first_name");
		const lastName = localStorage.getItem("last_name");
		const loginMessage = document.querySelector(".form__islogin");
		const logOutBtn = document.querySelector(".islogin__btn");
		setTimeout(() => setIsLoading(false), 500);
    
		if (isLogin) {
			setFirstName(firstName);
			setLastName(lastName);
		} 

		if (isCorrect === false) {
			loginMessage.style.display = "flex";
		} else {
			if (token) {
				loginMessage.style.display = "none";
				logOutBtn.style.display = "flex";
			}
		}

		scrollToTop();
	}, [isCorrect]);

	const formSubmit = (data) => {
		const URL = "https://ecommerce-api-react.herokuapp.com/api/v1/users/login";
		axios
			.post(URL, data)
			.then((res) => {
				localStorage.setItem("token", res.data.data.token);
				localStorage.setItem("first_name", res.data.data.user.firstName);
				localStorage.setItem("last_name", res.data.data.user.lastName);
				setIsCorrect(true);
				userLogin();
				console.log(res.data);
				setIsLogin(true);
			})
			.catch((err) => {
				console.log(err);
				setIsCorrect(false);
			});

		reset({
			email: "",
			password: "",
		});
	};

	const userLogin = () => {
		alert(
			"Welcome, you can buy products now!"
		);
		navigate("/");
	};

	const logOut = () => {
		const logOutBtn = document.querySelector(".islogin__btn");
		logOutBtn.style.display = "none";
		localStorage.removeItem("token");
		localStorage.removeItem("last_name");
		localStorage.removeItem("first_name");
		setIsLogin(false);
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
			<article className="login__card">
				<article
					className={isLogin ? "login__logo-actived" : "login__logo"}
				>
					<i className="fa-solid fa-user login__icon"></i>
					<h2 className="login__title">Welcome</h2>
					<h3 className="login__user">
						{isLogin ? `${firstName} ${lastName}` : "user1412"}
					</h3>
					<h3 className="login__subtitle">
						{isLogin ? "you are logged in" : "please login to your account"}
					</h3>
					{!isLogin && (
						<div className="login__user-div">
							<p className="login__user-email">Email:</p>
							<p className="login__user-email-value">alpha_user1@gmail.com</p>
							<p className="login__user-password">Password:</p>
							<p className="login__user-password-value">123456</p>
						</div>
					)}
					<button className="islogin__btn" onClick={logOut}>
            Log out <i className="fa-solid fa-arrow-right-from-bracket"></i>
					</button>
				</article>
				<article className="login__form">
					<h2 className="form__form-title">Login</h2>
					<form className="form" onSubmit={handleSubmit(formSubmit)}>
						<div className="form__email">
							<i className="fa-solid fa-envelope"></i>
							<input
								type="email"
								className="form__input"
								id="email"
								placeholder="Input your email"
								{...register("email")}
								required
							/>
						</div>
						<div className="form__password">
							<i className="fa-solid fa-lock"></i>
							<input
								type={isVisible ? "text" : "password"}
								className="form__input"
								id="password"
								placeholder="Input your password"
								{...register("password")}
								required
							/>
							<i
								className="fa-solid fa-eye-slash"
								onClick={() => setIsVisible(!isVisible)}
							></i>
						</div>
						<div className="form__islogin">
							<p className="form__islogin-title">
                Incorrect email or password, please check your credentials.
							</p>
						</div>
						<div className="form__options">
							<div className="form__remember">
								<input type="checkbox" name="remember" id="remember" />
								<label htmlFor="remember">Remember me</label>
							</div>
							<p
								className="form__forgot-password"
								onClick={() => alert("coming soon...")}
							>
                Forgot password?
							</p>
						</div>
						<button className="form__submit">LOG IN</button>
					</form>
				</article>
			</article>
		</section>
	);
};

export default Login;
