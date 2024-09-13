import { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export default  function ProductListing({onAddToCart}){
   const [products,setProducts]=useState([]);
   const [loading,setLoading] = useState(true);
   const [error,setError]=useState(null);

   useEffect(() =>{
      async function  fetchProducts(){
        try{
            const respone=await axios.get('https://localhost:7181/api/Product');
            const data=await respone.json();
            setProducts(data);
          }
          catch(error){
            console.error('Errr Fetching Products:', error);
          }
       };
         
      fetchProducts();
   },[]);

   if (loading) return <p>Loading products...</p>; // Show loading message while fetching
   if (error) return <p>{error}</p>; // Show error message if there's an error
   return(
    <div className="container mt-4">
    <h2>Product Listing</h2>
    <div className="row">
        {products.map(product => (
            <div className="col-md-4 mb-4" key={product.id}>
                <div className="card">
                    <img src={product.imageUrl} className="card-img-top" alt={product.name} />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">${product.price}</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => onAddToCart(product)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
);
}