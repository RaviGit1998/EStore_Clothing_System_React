
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
  const userName = localStorage.getItem('userName');
  const displayName = userName ? userName.substring(0, 7) : '';
  return (
    <nav className="navbar navbar-expand-lg custom-navbar box-nav">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <NavLink className="navbar-brand" to="/">
            <img src={`${process.env.PUBLIC_URL}/vastra.jpg`} className="img-fluid custom-logo" alt="Logo" />
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
                <i className="fa-regular fa-user"></i>
              </span>
              {userName ? (
                <NavLink to="/profile" className="nav-link">{displayName}</NavLink>
              ) : (
                <NavLink to="/profile" className="nav-link">Profile</NavLink>
              )}
              {dropdownVisible && (
                <div className="dropdown-menu show">
                  <NavLink className="dropdown-item" to="/login">Login</NavLink>
                  <NavLink className="dropdown-item" to="/signup">Signup</NavLink>
                  <button
        className=" btn-logout dropdown-item"
        onClick={() => {
          const isLoggedOut = !localStorage.getItem('jwtToken'); // Check if the user is already logged out
 
          if (isLoggedOut) {
            alert('you have already loggedout')
            return;
          }
     
          // Confirm logout
          const confirmLogout = window.confirm("Are you sure you want to log out?");
          if (confirmLogout) {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('role');
            localStorage.removeItem('cartContainer');
            localStorage.removeItem('wishlist');
            localStorage.removeItem('userName');
            setCartItems([]);
          alert('you have logged out succesfully');
            navigate('/login');
          }
        }}
      >
        Logout
      </button>
                </div>
              )}
            </li>
            <li className="nav-item">
              <span className="icon-style">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
          </svg>
              {cartCount>0 ? cartCount : ""}
              </span>
              <NavLink to="/cart" className="nav-link">Cart</NavLink>
            </li>
            <li className="nav-item">
              <span className="icon-style">
                <i className="fa-regular fa-heart"></i>
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