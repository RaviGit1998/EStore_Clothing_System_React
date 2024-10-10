
 
// import React, { useState, useEffect } from 'react';

// import axios from 'axios';
// import './ProductFilter.css';
 
// const ProductFilter = ({ id, onFilterChange }) => {
//  // const [products, setProducts] = useState([]);
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
//     setSelectedSize((prevSizes) =>
//       checked ? [...prevSizes, value] : prevSizes.filter((size) => size !== value)
//     );
//   };
 
 
//   const handleColorChange = (e) => {
//     const { value, checked } = e.target;
//     setSelectedColor((prevColors) =>
//       checked ? [...prevColors, value] : prevColors.filter((color) => color !== value)
//     );
//   };
 
 
//   const fetchFilteredProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`https://localhost:7181/api/Product/category/${id}/filter`, {
//         params: {
//           minPrice: priceRange.min,
//           maxPrice: priceRange.max,
//           size: selectedSize.join(','),
//           color: selectedColor.join(','),
//           sortOrder: sortOrder,
//         },
//       });
//       onFilterChange(response.data);  
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
 
 
//   const resetFilters = () => {
//     setPriceRange({ min: '', max: '' });
//     setSelectedSize([]);
//     setSelectedColor([]);
//     setSortOrder('price_asc');
//     onFilterChange(null);  
//   };
 
 
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
//           {['S', 'M', 'L', 'XL'].map((size) => (
//             <label key={size}>
//               <input
//                 type="checkbox"
//                 value={size}
//                 checked={selectedSize.includes(size)}
//                 onChange={handleSizeChange}
//               />
//               {size}
//             </label>
//           ))}
//         </div>
//         <div className="filter-section1">
//           <h4>Color</h4>
//           {['Red', 'Blue', 'White', 'Black', 'Yellow', 'Green', 'Maroon', 'Pink', 'Orange', 'Grey', 'Sky Blue'].map((color) => (
//             <label key={color}>
//               <input
//                 type="checkbox"
//                 value={color}
//                 checked={selectedColor.includes(color)}
//                 onChange={handleColorChange}
//               />
//               {color}
//             </label>
//           ))}
//         </div>
//         <div className="filter-section1">
//           <h4>Sort By</h4>
//           <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
//             <option value="price_asc">Price (Low to High)</option>
//             <option value="price_desc">Price (High to Low)</option>
//           </select>
//         </div>  
//         <button className="reset-button" onClick={resetFilters}>
//           Reset Filters
//         </button>
//       </aside>
//     </div>
//   );
// };
// export default ProductFilter;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductFilter.css';
 
const ProductFilter = ({ id, onFilterChange, onPriceRangeChange }) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [sortOrder, setSortOrder] = useState('price_asc');
  const [loading, setLoading] = useState(false);
 
  const [showSizes, setShowSizes] = useState(false); // State for size visibility
  const [showColors, setShowColors] = useState(false); // State for color visibility
 
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
    onPriceRangeChange({ ...priceRange, [name]: value });
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
    onFilterChange(null);  
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
        <hr />
        <div className="filter-section1">
          <h4 onClick={() => setShowSizes(!showSizes)} style={{ cursor: 'pointer' }}>
            Size {showSizes ? <i class="fa-solid fa-angle-up"></i> : <i class="fa-solid fa-angle-down"></i>}
          </h4>
          {showSizes && (
            <div className="size-options">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <label key={size} style={{display:'flex',alignItems:'center'}}>
                    { <span style={{ marginLeft: 4 }}>{size}</span> }
                  <input
                    type="checkbox"
                    value={size}
                    checked={selectedSize.includes(size)}
                    onChange={handleSizeChange} 
                    style={{verticalAlign: 'middle',marginBottom:20}}                  
                  />              
                </label>
              ))}
            </div>
          )}
        </div>
        <hr />
        <div className="filter-section1">
          <h4 onClick={() => setShowColors(!showColors)} style={{ cursor: 'pointer' }}>
            Color {showColors ? <i class="fa-solid fa-angle-up" ></i> : <i class="fa-solid fa-angle-down" ></i>}
          </h4>
          {showColors && (
            <div className="color-options">
              {['Red', 'Blue', 'White', 'Black', 'Yellow', 'Green', 'Maroon', 'Pink', 'Orange', 'Grey', 'Sky Blue'].map((color) => (
                <label key={color} >
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
          )}
        </div>
        <hr />
        <div className="filter-section1">
          <h4>Sort By</h4>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
          </select>
        </div>
        <hr />
        <button className="reset-button" onClick={resetFilters}>
          Reset Filters
        </button>
      </aside>
    </div>
  );
};
 
export default ProductFilter;