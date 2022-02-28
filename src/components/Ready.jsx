import React from 'react'

export const Ready=({pendingOrders})=> {
  return (
        <div>
            {pendingOrders.map(order => (
          <section key={order.id} className="subGeneralBox">
            <section className="headerOfGeneralBox">
                <div className="nameClient boxes"> Client: {order.nameCustomer}</div>
                <div className="tableNumber boxes"> Table: {order.tableNumber}</div>
              <div className="hourSection">
                <div className="checkinTime boxes"> Check in time:{order.created} </div>
                <div className="checkoutTime boxes"> Check out time:{order.checkOutTime} </div>
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
          </section>
              ))}
        </div>
  )
}
