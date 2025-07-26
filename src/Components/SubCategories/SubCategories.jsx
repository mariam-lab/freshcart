import React, { useContext } from "react";
import Loading from "../Loading/Loading";
import { SubCategoriesContext } from "../../context/subCategories.contex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAccessibleIcon } from "@fortawesome/free-brands-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function SubCategories() {
  const { subCategories, isLoading, isError, error } =
    useContext(SubCategoriesContext);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Popular Subcategories
        </h2>
        {/* Subcategories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {subCategories.slice(0, 4).map((sub) => (
            <div
              key={sub.name}
              className="bg-gray-50 rounded-lg px-6 py-6 flex flex-col items-center"
            >
              <div className="text-green-600 text-2xl mb-2 bg-primary-100 size-14 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faCartShopping} />
              </div>
              <p className="font-semibold text-sm">{sub.slug}</p>
              <p className="text-xs text-gray-500">50 items</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
