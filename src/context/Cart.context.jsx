import { createContext, useContext, useEffect, useState } from "react";
import {
  addProductToCart,
  getCartItem,
  removeItemFromCart,
  updateProductItemQuantity,
} from "../../services/cart-service";
import { toast } from "react-toastify";
import { AuthContext } from "./Auth.context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [CartInfo, setCartInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  // * Fetch all products in the cart
  async function handleFetchCartItem() {
    try {
      setIsLoading(true);
      const response = await getCartItem();
      if (response.success) {
        setIsLoading(false);
        setCartInfo(response.data);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error);
    }
  }

  // * Add a product to the cart
  async function handleAddingProductToCart({ id, silent = false }) {
    try {
      setIsLoading(true);
      const response = await addProductToCart({ id });

      if (response.success) {
        setCartInfo(response.data);
        if (!silent) {
          toast.success(response.data.message); // ✅ Show toast only if not silent
        }
        setIsLoading(false);
        handleFetchCartItem(); // Refresh cart list
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error);
      if (!silent) {
        toast.error("Failed to add product to cart"); // ✅ Show error only if not silent
      }
    }
  }

  // ! Remove a product from the cart
  async function handleRemoveItemFromCart({ id, silent = false }) {
    try {
      let confirmed = true;

      if (!silent) {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        });
        confirmed = result.isConfirmed;
      }

      if (confirmed) {
        const toastId = !silent && toast.loading("Removing item from cart...");
        const response = await removeItemFromCart({ id });

        if (response.success) {
          if (!silent) toast.dismiss(toastId);
          setCartInfo(response.data);
          handleFetchCartItem(); // Refresh cart list after deletion
        }
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error);
      if (!silent) toast.error("Failed to remove item from cart");
    }
  }

  // * Update product quantity in the cart
  async function handleUpdateProductItemQuantity({ id, count }) {
    try {
      const toastId = toast.loading("Updating item quantity...");
      const response = await updateProductItemQuantity({ id, count });

      if (response.success) {
        toast.dismiss(toastId);
        setCartInfo(response.data);
        handleFetchCartItem(); // Refresh cart list after update
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error);
    }
  }

  useEffect(() => {
    handleFetchCartItem();
  }, []);

  useEffect(() => {
    if (token) {
      handleFetchCartItem();
    } else {
      setCartInfo(null); // Clear cart on logout
    }
  }, [token]); // Watch for token changes

  return (
    <CartContext.Provider
      value={{
        CartInfo,
        isLoading,
        isError,
        error,
        handleAddingProductToCart,
        handleRemoveItemFromCart,
        handleUpdateProductItemQuantity,
        refreshCart: handleFetchCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
