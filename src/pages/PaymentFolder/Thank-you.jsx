import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Summation.css';

export const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000); // Opóźnienie 1000 ms (1 sekunda)

    return () => clearTimeout(timer); // Oczyszczenie timera
  }, [navigate]);

  return (
    <div className="thankYou">
      <div className="thankYouTitle text-center mb-8">
        <h1>{t("summation.thanks")}</h1>
      </div>
    </div>
  );
};

export default ThankYou;
