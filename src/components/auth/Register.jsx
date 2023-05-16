import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { scrollToTop } from "../../utils/scrollToTop";
import { ROUTES_PATH, URL_API } from "../../Constants";

const Login = ({ isLogin, setIsLogin }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isCorrect, setIsCorrect] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const navigate = useNavigate();

  useEffect(() => {
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
    const URL = `${URL_API}${ROUTES_PATH.REGISTER}`;

    axios
      .post(URL, data)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
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
    alert("Welcome, you can buy products now!");
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
        <p className="productinfo__return-product">Sign up</p>
      </div>

      <article className="login__card">
        <article className={isLogin ? "login__logo-actived" : "login__logo"}>
          <i className="fa-solid fa-user login__icon"></i>
          <h2 className="login__title">Welcome</h2>
          <h3 className="login__subtitle">please sign up to continue</h3>
          <button className="islogin__btn" onClick={logOut}>
            Log out <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </article>
        <article className="login__form">
          <h2 className="form__form-title">Sign up</h2>
          <form className="form" onSubmit={handleSubmit(formSubmit)}>
            <div className="form__input-div form__firstname">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form__input"
                id="first_name"
                placeholder="Alberto"
                {...register("firstName")}
              />
            </div>
            <div className="form__input-div form__last_name">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form__input"
                id="last_name"
                placeholder="Lopez"
                {...register("lastName")}
              />
            </div>
            <div className="form__input-div form__email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form__input"
                id="email"
                placeholder="Input your email"
                {...register("email")}
                required
              />
            </div>
            <div className="form__input-div form__email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form__input"
                id="email"
                placeholder="Input your email"
                {...register("email")}
                required
              />
            </div>
            <div className="form__input-div form__password">
              <label htmlFor="password">Password</label>
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
            <button className="form__submit">Sign up</button>
          </form>
        </article>
      </article>
    </section>
  );
};

export default Login;
