import { createContext, useEffect, useState } from "react";
import { getAllSubCategories } from "../../services/subCategory-service";
export const SubCategoriesContext = createContext(null);
export function SubCategoriesProvider({ children }) {
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  async function fetchSubCategories() {
    try {
      setIsLoading(true);
      const response = await getAllSubCategories();
      if (response.success) {
        setIsLoading(false);
        setSubCategories(response.data.data);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
      setIsError(true);
    }
  }

  useEffect(() => {
    fetchSubCategories();
  }, []);
  return (
    <SubCategoriesContext.Provider
      value={{ subCategories, isLoading, isError, error }}
    >
      {children}
    </SubCategoriesContext.Provider>
  );
}
