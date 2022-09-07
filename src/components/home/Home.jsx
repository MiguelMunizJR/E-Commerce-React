import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/slices/products.slice.js.js";
import ProductCard from "../products/ProductCard.jsx";

const scrollToTop = () => {
  const container = document.querySelector("*");
  container.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Home = ({ getAllCartProducts }) => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [productsCategory, setProductsCategory] = useState();
  const [category, setCategory] = useState();

  const productCategories = {
    Computers: products?.filter((item) => {
      if (item?.category.name === "Computers") {
        return item;
      }
    }),
    "Smart TV": products?.filter((item) => {
      if (item?.category.name === "Smart TV") {
        return item;
      }
    }),
    Smartphones: products?.filter((item) => {
      if (item?.category.name === "Smartphones") {
        return item;
      }
    }),
  };

  useEffect(() => {
    dispatch(getAllProducts());
    scrollToTop();

    switch (category) {
      case "all":
        setProductsCategory(products);
        break;
      case "computers":
        setProductsCategory(productCategories.Computers);
        break;
      case "smartphones":
        setProductsCategory(productCategories.Smartphones);
        break;
      case "smart_tv":
        setProductsCategory(productCategories["Smart TV"]);
        break;
      default:
        setProductsCategory(products);
        break;
    }
  }, [category]);

  const filterPrice = (e) => {
    e.preventDefault();
    const from = e.target.from.value;
    const to = e.target.to.value;

    const productsFilterPrice = products?.filter((product) => {
      if (parseInt(product.price) >= from && parseInt(product.price) <= to) {
        return product;
      }
    });
    if (from == "" || to == "") {
      setProductsCategory(products)
    } else {
      setProductsCategory(productsFilterPrice)
    }
    e.target.from.value = "";
    e.target.to.value = "";
    scrollToTop();
  };

  return (
    <section className="home">
      <aside className="home__filters">
        <div className="home__filter-price">
          <h3 className="filter__price-title">Price</h3>
          <form className="price__form" onSubmit={filterPrice}>
            <div className="price__div from">
              <label htmlFor="from">From</label>
              <input
                type="number"
                id="from"
                className="filter__price-input"
                placeholder="$"
              />
            </div>
            <div className="price__div to">
              <label htmlFor="to">To</label>
              <input
                type="number"
                id="to"
                className="filter__price-input"
                placeholder="$"
              />
            </div>
            <button className="price__btn">Filter price</button>
          </form>
        </div>
        <div className="home__filter-category">
          <h3 className="filter__category-title">Category</h3>
          <ul className="filter__category-list">
            <li
              className="filter__category-item"
              onClick={() => setProductsCategory(products)}
            >
              All
            </li>
            <li
              className="filter__category-item"
              onClick={() => setCategory("computers")}
            >
              Computers
            </li>
            <li
              className="filter__category-item"
              onClick={() => setCategory("smartphones")}
            >
              Smartphones
            </li>
            <li
              className="filter__category-item"
              onClick={() => setCategory("smart_tv")}
            >
              Smart TV
            </li>
          </ul>
        </div>
      </aside>
      <article className="home__products">
        <div className="home__search">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="search__input"
          />
          <button className="search__btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <article className="home__container">
          <h2 className="home__title">Products</h2>
          <article className="products__container">
            {productsCategory
              ? productsCategory?.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    getAllCartProduct={getAllCartProducts}
                  />
                ))
              : products?.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    getAllCartProduct={getAllCartProducts}
                  />
                ))}
          </article>
        </article>
      </article>
    </section>
  );
};

export default Home;
