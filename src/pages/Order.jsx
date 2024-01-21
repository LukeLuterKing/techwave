import React, { useState, useEffect } from 'react';
import axios from "../api/axios";
import { useNavigate , Link} from 'react-router-dom';
import './Orders.css'; // Upewnij się, że plik stylów istnieje
import { useTranslation } from "react-i18next";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showReturnSuccess, setShowReturnSuccess] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation("global");
  // Funkcja do ładowania zamówień
  const fetchOrders = () => {
    axios.get('/api/orders', { withCredentials: true })
      .then(response => {
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error('Invalid data format received:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  };

  // Efekt do ładowania zamówień przy montowaniu komponentu
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleReturn = async (orderId) => {
    const confirmReturn = window.confirm(t("alerts.confirm"));
    if (!confirmReturn) {
      return;
    }

    try {
      const response = await axios.post(`/api/returnOrder/${orderId}`, {}, { withCredentials: true });
      if (response.status === 200) {
        setShowReturnSuccess(true);
        setTimeout(() => {
          setShowReturnSuccess(false);
          fetchOrders(); // Ponownie załaduj zamówienia
        }, 3000);
      }
    } catch (error) {
      console.error('Error returning order:', error);
      alert('Failed to return order. Please try again.');
    }
  };

  return (
    <div>
      {orders.length > 0 ? (
        <ul>
          {orders.map(order => (
            <li key={order.id} className="order-item">
              <span className="order-details">
                {order.productname} - {order.Price} zł - {order.quantity} szt.
              </span>
              <button onClick={() => handleReturn(order.id)} className="return-button">
              {t("order.zwroc")}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-orders">
          <p>{t("order.brak")}</p>
          <p>{t("order.przejdz")}</p>
          
          <Link to="/shop" className="order-button">
            <span role="img" aria-label="smile">😊</span>
          </Link>
        </div>
      )}
      {showReturnSuccess && (
        <div className="success-modal">
          <p>{t("order.zwrot")}</p>
        </div>
      )}
    </div>
  );
};

export default Orders;