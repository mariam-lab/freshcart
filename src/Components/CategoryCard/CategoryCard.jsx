import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../Loading/Loading";
import { CategoriesContext } from "../../context/Categories.context";

export default function CategoryCard() {
  const { categories, isLoading, isError, error } =
    useContext(CategoriesContext);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-3 gap-6 py-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="rounded-lg overflow-hidden border border-gray-200 shadow-sm"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 ">
                <h2 className="text-lg font-semibold mb-1">{cat.name}</h2>
                <div className="flex gap-2 justify-between items-center flex-wrap text-primary-600">
                  <div className="space-x-4">
                    <span className="bg-primary-50 p-2">Organic</span>
                    <span className="bg-primary-50 p-2">fresh</span>
                  </div>
                  <Link>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
