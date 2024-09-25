import React, { useState, useEffect } from 'react';
import './Adress.css';

const AddressForm = ({ onSubmit, initialAddress, onCancel }) => {
  const userId=localStorage.getItem('userId')
  const [address, setAddress] = useState({
    userId:userId,
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });

  useEffect(() => {
    if (initialAddress) {
      setAddress(initialAddress);
    }
  }, [initialAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <h4>{initialAddress ? 'Edit Address' : 'Add Address'}</h4>
      <div>
        <label>Street:</label>
        <input
          type="text"
          name="street"
          value={address.street}
          onChange={handleChange}
          required
          className="address-input"
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          required
          className="address-input"
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          name="state"
          value={address.state}
          onChange={handleChange}
          required
          className="address-input"
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={address.country}
          onChange={handleChange}
          required
          className="address-input"
        />
      </div>
      <div>
        <label>Postal Code:</label>
        <input
          type="text"
          name="postalCode"
          value={address.postalCode}
          onChange={handleChange}
          required
          className="address-input"
        />
      </div>
      <button type="submit" className="submit-button">
        {initialAddress ? 'Update Address' : 'Add Address'}
      </button>
      <button type="button" onClick={onCancel} className="cancel-button">
        Cancel
      </button>
    </form>
  );
};

export default AddressForm;
