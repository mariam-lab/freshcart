import React, { useContext, useState } from "react";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "../Rating/Rating";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router";

export default function CartItem({ productInfo }) {
  const { count, price, product } = productInfo;
  const { id, imageCover, title, category, ratingsAverage } = product;
  console.log("CartItem productInfo", productInfo);

  const { handleRemoveItemFromCart, handleUpdateProductItemQuantity } =
    useContext(CartContext);
  const [isUpdating, setIsUpdating] = useState(false);
  async function handleUpdate({ id, count }) {
    setIsUpdating(true);
    await handleUpdateProductItemQuantity({ id, count });
    setIsUpdating(false);
  }
  return (
    <>
      <div
        className={`p-6 flex items-center space-x-4 ${
          isUpdating ? "opacity-50" : ""
        }`}
      >
        <Link to={`/product/${id}`} className="block">
          <img
            className="w-20 h-20 object-cover rounded-lg cursor-pointer"
            src={imageCover}
            alt={title}
          />
        </Link>

        <div className="flex-1">
          <Link to={`/product/${id}`} className="block">
            <h3 className="font-medium text-lg cursor-pointer">
              {category.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500">{title}</p>

          <div className="flex items-center mt-2">
            <div className="flex text-amber-400 text-sm">
              <Rating rating={ratingsAverage} />
            </div>
            <span className="text-xs text-gray-500 ml-2">{ratingsAverage}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              className="p-2 hover:bg-gray-100"
              onClick={() =>
                handleUpdate({
                  id,
                  count: count - 1,
                })
              }
            >
              <FontAwesomeIcon icon={faMinus} className="text-sm" />
            </button>
            <span className="px-4 py-2 border-x border-gray-300">{count}</span>
            <button
              className="p-2 hover:bg-gray-100"
              onClick={() =>
                handleUpdate({
                  id,
                  count: count + 1,
                })
              }
            >
              <FontAwesomeIcon icon={faPlus} className="text-sm" />
            </button>
          </div>

          <div className="w-28 text-center text-nowrap">
            <div className="text-lg font-bold">{price * count} EGP</div>
          </div>

          <button
            className="text-red-500 hover:text-red-700 p-2"
            onClick={() => handleRemoveItemFromCart({ id })}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </>
  );
}
