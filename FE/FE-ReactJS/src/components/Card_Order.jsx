import React from 'react'
import "../css/Card_Order.css"

function Card_Order() {
  return (
    <div className='cart_order'>
        <div className='cart_order_left'>
            <div className='cart_order_info'>
                <p>Order: <span className='order_id'>#0D34567</span>  <span className='order_date'>Today, 10:50 AM</span></p>
            </div>

            <div className='cart_order_image'>
                <img src="/Bison_Burger.png" alt="img_food" />
                <img src="/Salad.png" alt="img_food" />
            </div>
        </div>

        <div className='cart_order_right'>
            <div className='status_price'>
                <p>In transit</p>
                <h4>$ 45.00</h4>
            </div>

            <div className='cart_order_actions'>
                <button className='detail'>Detail</button>
                <button className='re_order'>Re-Order</button>
            </div>
        </div>
    </div>
  )
}

export default Card_Order