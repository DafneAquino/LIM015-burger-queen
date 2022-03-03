import React, { Fragment } from "react";
import { Button } from "react-bootstrap";

export default function Product({product, menu, order, setOrder}) {
    //constante que guarda las propiedades del estado de cada uno de los productos
    const { id, name, price} = product;

    //Funcion para agregar productos a la sección orders
    const orderProducts = () =>{
        const selectedProduct= order.find((element)=> element.id === product.id);
        console.log('Product: ', selectedProduct)
        console.log('Oder: ', order)
        // setOrder([...order, ...product])
        if(selectedProduct){
            setOrder(
              order.map((element)=>
              element.id === product.id ?
              { ...selectedProduct,
                quantity: selectedProduct.quantity + 1,
                subtotal: selectedProduct.price*(selectedProduct.quantity+1)
              } : element )
            )
        } else{
          setOrder([...order, {...product, quantity:1, subtotal: product.price }]);
        }
    }
  return (
    <Fragment>
      {menu ? ((
        <button className='btn-secondary mb-2 btn-lg' key={id} onClick={() => orderProducts(id)}>
          <div> {name} </div>
          <div> $. {price}.00 </div>
        </button>
         )):
         (<></>)
      }
    </Fragment>
  );
}
