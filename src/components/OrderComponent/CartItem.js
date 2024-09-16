// CartItem.js
import React from 'react';


const CartItem = ({ item, onQuantityChange, onRemoveItem }) => {
    var item1=item.productVariants[0];

    const handleQuantityChange = (e) => {
       onQuantityChange(item.productVariantId, item.quantity + 1);
    };

    return (
        <li className="list-group-item">
            <div className="d-flex justify-content-between">
                <div>
                <img
                  src={`data:image/png;base64,${item.imageBase64}`}
                  alt={item.name}
                  className="product-image-main"
                  style={{width:"400%",height:"500px"}}
                        />
                    <h5>{item.name}</h5>
                    <p><strong>Size:</strong> {item1.size}</p>
                    <p><strong>Color:</strong> {item1.color}</p>
                    <p><strong>Price :</strong> ₹{item1.pricePerUnit}</p>
                        
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onRemoveItem(item.productVariantId)}
                    >
                        Remove
                    </button>
                    </div> 
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <input
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={handleQuantityChange}
                    className="form-control w-25"
                />
                
            </div>
        </li>
    );
};

export default CartItem;
