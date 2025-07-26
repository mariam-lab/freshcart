import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faShieldHalved,
  faStar,
  faTruckFast,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import reviewAuthorImg from "../../assets/images/review-author.png";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { sendDataToSignup } from "../../../services/auth-service";
import { checkPasswordStrength } from "../../../utils/password-strength";
export default function Signup() {
  const navigate = useNavigate();

  const phoneRegex = /^(?:\+2)?01[0125][0-9]{8}$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const nameRegex = /^[a-z0-9_-]{3,15}$/;
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .matches(
        nameRegex,
        "name should be include _ and - having a length of 3 to 16 characters."
      ),
    email: yup
      .string()
      .required("Email is required ")
      .email("Email is invalid"),
    phone: yup
      .string()
      .required("phone number is required")
      .matches(phoneRegex, "phone number is invalid we accepted Eg number"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        passwordRegex,
        "password should be at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: yup
      .string()
      .required("confirm password is required")
      .oneOf([yup.ref("password")], "password shpuld be the same"),
    terms: yup
      .boolean()
      .oneOf([true], "you must agree to out terms and conditions"),
  });
  async function handleSignUp(values) {
    try {
      const response = await sendDataToSignup(values);
      if (response.success) {
        toast.success("Your account has been created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      console.error("Signup failed", err);
      const message = err.message || "Something went wrong during signup";
      toast.error(message);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    validationSchema,
    onSubmit: handleSignUp,
  });
  const passwordFeedback = checkPasswordStrength(formik.values.password);
  return (
    <>
      <main>
        <div className="container gap-12 py-12 grid lg:grid-cols-2 ">
          {/* left side*/}
          <div className="space-y-8 p-10">
            <div className="head">
              <h2 className="text-4xl font-bold">
                Welcome to <span className="text-primary-600">FreshCart</span>
              </h2>
              <p className="text-lg mt-2">
                join thousands of happy customers who enjoy fresh groceries
                delivered right to their doorstep
              </p>
            </div>
            <ul className="*:flex  *:items-center *:gap-3 *:text-xl space-y-3">
              <li>
                <div className="icon bg-primary-300 rounded-full p-2 ">
                  <FontAwesomeIcon
                    icon={faStar}
                    fixedWidth
                    className="text-primary-600"
                  />
                </div>
                <div className="text">
                  <h3 className="text-lg font-bold"> Premium Quality</h3>
                  <p className="text-gray-600">
                    Premiuem quality products sourced from trusted suppliers
                  </p>
                </div>
              </li>
              <li>
                <div className="icon bg-primary-300 rounded-full p-2 ">
                  <FontAwesomeIcon
                    icon={faTruckFast}
                    fixedWidth
                    className="text-primary-600"
                  />
                </div>
                <div className="text">
                  <h3 className="text-lg font-bold"> Fast Delivery</h3>
                  <p className="text-gray-600">
                    same-day delivery available in most area
                  </p>
                </div>
              </li>
              <li>
                <div className="icon bg-primary-300 rounded-full p-2 ">
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                    fixedWidth
                    className="text-primary-600"
                  />
                </div>
                <div className="text">
                  <h3 className="text-lg font-bold"> Secure Shopping</h3>
                  <p className="text-gray-600">
                    Your data and payments are completely secure
                  </p>
                </div>
              </li>
            </ul>
            <div className="review p-6 rounded-xl bg-white shadow">
              <div>
                <div className="image flex items-center gap-3">
                  <img
                    src={reviewAuthorImg}
                    alt="review Author Img"
                    className="size-12"
                  />
                  <div>
                    <h3>Sarah Johnson</h3>
                    <div className="*:text-yellow-400">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">
                  <p className="mt-4">
                    "Frechcart has transformed my shopping experience. the
                    quality of the products is outstanding, and the delivery is
                    always on time. Highly recommend!"
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
          {/* right side*/}
          <div className="p-10 space-y-8 shadow-xl rounded-xl">
            <div className="title text-center">
              <h2 className="text-3xl font-semibold">Create Your Account</h2>
              <p className="mt-1">Start your fresh journery with us today</p>
            </div>
            <div className="flex gap-2 *:flex *:items-center *:justify-center *:w-full *:gap-2 *:hover:bg-gray-100">
              <button className="btn bg-transparent border border-gray-400/40 ">
                <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
                <span>Google</span>
              </button>
              <button className="btn bg-transparent border border-gray-400/40">
                <FontAwesomeIcon icon={faFacebook} className="text-blue-600" />
                <span>Facebook</span>
              </button>
            </div>
            <div className="w-full h-0.5 bg-gray-300/40 relative">
              <span className="absolute left-1/2 top-1/2 -translate-1/2 px-4 bg-white">
                or
              </span>
            </div>
            <form
              action=""
              className="space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div className="name flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ali"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500">*{formik.errors.name}</p>
                )}
              </div>
              <div className="email flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  placeholder="ali@gmail.com"
                  name="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500">*{formik.errors.email}</p>
                )}
              </div>
              <div className="phone flex flex-col gap-1">
                <label htmlFor="phone">Phone</label>
                <input
                  className="form-control"
                  type="tel"
                  id="phone"
                  placeholder="+2 010 9751 4862"
                  name="phone"
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500">*{formik.errors.phone}</p>
                )}
              </div>
              <div className="password flex flex-col gap-1">
                <label htmlFor="password">password</label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  placeholder="create a strong password"
                  name="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-red-500">*{formik.errors.password}</p>
                ) : (
                  <p className="text-sm -mt-1">
                    Must be at least 8 characters with numbers and symbols
                  </p>
                )}
              </div>
              {formik.values.password && (
                <div className="password-strenght flex items-center gap-2">
                  <div className="bar w-full h-1 bg-gray-200 rounded-xl overflow-hidden">
                    <div
                      className={`progress ${passwordFeedback.background} ${passwordFeedback.width}  h-full`}
                    ></div>
                  </div>
                  <span
                    className={`min-w-fit text-nowrap  text-center ${passwordFeedback.text}`}
                  >
                    very week
                  </span>
                </div>
              )}
              <div className="repassword flex flex-col gap-1">
                <label htmlFor="repassword">repassword</label>
                <input
                  className="form-control"
                  type="password"
                  id="rePassword"
                  placeholder="confirm your password"
                  name="rePassword"
                  value={formik.values.rePassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.rePassword && formik.errors.rePassword && (
                  <p className="text-red-500">*{formik.errors.rePassword}</p>
                )}
              </div>
              <div className="terms  ">
                <div className="flex gap-2 items-center">
                  <input
                    className="form-control accent-primary-600 size-4"
                    type="checkbox"
                    name="terms"
                    id="terms"
                    value={formik.values.terms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="terms">
                    I agree to the
                    <Link
                      to={`/terms`}
                      className="px-1 text-primary-600 underline"
                    >
                      terms of service
                    </Link>
                    and
                    <Link
                      to={`/privacy-policy`}
                      className="text-primary-600 underline px-1"
                    >
                      privacy policy
                    </Link>
                  </label>
                </div>
                {formik.touched.terms && formik.errors.terms && (
                  <p className="text-red-500 mt-2">*{formik.errors.terms}</p>
                )}
              </div>
              <button
                type="submit"
                className="btn bg-primary-600 text-white flex gap-2 items-center justify-center hover:bg-primary-700 w-full "
              >
                <FontAwesomeIcon icon={faUserPlus} />
                <span>Create My Account</span>
              </button>
            </form>
            <p className="text-center pt-8 border-t border-gray-300/50">
              Already have an account?
              <Link className="text-primary-600 underline" to={`/login`}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
