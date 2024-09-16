import React from 'react';
import './Footer.css'; // Assuming your CSS file is named Footer.css

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="lists">
          <div>
            <h2>PRODUCT CATEGORIES</h2>
            <ul>
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>TopWear</li>  
              <li>BottomWear</li>           
            </ul>
          </div>
          <div>
            <h2>SITE INFO</h2>
            <ul>
              <li>About Online Shop</li>
              <li>Request Service</li>
              <li>Site Map</li>
              <li>Gift Cards</li>
              <li>Corporate Enquiries</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h2>RESOURCE CENTER</h2>
            <ul>
              <li>Product Reviews</li>
              <li>Buying Guides</li>
              <li>How Tos</li>
              <li>Featured Stories</li>
              <li>Events and Happenings</li>
              <li>Nearby Store</li>
            </ul>
          </div>
          <div>
            <h2>POLICIES</h2>
            <ul>
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
        <div className="icons">
          <div>
            <h3>FOLLOW US</h3>
            <img src="facebook.png" alt="Facebook Icon" />
            <img src="instagram.png" alt="Instagram Icon" />
            <img src="twitter.png" alt="Twitter Icon" />
          </div>
          <div>
            <h3>EXPERIENCE RELIANCE DIGITAL ONLINE</h3>
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

