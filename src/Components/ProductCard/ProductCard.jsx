import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCodeCompare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { calcDiscount } from "../../../utils/discount";
import Rating from "../Rating/Rating";
import { Link } from "react-router";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { WishlistContext } from "../../context/Wishlist.context";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

export default function ProductCard({ productInfo }) {
  const {
    _id,
    imageCover,
    price,
    priceAfterDiscount,
    ratingsQuantity,
    ratingsAverage,
    title,
    category,
  } = productInfo;
  const [isInWishlist, setIsInWishlist] = useState(false);

  const { handleAddingProductToCart } = useContext(CartContext);
  const {
    wishlist,
    handleAddingProductToWishlist,
    handleRemoveItemFromWishlist,
  } = useContext(WishlistContext);
  const toggleWishlist = async () => {
    if (isInWishlist) {
      await handleRemoveItemFromWishlist({
        id: productInfo._id,
        silent: false,
      });
    } else {
      await handleAddingProductToWishlist({
        id: productInfo._id,
        silent: false,
      });
    }
    setIsInWishlist(!isInWishlist);
  };

  useEffect(() => {
    // تحقق إذا المنتج موجود في قائمة المفضلة
    const isInList = wishlist?.some((item) => item._id === _id);
    setIsInWishlist(isInList);
  }, [wishlist, _id]);

  return (
    <>
      <div className="card  bg-white shadow-lg relative rounded-xl  overflow-hidden ">
        <div>
          <Link to={`/product/${_id}`} className="block">
            <img
              src={imageCover}
              alt="img"
              className="mx-auto max-w-40 max-h-60"
            />
          </Link>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <span className="text-sm text-gray-500">{category.name}</span>
            <h2 className="font-semibold ">
              <Link to={`/product/${_id}`} className="line-clamp-1">
                {title}
              </Link>
            </h2>
            <div className="rating flex gap-2 items-center">
              <Rating rating={ratingsAverage} />
              <span>{ratingsAverage}</span>
              <span>({ratingsQuantity})</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="price space-x-2">
                <span className="text-lg text-primary-600">
                  {priceAfterDiscount ? priceAfterDiscount : price} EGP
                </span>
                {priceAfterDiscount && (
                  <del className="text-gray-500">{price} EGP</del>
                )}
              </div>
              <button
                className="btn hover:text-primary-700 p-0 size-8 bg-primary-600 text-white rounded-full"
                onClick={() => {
                  handleAddingProductToCart({ id: _id });
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>
        <div className="action *:text-gray-500 *:hover:text-primary-600 *:transition-colors *:duration-200 flex flex-col gap-4 top-4 right-2 absolute ">
          <button onClick={toggleWishlist} className="wishlist-btn">
            <FontAwesomeIcon
              icon={isInWishlist ? solidHeart : regularHeart}
              style={{ color: isInWishlist ? "red" : "gray" }}
            />
          </button>

          <button>
            <FontAwesomeIcon icon={faCodeCompare} />
          </button>
          <button>
            <Link to={`/products/${_id}`}>
              <FontAwesomeIcon icon={faEye} />
            </Link>
          </button>
        </div>
        {priceAfterDiscount && (
          <span className="badge top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md absolute">
            -{calcDiscount({ price, priceAfterDiscount })}%
          </span>
        )}
      </div>
    </>
  );
}
