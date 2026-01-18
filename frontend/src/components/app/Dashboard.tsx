import { Navigate } from "react-router-dom";
import Content from "./Content";
import { SideBar } from "./SideBar";
import TopBar from "./TopBar";
import Cookies from "js-cookie";

const Dashboard = () => {
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="flex flex-row ">
      <div>
        <SideBar />
      </div>
      <div className="bg-[#f8fafb] min-h-screen w-screen h-full">
        <TopBar />
        <div>
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
