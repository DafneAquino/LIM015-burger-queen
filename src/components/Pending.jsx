import React from 'react';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export const Pending=({pendingOrders, setPendingOrders})=> {
      // Cambiar el estado de ordenes pendientes a listas
    const cancelOrder = async(id) =>{
        setPendingOrders(pendingOrders.filter((item)=> item.id !== id));
        await deleteDoc(doc(db, "orders", id));
    }

    const orderReady = () =>{

    }
  return (
    <div>
        {pendingOrders.map(order => (
      <section key={order.id} className="subGeneralBox">
        <section className="headerOfGeneralBox">
            <div className="nameClient boxes"> Client: {order.nameCustomer}</div>
          <div className="hourSection">
            <div className="checkinTime boxes "> Check in time:{order.created} </div>
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
    </div>
  )
}
