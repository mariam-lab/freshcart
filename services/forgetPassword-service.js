import { apiClient } from "./api-client";

export async function sendEmailToForegetPassword(email) {
  try {
    const options = {
      method: "post",
      url: `/api/v1/auth/forgotPasswords`,
      data: {
        email: email,
      },
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function verifyResetCode(resetCode) {
  try {
    const options = {
      method: "post",
      url: `/api/v1/auth/verifyResetCode`,
      data: {
        resetCode: resetCode,
      },
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function resetPassword(email, newPassword) {
  try {
    const options = {
      method: "PUT",
      url: `/api/v1/auth/resetPassword`,
      data: {
        email: email,
        newPassword: newPassword,
      },
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
