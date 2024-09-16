import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default function CartItem({ item, onQuantityChange, onRemoveItem }) {
    
    function handleIncreaseQuantity() {
        onQuantityChange(item.productVariantId, item.quantity + 1);
    }
 
    function handleDecreaseQuantity() {
        if (item.quantity > 1) {
            onQuantityChange(item.productVariantId, item.quantity - 1);
        }
    }
 
    return (
           
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div> 
             <h5>{item.name || 'Product Name'}</h5>
                <p>{item.shortDescription || 'No Description'} - ${item.pricePerUnit || '0.00'} x {item.quantity || '0'}</p>
            </div>
            <div>
                <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={handleIncreaseQuantity}
                >
                    +
                </button>
                <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={handleDecreaseQuantity}
                    disabled={item.quantity <= 1}
                >
                    -
                </button>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onRemoveItem(item.productVariantId)}
                >
                    Remove
                </button>
            </div>
        </li>
    
      
    );
}