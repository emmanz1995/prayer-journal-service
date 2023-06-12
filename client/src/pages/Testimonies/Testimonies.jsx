import Topbar from "../../components/topbar/Topmenu";
import Sidebar from "../../components/sidebar/Sidebar";
import Data from "../../components/Data/sidebarData"
import Notes from "../../components/notes/Notes";
import "./testimonies.css";

export default function Testimonies() {
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
