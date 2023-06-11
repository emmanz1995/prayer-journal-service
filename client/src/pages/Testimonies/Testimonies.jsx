import Topbar from "../../components/topbar/Topmenu";
import Sidebar from "../../components/sidebar/Sidebar";
import Notes from "../../components/notes/Notes";
import "./testimonies.css";

export default function Testimonies() {
  return (
    <>
    <Topbar/>
    <div className="na-home-container">
    <Sidebar/>
    <Notes/>
    </div>
   </>
  )
}
