import React from 'react';
import { FaHome, FaUserAlt, FaListOl } from "react-icons/fa";
import { useHistory } from 'react-router';
import logo from "../images/logo.png";
import './MenuBar.css';

export function MenuBar(props) {
  const history = useHistory();
  return (
    <div>
        <section className="menuSection">
        <section className='miniSectionMenu logoSection'>
          <img
            src={logo}
            className="logoImage"
            alt="burgerLogo"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
          <div style={{color:"orange"}}>{props.typeUser}</div>
        </section>
        <section className='miniSectionMenu' onClick={()=>history.push('/')}>
          <FaHome />
          <div>Home</div>
        </section>
        <section className='miniSectionMenu' onClick={()=>history.push('/users')}>
          <FaUserAlt />
          <div>Users</div>
        </section>
          {props.typeUser === 'waiter' ? 
        <section className='miniSectionMenu' onClick={()=>history.push('/ordersReady')}>
          <FaListOl />
          <div>Orders Ready</div> 
        </section>: <> </> }
      </section>
    </div>
  )
}

export default MenuBar;