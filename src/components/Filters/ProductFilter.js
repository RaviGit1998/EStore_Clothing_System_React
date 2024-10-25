import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductFilter.css';

const ProductFilter = ({ id, onFilterChange }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [sortOrder, setSortOrder] = useState('price_asc');

  const [showSizes, setShowSizes] = useState(false); // State for size visibility
  const [showColors, setShowColors] = useState(false); // State for color visibility

  const [loading, setLoading] = useState(true); // Loading state for API call

  // Fetch products by category from the API
  const fetchProductsByCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://localhost:7181/api/Product/category/${id}`);
      setProducts(response.data);
      setFilteredProducts(response.data); // Set initial display of all products
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      setLoading(false);
    }
  };

  // Price range change handler
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange({ ...priceRange, [name]: value });
  };

  // Size selection handler
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSize((prevSizes) =>
      checked ? [...prevSizes, value] : prevSizes.filter((size) => size !== value)
    );
  };

  // Color selection handler
  const handleColorChange = (e) => {
    const { value, checked } = e.target;
    setSelectedColor((prevColors) =>
      checked ? [...prevColors, value] : prevColors.filter((color) => color !== value)
    );
  };

  // Function to filter products based on the filters applied
  const applyFilters = () => {
    let filtered = [...products]; 

    // Filter by price range
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter(product => {
        const price = product.productVariants?.[0]?.pricePerUnit;
        const minCheck = priceRange.min ? price >= parseFloat(priceRange.min) : true;
        const maxCheck = priceRange.max ? price <= parseFloat(priceRange.max) : true;
        return minCheck && maxCheck;
      });
    }

    // Filter by selected sizes
    if (selectedSize.length > 0) {
      filtered = filtered.filter(product =>
        selectedSize.includes(product.productVariants?.[0]?.size)
      );
    }

    // Filter by selected colors
    if (selectedColor.length > 0) {
      filtered = filtered.filter(product =>
        selectedColor.includes(product.productVariants?.[0]?.color)
      );
    }

   filtered = filtered.sort((a, b) => {
   const priceA = a.productVariants?.[0]?.pricePerUnit || 0; 
   const priceB = b.productVariants?.[0]?.pricePerUnit || 0; 

    if (sortOrder === 'price_asc') {
    return priceA - priceB;  
    } else {
    return priceB - priceA; 
    }
   });


    // Update filtered products and notify the parent component
    setFilteredProducts(filtered);
    onFilterChange(filtered);
  };

  // Apply filters whenever any filter state changes
  useEffect(() => {
    applyFilters();
  }, [priceRange, selectedSize, selectedColor, sortOrder, products]);

  // Fetch products when the category changes
  useEffect(() => {
    fetchProductsByCategory();
  }, [id]);

  // Reset all filters to default
  const resetFilters = () => {
    setPriceRange({ min: '', max: '' });
    setSelectedSize([]);
    setSelectedColor([]);
    setSortOrder('price_asc');
    setFilteredProducts(products); 
    onFilterChange(products);
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
            Size {showSizes ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
          </h4>
          {showSizes && (
            <div className="size-options">
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
          )}
        </div>
        <hr />
        <div className="filter-section1">
          <h4 onClick={() => setShowColors(!showColors)} style={{ cursor: 'pointer' }}>
            Color {showColors ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
          </h4>
          {showColors && (
            <div className="color-options">
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

      {loading ? <p>Loading products...</p> : null}
    </div>
  );
};

export default ProductFilter;
