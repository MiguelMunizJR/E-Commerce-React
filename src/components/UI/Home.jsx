import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../store/slices/products.slice.js.js";
import ProductCard from "../products/ProductCard.jsx";
import {scrollToTop} from "../../utils/scrollToTop";
import useRequest from "../../hooks/useRequest.js";

const Home = ({
	// getAllProductsCart,
	// cartProducts,
	setIsLoading,
}) => {
	const {data} = useRequest();
	console.log(data);
	// const dispatch = useDispatch();
	const navigate = useNavigate();
	const [productsCategory, setProductsCategory] = useState();
	const [category, setCategory] = useState();
	const [searchResult, setSearchResult] = useState();

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
		setIsLoading(true);
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
		// dispatch(getAllProducts());
		scrollToTop();
		if (products !== undefined) {
			setIsLoading(false);
		}
	}, [category]);

	const handleSearchItem = (item) => {
		navigate(`/products/${item.id}`);
	};

	const toggleSearch = () => {
		const searchContainer = document.querySelector(".search__container");

		if (searchContainer.style.display === "flex") {
			searchContainer.style.display = "none";
		} else {
			searchContainer.style.display = "flex";
		}
	};

	const searchProducts = (e) => {
		e.preventDefault();
		const searchValue = e.target.value;

		const filterSearchResult = products?.filter((item) =>
			item?.title.toLowerCase().includes(searchValue)
		);
		setSearchResult(filterSearchResult);

		const searchContainer = document.querySelector(".search__container");

		if (searchContainer.style.display === "none") {
			searchContainer.style.display = "flex";
		}
	};

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
			setProductsCategory(products);
		} else {
			setProductsCategory(productsFilterPrice);
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
								placeholder="min $200"
								min="200"
								max="5000"
								step="15"
							/>
						</div>
						<div className="price__div to">
							<label htmlFor="to">To</label>
							<input
								type="number"
								id="to"
								className="filter__price-input"
								placeholder="max $5000"
								min="200"
								max="10000"
								step="15"
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
							onClick={() => {
								setProductsCategory(products);
								scrollToTop();
							}}
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
				<form className="home__search" onChange={searchProducts}>
					<input
						type="text"
						id="search"
						placeholder="What are you looking for?"
						className="search__input"
						onClick={toggleSearch}
					/>
					<button className="search__btn">
						<i className="fa-solid fa-magnifying-glass"></i>
					</button>
					<section className="search__container">
						<ul className="search__list">
							{searchResult?.map((product) => (
								<li
									className="search__item"
									key={product.id}
									onClick={() => handleSearchItem(product)}
								>
									{product.title}
								</li>
							))}
						</ul>
					</section>
				</form>
				<article className="home__container">
					<h2 className="home__title">Products</h2>
					<article className="products__container">
						{productsCategory
							? productsCategory?.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									cartProducts={cartProducts}
									setIsLoading={setIsLoading}
								/>
							))
							: products?.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									cartProducts={cartProducts}
									setIsLoading={setIsLoading}
								/>
							))}
					</article>
				</article>
			</article>
		</section>
	);
};

export default Home;
