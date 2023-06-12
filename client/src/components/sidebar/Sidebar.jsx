import React from "react";
import "./sidebar.css";
import { NavLink } from 'react-router-dom';

const Sidebar = ({ items }) => {
  return (
    <div className="na-sidebar">
      <div className="na-sidebar-wrapper">
      {items && items.map(({ id, path, icon, name }) => (
        <NavLink to={path} key={id} className="na-sidebar-link">
          <ul className="na-sidebar-list">
          <li className="na-sidebar-list-item">
            <span><img src={icon} alt="icons" className="na-sidebar-icon" /></span>
            <span className="na-sidebar-list-text">{name}</span>
          </li>
          </ul> 
        </NavLink>
      ))}
      </div>
    </div>
  );
};

export default Sidebar;


  





  


