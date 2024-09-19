
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Category.css';
 
const Category = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://localhost:7181/api/Product/category/${categoryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchProductsByCategory();
  }, [categoryId]);
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;
 
  return (
    <div className="category-page">
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <Link to={`/product/${product.productId}`} key={product.productId} className="product-item">
            <div className="product-item" key={product.productId}>
              <img src={`data:image/png;base64,${product.imageBase64}`} alt={product.name} />
              <h4>{product.name}</h4>
              <p>{product.shortDescription}</p>
              <p>₹{product.productVariants?.[0]?.pricePerUnit || '0'}</p>
            </div>
            </Link>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};
 
export default Category;