import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { scrollToTop } from "../../utils/scrollToTop";
import { ROUTES_PATH, URL_API } from "../../consts";
import { toast } from "sonner";
import closeCartSlider from "../../utils/closeCartSlider";

const Login = ({ isLogin, setIsLogin }) => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    isLogin && navigate(ROUTES_PATH.HOME);
    closeCartSlider();
    scrollToTop();
  }, []);

  const formSubmit = (data) => {
    const { email, password } = data;

    if (email.trim() === "" || password.trim() === "") {
      toast.error("Please enter your email and password");
      return;
    }

    const URL = `${URL_API}${ROUTES_PATH.LOGIN}`;

    axios
      .post(URL, data)
      .then((res) => {
        localStorage.setItem("token", res.data?.token);
        setIsLogin(true);
        toast.success("You are logged in");
        navigate(ROUTES_PATH.HOME);
        reset({
          email: "",
          password: "",
        });
        location.reload();
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          toast.error("Incorrect email or password");
          return;
        }
        toast.error("An unexpected error occurred, try again later.");
      });
  };

  return (
    <section className="auth">
      <article className="auth__card">
        <h2 className="login__title">
          <i className="fa-solid fa-user"></i>Login
        </h2>
        <article className="login__form">
          <form className="form" onSubmit={handleSubmit(formSubmit)}>
            <div className="form__email">
              <div className="form__input-div">
                <label htmlFor="email">
                  Email<span>*</span>
                </label>
                <input
                  type="email"
                  className="form__input"
                  id="email"
                  placeholder="alberto@gmail.com"
                  {...register("email")}
                  autoComplete="true"
                  required
                />
              </div>
            </div>
            <div className="form__password">
              <div className="form__input-div">
                <label htmlFor="password">
                  Password<span>*</span>
                </label>
                <input
                  type="password"
                  className="form__input"
                  id="password"
                  placeholder="***********"
                  {...register("password")}
                  required
                />
              </div>
            </div>
            <div className="form__options">
              <div className="form__remember">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <p
                className="form__forgot-password"
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
