import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faEye,
  faKey,
  faLock,
  faPaperPlane,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router";

import * as yup from "yup";
import { toast } from "react-toastify";
import { resetPassword } from "../../../services/forgetPassword-service";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isShownPassword, setisShownPassword] = useState(false);
  function togglePasswordVisibility() {
    setisShownPassword(!isShownPassword);
  }
  // استخرج الإيميل من location.state
  const email = location.state?.email;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = yup.object({
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
      .oneOf([yup.ref("password")], "password should be the same"),
  });
  async function handleResetPassword(values) {
    try {
      const response = await resetPassword(email, values.password);
      if (response.success) {
        toast.success("Password reset successfully");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      const message = err.message || "Something went wrong during signup";
      toast.error(message);
    }
  }

  const formik = useFormik({
    initialValues: {
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => handleResetPassword({ ...values, email }),
  });

  return (
    <section className="bg-gray-50 py-12">
      <div className=" bg-white w-5/12 mx-auto py-8 ">
        <div className="flex flex-col justify-center items-center text-center gap-5">
          <div className="size-12 bg-primary-100 text-primary-600  text-xl p-3  flex items-center justify-center rounded-full">
            <FontAwesomeIcon icon={faKey} />
          </div>
          <h2 className="text-2xl text-black font-bold">Reset Password</h2>
          <p className="text-gray-500">
            Enter your email address and new password tp reset your account
            password
          </p>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full mt-10 space-y-4"
          >
            <div className="email flex flex-col gap-4 items-start text-start p-3">
              <label htmlFor="email" className="text-lg font-semibold">
                Email Address
              </label>
              <div className="relative w-full">
                <input
                  className="form-control w-full ps-8 "
                  type="email"
                  id="email"
                  placeholder="Your Registred email address  "
                  name="email"
                  value={email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  readOnly // 👈 optional: prevents user editing
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3 top-3 text-gray-300"
                />
                {formik.touched.email && (
                  <p className="text-red-500">*This field cannot be edited</p>
                )}
              </div>
              <label htmlFor="password" className="text-lg font-semibold">
                New Password
              </label>
              <div className="relative w-full">
                <input
                  className="form-control w-full ps-8 "
                  type={isShownPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter new password  "
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <FontAwesomeIcon
                  icon={faEye}
                  fixedWidth
                  className="absolute right-4 top-3  text-gray-300"
                  onClick={togglePasswordVisibility}
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-3 text-gray-300"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-start">
                    <p>Password must contain:</p>
                    <p>
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="me-2 text-red-500/50"
                      />
                      At least 8 characters
                    </p>
                    <p>
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="me-2 text-red-500/50"
                      />
                      One uppercase letter
                    </p>
                    <p>
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="me-2 text-red-500/50"
                      />
                      One Number
                    </p>
                  </div>
                ) : (
                  <div className="text-gray-500 text-start">
                    <p>Password must contain:</p>
                    <p>
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="text-gray-200 me-2"
                      />
                      At least 8 characters
                    </p>
                    <p>
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="text-gray-200 me-2"
                      />
                      One uppercase letter
                    </p>
                    <p>
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="text-gray-200 me-2"
                      />
                      One Number
                    </p>
                  </div>
                )}
              </div>

              <label htmlFor="rePassword" className="text-lg font-semibold ">
                Confirm New Password
              </label>
              <div className="relative w-full ">
                <input
                  className="form-control w-full ps-8 "
                  type={isShownPassword ? "text" : "password"}
                  name="rePassword"
                  id="rePassword"
                  placeholder="Confirm new password  "
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.rePassword}
                />
                <FontAwesomeIcon
                  icon={faEye}
                  fixedWidth
                  className="absolute right-4 top-3  text-gray-300"
                  onClick={togglePasswordVisibility}
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-3 text-gray-300"
                />
                {formik.touched.rePassword && formik.errors.rePassword && (
                  <p className="text-red-500">*{formik.errors.rePassword}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn text-white bg-primary-600 w-full flex items-center justify-center gap-2"
              >
                {formik.isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Reset password
                  </>
                )}
              </button>
            </div>
          </form>

          <div>
            <p>
              Remember your password ?{" "}
              <Link to={"/login"} className="text-primary-600">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 border-2 rounded-lg p-3 border-gray-200 w-5/12 mx-auto flex gap-2 justify-center items-baseline">
        <FontAwesomeIcon
          icon={faShieldHalved}
          className="text-primary-600 text-lg"
        />
        <div className="p-3">
          <h3 className="text-lg font-semibold">Secure Notice</h3>
          <p className="text-gray-500">
            for your securoty ,a password reset link will be sent to your
            registred email address.the link will expire after 30 minutes
          </p>
        </div>
      </div>
    </section>
  );
}
