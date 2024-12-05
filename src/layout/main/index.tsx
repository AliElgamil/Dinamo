import { Suspense } from "react";
import { Outlet } from "react-router";
import Loading from "../../components/loading";
import Navbar from "../../components/navbar";

export default function MainLayout() {
  return (
    <div className="grid gap-8 grid-cols-1">
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Outlet />
      </Suspense>
    </div>
  );
}
