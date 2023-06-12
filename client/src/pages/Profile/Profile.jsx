import Topbar from "../../components/topbar/Topmenu";
import Sidebar from "../../components/sidebar/Sidebar";
import Data from "./sidebarData";
import Notes from "../../components/notes/Notes";
import "./profile.css";

export default function Profile() {
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
