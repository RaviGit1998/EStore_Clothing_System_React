import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateItemQuantity, selectItem } from './cartSlice';

const CartItems = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const selectedItems = useSelector((state) => state.cart.selectedItems);

  const handleRemove = (productVariantId) => {
    dispatch(removeItem(productVariantId));
  };

  const handleQuantityChange = (productVariantId, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateItemQuantity({ productVariantId, newQuantity }));
    }
  };

  const handleSelectItem = (productVariantId) => {
    dispatch(selectItem(productVariantId));
  };

  return (
    <div className="cart-items">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.selectedVariant.productVariantId} className="cart-item">
            <img src={item.selectedVariant.image} alt={item.selectedVariant.name} />
            <div>
              <h4>{item.selectedVariant.name}</h4>
              <p>Price: ${item.selectedVariant.pricePerUnit}</p>
              <p>Quantity: 
                <button onClick={() => handleQuantityChange(item.selectedVariant.productVariantId, item.quantity - 1)}>-</button>
                {item.quantity}
                <button onClick={() => handleQuantityChange(item.selectedVariant.productVariantId, item.quantity + 1)}>+</button>
              </p>
              <button onClick={() => handleRemove(item.selectedVariant.productVariantId)}>Remove</button>
              <label>
                <input 
                  type="checkbox" 
                  checked={selectedItems.includes(item.selectedVariant.productVariantId)} 
                  onChange={() => handleSelectItem(item.selectedVariant.productVariantId)} 
                />
                Select
              </label>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartItems;
