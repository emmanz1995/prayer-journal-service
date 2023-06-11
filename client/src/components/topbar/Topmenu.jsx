import "./topmenu.css";
import { Search } from "@mui/icons-material";

export default function Topbar() {
  return (
    <div className="na-topmenu">
      <div className="na-topmenu-left">
        <span className="na-topmenu-logo">NarrowRoad</span>
      </div>
      <div className="na-topmenu-center">
        <div className="na-topmenu-search">
          <Search className="na-topmenu-search-icon"/>
          <input placeholder="Search your prayer list" className="na-topmenu-inputsearch"/>
        </div>
      </div>
      <div className="na-topmenu-right">
        <span className="na-topmenu-name">James</span>
        <img src="/assets/people/profile1.jpeg" alt="topmenu-profile" className="na-topmenu-profile"/>
      </div>
    </div>
  )
}
