

// import React from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { showErrorToast } from '../Toasting/ThrottledToast';
// const CartItem = ({ item, onQuantityChange, onRemoveItem,onSelectItem,isSelected }) => {
//     // Add null check for productVariants and productVariantId
//     const itemVariant = item.selectedVariant; 

//     // If itemVariant is not available, we cannot render this item correctly
//     if (!itemVariant) {
//         return (
//             <li className="list-group-item">
//                 <p>Product variant not available for {item.name}.</p>
//             </li>
//         );
//     }

//     const availableQuantity = itemVariant.quantity;

//     // const handleQuantityChange = (event) => {
//     //     const newQuantity = parseInt(event.target.value, 10);
//     //     if (newQuantity > availableQuantity) {
//     //         toast.error(`Only ${availableQuantity} quantities available!`);
//     //     } else {
//     //         onQuantityChange(itemVariant.productVariantId, newQuantity);
//     //     }
//     // };
     
//     const handleQuantityIncrease = () => {
//         if (item.quantity < availableQuantity) {
//             onQuantityChange(itemVariant.productVariantId, item.quantity + 1);
//         } else {
//             showErrorToast(`Product   "${item.name}"  was out of Stock!`);
//         }
//     };
 
//     const handleQuantityDecrease = () => {
//         if (item.quantity > 1) {
//             onQuantityChange(itemVariant.productVariantId, item.quantity - 1);
//         }
//     };

//     const handleCheckboxChange = (event) => {
//         onSelectItem(itemVariant.productVariantId, event.target.checked);
//     };

//     return (
//         <li className="list-group-item">
//             <div className="d-flex justify-content-between">
//                 <div className="position-relative">
//                 <input
//                         type="checkbox"
//                         className="position-absolute"
                       
//                         style={{
//                             top: '10px',
//                             left: '10px',
//                             zIndex: 1,
//                             width: '15px', // Explicit width
//                             height: '15px', // Explicit height
//                             transform: 'scale(1.5)',  // Optional scaling
//                             msTransform: 'scale(1.5)', // IE 9
//                             WebkitTransform: 'scale(1.5)', // Safari/Chrome
//                             accentColor: '#007bff' // Change color for better visibility (optional)
//                         }}
//                         checked={isSelected}
//                         onChange={handleCheckboxChange}
                       
//                     />            
//                     <img
//                         src={item.imageBase64 ? `data:image/png;base64,${item.imageBase64}` : 'fallback-image.jpg'}
//                         alt={item.name}
//                         className="product-image-main"
//                         style={{ width: "300px", height: "400px", objectFit: "cover" }}
//                     />
    
//         <p><strong>Size:</strong> {itemVariant.size}</p>
//         <p><strong>Color:</strong> {itemVariant.color}</p>
//         <p><strong>Price:</strong> ₹{itemVariant.pricePerUnit}</p>
//          </div>
//          </div>
//         <div className="d-flex align-items-center mt-2">
//                 <button
//                     className="minus"
//                     onClick={handleQuantityDecrease}
//                     //disabled={item.quantity <= 1}
//                 >
//                     -
//                 </button>
//                 <span className="mx-1" style={{border:'1px solid gray',width:'50px', height:'30px',textAlign:'center'}}>{item.quantity}</span>
//                 <button
//                     className="plus"
//                     onClick={handleQuantityIncrease}
//                    // disabled={item.quantity >= availableQuantity}
//                 >
//                     +
//                 </button>
//                 <button
//                     className="btn btn-danger remove btn-sm ml-3"
                   
//                     onClick={() => onRemoveItem(itemVariant.productVariantId)}
//                 >
//                     Remove
//                 </button>
           
               
//             </div>
          
//             <ToastContainer />
//         </li>
//     );
// };

// export default CartItem;

import 'bootstrap/dist/css/bootstrap.min.css';
import './CartItem.css'
import React from 'react';

import { showErrorToast } from '../Toasting/ThrottledToast';
 
const CartItem = ({ item, onQuantityChange, onRemoveItem, onSelectItem, isSelected }) => {
   // Assuming there is always at least one variant
    const itemVariant = item.selectedVariant; 
    const availableQuantity = itemVariant.quantity;
    const maxQuantity = 5; 

    const handleQuantityIncrease = () => {
        if (item.quantity < availableQuantity && item.quantity < maxQuantity) {
            onQuantityChange(itemVariant.productVariantId, item.quantity + 1);
        } else if (item.quantity >= maxQuantity) {
            // Show a toast notification when trying to exceed the limit
            showErrorToast(`You can only order up to ${maxQuantity} quantities of "${item.name}".`);
        } else {
            // Show a toast notification when the item is out of stock
            showErrorToast(`Product "${item.name}" is out of stock!`);
        }
    };

    const handleQuantityDecrease = () => {
        if (item.quantity > 1) {
            onQuantityChange(itemVariant.productVariantId, item.quantity - 1);
        }
    };

    const handleCheckboxChange = (event) => {
        onSelectItem(itemVariant.productVariantId, event.target.checked);
    };

    return (
        <li className="list-group-item">
            <div className="d-flex justify-content-between">
         
                <div className="position-relative">
                <input
                        type="checkbox"
                        className="position-absolute"
                       
                        style={{
                            top: '10px',
                            left: '10px',
                            zIndex: 1,
                            width: '15px', // Explicit width
                            height: '15px', // Explicit height
                            transform: 'scale(1.5)',  // Optional scaling
                            msTransform: 'scale(1.5)', // IE 9
                            WebkitTransform: 'scale(1.5)', // Safari/Chrome
                            accentColor: '#007bff' // Change color for better visibility (optional)
                        }}
                        checked={isSelected}
                        onChange={handleCheckboxChange}
                       
                    />              
                    <img
                        src={item.imageBase64 ? `data:image/png;base64,${item.imageBase64}` : 'fallback-image.jpg'}
                        alt={item.name}
                        className="product-image-main"
                        style={{ width: "250px", height: "400px", objectFit: "cover" }}
                    />
                                       
                    <h5>{item.name}</h5>
                    <p>{item.shortDescription}</p>
                    <p><strong>Size:</strong> {itemVariant.size}</p>
                    <p><strong>Color:</strong> {itemVariant.color}</p>
                    <p><strong>Price:</strong> ₹{itemVariant.pricePerUnit}</p>
                   
                </div>
            </div>
            <div className="d-flex align-items-center mt-2">
                <button
                    className="minus"
                    onClick={handleQuantityDecrease}
                    //disabled={item.quantity <= 1}
                >
                    -
                </button>
                <span className="mx-1" style={{border:'1px solid gray',width:'50px', height:'30px',textAlign:'center'}}>{item.quantity}</span>
                <button
                    className="plus"
                    onClick={handleQuantityIncrease}
                   // disabled={item.quantity >= availableQuantity}
                >
                    +
                </button>
                <button
                    className="btn btn-danger remove btn-sm ml-3"
                   
                    onClick={() => onRemoveItem(itemVariant.productVariantId)}
                >
                    Remove
                </button>
            </div>
           
        </li>
    );
};
 
export default CartItem;
