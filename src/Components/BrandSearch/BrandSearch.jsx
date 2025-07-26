import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { BrandsContext } from "../../context/Brands.context";

export default function BrandSearch() {
  const { brands, isLoading } = useContext(BrandsContext);
  const [searchInput, setSearchInput] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("A-Z");
  const brandsPerPage = 8;

  useEffect(() => {
    let filtered = brands;

    // filter
    if (searchInput.trim()) {
      filtered = brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    // sort
    if (sortOption === "A-Z") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "Z-A") {
      filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredBrands(filtered);
    setCurrentPage(1); // reset to first page after filter/sort change
  }, [searchInput, brands, sortOption]);

  // Pagination
  const totalPages = Math.ceil(filteredBrands.length / brandsPerPage);
  const startIndex = (currentPage - 1) * brandsPerPage;
  const currentBrands = filteredBrands.slice(
    startIndex,
    startIndex + brandsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      {/* Search + Sort */}
      <div className="my-4 flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search brands..."
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

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading ? (
          <p>Loading brands...</p>
        ) : currentBrands.length > 0 ? (
          currentBrands.map((brand, idx) => (
            <div key={idx} className="bg-gray-100 p-4 rounded-lg text-center">
              <div className=" w-full   rounded mb-2">
                <img src={brand.image} alt="" />
              </div>
              <div className="p-4 flex justify-between">
                <h4 className="text-lg font-semibold">{brand.name}</h4>

                <a
                  href="#"
                  className="btn text-green-600 text-sm mt-1 inline-block"
                >
                  View
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-red-500">
            No brands found.
          </p>
        )}
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
  );
}
