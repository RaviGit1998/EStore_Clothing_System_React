import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function CartItem({ item, onQuantityChange, onRemoveItem }) {
    function handleIncreaseQuantity ()  {
        onQuantityChange(item.productId, item.quantity + 1);
    };

    function handleDecreaseQuantity () {
        if (item.quantity > 1) {
            onQuantityChange(item.productId, item.quantity - 1);
        }
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <h5>{item.name}</h5>
                <p>${item.price} x {item.quantity}</p>
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
                    onClick={() => onRemoveItem(item.productId)}
                >
                    Remove
                </button>
            </div>
        </li>
    );
}
