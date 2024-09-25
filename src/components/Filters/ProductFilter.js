// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ProductFilter.css';
// import { Link } from 'react-router-dom';
 
// const ProductFilter = (props) => {
//   const [products, setProducts] = useState([]);
//   const [priceRange, setPriceRange] = useState({ min: '', max: '' });
//   const [selectedSize, setSelectedSize] = useState([]);
//   const [selectedColor, setSelectedColor] = useState([]);
//   const [sortOrder, setSortOrder] = useState('price_asc');
//   const [loading, setLoading] = useState(false);
 
//   const debounce = (func, delay) => {
//     let timeout;
//     return (...args) => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => func(...args), delay);
//     };
//   };
 
//   const handlePriceChange = (e) => {
//     const { name, value } = e.target;
//     setPriceRange({ ...priceRange, [name]: value });
//   };
 
//   const handleSizeChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setSelectedSize([...selectedSize, value]);
//     } else {
//       setSelectedSize(selectedSize.filter((size) => size !== value));
//     }
//   };
 
//   const handleColorChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setSelectedColor([...selectedColor, value]);
//     } else {
//       setSelectedColor(selectedColor.filter((color) => color !== value));
//     }
//   };
//   console.log(props.id);
//   const fetchFilteredProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`https://localhost:7181/api/Product/category/${props.id}/filter`, {
//         params: {
//           minPrice: priceRange.min,
//           maxPrice: priceRange.max,
//           size: selectedSize.join(','),
//           color: selectedColor.join(','),
//           sortOrder: sortOrder,
//         },
//       });
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching filtered products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const debouncedFetchProducts = debounce(fetchFilteredProducts, 500);
 
//   useEffect(() => {
//     debouncedFetchProducts();
//   }, [priceRange, selectedSize, selectedColor, sortOrder]);
 
//   return (
//     <div className="product-filter-page1">
//       <aside className="filter-section-container1">
//         <h3>Filter Products</h3>        
//         <div className="filter-section1">
//           <h4>Price Range</h4>
//           <input
//             type="number"
//             name="min"
//             placeholder="Min Price"
//             value={priceRange.min}
//             onChange={handlePriceChange}
//           />
//           <input
//             type="number"
//             name="max"
//             placeholder="Max Price"
//             value={priceRange.max}
//             onChange={handlePriceChange}
//           />
//         </div>
 
//         <div className="filter-section1">
//           <h4>Size</h4>
//           <label>
//             <input type="checkbox" value="S" onChange={handleSizeChange} /> Small
//           </label>
//           <label>
//             <input type="checkbox" value="M" onChange={handleSizeChange} /> Medium
//           </label>
//           <label>
//             <input type="checkbox" value="L" onChange={handleSizeChange} /> Large
//           </label>
//           <label>
//             <input type="checkbox" value="XL" onChange={handleSizeChange} /> Extra Large
//           </label>
//         </div>
 
//         <div className="filter-section1">
//           <h4>Color</h4>
//           <label>
//             <input type="checkbox" value="Red" onChange={handleColorChange} /> Red
//           </label>
//           <label>
//             <input type="checkbox" value="Blue" onChange={handleColorChange} /> Blue
//           </label>
//           <label>
//             <input type="checkbox" value="White" onChange={handleColorChange} /> White
//           </label>
//           <label>
//             <input type="checkbox" value="Black" onChange={handleColorChange} /> Black
//           </label>
//         </div>
 
//         <div className="filter-section1">
//           <h4>Sort By</h4>
//           <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
//             <option value="price_asc">Price (Low to High)</option>
//             <option value="price_desc">Price (High to Low)</option>
//           </select>
//         </div>
//       </aside>
 
//       <main className="product-list-container1">
//         <h3>Products</h3>
//         {loading ? (
//           <p>Loading products...</p>
//         ) : products.length > 0 ? (
//           <div className="product-list1">
//             {products.map((product) => (
//               <Link to={`/product/${product.productId}`} key={product.productId} className="product-item">
//               <div key={product.productId} className="product-item1">
//                 <img
//                   src={`data:image/jpeg;base64,${product.imageBase64}`}
//                   alt={product.name}
//                   className="product-image1"
//                 />
//                 <h4>{product.name}</h4>
//                 <p>{product.shortDescription}</p>
//                 <p>Price: ₹{product.productVariants?.[0]?.pricePerUnit || '0'}</p>
//                 <p>Size: {product.productVariants.map((variant) => variant.size).join(', ')}</p>
//                 <p>Color: {product.productVariants.map((variant) => variant.color).join(', ')}</p>
//               </div>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <p>No products found.</p>
//         )}
//       </main>
//     </div>
//   );
// };
 
// export default ProductFilter;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductFilter.css';
 
const ProductFilter = ({ id, onFilterChange }) => {
 // const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [sortOrder, setSortOrder] = useState('price_asc');
  const [loading, setLoading] = useState(false);
 
 
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
 
 
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange({ ...priceRange, [name]: value });
  };
 
 
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSize((prevSizes) =>
      checked ? [...prevSizes, value] : prevSizes.filter((size) => size !== value)
    );
  };
 
 
  const handleColorChange = (e) => {
    const { value, checked } = e.target;
    setSelectedColor((prevColors) =>
      checked ? [...prevColors, value] : prevColors.filter((color) => color !== value)
    );
  };
 
 
  const fetchFilteredProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://localhost:7181/api/Product/category/${id}/filter`, {
        params: {
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
          size: selectedSize.join(','),
          color: selectedColor.join(','),
          sortOrder: sortOrder,
        },
      });
      onFilterChange(response.data);  
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const debouncedFetchProducts = debounce(fetchFilteredProducts, 500);
 
  useEffect(() => {
    debouncedFetchProducts();
  }, [priceRange, selectedSize, selectedColor, sortOrder]);
 
 
  const resetFilters = () => {
    setPriceRange({ min: '', max: '' });
    setSelectedSize([]);
    setSelectedColor([]);
    setSortOrder('price_asc');
    onFilterChange([]);
  };
 
  return (
    <div className="product-filter-page1">
      <aside className="filter-section-container1">
        <h3>Filter Products</h3>
 
        <div className="filter-section1">
          <h4>Price Range</h4>
          <input
            type="number"
            name="min"
            placeholder="Min Price"
            value={priceRange.min}
            onChange={handlePriceChange}
          />
          <input
            type="number"
            name="max"
            placeholder="Max Price"
            value={priceRange.max}
            onChange={handlePriceChange}
          />
        </div>
 
        <div className="filter-section1">
          <h4>Size</h4>
          {['S', 'M', 'L', 'XL'].map((size) => (
            <label key={size}>
              <input
                type="checkbox"
                value={size}
                checked={selectedSize.includes(size)}
                onChange={handleSizeChange}
              />
              {size}
            </label>
          ))}
        </div>
 
        <div className="filter-section1">
          <h4>Color</h4>
          {['Red', 'Blue', 'White', 'Black', 'Yellow', 'Green', 'Maroon', 'Pink', 'Orange', 'Grey', 'Sky Blue'].map((color) => (
            <label key={color}>
              <input
                type="checkbox"
                value={color}
                checked={selectedColor.includes(color)}
                onChange={handleColorChange}
              />
              {color}
            </label>
          ))}
        </div>
 
        <div className="filter-section1">
          <h4>Sort By</h4>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
          </select>
        </div>
 
        <button className="reset-button" onClick={resetFilters}>
          Reset Filters
        </button>
      </aside>
    </div>
  );
};
 
export default ProductFilter;
 
 