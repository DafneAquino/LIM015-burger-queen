import React,{ useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
// import "./KitchenView.css";

export const KitchenView = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [typeOrder, setTypeOrder] = useState('pending');


  // codigo firestore para obtener data en tiempo real
  const getOrders = async () => {
    const q= query(collection(db, "orders"));
    onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({...doc.data(), id: doc.id});
      });
      console.log(docs);
      setPendingOrders(docs.filter((item)=> item.status === typeOrder));
    });
    
  };

  // Pintar las ordenes pendientes obtenidas de firestore
  useEffect(()=>{
    getOrders();
  }, [typeOrder]);

  // Cambiar el estado de ordenes pendientes a listas
  const cancelOrder = async(id) =>{
    setPendingOrders(pendingOrders.filter((item)=> item.id !== id));
    await deleteDoc(doc(db, "orders", id));
  }

  const orderReady = () =>{

  }



  return (
    <section className="generalBox container">
      <header className="ordersHead"> ORDERS </header>
      <div className="buttons">
          <button
            className="btnPending"
            onClick={() => {
              setTypeOrder("pending");
            }}
          >
            PENDING
          </button>
          <button
            className="btnReady"
            onClick={() => {
              setTypeOrder("ready");
            }}
          >
            READY
          </button>
        </div>
          {pendingOrders.map(order => (
      <section key={order.id} className="subGeneralBox">
        <section className="headerOfGeneralBox">
            <div className="nameClient boxes"> Client: {order.nameCustomer}</div>
          <div className="hourSection">
            <div className="checkinTime boxes "> Check in time:{order.created} </div>
            <div className="endTime boxes"> Check out time: </div>
          </div>
        </section>
        <section className="mainBox boxes">
          {order.products.map((product)=>
            // {console.log("Products",order.products)}
            <button key={product.id} className="check p-2 m-2" type="check">
            {product.name} <br /> Quantity: {product.quantity}
            {/* {console.log(product.name)} */}
            </button>
          )}
        </section>
        <section className="sectionSubmit">
            <button  className="btnComplete" onClick={() =>cancelOrder(order.id)}>CANCEL</button>
            <button  className="btnComplete" onClick={() =>orderReady(order.id)}>READY</button>
        </section>
      </section>
          ))}
    </section>
  );
};

// Añadir botón cancelar en pestaña "Pending" y su funcionalidad (YA ESTÁ)

// Desaparecer la fecha de salida de los pedidos de "PENDIENTE"
// Desaparecer el boton "CANCEL" y "COMPLETE" de la vista "READY" 
// Quitar el boton "Complete" cuando el pendiente pasa a pestaña "Ready"
