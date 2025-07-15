
import React, { ReactNode } from "react";
import LeftSidebar from "@/components/left_dashboard";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex">
             <LeftSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;