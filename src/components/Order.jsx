import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Orders.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Order({ order, setOrder }) {
  const [nameClient, setNameClient] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  // **.reduce -> recibe'4' argumentos: acumulador(acc)
  const total = order.reduce((acc, item) => acc + item.subtotal, 0);

  const addOrdersFirebase = async (e) => {
    //Guardar pedido en un array como prubea
    e.preventDefault();
    let orderProduct = {};
    orderProduct.nameCustomer = nameClient;
    orderProduct.tableNumber = tableNumber;
    orderProduct.products = order;
    orderProduct.created_at = new Date();
    orderProduct.status = "pending";

    // Guardar pedido en la base de datos firebase
    const docRef = await addDoc(collection(db, "orders"), {
      nameCustomer: nameClient,
      numberTable: tableNumber,
      products: order,
      created: new Date().toLocaleString("es-PE"),
      status: "pending",
    });
    console.log(nameClient, tableNumber);

    setOrder([]);
    setNameClient("");
    setTableNumber("");

    console.log("Document written with ID: ", docRef.id);
  };

  const btnMinus = (id) => {
    // eslint-disable-next-line array-callback-return
    order.map((element) => {
      if (element.id === id && element.quantity > 1) {
        setOrder(
          order.map((e) =>
            e.id === element.id
              ? {
                  ...e,
                  quantity: e.quantity - 1,
                  subtotal: e.price * (e.quantity - 1),
                }
              : e
          )
        );
        console.log(order);
      }
    });
  };

  const btnPlus = (id) => {
    // eslint-disable-next-line array-callback-return
    order.map((element) => {
      if (element.id === id) {
        setOrder(
          order.map((e) =>
            e.id === element.id
              ? {
                  ...e,
                  quantity: e.quantity + 1,
                  subtotal: e.price * (e.quantity + 1),
                }
              : e
          )
        );
      }
    });
  };

  const btnDeleteAll = (e) => {
    e.preventDefault(); /* para evitar que una página se refresque automáticamente al momento de llamar al evento  */
    setOrder([]);
  };

  return (
    <>
      <section className="form-group">
        <div className="input-group mb-3">
          <span className="input-group-text">
            <strong>CLIENT:</strong>
          </span>
          <input
            type="text"
            className="form-control"
            value={nameClient}
            onChange={(e) => setNameClient(e.target.value)}
            required
            minLength="4"
          />
          <br />
          <span className="input-group-text">
            <strong>TABLE:</strong>
          </span>
          <input
            type="number"
            className="form-control"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            required
            minLength="1"
          />
        </div>
        <br />

        <div className="table-responsive text-white">
          <table
            className="table table-borderless text-white"
            style={{ width: "100%" }}
          >
            <thead className="table-active text-white">
              <tr>
                <th>DESCRIPTION</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {order.length === 0 ? (
                <tr>
                  <td>Add</td>
                  <td>Add</td>
                  <td>$.00</td>
                  <td>
                    <FaRegTrashAlt />
                  </td>
                </tr>
              ) : (
                order.map((product) => (
                  <tr key={product.id} className="foodOrderList">
                    <td> {product.name} </td>
                    <td className="quantityRow">
                      <button
                        className="btnsQuantity"
                        onClick={() => btnMinus(product.id)}
                      >
                        ➖
                      </button>
                      <p className="amount"> {product.quantity} </p>
                      <button
                        className="btnsQuantity"
                        onClick={() => btnPlus(product.id)}
                      >
                        ➕
                      </button>
                    </td>
                    <td> $ {product.subtotal}.00</td>
                    {/*sgt linea: filter esta quitando el producto q sea = al id y deja a los productos que no tengan ese id */}
                    <td>
                      <FaRegTrashAlt
                        onClick={() =>
                          setOrder(
                            order.filter((item) => item.id !== product.id)
                          )
                        }
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="table-active text-white">
              <tr>
                <th>TOTAL</th>
                <th></th>
                <th>$ {total}.00</th>
                <th>
                  <FaRegTrashAlt onClick={btnDeleteAll} />
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className='sectionSend'>
          <button
            type="submit"
            className="sendOrder"
            onClick={addOrdersFirebase}
          >
            SEND
          </button>
        </div>
      </section>
    </>
  );
}

// agregar la funcion addProducts de Firebase(check-pero comprobar)
// agregar las funciones de mas y menos de productos (check)
// Actualizar el estado SetOrder del subtotal  (CHECK)
// Agregar Boton "Borrar" para eliminar un pedido(CHECK)
// LIMPIAR LA LISTA DE PEDIDOS UNA VEZ QUE SE HAYA HECHO EL PEDIDO(CHECK)
// Agregar estado para guardar el nombre del cliente y borrar el input al enviar el pedido(YA ESTÁ)

// Buscar como en un formulario desactivar todos los botones y que solo uno sirva como "submit" que es el boton de SEND
// EVITAR QUE SE PUEDA CAMBIAR DE VENTANA SI EL USUARIO NO ESTA LOGEADO
