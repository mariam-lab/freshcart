import {
  faComment,
  faEnvelope,
  faHouse,
  faPhone,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import NotFoundImage from "../../assets/images/notfound.svg";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";

export default function NotFound() {
  return (
    <>
      <div className="container mx-auto px-4 mb-28 mt-28">
        <div className="flex flex-col gap-8 mb-8 items-center justify-center">
          <div>
            <img src={NotFoundImage} alt="" className="w-1/4 mx-auto " />
          </div>
          <h1 className="text-6xl text-center">Oops! Page Not Found</h1>
          <p className="text-lg text-gray-600">
            the page you're looking for seems to have gone shopping!
            <p className="text-gray-500">
              Don't worry, our fresh products are still available for you.
            </p>
          </p>
          <div className="space-x-10">
            <Link to={"/home"} className="btn bg-primary-600 text-white">
              <FontAwesomeIcon icon={faHouse} className="mr-2" />
              Back to Home
            </Link>
            <Link
              to={"/search-product"}
              className="btn border-1 bg-white text-primary-600 border-primary-600/50  "
            >
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
              Search Products
            </Link>
          </div>
        </div>
        <div className="bg-primary-50 w-1/2 mx-auto rounded-lg p-8 flex flex-col gap-4 justify-center items-center">
          <h3 className="font-semibold">Need Help?</h3>
          <p>Our customer support team is here to assist you 24/7</p>
          <div className="flex flex-col justify-center items-center gap-4 sm:flex-row">
            <div className="flex item-center text-gray-700">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-primary-600 mr-2"
              />
              <a href="tel:+1 (800) 123-4567">+1 (800) 123-4567</a>
            </div>
            <div className="flex item-center text-gray-700">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-primary-600 mr-2"
              />
              <a href="mailto:support@freshcart.com">support@freshcart.com</a>
            </div>
            <div className="flex item-center text-gray-700">
              <FontAwesomeIcon
                icon={faComment}
                className="text-primary-600 mr-2"
              />
              <span>Live chat</span>
            </div>
          </div>
        </div>
      </div>
      <NewsLetter />
    </>
  );
}
