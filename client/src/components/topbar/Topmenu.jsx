import "./topmenu.css";
import { NavLink } from 'react-router-dom';
import { Search } from "@mui/icons-material";

export default function Topbar() {
  return (
    <div className="na-topmenu">
      <NavLink to="/" className="na-topmenu-left">
        <span><img src="assets/icons/na-note.png" alt="icon" className="na-topmenu-icon" /></span>
        <span className="na-topmenu-logo">NarrowRoad</span>
      </NavLink>
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
