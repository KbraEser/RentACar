import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
