import React from 'react'
import '../css/Cart_Product.css'
import "../../public/fontawesome-free-7.2.0-web/css/all.min.css";

function Cart_Product() {
  return (
    <div className='cart_product'>
        {/* <div className='checkbox'>
            <input type="checkbox" name="cart_product" id="" />
        </div> */}

        <div className='cart_product_info'>
            <div className='cart_product_image'>
                <img src="/Bison_Burger.png" alt="" />
            </div>

            <div className='cart_product_description'>
                <h2>Product Name</h2>
                <p>Product Description</p>
                <span>$0.00</span>
            </div>

            <div className='cart_product_options'>
                <div className='quantity'>
                    <span>SL: </span>
                    <button>-</button>
                    <input type="text" value="1" />
                    <button>+</button>
                </div>
                <div className='size'>
                    <span>Size:</span>
                    <select name="size" id="">
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                    </select>
                </div>
            </div>

            <div className='cart_product_actions'>   
                <button className='pencil'><i className='fa-solid fa-pencil'></i></button>
                <button className='trash'><i className='fa-solid fa-trash'></i></button>
            </div>
        </div>
    </div>
  )
}

export default Cart_Product