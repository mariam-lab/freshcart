import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as regularHeart,
  faMinus,
  faPlus,
  faShareNodes,
  faCartShopping,
  faArrowRotateLeft,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { calcDiscount } from "../../../utils/discount";
import Rating from "../Rating/Rating";
import ReactImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { WishlistContext } from "../../context/Wishlist.context";
export default function ProductInfo({ productDetails }) {
  const {
    id,
    title,
    category,
    description,
    images,
    price,
    priceAfterDiscount,
    ratingsAverage,
    quantity,
    ratingsQuantity,
  } = productDetails;
  const { handleAddingProductToCart } = useContext(CartContext);
  const { handleAddingProductToWishlist } = useContext(WishlistContext);
  return (
    <section id="product-detail" className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div id="product-images" className="lg:w-96">
            <div className="bg-white rounded-lg overflow-hidden mb-4">
              <ReactImageGallery
                showNav={false}
                showFullscreenButton={false}
                showPlayButton={false}
                items={images.map((image) => {
                  return {
                    original: image,
                    thumbnail: image,
                  };
                })}
              />
            </div>
          </div>

          {/* Product Info */}
          <div id="product-info" className="lg:w-3/5">
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between mb-4">
                <span
                  className={`${
                    quantity > 0
                      ? "bg-primary-100 text-primary-700"
                      : "bg-red-100 text-red-700"
                  }"text-sm px-2 py-1 rounded"`}
                >
                  {quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-primary-600">
                    <FontAwesomeIcon icon={faShareNodes} />
                  </button>
                  <button
                    id="wishlist-button"
                    className="text-gray-500 hover:text-primary-600"
                    onClick={() => {
                      handleAddingProductToWishlist({ id });
                    }}
                  >
                    <FontAwesomeIcon icon={regularHeart} />
                  </button>
                </div>
              </div>

              <h1 className="text-2xl font-bold mb-2">{title} </h1>

              <div className="flex items-center mb-4">
                <div className="flex text-amber-400 mr-2 space-x-1">
                  <Rating rating={ratingsAverage} />
                </div>
                <span className="text-sm text-gray-600">
                  {ratingsAverage} ({ratingsQuantity} reviews)
                </span>
              </div>

              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-gray-900 mr-3">
                  {priceAfterDiscount || price} EGP
                </span>
                {priceAfterDiscount ? (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {price}EGP
                    </span>
                    <span className="ml-3 text-sm bg-red-100 text-red-700 px-2 py-1 rounded">
                      Save {calcDiscount({ price, priceAfterDiscount })}%
                    </span>
                  </>
                ) : (
                  ""
                )}
              </div>

              <p className="text-gray-700 mb-6">{description}</p>

              {/* Quantity */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="w-24 text-gray-700 font-medium">
                    Quantity:
                  </div>
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      id="decrease-qty"
                      className="px-3 py-2 text-gray-600 hover:text-primary-600"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                      type="number"
                      defaultValue={1}
                      min={1}
                      className="w-12 text-center border-0 focus:ring-0 focus:outline-none"
                      id="quantity"
                    />
                    <button
                      id="increase-qty"
                      className="px-3 py-2 text-gray-600 hover:text-primary-600"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <div className="ml-4 text-sm text-gray-600">
                    <span className="font-medium">Only {quantity} items</span>{" "}
                    left in stock
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 mb-6">
                <button
                  id="add-to-cart"
                  className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition"
                  onClick={() => handleAddingProductToCart({ id })}
                >
                  <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
                  Add to Cart
                </button>
                <button
                  id="buy-now"
                  className="flex-1 border border-gray-300 bg-white text-gray-800 py-3 px-6 rounded-lg font-medium hover:border-primary-600"
                >
                  Buy Now
                </button>
              </div>

              {/* Info Grid */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faTruck} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Free Delivery
                      </h4>
                      <p className="text-sm text-gray-600">
                        Free shipping on orders over $50
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faArrowRotateLeft} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        30 Days Return
                      </h4>
                      <p className="text-sm text-gray-600">
                        Satisfaction guaranteed or money back
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
