import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer"; // Optional

const AppLayout = () => {
  return (
    <>
      <Header />
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
