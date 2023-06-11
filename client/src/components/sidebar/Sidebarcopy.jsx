import "./sidebar.css";
import { RssFeed } from "@mui/icons-material";

export default function sidebar() {
  return (
    <div className="na-sidebar">
      <div className="na-sidebar-wrapper">
        <ul className="na-sidebar-list">
          <li className="na-sidebar-list-item">
            <RssFeed className="na-sidebar-icon"/>
            <span className="na-sidebar-list-text">Prayer Wall</span>
          </li>
          <li className="na-sidebar-list-item">
            <RssFeed className="na-sidebar-icon"/>
            <span className="na-sidebar-list-text">Testimonies</span>
          </li>
          <li className="na-sidebar-list-item">
            <RssFeed className="na-sidebar-icon"/>
            <span className="na-sidebar-list-text">Answered</span>
          </li>
        </ul>
      </div>
    </div>
  )
}