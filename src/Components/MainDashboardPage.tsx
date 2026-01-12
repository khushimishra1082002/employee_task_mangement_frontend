import React, { useState } from "react";
import DashboardHeader from "../Components/DashboardHeader";
import DashboardSidebar from "../Components/DashboardSidebar";
import { Outlet } from "react-router-dom";

const MainDashboardPage: React.FC = () => {

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="relative min-h-screen flex w-[100vw] max-w-[100vw] lg:flex overflow-hidden">
        {/* Sidebar */}
        <div className="">
          <DashboardSidebar open={open} setOpen={setOpen} />
        </div>

        <div className="relative z-0 lg:flex-grow w-full overflow-hidden ">
          {/* Header */}
          <header className=" duration-300 h-[10vh] w-full sticky top-0 ">
            <DashboardHeader  open={open} setOpen={setOpen} />
          </header>

          {/* MainBody */}
          <div className=" h-[90vh] overflow-auto scrollbar-thumb-primary
           scrollbar-thin p-3  bg-gray-100 max-w-[calc(100% - 60px)] ">
            {/* All content Goes Here */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDashboardPage;


