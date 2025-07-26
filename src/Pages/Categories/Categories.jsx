import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCheck,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../Components/Loading/Loading";
import { CategoriesContext } from "../../context/Categories.context";
import { Link } from "react-router-dom";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import SubCategories from "../../Components/SubCategories/SubCategories";
import catImage from "../../assets/images/brands.png";
import { SubCategoriesContext } from "../../context/subCategories.contex";

export default function Categories() {
  return (
    <section>
      <div className="container">
        <div className="py-4">
          <h1 className="text-3xl text-black font-bold py-4">
            Shop by Categories
          </h1>
          <p className="text-gray-500 pb-3">
            Browse our wide selection of fresh products by category
          </p>
        </div>
      </div>
      <section className="bg-gray-100 py-4 ">
        <CategoryCard />
      </section>
      <section className="bg-white py-6">
        <SubCategories />
      </section>
      <section className="bg-gray-100 py-4">
        <div className="container">
          <div className="bg-green-50 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <p className="text-green-600 text-sm font-semibold">
                Featured Category
              </p>
              <h3 className="text-xl font-bold">Organic Fruits & Vegetables</h3>
              <p className="text-gray-600 max-w-md">
                Discover our wide range of certified organic produce, sourced
                from local farms and delivered fresh to your doorstep.
              </p>
              <ul className="text-green-700 text-sm space-y-1">
                <li>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="mr-2 text-green-500"
                  />
                  100% Certified Organic
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="mr-2 text-green-500"
                  />
                  Locally Sourced When Available
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="mr-2 text-green-500"
                  />
                  No Pesticides or Harmful Chemicals
                </li>
              </ul>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
                Explore Category
              </button>
            </div>
            <img
              src={catImage}
              alt="Organic"
              className="w-full md:w-auto rounded-lg"
            />
          </div>
        </div>
      </section>
      {/* Newsletter */}
      <NewsLetter />
    </section>
  );
}
