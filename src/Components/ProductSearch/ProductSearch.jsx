import { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { ProductsContext } from "../../context/Product.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router";
export default function ProductSearch() {
  const { products, isLoading, error, isError } = useContext(ProductsContext);
  const [filteredproducts, setFilteredproducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("A-Z");
  const productsPerPage = 8;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQueryFromURL = queryParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(searchQueryFromURL);
  useEffect(() => {
    setSearchInput(searchQueryFromURL);
  }, [searchQueryFromURL]);

  useEffect(() => {
    let filtered = products;

    // filter
    if (searchInput.trim()) {
      filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    // sort
    if (sortOption === "A-Z") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "Z-A") {
      filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredproducts(filtered);
    setCurrentPage(1); // reset to first page after filter/sort change
  }, [searchInput, products, sortOption]);

  // Pagination
  const totalPages = Math.ceil(filteredproducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentproducts = filteredproducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <>
      <>
        <section>
          <div className="container py-8">
            <h2 className="text-2xl font-bold mb-4">Search products</h2>
            <div className="my-4 flex items-center justify-between">
              <div className="relative w-full max-w-md">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full border pl-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <span className="text-primary-600">Sort by:</span>
                <select
                  className="ml-4 border py-2 px-3 rounded-md"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)} // 👈 update state
                >
                  <option value="A-Z">Alphabetical: A-Z</option>
                  <option value="Z-A">Alphabetical: Z-A</option>
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentproducts.map((product) => (
                <ProductCard key={product.id} productInfo={product} />
              ))}
            </div>
            {/* Pagination */}
            {!searchInput && totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === i + 1 ? "bg-green-500 text-white" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </section>
      </>
    </>
  );
}
