import { useContext } from "react";
import Loading from "../Loading/Loading";
import ProductCard from "../ProductCard/ProductCard";
import { ProductsContext } from "../../context/Product.context";
export default function FeatureProducts() {
  const { products, isLoading, error, isError } = useContext(ProductsContext);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <section className="py-5">
        <div className="container">
          <h2 className="text-2xl font-bold mb-4">Featured products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4   ">
            {products.map((product) => (
              <ProductCard key={product.id} productInfo={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
