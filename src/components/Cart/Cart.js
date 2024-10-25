import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import placeOrder from '../PlaceOrder/PlaceOrder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showErrorToast } from '../Toasting/ThrottledToast';

export default function Cart() {
    const { cartItems, updateCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState([]);


    const handleQuantityChange = (productVariantId, newQuantity) => {
        if (newQuantity < 0) return;
        updateCart(productVariantId, newQuantity);
    };

    // const handleRemoveItem = (productVariantId) => {
    //     updateCart(productVariantId, 0); // Removing item by setting quantity to 0
    // };
    const handleRemoveItem = (productVariantId) => {
        updateCart(productVariantId, 0);
    };

    const handleSelectItem = (productVariantId, isSelected) => {
        setSelectedItems((prevSelectedItems) =>
            isSelected
                ? [...prevSelectedItems, productVariantId]
                : prevSelectedItems.filter(id => id !== productVariantId)
        );
    };

    const handlePlaceOrder = async () => {
        const token = localStorage.getItem('jwtToken');
    
        if (!token) {
            toast.warning("Please login to order");
            navigate('/login');
            return;
        }
        if (!cartItems || cartItems.length === 0) {
            toast.error("No items in the cart");
            return;
        }

        const selectedCartItems = cartItems.filter(item =>
            selectedItems.includes(item.selectedVariant.productVariantId)
        );

        if (!selectedCartItems || selectedCartItems.length === 0) {
            showErrorToast("No items selected for the order");
            return;
        }
    
        // Check if each product has a selected variant
        const productsWithoutVariant = cartItems.filter(item => !item.selectedVariant);
        if (productsWithoutVariant.length > 0) {
            productsWithoutVariant.forEach(item => {
                toast.error(`Please select a variant for ${item.name}`, {
                    autoClose: 2000,
                });
            });
            return;
        }
    
        // Check for out-of-stock items
        const outOfStockItems = cartItems.filter(item => {
            const selectedVariant = item.productVariants.find(variant => variant.productVariantId === item.selectedVariant.productVariantId);
            return selectedVariant && selectedVariant.quantity === 0;
        });
    
        if (outOfStockItems.length > 0) {
            outOfStockItems.forEach(item => {
                toast.error(`Product "${item.name}" is out of stock!`, {
                    autoClose: 2000,
                });
            });
            return;
        }
    
        // Check for insufficient quantity
        const insufficientItems = cartItems.filter(item => {
            const selectedVariant = item.productVariants.find(variant => variant.productVariantId === item.selectedVariant.productVariantId);
            return selectedVariant && item.quantity > selectedVariant.quantity;
        });
    
        if (insufficientItems.length > 0) {
            insufficientItems.forEach(item => {
                const selectedVariant = item.productVariants.find(variant => variant.productVariantId === item.selectedVariant.productVariantId);
                const availableQuantity = selectedVariant ? selectedVariant.quantity : 0;
                toast.error(`Only ${availableQuantity} quantities left for ${item.name}.`, {
                    autoClose: 2000,
                });
            });
            return;
        }
    
        try {
            const id = await placeOrder(selectedCartItems); // Using the correct variant here
            navigate(`/order-summary/${id}`, { state: { orderItems: selectedCartItems } });
        } catch (error) {
            console.error('Error Placing Order:', error);
        }
    };
    return (
        <div className="container mt-1" style={{ width: "700px" }}>
            <h2>Cart</h2>
            <ul className="list-group">
            {cartItems.length > 0 ? (
    cartItems.map((item) => (
        item.selectedVariant && ( // Check if the product has a selected variant
            <CartItem
                key={item.selectedVariant.productVariantId}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem}
                onSelectItem={handleSelectItem}
            />
        )
    ))
) : (
    <li className="list-group-item">No items in the cart.</li>
)}
</ul>
            {cartItems.length > 0 && (
                <button className="btn btn-success mt-4" onClick={handlePlaceOrder}>
                    Check Out
                </button>
            )}
            <ToastContainer autoClose={2000} />
        </div>
    );
}


