import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Header.css'; 
import {NavLink,} from 'react-router-dom';


function Header() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <a className="navbar-brand" href="#">
            <img src="logo.png" className="img-fluid custom-logo" alt="Logo" />
          </a>
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
            <li className="nav-item">
              <a className="nav-link" href="#">Men</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Women</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Kids</a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto my-2 my-lg-0">
            <li className="nav-item">
              <span className="icon-style"><i className="fa-solid fa-user"></i></span>
             <NavLink to="/profile" className="nav-link">Profile</NavLink>           
            </li>
            <li className="nav-item">
              <span className="icon-style"><i className="fa-solid fa-cart-shopping"></i></span>
              <a className="nav-link" href="#">Cart</a>
            </li>
            <li className="nav-item">
              <span className="icon-style"><i className="fa-solid fa-heart"></i></span>
              <a className="nav-link" href="#">WishList</a>
            </li>
          </ul>
        </div>
        <form className="d-flex mx-auto" role="search">
          <input
            style={{ marginLeft: '10px' }}
            className="form-control me-2 custom-search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
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


