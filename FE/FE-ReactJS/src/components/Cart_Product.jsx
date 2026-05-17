    import React from 'react'
    import '../css/Cart_Product.css'

    function Cart_Product({ item, onIncrease, onDecrease, onRemove }) {
    if (!item) return null;
    console.log("Dữ liệu món trong giỏ:", item);

    const getImageUrl = (image) => {
        if (!image) return "/Bison_Burger.png";

        if (image.startsWith("http")) {
            return image;
        }

        return `/${image}`;
    };

    return (
        <div className='cart_product'>
            <div className='cart_product_info'>
                <div className='cart_product_image'>
                    <img src={getImageUrl(item.image)} alt={item.name} />
                </div>

                <div className='cart_product_description'>
                    <h2>{item.foodName}</h2>
                    <p>Size đã chọn: <strong>{item.size || "Mặc định"}</strong></p>
                    <span>{new Intl.NumberFormat('vi-VN').format(item.price)}đ</span>
                </div>

                <div className='cart_product_options'>
                    <div className='quantity'>
                        <span>SL: </span>
                        <button onClick={onDecrease} disabled={item.quantity <= 1}>-</button>
                        <input type="text" value={item.quantity} readOnly />
                        <button onClick={onIncrease}>+</button>
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