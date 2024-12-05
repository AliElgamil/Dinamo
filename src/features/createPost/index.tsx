import { Button, Modal } from "antd";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import { postSchema } from "../../utility/validation/posts";
import InputText from "../../components/form/inputText";
import Textarea from "../../components/form/textarea";
import { catchAsync } from "../../utility/catchAsync";
import { toastifyBox } from "../../helpers/toastifyBox";
import axiosInstant from "../../utility/axiosInstant";
import { POST_API } from "../../services/posts";

export default function CreatePost({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<Post[] | undefined>>;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      body: "",
      userId: 1,
    },
    validationSchema: postSchema,
    onSubmit: catchAsync(
      async (values: { title: string; body: string }) => {
        setLoading(true);
        const { data } = await axiosInstant.post(POST_API.POST, values);

        setData((prev) => [data, ...(prev || [])]);
        resetForm();
        setOpen(false);
        toastifyBox("success", "Post created successfully");
      },
      () => {
        setLoading(false);
      }
    ),
  });

  const toggleModal = useCallback(() => {
    setOpen((prev) => !prev);
    setLoading(false);
  }, []);

  return (
    <>
      <Button type="primary" onClick={toggleModal}>
        Create New Post
      </Button>
      <Modal
        title="Create New Post"
        open={open}
        onCancel={toggleModal}
        okButtonProps={{
          hidden: true,
        }}
        cancelButtonProps={{
          hidden: true,
        }}
      >
        <form onSubmit={handleSubmit} className="grid gap-4">
          <InputText
            placeholder="Enter Post title"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            error={!!(errors.title && touched.title)}
            errorText={errors.title}
          />

          <Textarea
            placeholder="Enter Post body"
            name="body"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.body}
            error={!!(errors.body && touched.body)}
            errorText={errors.body}
          />

          <div className="flex justify-end gap-2">
            <Button onClick={toggleModal} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              disabled={loading}
              loading={loading}
            >
              Create
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
