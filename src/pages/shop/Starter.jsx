import React, { useState, useEffect } from "react";
import { Product } from "./product";
import "./Starter.css";
import useProducts from "./useProducts";
import { useTranslation } from "react-i18next";
import page from '../../assets/products/page.png';


export const Starter = (props) => {
  const {t} = useTranslation("global");
  const { isLoading, error, products } = useProducts();
  const [displayedProducts, setDisplayedProducts] = useState([]);

 
  useEffect(() => {
    if (products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setDisplayedProducts(shuffled.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="shop1">
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!isLoading && !error && (
        <>
          <div className="image-container">
            <img src={page} alt="Promotional"/>
          </div>

          {/* Sekcja z produktami */}
          <div className="products-section">
              <div className="products1">
                  {displayedProducts.map((product) => (
                      <Product key={product.id} data={product} />
                  ))}
              </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Starter;