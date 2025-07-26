import {
  faCcAmex,
  faCcApplePay,
  faCcMastercard,
  faCcPaypal,
  faCcVisa,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRightLong,
  faChevronLeft,
  faCircleInfo,
  faCreditCard,
  faLock,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import * as yup from "yup";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../Components/Loading/Loading";

import { createOrder } from "../../../services/payment-service";
import { toast } from "react-toastify";
export default function Checkout() {
  const { CartInfo, isLoading, refreshCart } = useContext(CartContext);
  const navigate = useNavigate();
  const validationSchema = yup.object({
    paymentMethod: yup.string().required("Payment method is required"),
    shippingAddress: yup.object({
      details: yup.string().required("Address is required"),
      phone: yup
        .string()
        .required("Phone is required")
        .matches(/^(\+2)?01[0125][0-9]{8}$/, "phone number is invalid"),
      city: yup.string().required("city is required"),
    }),
  });
  async function handleCreateingOrder(values) {
    try {
      const response = await createOrder({
        cartId,
        shippingAddress: values.shippingAddress,
        paymentMethod: values.paymentMethod,
      });
      if (response.success) {
        if (response.data.session) {
          toast.loading(
            "you wii be directed to stripe to complete payment proccess"
          );
          setTimeout(() => {
            location.href = response.data.session.url;
          }, 3000);
        }
        toast.success("your order has been created successfully");
        refreshCart();
        setTimeout(() => {
          navigate("/orders");
        }, 3000);
      }
    } catch (error) {
      throw error;
    }
  }
  const formik = useFormik({
    initialValues: {
      paymentMethod: "online",
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema,
    onSubmit: handleCreateingOrder,
  });
  if (isLoading || !CartInfo || !CartInfo.data) return <Loading />;
  const { cartId, data, numOfCartItems } = CartInfo;
  const { products, totalCartPrice } = data;
  return (
    <>
      <section>
        <div className="container max-w-6xl py-6 ">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="payment-method bg-white shadow-sm p-6 lg:col-span-8">
                <div className="payment-options bg-white shadow-sm p-6 rounded-lg mb-6">
                  <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                  <div>
                    <label
                      htmlFor="cod"
                      className={`${
                        formik.values.paymentMethod == "cod" &&
                        "bg-primary-100/50 border-primary-500"
                      }" flex gap-4 items-center border border-gray-200 hover:border-primary-600 transition-colors duration-300 p-4 rounded-lg  "`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={`cod`}
                        checked={formik.values.paymentMethod === "cod"}
                        onChange={(e) => {
                          formik.setFieldValue("paymentMethod", e.target.value);
                        }}
                        id="cod"
                        className="size-4"
                      />

                      <div className="w-full">
                        <div className=" flex justify-between items-center ">
                          <div className="flex items-center gap-4">
                            <FontAwesomeIcon
                              icon={faMoneyBillWave}
                              className="text-2xl text-primary-600"
                            />

                            <div>
                              <h3 className="font-semibold ">
                                Cash on Delivery
                              </h3>
                              <p className="text-gray-600 text-sm">
                                Pay when your order arrives
                              </p>
                            </div>
                          </div>
                          <span className="text-primary-600">
                            No extra charges
                          </span>
                        </div>
                        {formik.values.paymentMethod == "cod" ? (
                          <>
                            <div className="ml-10 mt-3 flex gap-2 items-center text-primary-600 border bg-primary-100 border-primary-600/50 rounded-md ">
                              <FontAwesomeIcon icon={faCircleInfo} />
                              <p className="text-sm">
                                please keep exact change ready for hassle-free
                                delivery
                              </p>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </label>
                    <label
                      htmlFor="online"
                      className={`${
                        formik.values.paymentMethod == "online" &&
                        "bg-primary-100/50 border-primary-500"
                      }" flex mt-5 gap-4 items-center border border-gray-200 hover:border-primary-600 transition-colors duration-300 p-4 rounded-lg  "`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={`online`}
                        checked={formik.values.paymentMethod === "online"}
                        onChange={(e) => {
                          formik.setFieldValue("paymentMethod", e.target.value);
                        }}
                        id="online"
                        className="size-4"
                      />

                      <div className="w-full">
                        <div className=" flex justify-between items-center ">
                          <div className="flex items-center gap-4">
                            <FontAwesomeIcon
                              icon={faCreditCard}
                              className="text-2xl text-primary-600"
                            />

                            <div>
                              <h3 className="font-semibold ">Online Payment</h3>
                              <p className="text-gray-600 text-sm">
                                Pay securly with card or digital wallet
                              </p>
                            </div>
                          </div>
                          <span className="text-primary-600">recommended </span>
                        </div>
                        {formik.values.paymentMethod == "online" ? (
                          <>
                            <div className="ml-10 mt-3 flex gap-2 items-center text-blue-600 bg-blue-400/20 border border-blue-600/50 rounded-md ">
                              <FontAwesomeIcon icon={faCircleInfo} />
                              <p className="text-sm">
                                you will be redirected to secure payment gateway
                                to complete your transaction
                              </p>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </label>
                  </div>
                </div>
                <div className="shipping-address bg-white shadow-sm p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">
                    Shipping Address
                  </h2>
                  <div className="address flex flex-col gap-2">
                    <label htmlFor="addressDetails" className="text-sm">
                      Address Details
                    </label>
                    <textarea
                      id="addressDetails"
                      placeholder="Enter Your Full Address Details"
                      className="form-control min-h-20 max-h-60"
                      {...formik.getFieldProps("shippingAddress.details")}
                    />
                    {formik.touched.shippingAddress?.details &&
                      formik.errors.shippingAddress?.details && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.shippingAddress.details}
                        </p>
                      )}
                  </div>
                  <div className="mt-3 flex gap-3 *:grid-rows-1">
                    <div className="phone flex flex-col gap-2">
                      <label htmlFor="phone" className="text-sm">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        placeholder="01207888859"
                        className="form-control"
                        {...formik.getFieldProps("shippingAddress.phone")}
                      />
                      {formik.touched.shippingAddress?.phone &&
                        formik.errors.shippingAddress?.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {formik.errors.shippingAddress.phone}
                          </p>
                        )}
                    </div>
                    <div className="city flex flex-col gap-2">
                      <label htmlFor="city" className="text-sm">
                        City*
                      </label>
                      <input
                        type="tel"
                        id="city"
                        placeholder="Sadat City"
                        className="form-control"
                        {...formik.getFieldProps("shippingAddress.city")}
                      />
                      {formik.touched.shippingAddress?.city &&
                        formik.errors.shippingAddress?.city && (
                          <p className="text-red-500 text-sm mt-1">
                            {formik.errors.shippingAddress.city}
                          </p>
                        )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-summary space-y-2 lg:col-span-4">
                <h2 className="text-xl mb-4 font-semibold">Order Summary</h2>
                <div className="cart-items p-3 max-h-48 overflow-auto space-y-3 border-b border-gray-500/20 pb-3  ">
                  {products.map((product) => (
                    <Link
                      to={`/product/${product.product.id}`}
                      key={product._id}
                      className="text-sm flex gap-2 items-center"
                    >
                      <img
                        src={product.product.imageCover}
                        alt="cart item"
                        className="size-12 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-sm">{product.product.title}</h3>
                        <span className="text-xs text-gray-500">
                          Qty: {product.count}
                        </span>
                      </div>
                      <span className="ms-auto text-sm">
                        {product.price} EGP
                      </span>
                    </Link>
                  ))}
                </div>
                <ul className="*:flex *:justify-between *:items-center py-3 space-y-3">
                  <li>
                    <span>SubTotal</span>
                    <span>{totalCartPrice} EGP</span>
                  </li>
                  <li>
                    <span>Delivery</span>
                    <span>134 EGP</span>
                  </li>
                  <li>
                    <span>Tax</span>
                    <span>{Math.trunc(totalCartPrice * 0.14)} EGP</span>
                  </li>
                  <li className="font-semibold border-t border-gray-500/20 pt-3">
                    <span>Total</span>
                    <span>
                      {Math.trunc(
                        totalCartPrice + 70 + Math.trunc(totalCartPrice * 0.14)
                      )}
                      EGP
                    </span>
                  </li>
                </ul>
                <div className="btn-group space-y-2 mt-2">
                  <button
                    type="submit"
                    className="btn w-full bg-primary-600 text-white flex gap-2 items-center"
                  >
                    <span>Proceed to Payment</span>
                    <FontAwesomeIcon icon={faArrowRightLong} />
                  </button>
                  <Link
                    to="/cart"
                    className="btn w-full bg-white flex gap-2 items-center border-1 border-gray-500/50 "
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span>Return to Cart</span>
                  </Link>
                </div>
                <div className="mt-3">
                  <h3 className="text-xl font-semibold mb-2">
                    Secure Checkout
                  </h3>
                  <p>
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-primary-600 me-2"
                    />
                    Your payment information is secure
                  </p>
                </div>
                <div className="flex items-center mt-4 space-x-2">
                  <FontAwesomeIcon
                    icon={faCcVisa}
                    className="text-2xl text-blue-700"
                  />
                  <FontAwesomeIcon
                    icon={faCcMastercard}
                    className="text-2xl text-red-500"
                  />
                  <FontAwesomeIcon
                    icon={faCcAmex}
                    className="text-2xl text-blue-500"
                  />
                  <FontAwesomeIcon
                    icon={faCcPaypal}
                    className="text-2xl text-blue-800"
                  />
                  <FontAwesomeIcon
                    icon={faCcApplePay}
                    className="text-2xl text-gray-800"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
