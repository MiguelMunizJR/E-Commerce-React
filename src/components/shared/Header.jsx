import React, { useState } from "react";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { NavLink } from "react-router-dom";

const Header = ({ cart, getAllCartProducts }) => {
  const [total, setTotal] = useState(0);
  
  const toggleCart = () => {
    const cartDisplay = document.querySelector(".cart");
    if (cartDisplay.style.display === "flex") {
      cartDisplay.style.display = "none";
    } else {
      cartDisplay.style.display = "flex";
    }
  };

  const handleCheckout = () => {
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
        getAllCartProducts();
        alert("Gracias por su compra");
        cartDisplay.style.display = "none";
      })
      .catch((err) => {
        console.log(err);
        cartDisplay.style.display = "none";
      });
  };

  const handleDeleteProduct = (id) => {
    const URL = `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`;

    axios
      .delete(URL, getConfig())
      .then(() => getAllCartProducts())
      .catch((err) => console.log(err));
  };

  // console.log(cart);

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
          <h2 className="cart__title">Carrito de compras</h2>
          <section className="cart__container">
            {cart?.products.map((product) => {
              setTotal(total + product.price);
              return (
                <article className="cart__product-card" key={product.id}>
                  <div className="cart__product-header">
                    <div className="cart__product-brand">
                      <p className="cart__product-brand-title">
                        {product.brand}
                      </p>
                      <i
                        className="fa-solid fa-trash-can"
                        onClick={handleDeleteProduct(product.id)}
                      ></i>
                    </div>
                    <h4 className="cart__product-title">{product.title}</h4>
                    <span className="cart__product-quantity">
                      {product.productsInCart.quantity}
                    </span>
                  </div>
                  <div className="cart__product-footer">
                    <p className="cart__product-total">Total:</p>
                    <span className="cart__product-value">
                      $ {product.productsInCart.quantity * product.price}
                    </span>
                  </div>
                </article>
              );
            })}
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
