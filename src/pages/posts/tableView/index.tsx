import { Table, TableProps } from "antd";
import UpdatePost from "../../../features/updatePost";
import { useMemo } from "react";
import DeletePost from "../../../features/deletePost";

export default function TableView({
  tableData,
  loading,
  setData,
}: {
  tableData: Post[];
  loading: boolean;
  setData: React.Dispatch<React.SetStateAction<Post[] | undefined>>;
}) {
  const columns: TableProps<Post>["columns"] = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Body",
        dataIndex: "body",
        key: "body",
      },
      {
        title: "",
        render: (_, row) => {
          return (
            <div className="flex gap-4">
              <UpdatePost post={row} setData={setData} />
              <DeletePost postId={row.id} setData={setData} />
            </div>
          );
        },
      },
    ],
    [setData]
  );
  return (
    <div className="overflow-x-auto">
      <Table<Post>
        columns={columns}
        dataSource={tableData}
        loading={loading}
        scroll={{
          x: "800px",
        }}
      />
    </div>
  );
}
