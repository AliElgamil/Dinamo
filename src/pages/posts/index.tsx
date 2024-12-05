import Title from "antd/es/typography/Title";
import TableView from "./tableView";
import { POST_API } from "../../services/posts";
import { Empty } from "antd";
import Loading from "../../components/loading";
import CreatePost from "../../features/createPost";
import useFetchData from "../../hooks/useFetch";

export default function Posts() {
  const { data, loading, error, setData } = useFetchData<Post[]>(POST_API.POST);

  if (error.message) {
    return (
      <div className="grid place-content-center">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        <p className="text-red-600">Something went wrong</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 grid gap-8 grid-cols-1">
      <div className="flex gap-4 justify-between items-center">
        <Title level={2} className="text-primary">
          Post
        </Title>
        <CreatePost setData={setData} />
      </div>
      {data?.length === 0 && !Loading ? (
        <Empty />
      ) : (
        <TableView tableData={data || []} loading={loading} setData={setData} />
      )}
    </div>
  );
}
