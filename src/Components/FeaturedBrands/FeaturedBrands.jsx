import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router"; // تأكد أنك تستخدم react-router-dom إذا كنت تستخدمه
import { BrandsContext } from "../../context/Brands.context";
import Loading from "../Loading/Loading";

export default function FeaturedBrands() {
  const { brands, isLoading } = useContext(BrandsContext);
  console.log("brands", brands);

  if (isLoading) {
    return <Loading />;
  }

  if (!brands?.length) {
    return <p className="text-center text-gray-500">No brands available</p>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-4 mb-10 ">
      {brands.slice(0, 3).map((brand) => (
        <div
          key={brand._id}
          className="bg-white rounded-xl overflow-hidden space-y-3 py-4"
        >
          <div className="relative ">
            <img
              src={brand.image}
              alt={brand.name}
              className="rounded-t-xl shadow-lg  mb-2 w-full h-48 object-cover"
            />
            <div className="captionImage absolute left-3 bottom-3 text-primary-600">
              <h3 className="text-lg font-semibold">{brand.name}</h3>
            </div>
          </div>

          <div className="px-3">
            <p className="text-sm mt-2 text-gray-600">
              Bringing the freshest organic fruits and vegetables from farm to
              table since 1995.
            </p>
            <div className="text-primary-600 flex justify-between items-center">
              <p className="text-sm text-gray-400 mt-2">124 Products</p>

              <Link
                to="/home"
                className="text-primary-600 flex items-center gap-1"
              >
                View Products
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
