import React from 'react';
import logo from "../images/logo.png";
import { useHistory } from 'react-router';
import './Welcome.css'

export function Welcome() {
    const history=useHistory();
  return (
    <div>
        <section className='welcomeSection welcome'>
            <div> Welcome to Burger Place! Click to begin</div>
            <br/>
            <img onClick={()=>{history.push('/users')}}src={logo} className='logoImage' alt='burgerLogo' style={{width:'auto',height: '150px', cursor:'pointer'}}/>
        </section>
    </div>
  )
}
