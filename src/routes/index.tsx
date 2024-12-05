import { lazy } from "react";
import { Route, Routes } from "react-router";
import MainLayout from "../layout/main";

const Post = lazy(() => import("../pages/posts"));
export default function RoutesComponents() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Post />} />
      </Route>
    </Routes>
  );
}
