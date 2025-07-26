import { createContext, useEffect, useState } from "react";
import { getAllBrands } from "../../services/brands-service";
export const BrandsContext = createContext(null);
export function BrandsProvider({ children }) {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  async function fetchBrands() {
    try {
      setIsLoading(true);
      const response = await getAllBrands();
      if (response.success) {
        setIsLoading(false);
        setBrands(response.data.data);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
      setIsError(true);
    }
  }

  useEffect(() => {
    fetchBrands();
  }, []);
  return (
    <BrandsContext.Provider value={{ brands, isLoading, isError, error }}>
      {children}
    </BrandsContext.Provider>
  );
}
