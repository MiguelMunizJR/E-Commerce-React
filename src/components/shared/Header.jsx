import React, { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { NavLink } from "react-router-dom";
import ProductCartInfo from "../products/ProductCartInfo";

const Header = ({ getAllProductsCart, cartProducts, isEmpty, setIsEmpty }) => {
  const [total, setTotal] = useState(0);

  const toggleCart = () => {
    const cartDisplay = document.querySelector(".cart");
    if (cartDisplay.style.display === "flex") {
      cartDisplay.style.display = "none";
    } else {
      cartDisplay.style.display = "flex";
      getAllProductsCart();
    }
  };

  useEffect(() => {
    getAllProductsCart();
  }, []);

  const handleCheckout = () => {
    if (!cartProducts) {
      alert("Your shopping cart is empty, add products");
    } else {
      const cartDisplay = document.querySelector(".cart");
      const URL = "https://ecommerce-api-react.herokuapp.com/api/v1/purchases";
      const obj = {
        street: "Green. 1456",
        colony: "Southwest",
        zipCode: 12645,
        city: "USA",
        references: "Some refences",
      };

      axios
        .post(URL, obj, getConfig())
        .then((res) => {
          console.log(res.data);
          getAllProductsCart();
          alert("Gracias por su compra");
          setTotal(0);
          setIsEmpty(true);
          cartDisplay.style.display = "none";
        })
        .catch((err) => {
          console.log(err);
          getAllProductsCart();
          cartDisplay.style.display = "none";
        });
    }
  };

  return (
    <header className="header">
      <NavLink to="/">
        <h1 className="header__logo">e-commerce</h1>
      </NavLink>
      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__item">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "active__link" : "header__link"
              }
            >
              <i className="fa-solid fa-user"></i>
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink
              to="/purchases"
              className={({ isActive }) =>
                isActive ? "active__link" : "header__link"
              }
            >
              <i className="fa-solid fa-store"></i>
            </NavLink>
          </li>
          <li className="header__item">
            <i
              className="fa-solid fa-cart-shopping header__link"
              onClick={toggleCart}
            ></i>
          </li>
        </ul>
      </nav>
      <section className="cart">
        <article className="cart__header">
          <h2 className="cart__title">Shopping cart</h2>
          <section className="cart__container">
            {isEmpty ? (
              <div className="cart__container-div">
                <i className="fa-regular fa-face-frown"></i>
                <h4 className="cart__container-message">
                  Your shopping cart is empty
                </h4>
              </div>
            ) : (
              cartProducts?.map((product) => (
                <ProductCartInfo
                  key={product.id}
                  product={product}
                  getAllProductsCart={getAllProductsCart}
                  setTotal={setTotal}
                  total={total}
                  isEmpty={isEmpty}
                  setIsEmpty={setIsEmpty}
                />
              ))
            )}
          </section>
        </article>
        <article className="cart__footer">
          <p className="cart__footer-total">Total:</p>
          <span className="cart__footer-value">{`$ ${total}`}</span>
          <button className="cart__footer-btn" onClick={handleCheckout}>
            Checkout<i className="fa-solid fa-bag-shopping"></i>
          </button>
        </article>
      </section>
    </header>
  );
};

export default Header;
