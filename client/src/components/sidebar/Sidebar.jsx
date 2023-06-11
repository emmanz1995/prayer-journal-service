import "./sidebar.css";
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import Data from "./sidebarData.json";

const Sidebar = ({children}) => {
  return (
      <div className="na-sidebar">
         <div className="na-sidebar-wrapper">
             {
                 Data.map((item, index)=>(
                     <NavLink to={item.path} key={index} className="link" activeclassName="active">
                      <ul className="na-sidebar-list">
                        <li className="na-sidebar-list-item">
                        <span><img src={item.image} alt="icons" className="na-sidebar-icon"/></span>
                        <span className="na-sidebar-list-text">{item.name}</span>
                        </li>
                      </ul>
                     </NavLink>
                 ))
             }
         </div>
         <main>{children}</main>
      </div>
  );
}; 

export default Sidebar;

