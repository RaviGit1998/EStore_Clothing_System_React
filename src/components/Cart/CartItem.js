
// import React from 'react';

// const CartItem = ({ item, onQuantityChange, onRemoveItem }) => {
//     const item1 = item.productVariants[0]; // Assuming there is always at least one variant

//     const handleQuantityChange = (event) => {
//         const newQuantity = parseInt(event.target.value, 10);
//         onQuantityChange(item1.productVariantId, newQuantity);
//     };

//     return (
//         <li className="list-group-item">
//             <div className="d-flex justify-content-between">
//                 <div>
//                     <img
//                         src={item.imageBase64 ? `data:image/png;base64,${item.imageBase64}` : 'fallback-image.jpg'}
//                         alt={item.name}
//                         className="product-image-main"
//                         style={{ width: "100px", height: "100px", objectFit: "cover" }} // Adjust size as needed
//                     />
//                     <h5>{item.name}</h5>
//                     <p>{item.shortDescription}</p>
//                     <p><strong>Size:</strong> {item1.size}</p>
//                     <p><strong>Color:</strong> {item1.color}</p>
//                     <p><strong>Price:</strong> ₹{item1.pricePerUnit}</p>
//                     <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => onRemoveItem(item1.productVariantId)}
//                     >
//                         Remove
//                     </button>
//                 </div>
//             </div>
//             <div className="d-flex justify-content-between align-items-center mt-2">
//                 <input
//                     type="number"
                  
//                     min="1"
//                     max="10"
//                     value={item.quantity || 1} // Default to 0 if item.quantity is undefined
//                     onChange={handleQuantityChange}
//                     className="form-control w-25"
//                 />
//             </div>
//         </li>
//     );
// };

// export default CartItem;


// import React from 'react';

// const CartItem = ({ item, onQuantityChange, onRemoveItem }) => {
//     const item1 = item.productVariants[0]; // Assuming there is always at least one variant

//     const handleQuantityChange = (event) => {
//         const newQuantity = parseInt(event.target.value, 10);
//         onQuantityChange(item1.productVariantId, newQuantity);
//     };
//     const handleWheel = (event) => {
//         event.preventDefault();
//         const delta = event.deltaY;
//         if (delta > 0) {
//             handleQuantityChange(-1); // Scroll down decreases quantity
//         } else {
//             handleQuantityChange(1); // Scroll up increases quantity
//         }
//     };

//     const handleKeyDown = (event) => {
//         event.preventDefault(); // Disable manual input from keyboard
//     };
//     return (
//         <li className="list-group-item">
//             <div className="d-flex justify-content-between">
//                 <div>
//                     <img
//                         src={item.imageBase64 ? `data:image/png;base64,${item.imageBase64}` : 'fallback-image.jpg'}
//                         alt={item.name}
//                         className="product-image-main"
//                         style={{ width: "200px", height: "300px", objectFit: "cover" }} // Adjust size as needed
//                     />
//                     <h5>{item.name}</h5>
//                     <p>{item.shortDescription}</p>
//                     <p><strong>Size:</strong> {item1.size}</p>
//                     <p><strong>Color:</strong> {item1.color}</p>
//                     <p><strong>Price:</strong> ₹{item1.pricePerUnit}</p>
//                     <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => onRemoveItem(item1.productVariantId)}
//                     >
//                         Remove
//                     </button>
//                 </div>
//             </div>
//             <div className="d-flex justify-content-between align-items-center mt-2">
//                 <input
//                     type="number"
                  
//                     min="1"
//                     max="10"
//                     value={item.quantity || 1} // Default to 0 if item.quantity is undefined
//                     onChange={handleQuantityChange}
//                     onWheel={handleWheel} // Handle mouse scroll to adjust quantity
//                     onKeyDown={handleKeyDown} 
//                     className="form-control w-25"
//                 />
//             </div>
//         </li>
//     );
// };

// export default CartItem;
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './CartItem.css'
// import React from 'react';

// const CartItem = ({ item, onQuantityChange, onRemoveItem, onSelectItem, isSelected }) => {
//     const item1 = item.productVariants[0]; // Assuming there is always at least one variant

//     const handleQuantityChange = (event) => {
//         const newQuantity = parseInt(event.target.value, 10);
//         onQuantityChange(item1.productVariantId, newQuantity);
//     };

//     const handleWheel = (event) => {
//         event.preventDefault();
//         const delta = event.deltaY;
//         if (delta > 0) {
//             handleQuantityChange(-1); // Scroll down decreases quantity
//         } else {
//             handleQuantityChange(1); // Scroll up increases quantity
//         }
//     };

//     const handleKeyDown = (event) => {
//         event.preventDefault(); // Disable manual input from keyboard
//     };

//     const handleCheckboxChange = (event) => {
//         onSelectItem(item1.productVariantId, event.target.checked);
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
//                         style={{ width: "250px", height: "400px", objectFit: "cover" }}
//                     />
                                       
//                     <h5>{item.name}</h5>
//                     <p>{item.shortDescription}</p>
//                     <p><strong>Size:</strong> {item1.size}</p>
//                     <p><strong>Color:</strong> {item1.color}</p>
//                     <p><strong>Price:</strong> ₹{item1.pricePerUnit}</p>
//                     <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => onRemoveItem(item1.productVariantId)}
//                     >
//                         Remove
//                     </button>
//                 </div>
//             </div>
//             <div className="d-flex justify-content-between align-items-center mt-2">
//                 <input
//                     type="number"
//                     min="1"
//                     max="5"
//                     value={item.quantity || 1}
//                     onChange={handleQuantityChange}
//                     onWheel={handleWheel}
//                     onKeyDown={handleKeyDown}
//                     className="form-control w-25"
//                 />
//             </div>
//         </li>
//     );
// };

// export default CartItem;

import 'bootstrap/dist/css/bootstrap.min.css';
import './CartItem.css'
import React from 'react';
import { ToastContainer,toast } from 'react-toastify';

const CartItem = ({ item, onQuantityChange, onRemoveItem, onSelectItem, isSelected }) => {
    const item1 = item.productVariants[0]; // Assuming there is always at least one variant

    const availableQuantity = item.productVariants[0].quantity;

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (newQuantity > availableQuantity) {
            toast.error(`Only ${availableQuantity} quantities available!`);
        } else {
            onQuantityChange(item1.productVariantId, newQuantity);
        }
    };

    const handleWheel = (event) => {
        event.preventDefault();
        const delta = event.deltaY;
        if (delta > 0) {
            handleQuantityChange(-1); // Scroll down decreases quantity
        } else {
            handleQuantityChange(1); // Scroll up increases quantity
        }
    };

    const handleKeyDown = (event) => {
        event.preventDefault(); // Disable manual input from keyboard
    };

    const handleCheckboxChange = (event) => {
        onSelectItem(item1.productVariantId, event.target.checked);
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
                    max={availableQuantity}
                    value={item.quantity || 1}
                    onChange={handleQuantityChange}
                    onWheel={handleWheel}
                    onKeyDown={handleKeyDown}
                    className="form-control w-25"
                />
            </div>
            <ToastContainer />
        </li>
    );
};

export default CartItem;

