import React, { useState, useEffect } from 'react';
import axios from "../api/axios";
import './Orders.css'; 

const Returns = () => {
    const [returns, setReturns] = useState([]);

    useEffect(() => {
        axios.get('/api/returns', { withCredentials: true })
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
        <div className='ml-5'>
            {returns.length > 0 ? (
                <ul>
                    {returns.map(returnItem => (
                        <li key={returnItem.id} className="order-item">
                            {returnItem.productname} - {returnItem.Price} zł - {returnItem.quantity} szt.
                            {/* Dodatkowe informacje o zwrocie */}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="no-orders">
                <p>Brak zwrotów</p>
        </div>
            )}
        </div>
    );
};

export default Returns;
