import { createContext, useEffect, useState } from "react";
import { getAllProducts } from "../../services/products-service";

export const ProductsContext = createContext(); // ❗ خليه named

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(false);

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const response = await getAllProducts();
      if (response.success) {
        setIsLoading(false);
        setProducts(response.data.data);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setError(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ isLoading, products, isError, error }}>
      {children}
    </ProductsContext.Provider>
  );
}
