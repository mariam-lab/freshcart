import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyResetCode } from "../../../services/forgetPassword-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";

export default function VerifyCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const location = useLocation();

  const email = location.state?.email;
  const [timer, setTimer] = useState(180); // 3 minutes
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleInputChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1); // Allow only 1 digit
    setCode(newCode);
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const formatTime = () => {
    const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
    const seconds = String(timer % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleVerify = async () => {
    const fullCode = code.join("");

    if (fullCode.length !== 6) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }

    try {
      await verifyResetCode(fullCode); // إرسال الكود للتحقق
      setIsVerified(true);
      toast.success("Code verified successfully ✅");

      navigate("/reset-password", { state: { email } }); // إرسال الإيميل للصفحة التالية
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid verification code ❌"
      );
    }
  };

  const handleResend = () => {
    setTimer(180); // reset timer
    // call resend API
  };

  return (
    <section className="bg-gray-100 py-3 text-center">
      <div className="max-w-sm mx-auto  p-6 bg-white rounded-xl shadow-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-green-100 size-12 flex justify-center items-center text-primary-600 rounded-full">
            <FontAwesomeIcon icon={faShieldHalved} />
          </div>
        </div>

        <h2 className="text-xl font-semibold">Verify Reset Code</h2>
        <p className="text-gray-600">
          We've sent a verification code to your email address
        </p>
        <p className="text-green-600 font-medium">{email}</p>
        <p>Enter 6-digit verification code</p>

        <div className="flex justify-center space-x-2">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, index)}
              className="w-10 h-12 text-xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <p className="text-gray-500 text-sm">
          Code expires in <span className="text-green-600">{formatTime()}</span>
        </p>
        <button
          disabled={code.join("").length < 6}
          onClick={handleVerify}
          className={`w-full py-2 rounded text-white ${
            code.join("").length < 6
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Verify Code
        </button>

        <div className="text-sm text-gray-600 space-y-1">
          <p>Didn't receive the code?</p>
          <button
            onClick={handleResend}
            className="text-green-600 font-semibold hover:underline"
          >
            Resend Code
          </button>
          <div>
            <a href="/login" className="text-primary-600 hover:underline">
              Back to Sign In
            </a>
          </div>
        </div>
      </div>
      <p className="mt-2">
        Need help? <span className="text-primary-600">Contact Support</span>
      </p>
    </section>
  );
}
