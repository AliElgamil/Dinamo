/* eslint-disable @typescript-eslint/no-explicit-any */

export function handleError(error: any) {
  let errorSchema: Error & { code?: number } = {
    message: "",
    code: 0,
    name: "",
  };

  if (error.response) {
    // The request was made and the server responded with a status code
    errorSchema = {
      ...errorSchema,
      code: error.response.status,
      message: error.response.data.details || "Internal Server Error",
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    errorSchema = {
      ...errorSchema,
      message: error.message || "Internal Server Error",
    };
  }

  return errorSchema;
}
