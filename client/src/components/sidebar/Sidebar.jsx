import "./sidebar.css";
import { RssFeed } from "@mui/icons-material";
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import Data from "./sidebarData.json";

const Sidebar = ({children}) => {
  const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
  
  return (
      <div style={{flex: isOpen ? "2" : "0.6"}} className="na-sidebar">
         <div className="na-sidebar-wrapper">
               <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="na-sidebar-toggle">
                  <RssFeed onClick={toggle}/>
                </div>
             {
                 Data.map((item, index)=>(
                     <NavLink to={item.path} key={index} className="link" activeclassName="active">
                      <ul className="na-sidebar-list">
                        <li className="na-sidebar-list-item">
                        <span><img src={item.image} alt="icons" className="na-sidebar-icon"/></span>
                        <span style={{display: isOpen ? "block" : "none"}} className="na-sidebar-list-text">{item.name}</span>
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

