import { Outlet } from "react-router-dom";
import Error from "../error";
import Navbar from "../navbar";

export default function Layout() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <Outlet />
      <Error />
    </div>
  );
}
