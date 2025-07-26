import { apiClient } from "./api-client";

export async function getAllProducts({
  page,
  keyword,
  priceGreaterThan,
  PriceLessThan,
  sortedBy,
  category,
  brand,
} = {}) {
  try {
    const options = {
      url: `/api/v1/products?${page ? `page=${page}` : ""}${
        keyword ? `&keyword=${keyword}` : ""
      }${priceGreaterThan ? `&price[gte]=${priceGreaterThan}` : ""}${
        PriceLessThan ? `&Price[lte]=${PriceLessThan}` : ""
      }${sortedBy ? `&sort=${sortedBy}` : ""}${
        category ? `&category[in]=${category}` : ""
      }${brand ? `&brand=${brand}` : ""}`,
      method: "Get",
    };
    const response = await apiClient.request(options);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const options = {
      url: `/api/v1/products/${id}`,
      method: "Get",
    };
    const response = await apiClient.request(options);

    return response;
  } catch (error) {
    throw error;
  }
}
