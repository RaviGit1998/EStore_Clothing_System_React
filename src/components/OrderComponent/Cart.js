import { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CartItem from "./CartItem";
export default function Cart({cartItems,onUpdateCart,onPlaceOrder}){

    function handleQuantityChange(productId,quantity){
         onUpdateCart(productId,quantity);
    };

    function handleRemoveItem(productId){
         onUpdateCart(productId,0)
    };

     const handlePlaceOrder=async()=>{
        try{
            await onPlaceOrder();
            alert("Order Placed Successfully");
        }
        catch(error){
            console.log('error Placing the Order:',error);
            alert('failed to Place Order');
        }
     };

     return(
        <div className="container mt-4">
        <h2>Cart</h2>
        <ul className="list-group">
            {cartItems.map((item) => (
                <CartItem
                    key={item.productId}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemoveItem={handleRemoveItem}
                />
            ))}
        </ul>
        {cartItems.length > 0 && (
            <button className="btn btn-success mt-4" onClick={handlePlaceOrder}>
                Place Order
            </button>
        )}
    </div>
     );
     
}