import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import "./Orders.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Order({ order, setOrder }) {
  // **.reduce -> recibe'4' argumentos: acumulador(acc)

  const total = order.reduce((acc, item) => acc + item.subtotal, 0);
  const inputName = useRef();

  const addOrdersFirebase = async (e) => {
    //Guardar en base de datos firebase 
    e.preventDefault();
    let orderProduct = {};
    orderProduct.nameCustomer = inputName.current.value;
    orderProduct.products = order;
    orderProduct.created_at = new Date();
    orderProduct.status = "pending";
    console.log(orderProduct.nameCustomer);

    const docRef = await addDoc(collection(db, "orders"), {
      nameCustomer: inputName.current.value,
      products: order,
      created: new Date().toLocaleString(),
      status: "pending",
    });
    // console.log(new Date().toLocaleString())

    console.log("Document written with ID: ", docRef.id );
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
      <div className="form-group">
        <div className="form-group">
          <div className="input-group mb-3">
            <span className="input-group-text">
              <strong>CLIENT:</strong>
            </span>
            <input
              type="text"
              className="form-control"
              ref={inputName}
              required
              minLength="4"
            />
          </div>
        </div>
      </div>
      <br />

      <div className="table-responsive">
        <table className="table table-borderless" style={{ width: "30%" }}>
          <thead className="table-active">
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
                <tr key={product.id}>
                  <td> {product.name} </td>
                  <td className="quantityRow">
                    <button className="btnsQuantity" onClick={() => btnMinus(product.id)}>➖</button>
                    <p className="amount"> {product.quantity} </p>
                    <button className="btnsQuantity" onClick={() => btnPlus(product.id)}>➕</button>
                  </td>
                  <td> $ {product.subtotal}.00</td>
                  {/*sgt linea: filter esta quitando el producto q sea = al id y deja a los productos que no tengan ese id */}
                  <td>
                    <FaRegTrashAlt onClick={() =>setOrder(order.filter((item) => item.id !== product.id))}/>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot className="table-active">
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
      <Button className="sendOrder" type="submit" onClick={addOrdersFirebase}>
        SEND
      </Button>
      {/* <input type="submit" value="SEND" /> */}
    </>
  );
}

// agregar la funcion addProducts de Firebase(check-pero comprobar)
// agregar las funciones de mas y menos de productos (check)
// Actualizar el estado SetOrder del subtotal  (CHECK)
// Agregar Boton "Borrar" para eliminar un pedido

// EVITAR QUE SE PUEDA CAMBIAR DE VENTANA SI EL USUARIO NO ESTA LOGEADO
