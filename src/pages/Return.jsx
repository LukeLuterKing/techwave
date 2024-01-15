import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css'; // Import stylów z Orders.css
import Profile from "../components/Profile"; // Importuj komponent "Profile"

const Returns = () => {
    const [returns, setReturns] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/returns', { withCredentials: true })
            .then(response => {
                if (Array.isArray(response.data)) {
                    setReturns(response.data);
                } else {
                    console.error('Invalid data format received:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching returns:', error);
            });
    }, []);

    



    return (
        <div>
            <ul>
                {returns.map(returnItem => (
                    <li key={returnItem.id} className="order-item"> {/* Używamy tej samej klasy co w Orders */}
                        {returnItem.productname} - {returnItem.Price} zł - {returnItem.quantity} szt.
                        {/* Możesz dodać więcej informacji o zwrocie tutaj */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Returns;
