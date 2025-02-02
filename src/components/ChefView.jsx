import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Pending } from "./Pending";
import { Ready } from "./Ready";
import MenuBar from "./MenuBar";
import "./ChefView.css";

export const ChefView = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [typeOrder, setTypeOrder] = useState("pending");

  // codigo firestore para obtener data en tiempo real
  const getOrders = async () => {
    const q = query(collection(db, "orders"));
    onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      console.log(docs);
      setPendingOrders(docs.filter((item) => item.status === typeOrder));
    });
  };

  // Pintar las ordenes pendientes obtenidas de firestore
  useEffect(() => {
    getOrders();
  }, [typeOrder]);

  return (
    <>
    <MenuBar typeUser='Chef' />
      <div className="selectionBtns">
        <button
          className="buttons"
          onClick={() => {
            setTypeOrder("pending");
          }}
        >
          PENDING
        </button>
        <button
          className="buttons"
          onClick={() => {
            setTypeOrder("ready");
          }}
        >
          READY
        </button>
      </div>
    <section className="">
      {/* <header className="ordersHead"> ORDERS </header> */}
      <section className="pendingAndReadySection">
      {typeOrder === "pending" ? (
        <Pending
          pendingOrders={pendingOrders}
          setPendingOrders={setPendingOrders}
        />
      ) : (
        <Ready 
        pendingOrders={pendingOrders} />
      )}
    </section>
    </section>
    </>
  );
};

// Añadir botón cancelar en pestaña "Pending" y su funcionalidad (YA ESTÁ)
// Desaparecer la fecha de salida de los pedidos de "PENDIENTE" (YA ESTÁ)
// Desaparecer el boton "CANCEL" y "COMPLETE" de la vista "READY" (YA ESTÁ)
//
