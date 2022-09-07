import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import getConfig from "../../utils/getConfig";

const scrollToTop = () => {
  const container = document.querySelector("*");
  container.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const date = new Date();
const dateFormat = {
  day: date.getDate(),
  month: date.toLocaleString("en-US", { month: "long" }),
  year: date.getFullYear(),
};

const Purchases = () => {
  const [purchases, setPurchases] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const URL = "https://ecommerce-api-react.herokuapp.com/api/v1/purchases";

    axios
      .get(URL, getConfig())
      .then((res) => setPurchases(res.data.data.purchases))
      .catch((err) => console.log(err));
    scrollToTop();
  }, []);

  // console.log(purchases);

  return (
    <section className="purchases">
      <article className="purchases__card">
        <h2 className="purchases__title">Purchases</h2>
        <div className="productinfo__return">
        <p className="productinfo__return-home" onClick={() => navigate("/")}>
          Home
        </p>
        <div className="productinfo__return-circle"></div>
        <p className="productinfo__return-product">Purchases</p>
      </div>
        <section className="purchases__container">
          {purchases?.map((purchase) => (
            <article className="purchases__product-card" key={purchase.id}>
              <header className="purchases__product-header">
                <p className="purchases__product-date">{`${dateFormat.month} ${dateFormat.day}, ${dateFormat.year}`}</p>
              </header>
              {purchase?.cart.products.map((product) => (
                <main className="purchases__product-body" key={product.id}>
                  <div className="purchases__product-article">
                    <h3 className="purchases__product-title">
                      {product.title}
                    </h3>
                    <span className="purchases__product-quantity">
                      {product.productsInCart.quantity}
                    </span>
                    <span className="purchases__product-price">
                      {`$ ${product.productsInCart.quantity * product.price}`}
                    </span>
                  </div>
                </main>
              ))}
            </article>
          ))}
        </section>
      </article>
    </section>
  );
};

export default Purchases;
