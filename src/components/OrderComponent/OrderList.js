import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function OrderList({ userId, onSelectOrder }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await axios.get(`https://localhost:7181/api/Order/user/${userId}`);
                console.log('Orders fetched:', response.data); // Log the response to check data structure
                
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error Fetching Orders');
                setLoading(false);
            }
        }
        fetchOrders();
    }, [userId]);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-4">
            <h2>Your Orders</h2>
            <ul className="list-group">
                {orders.map(order => (
                    <li
                        key={order.id} // Ensure this key is unique
                        className="list-group-item d-flex justify-content-between align-items-center"
                        onClick={() => onSelectOrder(order.id)} // Ensure this function call is valid
                    >
                        Order #{order.id}
                        <span className="badge bg-primary rounded-pill">${order.TotalAmount}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
