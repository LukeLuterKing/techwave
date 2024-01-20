import React from "react";
import "./NavbarCategories.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Phone, Laptop, Television, Headphones, Printer, Monitor, List } from "phosphor-react";

export const NavbarCategories = (props) => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();

  const handleCategorySelection = (category) => {
    navigate("/shop");
    props.setSelectedCategory(category);
  };

  return (
    <div className="navbar-categories">
      <span className="navbar-category-link" onClick={() => handleCategorySelection("")}>
        <List size={24} /> {t("navbarCategories.link")}
      </span>
      <span className="navbar-category-link" onClick={() => handleCategorySelection("Phone")}>
        <Phone size={24} /> {t("navbarCategories.link2")}
      </span>
      <span className="navbar-category-link" onClick={() => handleCategorySelection("Laptop")}>
        <Laptop size={24} /> {t("navbarCategories.link3")}
      </span>
      <span className="navbar-category-link" onClick={() => handleCategorySelection("TV")}>
        <Television size={24} /> {t("navbarCategories.link4")}
      </span>
      <span className="navbar-category-link" onClick={() => handleCategorySelection("Headphones")}>
        <Headphones size={24} /> {t("navbarCategories.link5")}
      </span>
      <span className="navbar-category-link" onClick={() => handleCategorySelection("Printer")}>
        <Printer size={24} /> {t("navbarCategories.link6")}
      </span>
      <span className="navbar-category-link" onClick={() => handleCategorySelection("Monitor")}>
        <Monitor size={24} /> {t("navbarCategories.link7")}
      </span>
    </div>
  );
};

export default NavbarCategories;
