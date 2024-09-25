
import React from 'react';

const CartItem = ({ item, onQuantityChange, onRemoveItem }) => {
    const item1 = item.productVariants[0]; // Assuming there is always at least one variant

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        onQuantityChange(item1.productVariantId, newQuantity);
    };

    return (
        <li className="list-group-item">
            <div className="d-flex justify-content-between">
                <div>
                    <img
                        src={item.imageBase64 ? `data:image/png;base64,${item.imageBase64}` : 'fallback-image.jpg'}
                        alt={item.name}
                        className="product-image-main"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }} // Adjust size as needed
                    />
                    <h5>{item.name}</h5>
                    <p><strong>Size:</strong> {item1.size}</p>
                    <p><strong>Color:</strong> {item1.color}</p>
                    <p><strong>Price:</strong> ₹{item1.pricePerUnit}</p>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onRemoveItem(item1.productVariantId)}
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
                <input
                    type="number"
                    min="1"
                    max="10"
                    value={item.quantity || 1} // Default to 0 if item.quantity is undefined
                    onChange={handleQuantityChange}
                    className="form-control w-25"
                />
            </div>
        </li>
    );
};

export default CartItem;
