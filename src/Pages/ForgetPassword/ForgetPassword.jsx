import {
  faArrowRight,
  faEnvelopesBulk,
  faHeadphones,
  faLock,
  faPaperPlane,
  faQuestion,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { sendEmailToForegetPassword } from "../../../services/forgetPassword-service";
export default function ForgetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required ")
      .email("Email is invalid"),
  });
  async function handleForgetPassword(values) {
    try {
      const response = await sendEmailToForegetPassword(values.email);
      if (response.success) {
        toast.success("Email verified successfully");
        setTimeout(() => {
          navigate("/verify-code", { state: { email: values.email } });
        }, 3000);
      }
    } catch (err) {
      const message = err.message || "Something went wrong ";
      toast.error(message);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleForgetPassword,
  });

  return (
    <>
      <section className="bg-gray-50 py-12">
        <div className=" bg-white w-5/12 mx-auto py-8 ">
          <div className="flex flex-col justify-center items-center text-center gap-5">
            <div className="size-12 bg-primary-100 text-primary-600  text-xl p-3  flex items-center justify-center rounded-full">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <h2 className="text-2xl text-black font-bold">
              Forget your password?
            </h2>
            <p className="text-gray-500">
              No worries! Enter your email address and we'll <br /> send you a
              link to reset your password
            </p>
            <form className="w-full" onSubmit={formik.handleSubmit}>
              <div className="email flex flex-col gap-4 items-start p-3">
                <label htmlFor="email" className="text-lg font-semibold">
                  Email Address
                </label>
                <div className="relative w-full">
                  <input
                    className="form-control w-full "
                    type="email"
                    id="email"
                    placeholder="Your Registred email address  "
                    name="email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute right-3 top-3"
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500">*{formik.errors.email}</p>
                )}
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
                      Send Reset Link
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
      <section>
        <div className="container  w-[80%] mx-auto py-12">
          <h2 className="text-2xl font-bold text-center">
            Need additional help ?
          </h2>
          <div className="grid grid-cols-12 gap-3 md:grid-cols-3 ">
            <div className="bg-gray-50 mt-4 border-2 rounded-lg p-3 border-gray-200  flex flex-col gap-2 justify-center items-center">
              <div className="size-12 bg-primary-100 flex items-center justify-center rounded-full">
                <FontAwesomeIcon
                  icon={faHeadphones}
                  className="text-primary-600 text-lg"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-lg font-semibold">Contact Support</h3>
                <p className="text-gray-500">
                  Our customer support team is available 24/7 to assist you
                </p>
              </div>
              <Link className="text-primary-600">
                Contact Us
                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </Link>
            </div>
            <div className="bg-gray-50 mt-4 border-2 rounded-lg p-3 border-gray-200  flex flex-col gap-2 justify-center items-center">
              <div className="size-12 bg-primary-100 flex items-center justify-center rounded-full">
                <FontAwesomeIcon
                  icon={faQuestion}
                  className="text-primary-600 text-lg"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-lg font-semibold">FAQs</h3>
                <p className="text-gray-500">
                  Find answers to frequently asked questions about your account{" "}
                </p>
              </div>
              <Link className="text-primary-600">
                View FAQs
                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </Link>
            </div>
            <div className="bg-gray-50 mt-4 border-2 rounded-lg p-3 border-gray-200  flex flex-col gap-2 justify-center items-center">
              <div className="size-12 bg-primary-100 flex items-center justify-center rounded-full">
                <FontAwesomeIcon
                  icon={faEnvelopesBulk}
                  className="text-primary-600 text-lg"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-lg font-semibold">Email Not Recieved</h3>
                <p className="text-gray-500">
                  Check your spam folder or request a new reset link{" "}
                </p>
              </div>
              <p className="text-primary-600">
                Resend Email
                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
