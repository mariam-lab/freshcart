import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import FeaturedBrands from "../../Components/FeaturedBrands/FeaturedBrands";
import BrandSearch from "../../Components/BrandSearch/BrandSearch";
import brandsImage from "../../assets/images/brands.png";
export default function Brands() {
  return (
    <>
      <div className="py-8 container">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Our Partner Brands
        </h2>
        <p className="text-center text-gray-600  max-w-2xl mx-auto">
          Discover quality products from our trusted brand partners. We've
          partnered with leading brands to bring you the best selection of fresh
          and organic products.
        </p>
      </div>

      <div className=" bg-gray-50 w-full">
        <div className="container">
          <div className="py-4">
            <h2 className="font-bold text-2xl my-3">Featured Brands</h2>
            <div>
              <FeaturedBrands />
              <BrandSearch />
            </div>
          </div>
        </div>
        <div className="mt-20  bg-green-50 py-12 rounded-xl ">
          <div className="w-1/2  mx-auto grid grid-cols-1 md:grid-cols-2  ">
            {/* Text Section */}
            <div className="bg-white p-6 flex flex-col justify-center ">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Want to become a brand partner?
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Join our growing family of quality brands. Showcase your
                  products to our engaged customer base and grow your business
                  with FreshCart.
                </p>
                <ul className="text-sm text-gray-700 space-y-1 mb-4">
                  <li className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-green-600"
                    />
                    Access to over 1 million active customers
                  </li>
                  <li className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-green-600"
                    />
                    Dedicated account manager for your brand
                  </li>
                  <li className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-green-600"
                    />
                    Marketing and promotional opportunities
                  </li>
                  <li className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-green-600"
                    />
                    Streamlined logistics and fulfillment
                  </li>
                </ul>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md">
                Apply to Become a Partner
              </button>
            </div>

            {/* Image Section */}
            <div className="bg-white  flex items-center justify-center">
              <img
                src={brandsImage}
                alt="Partner Image"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
