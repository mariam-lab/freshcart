import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/Product.context";
import ProductCard from "../../Components/ProductCard/ProductCard";

export default function CategoryProducts() {
  const { id } = useParams(); // Get ID from URL
  const { products } = useContext(ProductsContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (id) {
      const filtered = products.filter(
        (product) => product.category?._id === id
      );
      setFilteredProducts(filtered);
    }
  }, [id, products]);

  return (
    <section className="container py-8">
      <h2 className="text-2xl font-bold mb-4 capitalize">
        Category Products: {filteredProducts[0]?.category?.name || "Unknown"}
      </h2>
      {filteredProducts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} productInfo={product} />
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </section>
  );
}
