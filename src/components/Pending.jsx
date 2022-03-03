import React from 'react';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import './Pending.css'

export const Pending=({pendingOrders, setPendingOrders})=> {
      // Cambiar el estado de ordenes pendientes a listas
    const cancelOrder = async(id) =>{
        setPendingOrders(pendingOrders.filter((item)=> item.id !== id));
        await deleteDoc(doc(db, "orders", id));
    }

    const orderReady = async(id) =>{
      setPendingOrders(pendingOrders.filter((item)=> item.id !== id));
      await updateDoc(doc(db, 'orders', id), {
        status: 'ready',
        checkOutTime: new Date().toLocaleString('es-PE'),
      });

    }
  return (
    <div className='mainContainer pending'>
        {pendingOrders !== [] ? pendingOrders.map(order => (
      <section key={order.id} className="subContainer">
        <section className="headerOfGeneralBox">
            <div className="nameClient boxes"> Client: {order.nameCustomer}</div>
          <div className="hourSection">
            <div className="checkinTime boxes "> Check in time: {order.created} </div>
          </div>
        </section>
        <section className="foodContainer boxes">
          {order.products.map((product)=>
            // {console.log("Products",order.products)}
            <button key={product.id} className="check p-2 m-2" type="check">
            {product.name} <br /> Quantity: {product.quantity}
            {/* {console.log(product.name)} */}
            </button>
          )}
        </section>
        <section className="sectionSubmit">
            <button  className="btnsCancelOrReady" onClick={() =>cancelOrder(order.id)}>CANCEL</button>
            <button  className="btnsCancelOrReady" onClick={() =>orderReady(order.id)}>READY</button>
        </section>
      </section>
          )): <div> There aren´t any pending order </div>}
    </div>
  )
}

// Crear funcionalidad orderReady para pasar a la pestaña de pedidos listos 
