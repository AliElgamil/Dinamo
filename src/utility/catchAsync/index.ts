/* eslint-disable @typescript-eslint/no-explicit-any */

import { toastifyBox } from "../../helpers/toastifyBox";

export const catchAsync = (fn: any, errFn: () => void = () => {}) => {
  return (values: any) => {
    Promise.resolve(fn(values)).catch((err: Error) => {
      const { message } = err;
      console.log(err);
      toastifyBox("error", message);
      errFn();
    });
  };
};
