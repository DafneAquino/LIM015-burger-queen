import React, { useState, useEffect } from "react";
import Product from "./Product";
import Order from "./Order";
import lineImage from "../images/line.png";
import "./WaiterView.css";
import MenuBar from "./MenuBar";

export function WaiterView() {
  const [menu, setMenu] = useState([]);
  const [typeProduct, setTypeProduct] = useState("Breakfast");
  const [order, setOrder] = useState([]);

  const getProducts = async () => {
    const data = await fetch("data/menuData.json"); //la data json debe estar ubicada en el directorio publico "public"
    const options = await data.json();
    // console.log(options);
    return options;
  };

  // Después de que se cargue la página ejecutará la función getProducts de manera asincrona y actualizara el estado de
  // las opciones del menú
  useEffect(() => {
    async function fetchList() {
      const listMenu = await getProducts();
      setMenu(listMenu.filter((item) => item.type === typeProduct));
    }
    fetchList();
  }, [typeProduct]); //<---Para que se ejecute cada vez que cambie el item.type (Breakfast o All Day)

  return (
    <>
      <MenuBar />
      <section className="mainContainer">
        <div className="foodOptions">
          {/* <header className="menu"> MENU </header> */}

          <div className="buttonsSection">
            <button
              className="btnsBreakfastAndAllDay"
              onClick={() => {
                setTypeProduct("Breakfast");
              }}
            >
              BREAKFAST
            </button>
            <button
              className="btnsBreakfastAndAllDay"
              onClick={() => {
                setTypeProduct("All Day");
              }}
            >
              ALL DAY
            </button>
          </div>

          <br />
          <section className="optionsMenuType">
            {menu.map(
              (
                product //de cada objeto seleccionado los recorremos para sacar el nombre y el precio de cada uno
              ) => (
                <Product
                  className="btnBreak"
                  key={product.id}
                  order={order}
                  setOrder={setOrder}
                  product={product}
                  menu={menu}
                />
              )
            )}
          </section>
        </div>

        <div className="sectionImage">
          <img src={lineImage} className="line" alt="lineImage"></img>
        </div>

        <section className="sectionOrder">
          <Order order={order} setOrder={setOrder} />
        </section>
      </section>
    </>
  );
}

export default WaiterView;
