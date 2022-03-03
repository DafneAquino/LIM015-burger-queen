import React from 'react';
import { FaHome, FaUserAlt, FaListOl } from "react-icons/fa";
import logo from "../images/logo.png";
import './MenuBar.css';

export function MenuBar() {
  return (
    <div>
        <section className="menuSection">
        <section className='miniSectionMenu'>
          <img
            src={logo}
            className="logoImage"
            alt="burgerLogo"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
          <div style={{color:"orange"}}>Waiter</div>
        </section>
        <section className='miniSectionMenu'>
          <FaHome />
          <div>Home</div>
        </section>
        <section className='miniSectionMenu'>
          <FaUserAlt />
          <div>Users</div>
        </section>
        <section className='miniSectionMenu'>
          <FaListOl />
          <div>Orders Ready</div>
        </section>
      </section>
    </div>
  )
}

export default MenuBar;