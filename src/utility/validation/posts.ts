import * as yup from "yup";

export const postSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  body: yup
    .string()
    .required("Body is required")
    .min(10, "Body must be at least 10 characters"),
});
