import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Sidebar from "./Sidebar/Sidebar";
import "../../../index.scss";
import MobilePageSelectLazy from "./MobilePageSelect/MobilePageSelectLazy";
import DelayedFallback from "../../global/DelayedFallback/DelayedFallback";

function Docs() {
  return (
    <div id="content" className="doc-content">
      <Sidebar />
      <div className="pageWrapper">
        <MobilePageSelectLazy />
        <Suspense fallback={<DelayedFallback />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default Docs;
