import Topbar from "../../components/topbar/Topmenu";
import Sidebar from "../../components/sidebar/Sidebar";
import Data from "./sidebarData";
import Notes from "../../components/notes/Notes";
import "./setting.css";

export default function Setting() {
  return (
    <>
      <Topbar/>
      <div className="na-profile">
        <Sidebar items={Data} />
        <Notes/>
      </div>
    </>
  )
}


