import React, { useState, useEffect} from 'react';
import './MenuView.css'
// import { MenuOptions } from './MenuOptions'
import lineImage from '../images/line.png';
import Orders from './Orders';
import Products from "./Products";
import { Button } from 'react-bootstrap';


export function MenuView() {
  
  const [menu, setMenu] = useState([]);
  const [typeProduct, setTypeProduct] = useState('Breakfast');
  const [order, setOrder] =useState([]);
  
  const getProducts = async () => {
      const data = await fetch("data/menuData.json");//la data json debe estar ubicada en el directorio publico "public"
      const options = await data.json();
      // console.log(options);
      return options;
  }


  // Después de que se cargue la página ejecutará la función getProducts de manera asincrona y actualizara el estado de
  // las opciones del menú
  useEffect(() => {
      async function fetchList(){
          const listMenu = await getProducts()
          setMenu(listMenu.filter(item=> item.type === typeProduct))
      }
      fetchList()
  }, [typeProduct]) //<---Para que se ejecute cada vez que cambie el item.type (Breakfast o All Day)
  return (
    <section className='container'>
         <div className='sectionMenu'>
                <br />
                <header className="menu"> MENU </header>
                
                <br />
                <button onClick={() => { setTypeProduct('Breakfast'); } }>BREAKFAST</button>
                <button onClick={() => { setTypeProduct('All Day'); } }>ALL DAY</button>

                <br/>
                <section className='optionsMenuType'>
                    { menu.map((product) => (//de cada objeto seleccionado los recorremos para sacar el nombre y el precio de cada uno
                        <Products 
                            className='btnBreak' 
                            key= {product.id} 
                            oder={order}
                            setOrder={setOrder}
                            product={product}
                            menu={menu}/> 
                            // <div> { element.product } </div> 
                            // <div> $. { element.price}.00 </div>
                    ))}
                </section>
            </div>

        <div className='sectionImage'>
            <img src={lineImage} className='line' alt='lineImage' ></img>
        </div>

        <div className='sectionOrder'>
          <input className="client"></input>
          <div>
            <Orders
            order={order}
            setOrder={setOrder}/>
          </div>
          <Button className="sendOrder">ENVIAR</Button>
        </div>
        
    </section>

  );
}

export default MenuView;