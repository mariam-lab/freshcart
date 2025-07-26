import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../Loading/Loading";
import { CategoriesContext } from "../../context/Categories.context";

export default function HomeCategories() {
  const { categories, isLoading, isError, error } =
    useContext(CategoriesContext);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Link
              to={`/categories`}
              className="flex gap-2 items-center text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              <span>View All Categories</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

          <div className="py-8 grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/category/${category._id}`}
                className="card cursor-pointer p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col gap-2 items-center bg-white "
              >
                <img
                  src={category.image}
                  alt=""
                  className="size-16 rounded-full object-cover"
                />
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
