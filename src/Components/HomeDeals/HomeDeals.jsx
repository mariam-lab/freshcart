import { Link } from "react-router";
import ProductCard from "../ProductCard/ProductCard";
import { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { calcTimeLeft } from "../../../utils/counterDown";
import { useRef } from "react";
import { ProductsContext } from "../../context/Product.context";
import { WishlistContext } from "../../context/Wishlist.context";
export default function HomeDeals() {
  const { products, isLoading, error, isError } = useContext(ProductsContext);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const newTimeLeft = calcTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  const deals = products
    .filter((product) => product.priceAfterDiscount)
    .slice(0, 5);
  return (
    <>
      <section>
        <div className="container">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-3">Deals of the Day</h2>
              <div className="flex gap-2 items-center">
                <p>Offers ends in:</p>
                <div className="counter flex gap-2 items-center">
                  <div className="size-7 rounded-md flex justify-center items-center bg-gray-900 text-white text-sm">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <span>:</span>
                  <div className="size-7 rounded-md flex justify-center items-center bg-gray-900 text-white text-sm">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <span>:</span>
                  <div className="size-7 rounded-md flex justify-center items-center bg-gray-900 text-white text-sm">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <span>:</span>
                </div>
              </div>
            </div>
            <div>
              <Link
                to={`./brands`}
                className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                View All Deals
              </Link>
            </div>
          </div>
          <div className="py-6 grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 ">
            {deals.map((product) => (
              <ProductCard key={product.id} productInfo={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
