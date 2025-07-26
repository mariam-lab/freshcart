import React, { useContext } from "react";
import { WishlistContext } from "../../context/Wishlist.context";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom"; // ✅ صحح هنا
import Rating from "../Rating/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading/Loading";

export default function WishlistItem() {
  const {
    wishlist,
    isLoading,
    isError,
    error,
    handleRemoveItemFromWishlist,
    handleRemoveAllFromWishlist,
    handleAddAllToCart,
  } = useContext(WishlistContext);
  const wishlistCount = wishlist?.length || 0;
  if (isLoading) return <Loading />;

  const { handleAddingProductToCart } = useContext(CartContext);
  const handleAddToCartAndRemove = async (id) => {
    try {
      await handleAddingProductToCart({ id, silent: true });
      await handleRemoveItemFromWishlist({ id, silent: true });
    } catch (error) {
      console.error(
        "Error while adding to cart and removing from wishlist",
        error
      );
    }
  };

  if (isError)
    return (
      <p className="text-center text-red-500">
        {error?.message || "Error loading wishlist"}
      </p>
    );

  return (
    <>
      <section className="bg-gray-100 py-9">
        <div className="container bg-white rounded-lg">
          <h3 className="text-2xl font-bold text-black py-4 mb-5">
            My Wishlist
          </h3>
          <p className="mb-4">{wishlistCount} items in your wishlist</p>
          {wishlist.length > 0 && (
            <div className="flex gap-4 mb-5">
              <button
                onClick={handleRemoveAllFromWishlist}
                className="btn bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2"
              >
                Delete All
              </button>
            </div>
          )}

          {Array.isArray(wishlist) && wishlist.length > 0 ? (
            wishlist.map((item) => {
              const {
                _id,
                imageCover,
                title,
                category,
                ratingsAverage,
                ratingsQuantity,
                price,
                priceAfterDiscount,
              } = item;

              return (
                <div
                  key={_id}
                  className="wishlistItem grid grid-cols-1 border-t-1 border-gray-300  md:grid-cols-12 p-3 bg-white  overflow-hidden relative "
                >
                  <div className="flex  col-span-8 ">
                    <div>
                      <Link to={`/product/${_id}`}>
                        <img
                          src={imageCover}
                          alt={title}
                          className="mx-auto max-w-40 max-h-60"
                        />
                      </Link>
                    </div>
                    <div className="p-4 space-y-3 ">
                      <span className="text-sm text-gray-500">
                        {category?.name}
                      </span>
                      <h2 className="font-semibold line-clamp-1">
                        <Link to={`/product/${_id}`}>{title}</Link>
                      </h2>
                      <div className="rating flex gap-2 items-center">
                        <Rating rating={ratingsAverage} />
                        <span>{ratingsAverage}</span>
                        <span>({ratingsQuantity})</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="price space-x-2">
                          <span className="text-lg text-primary-600 font-semibold">
                            {priceAfterDiscount || price} EGP
                          </span>
                          {priceAfterDiscount && (
                            <del className="text-gray-500">{price} EGP</del>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 text-end">
                    <button
                      className="btn hover:text-primary-700 bg-primary-600 text-white rounded-lg"
                      onClick={() => handleAddToCartAndRemove(_id)}
                    >
                      Add TO Cart
                    </button>

                    <button
                      className="btn m-3"
                      onClick={() => handleRemoveItemFromWishlist({ id: _id })}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 py-6">
              No items in wishlist.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
