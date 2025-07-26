import { apiClient } from "./api-client";

export async function getAllBrands(limit) {
  try {
    const options = {
      method: "GET",
      url: `/api/v1/brands`,
      params: {},
    };

    if (limit) {
      options.params.limit = limit; // ✅ only send if defined
    }

    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getSpecificBrand(id) {
  try {
    const options = {
      method: "GET",
      url: `/api/v1/brands/${id}`,
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
