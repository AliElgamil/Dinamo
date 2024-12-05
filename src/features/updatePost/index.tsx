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
import { EditOutlined } from "@ant-design/icons";

export default function UpdatePost({
  setData,
  post,
}: {
  post: Post;
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
      title: post.title,
      body: post.body,
      userId: post.userId,
    },
    validationSchema: postSchema,
    onSubmit: catchAsync(
      async (values: { title: string; body: string }) => {
        setLoading(true);
        const { data } = await axiosInstant.put(
          `${POST_API.POST}/${post.id}`,
          values
        );

        setData((prev) => prev?.map((p) => (p.id === post.id ? data : p)));
        resetForm();
        setOpen(false);
        toastifyBox("success", "Post updated successfully");
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
        <EditOutlined />
      </Button>
      <Modal
        title="Update Post"
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
              Update
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
