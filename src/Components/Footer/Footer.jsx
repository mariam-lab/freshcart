import {
  faFacebookF,
  faInstagram,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import FreshCartLogo from "../../assets/images/freshcart-logo.svg";
import FreshCartMiniLogo from "../../assets/images/mini-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export default function Footer() {
  return (
    <>
      <footer className="py-5 bg-white border-t border-gray-400/20">
        <div className="container">
          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6 py-8">
            <div className=" xl:col-span-2 space-y-3">
              <img src={FreshCartLogo} alt="" />
              <p>
                FreshCart is a versatilite e-commerce platform offering a wide
                range of products, from clothing to electronics. It provides a
                user-friendly experience for seamiess shooping across diverse
                categories
              </p>
              <ul className="flex items-center gap-4 spa text-lg *:text-primary-500 *:hover:text-gray-600 *:transition-colors *:duration-200">
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faPinterest} />
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold">Categories</h2>
              <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
                <li>
                  <Link to={``}>Men's Fashion</Link>
                </li>
                <li>
                  <Link to={``}>Women's Fashion</Link>
                </li>
                <li>
                  <Link to={``}>Baby & Toys</Link>
                </li>
                <li>
                  <Link to={``}>Beauty & Health</Link>
                </li>
                <li>
                  <Link to={``}>Electronic</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold">Quick Links</h2>
              <ul className="space-y-3">
                <li>
                  <Link to={`/about`}>About Us</Link>
                </li>
                <li>
                  <Link to={`/contact`}>Contact Us</Link>
                </li>
                <li>
                  <Link to={`/privacy-policy`}>Privacy Policy</Link>
                </li>
                <li>
                  <Link to={`/terms`}>Terms of Service</Link>
                </li>
                <li>
                  <Link to={`/shopping-policy`}>Shopping Policy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold">Customer serviece</h2>
              <ul className="space-y-3">
                <li>
                  <Link to={`/account`}>My Account </Link>
                </li>
                <li>
                  <Link to={`/orders`}>My orders</Link>
                </li>
                <li>
                  <Link to={`/wishlist`}>Wishlist</Link>
                </li>
                <li>
                  <Link to={`/returns-and-refunds`}>Returns & Refunds</Link>
                </li>
                <li>
                  <Link to={`/help-center`}>Help Center </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center py-8 border-t border-gray-100 ">
            <p>
              &copy; {new Date().getFullYear()} FreshCar. All rights reserved.
            </p>
            <img
              className="w-8"
              src={FreshCartMiniLogo}
              alt="fresh mini logo cart"
            />
          </div>
        </div>
      </footer>
    </>
  );
}
