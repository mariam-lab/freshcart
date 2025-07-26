import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEnvelope,
  faLock,
  faShieldHalved,
  faStar,
  faTruck,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import cartImage from "../../assets/images/freshCart.png";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { API_CONFIG } from "../../../config";
import { sendDataToLogin } from "../../../services/auth-service";
import { AuthContext } from "../../context/Auth.context";
import { CartContext } from "../../context/Cart.context";

export default function Login({ saveUserDate }) {
  const location = useLocation();
  const from = location?.state?.from || "/";
  const { setToken, setisLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isShownPassword, setisShownPassword] = useState(false);

  const [messageError, setMessageError] = useState("");
  function handleChange(e) {
    setMessageError("");
    formik.handleChange(e);
  }
  function togglePasswordVisibility() {
    setisShownPassword(!isShownPassword);
  }

  async function handleLogin(values) {
    try {
      const response = await sendDataToLogin(values);
      if (response.success) {
        toast.success("Welcome Back");
        setToken(response.data.token);
        if (values.rememberMe) {
          localStorage.setItem("token", response.data.token);
        } else {
          sessionStorage.setItem("token", response.data.token);
        }
        setTimeout(() => {
          navigate(from);
        }, 3000);
      }
    } catch (error) {
      setMessageError(error.message);
    }
  }

  let validation = Yup.object({
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "password must have special characters, capital letters, small letters, numbers, and min 8 characters"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validation,
    onSubmit: handleLogin,
  });

  return (
    <>
      <main>
        <div className="container gap-12 py-12 grid lg:grid-cols-2  ">
          {/* left side*/}
          <div className="space-y-8 p-10 flex items-center justify-center flex-col text-center ">
            <div className="review p-6 rounded-xl bg-white shadow text-center">
              <div className="image  ">
                <img src={cartImage} alt="Cart Img" className="w-full" />
              </div>
            </div>
            <div className="head">
              <h2 className="text-4xl font-bold">Fresh Groceries Delivered </h2>
              <p className="text-sm mt-2">
                join thousands of happy customers who enjoy fresh groceries
                delivered right to their doorstep
              </p>
            </div>
            <ul className="flex gap-5  *:flex *:justify-center *:items-center *:gap-2">
              <li>
                <FontAwesomeIcon
                  icon={faTruck}
                  fixedWidth
                  className="text-primary-600"
                />
                <div className="text-sm text-gray-500">Free Delivery</div>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  fixedWidth
                  className="text-primary-600"
                />
                <div className="text">
                  <h3 className="text-sm text-gray-500 "> Secure Payment </h3>
                </div>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faClock}
                  fixedWidth
                  className="text-primary-600"
                />
                <div className="text">
                  <h3 className="text-sm text-gray-500 "> 24/7 Support</h3>
                </div>
              </li>
            </ul>
          </div>
          {/* right side*/}
          <div className="p-10 space-y-8 shadow-xl rounded-xl text-center">
            <div className="head">
              <h2 className="text-4xl font-bold">
                <span className="text-primary-600">Fresh</span>Cart
              </h2>
              <h2 className="text-2xl font-bold">Welcome Back!</h2>
              <p className="text-lg mt-2">
                Sign in to continue your fresh shopping experience
              </p>
            </div>
            <div className="flex-col space-y-2  *:flex *:items-center *:justify-center *:w-full *:gap-3 *:p-4 *:hover:bg-gray-100">
              <button className="btn bg-transparent border border-gray-400/40 ">
                <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
                <span>Continue with Google</span>
              </button>
              <button className="btn bg-transparent border border-gray-400/40">
                <FontAwesomeIcon icon={faFacebook} className="text-blue-600" />
                <span>Continue with Facebook</span>
              </button>
            </div>
            <div className="w-full h-0.5 bg-gray-300/40 relative">
              <span className="text-sm absolute left-1/2 top-1/2 -translate-1/2 px-4 bg-white">
                OR CONTINUE WITH EMAIL
              </span>
            </div>
            <form className="space-y-6 " onSubmit={formik.handleSubmit}>
              <div className="email  text-start  ">
                <label className="flex font-semibold mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative flex flex-col gap-1">
                  <input
                    className="form-control px-10"
                    type="email"
                    id="email"
                    placeholder="Enter Your email"
                    name="email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    fixedWidth
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm text-start mt-1">
                    *{formik.errors.email}
                  </p>
                )}
              </div>

              <div className="password  ">
                <label
                  className="flex justify-between font-semibold mb-2"
                  htmlFor="password"
                >
                  <span>Password</span>
                  <Link
                    to={`/forgetPassword`}
                    className="px-1 text-primary-600 "
                  >
                    Forget Password?
                  </Link>
                </label>
                <div className="relative flex flex-col gap-1">
                  <input
                    className="form-control px-10 "
                    type={isShownPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter Your Password"
                    name="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={handleChange}
                  />
                  <FontAwesomeIcon
                    icon={faLock}
                    fixedWidth
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <FontAwesomeIcon
                    icon={faEye}
                    fixedWidth
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={togglePasswordVisibility}
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm text-start mt-1">
                    *{formik.errors.password}
                  </p>
                )}
                {messageError && (
                  <p className="text-red-500 text-sm text-start mt-1">
                    {messageError}
                  </p>
                )}
              </div>

              <div className="terms  ">
                <div className="flex gap-2 items-center">
                  <input
                    className="form-control accent-primary-600 size-4"
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    value={formik.values.rememberMe}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p>Keep me signed in</p>
                </div>
              </div>
              <button
                type="submit"
                className="btn bg-primary-600 text-white flex gap-2 items-center justify-center hover:bg-primary-700 w-full "
              >
                <span>Sign in</span>
              </button>
            </form>
            <p className="text-center pt-8 border-t border-gray-300/50 ">
              New to FrechCart?
              <Link
                className="font-semibold ms-1 text-primary-600 "
                to={`/signup`}
              >
                Create an account
              </Link>
            </p>
            <ul className="flex gap-3 items-center justify-center-safe  *:flex *:justify-center *:items-center *:gap-1">
              <li>
                <FontAwesomeIcon
                  icon={faLock}
                  fixedWidth
                  className="text-gray-500"
                />
                <div className="text-sm text-gray-500">SSL Secured</div>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faUsers}
                  fixedWidth
                  className="text-gray-500"
                />
                <div className="text-sm text-gray-500">50K+ Users</div>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faStar}
                  fixedWidth
                  className="text-gray-500"
                />
                <div className="text-sm text-gray-500">4.9 Rating</div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
