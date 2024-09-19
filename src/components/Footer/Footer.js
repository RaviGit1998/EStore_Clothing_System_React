import React from 'react';
import './Footer.css'; // Assuming your CSS file is named Footer.css

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="lists">
          <div>          
            <ul>
            <li className="lih2">PRODUCT CATEGORIES</li>
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>TopWear</li>  
              <li>BottomWear</li>           
            </ul>
          </div>
          <div>
            <ul>
            <li className="lih2">SITE INFO</li>
              <li>About Online Shop</li>
              <li>Request Service</li>
              <li>Site Map</li>
              <li>Gift Cards</li>
              <li>Corporate Enquiries</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>          
            <ul>
            <li className="lih2">RESOURCE CENTER</li>
              <li>Product Reviews</li>
              <li>Buying Guides</li>
              <li>How Tos</li>
              <li>Featured Stories</li>
              <li>Events and Happenings</li>
              <li>Nearby Store</li>
            </ul>
          </div>
          <div>
            <ul>
            <li className="lih2">POLICIES</li>
              <li>Terms of Use</li>
              <li>FAQs</li>
              <li>Cancellations and Return Policies</li>
              <li>Pricing and Payment Policy</li>
              <li>Shipping and Delivery Policy</li>
              <li>Privacy Policy</li>
              <li>EMI & Cashback T&C</li>
              <li>Caution Notice</li>
            </ul>
          </div>
        </div>
        <div className="logo">
        <img src="vastra.jpg"  alt="Logo" className="logoImg" />
        </div>
        <div className="icons">
          <div>
            <h3>FOLLOW US</h3>
            <a href="https://www.facebook.com/vastrakurtianddresses/"><img src="facebook.png" alt="Facebook Icon" /></a>
            <a href="https://www.instagram.com/vastra_official/?hl=en"><img src="instagram.png" alt="Instagram Icon" /></a>
            <a href="https://www.instagram.com/vastra_official/?hl=en"><img src="twitter.png" alt="Twitter Icon" /></a>
          </div>
          <div>
            <h3>EXPERIENCE VASTRA ONLINE</h3>
            <img className="iconsimg2"
              src="gplay.png"
              alt="Google Play"
              width="100px"
              height="40px"
            />
            <img className="iconsimg2"  
              src="appStore.png" 
              alt="Apple App Store"
              width="100px"
              height="40px"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;

