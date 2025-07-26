import { createContext, useEffect, useState } from "react";
import { getAllCategories } from "../../services/Category-service";
export const CategoriesContext = createContext(null);
export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  async function fetchCategories() {
    try {
      setIsLoading(true);
      const response = await getAllCategories();
      if (response.success) {
        setIsLoading(false);
        setCategories(response.data.data);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
      setIsError(true);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <CategoriesContext.Provider
      value={{ categories, isLoading, isError, error }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
