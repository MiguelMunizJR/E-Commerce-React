import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const isLoginStyle = {
  width: "45rem",
  position: "absolute",
  borderRadius: "1rem",
  zindex: "100",
};

const scrollToTop = () => {
  const container = document.querySelector("*");
  container.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isCorrect, setIsCorrect] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  /* Use Navigate */
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const firstName = localStorage.getItem("first_name");
    const lastName = localStorage.getItem("last_name");
    const loginMessage = document.querySelector(".form__islogin");
    const logOutBtn = document.querySelector(".islogin__btn");

    if (token) {
      setIsLogin(true);
      setFirstName(firstName);
      setLastName(lastName);
    } else {
      setIsLogin(false);
    }

    if (isCorrect === false) {
      loginMessage.style.display = "flex";
    } else {
      if (isLogin) {
        loginMessage.style.display = "none";
        logOutBtn.style.display = "flex";
      }
    }
    scrollToTop();
  }, [isLogin, isCorrect]);

  const formSubmit = (data) => {
    const URL = "https://ecommerce-api-react.herokuapp.com/api/v1/users/login";
    axios
      .post(URL, data)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("first_name", res.data.data.user.firstName);
        localStorage.setItem("last_name", res.data.data.user.lastName);
        setIsCorrect(true);
        setIsLogin(true);
        userLogin();
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
    alert("Welcome!, successful login");
    navigate("/");
  };

  const logOut = () => {
    const logOutBtn = document.querySelector(".islogin__btn");
    setIsLogin(false);
    logOutBtn.style.display = "none";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
          className="login__logo"
          style={isLogin ? isLoginStyle : undefined}
        >
          <i className="fa-solid fa-user"></i>
          <h2 className="login__title">Welcome</h2>
          <h3 className="login__user">
            {isLogin ? `${firstName} ${lastName}` : "Guest_user"}
          </h3>
          <h3 className="login__subtitle">
            {isLogin ? "you are logged in" : "please login to your account"}
          </h3>
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
              <a href="#" className="form__forgot-password">
                Forgot password?
              </a>
            </div>
            <button className="form__submit">LOG IN</button>
          </form>
        </article>
      </article>
    </section>
  );
};

export default Login;
