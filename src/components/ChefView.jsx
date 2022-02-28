import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Pending } from "./Pending";
import { Ready } from "./Ready";
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
      {typeOrder === "pending" ? (
        <Pending
          className="pendingSection"
          pendingOrders={pendingOrders}
          setPendingOrders={setPendingOrders}
        />
      ) : (
        <Ready 
        // className="readySection"
        pendingOrders={pendingOrders} />
      )}
    </section>
  );
};

// Añadir botón cancelar en pestaña "Pending" y su funcionalidad (YA ESTÁ)
// Desaparecer la fecha de salida de los pedidos de "PENDIENTE" (YA ESTÁ)
// Desaparecer el boton "CANCEL" y "COMPLETE" de la vista "READY" (YA ESTÁ)
//
