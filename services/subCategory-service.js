import { apiClient } from "./api-client";

export async function getAllSubCategories() {
  try {
    const options = {
      method: "GET",
      url: `/api/v1/subcategories`,
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
