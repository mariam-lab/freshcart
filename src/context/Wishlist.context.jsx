import { createContext, useEffect, useState } from "react";
import {
  addProductToWishlist,
  getWishlistItem,
  removeItemFromWishlist,
} from "../../services/wishlist-service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import { useContext } from "react";
import { CartContext } from "./Cart.context";
import { AuthContext } from "./Auth.context";

export const WishlistContext = createContext(null);
const MySwal = withReactContent(Swal);

export function WishlistProvider({ children }) {
  const { handleFetchCartItem } = useContext(CartContext);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  async function fetchWishlist() {
    try {
      setIsLoading(true);
      const response = await getWishlistItem();
      if (response.success) {
        setWishlist(response.data.data);
      }
    } catch (error) {
      setError(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  // Add a product to the wishlist
  async function handleAddingProductToWishlist({ id, silent = false }) {
    try {
      setIsLoading(true);
      const response = await addProductToWishlist({ id });
      if (response.success) {
        await fetchWishlist();
        if (!silent) toast.success(response.data.message);
      }
    } catch (error) {
      setIsError(true);
      setError(error);
      if (!silent) toast.error("Failed to add item to wishlist");
    } finally {
      setIsLoading(false);
    }
  }

  // Remove item from wishlist
  async function handleRemoveItemFromWishlist({ id, silent = false }) {
    try {
      let proceed = true;
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
        proceed = result.isConfirmed;
      }

      if (proceed) {
        const toastId = !silent
          ? toast.loading("Removing item from wishlist...")
          : null;
        const response = await removeItemFromWishlist({ id });

        if (response.success) {
          await fetchWishlist();
          if (!silent && toastId) toast.dismiss(toastId);
        }
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error);
      if (!silent) toast.error("Failed to remove item from Wishlist");
    }
  }

  async function handleRemoveAllFromWishlist({ silent = false } = {}) {
    try {
      const clonedWishlist = [...wishlist];

      await Promise.all(
        clonedWishlist.map((item) =>
          removeItemFromWishlist({ id: item._id, silent: true })
        )
      );

      if (!silent)
        toast.success("All items have been removed from your wishlist.");
      fetchWishlist();
    } catch (error) {
      console.error("Error while removing all items from wishlist:", error);
      if (!silent) toast.error("Failed to remove all items from the wishlist.");
    }
  }

  useEffect(() => {
    if (token) {
      fetchWishlist();
    }
  }, []);
  useEffect(() => {
    if (token) {
      fetchWishlist();
    } else {
      setWishlist(null); // Clear wishlist on logout
    }
  }, [token]); // Watch for token changes
  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isLoading,
        isError,
        error,
        handleRemoveItemFromWishlist,
        handleAddingProductToWishlist,
        handleRemoveAllFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
