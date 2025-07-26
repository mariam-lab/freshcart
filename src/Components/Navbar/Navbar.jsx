import {
  faBabyCarriage,
  faBars,
  faBolt,
  faCartShopping,
  faChevronDown,
  faEllipsis,
  faEnvelope,
  faHeart,
  faMagnifyingGlass,
  faPerson,
  faPersonDress,
  faPhone,
  faRightFromBracket,
  faSpinner,
  faSuitcaseMedical,
  faUser,
  faUserPlus,
  faWifi,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router";
import FreshCartLogo from "../../assets/images/freshcart-logo.svg";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth.context";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import { CartContext } from "../../context/Cart.context";
import { CategoriesContext } from "../../context/Categories.context";

export default function Navbar() {
  const isOnline = useOnlineStatus();
  const { logOut, token } = useContext(AuthContext);
  const { CartInfo, isLoading } = useContext(CartContext);
  const { categories } = useContext(CategoriesContext);

  console.log("Cart Info:", CartInfo, isLoading);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(""); // optional: clear input
    }
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <>
      <header>
        <div className="container ">
          {/*top Navbar*/}
          <div className="hidden lg:flex text-sm  py-2 justify-between items-center border-b border-gray-300/30 ">
            <ul className="flex gap-5 items- *:flex *:gap-2 *:items-center">
              <li>
                <FontAwesomeIcon icon={faPhone} />
                <a href="tel:+1 (800) 123-4567">+1 (800) 123-4567</a>{" "}
                {/*tel to make it as calling*/}
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} />
                <a href="mailto:support@freshcart.com">support@freshcart.com</a>
                {/*mailto to make it as email*/}
              </li>
              {isOnline && (
                <li className="text-primary-600">
                  <FontAwesomeIcon icon={faWifi} />
                  <span>Online</span>
                </li>
              )}
            </ul>
            <ul className="flex gap-5 items-center">
              <li>
                <Link to={`track-order`}>Track Order</Link>
              </li>
              <li>
                <Link to={`about`}>About</Link>
              </li>
              <li>
                <Link to={`Contact`}>Contact</Link>
              </li>
              <li>
                <select name="" id="">
                  <option value="EGP">EGP</option>
                  <option value="SAR">SAR</option>
                  <option value="AED">AED</option>
                </select>
              </li>
              <li>
                <select name="" id="">
                  <option value="ar">العربيه</option>
                  <option value="en">English</option>
                </select>
              </li>
            </ul>
          </div>
          {/*main navigation in  Navbar*/}
          <nav className="flex py-5 justify-between items-center">
            <h1>
              <Link to={`/`}>
                <img src={FreshCartLogo} alt="fresh cart logo" />
              </Link>
            </h1>
            <form onSubmit={handleSearch} className="relative hidden lg:block">
              <input
                type="text"
                placeholder="Search for products"
                className="form-control min-w-96"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-1/2 "
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
            <ul className="hidden lg:flex items-center gap-8">
              <li>
                <NavLink
                  to={`wishlist`}
                  className={({ isActive }) => {
                    return `${
                      isActive ? "text-primary-600" : ""
                    } flex  gap-2 hover:text-primary-600 transition-colors duration-200`;
                  }}
                >
                  <FontAwesomeIcon className="text-xl" icon={faHeart} />
                  <span className="text-sm">Wishlist</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`cart`}
                  className={({ isActive }) => {
                    return `${
                      isActive ? "text-primary-600" : ""
                    } flex  gap-2 hover:text-primary-600 transition-colors duration-200`;
                  }}
                >
                  <div className="relative">
                    <FontAwesomeIcon
                      className="text-xl"
                      icon={faCartShopping}
                    />
                    <span className="absolute -right-1 top-0 -translate-y-1/2 size-5 flex justify-center items-center rounded-full bg-primary-600 text-white text-sm ">
                      {isLoading ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                      ) : (
                        CartInfo?.numOfCartItems ?? 0
                      )}
                    </span>
                  </div>
                  <span className="text-sm">Cart</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`account`}
                  className={({ isActive }) => {
                    return `${
                      isActive ? "text-primary-600" : ""
                    } flex  gap-2 hover:text-primary-600 transition-colors duration-200`;
                  }}
                >
                  <FontAwesomeIcon className="text-xl" icon={faCartShopping} />
                  <span className="text-sm">Account</span>
                </NavLink>
              </li>
              {!token ? (
                <>
                  <li>
                    <NavLink
                      to={`signup`}
                      className={({ isActive }) => {
                        return `${
                          isActive ? "text-primary-600" : ""
                        } flex  gap-2 hover:text-primary-600 transition-colors duration-200`;
                      }}
                    >
                      <FontAwesomeIcon className="text-xl" icon={faUser} />
                      <span className="text-sm">Sign up</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`login`}
                      className={({ isActive }) => {
                        return `${
                          isActive ? "text-primary-600" : ""
                        } flex  gap-2 hover:text-primary-600 transition-colors duration-200`;
                      }}
                    >
                      <FontAwesomeIcon
                        className="text-xl"
                        icon={faAddressCard}
                      />
                      <span className="text-sm">Login</span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <li
                  className="cursor-pointer flex  gap-2 hover:text-primary-600 transition-colors duration-200 "
                  onClick={logOut}
                >
                  <FontAwesomeIcon
                    className="text-xl"
                    icon={faRightFromBracket}
                  />
                  <span className="text-sm">Logout</span>
                </li>
              )}
            </ul>
            <button
              className="btn lg:hidden bg-green-600 text-white rounded-md  "
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </nav>
        </div>
        {/*categories navigation*/}
        <nav className="hidden lg:block bg-gray-100 py-4  ">
          <div className="container flex gap-8 items-center  ">
            <div className=" relative group ">
              <button className="btn flex items-center gap-3 bg-primary-600 text-white hover:bg-primary-600/90 ">
                <FontAwesomeIcon icon={faBars} />
                <span> all Categories</span>
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
              <menu className="hidden group-hover:block z-30 absolute top-11 min-w-60 *:px-3 *:py-3 *:hover:bg-gray-100 rounded-lg bg-white shadow text-black divide-y-2 divide-gray-300/20">
                <li className="flex flex-col gap-2">
                  {categories
                    .filter((cat) =>
                      [
                        "Men's Fashion",
                        "Women's Fashion",
                        "Electronics",
                      ].includes(cat.name)
                    )
                    .map((category) => (
                      <Link
                        key={category._id}
                        to={`/category/${category._id}`}
                        className="flex gap-2 items-center rounded transition px-2 py-2 hover:bg-primary-50 hover:text-primary-700 hover:font-medium"
                      >
                        <FontAwesomeIcon
                          className="text-primary-600 text-xl"
                          fixedWidth
                          icon={faPerson}
                        />
                        <span className="font-normal">{category.name}</span>
                      </Link>
                    ))}
                </li>

                <li>
                  <Link className="flex gap-2 items-center" to="/categories">
                    <FontAwesomeIcon
                      className="text-primary-600 text-xl"
                      fixedWidth
                      icon={faEllipsis}
                    />
                    <span className="font-normal">View All Categories</span>
                  </Link>
                </li>
              </menu>
            </div>
            <ul className="flex gap-5   ">
              <li>
                <NavLink to={`/`}>Home</NavLink>
              </li>
              <li>
                <NavLink to={`/categories`}>Categories</NavLink>
              </li>
              <li>
                <NavLink to={`/search-product`}>Search Products</NavLink>
              </li>

              <li>
                <NavLink to={`/brands`}>Brands</NavLink>
              </li>
            </ul>
          </div>
        </nav>

        {/* offcanvas*/}
        {isMenuOpen && (
          <>
            <div
              className=" background fixed inset-0 z-30  bg-black/50"
              onClick={toggleMenu}
            ></div>
            <div className="offcanves animate-slide-in cursor-pointer  space-y-5 fixed z-40 bg-white top-0 bottom-0 p-5  ">
              <div className="border-b-1 pb-4 border-gray-300/50 flex justify-between items-center">
                <img src={FreshCartLogo} alt="fresh cart logo" />

                <button
                  className="btn bg-green-600 rounded-md  "
                  onClick={toggleMenu}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <search className="relative ">
                <input
                  type="text"
                  placeholder="Search for products"
                  className="form-control min-w-96"
                />
                <FontAwesomeIcon
                  className="absolute right-2 top-1/2 -translate-1/2 "
                  icon={faMagnifyingGlass}
                />
              </search>
              <div>
                <h2 className="text-xl font-bold">Main Menu</h2>
                <ul className=" *:hover:bg-gray-100 transition-colors duration-300 space-y-3 mt-3">
                  <li>
                    <NavLink
                      to={`wishlist`}
                      className={({ isActive }) => {
                        return `${
                          isActive ? "bg-primary-100" : ""
                        } flex  gap-2 transition-colors duration-200 py-3 px-2`;
                      }}
                    >
                      <FontAwesomeIcon className="text-xl" icon={faHeart} />
                      <span className="text-sm">Wishlist</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`cart`}
                      className={({ isActive }) => {
                        return `${
                          isActive ? "bg-primary-100" : ""
                        } flex  gap-2 transition-colors duration-200 py-3 px-2`;
                      }}
                    >
                      <div className="relative">
                        <FontAwesomeIcon
                          className="text-xl"
                          icon={faCartShopping}
                        />
                        <span className="absolute -right-1 top-0 -translate-y-1/2 size-5 flex justify-center items-center rounded-full bg-primary-600 text-white text-sm ">
                          {isLoading ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                          ) : (
                            CartInfo?.numOfCartItems ?? 0
                          )}
                        </span>
                      </div>
                      <span className="text-sm">Cart</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`account`}
                      className={({ isActive }) => {
                        return `${
                          isActive ? "bg-primary-100" : ""
                        } flex  gap-2 transition-colors duration-200 py-3 px-2`;
                      }}
                    >
                      <FontAwesomeIcon className="text-xl" icon={faUser} />
                      <span className="text-sm">Account</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="border-t-1 border-gray-300/50 pt-5">
                <h2 className="text-xl font-bold">Account</h2>
                <ul className=" *:hover:bg-gray-100 transition-colors duration-300 space-y-3 mt-3">
                  {!token ? (
                    <>
                      <li>
                        <NavLink
                          to={`signup`}
                          className={({ isActive }) => {
                            return `${
                              isActive ? "bg-primary-100" : ""
                            } flex  gap-2 transition-colors duration-200 py-3 px-2`;
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-xl"
                            icon={faUserPlus}
                          />
                          <span className="text-sm">Sign up</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={`login`}
                          className={({ isActive }) => {
                            return `${
                              isActive ? "bg-primary-100" : ""
                            } flex  gap-2 transition-colors duration-200 py-3 px-2`;
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-xl"
                            icon={faAddressCard}
                          />
                          <span className="text-sm">Login</span>
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <li
                      className="cursor-pointer flex  gap-2 transition-colors duration-200 py-3 px-2 "
                      onClick={logOut}
                    >
                      <FontAwesomeIcon
                        className="text-xl"
                        icon={faRightFromBracket}
                      />
                      <span className="text-sm">Logout</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
