import { apiClient } from "./api-client";

export async function addProductToWishlist({ id }) {
  try {
    const options = {
      url: "/api/v1/wishlist",
      method: "POST",
      data: {
        productId: id,
      },
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getWishlistItem() {
  try {
    const options = {
      url: "/api/v1/wishlist",
      method: "GET",
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function removeItemFromWishlist({ id }) {
  try {
    const options = {
      url: `/api/v1/wishlist/${id}`,
      method: "DELETE",
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
