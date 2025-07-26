import { apiClient } from "./api-client";

export async function sendDataToSignup(values) {
  try {
    const options = {
      method: "post",
      url: `/api/v1/auth/signup`,
      data: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        rePassword: values.rePassword,
      },
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function sendDataToLogin(values) {
  try {
    const options = {
      method: "post",
      url: `/api/v1/auth/signin`,
      data: {
        email: values.email,
        password: values.password,
      },
    };
    const response = await apiClient.request(options);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
