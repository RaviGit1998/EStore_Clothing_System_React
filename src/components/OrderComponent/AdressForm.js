import React, { useState } from 'react';

export default function AddressForm({ onNext }) {
    const [address, setAddress] = useState('');

    function handleSubmit  (e) {
        e.preventDefault();
        onNext(address);
    };

    return (
        <div>
            <h2>Shipping Address</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        id="address"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Next</button>
            </form>
        </div>
    );
}
