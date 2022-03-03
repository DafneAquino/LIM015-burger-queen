import React from 'react'

export const Ready=({pendingOrders})=> {
  return (
        <div className='mainContainer pending'>
            {pendingOrders !== [] ? pendingOrders.map(order => (
          <section key={order.id} className="subContainer">
            <section className="headerOfGeneralBox">
                <div className="nameClient boxes"> Client: {order.nameCustomer}</div>
                <div className="tableNumber boxes"> Table: {order.tableNumber}</div>
              <div className="hourSection">
                <div className="checkinTime boxes"> Check in time:{order.created} <br/>Check out time:{order.checkOutTime}</div>
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
          </section>
              )) : <div> There aren´t any ready order </div>}
        </div>
  )
}
