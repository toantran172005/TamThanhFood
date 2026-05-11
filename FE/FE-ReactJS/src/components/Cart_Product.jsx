import React from 'react'
import '../css/Cart_Product.css'

function Cart_Product({ item, onIncrease, onDecrease, onRemove }) {
  if (!item) return null;
  console.log("Dữ liệu món trong giỏ:", item);

  return (
    <div className='cart_product'>
        <div className='cart_product_info'>
            <div className='cart_product_image'>
                <img src={item.image || "/Bison_Burger.png"} alt={item.name} />
            </div>

            <div className='cart_product_description'>
                <h2>{item.name}</h2>
                <p>{item.foodName || "Món ăn ngon mỗi ngày"}</p>
                <span>{new Intl.NumberFormat('vi-VN').format(item.price)}đ</span>
            </div>

            <div className='cart_product_options'>
                <div className='quantity'>
                    <span>SL: </span>
                    <button onClick={onDecrease} disabled={item.quantity <= 1}>-</button>
                    <input type="text" value={item.quantity} readOnly />
                    <button onClick={onIncrease}>+</button>
                </div>
                <div className='size'>
                    <span>Size:</span>
                    <select name="size" value={item.size || "M"} disabled>
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                    </select>
                </div>
            </div>

            <div className='cart_product_actions'>   
                <button className='trash' onClick={onRemove}>
                    <i className='fa-solid fa-trash'></i>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Cart_Product;