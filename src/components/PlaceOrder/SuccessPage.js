// import { useLocation, Link } from 'react-router-dom';
 
// function SuccessPage() {
//   const location = useLocation();
//   const { state } = location;
 
//   if (!state) {
//     return <div>No order details available.</div>;
//   }
//   const { orderItems, totalAmount, discountedTotal } = state;
//   console.log("order items",orderItems);
//   return (
//     <div className="container mt-4">
//           <h2>Order Successful!</h2>
//       <h2>Order Details</h2>
//       <ul className="list-group">
//         {orderItems.map(item => (
//           <li key={item.productVariants[0].productVariantId} className="list-group-item d-flex justify-content-between align-items-center" style={{width:"500px"}}>
//             <div>
//               <img
//                 src={`data:image/png;base64,${item.imageBase64}`}
//                 alt={item.name}
//                 className="product-image-main"
//                 style={{ width: "400px", height: "500px" }}
//               />
//               <h5>{item.name}</h5>
//               <p>${item.productVariants[0].pricePerUnit} x {item.quantity}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <h4 className="mt-4">Total: ${totalAmount}</h4>
//       {discountedTotal !== null && (
//         <h4 className="mt-4">Total Amount Paid: ${discountedTotal}</h4>
//       )}
 
//       <Link to="/">
//         <button className="btn btn-primary mt-4">Return to Home Page</button>
//       </Link>
//     </div>
//   );
// }
 
// export default SuccessPage;
// import { useLocation, Link } from 'react-router-dom';
// import { useContext } from 'react';
// import { CartContext } from '../Cart/CartContext';
// function SuccessPage() {
//  const location = useLocation();
//  const { state } = location;
//  console.log('State:', state);

//  const {shippingDetails}=useContext(CartContext);


//  if (!state) {
//    return <div>No order details available.</div>;
//  }
//  const { orderItems, totalAmount, discountedTotal } = state;

//  console.log('Shipping details in the  SuccessPage:', shippingDetails);
// //console.log('traackign number' ,shippingDetails.trackingNumber)
//  console.log("order items",orderItems);
//  return (
//    <div className="container mt-4">
//          <h2>Order Successful!</h2>
//      <h2>Order Details</h2>
//      <ul className="list-group">
    
//        {orderItems.map(item => (
//          <li key={item.productVariants[0].productVariantId} className="list-group-item d-flex justify-content-between align-items-center" style={{width:"500px"}}>
//            <div>
//              <img
//                src={`data:image/png;base64,${item.imageBase64}`}
//                alt={item.name}
//                className="product-image-main"
//                style={{ width: "400px", height: "500px" }}
//              />
//              <h5>{item.name}</h5>
//              <p>size :{item.productVariants[0].size}</p>
//              <p>color :{item.productVariants[0].color}</p>
//              <p>${item.productVariants[0].pricePerUnit} x {item.quantity}</p>
//            </div>
//          </li>
//        ))}
//      </ul>
//      <h4 className="mt-4">Total: ${totalAmount}</h4>
//      {discountedTotal !== null && (
//        <h4 className="mt-4">Total Amount Paid: ${discountedTotal}</h4>
//      )}

  

// {/* <h5 style={{textAlign:'left'}}>Shipping Details:</h5>
//      <ul className="list-group">
//        <li className="list-group-item">
//          <p>Tracking Number: {shippingDetails.trackingNumber}</p>
//          <p>Shipping Date: {new Date(shippingDetails.shippigDate).toDateString()}</p>
//          <p>Estimated Delivery Date: {new Date(shippingDetails.estimatedDeliveryDate).toDateString()}</p>
//        </li>
//      </ul> */}

//      <Link to="/">
//        <button className="btn btn-primary mt-4">Return to Home Page</button>
//      </Link>
//    </div>
//  );
// }

// export default SuccessPage;

import { useLocation, Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../Cart/CartContext';
 
function SuccessPage() {
 const location = useLocation();
 const { state } = location;
 console.log('State:', state);
 
 const { shippingDetails }=useContext(CartContext);
 
 
 if (!state) {
   return <div>No order details available.</div>;
 }
 const { orderItems, totalAmount, discountedTotal } = state;
 
 console.log('Shipping details in the  SuccessPage:', shippingDetails);
//console.log('traackign number' ,shippingDetails.trackingNumber)
 console.log("order items",orderItems);
 return (
   <div className="container mt-4">
         <h2>Order Successful!</h2>
     <h2>Order Details</h2>
     <ul className="list-group">
   
       {orderItems.map(item => (
         <li key={item.productVariants[0].productVariantId} className="list-group-item d-flex justify-content-between align-items-center" style={{width:"500px"}}>
           <div>
             <img
               src={`data:image/png;base64,${item.imageBase64}`}
               alt={item.name}
               className="product-image-main"
               style={{ width: "400px", height: "500px" }}
             />
             <h5>{item.name}</h5>
             <p>{item.shortDescription}</p>
             <p>size : {item.productVariants[0].size}</p>
             <p>color : {item.productVariants[0].color}</p>
             <p>${item.productVariants[0].pricePerUnit} x {item.quantity}</p>
           </div>
         </li>
       ))}
     </ul>
     <h4 className="mt-4">Total: ${totalAmount}</h4>
     {discountedTotal !== null && (
       <h4 className="mt-4">Total Amount Paid: ${discountedTotal}</h4>
     )} <br />
 
 
 
<h5 style={{textAlign:'left'}}>Shipping Details:</h5>
     <ul className="list-group">
       <li className="list-group-item">
        <h6>Order Id : {shippingDetails.orderId}</h6>
         <p>Tracking Number: {shippingDetails.trackingNumber}</p>
         <p>Shipping Date: {new Date(shippingDetails.shippigDate).toDateString()}</p>
         <p>Estimated Delivery Date: {new Date(shippingDetails.estimatedDeliveryDate).toDateString()}</p>
       </li>
     </ul>
 
     <Link to="/">
       <button className="btn btn-primary mt-4">Return to Home Page</button>
     </Link>
   </div>
 );
}
 
export default SuccessPage;