import { useContext } from "react";
import CartFeature from "../../Components/CartFeature/CartFeature";
import CartItem from "../../Components/CartItem/CartItem";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router";
import { useEffect } from "react";

export default function Cart() {
  const { CartInfo, isLoading } = useContext(CartContext);
  if (isLoading) {
    return <Loading />;
  }
  const { numOfCartItems, data } = CartInfo;
  const { products, totalCartPrice } = data;
  console.log("cart page : ", products);
  return (
    <>
      <main id="cart-main" className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div id="cart-items" className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h1 className="text-2xl font-bold">Shopping Cart</h1>
                  <p className="text-gray-600 mt-1">
                    {numOfCartItems} items in your cart
                  </p>
                </div>

                {/* Example of a Cart Item */}
                <div className="p-6">
                  {products.length > 0 ? (
                    products.map((products) => (
                      <CartItem key={products._id} productInfo={products} />
                    ))
                  ) : (
                    <div className="text-center text-gray-500">
                      Your cart is empty. Start shopping
                      <Link
                        to="/home"
                        className="text-primary-600 hover:underline ms-1"
                      >
                        now!
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div id="order-summary" className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                <h3 className="font-bold text-xl mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({numOfCartItems} items)
                    </span>
                    <span className="font-medium">{totalCartPrice} EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{products.length > 0 ? 70 : 0}EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>{Math.trunc(totalCartPrice * 0.14)} EGP</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Total</span>
                  <span>
                    {Math.trunc(
                      totalCartPrice +
                        (products.length > 0 ? 70 : 0) +
                        totalCartPrice * 0.14
                    )}
                    EGP
                  </span>
                </div>
                <div className="flex flex-col justify-center gap-3 mt-3  ">
                  <button className="btn bg-primary-600 text-white font-extralight">
                    <Link to="/checkout"> Proceed to Checkout</Link>
                  </button>
                  <button className="btn border-1 border-gray-200 bg-white font-extralight">
                    <Link to="/home"> Continue Shopping</Link>
                  </button>
                </div>
                {/* Cart Features */}
                <div className="mt-8">
                  <CartFeature />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
