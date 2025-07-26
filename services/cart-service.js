import { apiClient } from "./api-client";

export async function addProductToCart({ id }) {
  try {
    const options = {
      url: "/api/v1/cart",
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

export async function getCartItem() {
  try {
    const options = {
      url: "/api/v1/cart",
      method: "GET",
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function removeItemFromCart({ id }) {
  try {
    const options = {
      url: `/api/v1/cart/${id}`,
      method: "DELETE",
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateProductItemQuantity({ id, count }) {
  try {
    const options = {
      url: `/api/v1/cart/${id}`,
      method: "PUT",
      data: {
        count,
      },
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
