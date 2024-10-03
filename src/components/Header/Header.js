
// import React, { useContext, useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import './Header.css';
// import { NavLink ,useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import { CartContext } from '../Cart/CartContext';

// function Header() {
//   const [categories, setCategories] = useState([]);
//    const {cartCount}=useContext(CartContext);
//   const [keyword, setKeyword] = useState('');
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('https://localhost:7181/api/Category');
//         setCategories(response.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (keyword) {
//       navigate(`/search?keyword=${keyword}`);
//     }
//   };
//   return (
//     <nav className="navbar navbar-expand-lg custom-navbar box-nav">
//       <div className="container-fluid">
//         <div className="d-flex align-items-center">
//           <NavLink className="navbar-brand" to="/">
//             <img src="vastra.jpg" className="img-fluid custom-logo" alt="Logo" />
//           </NavLink>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarScroll"
//             aria-controls="navbarScroll"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//         </div>
//         <div className="collapse navbar-collapse" id="navbarScroll">
//           <ul className="navbar-nav me-auto my-2 my-lg-0">
//             {categories.map((category) => (
//               <li className="nav-item" key={category.categoryId}>
//                 <NavLink className="nav-link" to={`/category/${category.categoryId}`}>
//                 {category.categoryName.toUpperCase()}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//           <ul className="navbar-nav ms-auto my-2 my-lg-0">
//             <li className="nav-item">
//               <span className="icon-style">
//                 <i className="fa-solid fa-user"></i>
//               </span>
//               <NavLink to="/profile" className="nav-link">Profile</NavLink>
//             </li>
//             <li className="nav-item">
//               <span className="icon-style">
//                 <i className="fa-solid fa-cart-shopping">{cartCount}</i>
//               </span>
//               <NavLink to="/cart" className="nav-link">
//                 Cart 
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <span className="icon-style">
//                 <i className="fa-solid fa-heart"></i>
//               </span>
//               <NavLink to="/wishlist" className="nav-link">
//                 WishList
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//         <form className="d-flex mx-auto" role="search" onSubmit={handleSearchSubmit}>
//             <input
//               className="form-control me-2 custom-search-input"
//               type="search"
//               placeholder="Search for products..."
//               aria-label="Search"
//               value={keyword}
//               onChange={(e) => setKeyword(e.target.value)}
//             />
//             <button className="btn btn-outline-light custom-search-button" type="submit">
//               <i className="fa-brands fa-searchengin"></i>
//             </button>
//           </form>
//       </div>
//     </nav>
//   );
// }

// export default Header;


import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../Cart/CartContext';
function Header() {
  const [categories, setCategories] = useState([]);
  const { cartCount } = useContext(CartContext);
  const [keyword, setKeyword] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const {setCartItems}=useContext(CartContext);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://localhost:7181/api/Category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
 
    fetchCategories();
  }, []);
 
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search?keyword=${keyword}`);
    }
  };
 
  const handleProfileMouseEnter = () => setDropdownVisible(true);
  const handleProfileMouseLeave = () => setDropdownVisible(false);
 
  return (
    <nav className="navbar navbar-expand-lg custom-navbar box-nav">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <NavLink className="navbar-brand" to="/">
            <img src="vastra.jpg" className="img-fluid custom-logo" alt="Logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0">
            {categories.map((category) => (
              <li className="nav-item" key={category.categoryId}>
                <NavLink className="nav-link" to={`/category/${category.categoryId}`}>
                  {category.categoryName.toUpperCase()}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="navbar-nav ms-auto my-2 my-lg-0">
            <li className="nav-item" onMouseEnter={handleProfileMouseEnter} onMouseLeave={handleProfileMouseLeave}>
              <span className="icon-style">
                <i className="fa-solid fa-user"></i>
              </span>
              <NavLink to="/profile" className="nav-link">Profile</NavLink>
              {dropdownVisible && (
                <div className="dropdown-menu show">
                  <NavLink className="dropdown-item" to="/login">Login</NavLink>
                  <NavLink className="dropdown-item" to="/signup">Signup</NavLink>
                  <button
        className=" btn-logout dropdown-item"
        onClick={() => {
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('userId');
          localStorage.removeItem('role');
          localStorage.removeItem('cartContainer');
          setCartItems([]);
        
          navigate('/login');
        }}
      >
        Logout
      </button>
                </div>
              )}
            </li>
            <li className="nav-item">
              <span className="icon-style">
                <i className="fa-solid fa-cart-shopping">{cartCount}</i>
              </span>
              <NavLink to="/cart" className="nav-link">Cart</NavLink>
            </li>
            <li className="nav-item">
              <span className="icon-style">
                <i className="fa-solid fa-heart"></i>
              </span>
              <NavLink to="/wishlist" className="nav-link">WishList</NavLink>
            </li>
          </ul>
        </div>
        <form className="d-flex mx-auto" role="search" onSubmit={handleSearchSubmit}>
          <input
            className="form-control me-2 custom-search-input"
            type="search"
            placeholder="Search for products..."
            aria-label="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="btn btn-outline-light custom-search-button" type="submit">
            <i className="fa-brands fa-searchengin"></i>
          </button>
        </form>
      </div>

    </nav>
  );
}
 
export default Header;
