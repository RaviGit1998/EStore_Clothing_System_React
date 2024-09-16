import 'bootstrap/dist/css/bootstrap.min.css';
 import ProductDetails from './ProductDetails';
export default function ProductListing({ products, onProductClick, onAddToCart}) {
  return (
    <div className="container mt-4">
      <h2>Product Listing</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.productId}>
            <div className="card">
            <img src={`data:image/png;base64,${product.imageBase64}`} alt={product.name} />
              <div className="card-body">
     <h5>{product.name}</h5>
                <p className="card-text">${product.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    console.log('Product Details:', product); // Add log to verify product
                    onProductClick(product); // Handle product details view
                  }}
                >
                  View Details
                </button>
                {onProductClick === product && (
            <ProductDetails
              product={product}
              onAddToCart={onAddToCart}
              onBack={() => onProductClick(null)} // Go back to the product listing
            />
          )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}