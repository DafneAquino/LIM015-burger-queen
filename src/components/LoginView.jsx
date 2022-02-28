import React from 'react';
import { useHistory } from 'react-router';
import logo from '../images/logo.png';
import logoWaiter from '../images/logoWaiter.png';
import logoCheff from '../images/logoCheff.png';

import 'firebase/auth';
import './LoginView.css';
import { Col, Row } from 'react-bootstrap';

export const LoginView = () => {
    //Router para mover a otra vista o página
    const history = useHistory();

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // const handleChange = (e) => {
    //     if (e.target.name === 'email') {
    //         setEmail(e.target.value)
    //         // console.log(e.target.value)
    //     } else if (e.target.name === 'password') {
    //         setPassword(e.target.value);
    //         // console.log(e.target.value)
    //     }
    // }

    // Funcion que envía la data de inputs y se activa al hacer click en "submit"
    const windowsWaiter = () => {
        history.push('/waiter')
    };
    const windowsCheff = () => {
        history.push('/cheff')
    };


    return (
        <section className='Login'>
            <img src={logo} className='logoImage' alt='burgerLogo' style={{size: '17px'}}/>
            <Row>
                <Col>
                    <section className='btnsLogin'>
                      <section className='textSection'>
                        <button className='btnsUsers' onClick={windowsWaiter}>
                            <img src={logoWaiter} className='logoWaiter' alt='Icon Waiter' />
                        </button>
                        <br/>
                        <p className='textBtns'>Waiter</p>
                      </section>
                        <br/>

                      <section className='textSection'>
                        <button className='btnsUsers' onClick={windowsCheff}>
                            <img src={logoCheff} className='logoCheff' alt='Icon Cheff' />
                        </button>
                        <br/>
                            <p className='textBtns'>Cheff</p>
                      </section>
                    </section>
                </Col>
                <Col>
                    <div>
                        {/* <img src={fondo2} className='fondoImage' alt='BurgerImage'/> */}
                    </div>
                </Col>
            </Row>
        </section>
    )
}