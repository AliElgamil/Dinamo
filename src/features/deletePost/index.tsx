import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useCallback, useState } from "react";
import { catchAsync } from "../../utility/catchAsync";
import axiosInstant from "../../utility/axiosInstant";
import { POST_API } from "../../services/posts";
import { toastifyBox } from "../../helpers/toastifyBox";

export default function DeletePost({
  postId,
  setData,
}: {
  postId: number;
  setData: React.Dispatch<React.SetStateAction<Post[] | undefined>>;
}) {
  const [loading, setLoading] = useState(false);
  const deletePost = useCallback(() => {
    catchAsync(
      async () => {
        setLoading(true);
        await axiosInstant.delete(`${POST_API.POST}/${postId}`);
        setData((prev) => prev?.filter((post) => post.id !== postId));
        setLoading(false);
        toastifyBox("success", "Post deleted successfully");
      },
      () => {
        setLoading(false);
      }
    )(null);
  }, [postId, setData]);
  return (
    <Button
      color="danger"
      variant="solid"
      onClick={deletePost}
      disabled={loading}
      loading={loading}
    >
      <DeleteOutlined />
    </Button>
  );
}
